"use client";

import React from "react";
import { motion } from "framer-motion";
import { Microscope, Shield, Leaf, Sprout } from "lucide-react";
import { useCMS } from "@/lib/cms-context";

const highlights = [
  {
    icon: Microscope,
    title: "Scientific Research",
  },
  {
    icon: Shield,
    title: "Certified Cleanroom",
  },
  {
    icon: Leaf,
    title: "Pure Mycelium",
  },
  {
    icon: Sprout,
    title: "Sustainable Innovation",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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

export default function AboutWhoWeAre() {
  const { data } = useCMS();
  const about = data?.about;

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column - Image */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="rounded-3xl overflow-hidden border border-[#e6e4dc]/60 shadow-sm relative aspect-[4/5]"
            >
              <img
                src={about?.whoWeAreImage || "/about_mushrooms.jpg"}
                alt="SporoNova Facility"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#4e8c4a] font-extrabold mb-4 block">
                {about?.heroSubtitle || "ABOUT SPORONOVA"}
              </span>
              <h2 className="font-display font-black tracking-tight text-[#1c3c24] text-4xl md:text-5xl mb-6">
                {about?.whoWeAreTitle || "Science and Commitment Behind Every Kernel"}
              </h2>
              
              <div className="space-y-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {about?.whoWeAreParagraph1 || "For over a decade, SporoNova has partnered with commercial cultivators, horticulture boards, and rural cooperatives to modernize mycology cultivation. We ensure pure mycelial expansion by sourcing tested substrate grains, balancing media pH, and verifying strain genetics under strict laboratory clearance."}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {about?.whoWeAreParagraph2 || "SporoNova operates certified agricultural inoculation cleanrooms, utilizing advanced biological protocols to preserve genetic lines. We focus on providing high-yield, disease-resistant spawn formulas that guarantee crops flush predictably."}
                </p>
              </div>
            </div>

            {/* Highlights Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white border border-[#e6e4dc] rounded-2xl p-4 flex items-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-[#f9faf7] flex items-center justify-center border border-[#e6e4dc]/60">
                    <item.icon className="w-5 h-5 text-[#4e8c4a]" />
                  </div>
                  <span className="font-display font-bold text-[#1c3c24] text-sm tracking-tight">
                    {item.title}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
