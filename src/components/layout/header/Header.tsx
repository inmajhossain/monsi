import Link from "next/link";
import Image from "next/image";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

function Header() {
  return (
    <div className="p-10">
      <div className="hidden z-99 relative lg:flex flex-row justify-between items-center bg-black/10 backdrop-blur-lg px-10 w-full h-20 :">
        <Link className="flex items-center gap-1" href={"/home"}>
          <Image
            src="/image/logo/monsi-logo.png"
            alt={"logo"}
            width={85}
            height={85}
            className="p-1"
          />
          <h6 className="font-serif text-[20px] text-white">
            Monsi Engineering
          </h6>
        </Link>

        <nav className="flex flex-row justify-evenly items-center gap-4 lg:w-220 font-sans text-[#181A2F] text-[16px] text-center">
          <Link
            className="hover:text-[#0C969C] transition-transform ease-in"
            href="/"
          >
            Home
          </Link>
          <Link
            className="hover:text-[#0C969C] transition-transform ease-in"
            href="/about"
          >
            About
          </Link>

          <Link
            className="hover:text-[#0C969C] transition-transform ease-in"
            href="/projects"
          >
            Projects
          </Link>
          <Link
            className="hover:text-[#0C969C] transition-transform ease-in"
            href="/architectural"
          >
            Architctural Engineering
          </Link>
          <Link
            className="hover:text-[#0C969C] transition-transform ease-in"
            href="/structural"
          >
            Structural Engineering
          </Link>
          <Link
            className="hover:text-[#0C969C] transition-transform ease-in"
            href="/interior"
          >
            Interior Design
          </Link>
          <Link
            className="hover:text-[#0C969C] transition-transform ease-in"
            href="/construction"
          >
            Construction Management
          </Link>
          <Link
            className="hover:text-[#0C969C] transition-transform ease-in"
            href="/developer"
          >
            Residential Developer
          </Link>
        </nav>
        <button className="bg-black hover:bg-[#E3F0B6] px-7 py-2 rounded-sm text-white hover:text-black">
          <Link
            className="flex justify-between items-center gap-3"
            href="/contact"
          >
            Contact Us <FaArrowRightArrowLeft />
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Header;
