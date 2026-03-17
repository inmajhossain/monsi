// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// interface Property {
//   id: number;
//   title: string;
//   place: string;
//   sqm: number;
//   location: string;
//   price: string;
//   type: string;
//   image: string;
//   accent: string;
// }

// const properties: Property[] = [
//   {
//     id: 1,
//     title: "THE VERDANT LOFT",
//     place: "Gulshan-2",
//     sqm: 2400,
//     location: "Dhaka North",
//     price: "৳ 1.85 Cr",
//     type: "Penthouse",
//     image: "/image/scroolimage/one.webp",
//     accent: "#C8A96E",
//   },
//   {
//     id: 2,
//     title: "OBSIDIAN RESIDENCE",
//     place: "Banani",
//     sqm: 3100,
//     location: "Dhaka Central",
//     price: "৳ 2.40 Cr",
//     type: "Duplex",
//     image: "/image/scroolimage/two.webp",
//     accent: "#7EB8A4",
//   },
//   {
//     id: 3,
//     title: "SOLSTICE MANOR",
//     place: "Dhanmondi",
//     sqm: 1900,
//     location: "Dhaka West",
//     price: "৳ 1.20 Cr",
//     type: "Garden Villa",
//     image: "/image/scroolimage/three.webp",
//     accent: "#E07A5F",
//   },
// ];

// function ScrollStackGallery({
//   property,
//   index,
// }: {
//   property: Property;
//   index: number;
// }) {
//   return (
//     <div className="top-0 sticky w-full h-screen" style={{ zIndex: index + 1 }}>
//       {/* Details Bar */}
//       <motion.div
//         initial={{ y: -60, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
//         className="top-0 right-0 left-0 z-20 absolute flex items-stretch bg-black/40 backdrop-blur-lg mx-auto px-50 h-18"
//       >
//         {/* Index Number */}
//         <div
//           className="flex justify-center items-center w-18 font-black text-3xl tracking-tighter shrink-0"
//           style={{
//             color: property.accent,
//             fontFamily: "'Playfair Display', serif",
//           }}
//         >
//           {String(property.id).padStart(2, "0")}
//         </div>

//         {/* Divider */}
//         <div
//           className="self-stretch my-3 w-px"
//           style={{ background: property.accent, opacity: 0.35 }}
//         />

//         {/* Stats */}
//         <div
//           className="flex flex-1 items-stretch divide-x"
//           style={{ borderColor: `${property.accent}22` }}
//         >
//           {[
//             { label: "PLACE", value: property.place },
//             { label: "SQM", value: `${property.sqm.toLocaleString()} m²` },
//             { label: "LOCATION", value: property.location },
//             { label: "TYPE", value: property.type },
//             { label: "PRICE", value: property.price },
//           ].map(item => (
//             <div
//               key={item.label}
//               className="flex flex-col justify-center gap-0.5 px-5 divide-x"
//               style={{ borderColor: `${property.accent}22` }}
//             >
//               <span
//                 className="font-bold text-[9px] uppercase tracking-[0.2em]"
//                 style={{ color: property.accent, opacity: 0.75 }}
//               >
//                 {item.label}
//               </span>
//               <span
//                 className="font-medium text-[13px] text-white tracking-wide whitespace-nowrap"
//                 style={{ fontFamily: "'DM Mono', monospace" }}
//               >
//                 {item.value}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Right Accent */}
//         <div
//           className="w-1.5 h-full shrink-0"
//           style={{ background: property.accent }}
//         />
//       </motion.div>

//       {/* Full-screen Image */}
//       <div className="relative w-full h-full overflow-hidden">
//         <Image
//           src={property.image}
//           alt={property.title}
//           fill
//           className="object-cover"
//           priority={index === 0}
//           sizes="100vw"
//         />

//         {/* Gradient Overlay */}
//         <div
//           className="absolute inset-0"
//           style={{
//             background: `linear-gradient(
//               180deg,
//               rgba(0,0,0,0.55) 0%,
//               rgba(0,0,0,0.1) 40%,
//               rgba(0,0,0,0.08) 60%,
//               rgba(0,0,0,0.72) 100%
//             )`,
//           }}
//         />

//         {/* Center Title */}
//         <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.92, y: 24 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             transition={{
//               duration: 0.9,
//               delay: 0.25,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//             className="px-6 text-center"
//           >
//             <div
//               className="mb-4 font-medium text-[9px] uppercase tracking-[0.4em]"
//               style={{ color: property.accent }}
//             >
//               ─── Property {String(property.id).padStart(2, "0")} ───
//             </div>
//             <h1
//               className="drop-shadow-2xl font-black text-white text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter"
//               style={{ fontFamily: "'Playfair Display', serif" }}
//             >
//               {property.title}
//             </h1>
//             <div
//               className="opacity-60 mx-auto mt-5 w-32 h-px"
//               style={{ background: property.accent }}
//             />
//             <p
//               className="mt-4 text-white/60 text-sm uppercase tracking-[0.25em]"
//               style={{ fontFamily: "'DM Mono', monospace" }}
//             >
//               {property.location} · {property.place}
//             </p>
//           </motion.div>
//         </div>

//         {/* Bottom left corner tag */}
//         <div className="bottom-8 left-8 absolute flex items-end gap-4">
//           <div
//             className="opacity-50 w-0.5 h-16"
//             style={{ background: property.accent }}
//           />
//           <div>
//             <div
//               className="mb-1 font-semibold text-[10px] uppercase tracking-[0.3em]"
//               style={{ color: property.accent }}
//             >
//               {property.type}
//             </div>
//             <div
//               className="font-black text-white text-3xl tracking-tight"
//               style={{ fontFamily: "'Playfair Display', serif" }}
//             >
//               {property.price}
//             </div>
//           </div>
//         </div>

