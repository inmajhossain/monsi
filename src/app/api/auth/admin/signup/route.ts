import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, phoneNumber, passkey } = body;

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'First name, last name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Optional admin security check if ADMIN_SECRET is configured
    const adminSecret = process.env.ADMIN_SECRET;
    if (adminSecret && passkey !== adminSecret) {
      return NextResponse.json(
        { error: 'Invalid admin registration passkey' },
        { status: 403 }
      );
    }

    await connectDB();

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Create user with role ADMIN and status PENDING for database approval
    const newUser = await User.create({
      email: normalizedEmail,
      passwordHash,
      role: 'ADMIN',
      status: 'PENDING',
      profile: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phoneNumber ? phoneNumber.trim() : '',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          'Admin registration submitted successfully! Your account status is PENDING. Once approved in your MongoDB database, you can sign in.',
        userId: newUser._id.toString(),
        status: 'PENDING',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin signup error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
