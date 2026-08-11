"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCMS } from "@/lib/cms-context";

const images = [
  { src: "/about_header.jpg", caption: "Our Research Facility" },
  { src: "/about_mushrooms.jpg", caption: "Premium Mushroom Cultivation" },
  { src: "/about_building.jpg", caption: "SporoNova Headquarters" },
  { src: "/hero_mushrooms.jpg", caption: "Natural Growing Process" },
  { src: "/products_header.jpg", caption: "Spawn Product Line" },
  { src: "/training_header.jpg", caption: "Farmer Training Programs" },
];

export default function AboutGallery() {
  const { data } = useCMS();
  const rawGallery = data?.about?.aboutGallery || [];
  const activeImages = rawGallery.length > 0
    ? rawGallery.map((g: any) => ({ src: g.url, caption: g.title }))
    : images;

  return (
    <section className="py-24 px-6 md:px-12 bg-[#f9faf7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#4e8c4a] font-extrabold block mb-4">
            Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-[#1c3c24]">
            Inside Our World
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {}
          }}
          className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {activeImages.map((img: any, idx: number) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="relative rounded-2xl overflow-hidden border border-[#e6e4dc] group cursor-pointer mb-4 break-inside-avoid"
            >
              <div className="aspect-auto overflow-hidden">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                <p className="text-white font-display font-bold text-center text-lg md:text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
