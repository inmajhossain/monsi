import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaMailBulk, FaPhoneSquare } from "react-icons/fa";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaInstagram,
  FaSquareFacebook,
  FaTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex flex-col justify-between items-center bg-[#032F30] px-2 w-full text-[#E3F0B6]">
      {/* Company Information */}
      <div className="flex md:flex-row flex-col justify-between items-center md:gap-50 px-30 py-20 max-w-full">
        {/* left */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/image/logo/monsi-logo.png"
            alt={"logo"}
            width={250}
            height={250}
            className="p-1"
          />
          <h4 className="w-95 font-mono font-bold text-[30px] lg:text-[36px]">
            Monsi Engineering
          </h4>
        </div>
        {/* right */}
        <div className="flex md:flex-row flex-col justify-between items-center md:items-start gap-10 md:gap-25 mt-10 md:mt-0">
          {/* left */}
          <div className="flex flex-col justify-around items-center md:items-start gap-2">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/architectural">Architctural Engineering</Link>
            <Link href="/structural">Structural Engineering</Link>
            <Link href="/interior">Interior Design</Link>
            <Link href="/construction">Construction Management</Link>
            <Link href="/developer">Developer</Link>
          </div>
          {/* right */}
          <div className="flex flex-col justify-around items-center md:items-start">
            <div className="flex flex-col justify-around items-center md:items-start gap-2">
              <h6 className="w-90 text-[24px] md:text-left text-center">
                Address
              </h6>
              <h6 className="w-80 md:text-left text-center">
                Suite - 07, Doreen Vinchita Complex, Rupnagar R/A, Mirpur, Dhaka
                - 1216.
              </h6>
              <Link
                href="tel:+8801515212670"
                className="flex flex-row items-center gap-2"
              >
                <FaPhoneSquare size={20} /> +880 1515212670
              </Link>
              <Link
                href="mailto:jwel@monsi.com"
                className="flex flex-row items-center gap-2"
              >
                <FaMailBulk size={20} /> jwel@monsi.com
              </Link>
            </div>
            {/* Social Media Links

            <div className="flex flex-row items-center gap-3 mt-10">
              <FaFacebook
                size={35}
                className="hover:text-white transition-transform ease-in cursor-pointer"
              />
              <FaInstagram
                size={35}
                className="hover:text-white transition-transform ease-in cursor-pointer"
              />
              <FaLinkedin
                size={35}
                className="hover:text-white transition-transform ease-in cursor-pointer"
              />
              <FaTwitter
                size={35}
                className="hover:text-white transition-transform ease-in cursor-pointer"
              />
              <FaFacebookMessenger
                size={35}
                className="hover:text-white transition-transform ease-in cursor-pointer"
              />
            </div> */}
          </div>
          <div className="flex flex-col justify-center items-center md:mt-18">
            {/* Book Appoinment */}
            <Link
              href="mailto:jwel@monsi.com"
              className="bg-[#723306] px-10 py-4"
            >
              <h6>Book Appointment</h6>
            </Link>
            {/* Social Media Links */}

            <div className="flex flex-row items-center gap-3 mt-10">
              <FaFacebook
                size={35}
                className="hover:text-white transition-transform ease-in cursor-pointer"
              />
              <FaInstagram
                size={35}
                className="hover:text-white transition-transform ease-in cursor-pointer"
              />
              <FaLinkedin
                size={35}
                className="hover:text-white transition-transform ease-in cursor-pointer"
              />
              <FaTwitter
                size={35}
                className="hover:text-white transition-transform ease-in cursor-pointer"
              />
              <FaFacebookMessenger
                size={35}
                className="hover:text-white transition-transform ease-in cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Developer Information */}
      <div className="flex md:flex-row flex-col justify-around items-center gap-2 mx-auto mt-2 py-2 border-t-2 w-full font-semibold text-center">
        <h6 className="hidden md:flex w-111 font-mono">
          © 2023 - 2026 Monsi Engnieering & Constraction
        </h6>
        <h6 className="hidden md:flex font-extrabold">|</h6>
        <h6 className="lg:w-111 font-mono text-[13px] md:text-[16px]">
          All rights reserved. Site by Inmaj Hossain
        </h6>
        <h6 className="hidden md:flex font-extrabold">|</h6>
        <Link
          href="tel:+8801515212670"
          className="flex flex-row items-center gap-2 lg:ml-5 lg:w-111 font-mono"
        >
          <FaPhoneSquare size={20} /> +880 1515212670
        </Link>
      </div>
    </div>
  );
};

export default Footer;
