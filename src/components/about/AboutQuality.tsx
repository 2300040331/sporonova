"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Award, FileCheck, BadgeCheck, FlaskConical } from "lucide-react";

const qualityItems = [
  {
    id: 1,
    title: "GMP Laboratory",
    desc: "Good Manufacturing Practice compliant facility ensuring contamination-free production",
    Icon: Building2,
  },
  {
    id: 2,
    title: "ISO Standards",
    desc: "International quality management standards across all processes",
    Icon: Award,
  },
  {
    id: 3,
    title: "DMR Certification",
    desc: "Directorate of Mushroom Research validated protocols",
    Icon: FileCheck,
  },
  {
    id: 4,
    title: "NHB Certification",
    desc: "National Horticulture Board quality standards compliance",
    Icon: BadgeCheck,
  },
  {
    id: 5,
    title: "Scientific Validation",
    desc: "Rigorous strain verification and biological efficiency testing",
    Icon: FlaskConical,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};



export default function AboutQuality() {
  return (
    <section className="relative bg-[#1c3c24] py-24 md:py-32 overflow-hidden">
      {/* Background Particles */}
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: ["0%", "-20%", "0%"],
            x: ["0%", i % 2 === 0 ? "10%" : "-10%", "0%"],
          }}
          transition={{
            duration: 5 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-white/5 blur-xl"
          style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            top: `${10 + i * 20}%`,
            left: `${20 + (i % 2) * 50}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7baa6b] font-extrabold mb-4 block">
            Quality Assurance
          </span>
          <h2 className="font-display font-black tracking-tight text-white text-4xl md:text-5xl lg:text-6xl">
            Certified Excellence at Every Stage
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Top Row (3 items) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {qualityItems.slice(0, 3).map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group relative about-glow-border rounded-3xl"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-8 h-full transition-all duration-300 hover:bg-white/15">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.Icon className="w-7 h-7 text-[#7baa6b]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row (2 items centered) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {qualityItems.slice(3, 5).map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group relative about-glow-border rounded-3xl"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-8 h-full transition-all duration-300 hover:bg-white/15">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.Icon className="w-7 h-7 text-[#7baa6b]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
