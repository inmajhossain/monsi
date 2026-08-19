'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaBuilding,
  FaCompass,
  FaShieldAlt,
  FaAward,
  FaUsers,
  FaHardHat,
  FaDraftingCompass,
  FaTree,
  FaArrowRight,
  FaCheckCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGem,
  FaCube,
  FaLightbulb,
} from 'react-icons/fa';

export default function AboutPage() {
  const stats = [
    { number: '150+', label: 'Landmark Projects', detail: 'Completed across Dhaka' },
    { number: '12+', label: 'Years of Excellence', detail: 'Established in 2014' },
    { number: '99.9%', label: 'Structural Safety', detail: 'BNBC & ACI Compliant' },
    { number: '45+', label: 'Design Accolades', detail: 'Architectural recognition' },
  ];

  const pillars = [
    {
      icon: FaDraftingCompass,
      title: 'Architectural Engineering',
      desc: 'Master planning and parametric architecture that harmonizes contemporary aesthetics with spatial functionality.',
      highlight: 'BIM Level 2 Enabled',
    },
    {
      icon: FaHardHat,
      title: 'Structural Engineering',
      desc: 'Rigorous seismic, wind-load, and soil-structure calculations ensuring lifetime safety and earthquake resilience.',
      highlight: 'BNBC & AISC Standards',
    },
    {
      icon: FaCube,
      title: 'Interior Design & Spatial Art',
      desc: 'Bespoke luxury interiors, acoustic balancing, custom joinery, and biophilic elements tailored for modern living.',
      highlight: 'Custom Craftsmanship',
    },
    {
      icon: FaBuilding,
      title: 'Construction Management',
      desc: 'Turnkey project execution with rigorous material testing, cost optimization, and strict timeline adherence.',
      highlight: 'Full Quality Assurance',
    },
    {
      icon: FaTree,
      title: 'Sustainable Green Building',
      desc: 'Energy-neutral planning, vertical greenery, rainwater harvesting, and eco-conscious insulation systems.',
      highlight: 'Eco-Resilient Footprint',
    },
    {
      icon: FaShieldAlt,
      title: 'Residential Development',
      desc: 'Developing elite residential penthouses, duplexes, and private gated residences in premier Dhaka neighborhoods.',
      highlight: 'Prime Dhaka Locations',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Site Feasibility & Conceptualization',
      desc: 'Comprehensive topography assessment, soil analysis, solar path study, and zoning code validation.',
    },
    {
      step: '02',
      title: 'Architectural & 3D BIM Modeling',
      desc: 'Collaborative architectural sketching, virtual 3D rendering, daylight simulation, and spatial flow optimization.',
    },
    {
      step: '03',
      title: 'Structural Calculation & Safety Simulation',
      desc: 'Finite element structural modeling, seismic load stress-testing, and rigorous engineering peer review.',
    },
    {
      step: '04',
      title: 'Precision Construction & Handover',
      desc: 'On-site engineering supervision, premium material procurement, continuous QA, and turnkey client handover.',
    },
  ];

  const leaders = [
    {
      name: 'Inmaj Hossain',
      role: 'Founder & Principal Consultant',
      badge: 'Structural Engineering Specialist',
      desc: 'Over a decade of pioneering structural and architectural innovations across high-density urban developments.',
    },
    {
      name: 'Tania Rahman',
      role: 'Lead Architectural Engineer',
      badge: 'Bioclimatic & Urban Design',
      desc: 'Master of Architecture with a focus on human-centric sustainable housing and modern façade engineering.',
    },
    {
      name: 'Rafiqul Islam',
      role: 'Director of Construction & QA',
      badge: 'Project Operations',
      desc: 'Oversees on-site execution, safety protocols, material lifecycle analysis, and strict timeline adherence.',
    },
    {
      name: 'Nusrat Jahan',
      role: 'Head of Interior Architecture',
      badge: 'Spatial & Luxury Interior',
      desc: 'Transforms structural spaces into serene, functional sanctuaries with tailored textures and light acoustics.',
    },
  ];

  return (
    <div className="relative bg-[#021819] text-white min-h-screen overflow-hidden selection:bg-[#0C969C] selection:text-white">
      {/* Background Ambient Atmosphere */}
      <div className="top-0 left-1/4 -z-0 absolute bg-[#0C969C]/15 blur-[180px] rounded-full w-[600px] h-[600px] pointer-events-none" />
      <div className="top-1/2 right-10 -z-0 absolute bg-amber-500/10 blur-[200px] rounded-full w-[700px] h-[700px] pointer-events-none" />
      <div className="bottom-0 left-1/3 -z-0 absolute bg-[#033030]/30 blur-[180px] rounded-full w-[500px] h-[500px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 pt-36 pb-20 lg:pt-44 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 bg-[#0C969C]/15 px-4 py-1.5 border border-[#0C969C]/30 rounded-full font-semibold text-[#E3F0B6] text-xs uppercase tracking-widest"
          >
            <FaGem className="text-amber-400" />
            Engineering Legacy · Established 2014
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight max-w-5xl leading-[1.1]"
          >
            Engineered with Precision.{' '}
            <span className="bg-gradient-to-r from-[#E3F0B6] via-[#0C969C] to-amber-300 bg-clip-text text-transparent">
              Designed for Generations.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-3xl text-gray-300 text-base sm:text-xl leading-relaxed font-light"
          >
            Monsi Engineering is an interdisciplinary architectural, structural, and construction firm based in Dhaka. We fuse scientific engineering with visionary architectural aesthetics to craft sustainable, earthquake-resilient landmarks.
          </motion.p>

          {/* Quick CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8"
          >
            <Link
              href="/properties"
              className="flex items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] px-7 py-3.5 rounded-xl font-bold text-white text-sm shadow-xl shadow-[#0C969C]/25 transition"
            >
              Explore Our Properties <FaArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-neutral-900/80 hover:bg-neutral-800 px-7 py-3.5 border border-white/15 rounded-xl font-semibold text-gray-200 hover:text-white text-sm transition"
            >
              Consult With Our Engineers
            </Link>
          </motion.div>
        </div>

        {/* Hero Visual Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mt-16 rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black/60 backdrop-blur-xl h-[360px] sm:h-[480px] lg:h-[560px]"
        >
          <Image
            src="/image/about/team.jpg"
            alt="Monsi Engineering Team & Studio"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover object-center brightness-95 hover:scale-103 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021819] via-black/20 to-transparent" />

          {/* Floating Accolade Chip */}
          <div className="bottom-6 left-6 sm:bottom-10 sm:left-10 absolute max-w-sm bg-black/75 shadow-2xl backdrop-blur-xl p-5 border border-white/15 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center bg-[#0C969C]/20 border border-[#0C969C]/40 rounded-xl w-12 h-12 text-[#0C969C] text-2xl">
                <FaCompass />
              </div>
              <div>
                <p className="font-bold text-white text-base">Studio & Innovation Lab</p>
                <p className="text-gray-300 text-xs">Mirpur, Rupnagar R/A, Dhaka</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* STATS STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-neutral-900/60 shadow-xl backdrop-blur-xl p-6 sm:p-8 border border-white/10 rounded-2xl text-center hover:border-[#0C969C]/40 transition group"
            >
              <h3 className="font-black text-3xl sm:text-5xl text-[#E3F0B6] tracking-tight group-hover:scale-105 transition-transform duration-300">
                {stat.number}
              </h3>
              <p className="mt-2 font-bold text-white text-sm sm:text-base">
                {stat.label}
              </p>
              <p className="mt-1 text-gray-400 text-xs">
                {stat.detail}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 2. PHILOSOPHY & SUSTAINABILITY (SPLIT SECTION) */}
      <section className="relative z-10 py-20 lg:py-28 bg-[#011415]/80 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Image Showcase */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl h-[420px] sm:h-[520px]">
                <Image
                  src="/image/about/building.jpg"
                  alt="Sustainable Architecture by Monsi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="bottom-6 left-6 right-6 absolute">
                  <span className="bg-[#0C969C] px-3 py-1 rounded-full font-bold text-white text-[11px] uppercase tracking-wider">
                    Biophilic Skyline
                  </span>
                  <h4 className="mt-2 font-bold text-white text-xl">
                    Sustainable Urban Living in Dhaka
                  </h4>
                  <p className="text-gray-300 text-xs mt-1">
                    Integrated vertical gardens, cross-ventilation, and thermal insulation engineering.
                  </p>
                </div>
              </div>

              {/* Decorative Corner Badge */}
              <div className="-bottom-5 -right-5 sm:bottom-6 sm:-right-6 absolute bg-[#022829] shadow-2xl p-4 sm:p-5 border border-amber-500/30 rounded-2xl max-w-[220px]">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <FaShieldAlt /> 100% Code Verified
                </div>
                <p className="text-gray-300 text-xs mt-1">
                  Full compliance with BNBC & International Structural Standards.
                </p>
              </div>
            </motion.div>

            {/* Right Story Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="flex items-center gap-2 font-semibold text-[#E3F0B6] text-xs uppercase tracking-widest">
                <FaLightbulb className="text-amber-400" />
                Our Core Philosophy
              </div>

              <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                Redefining the standard of living through innovation.
              </h2>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                At Monsi Engineering, we believe every structure should be more than concrete and glass—it should be an enduring sanctuary. In rapidly growing urban centers like Dhaka, our multidisciplinary team addresses complex challenges: climate resilience, seismic safety, space efficiency, and environmental harmony.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 bg-neutral-900/60 p-4 border border-white/10 rounded-xl">
                  <div className="bg-[#0C969C]/20 p-2 rounded-lg text-[#0C969C] mt-0.5">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Earthquake & Wind Resistance</h4>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Advanced 3D structural analysis modeling dynamic lateral loads and foundation stability.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-neutral-900/60 p-4 border border-white/10 rounded-xl">
                  <div className="bg-[#0C969C]/20 p-2 rounded-lg text-[#0C969C] mt-0.5">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Human-Centered Spatial Design</h4>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Balancing luxury layouts with acoustic privacy, natural airflow, and abundant sunlight.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-neutral-900/60 p-4 border border-white/10 rounded-xl">
                  <div className="bg-[#0C969C]/20 p-2 rounded-lg text-[#0C969C] mt-0.5">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Transparent Project Execution</h4>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Real-time client progress tracking, certified material sourcing, and zero compromise on safety.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CORE DISCIPLINES & EXPERTISE (BENTO GRID) */}
      <section className="relative z-10 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 font-semibold text-[#E3F0B6] text-xs uppercase tracking-widest">
            <FaBuilding className="text-amber-400" />
            Comprehensive Capabilities
          </div>
          <h2 className="mt-3 font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Our Engineering & Design Disciplines
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            From initial sketch and soil analysis to final key handover, our in-house departments deliver integrated excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-neutral-900/60 hover:bg-neutral-900/90 shadow-2xl backdrop-blur-xl p-8 border border-white/10 hover:border-[#0C969C]/40 rounded-2xl transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex justify-center items-center bg-[#0C969C]/15 group-hover:bg-[#0C969C] text-[#0C969C] group-hover:text-white rounded-2xl w-14 h-14 text-2xl transition-colors duration-300">
                      <Icon />
                    </div>
                    <span className="text-[11px] font-semibold text-[#E3F0B6] bg-black/40 px-3 py-1 rounded-full border border-white/10">
                      {pillar.highlight}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-xl group-hover:text-[#E3F0B6] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-[#0C969C] group-hover:translate-x-1 transition-transform">
                  <span>Learn more</span>
                  <FaArrowRight className="w-3 h-3" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. THE MONSI BLUEPRINT (PROCESS TIMELINE) */}
      <section className="relative z-10 py-20 lg:py-28 bg-[#011415]/90 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 font-semibold text-[#E3F0B6] text-xs uppercase tracking-widest">
              <FaCompass className="text-amber-400" />
              Methodical Execution
            </div>
            <h2 className="mt-3 font-bold text-3xl sm:text-5xl text-white tracking-tight">
              The Monsi Engineering Blueprint
            </h2>
            <p className="mt-3 text-gray-400 text-sm sm:text-base">
              A 4-phase systematic approach ensuring architectural fidelity, structural safety, and timeline precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-black/50 p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-[#0C969C]/40 transition relative group"
              >
                <div className="font-black text-5xl text-neutral-800 group-hover:text-[#0C969C]/30 transition-colors font-mono mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-white text-lg group-hover:text-[#E3F0B6] transition-colors">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-400 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP & ENGINEERING SPECIALISTS */}
      <section className="relative z-10 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 font-semibold text-[#E3F0B6] text-xs uppercase tracking-widest">
            <FaUsers className="text-amber-400" />
            Leadership & Vision
          </div>
          <h2 className="mt-3 font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Our Principal Specialists
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            Guided by veteran structural engineers, creative urban architects, and certified construction supervisors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {leaders.map((leader, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-neutral-900/60 hover:bg-neutral-900/90 shadow-xl backdrop-blur-xl p-6 border border-white/10 hover:border-[#0C969C]/40 rounded-2xl transition duration-300"
            >
              <div className="flex justify-center items-center bg-[#033030] mx-auto rounded-full w-20 h-20 text-[#0C969C] text-3xl font-bold border border-[#0C969C]/30 mb-4 shadow-inner">
                {leader.name.charAt(0)}
              </div>

              <div className="text-center">
                <h3 className="font-bold text-white text-lg">{leader.name}</h3>
                <p className="text-[#0C969C] font-semibold text-xs mt-0.5">{leader.role}</p>
                <span className="inline-block bg-white/5 text-[#E3F0B6] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full mt-2 border border-white/10">
                  {leader.badge}
                </span>
                <p className="text-gray-400 text-xs mt-3 leading-relaxed">
                  {leader.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. HEADQUARTERS & CONTACT BANNER */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#033030] via-[#021f20] to-[#033030] shadow-2xl p-8 sm:p-12 lg:p-16 border border-white/15 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-widest">
                <FaMapMarkerAlt /> Dhaka Headquarters
              </span>
              <h2 className="font-bold text-3xl sm:text-4xl text-white">
                Ready to engineer your next architectural vision?
              </h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-2xl">
                Visit our design studio at Suite - 07, Doreen Vinchita Complex, Rupnagar R/A, Mirpur, Dhaka or schedule an on-site feasibility consultation.
              </p>

              <div className="flex flex-wrap gap-6 pt-2 text-xs sm:text-sm text-gray-300">
                <a href="tel:+8801515212670" className="flex items-center gap-2 hover:text-white transition">
                  <FaPhoneAlt className="text-[#0C969C]" /> +880 1515212670
                </a>
                <a href="mailto:jwel@monsi.com" className="flex items-center gap-2 hover:text-white transition">
                  <FaEnvelope className="text-[#0C969C]" /> jwel@monsi.com
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] py-3.5 px-6 rounded-xl font-bold text-white text-sm shadow-xl shadow-[#0C969C]/30 transition"
              >
                Book Appointment <FaArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/properties"
                className="flex items-center justify-center gap-2 bg-black/60 hover:bg-black py-3.5 px-6 rounded-xl font-semibold text-gray-200 hover:text-white text-sm border border-white/10 transition"
              >
                View Available Listings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