//         {/* Bottom right scroll hint (only on first card) */}
//         {index === 0 && (
//           <motion.div
//             className="right-8 bottom-8 absolute flex flex-col items-center gap-2"
//             animate={{ y: [0, 8, 0] }}
//             transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
//           >
//             <span className="text-[9px] text-white/40 uppercase tracking-[0.3em]">
//               Scroll
//             </span>
//             <div className="bg-white/30 w-px h-10" />
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function StickyPropertyView() {
//   return (
//     <>
//       {/* Google Fonts */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono:wght@400;500&display=swap');
//       `}</style>

//       <main className="bg-black">
//         {/* Each card is sticky; total scroll = cards × 100vh */}
//         <div
//           style={{ height: `${properties.length * 100}vh` }}
//           className="relative"
//         >
//           {properties.map((property, index) => (
//             <ScrollStackGallery
//               key={property.id}
//               property={property}
//               index={index}
//             />
//           ))}
//         </div>

//         {/* Footer after all cards */}
//         <div
//           className="z-50 relative flex flex-col justify-center items-center px-6 py-28 text-center"
//           style={{ background: "#080808" }}
//         >
//           <div
//             className="mb-5 font-medium text-[9px] uppercase tracking-[0.4em]"
//             style={{ color: "#C8A96E" }}
//           >
//             ─── End of Listings ───
//           </div>
//           <h2
//             className="font-black text-white text-4xl md:text-5xl tracking-tighter"
//             style={{ fontFamily: "'Playfair Display', serif" }}
//           >
//             Find Your Space
//           </h2>
//           <p
//             className="mt-4 text-white/40 text-sm uppercase tracking-widest"
//             style={{ fontFamily: "'DM Mono', monospace" }}
//           >
//             Premium Properties · Dhaka
//           </p>
//         </div>
//       </main>
//     </>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Property {
  id: number;
  title: string;
  place: string;
  sqm: number;
  location: string;
  price: string;
  type: string;
  image: string;
}

const properties: Property[] = [
  {
    id: 1,
    title: "THE VERDANT LOFT",
    place: "Gulshan-2",
    sqm: 2400,
    location: "Dhaka North",
    price: "৳ 1.85 Cr",
    type: "Penthouse",
    image: "/image/scroolimage/one.webp",
  },
  {
    id: 2,
    title: "OBSIDIAN RESIDENCE",
    place: "Banani",
    sqm: 3100,
    location: "Dhaka Central",
    price: "৳ 2.40 Cr",
    type: "Duplex",
    image: "/image/scroolimage/two.webp",
  },
  {
    id: 3,
    title: "SOLSTICE MANOR",
    place: "Dhanmondi",
    sqm: 1900,
    location: "Dhaka West",
    price: "৳ 1.20 Cr",
    type: "Garden Villa",
    image: "/image/scroolimage/three.webp",
  },
];

function PropertyCard({
  property,
  index,
}: {
  property: Property;
  index: number;
}) {
  return (
    <div className="top-0 sticky w-full h-screen" style={{ zIndex: index + 1 }}>
      {/* Top Black Bar */}
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 1,
          delay: 0.1 + index * 0.3,
          ease: "easeOut",
        }}
        className="top-0 left-0 z-20 absolute flex flex-wrap justify-center gap-2 md:gap-4 bg-black/60 backdrop-blur-md py-3 w-full text-white text-xs md:text-sm"
      >
        <span>{property.place}</span>{" "}
        <span className="bg-amber-500 w-0.5 md:w-1 h-4 md:h-5 font-extrabold animate-pulse"></span>
        <span>{property.sqm} m²</span>
        <span className="bg-amber-500 w-0.5 md:w-1 h-4 md:h-5 font-extrabold animate-pulse"></span>
        <span>{property.location}</span>
        <span className="bg-amber-500 w-0.5 md:w-1 h-4 md:h-5 font-extrabold animate-pulse"></span>
        <span>{property.type}</span>
        <span className="bg-amber-500 w-0.5 md:w-1 h-4 md:h-5 font-extrabold animate-pulse"></span>
        <span>{property.price}</span>
      </motion.div>

      {/* Image */}
      <div className="relative w-full h-full">
        <Image
          src={property.image}
          alt={property.title}
          fill
          priority={index === 0}
          className="brightness-100 object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Center Title */}
        <div className="absolute inset-0 flex justify-center items-center px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
            className="font-semibold text-white text-3xl md:text-6xl"
          >
            {property.title}
          </motion.h1>
        </div>

        {/* Bottom Info */}
        <div className="bottom-6 md:bottom-26 left-6 md:left-26 absolute text-white animate-bounce">
          <p className="text-md uppercase">{property.type}</p>
          <p className="font-bold text-2xl">{property.price}</p>
        </div>

        {/* Scroll Hint */}
        {index === 0 && (
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="right-6 bottom-6 absolute opacity-50 text-white text-xs"
          >
            Scroll ↓
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function StickyPropertyView() {
  return (
    <main className="bg-[#052F30]">
      {/* Scroll Container */}
      <div
        className="relative"
        style={{ height: `${properties.length * 100}vh` }}
      >
        {properties.map((property, index) => (
          <PropertyCard key={property.id} property={property} index={index} />
        ))}
      </div>

      {/* Footer */}
      <div className="py-20 text-white text-center">
        <h2 className="font-bold text-3xl">Find Your Space</h2>
        <p className="opacity-60 mt-2 text-md uppercase tracking-wide">
          Premium Properties{" "}
          <span className="font-extrabold text-amber-500 animate-pulse">|</span>{" "}
          Dhaka
        </p>
      </div>
    </main>
  );
}
