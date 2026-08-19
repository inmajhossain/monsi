"use client";

import Link from "next/link";
import Image from "next/image";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import { FaPlus, FaSignOutAlt, FaShieldAlt, FaTachometerAlt } from "react-icons/fa";

function Header() {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();

  return (
    <div className="top-6 right-0 z-40 fixed mx-auto px-4 lg:px-8 w-full">
      <div className="hidden lg:flex flex-row justify-between items-center bg-black/50 shadow-2xl backdrop-blur-xl px-6 py-2 border border-white/10 rounded-2xl w-full h-20">
        {/* Logo */}
        <Link className="flex items-center gap-2" href="/">
          <Image
            src="/image/logo/monsi-logo.png"
            alt="Monsi Engineering Logo"
            width={55}
            height={55}
            priority
            className="w-auto h-auto p-1 drop-shadow-md"
          />
          <span className="font-serif text-[18px] text-white tracking-wide whitespace-nowrap">
            Monsi Engineering
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-row items-center gap-4 xl:gap-6 font-sans text-[14px] text-gray-200">
          <Link
            className="hover:text-[#0C969C] transition-colors"
            href="/"
          >
            Home
          </Link>
          <Link
            className="hover:text-[#0C969C] transition-colors"
            href="/properties"
          >
            Properties
          </Link>
          <Link
            className="hover:text-[#0C969C] transition-colors"
            href="/about"
          >
            About
          </Link>
          <Link
            className="hover:text-[#0C969C] transition-colors"
            href="/projects"
          >
            Projects
          </Link>
          <Link
            className="hover:text-[#0C969C] transition-colors"
            href="/architectural"
          >
            Architectural
          </Link>
          <Link
            className="hover:text-[#0C969C] transition-colors"
            href="/structural"
          >
            Structural
          </Link>
          <Link
            className="hover:text-[#0C969C] transition-colors"
            href="/interior"
          >
            Interior
          </Link>

          {/* Admin shortcuts in nav if logged in */}
          {isAuthenticated && isAdmin && (
            <>
              <Link
                href="/add-property"
                className="flex items-center gap-1.5 bg-[#0C969C]/20 hover:bg-[#0C969C]/30 px-3 py-1.5 border border-[#0C969C]/50 rounded-lg font-medium text-[#E3F0B6] transition"
              >
                <FaPlus className="w-3 h-3 text-amber-400" />
                Add Property
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 border border-white/20 rounded-lg font-medium text-white transition"
              >
                <FaTachometerAlt className="w-3 h-3 text-[#0C969C]" />
                Dashboard
              </Link>
            </>
          )}
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="flex items-center gap-3">
          {isAuthenticated && isAdmin ? (
            <div className="flex items-center gap-2 bg-neutral-900/80 px-3 py-1.5 border border-white/15 rounded-xl text-xs">
              <div className="flex items-center gap-1 text-[#E3F0B6]">
                <FaShieldAlt className="text-amber-400" />
                <span className="font-medium max-w-[90px] truncate">
                  {user?.profile?.firstName || 'Admin'}
                </span>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="hover:bg-red-500/20 p-1.5 rounded-lg text-red-400 hover:text-red-300 transition"
              >
                <FaSignOutAlt className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-neutral-800/90 hover:bg-neutral-700 px-4 py-2 border border-white/15 rounded-xl font-medium text-gray-200 hover:text-white text-xs transition whitespace-nowrap"
            >
              Admin Sign In
            </Link>
          )}

          <Link
            className="flex items-center gap-2 bg-black hover:bg-[#E3F0B6] px-5 py-2 rounded-xl font-medium text-white hover:text-black text-xs transition duration-200 whitespace-nowrap"
            href="/contact"
          >
            Contact Us <FaArrowRightArrowLeft className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
