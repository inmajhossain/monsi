"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaCompass,
  FaLeaf,
  FaStar,
  FaArrowRight,
  FaTimes,
  FaCheck,
  FaCalendarCheck,
  FaShareAlt,
  FaHeart,
  FaRegHeart,
  FaEye,
  FaLayerGroup,
  FaCity,
  FaCar,
} from "react-icons/fa";
import BookingModal from "@/components/pages/home/BookingModal";

// --- Types & Data ---
export interface PropertyPerspective {
  label: string;
  image: string;
  tag: string;
}

export interface PropertySpec {
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  sqm: number;
  ceilingHeight: string;
  parkingBays: number;
  handoverYear: string;
  energyRating: string;
  orientation: string;
}

export interface PropertyData {
  id: number;
  title: string;
  subtitle: string;
  collection: string;
  place: string;
  location: string;
  coordinates: string;
  priceBdt: string;
  priceUsd: string;
  type: string;
  status: string;
  architect: string;
  description: string;
  perspectives: PropertyPerspective[];
  specs: PropertySpec;
  highlights: string[];
  amenities: { name: string; icon: string }[];
}

const LUXURY_PROPERTIES: PropertyData[] = [
  {
    id: 1,
    title: "THE VERDANT LOFT",
    subtitle: "Sky-High Biophilic Penthouse Sanctuary",
    collection: "Signature Sky Deck",
    place: "Gulshan-2",
    location: "Diplomatic Enclave, Dhaka North",
    coordinates: "23.7937° N, 90.4066° E",
    priceBdt: "৳ 4.85 Cr",
    priceUsd: "$ 410,000",
    type: "Penthouse Suite",
    status: "READY FOR HANDOVER",
    architect: "Monsi Atelier & Partners",
    description:
      "A transcendent sky penthouse that merges biophilic suspended gardens with modern brutalist concrete elegance. Features double-height living atriums, private infinity sky-pool, and acoustic soundproofing throughout.",
    perspectives: [
      {
        label: "Day Elevation",
        image: "/image/scroolimage/one.webp",
        tag: "Panoramic Exterior",
      },
      {
        label: "Interior Atrium",
        image: "/image/services/interior.jpg",
        tag: "Double-Height Lounge",
      },
      {
        label: "Architectural Form",
        image: "/image/services/architectural.jpg",
        tag: "Structural Design",
      },
    ],
    specs: {
      bedrooms: 4,
      bathrooms: 5,
      sqft: 4200,
      sqm: 390,
      ceilingHeight: "14.5 ft",
      parkingBays: 3,
      handoverYear: "2026",
      energyRating: "LEED Platinum",
      orientation: "South-East Facing",
    },
    highlights: [
      "Private Heated Infinity Sky Pool",
      "Triple-Glazed Low-E Thermal Glazing",
      "Integrated Lutron Smart Lighting & IoT",
      "Private Keycard High-Speed Elevator",
      "Custom Italian Statuario Marble Island",
    ],
    amenities: [
      { name: "Private Infinity Pool", icon: "pool" },
      { name: "Smart Home IoT", icon: "smart" },
      { name: "Private Lift Access", icon: "lift" },
      { name: "24/7 Diplomatic Security", icon: "security" },
      { name: "EV Fast Charger", icon: "ev" },
      { name: "Wine Cellar & Bar", icon: "wine" },
    ],
  },
  {
    id: 2,
    title: "OBSIDIAN RESIDENCE",
    subtitle: "Monolithic Waterfront Architectural Duplex",
    collection: "Waterfront Monolith",
    place: "Banani Prime",
    location: "Lakefront Block F, Dhaka Central",
    coordinates: "23.7925° N, 90.4038° E",
    priceBdt: "৳ 3.60 Cr",
    priceUsd: "$ 305,000",
    type: "Architectural Duplex",
    status: "EXCLUSIVE LISTING",
    architect: "Studio Kengo-Monsi",
    description:
      "Sculpted with dark basalt stone, blackened titanium frames, and floor-to-ceiling panoramic glass facing the water. Crafted for collectors seeking ultimate privacy and modern minimalist precision.",
    perspectives: [
      {
        label: "Monolith Facade",
        image: "/image/scroolimage/two.webp",
        tag: "Basalt & Glass",
      },
      {
        label: "Structural Grid",
        image: "/image/services/structural.jpg",
        tag: "Reinforced Geometry",
      },
      {
        label: "Penthouse Suite",
        image: "/image/services/interior.jpg",
        tag: "Minimalist Lounge",
      },
    ],
    specs: {
      bedrooms: 4,
      bathrooms: 4,
      sqft: 3850,
      sqm: 358,
      ceilingHeight: "12.0 ft",
      parkingBays: 2,
      handoverYear: "2026",
      energyRating: "Net-Zero Carbon",
      orientation: "Lakeview North-West",
    },
    highlights: [
      "Solar BIPV Facade Generating 60% Energy",
      "German Miele Designer Fitted Kitchen",
      "Acoustic Studio Quiet Pods & Library",
      "Duplex Cantilevered Glass Balcony",
      "Sub-Basement Dedicated 2-Car Garage",
    ],
    amenities: [
      { name: "Solar Energy Facade", icon: "solar" },
      { name: "Lakefront View Deck", icon: "view" },
      { name: "German Designer Kitchen", icon: "kitchen" },
      { name: "Private Gym & Spa", icon: "gym" },
      { name: "Secure Underground Parking", icon: "parking" },
      { name: "Biometric Access Control", icon: "security" },
    ],
  },
  {
    id: 3,
    title: "SOLSTICE MANOR",
    subtitle: "Sanctuary Garden Villa with Private Zen Courtyard",
    collection: "Lakeside Heritage",
    place: "Dhanmondi",
    location: "Lake Road 8/A, Dhaka West",
    coordinates: "23.7461° N, 90.3742° E",
    priceBdt: "৳ 5.20 Cr",
    priceUsd: "$ 440,000",
    type: "Garden Villa",
    status: "PRE-LAUNCH RESERVATION",
    architect: "Monsi Sustainable Laboratories",
    description:
      "A harmonious blend of lush tropical landscape and contemporary tropical modernism. Features an open-air koi pond, internal rainwater harvesting system, and expansive timber wrap-around verandas.",
    perspectives: [
      {
        label: "Lakeside Elevation",
        image: "/image/scroolimage/three.webp",
        tag: "Lush Tropical Front",
      },
      {
        label: "Zen Atrium",
        image: "/image/services/architectural.jpg",
        tag: "Central Courtyard",
      },
      {
        label: "Master Suite",
        image: "/image/services/interior.jpg",
        tag: "Private Timber Balcony",
      },
    ],
    specs: {
      bedrooms: 5,
      bathrooms: 6,
      sqft: 5400,
      sqm: 502,
      ceilingHeight: "16.0 ft",
      parkingBays: 4,
      handoverYear: "2027",
      energyRating: "LEED Gold Certified",
      orientation: "Lake Facing South",
    },
    highlights: [
      "360° Lake Panoramic View Deck",
      "Private Zen Courtyard & Heated Koi Pond",
      "Geothermal Radiant Floor Cooling",
      "Climate-Controlled 300-Bottle Wine Vault",
      "Triple Filtered Clean Air & Rainwater System",
    ],
    amenities: [
      { name: "Private Zen Courtyard", icon: "garden" },
      { name: "Geothermal Cooling", icon: "eco" },
      { name: "Private Security Perimeter", icon: "security" },
      { name: "Finnish Sauna & Plunge", icon: "spa" },
      { name: "Lakeside Boat Dock Access", icon: "boat" },
      { name: "4-Car Covered Bay", icon: "car" },
    ],
  },
  {
    id: 4,
    title: "AURORA SKY SUITES",
    subtitle: "Ultra-Luxury Triplex with Rooftop Helipad Access",
    collection: "Crown Diplomat",
    place: "Baridhara",
    location: "Park Road Enclave, Dhaka",
    coordinates: "23.8010° N, 90.4195° E",
    priceBdt: "৳ 7.50 Cr",
    priceUsd: "$ 635,000",
    type: "Crown Triplex",
    status: "PRIVATE COLLECTION",
    architect: "Foster-Inspired Monsi Studio",
    description:
      "The pinnacle of high-altitude luxury living in Dhaka's most secure diplomatic district. Three expansive storeys crowned by a 360-degree glass observatory, private wellness sanctuary, and custom wine lounge.",
    perspectives: [
      {
        label: "Crown Elevation",
        image: "/image/about/building.jpg",
        tag: "Diplomatic Tower",
      },
      {
        label: "Sky Living Room",
        image: "/image/services/interior.jpg",
        tag: "Double-Height Atrium",
      },
      {
        label: "Terrace Pavilion",
        image: "/image/services/structural.jpg",
        tag: "Rooftop Observatory",
      },
    ],
    specs: {
      bedrooms: 5,
      bathrooms: 7,
      sqft: 6100,
      sqm: 567,
      ceilingHeight: "18.0 ft",
      parkingBays: 4,
      handoverYear: "2026",
      energyRating: "Zero-Carbon Certified",
      orientation: "360° Unobstructed",
    },
    highlights: [
      "Exclusive Rooftop Helipad & Sky Lounge Access",
      "Sub-Zero & Wolf Commercial Chef Kitchen",
      "Bullet-Resistant Laminated Curved Glazing",
      "Custom Finnish Sauna & Cryo Cold Plunge",
      "Dedicated 24/7 White-Glove Butler Concierge",
    ],
    amenities: [
      { name: "Rooftop Helipad Access", icon: "heli" },
      { name: "Private Wellness Spa", icon: "spa" },
      { name: "Sub-Zero Gourmet Kitchen", icon: "kitchen" },
      { name: "High-Speed Private Lift", icon: "lift" },
      { name: "Diplomatic Level Vault", icon: "safe" },
      { name: "White-Glove Concierge", icon: "concierge" },
    ],
  },
];

