'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  FaLock,
  FaEnvelope,
  FaArrowRight,
  FaArrowLeft,
  FaShieldAlt,
  FaKey,
  FaRedo,
  FaClock,
  FaCheckCircle,
} from 'react-icons/fa';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/add-property';
  const { login } = useAuth();

  // Auth flow step: 'credentials' | 'otp'
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // 6-digit OTP state as array of strings
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  // Handle Step 1: Submit Credentials & Request OTP
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/admin/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to authenticate. Please verify your credentials.');
        setLoading(false);
        return;
      }

      if (data.requireOtp) {
        setStep('otp');
        setSuccess('Security code sent! Please check your email inbox.');
        setResendCooldown(60); // 60 seconds cooldown
        setOtpValues(['', '', '', '', '', '']);
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 300);
      } else if (data.token) {
        // Fallback for direct token response
        handleLoginSuccess(data);
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Step 2: Verify 6-digit OTP
  const handleVerifyOtp = async (otpToVerify?: string) => {
    const code = otpToVerify || otpValues.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/admin/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: code,
          action: 'verify-otp',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid or expired verification code.');
        setLoading(false);
        return;
      }

      handleLoginSuccess(data);
    } catch {
      setError('Failed to verify OTP code. Please try again.');
      setLoading(false);
    }
  };

  const handleLoginSuccess = (data: any) => {
    setSuccess('Authentication successful! Initializing 3-hour admin session...');
    login(data.token, data.user);

    setTimeout(() => {
      router.push(callbackUrl);
      router.refresh();
    }, 1200);
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || resending) return;
    setResending(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/admin/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to resend verification code.');
      } else {
        setSuccess('A new 6-digit verification code has been dispatched to your email.');
        setResendCooldown(60);
        setOtpValues(['', '', '', '', '', '']);
        otpInputRefs.current[0]?.focus();
      }
    } catch {
      setError('Failed to resend security code. Please check your connection.');
    } finally {
      setResending(false);
    }
  };

  // Handle individual OTP inputs
  const handleOtpChange = (index: number, value: string) => {
    // Only accept numeric inputs
    const numericVal = value.replace(/\D/g, '');
    if (!numericVal && value !== '') return;

    const char = numericVal.slice(-1);
    const newOtp = [...otpValues];
    newOtp[index] = char;
    setOtpValues(newOtp);
    if (error) setError('');

    // If character entered, jump to next input
    if (char && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // If all 6 digits entered, automatically verify
    const fullCode = newOtp.join('');
    if (fullCode.length === 6 && !newOtp.includes('')) {
      handleVerifyOtp(fullCode);
    }
  };

  // Handle backspace / navigation in OTP boxes
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otpValues[index] && index > 0) {
        const newOtp = [...otpValues];
        newOtp[index - 1] = '';
        setOtpValues(newOtp);
        otpInputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otpValues];
        newOtp[index] = '';
        setOtpValues(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle pasting 6 digits
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().replace(/\D/g, '');
    if (pastedData.length >= 6) {
      const chars = pastedData.slice(0, 6).split('');
      setOtpValues(chars);
      otpInputRefs.current[5]?.focus();
      handleVerifyOtp(chars.join(''));
    }
  };

  return (
    <div className="relative flex justify-center items-center bg-[#021e1f] px-4 py-24 min-h-screen overflow-hidden">
      {/* Ambient background glows */}
      <div className="top-1/4 left-1/4 -z-0 absolute bg-[#0C969C]/15 blur-[120px] rounded-full w-96 h-96 pointer-events-none" />
      <div className="right-1/4 bottom-1/4 -z-0 absolute bg-amber-500/10 blur-[140px] rounded-full w-96 h-96 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="z-10 bg-black/55 shadow-2xl backdrop-blur-2xl p-8 sm:p-10 border border-white/15 rounded-3xl w-full max-w-md"
      >
        {/* Header Branding */}
        <div className="flex flex-col items-center mb-6 text-center">
          <Link href="/" className="flex items-center gap-2 mb-3">
            <Image
              src="/image/logo/monsi-logo.png"
              alt="Monsi Engineering"
              width={65}
              height={65}
              priority
              className="w-auto h-auto drop-shadow-lg"
            />
          </Link>
          <div className="inline-flex items-center gap-2 bg-[#0C969C]/20 border border-[#0C969C]/40 px-3.5 py-1 rounded-full text-[#E3F0B6] text-[11px] font-bold uppercase tracking-widest backdrop-blur-md">
            <FaShieldAlt className="text-amber-400 text-xs" />
            Admin Security Portal
          </div>
          <h1 className="mt-2 font-extrabold text-white text-2xl sm:text-3xl tracking-tight">
            {step === 'credentials' ? 'Admin Sign In' : 'Two-Factor Verification'}
          </h1>
          <p className="mt-1 text-gray-400 text-xs sm:text-sm">
            {step === 'credentials'
              ? 'Enter your credentials to receive a 6-digit security code'
              : `Security OTP sent to ${formData.email}`}
          </p>
        </div>

        {/* 3-Hour Session Banner Notice */}
        <div className="flex items-center gap-2 bg-neutral-900/80 border border-white/10 px-3.5 py-2 rounded-xl text-xs text-gray-300 mb-6">
          <FaClock className="text-[#0C969C] shrink-0" />
          <span>
            Session validity: <strong className="text-white">3 Hours</strong>. A fresh OTP is required after 3 hours.
          </span>
        </div>

        {/* Alerts */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error-box"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-500/15 mb-5 p-3.5 border border-red-500/30 rounded-xl text-red-300 text-xs sm:text-sm text-center leading-relaxed"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              key="success-box"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-emerald-500/15 mb-5 p-3.5 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs sm:text-sm text-center flex items-center justify-center gap-2 leading-relaxed"
            >
              <FaCheckCircle className="shrink-0" />
              <span>{success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 1: CREDENTIALS FORM */}
        {step === 'credentials' && (
          <motion.form
            key="credentials-form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleCredentialsSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block mb-2 font-semibold text-gray-300 text-xs uppercase tracking-wider">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@monsi.com"
                  className="bg-neutral-900/90 p-3.5 pl-10 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-300 text-xs uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                  <FaLock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-neutral-900/90 p-3.5 pl-10 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] active:scale-[0.99] disabled:opacity-50 shadow-lg shadow-[#0C969C]/25 mt-6 py-3.5 rounded-xl w-full font-bold text-white text-sm transition duration-200 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
                  Verifying & Sending OTP...
                </div>
              ) : (
                <>
                  <span>Continue to Verification</span>
                  <FaArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </motion.form>
        )}

        {/* STEP 2: 6-DIGIT OTP VERIFICATION FORM */}
        {step === 'otp' && (
          <motion.div
            key="otp-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-semibold text-gray-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <FaKey className="text-[#0C969C]" />
                  Enter 6-Digit Security Code
                </label>
                <span className="text-[11px] text-gray-400 font-mono">10 min expiry</span>
              </div>

              {/* 6 Individual Numeric Inputs */}
              <div className="flex items-center justify-between gap-2" onPaste={handleOtpPaste}>
                {otpValues.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 sm:w-12 h-14 bg-neutral-900/90 border-2 border-neutral-700 focus:border-[#0C969C] focus:bg-[#022325] text-center text-xl font-mono font-bold text-[#E3F0B6] rounded-xl outline-none focus:ring-2 focus:ring-[#0C969C]/40 transition shadow-inner"
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="button"
              onClick={() => handleVerifyOtp()}
              disabled={loading || otpValues.join('').length !== 6}
              className="flex justify-center items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] active:scale-[0.99] disabled:opacity-40 shadow-lg shadow-[#0C969C]/25 py-3.5 rounded-xl w-full font-bold text-white text-sm transition duration-200 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
                  Verifying OTP & Authorizing...
                </div>
              ) : (
                <>
                  <FaShieldAlt className="w-4 h-4" />
                  <span>Verify Code & Sign In (3 Hours)</span>
                </>
              )}
            </button>

            {/* Resend & Change Email controls */}
            <div className="flex items-center justify-between pt-2 text-xs">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0 || resending}
                className="flex items-center gap-1.5 text-gray-400 hover:text-white disabled:text-gray-600 transition font-medium disabled:cursor-not-allowed"
              >
                <FaRedo className={`w-3 h-3 ${resending ? 'animate-spin' : ''}`} />
                {resendCooldown > 0 ? `Resend Code in ${resendCooldown}s` : 'Resend Code'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('credentials');
                  setError('');
                  setSuccess('');
                }}
                className="flex items-center gap-1.5 text-[#0C969C] hover:text-[#E3F0B6] transition font-medium"
              >
                <FaArrowLeft className="w-3 h-3" />
                Change Email / Password
              </button>
            </div>
          </motion.div>
        )}

        {/* Footer info */}
        <div className="mt-8 pt-6 border-white/10 border-t text-center">
          <p className="text-gray-400 text-xs">
            Don&apos;t have an admin account?{' '}
            <Link
              href="/auth/signup"
              className="font-semibold text-[#E3F0B6] hover:text-white transition underline"
            >
              Sign Up as Admin
            </Link>
          </p>
          <div className="mt-4">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-300 text-xs transition"
            >
              ← Back to Monsi Engineering Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center bg-[#021e1f] min-h-screen text-white">
          Loading Sign In...
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
