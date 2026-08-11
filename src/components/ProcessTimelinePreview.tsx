"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useCMS } from "@/lib/cms-context";

export default function ProcessTimelinePreview() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { data } = useCMS();

  const stepsList = (data?.homepage as any)?.processPreviewSteps && (data?.homepage as any).processPreviewSteps.length > 0
    ? (data?.homepage as any).processPreviewSteps
    : [
        { name: "Mother Culture", desc: "Genomics slant isolation.", iconName: "Dna" },
        { name: "Spawn Production", desc: "Inoculating carrier blocks.", iconName: "Settings" },
        { name: "Quality Testing", desc: "100% purity clearance.", iconName: "ShieldCheck" },
        { name: "Packaging", desc: "Eco filter bag sealing.", iconName: "Box" },
        { name: "Distribution", desc: "Cold chain logistics dispatch.", iconName: "Send" },
      ];

  return (
    <div className="w-full bg-[#f8f7f3] border border-[#e6e4dc] rounded-3xl p-8 shadow-sm">
      
      <div className="text-center mb-8">
        <span className="text-[10px] text-[#4e8c4a] font-mono uppercase tracking-widest block mb-1">
          Production Pipeline Overview
        </span>
        <h3 className="text-gray-950 font-display text-xl font-bold tracking-wide">
          Our Standard Manufacturing Journey
        </h3>
        <p className="text-gray-850 text-sm font-semibold mt-1">
          A simplified overview of our professional, highly monitored manufacturing pipeline.
        </p>
      </div>

      {/* Horizontal step deck */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 overflow-x-auto pb-4 pt-2">
        {stepsList.map((step: any, idx: number) => {
          const isActive = hoveredIdx === idx;
          const IconComp = (LucideIcons as any)[step.iconName] || LucideIcons.Settings;

          return (
            <React.Fragment key={step.name}>
              {/* Step Card */}
              <motion.div
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-300 w-full md:w-[170px] cursor-default select-none shrink-0 ${
                  isActive
                    ? "bg-[#4e8c4a] border-[#4e8c4a] text-white shadow-md shadow-[#4e8c4a]/20"
                    : "bg-white border-[#e6e4dc] text-gray-900 shadow-sm"
                }`}
              >
                {/* Step Index bubble */}
                <span className={`absolute top-2.5 right-2.5 text-[9px] font-mono font-black ${
                  isActive ? "text-white/60" : "text-gray-400"
                }`}>
                  0{idx + 1}
                </span>

                {/* Animated Icon container */}
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm border transition-colors ${
                    isActive
                      ? "bg-white/10 border-white/20 text-white"
                      : "bg-[#f8f7f3] border-[#e6e4dc] text-[#4e8c4a]"
                  }`}
                >
                  <IconComp className="w-5 h-5" />
                </motion.div>

                <h4 className="text-sm font-extrabold tracking-wide mb-1 leading-snug">{step.name}</h4>
                <p className={`text-xs font-semibold leading-normal max-w-[135px] ${
                  isActive ? "text-white/80" : "text-gray-700"
                }`}>
                  {step.desc}
                </p>
              </motion.div>

              {/* Connecting arrow indicator with sliding animation */}
              {idx < stepsList.length - 1 && (
                <div className="hidden md:block text-[#7baa6b] shrink-0">
                  <motion.div
                    animate={hoveredIdx === idx ? { x: [0, 5, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="text-center mt-8 pt-6 border-t border-gray-200/50">
        <Link
          href="/process"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#4e8c4a] hover:text-[#3c6d39] uppercase tracking-wider transition-colors"
        >
          Learn More About Manufacturing Parameters &rarr;
        </Link>
      </div>

    </div>
  );
}
