'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { FaLock, FaEnvelope, FaArrowRight, FaShieldAlt } from 'react-icons/fa';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/add-property';
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to sign in. Please verify your credentials.');
        setLoading(false);
        return;
      }

      setSuccess('Admin login successful! Redirecting...');
      login(data.token, data.user);

      setTimeout(() => {
        router.push(callbackUrl);
        router.refresh();
      }, 1000);
    } catch {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
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
        className="z-10 bg-black/50 shadow-2xl backdrop-blur-xl p-8 sm:p-10 border border-white/10 rounded-2xl w-full max-w-md"
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
            Admin Portal
          </div>
          <h1 className="mt-1 font-bold text-white text-3xl tracking-tight">
            Sign In
          </h1>
          <p className="mt-1 text-gray-400 text-sm">
            Access property management & administrator features
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 mb-6 p-3.5 border border-red-500/30 rounded-xl text-red-300 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-500/10 mb-6 p-3.5 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm text-center"
          >
            {success}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-gray-300 text-xs uppercase tracking-wider">
              Admin Email
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
                className="bg-neutral-900/80 p-3.5 pl-10 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-300 text-xs uppercase tracking-wider">
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
                className="bg-neutral-900/80 p-3.5 pl-10 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
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
                Signing In...
              </div>
            ) : (
              <>
                Sign In to Dashboard <FaArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-white/10 border-t text-center">
          <p className="text-gray-400 text-xs">
            Don&apos;t have an admin account?{' '}
            <Link
              href="/auth/signup"
              className="font-medium text-[#E3F0B6] hover:text-white transition underline"
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
