"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  Leaf, 
  TrendingUp, 
  Ban, 
  ShieldCheck, 
  Timer, 
  Users, 
  Factory 
} from "lucide-react";

const bentoItems = [
  {
    title: "12+ Years Experience",
    description: "Decades of combined expertise in professional mycological research and commercial spawn production methodologies.",
    icon: Clock,
    span: "col-span-1 md:col-span-2 lg:col-span-2"
  },
  {
    title: "14 Mushroom Varieties",
    description: "Diverse library of commercial strains optimized for different climates.",
    icon: Leaf,
    span: "col-span-1"
  },
  {
    title: "Higher Yield Performance",
    description: "Genetically verified strains proven to deliver maximum biological efficiency.",
    icon: TrendingUp,
    span: "col-span-1"
  },
  {
    title: "Chemical-Free Technology",
    description: "100% natural substrates and sterile practices without harmful additives.",
    icon: Ban,
    span: "col-span-1"
  },
  {
    title: "Lower Contamination Risk",
    description: "Rigorous quality control ensures clean, vigorous vegetative mycelium.",
    icon: ShieldCheck,
    span: "col-span-1"
  },
  {
    title: "Long Shelf Life",
    description: "Specially formulated media designed for extended viability during cold storage and transit.",
    icon: Timer,
    span: "col-span-1 md:col-span-2 lg:col-span-2"
  },
  {
    title: "Expert Technical Team",
    description: "Dedicated mycologists and technicians ensuring every batch meets the highest industry standards.",
    icon: Users,
    span: "col-span-1 md:col-span-2 lg:col-span-2"
  },
  {
    title: "Scalable Commercial Production",
    description: "State-of-the-art facilities capable of supporting farms of any size, from local growers to enterprise agriculture.",
    icon: Factory,
    span: "col-span-1 md:col-span-2 lg:col-span-2"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export default function AboutWhyChoose() {
  return (
    <section className="bg-[#f9faf7] py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#4e8c4a] font-extrabold mb-4 block">
            Why SporoNova
          </span>
          <h2 className="font-display font-black tracking-tight text-[#1c3c24] text-4xl md:text-5xl lg:text-6xl mb-6">
            Built for Agricultural Excellence
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We partner with progressive farmers to deliver premium genetics and reliable spawn for consistent, high-yield harvests.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {bentoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`about-glass-card about-glow-border bg-white/75 backdrop-blur-[14px] border border-[#e6e4dc]/40 rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300 ${item.span}`}
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#e6e4dc]/30 flex items-center justify-center text-[#4e8c4a] mb-6">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-display font-black tracking-tight text-[#1c3c24] text-2xl mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
