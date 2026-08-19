'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaLock,
  FaEnvelope,
  FaUser,
  FaPhone,
  FaShieldAlt,
  FaKey,
  FaArrowRight,
  FaHourglassHalf,
  FaDatabase,
} from 'react-icons/fa';

function SignUpContent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    passkey: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          passkey: formData.passkey,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create admin account.');
        setLoading(false);
        return;
      }

      setSubmittedEmail(formData.email);
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        passkey: '',
      });
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center bg-[#021e1f] px-4 py-24 min-h-screen overflow-hidden">
      {/* Ambient background glows */}
      <div className="top-1/3 left-1/4 -z-0 absolute bg-[#0C969C]/15 blur-[130px] rounded-full w-96 h-96 pointer-events-none" />
      <div className="right-1/4 bottom-1/3 -z-0 absolute bg-amber-500/10 blur-[150px] rounded-full w-96 h-96 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="z-10 bg-black/50 shadow-2xl backdrop-blur-xl p-8 sm:p-10 border border-white/10 rounded-2xl w-full max-w-lg"
      >
        {/* Header Branding */}
        <div className="flex flex-col items-center mb-8 text-center">
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
          <div className="flex items-center gap-2 font-semibold text-[#E3F0B6] text-xs uppercase tracking-widest">
            <FaShieldAlt className="text-amber-400" />
            Admin Registration
          </div>
          <h1 className="mt-1 font-bold text-white text-3xl tracking-tight">
            {isSubmitted ? 'Registration Submitted' : 'Register Admin Account'}
          </h1>
          <p className="mt-1 text-gray-400 text-sm">
            {isSubmitted
              ? 'Your account has been created and is waiting for database approval'
              : 'Submit your administrator details for approval'}
          </p>
        </div>

        {/* SUBMITTED SUCCESS CARD */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="flex justify-center items-center bg-amber-500/20 mx-auto mb-5 border border-amber-500/30 rounded-full w-16 h-16 text-amber-400 text-2xl">
              <FaHourglassHalf className="animate-pulse" />
            </div>

            <div className="bg-neutral-900/80 p-5 border border-neutral-700 rounded-xl text-left space-y-3">
              <div className="flex items-center gap-2 text-[#E3F0B6] text-sm font-semibold">
                <FaDatabase className="text-amber-400" /> Status: PENDING in MongoDB
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                Your admin account for <strong className="text-white">{submittedEmail}</strong> has been registered with status <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">PENDING</span>.
              </p>
              <div className="p-3 bg-black/50 rounded-lg border border-white/5 text-xs text-gray-400">
                <p className="font-semibold text-gray-200 mb-1">To activate this account:</p>
                1. Open your MongoDB Atlas / database.<br />
                2. Find this user in the <code className="text-amber-300 font-mono">users</code> collection.<br />
                3. Update <code className="text-amber-300 font-mono">status</code> to <code className="text-emerald-400 font-mono">&quot;APPROVED&quot;</code>.<br />
                4. Sign in from the Sign In portal.
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <Link
                href="/auth/signin"
                className="flex justify-center items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] py-3.5 rounded-xl font-semibold text-white text-sm transition"
              >
                Proceed to Admin Sign In <FaArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="bg-neutral-800 hover:bg-neutral-700 py-2.5 rounded-xl text-gray-300 hover:text-white text-xs transition"
              >
                Register Another Account
              </button>
            </div>
          </motion.div>
        ) : (
          /* REGISTRATION FORM */
          <>
            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 mb-6 p-3.5 border border-red-500/30 rounded-xl text-red-300 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                <div>
                  <label className="block mb-1.5 font-medium text-gray-300 text-xs uppercase tracking-wider">
                    First Name *
                  </label>
                  <div className="relative">
                    <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                      <FaUser className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Inmaj"
                      className="bg-neutral-900/80 p-3 pl-9 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 font-medium text-gray-300 text-xs uppercase tracking-wider">
                    Last Name *
                  </label>
                  <div className="relative">
                    <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                      <FaUser className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Hossain"
                      className="bg-neutral-900/80 p-3 pl-9 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-medium text-gray-300 text-xs uppercase tracking-wider">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                    <FaEnvelope className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@monsi.com"
                    className="bg-neutral-900/80 p-3 pl-9 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-medium text-gray-300 text-xs uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                    <FaPhone className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+880 1515212670"
                    className="bg-neutral-900/80 p-3 pl-9 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                  />
                </div>
              </div>

              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                <div>
                  <label className="block mb-1.5 font-medium text-gray-300 text-xs uppercase tracking-wider">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                      <FaLock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min 6 chars"
                      className="bg-neutral-900/80 p-3 pl-9 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 font-medium text-gray-300 text-xs uppercase tracking-wider">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                      <FaLock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      className="bg-neutral-900/80 p-3 pl-9 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-medium text-gray-300 text-xs uppercase tracking-wider">
                  Admin Passkey (Optional)
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                    <FaKey className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="password"
                    name="passkey"
                    value={formData.passkey}
                    onChange={handleChange}
                    placeholder="Enter passkey if configured in .env"
                    className="bg-neutral-900/80 p-3 pl-9 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex justify-center items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] disabled:opacity-50 shadow-lg shadow-[#0C969C]/20 mt-6 py-3.5 rounded-xl w-full font-semibold text-white text-sm transition duration-200 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
                    Submitting Registration...
                  </div>
                ) : (
                  <>
                    Submit Admin Registration <FaArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Footer info */}
            <div className="mt-8 pt-6 border-white/10 border-t text-center">
              <p className="text-gray-400 text-xs">
                Already registered as an admin?{' '}
                <Link
                  href="/auth/signin"
                  className="font-medium text-[#E3F0B6] hover:text-white transition underline"
                >
                  Sign In
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
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center bg-[#021e1f] min-h-screen text-white">
          Loading Sign Up...
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}
