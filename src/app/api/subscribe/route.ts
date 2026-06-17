import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/admin-auth';

// POST /api/subscribe — add a newsletter subscriber
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Upsert: if email exists and was unsubscribed, reactivate
    const subscriber = await db.subscriber.upsert({
      where: { email },
      update: { active: true, source: source || null },
      create: {
        email,
        source: source || null,
        active: true,
      },
    });

    return NextResponse.json({
      success: true,
      id: subscriber.id,
      message: 'You have been subscribed to the Artemis newsletter.',
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

// GET /api/subscribe — list subscribers (admin only)
export async function GET(request: Request) {
  const isAuth = await verifyAdminAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const subscribers = await db.subscriber.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return NextResponse.json({ subscribers });
  } catch (error) {
    console.error('Subscriber fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}
