"use client";

import React from "react";
import {
  Search,
  FlaskConical,
  Microscope,
  Factory,
  ClipboardCheck,
  Package,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";

const processSteps = [
  {
    id: 1,
    title: "Research",
    desc: "Scientific strain analysis and substrate optimization",
    Icon: Search,
  },
  {
    id: 2,
    title: "Culture Development",
    desc: "Pure mycelium isolation on sterile agar media",
    Icon: FlaskConical,
  },
  {
    id: 3,
    title: "Laboratory Testing",
    desc: "Microscopic verification and contamination screening",
    Icon: Microscope,
  },
  {
    id: 4,
    title: "Spawn Production",
    desc: "Scaled multiplication in GMP-compliant cleanrooms",
    Icon: Factory,
  },
  {
    id: 5,
    title: "Quality Inspection",
    desc: "Multi-stage quality checks and biological efficiency testing",
    Icon: ClipboardCheck,
  },
  {
    id: 6,
    title: "Packaging",
    desc: "Sterile packaging with cold-chain readiness",
    Icon: Package,
  },
  {
    id: 7,
    title: "Farmer Delivery",
    desc: "Temperature-controlled distribution across India",
    Icon: Truck,
  },
];

export default function AboutProcess() {
  return (
    <section className="relative bg-[#f9faf7] py-24 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#4e8c4a] font-extrabold mb-4 block">
            Our Process
          </span>
          <h2 className="font-display font-black tracking-tight text-[#1c3c24] text-4xl md:text-5xl lg:text-6xl">
            From Research to Your Farm
          </h2>
        </motion.div>
      </div>

      {/* Horizontally scrollable cards */}
      <div className="relative">
        {/* Fade edges on desktop */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#f9faf7] to-transparent z-10 pointer-events-none" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#f9faf7] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 px-6 md:px-12 overflow-x-auto pb-4 scrollbar-hide md:cursor-grab md:active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex-shrink-0 w-[280px] md:w-[320px]"
            >
              {/* Card */}
              <div className="bg-white border border-[#e6e4dc] rounded-3xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-[#4e8c4a]/10 flex items-center justify-center shrink-0">
                    <step.Icon className="w-7 h-7 text-[#4e8c4a]" strokeWidth={1.5} />
                  </div>
                  <span className="text-4xl font-display font-black text-[#e6e4dc]">
                    0{step.id}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-[#1c3c24] mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
