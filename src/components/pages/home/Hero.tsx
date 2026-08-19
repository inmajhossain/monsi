"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div className="relative w-screen h-[480px] lg:h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="top-0 left-0 absolute w-full h-full object-cover"
        src="/image/hero/realestatevideo.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#021819] via-black/40 to-black/60" />

      {/* Content */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="z-10 relative flex flex-col justify-center items-center lg:items-start gap-6 px-6 lg:px-20 h-full max-w-7xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 bg-[#0C969C]/20 border border-[#0C969C]/40 px-4 py-1.5 rounded-full text-[#E3F0B6] text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Pioneering Sustainable Architecture
        </div>

        <h1 className="font-bold text-white text-3xl sm:text-5xl lg:text-6xl text-center lg:text-left leading-tight max-w-4xl tracking-tight">
          Reimagining urban living through sustainable design and human-centered development.
        </h1>

        <div className="flex flex-wrap gap-4 mt-2">
          <Link
            href="/properties"
            className="flex items-center gap-3 bg-[#0C969C] hover:bg-[#0aa3aa] px-8 py-3.5 rounded-xl font-bold text-white text-sm shadow-xl shadow-[#0C969C]/30 transition hover:scale-103"
          >
            <span>VIEW PROPERTIES</span>
            <FaArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-2 bg-black/50 hover:bg-black/80 px-8 py-3.5 border border-white/20 rounded-xl font-semibold text-gray-200 hover:text-white text-sm backdrop-blur-md transition"
          >
            <span>About Our Studio</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;
