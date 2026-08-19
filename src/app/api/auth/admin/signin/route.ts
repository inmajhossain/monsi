import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/auth';
import { sendAdminOtpEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, otp, action } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or credentials' },
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
            'Your admin account is currently PENDING approval. Please approve the status to "APPROVED" in your MongoDB database before signing in.',
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

    // ==========================================
    // STEP 2: VERIFY OTP
    // ==========================================
    if (action === 'verify-otp' || (otp && typeof otp === 'string')) {
      const cleanOtp = otp.trim();

      if (!cleanOtp || cleanOtp.length !== 6) {
        return NextResponse.json(
          { error: 'Please provide a valid 6-digit numeric OTP code.' },
          { status: 400 }
        );
      }

      if (!user.otpCode || !user.otpExpiresAt) {
        return NextResponse.json(
          { error: 'No active OTP request found. Please request a new security code.' },
          { status: 400 }
        );
      }

      // Check if OTP expired
      if (new Date() > new Date(user.otpExpiresAt)) {
        user.otpCode = undefined;
        user.otpExpiresAt = undefined;
        await user.save();
        return NextResponse.json(
          { error: 'The 6-digit verification code has expired. Please request a new code.' },
          { status: 400 }
        );
      }

      // Check OTP match
      if (user.otpCode !== cleanOtp) {
        return NextResponse.json(
          { error: 'Invalid verification code. Please check your email and try again.' },
          { status: 400 }
        );
      }

      // OTP is valid! Invalidate OTP immediately to prevent reuse
      user.otpCode = undefined;
      user.otpExpiresAt = undefined;
      await user.save();

      // Sign JWT token for 3 HOURS (3 * 60 * 60 = 10,800 seconds)
      const sessionDurationSeconds = 3 * 60 * 60;
      const token = signToken(
        {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          firstName: user.profile?.firstName,
          lastName: user.profile?.lastName,
        },
        sessionDurationSeconds
      );

      const response = NextResponse.json(
        {
          success: true,
          message: 'Admin authenticated successfully. Session valid for 3 hours.',
          token,
          expiresInSeconds: sessionDurationSeconds,
          user: {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            profile: user.profile,
          },
        },
        { status: 200 }
      );

      // Set cookie for 3 hours (10800 seconds)
      response.cookies.set('auth-token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: sessionDurationSeconds,
      });

      return response;
    }

    // ==========================================
    // STEP 1: VERIFY PASSWORD & SEND 6-DIGIT OTP
    // ==========================================
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required to initiate admin authentication.' },
        { status: 400 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Generate a secure 6-digit numeric OTP code
    const generatedOtp = crypto.randomInt(100000, 1000000).toString();

    // Store OTP in database with 10-minute expiry
    user.otpCode = generatedOtp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    // Send email with OTP code
    await sendAdminOtpEmail({
      to: user.email,
      otp: generatedOtp,
      recipientName: user.profile?.firstName || 'Administrator',
    });

    return NextResponse.json(
      {
        success: true,
        requireOtp: true,
        email: user.email,
        message: 'A 6-digit verification code has been sent to your email address.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin signin / OTP error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
