"use client";

import React from "react";
import Link from "next/link";
import { Award, Globe, Shield, Activity } from "lucide-react";

import { useCMS } from "@/lib/cms-context";

export default function Footer() {
  const { data } = useCMS();
  const footer = data?.footer;
  const products = data?.products || [];

  const defaultProducts = [
    { name: "Liquid Spawn Broth", href: "/spawn/liquid-spawn" },
    { name: "Grain Spawn Jars/Bags", href: "/spawn/grain-spawn" },
    { name: "Mother Culture Agar", href: "/spawn/mother-culture" },
    { name: "Commercial Spawn Packs", href: "/spawn/commercial-spawn" },
  ];

  const catalogLinks = products.length > 0
    ? products.map(p => ({ name: p.name, href: p.href }))
    : defaultProducts;

  const partners = [
    { name: "JICA", desc: "Japan International Cooperation Agency" },
    { name: "ICAR-DMR", desc: "Directorate of Mushroom Research" },
    { name: "NHB", desc: "National Horticulture Board" },
    { name: "ISO 9001:2015", desc: "Quality Management Certified" },
    { name: "GMP", desc: "Good Manufacturing Practices" },
  ];

  return (
    <footer className="bg-[#f9faf7] border-t border-[#e6e4dc]/80 pt-20 pb-12 px-6 z-10 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex flex-col items-start gap-1 group cursor-pointer inline-flex">
              <img
                src={footer?.logoUrl || "/logo_transparent.png"}
                alt="SPORONOVA"
                className="h-12 w-auto group-hover:scale-105 transition-transform"
              />
              <span className="text-[9px] font-mono text-gray-500 tracking-tight leading-none pl-0.5">Cultivating Growth, Naturally.</span>
            </Link>
            <p className="text-gray-600 text-xs leading-relaxed max-w-sm">
              {footer?.description || "Empowering farmers, entrepreneurs, and commercial growers with premium certified mushroom spawn and scientific cultivation solutions."}
            </p>
            <div className="flex gap-3">
              <Link href="/" title="Home Portal" className="w-9 h-9 rounded-full bg-white border border-[#e6e4dc] flex items-center justify-center hover:border-[#4e8c4a] hover:bg-white hover:scale-[1.05] transition-all shadow-sm">
                <Globe className="w-4 h-4 text-gray-500 hover:text-[#4e8c4a]" />
              </Link>
              <Link href="/terms" title="Terms & Security Protocol" className="w-9 h-9 rounded-full bg-white border border-[#e6e4dc] flex items-center justify-center hover:border-[#4e8c4a] hover:bg-white hover:scale-[1.05] transition-all shadow-sm">
                <Shield className="w-4 h-4 text-gray-500 hover:text-[#4e8c4a]" />
              </Link>
              <Link href="/#accreditation" title="Accreditation & Approvals" className="w-9 h-9 rounded-full bg-white border border-[#e6e4dc] flex items-center justify-center hover:border-[#4e8c4a] hover:bg-white hover:scale-[1.05] transition-all shadow-sm">
                <Award className="w-4 h-4 text-gray-500 hover:text-[#4e8c4a]" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#1c3c24] font-display text-xs font-bold uppercase tracking-wider mb-6">Spawn Catalog</h4>
            <ul className="flex flex-col gap-3 text-xs text-gray-600 font-medium">
              {catalogLinks.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="hover:text-[#4e8c4a] transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cultivation Solutions */}
          <div>
            <h4 className="text-[#1c3c24] font-display text-xs font-bold uppercase tracking-wider mb-6">Cultivation Solutions</h4>
            <ul className="flex flex-col gap-3 text-xs text-gray-600 font-medium">
              <li><Link href="/process" className="hover:text-[#4e8c4a] transition-colors">Production Process Map</Link></li>
              <li><Link href="/knowledge" className="hover:text-[#4e8c4a] transition-colors">Technical Knowledge Base</Link></li>
              <li><Link href="/#why-choose-us" className="hover:text-[#4e8c4a] transition-colors">Quality Control Metrics</Link></li>
              <li><Link href="/#contact" className="hover:text-[#4e8c4a] transition-colors">Farmer Inquiries</Link></li>
            </ul>
          </div>

          {/* Certified Partners */}
          <div>
            <h4 className="text-[#1c3c24] font-display text-xs font-bold uppercase tracking-wider mb-6">Accreditation</h4>
            <div className="flex flex-wrap gap-2.5">
              {partners.map((pt) => (
                <Link
                  key={pt.name}
                  href="/#accreditation"
                  title={pt.desc}
                  className="bg-white border border-[#e6e4dc] hover:border-[#4e8c4a] hover:bg-[#f9faf7] transition-all px-3 py-2 rounded-xl text-[9px] font-mono font-bold tracking-wider text-[#4e8c4a] uppercase flex items-center gap-1.5 shadow-sm hover:scale-[1.03] cursor-pointer"
                >
                  <Activity className="w-2.5 h-2.5 text-[#7baa6b]" />
                  {pt.name}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="border-t border-[#e6e4dc] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 pr-12 md:pr-0">
          <div className="text-[10px] text-[#888888] font-mono text-center md:text-left">
            &copy; {new Date().getFullYear()} SPORONOVA. ALL RIGHTS RESERVED. CERTIFIED SPAWN MULTIPLICATION PLATFORM.
          </div>
          <div className="flex gap-6 text-[10px] text-[#888888] font-mono font-bold">
            <Link href="/terms" className="hover:text-[#4e8c4a] transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-[#4e8c4a] transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
