"use client";

import Link from "next/link";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div className="relative w-screen h-115 lg:h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="top-0 left-0 absolute w-full h-screen object-cover"
        src="/image/hero/realestatevideo.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Content */}
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 120, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="z-10 relative flex flex-col justify-around items-center lg:items-start gap-5 lg:px-25 py-10"
      >
        <h2 className="flex justify-center items-center mt-10 md:mt-20 lg:mt-60 px-4 w-80 md:w-120 lg:w-185 h-full font-bold text-[20px] text-white lg:text-[45px] lg:text-left text-center leading-8 lg:leading-16">
          Reimagining urban living through sustainable design and human -
          centered development.
        </h2>

        <button className="bg-white hover:bg-[#E3F0B6] mt-10 lg:ml-5 px-7 py-2 rounded-sm w-60 text-black">
          <Link
            className="flex justify-between items-center gap-3"
            href="/properties"
          >
            VIEW PROPERTIES <FaArrowRightArrowLeft />
          </Link>
        </button>
      </motion.div>
    </div>
  );
}

export default Hero;
