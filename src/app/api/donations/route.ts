import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/admin-auth';

// POST /api/donations — create a new donation record (persisted to SQLite via Prisma)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      donorEmail,
      donorName,
      donorAnonymous,
      amount,
      currency = 'USD',
      paymentMethod = 'card',
      perkId,
      isRecurring = false,
      recurringFreq,
      message,
    } = body;

    // Validate required fields
    if (!donorEmail || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Email and a positive amount are required' },
        { status: 400 }
      );
    }

    if (amount > 10000000) {
      return NextResponse.json(
        { error: 'Amount exceeds maximum single donation limit' },
        { status: 400 }
      );
    }

    // Generate a transaction reference
    const transactionRef = `ART-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Persist to database via Prisma
    const donation = await db.donation.create({
      data: {
        donorEmail,
        donorName: donorAnonymous ? null : donorName,
        donorAnonymous: donorAnonymous || false,
        amount,
        currency,
        paymentMethod,
        paymentStatus: 'pending', // Starts as pending until payment gateway confirms
        transactionRef,
        perkId: perkId || null,
        isRecurring,
        recurringFreq: isRecurring ? recurringFreq : null,
        message: message || null,
      },
    });

    return NextResponse.json({
      success: true,
      donation: {
        id: donation.id,
        donorEmail: donation.donorEmail,
        donorName: donation.donorName,
        amount: donation.amount,
        currency: donation.currency,
        paymentMethod: donation.paymentMethod,
        paymentStatus: donation.paymentStatus,
        transactionRef: donation.transactionRef,
        isRecurring: donation.isRecurring,
        recurringFreq: donation.recurringFreq,
        createdAt: donation.createdAt,
      },
      message: isRecurring
        ? `Thank you! Your ${recurringFreq} recurring donation of ${currency === 'GBP' ? '£' : '$'}${amount.toLocaleString()} has been recorded.`
        : `Thank you for your generous donation of ${currency === 'GBP' ? '£' : '$'}${amount.toLocaleString()}!`,
    });
  } catch (error) {
    console.error('Donation creation error:', error);
    return NextResponse.json(
      { error: 'Failed to process donation' },
      { status: 500 }
    );
  }
}

// GET /api/donations — fetch recent public donations for the donor wall
// For the admin dashboard, requires auth. For the public donor wall, returns limited data.
export async function GET(request: Request) {
  const isAuth = await verifyAdminAuth(request);

  try {
    if (isAuth) {
      // Admin: return ALL donations with full details
      const allDonations = await db.donation.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100,
      });
      return NextResponse.json({ donors: allDonations });
    }

    // Public: return limited, non-anonymous donor wall data
    const dbDonors = await db.donation.findMany({
      where: {
        donorAnonymous: false,
        paymentStatus: { in: ['pending', 'completed'] },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    // If we have real donors in the DB, return them
    if (dbDonors.length > 0) {
      const donors = dbDonors.map(d => ({
        name: d.donorName || 'Anonymous',
        amount: d.amount,
        date: d.createdAt.toISOString().split('T')[0],
        message: d.message,
        tier: d.amount >= 10000000 ? 'founders' : d.amount >= 5000000 ? 'guardians' : d.amount >= 1000000 ? 'builders' : d.amount >= 100000 ? 'fellows' : d.amount >= 10000 ? 'friends' : 'the99',
      }));
      return NextResponse.json({ donors });
    }

    // Fallback: return sample donor wall data when DB is empty
    const recentDonors = [
      { name: 'Dr. Elena Vasquez', amount: 50000, date: '2026-05-10', message: 'For the students who will change everything.', tier: 'founders' },
      { name: 'James & Priya Okonkwo', amount: 25000, date: '2026-05-08', message: null, tier: 'guild' },
      { name: 'Anonymous Patron', amount: 100000, date: '2026-05-07', message: 'Because knowledge should have no borders.', tier: 'chancellors' },
      { name: 'The Al-Rashidi Family', amount: 15000, date: '2026-05-05', message: 'In memory of Fatima Al-Rashidi, who believed in education for all.', tier: 'guild' },
      { name: 'Chen Wei Labs', amount: 200000, date: '2026-05-04', message: null, tier: 'founders' },
      { name: 'Maria Santos', amount: 500, date: '2026-05-03', message: 'Proud to be part of the founding.', tier: 'community' },
      { name: 'Takeshi Yamamoto', amount: 1000, date: '2026-05-02', message: null, tier: 'community' },
      { name: 'The Nordgren Foundation', amount: 500000, date: '2026-04-28', message: 'Investing in the infrastructure of imagination.', tier: 'chancellors' },
      { name: 'Amara Osei', amount: 100, date: '2026-04-27', message: 'Every great university starts with a first believer.', tier: 'community' },
      { name: 'Liu Fang Foundation', amount: 75000, date: '2026-04-25', message: null, tier: 'guild' },
      { name: 'Anonymous', amount: 5000, date: '2026-04-23', message: null, tier: 'community' },
      { name: 'Dr. Robert & Sarah Kimani', amount: 10000, date: '2026-04-22', message: 'For the next generation of African scholars.', tier: 'guild' },
    ];

    return NextResponse.json({ donors: recentDonors });
  } catch (error) {
    console.error('Donation fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}
