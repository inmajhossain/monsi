'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaPaperPlane,
  FaShieldAlt,
  FaBuilding,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Architectural Engineering',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Post to our bookings / inquiries API
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: formData.name.trim(),
          clientEmail: formData.email.trim(),
          clientPhone: formData.phone.trim(),
          propertyId: '600000000000000000000000', // General consultation reference ID
          propertyTitle: `Inquiry: ${formData.service}`,
          message: `[Service: ${formData.service}]\n${formData.message.trim()}`,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Architectural Engineering',
          message: '',
        });
      } else {
        setError(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch {
      setError('An error occurred. Please contact us directly via phone or email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-[#021819] text-white min-h-screen overflow-hidden selection:bg-[#0C969C] selection:text-white">
      {/* Ambient glows */}
      <div className="top-0 left-1/4 -z-0 absolute bg-[#0C969C]/15 blur-[180px] rounded-full w-[600px] h-[600px] pointer-events-none" />
      <div className="top-1/2 right-10 -z-0 absolute bg-amber-500/10 blur-[200px] rounded-full w-[700px] h-[700px] pointer-events-none" />

      <section className="relative z-10 pt-36 pb-24 lg:pt-44 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 bg-[#0C969C]/15 mx-auto px-4 py-1.5 border border-[#0C969C]/30 rounded-full font-semibold text-[#E3F0B6] text-xs uppercase tracking-widest w-fit"
          >
            <FaShieldAlt className="text-amber-400" />
            Connect With Our Engineering Studio
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-bold text-4xl sm:text-6xl text-white tracking-tight"
          >
            Let&apos;s Build Your Landmark
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-gray-300 text-sm sm:text-base leading-relaxed"
          >
            Schedule an on-site feasibility consultation, request structural audits, or inquire about prime residential developments across Dhaka.
          </motion.p>
        </div>

        {/* MAIN SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: STUDIO INFO & DIRECT DETAILS */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Headquarters Card */}
            <div className="bg-black/50 shadow-2xl backdrop-blur-xl p-8 border border-white/10 rounded-3xl space-y-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/image/logo/monsi-logo.png"
                  alt="Monsi Engineering"
                  width={50}
                  height={50}
                  className="w-auto h-auto drop-shadow-md"
                />
                <div>
                  <h3 className="font-bold text-white text-lg">Monsi Engineering</h3>
                  <p className="text-gray-400 text-xs">Architectural & Structural Consultants</p>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-white/10 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="flex justify-center items-center bg-[#0C969C]/15 p-2.5 rounded-xl text-[#0C969C] shrink-0 mt-0.5">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Studio Headquarters</h4>
                    <p className="text-gray-300 text-xs mt-0.5 leading-relaxed">
                      Suite - 07, Doreen Vinchita Complex, Rupnagar R/A, Mirpur, Dhaka - 1216, Bangladesh.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex justify-center items-center bg-[#0C969C]/15 p-2.5 rounded-xl text-[#0C969C] shrink-0 mt-0.5">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Direct Hotline</h4>
                    <a href="tel:+8801515212670" className="text-[#E3F0B6] hover:underline text-xs mt-0.5 block font-semibold">
                      +880 1515212670
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex justify-center items-center bg-[#0C969C]/15 p-2.5 rounded-xl text-[#0C969C] shrink-0 mt-0.5">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Official Email</h4>
                    <a href="mailto:jwel@monsi.com" className="text-gray-300 hover:text-white text-xs mt-0.5 block">
                      jwel@monsi.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex justify-center items-center bg-[#0C969C]/15 p-2.5 rounded-xl text-[#0C969C] shrink-0 mt-0.5">
                    <FaClock />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Working Hours</h4>
                    <p className="text-gray-300 text-xs mt-0.5">
                      Saturday – Thursday: 9:00 AM – 7:00 PM<br />
                      <span className="text-amber-400/80">Friday: By Appointment Only</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <span className="text-xs text-gray-400 font-semibold">Follow Us:</span>
                <div className="flex gap-2 text-gray-300">
                  <a href="#" className="p-2 bg-neutral-900 hover:bg-[#0C969C] rounded-lg hover:text-white transition">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="p-2 bg-neutral-900 hover:bg-[#0C969C] rounded-lg hover:text-white transition">
                    <FaFacebook />
                  </a>
                  <a href="#" className="p-2 bg-neutral-900 hover:bg-[#0C969C] rounded-lg hover:text-white transition">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: INTERACTIVE INQUIRY FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-black/50 shadow-2xl backdrop-blur-xl p-8 sm:p-10 border border-white/10 rounded-3xl"
          >
            <h3 className="font-bold text-white text-2xl mb-1">
              Send a Message or Consultation Request
            </h3>
            <p className="text-gray-400 text-xs mb-6">
              Our lead engineers will review your request and contact you within 24 hours.
            </p>

            {/* Success Alert */}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/15 mb-6 p-5 border border-emerald-500/40 rounded-2xl flex items-center gap-3 text-emerald-300 text-sm"
              >
                <FaCheckCircle className="text-2xl shrink-0" />
                <div>
                  <p className="font-bold text-white">Inquiry Received Successfully!</p>
                  <p className="text-xs text-emerald-200 mt-0.5">
                    Thank you for reaching out. A senior engineering consultant will contact you shortly.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="bg-red-500/15 mb-6 p-4 border border-red-500/30 rounded-xl text-red-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                <div>
                  <label className="block mb-1.5 font-medium text-gray-300 text-xs uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Inmaj Hossain"
                    className="bg-neutral-900/80 p-3.5 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-medium text-gray-300 text-xs uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="bg-neutral-900/80 p-3.5 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                  />
                </div>
              </div>

              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                <div>
                  <label className="block mb-1.5 font-medium text-gray-300 text-xs uppercase tracking-wider">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1515212670"
                    className="bg-neutral-900/80 p-3.5 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-medium text-gray-300 text-xs uppercase tracking-wider">
                    Primary Service of Interest *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="bg-neutral-900/80 p-3.5 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white text-sm transition appearance-none cursor-pointer"
                  >
                    <option value="Architectural Engineering">Architectural Engineering</option>
                    <option value="Structural Engineering & Audits">Structural Engineering & Audits</option>
                    <option value="Interior Architecture & Design">Interior Architecture & Design</option>
                    <option value="Construction & Project Management">Construction Management</option>
                    <option value="Residential Property Inquiries">Residential Property Inquiries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-medium text-gray-300 text-xs uppercase tracking-wider">
                  Project Details / Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your plot location, building dimensions, project timeline, or specific requirements..."
                  className="bg-neutral-900/80 p-3.5 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex justify-center items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] disabled:opacity-50 shadow-xl shadow-[#0C969C]/25 mt-6 py-4 rounded-xl w-full font-bold text-white text-sm transition duration-200 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
                    Sending Inquiry...
                  </div>
                ) : (
                  <>
                    <FaPaperPlane className="w-3.5 h-3.5" /> Submit Consultation Request
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
