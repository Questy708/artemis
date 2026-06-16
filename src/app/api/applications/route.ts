import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/admin-auth';

// POST /api/applications — submit an application (persisted to SQLite via Prisma)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 }
      );
    }

    // Serialize accomplishments array to JSON string for storage
    const accomplishmentsJson = body.accomplishments
      ? JSON.stringify(body.accomplishments)
      : null;

    // Persist to database via Prisma
    const application = await db.application.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone || null,
        birthdate: body.birthdate || null,
        gender: body.gender || null,
        pronoun: body.pronoun || null,
        citizenship: body.citizenship || null,
        dualCitizenship: body.dualCitizenship || null,
        address: body.address || null,
        city: body.city || null,
        state: body.state || null,
        postalCode: body.postalCode || null,
        country: body.country || null,
        howHeard: body.howHeard || null,
        applicationCycle: body.applicationCycle || null,
        concentration: body.concentration || null,
        currentlyEnrolled: body.currentlyEnrolled || null,
        schoolName: body.schoolName || null,
        schoolCountry: body.schoolCountry || null,
        schoolCity: body.schoolCity || null,
        enrollmentStart: body.enrollmentStart || null,
        enrollmentEnd: body.enrollmentEnd || null,
        gradingScale: body.gradingScale || null,
        gpa: body.gpa || null,
        maxGpa: body.maxGpa || null,
        satMath: body.satMath || null,
        satReading: body.satReading || null,
        actScore: body.actScore || null,
        isTestOptional: body.isTestOptional || false,
        accomplishments: accomplishmentsJson,
        personalStatement: body.personalStatement || null,
        missionStatement: body.missionStatement || null,
        applyingForAid: body.applyingForAid || null,
        householdIncome: body.householdIncome || null,
        dependents: body.dependents || null,
      },
    });

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      message: 'Application submitted successfully. We will review your application and get back to you.',
    });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

// GET /api/applications — list all applications (admin only)
export async function GET(request: Request) {
  const isAuth = await verifyAdminAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const applications = await db.application.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    // Parse accomplishments JSON back for each record
    const formatted = applications.map(app => ({
      ...app,
      accomplishments: app.accomplishments ? JSON.parse(app.accomplishments) : null,
    }));

    return NextResponse.json({ applications: formatted });
  } catch (error) {
    console.error('Application fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
