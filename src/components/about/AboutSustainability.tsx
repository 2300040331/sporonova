"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Recycle, Leaf, Droplets, TreePine, Sprout } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pillars = [
  {
    title: "Reduced Waste",
    description: "Our liquid spawn technology minimizes substrate waste by up to 40%, creating a more efficient cultivation cycle.",
    icon: Recycle,
  },
  {
    title: "Eco-Friendly Cultivation",
    description: "Zero chemical additives in our spawn production process, ensuring organic integrity from lab to farm.",
    icon: Leaf,
  },
  {
    title: "Low Resource Usage",
    description: "Optimized production protocols reduce water and energy consumption without compromising quality.",
    icon: Droplets,
  },
  {
    title: "Renewable Materials",
    description: "Sustainable substrate sourcing from agricultural byproducts, turning waste into value.",
    icon: TreePine,
  },
  {
    title: "Future-Ready Agriculture",
    description: "Investing in research to develop climate-resilient mushroom strains for changing environments.",
    icon: Sprout,
  },
];

export default function AboutSustainability() {
  const sectionRef = useRef<HTMLElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !shapesRef.current) return;

    const shapes = shapesRef.current.children;

    const ctx = gsap.context(() => {
      Array.from(shapes).forEach((shape, index) => {
        gsap.to(shape, {
          y: -150 * (index + 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#f9faf7] overflow-hidden">
      {/* Background Shapes for Parallax */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#7baa6b] mix-blend-multiply blur-[100px]" />
        <div className="absolute top-[40%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-[#4e8c4a] mix-blend-multiply blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#7baa6b] mix-blend-multiply blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#4e8c4a] font-extrabold mb-4 block">
            Sustainability
          </span>
          <h2 className="font-display font-black tracking-tight text-[#1c3c24] text-4xl lg:text-5xl mb-6">
            Growing Responsibly, Naturally
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our commitment to sustainable agriculture drives every decision we make.
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:gap-24">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const isEven = index % 2 === 1; // 0-indexed, so odd index means even item visually

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-8 lg:gap-16`}
              >
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full lg:w-1/2"
                >
                  <div className="bg-white/75 backdrop-blur-[14px] border border-[#e6e4dc]/40 rounded-3xl p-8 lg:p-12 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-[#f9faf7] border border-[#e6e4dc] flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-[#4e8c4a]" />
                    </div>
                    <h3 className="font-display font-black tracking-tight text-[#1c3c24] text-2xl mb-4">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="w-full lg:w-1/2 flex justify-center items-center"
                >
                  {/* Abstract Illustration Placeholder */}
                  <div className="relative w-full max-w-sm aspect-square">
                    <div className="absolute inset-0 bg-white border border-[#e6e4dc] rounded-full shadow-sm flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-[#f9faf7] rounded-full scale-90 border border-[#e6e4dc]/40 flex items-center justify-center opacity-50">
                        <Icon className="w-24 h-24 text-[#7baa6b] opacity-20" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
