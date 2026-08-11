"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCMS } from "@/lib/cms-context";
import { 
  Droplet, 
  Wheat, 
  Microscope, 
  Factory, 
  ShieldCheck, 
  Dna, 
  Search, 
  Lightbulb 
} from "lucide-react";

const badges = [
  { label: "Liquid Spawn", icon: Droplet, pos: { top: "20%", left: "15%" }, duration: 5, delay: 0 },
  { label: "Grain Spawn", icon: Wheat, pos: { top: "15%", left: "55%" }, duration: 6, delay: 1 },
  { label: "Mother Culture", icon: Microscope, pos: { top: "45%", left: "80%" }, duration: 4.5, delay: 0.5 },
  { label: "Commercial Spawn", icon: Factory, pos: { top: "70%", left: "65%" }, duration: 7, delay: 2 },
  { label: "Cleanroom Lab", icon: ShieldCheck, pos: { top: "75%", left: "20%" }, duration: 5.5, delay: 1.5 },
  { label: "Biotechnology", icon: Dna, pos: { top: "45%", left: "5%" }, duration: 6.5, delay: 0.2 },
  { label: "Research", icon: Search, pos: { top: "35%", left: "35%" }, duration: 4, delay: 2.5 },
  { label: "Innovation", icon: Lightbulb, pos: { top: "55%", left: "45%" }, duration: 5.2, delay: 1.2 },
];

export default function AboutTechnology() {
  const { data } = useCMS();
  const rawBadges = data?.about?.techBadges || [];
  const iconsList = [Droplet, Wheat, Microscope, Factory, ShieldCheck, Dna, Search, Lightbulb];
  const posList = [
    { top: "20%", left: "15%" },
    { top: "15%", left: "55%" },
    { top: "45%", left: "80%" },
    { top: "70%", left: "65%" },
    { top: "75%", left: "20%" },
    { top: "45%", left: "5%" },
    { top: "35%", left: "35%" },
    { top: "55%", left: "45%" },
  ];

  const activeBadges = rawBadges.length > 0
    ? rawBadges.map((b: any, idx: number) => ({
        label: b.label,
        icon: iconsList[idx % iconsList.length],
        pos: posList[idx % posList.length],
        duration: 4 + (idx % 3) * 1.2,
        delay: (idx % 4) * 0.5
      }))
    : badges;

  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden min-h-[auto] lg:min-h-[600px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Mouse Follow Glow */}
      <div 
        className="absolute pointer-events-none transition-opacity duration-300 z-0"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(123, 170, 107, 0.15) 0%, rgba(255,255,255,0) 70%)',
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s ease, left 0.1s ease-out, top 0.1s ease-out'
        }}
      />

      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-0 relative z-20">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#4e8c4a] font-extrabold mb-4 block">
            Technology
          </span>
          <h2 className="font-display font-black tracking-tight text-[#1c3c24] text-4xl lg:text-5xl mb-6">
            Tools of Innovation
          </h2>
        </div>

        {/* Desktop Absolute Layout */}
        <div className="hidden lg:block relative flex-grow min-h-[400px] mt-8">
          {activeBadges.map((badge: any, index: number) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                className="absolute"
                style={{ top: badge.pos.top, left: badge.pos.left }}
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: badge.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: badge.delay,
                }}
              >
                <div className="bg-white border border-[#e6e4dc] rounded-full px-6 py-3 flex items-center gap-3 cursor-default hover:scale-105 hover:border-[#4e8c4a] hover:shadow-lg transition-all duration-300 group">
                  <Icon className="w-5 h-5 text-[#4e8c4a] group-hover:text-[#1c3c24] transition-colors" />
                  <span className="text-sm font-bold text-[#1c3c24]">
                    {badge.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Flex Layout */}
        <div className="flex lg:hidden flex-wrap justify-center gap-4 relative z-20">
          {activeBadges.map((badge: any, index: number) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: badge.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: badge.delay,
                }}
              >
                <div className="bg-white border border-[#e6e4dc] rounded-full px-5 py-2.5 flex items-center gap-2 cursor-default hover:border-[#4e8c4a] transition-all duration-300">
                  <Icon className="w-4 h-4 text-[#4e8c4a]" />
                  <span className="text-sm font-bold text-[#1c3c24]">
                    {badge.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
