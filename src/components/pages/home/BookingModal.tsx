// components/BookingModal.tsx
'use client';

import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  propertyTitle: string;
  onSuccess: () => void;
}

interface FormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  message: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  propertyId,
  propertyTitle,
  onSuccess,
}: BookingModalProps) {
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          propertyId,
          propertyTitle,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          message: '',
        });
        onSuccess();
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 2200);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Failed to submit booking inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative bg-neutral-900 shadow-2xl p-6 sm:p-8 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Decorative Top Gradient Line */}
        <div className="top-0 right-0 left-0 absolute bg-gradient-to-r from-[#0C969C] via-[#E3F0B6] to-[#0C969C] h-1" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="top-5 right-5 absolute text-gray-400 hover:text-white transition p-1"
          aria-label="Close modal"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="flex justify-center items-center bg-emerald-500/20 mx-auto rounded-full w-16 h-16 text-emerald-400 text-3xl">
              <FaCheckCircle />
            </div>
            <h3 className="font-bold text-white text-2xl">Viewing Request Sent!</h3>
            <p className="text-gray-300 text-sm max-w-sm mx-auto">
              Thank you! Our property advisory team will reach out to you within 24 hours regarding &ldquo;{propertyTitle}&rdquo;.
            </p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-1.5 font-semibold text-[#E3F0B6] text-xs uppercase tracking-widest mb-1">
                <FaCalendarAlt className="text-amber-400" />
                Schedule a Private Viewing
              </div>
              <h3 className="font-bold text-white text-2xl truncate">
                {propertyTitle}
              </h3>
              <p className="mt-1 text-gray-400 text-xs">
                Fill in your details below to schedule an on-site consultation or request exclusive details.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-500/10 mb-4 p-3 border border-red-500/20 rounded-xl text-red-300 text-xs text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="clientName"
                  className="block mb-1 font-medium text-gray-300 text-xs uppercase tracking-wider"
                >
                  Full Name *
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                    <FaUser className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    required
                    className="bg-neutral-950/80 p-3 pl-9 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                    placeholder="e.g. Inmaj Hossain"
                  />
                </div>
              </div>

              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="clientEmail"
                    className="block mb-1 font-medium text-gray-300 text-xs uppercase tracking-wider"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                      <FaEnvelope className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="email"
                      id="clientEmail"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleChange}
                      required
                      className="bg-neutral-950/80 p-3 pl-9 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                      placeholder="name@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="clientPhone"
                    className="block mb-1 font-medium text-gray-300 text-xs uppercase tracking-wider"
                  >
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                      <FaPhone className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="tel"
                      id="clientPhone"
                      name="clientPhone"
                      value={formData.clientPhone}
                      onChange={handleChange}
                      required
                      className="bg-neutral-950/80 p-3 pl-9 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                      placeholder="+880 1515..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-1 font-medium text-gray-300 text-xs uppercase tracking-wider"
                >
                  Your Message or Preferred Time *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="bg-neutral-950/80 p-3 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                  placeholder="I would like to schedule a viewing this Saturday or receive floor plans..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex justify-center items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] disabled:opacity-50 shadow-lg shadow-[#0C969C]/20 mt-6 py-3.5 rounded-xl w-full font-bold text-white text-sm transition duration-200 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
                    Submitting Inquiry...
                  </div>
                ) : (
                  <>
                    <FaPaperPlane className="w-3.5 h-3.5" /> Submit Booking Request
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}