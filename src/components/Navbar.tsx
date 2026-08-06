"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Leaf, ArrowRight, Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const productsList = [
    { name: "Liquid Spawn", href: "/spawn/liquid-spawn" },
    { name: "Grain Spawn", href: "/spawn/grain-spawn" },
    { name: "Mother Culture", href: "/spawn/mother-culture" },
    { name: "Commercial Spawn", href: "/spawn/commercial-spawn" },
  ];

  return (
    <>
      <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#e6e4dc]/60 py-3.5 shadow-md"
          : "bg-white/90 backdrop-blur-sm border-b border-[#e6e4dc]/35 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src="/logo_transparent.png"
            alt="SPORONOVA"
            className="h-14 w-auto hover:scale-[1.02] transition-all"
          />
        </Link>
 
        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-[#1c3c24]">
          <Link href="/" className="hover:text-[#4e8c4a] transition-colors py-2">Home</Link>
          
          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowProductsDropdown(true)}
            onMouseLeave={() => setShowProductsDropdown(false)}
          >
            <button className="hover:text-[#4e8c4a] transition-colors flex items-center gap-1 uppercase cursor-pointer py-2">
              Products <ChevronDown className="w-3.5 h-3.5 text-[#4e8c4a]" />
            </button>
            {showProductsDropdown && (
              <div className="absolute top-full left-0 w-52 pt-2 z-50">
                <div className="bg-white border border-[#e6e4dc] rounded-2xl shadow-xl py-2.5">
                  {productsList.map((p) => (
                    <Link
                      key={p.name}
                      href={p.href}
                      className="block px-5 py-2.5 text-[11px] font-bold text-[#1c3c24] hover:bg-[#f9faf7] hover:text-[#4e8c4a] transition-colors"
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
 
          <Link href="/process" className="hover:text-[#4e8c4a] transition-colors py-2">Production Process</Link>
          <Link href="/about" className="hover:text-[#4e8c4a] transition-colors py-2">About Us</Link>
          <Link href="/#why-choose-us" className="hover:text-[#4e8c4a] transition-colors py-2">Why Choose Us</Link>
          <Link href="/knowledge" className="hover:text-[#4e8c4a] transition-colors py-2">Knowledge Center</Link>
        </nav>
 
        {/* Action Button & Contact Info */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 bg-[#1c3c24] text-[10px] font-bold uppercase tracking-wider text-white rounded-full hover:bg-[#4e8c4a] hover:scale-[1.02] transition-all shadow-md shadow-[#1c3c24]/10"
          >
            Contact Us <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
 
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#1c3c24] hover:text-[#4e8c4a] transition-colors cursor-pointer"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
 
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#e6e4dc] shadow-md py-6 px-6 space-y-4 animate-slideDown">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block text-[11px] font-bold uppercase tracking-wider text-[#333333] hover:text-[#4e8c4a]"
          >
            Home
          </Link>

          {/* Products Section */}
          <div className="space-y-1.5 pl-3 border-l border-[#e6e4dc]">
            <span className="block text-[9px] font-mono text-gray-400 uppercase tracking-widest">Products</span>
            {productsList.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                onClick={() => setIsOpen(false)}
                className="block text-[10px] font-bold uppercase tracking-wider text-[#333333] hover:text-[#4e8c4a]"
              >
                {p.name}
              </Link>
            ))}
          </div>

          <Link
            href="/process"
            onClick={() => setIsOpen(false)}
            className="block text-[11px] font-bold uppercase tracking-wider text-[#333333] hover:text-[#4e8c4a]"
          >
            Production Process
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block text-[11px] font-bold uppercase tracking-wider text-[#333333] hover:text-[#4e8c4a]"
          >
            About Us
          </Link>
          <Link
            href="/#why-choose-us"
            onClick={() => setIsOpen(false)}
            className="block text-[11px] font-bold uppercase tracking-wider text-[#333333] hover:text-[#4e8c4a]"
          >
            Why Choose Us
          </Link>
          <Link
            href="/knowledge"
            onClick={() => setIsOpen(false)}
            className="block text-[11px] font-bold uppercase tracking-wider text-[#333333] hover:text-[#4e8c4a]"
          >
            Knowledge Center
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#4e8c4a] text-[10px] font-bold uppercase tracking-widest text-white rounded-xl w-full justify-center"
          >
            Contact Us <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </header>

    {/* Floating WhatsApp Button */}
    <a
      href="https://wa.me/917207208419"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
      title="Contact on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="w-14 h-14 drop-shadow-lg"
        fill="none"
      >
        <path
          d="M24 4C12.954 4 4 12.954 4 24c0 3.535.922 6.855 2.535 9.738L4 44l10.572-2.472A19.92 19.92 0 0024 44c11.046 0 20-8.954 20-20S35.046 4 24 4z"
          fill="#25D366"
        />
        <path
          d="M34.588 29.2c-.578-.29-3.418-1.687-3.95-1.88-.53-.192-.917-.29-1.303.29-.387.58-1.496 1.88-1.834 2.267-.337.386-.675.434-1.253.144-.578-.29-2.44-.899-4.65-2.867-1.718-1.532-2.878-3.424-3.215-4.002-.338-.58-.036-.892.254-1.18.26-.26.578-.675.867-1.012.29-.337.386-.578.578-.964.193-.386.097-.724-.048-1.013-.145-.29-1.303-3.14-1.786-4.3-.47-1.127-.948-0.974-1.303-.992-.337-.016-.724-.02-1.11-.02-.387 0-1.013.145-1.544.724-.53.578-2.023 1.977-2.023 4.82 0 2.843 2.07 5.59 2.36 5.975.289.387 4.076 6.222 9.874 8.727 1.38.596 2.457.952 3.297 1.218 1.385.44 2.646.378 3.642.229 1.111-.166 3.418-1.397 3.9-2.747.483-1.35.483-2.506.338-2.747-.145-.24-.53-.385-1.11-.675z"
          fill="#fff"
        />
      </svg>
    </a>
  </>
  );
}
