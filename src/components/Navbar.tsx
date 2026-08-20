"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Leaf, ArrowRight, Menu, X, ChevronDown } from "lucide-react";

import { useCMS } from "@/lib/cms-context";
import { getSectionStyles, getHeadingStyles, getParagraphStyles, getButtonStyles } from "@/lib/styles-helper";

export default function Navbar() {
  const { data } = useCMS();
  const header = data?.header;
  const [isOpen, setIsOpen] = useState(false);
  const [desktopProductsOpen, setDesktopProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const defaultProducts = [
    { id: "liquid-spawn", name: "Liquid Spawn", category: "Industrial Inoculant", desc: "Active vegetative mycelium cells suspended in sterilized liquid sugar broth, optimized for bioreactor inoculation.", href: "/spawn/liquid-spawn" },
    { id: "grain-spawn", name: "Grain Spawn", category: "Commercial Inoculant", desc: "High-energy hydrated whole grain matrices colonized with second-generation (G2) rhizomorphic fungal mycelium.", href: "/spawn/grain-spawn" },
    { id: "mother-culture", name: "Mother Culture", category: "Genomic Stock", desc: "Pure agar slant isolates maintained under cryogenic refrigeration to safeguard strain genomics and vigor.", href: "/spawn/mother-culture" },
    { id: "commercial-spawn", name: "Commercial Spawn", category: "Fruiting Substrate", desc: "Pre-colonized, bulk production mycelium ready for immediate farm expansion and high-yield commercial flushes.", href: "/spawn/commercial-spawn" },
  ];

  const productsList = (data?.products && data.products.length > 0)
    ? data.products
    : defaultProducts;

  const defaultNavLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/#products" },
    { name: "Production Process", href: "/process" },
    { name: "About Us", href: "/about" },
    { name: "Why Choose Us", href: "/#why-choose-us" },
    { name: "Knowledge Center", href: "/knowledge" },
  ];

  // Strictly navigation data only: filter out any individual product (/spawn/*) or stage records if mistakenly passed
  const navLinks = (header?.navLinks && header.navLinks.length > 0
    ? header.navLinks
    : defaultNavLinks
  ).filter((link: any) => {
    if (!link || !link.name || !link.href) return false;
    // Exclude individual product detail URLs from top navigation bar
    const href = link.href.toLowerCase().trim();
    if (href.startsWith("/spawn/") && href !== "/spawn") return false;
    return true;
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/98 backdrop-blur-md border-b border-[#e2e8e0] py-3.5 shadow-sm"
            : "bg-white border-b border-[#e8ece6] py-4"
        }`}
        style={getSectionStyles(header?.styles)}
      >
        <div className="max-w-[1680px] w-full mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src={header?.logoUrl || "/logo_transparent.png"}
              alt={header?.logoAlt || "SPORONOVA"}
              className="h-10 sm:h-12 md:h-13 w-auto object-contain mix-blend-multiply group-hover:opacity-90 transition-all"
            />
          </Link>
 
        <nav 
          className="hidden lg:flex items-center gap-7 xl:gap-8 text-xs xl:text-[13px] font-extrabold uppercase tracking-wider text-[#1c3c24]"
          style={{ fontFamily: header?.styles?.fontFamily || undefined }}
        >
          {navLinks.map((link: any) => {
            const isProductsLink =
              link.name.toLowerCase().trim() === "products" ||
              link.href === "/#products" ||
              link.href === "/products" ||
              link.name.toLowerCase().includes("product");

            if (isProductsLink) {
              return (
                <div
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => setDesktopProductsOpen(true)}
                  onMouseLeave={() => setDesktopProductsOpen(false)}
                >
                  <Link 
                    href={link.href} 
                    className="hover:text-[#4e8c4a] transition-colors py-2 flex items-center gap-1.5 cursor-pointer font-extrabold text-xs xl:text-[13px]"
                    style={{ color: header?.styles?.textColor || undefined }}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className="w-3.5 h-3.5 text-[#4e8c4a] group-hover:rotate-180 transition-transform duration-200"
                    />
                  </Link>

                  {/* Rich Dropdown Menu On Hover with Invisible Bridge */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[420px] z-50 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto pointer-events-none before:absolute before:-top-3 before:left-0 before:w-full before:h-4">
                    <div className="bg-white border border-[#e2e8e0] rounded-3xl shadow-2xl p-4 space-y-2.5 backdrop-blur-md">
                      <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#2c5e37] font-bold block">
                          Certified Spawn Categories
                        </span>
                        <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                          Lab Formulations
                        </span>
                      </div>
                      
                      <div className="space-y-1.5 max-h-[440px] overflow-y-auto pr-1">
                        {productsList.map((prod: any) => (
                          <Link
                            key={prod.id || prod.name}
                            href={prod.href || `/spawn/${prod.id}`}
                            className="flex items-start gap-3 p-3 rounded-2xl hover:bg-[#f0f5ef] border border-transparent hover:border-[#d2e4d0] transition-all group/item"
                          >
                            <div className="w-9 h-9 rounded-xl bg-[#f9faf7] border border-[#e6e4dc] flex items-center justify-center shrink-0 group-hover/item:border-[#4e8c4a] group-hover/item:bg-white transition-all shadow-2xs mt-0.5">
                              <Leaf className="w-4 h-4 text-[#4e8c4a]" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-0.5">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-extrabold text-[#1c3c24] group-hover/item:text-[#4e8c4a] block transition-colors truncate">
                                  {prod.name}
                                </span>
                                <span className="text-[9px] font-mono font-bold text-gray-400 uppercase shrink-0">
                                  {prod.category || "Inoculant"}
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed font-medium">
                                {prod.desc || "High-potency laboratory certified mushroom spawn formulation."}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-gray-100">
                        <Link
                          href="/#products"
                          className="flex items-center justify-between px-4 py-2.5 bg-[#f0f5ef] hover:bg-[#1c3c24] hover:text-white rounded-2xl text-[11px] font-bold uppercase tracking-wider text-[#2c5e37] transition-all group/cta"
                        >
                          <span>Explore Full Spawn Catalog</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className="hover:text-[#4e8c4a] transition-colors py-2"
                style={{ color: header?.styles?.textColor || undefined }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
 
        {/* Action Button & Contact Info */}
        <div className="hidden lg:flex items-center">
          <Link
            href={header?.ctaLink || "/contact"}
            className="flex items-center gap-2 px-7 py-3.5 bg-[#1c3c24] text-[11px] font-extrabold uppercase tracking-wider text-white rounded-full hover:bg-[#4e8c4a] hover:scale-[1.03] transition-all shadow-md shadow-[#1c3c24]/10"
            style={getButtonStyles(header?.styles)}
          >
            {header?.ctaText || "Contact Us"} <ArrowRight className="w-4 h-4" />
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
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#e6e4dc] shadow-md py-6 px-6 space-y-4 animate-slideDown max-h-[85vh] overflow-y-auto">
          {navLinks.map((link: any) => {
            const isProductsLink =
              link.name.toLowerCase() === "products" ||
              link.href === "/#products" ||
              link.href === "/products";

            if (isProductsLink) {
              return (
                <div key={link.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-[11px] font-bold uppercase tracking-wider text-[#333333] hover:text-[#4e8c4a]"
                    >
                      {link.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className="p-1 text-gray-500 hover:text-[#1c3c24]"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileProductsOpen ? "rotate-180 text-[#4e8c4a]" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {mobileProductsOpen && (
                    <div className="pl-3 space-y-2 border-l-2 border-[#4e8c4a]/30 my-2 animate-fadeIn">
                      {productsList.map((prod: any) => (
                        <Link
                          key={prod.id || prod.name}
                          href={prod.href || `/spawn/${prod.id}`}
                          onClick={() => setIsOpen(false)}
                          className="block p-2 rounded-xl hover:bg-[#f0f5ef] space-y-0.5 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#1c3c24] block">
                              {prod.name}
                            </span>
                            <span className="text-[9px] font-mono text-gray-400">
                              {prod.category || "Inoculant"}
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-500 line-clamp-1">
                            {prod.desc}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-[11px] font-bold uppercase tracking-wider text-[#333333] hover:text-[#4e8c4a]"
              >
                {link.name}
              </Link>
            );
          })}
          
          <Link
            href={header?.ctaLink || "/contact"}
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#4e8c4a] text-[10px] font-bold uppercase tracking-widest text-white rounded-xl w-full justify-center"
          >
            {header?.ctaText || "Contact Us"} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </header>
 
    {/* Floating WhatsApp Button */}
    <a
      href={`https://wa.me/${data?.contact?.whatsappNumber || "917207208419"}`}
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
