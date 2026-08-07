"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, HeartHandshake, Truck, GraduationCap } from "lucide-react";

interface Indicator {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const INDICATORS: Indicator[] = [
  {
    icon: <CheckCircle2 className="w-5 h-5 text-[#4e8c4a]" />,
    title: "Certified Production",
    desc: "ICAR-DMR & GMP standards compliant.",
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-[#4e8c4a]" />,
    title: "Research-Backed",
    desc: "Engineered by PhD mycologists.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#4e8c4a]" />,
    title: "Quality Tested",
    desc: "100% sterile culture verification.",
  },
  {
    icon: <HeartHandshake className="w-5 h-5 text-[#4e8c4a]" />,
    title: "Farmer Support",
    desc: "Expert technical guidance & kits.",
  },
  {
    icon: <Truck className="w-5 h-5 text-[#4e8c4a]" />,
    title: "Nationwide Supply",
    desc: "Temperature-regulated shipping.",
  },
];

export default function TrustIndicators() {
  return (
    <div className="w-full bg-white border border-[#e6e4dc] rounded-2xl p-6 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-y md:divide-y-0 lg:divide-x divide-[#e6e4dc]">
        {INDICATORS.map((ind, i) => (
          <div
            key={ind.title}
            className={`flex items-start gap-3.5 pt-4 md:pt-0 lg:pl-6 first:pl-0 first:pt-0 ${
              i === 1 || i === 2 ? "pt-4 md:pt-0" : ""
            }`}
          >
            <span className="p-2.5 rounded-xl bg-[#f8f7f3] border border-[#e6e4dc] shrink-0">
              {ind.icon}
            </span>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-extrabold text-[#333333] tracking-wide">{ind.title}</h4>
              <p className="text-[11px] font-semibold text-[#555555] leading-relaxed">{ind.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
