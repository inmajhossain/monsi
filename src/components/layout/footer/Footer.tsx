"use client";

import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaMailBulk, FaPhoneSquare } from "react-icons/fa";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa6";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#032F30] w-full text-[#E3F0B6]">
      <div className="mx-auto px-4 md:px-8 py-10 max-w-360">
        {/* Top Section */}
        <div className="gap-10 md:gap-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:mt-10 md:ml-20 lg:ml-0">
          {/* Logo */}
          <motion.div
            className="flex flex-col items-center md:items-center md:text-left text-center"
            initial={{ y: -200, opacity: 0, rotate: 180 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Image
              src="/image/logo/monsi-logo.png"
              alt="logo"
              width={200}
              height={200}
              className="mb-3"
            />
            <h4 className="font-bold md:text-xl text-2xl lg:text-3xl">
              Monsi Engineering
            </h4>
          </motion.div>

          {/* Links */}
          <div className="flex flex-col gap-2 md:text-left text-center">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/architectural">Architectural Engineering</Link>
            <Link href="/structural">Structural Engineering</Link>
            <Link href="/interior">Interior Design</Link>
            <Link href="/construction">Construction Management</Link>
            <Link href="/developer">Developer</Link>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-3 md:text-left text-center">
            <h6 className="font-semibold text-xl">Address</h6>

            <p>
              Suite - 07, Doreen Vinchita Complex, Rupnagar R/A, Mirpur, Dhaka -
              1216.
            </p>

            <Link
              href="tel:+8801515212670"
              className="flex justify-center md:justify-start items-center gap-2"
            >
              <FaPhoneSquare /> +880 1515212670
            </Link>

            <Link
              href="mailto:jwel@monsi.com"
              className="flex justify-center md:justify-start items-center gap-2"
            >
              <FaMailBulk /> jwel@monsi.com
            </Link>
          </div>

          {/* Appointment + Social */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <Link
              href="mailto:jwel@monsi.com"
              className="bg-[#723306] hover:bg-[#8d3e07] px-8 py-3 transition"
            >
              Book Appointment
            </Link>

            <div className="flex gap-4">
              <FaFacebook
                size={30}
                className="hover:text-white cursor-pointer"
              />
              <FaInstagram
                size={30}
                className="hover:text-white cursor-pointer"
              />
              <FaLinkedin
                size={30}
                className="hover:text-white cursor-pointer"
              />
              <FaTwitter
                size={30}
                className="hover:text-white cursor-pointer"
              />
              <FaFacebookMessenger
                size={30}
                className="hover:text-white cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="md:flex md:justify-between mt-12 pt-6 border-[#1f5556] border-t text-sm md:text-left text-center">
          <p className="hidden lg:flex font-mono">
            © 2023 - 2026 Monsi Engineering & Construction
          </p>

          <p className="font-mono">
            All rights reserved. Site by Inmaj Hossain
          </p>

          <Link
            href="tel:+8801515212670"
            className="flex justify-center md:justify-start items-center gap-2 mt-2 md:mt-0"
          >
            <FaPhoneSquare /> +880 1515212670
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
