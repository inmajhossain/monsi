'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaDraftingCompass,
  FaCube,
  FaSun,
  FaTree,
  FaCheckCircle,
  FaArrowRight,
  FaGem,
  FaBuilding,
  FaLightbulb,
  FaLayerGroup,
} from 'react-icons/fa';

export default function ArchitecturalPage() {
  const capabilities = [
    {
      icon: FaDraftingCompass,
      title: 'Parametric & Façade Engineering',
      desc: 'Computational generative algorithms to design sculptural building envelopes optimized for sunlight deflection and wind acoustics.',
      tags: ['Rhino / Grasshopper', 'Dynamic Kinetic Louvers', 'Solar Heat Gain Control'],
    },
    {
      icon: FaCube,
      title: 'Building Information Modeling (BIM)',
      desc: 'Full Level 2 3D BIM integration across architecture, structural framing, and MEP systems to eliminate construction clashes prior to groundbreaking.',
      tags: ['Revit BIM L2', 'Clash Detection', '4D Timeline Modeling'],
    },
    {
      icon: FaSun,
      title: 'Bioclimatic & Thermal Simulation',
      desc: 'Microclimate analysis ensuring natural cross-ventilation, daylight penetration, and energy reduction in tropical South Asian weather.',
      tags: ['CFD Wind Simulation', 'Daylight Lux Mapping', 'Passive Cooling'],
    },
    {
      icon: FaTree,
      title: 'Vertical Greenery & Landscape Synergy',
      desc: 'Seamless architectural integration of sky gardens, cascading green balconies, and rainwater recovery filtration systems.',
      tags: ['Hydroponic Green Walls', 'Sky Gardens', 'Acoustic Buffering'],
    },
    {
      icon: FaLayerGroup,
      title: 'Master Site Planning & Zoning',
      desc: 'High-density urban feasibility planning compliant with RAJUK, BNBC, and environmental safety regulations in Dhaka.',
      tags: ['FAR Optimization', 'Traffic & Parking Flow', 'Community Zoning'],
    },
    {
      icon: FaBuilding,
      title: 'Luxury Residential & Commercial Pavilions',
      desc: 'Signature private villas, commercial towers, and penthouses designed with double-height atriums and expansive cantilever spans.',
      tags: ['Cantilevered Terraces', 'Column-Free Voids', 'Seamless Glass Envelopes'],
    },
  ];

  return (
    <div className="relative bg-[#021819] text-white min-h-screen overflow-hidden selection:bg-[#0C969C] selection:text-white">
      {/* Ambient glow */}
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
              Discipline · Architectural Engineering
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-bold text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]"
            >
              Sculpting Landmark Skylines with{' '}
              <span className="bg-gradient-to-r from-[#E3F0B6] to-[#0C969C] bg-clip-text text-transparent">
                Visionary Architecture
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl"
            >
              We integrate computational parametric modeling, bioclimatic principles, and structural precision to create timeless buildings that elevate modern living.
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
                Discuss Your Architecture <FaArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/projects"
                className="bg-neutral-900 hover:bg-neutral-800 px-7 py-3.5 border border-white/15 rounded-xl font-semibold text-gray-200 text-sm transition"
              >
                View Architectural Projects
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
                src="/image/services/architectural.jpg"
                alt="Architectural Masterwork by Monsi"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              <div className="bottom-6 left-6 right-6 absolute">
                <span className="bg-[#0C969C] px-3 py-1 rounded-full font-bold text-white text-[11px] uppercase tracking-wider">
                  Signature Project
                </span>
                <h3 className="mt-2 font-bold text-white text-xl">The Obsidian Pavilion Villa</h3>
                <p className="text-gray-300 text-xs mt-0.5">Banani DOHS, Dhaka · Master Planned & Engineered</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE CAPABILITIES GRID */}
      <section className="relative z-10 py-20 bg-[#011415]/80 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Architectural Capabilities & Standards
            </h2>
            <p className="mt-3 text-gray-400 text-sm sm:text-base">
              End-to-end architectural engineering solutions utilizing cutting-edge digital BIM and simulation technologies.
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
                    <div className="flex justify-center items-center bg-[#0C969C]/15 text-[#0C969C] rounded-2xl w-14 h-14 text-2xl mb-6">
                      <Icon />
                    </div>
                    <h3 className="font-bold text-white text-xl mb-2">{cap.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{cap.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                    {cap.tags.map((t, idx) => (
                      <span key={idx} className="bg-black/50 text-[#E3F0B6] px-2.5 py-1 rounded-md text-[10px] font-semibold border border-white/5">
                        {t}
                      </span>
                    ))}
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
            Transform Your Architectural Blueprint into Reality
          </h2>
          <p className="mt-3 text-gray-300 text-sm max-w-xl mx-auto">
            Book an engineering design consultation with our lead architectural specialists in Dhaka.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Link
              href="/contact"
              className="bg-[#0C969C] hover:bg-[#0aa3aa] px-8 py-3.5 rounded-xl font-bold text-white text-sm shadow-xl shadow-[#0C969C]/30 transition"
            >
              Consult with Lead Architect
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
