"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import MenuModal from "./MenuModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen((currentValue) => !currentValue);

  return (
    <nav className="flex w-full items-center justify-between bg-white px-4 py-4 lg:px-8">
      <a href="https://convertor.se/" aria-label="Gå till Convertors startsida">
        <Image
          src="/images/convertor-logo.svg"
          alt="Convertor Logo"
          width={210}
          height={40}
          priority
          className="h-8 w-auto"
        />
      </a>

      <button
        className="ml-auto lg:hidden"
        onClick={toggleMenu}
        aria-label="Öppna meny"
        aria-expanded={isMenuOpen}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="#14243D"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <div className="hidden items-center space-x-4 lg:flex lg:flex-grow lg:justify-end">
        <a
          href="https://convertor.se/"
          className="px-3 py-2 text-xs font-bold uppercase leading-tight text-custom-blue transition-colors duration-300 ease-out hover:text-[#33ABBD]"
        >
          START
        </a>
        <a
          href="https://convertor.se/kundcase/"
          className="px-3 py-2 text-xs font-bold uppercase leading-tight text-custom-blue transition-colors duration-300 ease-out hover:text-[#33ABBD]"
        >
          CASE
        </a>
        <a
          href="https://convertor.se/kontakt/"
          className="px-3 py-2 text-xs font-bold uppercase leading-tight text-custom-blue transition-colors duration-300 ease-out hover:text-[#33ABBD]"
        >
          KONTAKT
        </a>
      </div>

      <MenuModal isOpen={isMenuOpen} onClose={toggleMenu} />
    </nav>
  );
};

export default Navbar;
