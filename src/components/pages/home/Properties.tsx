"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { IProperty } from "@/models/Property";
import BookingModal from "@/components/pages/home/BookingModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaSearch,
  FaArrowRight,
  FaSlidersH,
  FaCalendarCheck,
  FaBuilding,
  FaTimes,
  FaShieldAlt,
  FaGem,
} from "react-icons/fa";

interface ApiResponse {
  success: boolean;
  data: IProperty[];
  error?: string;
}

export default function Properties() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">("newest");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch("/api/properties");
      const data: ApiResponse = await res.json();

      if (res.ok) {
        setProperties(data.data || []);
      } else {
        setError(data.error || "Failed to fetch properties");
      }
    } catch {
      setError("Failed to connect to property database");
    } finally {
      setLoading(false);
    }
  };

  // Distinct locations for filter pills
  const availableLocations = useMemo(() => {
    const locs = properties.map((p) => p.location.split(",")[0].trim());
    return ["all", ...Array.from(new Set(locs.filter(Boolean)))];
  }, [properties]);

  // Filtered and sorted properties
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedLocation !== "all") {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return result;
  }, [properties, searchQuery, selectedLocation, sortBy]);

  const handleBookNow = (propertyId: string, propertyTitle: string) => {
    setSelectedProperty({ id: propertyId, title: propertyTitle });
    setIsModalOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSuccess = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
    }, 4500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative bg-[#021b1c] py-20 lg:py-28 min-h-screen overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="top-10 left-1/4 -z-0 absolute bg-[#0C969C]/15 blur-[160px] rounded-full w-[500px] h-[500px] pointer-events-none" />
      <div className="right-10 bottom-20 -z-0 absolute bg-amber-500/10 blur-[180px] rounded-full w-[600px] h-[600px] pointer-events-none" />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 bg-[#0C969C]/15 px-4 py-1.5 border border-[#0C969C]/30 rounded-full font-semibold text-[#E3F0B6] text-xs uppercase tracking-widest"
          >
            <FaGem className="text-amber-400" />
            Curated Architectural Living
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-bold text-white text-3xl sm:text-5xl lg:text-6xl tracking-tight"
          >
            Featured Luxury Properties
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 max-w-2xl text-gray-300 text-sm sm:text-base leading-relaxed"
          >
            Explore prime residential developments and penthouses across Dhaka, engineered with sustainability, modern aesthetics, and luxury in mind.
          </motion.p>
        </div>

        {/* SEARCH, FILTER & SORT TOOLBAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-black/50 shadow-2xl backdrop-blur-xl mb-12 p-4 sm:p-5 border border-white/10 rounded-2xl"
        >
          <div className="gap-4 grid grid-cols-1 md:grid-cols-12 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none text-gray-400">
                <FaSearch className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, location or keywords..."
                className="bg-neutral-900/80 p-3.5 pl-11 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-400 text-sm transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="right-3 absolute inset-y-0 flex items-center text-gray-400 hover:text-white"
                >
                  <FaTimes className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Location Selector */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-neutral-900/80 p-3.5 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white text-sm transition capitalize appearance-none cursor-pointer"
                >
                  <option value="all">📍 All Locations</option>
                  {availableLocations
                    .filter((l) => l !== "all")
                    .map((loc) => (
                      <option key={loc} value={loc}>
                        📍 {loc}
                      </option>
                    ))}
                </select>
                <div className="right-3 absolute inset-y-0 flex items-center pointer-events-none text-gray-400">
                  <FaSlidersH className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Sort Order */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-neutral-900/80 p-3.5 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white text-sm transition appearance-none cursor-pointer"
              >
                <option value="newest">✨ Newest First</option>
                <option value="price-asc">💵 Price: Low to High</option>
                <option value="price-desc">💎 Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Quick Location Pills */}
          {availableLocations.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-white/5 border-t">
              <span className="font-semibold text-gray-400 text-xs uppercase tracking-wider">
                Popular:
              </span>
              {availableLocations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition capitalize ${
                    selectedLocation === loc
                      ? "bg-[#0C969C] text-white shadow-md shadow-[#0C969C]/30"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {loc === "all" ? "All Locations" : loc}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* LOADING STATE SKELETON */}
        {loading && (
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-black/40 shadow-xl border border-white/10 rounded-2xl h-[450px] overflow-hidden animate-pulse"
              >
                <div className="bg-neutral-800/60 w-full h-56" />
                <div className="p-6 space-y-4">
                  <div className="bg-neutral-800 rounded w-3/4 h-5" />
                  <div className="bg-neutral-800 rounded w-1/2 h-4" />
                  <div className="bg-neutral-800 rounded w-full h-8" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="bg-red-500/10 mx-auto p-8 border border-red-500/20 rounded-2xl max-w-lg text-center">
            <p className="font-semibold text-red-300 text-base">{error}</p>
            <button
              onClick={fetchProperties}
              className="bg-red-600 hover:bg-red-500 mt-4 px-6 py-2 rounded-xl font-medium text-white text-sm transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && filteredProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/40 p-12 border border-white/10 rounded-2xl text-center"
          >
            <div className="flex justify-center items-center bg-[#0C969C]/10 mx-auto mb-4 rounded-full w-16 h-16 text-[#0C969C] text-2xl">
              <FaBuilding />
            </div>
            <h3 className="font-bold text-white text-xl">No properties matched your criteria</h3>
            <p className="mt-2 text-gray-400 text-sm">
              Try adjusting your search terms or selecting a different location.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedLocation("all");
              }}
              className="bg-[#0C969C] hover:bg-[#0aa3aa] mt-6 px-6 py-2.5 rounded-xl font-semibold text-white text-sm transition"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* PROPERTY CARDS GRID */}
        {!loading && !error && filteredProperties.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProperties.map((property) => (
              <motion.div
                key={property._id as unknown as string}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col bg-neutral-900/70 hover:bg-neutral-900/90 shadow-2xl hover:shadow-[#0C969C]/10 backdrop-blur-xl border border-white/10 hover:border-[#0C969C]/40 rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* IMAGE CONTAINER */}
                <div className="relative w-full h-64 overflow-hidden bg-neutral-950">
                  <Image
                    src={property.imageUrl || "/default-property.jpg"}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="top-4 right-4 left-4 absolute flex justify-between items-center">
                    <span className="flex items-center gap-1.5 bg-black/60 shadow-md backdrop-blur-md px-3 py-1 border border-white/15 rounded-full font-semibold text-white text-xs">
                      <FaMapMarkerAlt className="text-amber-400" />
                      <span className="truncate max-w-[140px]">{property.location}</span>
                    </span>

                    <span className="flex items-center gap-1 bg-emerald-500/20 backdrop-blur-md px-3 py-1 border border-emerald-500/40 rounded-full font-bold text-emerald-300 text-xs">
                      <span className="bg-emerald-400 rounded-full w-2 h-2 animate-ping" />
                      Available
                    </span>
                  </div>

                  {/* Bottom Price Tag on Image */}
                  <div className="right-4 bottom-3 absolute">
                    <div className="bg-black/75 shadow-lg backdrop-blur-md px-3.5 py-1.5 border border-white/15 rounded-xl text-right">
                      <span className="block font-medium text-[10px] text-gray-300 uppercase tracking-widest">
                        Price
                      </span>
                      <span className="font-extrabold text-[#E3F0B6] text-lg tracking-tight">
                        ৳ {property.price ? property.price.toLocaleString() : "Contact"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CARD BODY */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Title */}
                  <h3 className="font-bold text-white text-xl group-hover:text-[#E3F0B6] transition-colors line-clamp-1">
                    {property.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-gray-400 text-xs leading-relaxed line-clamp-2">
                    {property.description}
                  </p>

                  {/* KEY SPECS / PILLS */}
                  <div className="grid grid-cols-3 gap-2 bg-neutral-950/60 my-5 p-3 border border-white/5 rounded-xl text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1 text-[#0C969C] text-xs font-semibold mb-0.5">
                        <FaBed /> <span>{property.bedrooms}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400">Beds</span>
                    </div>

                    <div className="flex flex-col items-center justify-center border-x border-white/10">
                      <div className="flex items-center gap-1 text-[#0C969C] text-xs font-semibold mb-0.5">
                        <FaBath /> <span>{property.bathrooms}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400">Baths</span>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1 text-[#0C969C] text-xs font-semibold mb-0.5">
                        <FaRulerCombined /> <span>{property.area}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400">Sq Ft</span>
                    </div>
                  </div>

                  {/* CARD FOOTER CTA */}
                  <div className="mt-auto pt-2 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-gray-400 flex items-center gap-1">
                      <FaShieldAlt className="text-amber-400 w-3 h-3" />
                      <span>Monsi Certified</span>
                    </div>

                    <button
                      onClick={() =>
                        handleBookNow(
                          property._id as unknown as string,
                          property.title
                        )
                      }
                      className="flex items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] active:scale-98 px-5 py-2.5 rounded-xl font-bold text-white text-xs shadow-lg shadow-[#0C969C]/20 transition-all duration-200"
                    >
                      <FaCalendarCheck className="w-3.5 h-3.5" />
                      <span>Book Viewing</span>
                      <FaArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* BOOKING MODAL */}
      {selectedProperty && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          propertyId={selectedProperty.id}
          propertyTitle={selectedProperty.title}
          onSuccess={handleBookingSuccess}
        />
      )}

      {/* SUCCESS TOAST NOTIFICATION */}
      <AnimatePresence>
        {bookingSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="right-6 bottom-6 z-50 fixed flex items-center gap-3 bg-[#033030] shadow-2xl backdrop-blur-xl px-6 py-4 border border-emerald-500/40 rounded-2xl text-white"
          >
            <div className="flex justify-center items-center bg-emerald-500 rounded-full w-8 h-8 font-bold text-white text-sm">
              ✓
            </div>
            <div>
              <p className="font-bold text-white text-sm">Inquiry Submitted!</p>
              <p className="text-emerald-200 text-xs">Our engineering consultant will contact you shortly.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
