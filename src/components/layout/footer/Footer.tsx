"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTimes,
  FaCheckCircle,
  FaPaperPlane,
  FaArrowUp,
  FaClock,
} from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    appointmentDate: "",
    serviceType: "Architectural & Structural Consultation",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName: formData.clientName.trim(),
          clientEmail: formData.clientEmail.trim(),
          clientPhone: formData.clientPhone.trim(),
          propertyId: "600000000000000000000001",
          propertyTitle: `Appointment: ${formData.serviceType}`,
          message: `[Preferred Date: ${formData.appointmentDate || "Flexible"}]\n[Service: ${formData.serviceType}]\n${formData.message.trim()}`,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          clientName: "",
          clientEmail: "",
          clientPhone: "",
          appointmentDate: "",
          serviceType: "Architectural & Structural Consultation",
          message: "",
        });
        setTimeout(() => {
          setSubmitted(false);
          setIsModalOpen(false);
        }, 2200);
      } else {
        setError(data.error || "Failed to book appointment. Please try again.");
      }
    } catch {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#011314] text-white border-t border-white/10 overflow-hidden w-full selection:bg-[#0C969C] selection:text-white">
      {/* Ambient Lighting Gradients */}
      <div className="top-0 left-1/4 -z-0 absolute bg-[#0C969C]/10 blur-[140px] rounded-full w-[400px] h-[300px] pointer-events-none" />
      <div className="right-10 bottom-0 -z-0 absolute bg-amber-500/10 blur-[150px] rounded-full w-[500px] h-[300px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-8 pb-6 w-full max-w-[1500px]">
        {/* COMPACT TOP CALLOUT BAR */}
        <div className="bg-gradient-to-r from-[#022829] via-neutral-900/90 to-[#022829] shadow-xl backdrop-blur-md mb-8 px-6 py-4 border border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="flex justify-center items-center bg-[#0C969C]/20 border border-[#0C969C]/40 rounded-xl w-10 h-10 text-[#E3F0B6] shrink-0">
              <FaCalendarAlt className="text-sm" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base leading-snug">
                Need an Engineering or Architectural Consultation?
              </h4>
              <p className="text-gray-300 text-xs">
                Schedule a one-on-one session with our chief consultants in Dhaka.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] px-5 py-2.5 rounded-xl font-bold text-white text-xs shadow-md shadow-[#0C969C]/25 transition hover:scale-102"
            >
              <FaCalendarAlt className="text-amber-300" />
              <span>Book Appointment</span>
            </button>
            <a
              href="https://wa.me/8801515212670"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 px-4 py-2.5 border border-emerald-500/40 rounded-xl font-semibold text-emerald-300 text-xs transition"
            >
              <FaWhatsapp className="text-sm text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* EQUALLY DIVIDED 4-COLUMN CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12 pb-6 border-b border-white/10">
          {/* Column 1: Brand & Social */}
          <div className="flex flex-col space-y-3">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/image/logo/monsi-logo.png"
                alt="Monsi Engineering"
                width={44}
                height={44}
                className="w-auto h-auto drop-shadow shrink-0"
              />
              <div>
                <h4 className="font-serif text-lg font-bold text-white leading-tight">
                  Monsi Engineering
                </h4>
                <p className="text-gray-400 text-[11px]">
                  & Construction Ltd.
                </p>
              </div>
            </Link>

            <p className="text-gray-300 text-xs leading-relaxed">
              Pioneering sustainable urban development, seismic structural precision, and bespoke luxury architecture in Dhaka since 2014.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2">
              {[
                { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
                { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
                { icon: FaXTwitter, href: "https://twitter.com", label: "X" },
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center bg-neutral-900 hover:bg-[#0C969C] p-2 rounded-lg text-gray-300 hover:text-white border border-white/10 transition hover:scale-105"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-2.5 sm:pl-4">
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#E3F0B6] mb-1">
              Quick Links
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#0C969C] transition">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#0C969C] transition">
                  About Our Studio
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-300 hover:text-[#0C969C] transition">
                  Properties Gallery
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-[#0C969C] transition">
                  Landmark Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#0C969C] transition">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Disciplines */}
          <div className="flex flex-col space-y-2.5">
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#E3F0B6] mb-1">
              Disciplines
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/architectural" className="text-gray-300 hover:text-[#0C969C] transition">
                  Architectural Engineering
                </Link>
              </li>
              <li>
                <Link href="/structural" className="text-gray-300 hover:text-[#0C969C] transition">
                  Structural Engineering
                </Link>
              </li>
              <li>
                <Link href="/interior" className="text-gray-300 hover:text-[#0C969C] transition">
                  Interior Architecture
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#0C969C] transition">
                  Construction Management
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="text-gray-400 hover:text-amber-300 transition font-mono">
                  Admin Sign In →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Headquarters */}
          <div className="flex flex-col space-y-2.5">
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#E3F0B6] mb-1">
              Studio Headquarters
            </h5>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-[#0C969C] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Suite - 07, Doreen Vinchita Complex, Rupnagar R/A, Mirpur, Dhaka - 1216.
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-[#0C969C] shrink-0" />
                <a href="tel:+8801515212670" className="hover:text-white font-medium">
                  +880 1515212670
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <FaEnvelope className="text-[#0C969C] shrink-0" />
                <a href="mailto:jwel@monsi.com" className="hover:text-white">
                  jwel@monsi.com
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <FaClock className="text-amber-400 shrink-0 mt-0.5" />
                <span className="text-[11px] text-gray-400">
                  Sat – Thu: 9:00 AM – 7:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Monsi Engineering & Construction. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <span className="text-gray-400 text-[11px]">
              Site by <strong className="text-gray-200">Inmaj Hossain</strong>
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 bg-white/5 hover:bg-[#0C969C] px-2.5 py-1 rounded text-gray-300 hover:text-white transition text-xs border border-white/10"
              title="Back to Top"
            >
              <span>Top</span>
              <FaArrowUp className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      </div>

      {/* APPOINTMENT BOOKING MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="z-50 fixed inset-0 flex justify-center items-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-neutral-900 border border-white/15 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-10 p-6 sm:p-7"
            >
              {/* Top Accent Line */}
              <div className="top-0 right-0 left-0 absolute bg-gradient-to-r from-[#0C969C] via-[#E3F0B6] to-[#0C969C] h-1" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="top-4 right-4 absolute text-gray-400 hover:text-white transition p-1.5 bg-black/40 hover:bg-black rounded-full"
                aria-label="Close"
              >
                <FaTimes className="w-3.5 h-3.5" />
              </button>

              {submitted ? (
                <div className="py-6 text-center space-y-2">
                  <div className="flex justify-center items-center bg-emerald-500/20 mx-auto rounded-full w-14 h-14 text-emerald-400 text-2xl">
                    <FaCheckCircle />
                  </div>
                  <h3 className="font-bold text-white text-xl">Appointment Scheduled!</h3>
                  <p className="text-gray-300 text-xs max-w-sm mx-auto">
                    Thank you! Our engineering consultant will confirm your session via phone or email within 24 hours.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 font-semibold text-[#E3F0B6] text-[11px] uppercase tracking-wider mb-0.5">
                      <FaCalendarAlt className="text-amber-400" />
                      Monsi Engineering Studio
                    </div>
                    <h3 className="font-bold text-white text-xl">
                      Book an Engineering Appointment
                    </h3>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 mb-3 p-2.5 border border-red-500/20 rounded-lg text-red-300 text-xs text-center">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleBookSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block mb-1 font-medium text-gray-300 uppercase tracking-wider text-[11px]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        required
                        value={formData.clientName}
                        onChange={handleChange}
                        placeholder="e.g. Inmaj Hossain"
                        className="bg-neutral-950/80 p-2.5 border border-neutral-700 focus:border-[#0C969C] rounded-lg focus:ring-1 focus:ring-[#0C969C] outline-none w-full text-white placeholder-gray-500 text-xs transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block mb-1 font-medium text-gray-300 uppercase tracking-wider text-[11px]">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="clientEmail"
                          required
                          value={formData.clientEmail}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          className="bg-neutral-950/80 p-2.5 border border-neutral-700 focus:border-[#0C969C] rounded-lg focus:ring-1 focus:ring-[#0C969C] outline-none w-full text-white placeholder-gray-500 text-xs transition"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 font-medium text-gray-300 uppercase tracking-wider text-[11px]">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="clientPhone"
                          required
                          value={formData.clientPhone}
                          onChange={handleChange}
                          placeholder="+880 1515..."
                          className="bg-neutral-950/80 p-2.5 border border-neutral-700 focus:border-[#0C969C] rounded-lg focus:ring-1 focus:ring-[#0C969C] outline-none w-full text-white placeholder-gray-500 text-xs transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block mb-1 font-medium text-gray-300 uppercase tracking-wider text-[11px]">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          name="appointmentDate"
                          value={formData.appointmentDate}
                          onChange={handleChange}
                          className="bg-neutral-950/80 p-2.5 border border-neutral-700 focus:border-[#0C969C] rounded-lg focus:ring-1 focus:ring-[#0C969C] outline-none w-full text-white text-xs transition cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 font-medium text-gray-300 uppercase tracking-wider text-[11px]">
                          Discipline *
                        </label>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          className="bg-neutral-950/80 p-2.5 border border-neutral-700 focus:border-[#0C969C] rounded-lg focus:ring-1 focus:ring-[#0C969C] outline-none w-full text-white text-xs transition cursor-pointer"
                        >
                          <option value="Architectural & Structural Consultation">Architectural & Structural</option>
                          <option value="Luxury Interior Design Session">Interior Architecture</option>
                          <option value="Structural Health & Seismic Audit">Structural Audit</option>
                          <option value="Construction & Project Feasibility">Construction Management</option>
                          <option value="Residential Property Inquiries">Property Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-300 uppercase tracking-wider text-[11px]">
                        Project Notes / Plot Details
                      </label>
                      <textarea
                        name="message"
                        rows={2}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Briefly describe your location, building size, or requirements..."
                        className="bg-neutral-950/80 p-2.5 border border-neutral-700 focus:border-[#0C969C] rounded-lg focus:ring-1 focus:ring-[#0C969C] outline-none w-full text-white placeholder-gray-500 text-xs transition"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex justify-center items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] disabled:opacity-50 shadow-md shadow-[#0C969C]/25 mt-3 py-3 rounded-lg w-full font-bold text-white text-xs transition duration-200 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="border-2 border-white/30 border-t-white rounded-full w-3.5 h-3.5 animate-spin" />
                          <span>Scheduling...</span>
                        </div>
                      ) : (
                        <>
                          <FaPaperPlane className="w-3 h-3" />
                          <span>Confirm & Book Appointment</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
