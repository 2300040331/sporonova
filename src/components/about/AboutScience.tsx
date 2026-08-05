"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FlaskConical, 
  Droplets, 
  Dna, 
  Microscope, 
  ShieldCheck, 
  Thermometer 
} from "lucide-react";

const scienceTopics = [
  {
    step: "01",
    title: "Pure Mycelium Culture",
    description: "Isolated on sterile agar media slants and verified through phase contrast microscopic analysis for complete genetic authenticity.",
    icon: FlaskConical
  },
  {
    step: "02",
    title: "Liquid Spawn Technology",
    description: "Active vegetative mycelium suspended in sterile liquid broth, engineered for 4x faster substrate colonization.",
    icon: Droplets
  },
  {
    step: "03",
    title: "Genetic Stability",
    description: "Multi-generation testing and strain preservation prevent genetic degeneration across commercial multiplication cycles.",
    icon: Dna
  },
  {
    step: "04",
    title: "Laboratory Verification",
    description: "Rigorous quality inspection including microscopic sectoring checks and bio-efficiency purity validation.",
    icon: Microscope
  },
  {
    step: "05",
    title: "Contamination Control",
    description: "Class 100 HEPA-filtered cleanrooms equipped with positive atmospheric pressure and continuous UV sterilization.",
    icon: ShieldCheck
  },
  {
    step: "06",
    title: "Cold Chain Storage",
    description: "Strict temperature-regulated cold chain distribution maintains mycelial dormancy until direct farm inoculation.",
    icon: Thermometer
  }
];

export default function AboutScience() {
  return (
    <section id="our-science" className="bg-luxury-mint py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono uppercase tracking-widest text-[#4e8c4a] font-extrabold mb-4 block"
          >
            Our Science
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black tracking-tight text-[#1c3c24] text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight"
          >
            The Technology Behind Every Spawn
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
          >
            We combine rigorous microbiology standards with proprietary cultivation techniques to ensure maximum yield, rapid growth, and disease resistance.
          </motion.p>
        </div>

        {/* 3x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scienceTopics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <motion.div
                key={topic.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-[#e6e4dc] rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2.5 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#f9faf7] border border-[#e6e4dc] flex items-center justify-center text-[#4e8c4a] group-hover:bg-[#4e8c4a] group-hover:text-white group-hover:border-[#4e8c4a] transition-all duration-300 shadow-sm">
                      <Icon className="w-7 h-7" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-xs font-bold text-gray-400 bg-[#f9faf7] px-3 py-1 rounded-full border border-[#e6e4dc]">
                      {topic.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-bold tracking-tight text-[#1c3c24] text-xl mb-3 group-hover:text-[#4e8c4a] transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                {/* Bottom subtle accent bar */}
                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-[#4e8c4a] font-bold uppercase tracking-wider">
                  <span>Verified Standard</span>
                  <span className="w-2 h-2 rounded-full bg-[#4e8c4a] group-hover:scale-150 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
