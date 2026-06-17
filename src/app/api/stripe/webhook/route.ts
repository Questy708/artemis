import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST /api/stripe/webhook — receive Stripe webhook events
// When Stripe confirms a payment, it sends an event here.
// This updates the donation status from "pending" to "completed".

export async function POST(request: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripeSecretKey || !webhookSecret) {
      // No Stripe configured — acknowledge but do nothing
      return NextResponse.json({ received: true, note: 'Stripe not configured' });
    }

    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2025-04-30.basil' });

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
    } catch {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const sessionId = session.id;

        // Update donation from pending to completed
        await db.donation.updateMany({
          where: { stripeSessionId: sessionId },
          data: { paymentStatus: 'completed' },
        });
        break;
      }
      case 'checkout.session.expired': {
        const session = event.data.object as any;
        const sessionId = session.id;

        // Mark as expired
        await db.donation.updateMany({
          where: { stripeSessionId: sessionId },
          data: { paymentStatus: 'expired' },
        });
        break;
      }
      default:
        // Ignore other event types
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
