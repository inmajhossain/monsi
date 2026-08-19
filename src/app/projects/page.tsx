'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRulerCombined,
  FaArrowRight,
  FaCheckCircle,
  FaFilter,
  FaGem,
  FaTimes,
  FaShieldAlt,
} from 'react-icons/fa';

interface Project {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'structural' | 'interior';
  location: string;
  year: string;
  area: string;
  image: string;
  tagline: string;
  description: string;
  features: string[];
  stats: { label: string; value: string }[];
}

const projectsData: Project[] = [
  {
    id: 'phoenix-tower',
    title: 'The Phoenix Metropolis Tower',
    category: 'commercial',
    location: 'Gulshan Avenue, Dhaka',
    year: '2024 - 2026',
    area: '185,000 sq ft',
    image: '/image/about/building.jpg',
    tagline: '32-Storey LEED Gold Certified Commercial Landmark',
    description:
      'A masterwork of bioclimatic architecture and structural resilience, featuring intelligent double-glazed low-E façades, integrated vertical gardens, and seismic base dampers.',
    features: ['Seismic Zone 4 Base Damping', 'Automated Smart Façade', 'Vertical Hanging Gardens', 'Rainwater Recovery Grid'],
    stats: [
      { label: 'Height', value: '135 Meters' },
      { label: 'Storeys', value: '32 Floors' },
      { label: 'Efficiency', value: '40% Less Energy' },
    ],
  },
  {
    id: 'verdant-penthouse',
    title: 'The Verdant Sky Loft',
    category: 'residential',
    location: 'Gulshan-2, Dhaka',
    year: '2024',
    area: '5,800 sq ft',
    image: '/image/scroolimage/one.webp',
    tagline: 'Double-Height Architectural Luxury Penthouse',
    description:
      'Engineered with cantilevered glass balconies, infinity sky terrace, private elevator foyer, and bespoke Italian marble finishes.',
    features: ['Cantilevered Terraces', 'Custom Acoustic Wood Panels', 'Private Infinity Pool', 'Bespoke Automation'],
    stats: [
      { label: 'Ceiling Height', value: '22 Feet' },
      { label: 'Bedrooms', value: '5 Suites' },
      { label: 'Balcony Span', value: '1,200 sq ft' },
    ],
  },
  {
    id: 'obsidian-residence',
    title: 'Obsidian Modern Pavilion',
    category: 'residential',
    location: 'Banani DOHS, Dhaka',
    year: '2023',
    area: '8,400 sq ft',
    image: '/image/services/architectural.jpg',
    tagline: 'Private Modernist Gated Villa with Reflecting Pool',
    description:
      'Sculpted with exposed architectural concrete, floor-to-ceiling glass curtain walls, and a central water court that lowers ambient temperature naturally.',
    features: ['Passive Cooling Courtyard', 'Perimeter Security Integration', 'Solar Microgrid Ready', 'Floor-to-Ceiling Glazing'],
    stats: [
      { label: 'Plot Area', value: '12 Katha' },
      { label: 'Bedrooms', value: '6 Suites' },
      { label: 'Water Body', value: '1,400 sq ft' },
    ],
  },
  {
    id: 'solstice-interior',
    title: 'Solstice Penthouse Interior',
    category: 'interior',
    location: 'Dhanmondi Lakeview, Dhaka',
    year: '2024',
    area: '4,200 sq ft',
    image: '/image/services/interior.jpg',
    tagline: 'Warm Minimalist Interior Architecture & Joinery',
    description:
      'Seamless fluted oak wall paneling, integrated architectural slot diffusers, imported marble waterfall counters, and diffused perimeter circadian lighting.',
    features: ['Custom Fluted Millwork', 'Circadian Lighting System', 'Calacatta Marble Island', 'Acoustic Sound Isolation'],
    stats: [
      { label: 'Living Room', value: '1,600 sq ft' },
      { label: 'Lighting Zones', value: '24 Channels' },
      { label: 'Handcrafted Wood', value: '100% Solid Oak' },
    ],
  },
  {
    id: 'mirpur-commercial-hub',
    title: 'Doreen Vinchita Complex',
    category: 'structural',
    location: 'Rupnagar R/A, Mirpur, Dhaka',
    year: '2022',
    area: '92,000 sq ft',
    image: '/image/services/structural.jpg',
    tagline: 'Deep Foundation & High-Load Structural Engineering',
    description:
      'Deep cast-in-situ bored piling and post-tensioned slab technology designed for heavy live-load capacity and zero structural deflection.',
    features: ['Post-Tensioned Flat Slabs', 'Cast-in-Situ Bored Piles', 'BNBC 2020 High Strength Concrete', 'Fire Safety Pressurized Cores'],
    stats: [
      { label: 'Pile Depth', value: '38 Meters' },
      { label: 'Concrete Grade', value: '45 MPa' },
      { label: 'Safety Factor', value: '2.5x Standard' },
    ],
  },
  {
    id: 'banani-duplex',
    title: 'Banani Zenith Duplex',
    category: 'residential',
    location: 'Banani Block-E, Dhaka',
    year: '2023 - 2024',
    area: '6,200 sq ft',
    image: '/image/scroolimage/two.webp',
    tagline: 'Ultra-Modern Split-Level Luxury Living',
    description:
      'Split-level architectural layout with custom glass spiral staircase, rooftop garden gazebo, and private wellness spa.',
    features: ['Glass Structural Spiral Staircase', 'Rooftop Hydroponic Garden', 'Private Sauna & Gym', 'Thermal Glazing'],
    stats: [
      { label: 'Levels', value: '2 Storeys' },
      { label: 'Terrace', value: '850 sq ft' },
      { label: 'Parking', value: '3 Stalls' },
    ],
  },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial' | 'structural' | 'interior'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  return (
    <div className="relative bg-[#021819] text-white min-h-screen overflow-hidden selection:bg-[#0C969C] selection:text-white">
      {/* Ambient Lighting */}
      <div className="top-0 left-1/4 -z-0 absolute bg-[#0C969C]/15 blur-[180px] rounded-full w-[600px] h-[600px] pointer-events-none" />
      <div className="top-1/2 right-10 -z-0 absolute bg-amber-500/10 blur-[200px] rounded-full w-[700px] h-[700px] pointer-events-none" />

      {/* HEADER SECTION */}
      <section className="relative z-10 pt-36 pb-12 lg:pt-44 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 bg-[#0C969C]/15 mx-auto px-4 py-1.5 border border-[#0C969C]/30 rounded-full font-semibold text-[#E3F0B6] text-xs uppercase tracking-widest w-fit"
        >
          <FaGem className="text-amber-400" />
          Engineering & Architectural Portfolio
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 font-bold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight"
        >
          Landmark Projects & Innovations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-gray-300 text-sm sm:text-base leading-relaxed"
        >
          Explore our award-winning architectural designs, seismic structural engineering achievements, and luxury residences across Dhaka.
        </motion.p>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-10">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'residential', label: 'Luxury Residential' },
            { id: 'commercial', label: 'Commercial & High-Rise' },
            { id: 'structural', label: 'Structural Engineering' },
            { id: 'interior', label: 'Interior Architecture' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition capitalize ${
                filter === tab.id
                  ? 'bg-[#0C969C] text-white shadow-lg shadow-[#0C969C]/30'
                  : 'bg-black/40 text-gray-300 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer flex flex-col bg-neutral-900/70 hover:bg-neutral-900/90 shadow-2xl backdrop-blur-xl border border-white/10 hover:border-[#0C969C]/50 rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-full h-72 overflow-hidden bg-neutral-950">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/30" />

                  {/* Top Location Badge */}
                  <div className="top-4 left-4 absolute">
                    <span className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 border border-white/15 rounded-full font-semibold text-white text-xs">
                      <FaMapMarkerAlt className="text-amber-400" />
                      {project.location}
                    </span>
                  </div>

                  {/* Year Tag */}
                  <div className="top-4 right-4 absolute">
                    <span className="bg-[#0C969C]/90 px-3 py-1 rounded-full font-bold text-white text-[11px]">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[11px] font-bold text-[#E3F0B6] uppercase tracking-wider mb-1">
                    {project.category}
                  </span>
                  <h3 className="font-bold text-white text-xl group-hover:text-[#E3F0B6] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-[#0C969C] text-xs font-medium">
                    {project.tagline}
                  </p>
                  <p className="mt-3 text-gray-400 text-xs leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Card Bottom */}
                  <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-gray-300">
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <FaRulerCombined className="text-[#0C969C]" /> {project.area}
                    </span>
                    <span className="flex items-center gap-1 text-[#0C969C] group-hover:translate-x-1 transition-transform">
                      View Specs <FaArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="z-50 fixed inset-0 flex justify-center items-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-neutral-900 border border-white/15 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header Image */}
              <div className="relative w-full h-64 sm:h-80 shrink-0">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/40" />

                <button
                  onClick={() => setSelectedProject(null)}
                  className="top-4 right-4 absolute bg-black/60 hover:bg-black p-2.5 rounded-full text-white transition border border-white/20"
                >
                  <FaTimes className="w-4 h-4" />
                </button>

                <div className="bottom-4 left-6 right-6 absolute">
                  <span className="bg-[#0C969C] px-3 py-1 rounded-full font-bold text-white text-xs uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h2 className="mt-2 font-bold text-2xl sm:text-3xl text-white">
                    {selectedProject.title}
                  </h2>
                  <p className="text-[#E3F0B6] text-xs sm:text-sm">{selectedProject.location} · {selectedProject.year}</p>
                </div>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm">
                <div>
                  <h4 className="font-semibold text-white text-base mb-2">Project Overview</h4>
                  <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">{selectedProject.description}</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3 bg-neutral-950/80 p-4 border border-white/5 rounded-2xl text-center">
                  {selectedProject.stats.map((s, idx) => (
                    <div key={idx}>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">{s.label}</span>
                      <span className="font-extrabold text-[#E3F0B6] text-sm sm:text-base">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Key Engineering Features */}
                <div>
                  <h4 className="font-semibold text-white text-base mb-3">Architectural & Engineering Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5 text-xs text-gray-200">
                        <FaCheckCircle className="text-[#0C969C] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer CTA in modal */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="flex-1 text-center bg-[#0C969C] hover:bg-[#0aa3aa] py-3 px-4 rounded-xl font-bold text-white text-xs transition"
                  >
                    Inquire About Similar Project
                  </Link>
                  <Link
                    href="/properties"
                    className="text-center bg-neutral-800 hover:bg-neutral-700 py-3 px-4 rounded-xl font-semibold text-gray-200 text-xs transition"
                  >
                    View Available Properties
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BOTTOM CTA BANNER */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#033030] via-[#021f20] to-[#033030] shadow-2xl p-8 sm:p-12 border border-white/15 rounded-3xl text-center">
          <h2 className="font-bold text-3xl sm:text-4xl text-white">
            Have a site or project in mind?
          </h2>
          <p className="mt-3 text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            Schedule a feasibility study with our senior structural consultants and architectural designers.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link
              href="/contact"
              className="bg-[#0C969C] hover:bg-[#0aa3aa] px-8 py-3.5 rounded-xl font-bold text-white text-sm shadow-xl shadow-[#0C969C]/30 transition"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/properties"
              className="bg-black/60 hover:bg-black px-8 py-3.5 rounded-xl font-semibold text-gray-200 text-sm border border-white/10 transition"
            >
              Browse Properties Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
