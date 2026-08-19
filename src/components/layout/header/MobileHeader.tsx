"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { FaPlus, FaSignOutAlt, FaShieldAlt, FaTachometerAlt } from "react-icons/fa";

function MobileHeader() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, isAuthenticated, logout } = useAuth();

  return (
    <div className="lg:hidden top-0 left-0 z-50 fixed w-full">
      <div className="flex justify-between items-center bg-black/60 backdrop-blur-xl px-5 h-16 border-b border-white/10">
        {/* Logo */}
        <Link className="flex items-center gap-1.5" href="/">
          <Image
            src="/image/logo/monsi-logo.png"
            alt="Monsi Engineering Logo"
            width={45}
            height={45}
            priority
            className="w-auto h-auto"
          />
          <span className="font-serif text-[16px] text-white">
            Monsi Engineering
          </span>
        </Link>

        {/* Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 text-white text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col gap-3 bg-black/90 shadow-2xl backdrop-blur-2xl px-6 py-6 border-b border-white/15 text-sm text-white max-h-[85vh] overflow-y-auto"
          >
            {/* Admin status pill if logged in */}
            {isAuthenticated && isAdmin && (
              <div className="flex justify-between items-center bg-[#0C969C]/15 p-3 border border-[#0C969C]/30 rounded-xl mb-2">
                <div className="flex items-center gap-2 text-[#E3F0B6] text-xs">
                  <FaShieldAlt className="text-amber-400" />
                  <span>Admin: {user?.profile?.firstName || user?.email}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="flex items-center gap-1 text-red-400 hover:text-red-300 text-xs"
                >
                  <FaSignOutAlt className="w-3 h-3" /> Sign Out
                </button>
              </div>
            )}

            <Link href="/" onClick={() => setOpen(false)} className="hover:text-[#0C969C] py-1">
              Home
            </Link>
            <Link href="/properties" onClick={() => setOpen(false)} className="hover:text-[#0C969C] py-1">
              Properties
            </Link>

            {isAuthenticated && isAdmin ? (
              <>
                <Link
                  href="/add-property"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 bg-[#0C969C]/20 hover:bg-[#0C969C]/30 p-2.5 rounded-lg font-medium text-[#E3F0B6]"
                >
                  <FaPlus className="text-amber-400 w-3.5 h-3.5" />
                  Add Property Listing
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 p-2.5 rounded-lg font-medium text-white"
                >
                  <FaTachometerAlt className="text-[#0C969C] w-3.5 h-3.5" />
                  Client Dashboard
                </Link>
              </>
            ) : (
              <Link
                href="/auth/signin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 p-2.5 rounded-lg text-gray-200"
              >
                <FaShieldAlt className="text-amber-400 w-3.5 h-3.5" />
                Admin Sign In
              </Link>
            )}

            <div className="border-t border-white/10 my-1 pt-2 flex flex-col gap-2.5 text-gray-300">
              <Link href="/about" onClick={() => setOpen(false)} className="hover:text-white">
                About
              </Link>
              <Link href="/projects" onClick={() => setOpen(false)} className="hover:text-white">
                Projects
              </Link>
              <Link href="/architectural" onClick={() => setOpen(false)} className="hover:text-white">
                Architectural Engineering
              </Link>
              <Link href="/structural" onClick={() => setOpen(false)} className="hover:text-white">
                Structural Engineering
              </Link>
              <Link href="/interior" onClick={() => setOpen(false)} className="hover:text-white">
                Interior Design
              </Link>
              <Link href="/construction" onClick={() => setOpen(false)} className="hover:text-white">
                Construction Management
              </Link>
              <Link href="/developer" onClick={() => setOpen(false)} className="hover:text-white">
                Residential Developer
              </Link>
            </div>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="bg-[#E3F0B6] hover:bg-[#c9d897] mt-3 py-2.5 rounded-xl font-medium text-black text-center transition"
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
