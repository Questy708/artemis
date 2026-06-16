import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST /api/stripe/checkout — process a donation
// Supports 4 modes (checked in order):
//   1. Stripe (STRIPE_SECRET_KEY set) → real Stripe checkout
//   2. PayPal Donate (PAYPAL_EMAIL set) → redirect to PayPal Donate page
//   3. External payment link (DONATION_LINK set) → redirect to PayPal/BMAC/Ko-fi etc.
//   4. No gateway → record as pending for manual follow-up

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      donorEmail,
      donorName,
      amount,
      currency = 'USD',
      isRecurring = false,
      recurringFreq = 'monthly',
      perkId,
      message,
      isAnonymous = false,
      paymentMethod = 'card',
    } = body;

    if (!donorEmail || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Email and a positive amount are required' },
        { status: 400 }
      );
    }

    const transactionRef = `ART-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const paypalEmail = process.env.PAYPAL_EMAIL;
    const donationLink = process.env.DONATION_LINK;

    // ─── MODE 1: REAL STRIPE INTEGRATION ───
    if (stripeSecretKey) {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe(stripeSecretKey, { apiVersion: '2025-04-30.basil' });

      const session = await stripe.checkout.sessions.create({
        mode: isRecurring ? 'subscription' : 'payment',
        payment_method_types: ['card'],
        customer_email: donorEmail,
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: isRecurring
                  ? `Artemis ${recurringFreq} donation`
                  : 'Artemis Donation',
                description: isRecurring
                  ? `Recurring ${recurringFreq} donation to the University of Artemis Founding Campaign`
                  : 'One-time donation to the University of Artemis Founding Campaign',
              },
              unit_amount: Math.round(amount * 100),
              ...(isRecurring ? { recurring: { interval: recurringFreq === 'yearly' ? 'year' : 'month' } } : {}),
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}?donation=success&ref=${transactionRef}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}?donation=cancelled`,
        metadata: {
          donorName: donorName || '',
          transactionRef,
          perkId: perkId || '',
          isAnonymous: String(isAnonymous),
          message: message || '',
        },
      });

      await db.donation.create({
        data: {
          donorEmail,
          donorName: isAnonymous ? null : donorName,
          donorAnonymous: isAnonymous,
          amount,
          currency,
          paymentMethod: 'card',
          paymentStatus: 'pending',
          transactionRef,
          stripeSessionId: session.id,
          perkId: perkId || null,
          isRecurring,
          recurringFreq: isRecurring ? recurringFreq : null,
          message: message || null,
        },
      });

      return NextResponse.json({
        success: true,
        checkoutUrl: session.url,
        transactionRef,
      });
    }

    // ─── MODE 2: PAYPAL DONATE ───
    if (paypalEmail) {
      await db.donation.create({
        data: {
          donorEmail,
          donorName: isAnonymous ? null : donorName,
          donorAnonymous: isAnonymous,
          amount,
          currency,
          paymentMethod: 'paypal',
          paymentStatus: 'pending',
          transactionRef,
          perkId: perkId || null,
          isRecurring,
          recurringFreq: isRecurring ? recurringFreq : null,
          message: message || null,
        },
      });

      const paypalDonateUrl = `https://www.paypal.com/donate/?business=${encodeURIComponent(paypalEmail)}&amount=${amount}&currency_code=${currency}`;

      return NextResponse.json({
        success: true,
        checkoutUrl: paypalDonateUrl,
        transactionRef,
        message: 'Your pledge has been recorded! You\'ll now be redirected to PayPal to complete your donation.',
      });
    }

    // ─── MODE 3: EXTERNAL PAYMENT LINK (PayPal.me, Buy Me a Coffee, Ko-fi, etc.) ───
    if (donationLink) {
      await db.donation.create({
        data: {
          donorEmail,
          donorName: isAnonymous ? null : donorName,
          donorAnonymous: isAnonymous,
          amount,
          currency,
          paymentMethod: paymentMethod || 'link',
          paymentStatus: 'pending',
          transactionRef,
          perkId: perkId || null,
          isRecurring,
          recurringFreq: isRecurring ? recurringFreq : null,
          message: message || null,
        },
      });

      // Build the redirect URL — append amount if the platform supports it
      let redirectUrl = donationLink;
      // PayPal.me supports amounts: paypal.me/username/100
      if (donationLink.includes('paypal.me') && amount) {
        redirectUrl = `${donationLink.replace(/\/$/, '')}/${amount}${currency === 'GBP' ? 'GBP' : 'USD'}`;
      }
      // Buy Me a Coffee doesn't support URL amounts, just redirect
      // Ko-fi doesn't support URL amounts either

      return NextResponse.json({
        success: true,
        checkoutUrl: redirectUrl,
        transactionRef,
        message: 'Your pledge has been recorded! You\'ll now be redirected to complete your payment.',
      });
    }

    // ─── MODE 4: NO GATEWAY — record as pending ───
    const donation = await db.donation.create({
      data: {
        donorEmail,
        donorName: isAnonymous ? null : donorName,
        donorAnonymous: isAnonymous,
        amount,
        currency,
        paymentMethod: paymentMethod || 'card',
        paymentStatus: 'pending',
        transactionRef,
        perkId: perkId || null,
        isRecurring,
        recurringFreq: isRecurring ? recurringFreq : null,
        message: message || null,
      },
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: null,
      transactionRef,
      donationId: donation.id,
      message: 'Thank you! Your donation has been recorded. We will follow up with payment details.',
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to process donation' },
      { status: 500 }
    );
  }
}
