import { NextResponse } from 'next/server';

export async function GET() {
  const paypalEmail = process.env.PAYPAL_EMAIL;
  return NextResponse.json({
    configured: !!paypalEmail,
    email: paypalEmail || null,
  });
}
