'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaHardHat,
  FaShieldAlt,
  FaCogs,
  FaCheckCircle,
  FaArrowRight,
  FaGem,
  FaChartLine,
  FaHammer,
  FaBalanceScale,
  FaBuilding,
} from 'react-icons/fa';

export default function StructuralPage() {
  const capabilities = [
    {
      icon: FaShieldAlt,
      title: 'Seismic & Earthquake Load Engineering',
      desc: 'Non-linear dynamic time-history analysis designed for Bangladesh Seismic Zone 4, guaranteeing ductile structural behavior and zero catastrophic collapse.',
      code: 'BNBC 2020 / ASCE 7-16',
      badge: 'Zone 4 Compliance',
    },
    {
      icon: FaChartLine,
      title: 'High-Rise Wind & Lateral Drift Analysis',
      desc: 'Computational fluid and wind tunnel aerodynamic simulations to calculate inter-storey drift limits, ensuring occupant comfort and glass curtain safety.',
      code: 'ACI 318-19 / AISC 360',
      badge: 'Dynamic Damping',
    },
    {
      icon: FaCogs,
      title: 'Deep Foundation & Soil-Structure Interaction',
      desc: 'Cast-in-situ bored piling, diaphragm walls, and barrette foundation designs calibrated to Dhaka alluvial and soft-clay soil conditions.',
      code: 'ASTM / BS 8004',
      badge: 'Geotechnical Integration',
    },
    {
      icon: FaBuilding,
      title: 'Post-Tensioned (PT) Slabs & Long Spans',
      desc: 'High-efficiency PT flat plate and unbonded tendon systems providing column-free luxury open spaces with reduced concrete dead weight.',
      code: 'PTI / Eurocode 2',
      badge: 'Column-Free Voids',
    },
    {
      icon: FaHammer,
      title: 'Structural Health Audits & Retrofitting',
      desc: 'Non-destructive ultrasonic concrete testing, carbon fiber (CFRP) structural retrofitting, and core-strength audits for existing commercial structures.',
      code: 'ACI 562 / BNBC Audit',
      badge: 'Retrofit & Life Extension',
    },
    {
      icon: FaBalanceScale,
      title: 'Composite Steel-Concrete Frameworks',
      desc: 'Hybrid structural systems utilizing steel trusses, concrete-filled tube (CFT) columns, and shear walls for maximum strength-to-weight performance.',
      code: 'AISC 360-16 / AISC 341',
      badge: 'High-Strength Hybrid',
    },
  ];

  const standards = [
    { name: 'BNBC 2020', desc: 'Bangladesh National Building Code Official Compliance' },
    { name: 'ACI 318-19', desc: 'American Concrete Institute Structural Standards' },
    { name: 'AISC 360-16', desc: 'American Institute of Steel Construction Standards' },
    { name: 'ASCE 7-16', desc: 'Minimum Design Loads for Buildings & Other Structures' },
    { name: 'ETABS & SAFE', desc: 'CSI Berkeley 3D Finite Element Simulation Suite' },
  ];

  return (
    <div className="relative bg-[#021819] text-white min-h-screen overflow-hidden selection:bg-[#0C969C] selection:text-white">
      {/* Ambient Glows */}
      <div className="top-0 left-1/4 -z-0 absolute bg-[#0C969C]/15 blur-[180px] rounded-full w-[600px] h-[600px] pointer-events-none" />
      <div className="top-1/2 right-10 -z-0 absolute bg-amber-500/10 blur-[200px] rounded-full w-[700px] h-[700px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative z-10 pt-36 pb-16 lg:pt-44 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-[#0C969C]/15 px-4 py-1.5 border border-[#0C969C]/30 rounded-full font-semibold text-[#E3F0B6] text-xs uppercase tracking-widest w-fit"
            >
              <FaGem className="text-amber-400" />
              Discipline · Structural Engineering
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-bold text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]"
            >
              Unyielding Safety.{' '}
              <span className="bg-gradient-to-r from-[#E3F0B6] to-[#0C969C] bg-clip-text text-transparent">
                Seismic Resilience.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl"
            >
              From foundation pile stress-testing to high-rise lateral wind and earthquake simulations, we engineer structural frameworks that protect lives and stand for centuries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] px-7 py-3.5 rounded-xl font-bold text-white text-sm shadow-xl shadow-[#0C969C]/25 transition"
              >
                Request Structural Audit <FaArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/projects"
                className="bg-neutral-900 hover:bg-neutral-800 px-7 py-3.5 border border-white/15 rounded-xl font-semibold text-gray-200 text-sm transition"
              >
                View Structural Projects
              </Link>
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl h-[420px] sm:h-[500px]">
              <Image
                src="/image/services/structural.jpg"
                alt="High-Tech Structural Engineering Analysis"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              <div className="bottom-6 left-6 right-6 absolute">
                <span className="bg-[#0C969C] px-3 py-1 rounded-full font-bold text-white text-[11px] uppercase tracking-wider">
                  Finite Element Simulation
                </span>
                <h3 className="mt-2 font-bold text-white text-xl">Metropolis Tower Load Analysis</h3>
                <p className="text-gray-300 text-xs mt-0.5">Seismic Zone 4 Dynamic Stress Testing · Zero Deflection</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STANDARDS ACCREDITATION ROW */}
      <section className="relative z-10 py-10 bg-black/50 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {standards.map((std, i) => (
              <div key={i} className="flex items-center gap-3">
                <FaCheckCircle className="text-[#0C969C] shrink-0" />
                <div>
                  <span className="font-bold text-white text-sm block">{std.name}</span>
                  <span className="text-[11px] text-gray-400">{std.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES GRID */}
      <section className="relative z-10 py-20 bg-[#011415]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Structural Engineering Services
            </h2>
            <p className="mt-3 text-gray-400 text-sm sm:text-base">
              Peer-reviewed calculations, geotechnical synthesis, and rigorous code compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-neutral-900/60 hover:bg-neutral-900/90 shadow-2xl backdrop-blur-xl p-8 border border-white/10 hover:border-[#0C969C]/40 rounded-2xl transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex justify-center items-center bg-[#0C969C]/15 text-[#0C969C] rounded-2xl w-14 h-14 text-2xl">
                        <Icon />
                      </div>
                      <span className="text-[10px] font-bold text-[#E3F0B6] bg-black/60 px-3 py-1 rounded-full border border-white/10">
                        {cap.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-xl mb-2">{cap.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{cap.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-gray-400">Standard:</span>
                    <span className="text-[#0C969C] font-mono font-semibold">{cap.code}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#033030] via-[#021f20] to-[#033030] shadow-2xl p-8 sm:p-12 border border-white/15 rounded-3xl text-center">
          <h2 className="font-bold text-3xl sm:text-4xl text-white">
            Need Expert Structural Validation or Safety Audits?
          </h2>
          <p className="mt-3 text-gray-300 text-sm max-w-xl mx-auto">
            Schedule an on-site structural health audit or consultation with our chief structural engineers.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Link
              href="/contact"
              className="bg-[#0C969C] hover:bg-[#0aa3aa] px-8 py-3.5 rounded-xl font-bold text-white text-sm shadow-xl shadow-[#0C969C]/30 transition"
            >
              Book Structural Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
