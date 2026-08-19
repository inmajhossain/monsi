import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check admin role
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Access restricted. This portal is for administrators only.' },
        { status: 403 }
      );
    }

    // Check status
    if (user.status === 'PENDING') {
      return NextResponse.json(
        {
          error:
            'Your admin account is currently PENDING approval. Please approve the status to "APPROVED" in your MongoDB collection before signing in.',
        },
        { status: 403 }
      );
    }

    if (user.status !== 'APPROVED') {
      return NextResponse.json(
        { error: 'Your admin account is not approved or has been suspended.' },
        { status: 403 }
      );
    }

    const token = signToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      firstName: user.profile?.firstName,
      lastName: user.profile?.lastName,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: 'Admin signed in successfully',
        token,
        user: {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          profile: user.profile,
        },
      },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set('auth-token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Admin signin error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
