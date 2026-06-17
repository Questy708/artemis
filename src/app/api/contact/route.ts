import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/admin-auth';

// POST /api/contact — submit a contact/enquiry message
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, area, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const contact = await db.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || null,
        area: area || null,
        message,
      },
    });

    return NextResponse.json({
      success: true,
      id: contact.id,
      message: 'Thank you for your enquiry. We will get back to you shortly.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit message' },
      { status: 500 }
    );
  }
}

// GET /api/contact — list contact messages (admin only)
export async function GET(request: Request) {
  const isAuth = await verifyAdminAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Contact fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// PATCH /api/contact — mark a message as read (admin only)
export async function PATCH(request: Request) {
  const isAuth = await verifyAdminAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, read } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const updated = await db.contactMessage.update({
      where: { id },
      data: { read: read !== undefined ? read : true },
    });

    return NextResponse.json({ success: true, message: updated });
  } catch (error) {
    console.error('Contact update error:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}
