"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden top-0 left-0 z-50 fixed w-full">
      <div className="flex justify-between items-center bg-black/40 backdrop-blur-lg px-5 h-16">
        {/* Logo */}
        <Link className="flex items-center gap-1" href="/home">
          <Image
            src="/image/logo/monsi-logo.png"
            alt="logo"
            width={60}
            height={60}
          />
          <h6 className="font-serif text-[16px] text-white">
            Monsi Engineering
          </h6>
        </Link>

        {/* Menu Button */}
        <button onClick={() => setOpen(!open)} className="text-white text-2xl">
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="flex flex-col gap-4 bg-black/40 backdrop-blur-2xl px-6 py-6 text-md text-white"
          >
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/projects" onClick={() => setOpen(false)}>
              Projects
            </Link>
            <Link href="/architectural" onClick={() => setOpen(false)}>
              Architectural Engineering
            </Link>
            <Link href="/structural" onClick={() => setOpen(false)}>
              Structural Engineering
            </Link>
            <Link href="/interior" onClick={() => setOpen(false)}>
              Interior Design
            </Link>
            <Link href="/construction" onClick={() => setOpen(false)}>
              Construction Management
            </Link>
            <Link href="/developer" onClick={() => setOpen(false)}>
              Residential Developer
            </Link>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="bg-[#E3F0B6] hover:bg-black mt-4 py-2 rounded text-black text-center"
            >
              Contact Us
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileHeader;