// --- Individual Stack Card Component ---
interface StackCardProps {
  property: PropertyData;
  index: number;
  total: number;
  unit: "sqft" | "sqm";
  currency: "bdt" | "usd";
  isSaved: boolean;
  onToggleSave: (id: number) => void;
  onShare: (property: PropertyData) => void;
  onOpenDossier: (property: PropertyData) => void;
  onBookViewing: (property: PropertyData) => void;
  containerProgress: any;
}

function StackCard({
  property,
  index,
  total,
  unit,
  currency,
  isSaved,
  onToggleSave,
  onShare,
  onOpenDossier,
  onBookViewing,
  containerProgress,
}: StackCardProps) {
  const [activePerspectiveIdx, setActivePerspectiveIdx] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate dynamic scale & dimming based on container scroll progress
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;

  // Scale down slightly as subsequent cards scroll over
  const rawScale = useTransform(
    containerProgress,
    [start, end, Math.min(1, end + step)],
    [1, 1, 0.93 - index * 0.015]
  );
  const scale = useSpring(rawScale, { stiffness: 120, damping: 20 });

  // Darken and blur slightly as next card covers
  const rawDimOpacity = useTransform(
    containerProgress,
    [start, end, Math.min(1, end + step * 0.8)],
    [0, 0, 0.6]
  );
  const dimOpacity = useSpring(rawDimOpacity, { stiffness: 120, damping: 20 });

  const activePerspective = property.perspectives[activePerspectiveIdx];

  const displayArea =
    unit === "sqft"
      ? `${property.specs.sqft.toLocaleString()} sq ft`
      : `${property.specs.sqm} m²`;

  const displayPrice =
    currency === "bdt" ? property.priceBdt : property.priceUsd;

  return (
    <div
      ref={cardRef}
      id={`residence-card-${index}`}
      className="sticky top-0 h-screen w-full flex items-center justify-center p-3 sm:p-5 lg:p-8"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{ scale }}
        className="relative w-full h-full max-w-[1500px] max-h-[920px] rounded-2xl sm:rounded-3xl lg:rounded-[36px] overflow-hidden shadow-2xl border border-white/15 bg-[#031d1e]"
      >
        {/* Background Image with Transition */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePerspective.image}
              initial={{ scale: 1.12, opacity: 0.2 }}
              animate={{ scale: 1.02, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={activePerspective.image}
                alt={`${property.title} - ${activePerspective.label}`}
                fill
                priority={index === 0}
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1500px"
              />
            </motion.div>
          </AnimatePresence>

          {/* Cinematic Vignette & Gradient Layers */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#011415] via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />

          {/* Subtle Architectural Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* Stacking Dimming Overlay */}
          <motion.div
            style={{ opacity: dimOpacity }}
            className="absolute inset-0 bg-[#021819]/80 backdrop-blur-sm pointer-events-none z-30"
          />
        </div>

        {/* --- Top Architectural Spec HUD Bar --- */}
        <div className="absolute top-0 left-0 right-0 z-20 p-3 sm:p-5 lg:p-6 flex flex-col md:flex-row items-center justify-between gap-3 bg-gradient-to-b from-black/85 via-black/40 to-transparent">
          {/* Left: Status & Location Coordinates */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <div className="inline-flex items-center gap-2 bg-[#0C969C]/25 border border-[#0C969C]/50 px-3 py-1 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#E3F0B6] animate-ping" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#E3F0B6]">
                {property.status}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/80 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
              <FaMapMarkerAlt className="text-[#0C969C] text-xs" />
              <span className="font-medium text-white">{property.place}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70 text-[11px] font-mono">
                {property.coordinates}
              </span>
            </div>
          </div>

          {/* Right: Quick Spec Badges */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/15 px-2.5 sm:px-3 py-1 rounded-xl text-white text-xs">
              <FaBed className="text-[#E3F0B6]" />
              <span>{property.specs.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/15 px-2.5 sm:px-3 py-1 rounded-xl text-white text-xs">
              <FaBath className="text-[#E3F0B6]" />
              <span>{property.specs.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/15 px-2.5 sm:px-3 py-1 rounded-xl text-white text-xs font-semibold text-[#E3F0B6]">
              <FaRulerCombined className="text-[#0C969C]" />
              <span>{displayArea}</span>
            </div>
            <div className="hidden xl:flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/15 px-2.5 sm:px-3 py-1 rounded-xl text-white text-xs">
              <FaCar className="text-[#E3F0B6]" />
              <span>{property.specs.parkingBays} Bays</span>
            </div>
          </div>
        </div>

        {/* --- Center Showcase Content --- */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-5 sm:px-8 lg:px-16 pt-16 pb-28 md:py-24 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-3 sm:space-y-4"
          >
            {/* Collection Pill */}
            <div className="inline-flex items-center gap-2 bg-black/50 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <FaStar className="text-amber-400 text-xs" />
              <span className="text-xs uppercase tracking-widest text-[#E3F0B6] font-semibold">
                {property.collection}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs text-white/70 font-mono">
                0{index + 1} / 0{total}
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-lg">
              {property.title}
            </h2>

            {/* Subtitle / Architectural Vision */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-light max-w-xl line-clamp-2 leading-relaxed">
              {property.subtitle}
            </p>

            {/* Highlight Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {property.highlights.slice(0, 3).map((highlight, hIdx) => (
                <span
                  key={hIdx}
                  className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-white/90 text-xs"
                >
                  <FaCheck className="text-[#0C969C] text-[10px]" />
                  <span>{highlight}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* --- Interactive Perspective Switcher Floating Card (Desktop & Tablet) --- */}
        <div className="absolute right-4 sm:right-8 top-20 sm:top-24 z-20 flex flex-col gap-2 bg-black/60 backdrop-blur-xl border border-white/15 p-2 sm:p-2.5 rounded-2xl shadow-xl max-w-[200px]">
          <div className="text-[10px] uppercase font-bold tracking-wider text-white/60 px-1 flex items-center justify-between">
            <span>Camera View</span>
            <span className="text-[#0C969C] font-mono">
              {activePerspectiveIdx + 1}/{property.perspectives.length}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            {property.perspectives.map((persp, pIdx) => {
              const isActive = activePerspectiveIdx === pIdx;
              return (
                <button
                  key={pIdx}
                  onClick={() => setActivePerspectiveIdx(pIdx)}
                  className={`group flex items-center gap-2 p-1.5 rounded-xl text-left transition-all duration-300 ${
                    isActive
                      ? "bg-[#0C969C]/30 border border-[#0C969C]/70 shadow-lg"
                      : "hover:bg-white/10 border border-transparent"
                  }`}
                >
                  <div className="relative w-9 h-7 rounded-lg overflow-hidden shrink-0 border border-white/20">
                    <Image
                      src={persp.image}
                      alt={persp.label}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                      sizes="40px"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p
                      className={`text-[11px] font-semibold truncate ${
                        isActive ? "text-[#E3F0B6]" : "text-white/80"
                      }`}
                    >
                      {persp.label}
                    </p>
                    <p className="text-[9px] text-white/50 truncate">
                      {persp.tag}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- Bottom Luxury Action & Pricing HUD --- */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row items-stretch md:items-end justify-between gap-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
          {/* Price and Type Pill */}
          <div className="flex items-center gap-3 sm:gap-4 bg-black/70 backdrop-blur-xl border border-white/20 p-3 sm:p-4 rounded-2xl shadow-xl">
            <div>
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400">
                {property.type} • {property.architect}
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#E3F0B6] tracking-tight">
                  {displayPrice}
                </span>
                <span className="text-[11px] text-white/60">
                  {currency === "bdt" ? "(BDT)" : "(USD Est.)"}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Save / Favorite Toggle */}
            <button
              onClick={() => onToggleSave(property.id)}
              className="p-3 sm:p-3.5 rounded-xl bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
              title={isSaved ? "Saved to Favorites" : "Save Property"}
              aria-label="Save Property"
            >
              {isSaved ? (
                <FaHeart className="text-red-500 text-base" />
              ) : (
                <FaRegHeart className="text-white/80 text-base" />
              )}
            </button>

            {/* Share Property Button */}
            <button
              onClick={() => onShare(property)}
              className="p-3 sm:p-3.5 rounded-xl bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
              title="Share Residence"
              aria-label="Share Property"
            >
              <FaShareAlt className="text-base" />
            </button>

            {/* Explore Dossier Modal CTA */}
            <button
              onClick={() => onOpenDossier(property)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/25 transition-all hover:scale-103 active:scale-97 shadow-lg"
            >
              <FaEye className="text-[#0C969C]" />
              <span>Explore Dossier</span>
            </button>

            {/* Book Viewing / Tour CTA */}
            <button
              onClick={() => onBookViewing(property)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#0C969C] hover:bg-[#0bb0b8] text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-xl shadow-[#0C969C]/30 transition-all hover:scale-103 active:scale-97"
            >
              <FaCalendarCheck className="text-white" />
              <span>Book Private Tour</span>
              <FaArrowRight className="text-xs ml-1 hidden sm:inline-block" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- Architectural Dossier / Quick View Modal ---
interface PropertyDossierModalProps {
  property: PropertyData | null;
  isOpen: boolean;
  onClose: () => void;
  onBookTour: (property: PropertyData) => void;
  unit: "sqft" | "sqm";
  currency: "bdt" | "usd";
}

function PropertyDossierModal({
  property,
  isOpen,
  onClose,
  onBookTour,
  unit,
  currency,
}: PropertyDossierModalProps) {
  const [activeModalImgIdx, setActiveModalImgIdx] = useState(0);

  // Reset active image index whenever property changes
  useEffect(() => {
    setActiveModalImgIdx(0);
  }, [property]);

  if (!isOpen || !property) return null;

  const displayArea =
    unit === "sqft"
      ? `${property.specs.sqft.toLocaleString()} sq ft`
      : `${property.specs.sqm} m²`;

  const displayPrice =
    currency === "bdt" ? property.priceBdt : property.priceUsd;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative z-10 w-full max-w-4xl bg-[#021819] border border-white/20 rounded-3xl overflow-hidden shadow-2xl my-auto text-white flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-black/40">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#0C969C]">
                Architectural Dossier
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {property.title}
              </h3>
              <p className="text-xs text-gray-400">{property.location}</p>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition hover:rotate-90 duration-200"
              aria-label="Close modal"
            >
              <FaTimes className="text-base" />
            </button>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
            {/* Gallery View */}
            <div className="space-y-2.5">
              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/15 shadow-inner">
                <Image
                  src={property.perspectives[activeModalImgIdx]?.image || property.perspectives[0].image}
                  alt={property.perspectives[activeModalImgIdx]?.label || property.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#E3F0B6] border border-white/10">
                  {property.perspectives[activeModalImgIdx]?.label} (
                  {property.perspectives[activeModalImgIdx]?.tag})
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {property.perspectives.map((persp, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveModalImgIdx(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                      activeModalImgIdx === idx
                        ? "border-[#0C969C] scale-102"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={persp.image}
                      alt={persp.label}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Statement / Description */}
            <div className="bg-black/30 border border-white/10 p-4 rounded-2xl">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#E3F0B6] mb-1.5 flex items-center gap-2">
                <FaCompass className="text-[#0C969C]" />
                Architectural Vision
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed font-light">
                {property.description}
              </p>
            </div>

            {/* Detailed Spec Grid */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#E3F0B6] mb-3 flex items-center gap-2">
                <FaLayerGroup className="text-[#0C969C]" />
                Technical Specifications
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-[10px] text-gray-400 uppercase">
                    Total Living Area
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {displayArea}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-[10px] text-gray-400 uppercase">
                    Bedrooms & Baths
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {property.specs.bedrooms} Bed / {property.specs.bathrooms}{" "}
                    Bath
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-[10px] text-gray-400 uppercase">
                    Ceiling Clearance
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {property.specs.ceilingHeight}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-[10px] text-gray-400 uppercase">
                    Parking Capacity
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {property.specs.parkingBays} Covered Bays
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-[10px] text-gray-400 uppercase">
                    Orientation
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5 truncate">
                    {property.specs.orientation}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-[10px] text-gray-400 uppercase">
                    Sustainability Rating
                  </span>
                  <p className="text-sm font-bold text-[#E3F0B6] mt-0.5">
                    {property.specs.energyRating}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-[10px] text-gray-400 uppercase">
                    Handover Schedule
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {property.specs.handoverYear}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-[10px] text-gray-400 uppercase">
                    Guide Price
                  </span>
                  <p className="text-sm font-bold text-[#E3F0B6] mt-0.5">
                    {displayPrice}
                  </p>
                </div>
              </div>
            </div>

            {/* Signature Highlights & Features */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#E3F0B6] mb-3 flex items-center gap-2">
                <FaLeaf className="text-[#0C969C]" />
                Key Engineering & Lifestyle Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {property.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-2 rounded-xl text-xs text-gray-200"
                  >
                    <FaCheck className="text-[#0C969C] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-6 border-t border-white/10 bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <span className="text-[11px] text-gray-400 uppercase">
                Private Consultation Available
              </span>
              <div className="text-lg font-bold text-[#E3F0B6]">
                {displayPrice}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-white/20 text-white hover:bg-white/10 text-xs font-semibold transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookTour(property);
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#0C969C] hover:bg-[#0bb0b8] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-[#0C969C]/30 transition hover:scale-103"
              >
                <FaCalendarCheck />
                <span>Schedule Viewing</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// --- Main ScrollStackGallery Component ---
export default function ScrollStackGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [unit, setUnit] = useState<"sqft" | "sqm">("sqft");
  const [currency, setCurrency] = useState<"bdt" | "usd">("bdt");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Modal States
  const [dossierProperty, setDossierProperty] = useState<PropertyData | null>(
    null
  );
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const [bookingProperty, setBookingProperty] = useState<PropertyData | null>(
    null
  );
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [, setBookingSuccess] = useState(false);

  // Framer Motion Scroll interpolation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = LUXURY_PROPERTIES.length;

  // Active Index state derived from progress
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const idx = Math.min(total - 1, Math.floor(latest * total));
      setActiveIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, total]);

  const handleToggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShare = (property: PropertyData) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        `${window.location.origin}/properties?highlight=${property.id}`
      );
      setShareToast(`Link to ${property.title} copied to clipboard!`);
      setTimeout(() => setShareToast(null), 3000);
    }
  };

  const handleOpenDossier = (property: PropertyData) => {
    setDossierProperty(property);
    setIsDossierOpen(true);
  };

  const handleBookViewing = (property: PropertyData) => {
    setBookingProperty(property);
    setIsBookingOpen(true);
  };

  const scrollToCard = (index: number) => {
    const cardEl = document.getElementById(`residence-card-${index}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-[#021819] text-white overflow-hidden selection:bg-[#0C969C] selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#0C969C] text-white px-5 py-2.5 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 border border-white/30 backdrop-blur-md"
          >
            <FaCheck />
            <span>{shareToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Section Header & Controls --- */}
      <div className="pt-20 pb-10 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#0C969C]/20 border border-[#0C969C]/40 px-3.5 py-1.5 rounded-full text-[#E3F0B6] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <FaCity className="text-[#0C969C]" />
            Signature Stack Collection
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Curated Architectural Showcases
          </h2>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl font-light">
            Scroll to experience our premier residential developments. Engineered
            with sustainable materials, smart biophilic elements, and private
            amenities.
          </p>
        </div>

        {/* Global Unit & Currency Controls */}
        <div className="flex items-center gap-3 bg-black/50 border border-white/15 p-2 rounded-2xl backdrop-blur-xl shadow-xl shrink-0">
          {/* Unit Toggle */}
          <div className="flex items-center bg-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => setUnit("sqft")}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                unit === "sqft"
                  ? "bg-[#0C969C] text-white shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Sq Ft
            </button>
            <button
              onClick={() => setUnit("sqm")}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                unit === "sqm"
                  ? "bg-[#0C969C] text-white shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              M²
            </button>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center bg-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => setCurrency("bdt")}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                currency === "bdt"
                  ? "bg-[#E3F0B6] text-[#021819] font-bold shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              ৳ BDT
            </button>
            <button
              onClick={() => setCurrency("usd")}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                currency === "usd"
                  ? "bg-[#E3F0B6] text-[#021819] font-bold shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              $ USD
            </button>
          </div>
        </div>
      </div>

      {/* --- Sticky Side Progress HUD & Scrubber (Desktop) --- */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 bg-black/60 backdrop-blur-xl border border-white/15 py-4 px-2.5 rounded-full shadow-2xl">
        <span className="text-[11px] font-mono font-bold text-[#E3F0B6]">
          0{activeIndex + 1}
        </span>

        {/* Dynamic Progress Bar */}
        <div className="w-1 h-28 bg-white/15 rounded-full relative overflow-hidden">
          <motion.div
            style={{
              height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
            }}
            className="w-full bg-[#0C969C] rounded-full"
          />
        </div>

        {/* Clickable Dots */}
        <div className="flex flex-col gap-2 pt-1">
          {LUXURY_PROPERTIES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              className="group relative flex items-center justify-center p-1 rounded-full transition-all"
              aria-label={`Scroll to property ${idx + 1}`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "bg-[#E3F0B6] scale-125 shadow-[0_0_8px_#E3F0B6]"
                    : "bg-white/30 hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>

        <span className="text-[10px] font-mono text-white/50">
          0{total}
        </span>
      </div>

      {/* --- Scroll Stack Cards Container --- */}
      <div
        ref={containerRef}
        className="relative"
        style={{
          height: `${total * 100}vh`,
        }}
      >
        {LUXURY_PROPERTIES.map((property, index) => (
          <StackCard
            key={property.id}
            property={property}
            index={index}
            total={total}
            unit={unit}
            currency={currency}
            isSaved={savedIds.includes(property.id)}
            onToggleSave={handleToggleSave}
            onShare={handleShare}
            onOpenDossier={handleOpenDossier}
            onBookViewing={handleBookViewing}
            containerProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* --- In-Depth Architectural Dossier Modal --- */}
      <PropertyDossierModal
        property={dossierProperty}
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        onBookTour={handleBookViewing}
        unit={unit}
        currency={currency}
      />

      {/* --- Booking Modal Integration --- */}
      {bookingProperty && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          propertyId={bookingProperty.id.toString()}
          propertyTitle={bookingProperty.title}
          onSuccess={() => {
            setBookingSuccess(true);
            setTimeout(() => setBookingSuccess(false), 5000);
          }}
        />
      )}
    </section>
  );
}
