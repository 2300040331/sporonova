"use client";

import React from "react";

const ITEMS = [
  "Liquid Spawn Technology",
  "Scientific Cultivation",
  "Shiitake Innovation",
  "Pure Mycelium",
  "Sustainable Agriculture",
  "Commercial Farming",
  "Research Excellence",
  "Biotechnology",
  "Cleanroom Production",
  "Zero Chemical Process",
  "ISO Standards",
  "Future Farming"
];

export default function AboutMarquee() {
  return (
    <section className="py-8 overflow-hidden bg-[#f9faf7] border-y border-[#e6e4dc]">
      <div className="flex whitespace-nowrap animate-marquee hover:pause" style={{ width: "max-content" }}>
        {[...Array(2)].map((_, arrayIndex) => (
          <div key={arrayIndex} className="flex items-center space-x-8 px-4">
            {ITEMS.map((item, index) => (
              <React.Fragment key={`${arrayIndex}-${index}`}>
                <span 
                  className={`text-2xl md:text-4xl font-display font-black uppercase tracking-wider ${
                    index % 2 === 0 ? "text-[#1c3c24]" : "text-[#4e8c4a]"
                  }`}
                >
                  {item}
                </span>
                <span className="text-[#7baa6b] text-xl">◆</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
