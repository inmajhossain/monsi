"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCheckCircle, FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: formData.name.trim(),
          clientEmail: formData.email.trim(),
          clientPhone: formData.phone.trim() || "+8801515212670",
          propertyId: "600000000000000000000002",
          propertyTitle: "Home Page Consultation Inquiry",
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.error || "Failed to submit inquiry.");
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex lg:flex-row flex-col w-full min-h-[600px] bg-[#021819] overflow-hidden border-t border-white/10">
      {/* LEFT IMAGE SHOWCASE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative w-full lg:w-1/2 h-[350px] md:h-[450px] lg:h-auto overflow-hidden bg-neutral-950"
      >
        <Image
          src="/image/contact/contact.webp"
          alt="Monsi Engineering Studio"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover brightness-90 hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-[#021819] lg:block hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#021819] via-transparent to-transparent lg:hidden block" />

        <div className="bottom-6 left-6 right-6 absolute bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/15 max-w-md">
          <div className="flex items-center gap-2 text-[#E3F0B6] font-semibold text-xs uppercase tracking-widest mb-1">
            <FaMapMarkerAlt className="text-amber-400" />
            Mirpur Design Studio
          </div>
          <h4 className="font-bold text-white text-base">Monsi Engineering Headquarters</h4>
          <p className="text-gray-300 text-xs mt-0.5">Suite 07, Doreen Vinchita Complex, Rupnagar R/A, Dhaka</p>
        </div>
      </motion.div>

      {/* RIGHT INQUIRY FORM */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex justify-center items-center px-6 md:px-12 py-12 w-full lg:w-1/2"
      >
        <div className="w-full max-w-lg space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#0C969C]/15 border border-[#0C969C]/30 px-3 py-1 rounded-full text-[#E3F0B6] text-xs font-semibold uppercase tracking-wider mb-2">
              Get In Touch
            </div>
            <h2 className="font-bold text-white text-3xl md:text-4xl tracking-tight">
              Ready to engineer your next project?
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              Send us a message and our lead structural and architectural consultants will respond within 24 hours.
            </p>
          </div>

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/15 p-4 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-3"
            >
              <FaCheckCircle className="text-xl shrink-0 text-emerald-400" />
              <div>
                <p className="font-bold text-white">Inquiry Sent Successfully!</p>
                <p className="text-emerald-200 text-[11px] mt-0.5">Our consultants will reach out to you shortly.</p>
              </div>
            </motion.div>
          )}

          {error && (
            <div className="bg-red-500/15 p-3 border border-red-500/30 rounded-xl text-red-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block mb-1 font-medium text-gray-300 uppercase tracking-wider text-[11px]">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Inmaj Hossain"
                className="bg-neutral-900/80 p-3 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-1 focus:ring-[#0C969C] outline-none w-full text-white placeholder-gray-500 text-xs transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-300 uppercase tracking-wider text-[11px]">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="bg-neutral-900/80 p-3 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-1 focus:ring-[#0C969C] outline-none w-full text-white placeholder-gray-500 text-xs transition"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-300 uppercase tracking-wider text-[11px]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+880 1515..."
                  className="bg-neutral-900/80 p-3 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-1 focus:ring-[#0C969C] outline-none w-full text-white placeholder-gray-500 text-xs transition"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-300 uppercase tracking-wider text-[11px]">
                Message / Project Details *
              </label>
              <textarea
                name="message"
                required
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your site location, project requirements, or questions..."
                className="bg-neutral-900/80 p-3 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-1 focus:ring-[#0C969C] outline-none w-full text-white placeholder-gray-500 text-xs transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] disabled:opacity-50 shadow-md shadow-[#0C969C]/25 py-3 rounded-xl w-full font-bold text-white text-xs transition duration-200 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="border-2 border-white/30 border-t-white rounded-full w-3.5 h-3.5 animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                <>
                  <FaPaperPlane className="w-3 h-3" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
