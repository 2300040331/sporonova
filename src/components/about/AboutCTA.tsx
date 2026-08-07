"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#f9faf7] to-[#f2f7f2]">
      {/* Animated Blobs */}
      <div className="absolute top-10 -left-20 w-96 h-96 bg-[#4e8c4a]/5 rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute top-40 -right-20 w-80 h-80 bg-[#7baa6b]/5 rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{ animationDuration: "10s", animationDelay: "1s" }} />
      <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-[#1c3c24]/5 rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{ animationDuration: "12s", animationDelay: "2s" }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#4e8c4a] font-extrabold block mb-6">
            Get Started
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-[#1c3c24] mb-8">
            Let's Grow the Future Together
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-12">
            Partner with SporoNova to experience next-generation mushroom spawn technology built on science, quality, and sustainability.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?inquiry=partnership"
              className="w-full sm:w-auto bg-[#4e8c4a] text-white rounded-full px-8 py-4 text-[10px] font-bold uppercase tracking-wider hover:bg-[#1c3c24] transition-all text-center hover:shadow-lg hover:-translate-y-1 duration-300 inline-block"
            >
              Become a Partner
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto border-2 border-[#1c3c24] text-[#1c3c24] rounded-full px-8 py-4 text-[10px] font-bold uppercase tracking-wider hover:bg-[#1c3c24] hover:text-white transition-all text-center hover:shadow-lg hover:-translate-y-1 duration-300 bg-transparent inline-block"
            >
              Contact Our Experts
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
