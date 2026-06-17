import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/admin-auth';

// GET /api/admin — aggregate stats for the admin dashboard
export async function GET(request: Request) {
  // Require admin authentication
  const isAuth = await verifyAdminAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [
      totalDonations,
      totalApplications,
      totalContactMessages,
      totalSubscribers,
      recentDonations,
      recentApplications,
      recentContacts,
      unreadMessages,
      donationsByStatus,
      totalRaised,
    ] = await Promise.all([
      db.donation.count(),
      db.application.count(),
      db.contactMessage.count(),
      db.subscriber.count({ where: { active: true } }),
      db.donation.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
      db.application.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
      db.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
      db.contactMessage.count({ where: { read: false } }),
      db.donation.groupBy({ by: ['paymentStatus'], _count: true }),
      db.donation.aggregate({ _sum: { amount: true }, where: { paymentStatus: 'completed' } }),
    ]);

    return NextResponse.json({
      stats: {
        totalDonations,
        totalApplications,
        totalContactMessages,
        totalSubscribers,
        unreadMessages,
        totalRaised: totalRaised._sum.amount || 0,
      },
      donationsByStatus: donationsByStatus.reduce((acc: Record<string, number>, cur) => {
        acc[cur.paymentStatus] = cur._count;
        return acc;
      }, {}),
      recentDonations,
      recentApplications,
      recentContacts,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin data' },
      { status: 500 }
    );
  }
}
