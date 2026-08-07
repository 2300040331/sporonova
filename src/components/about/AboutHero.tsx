"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";
import { useCMS } from "@/lib/cms-context";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { data } = useCMS();
  const about = data?.about;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal animation
      gsap.fromTo(
        ".hero-element",
        { y: 40, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[85vh] lg:min-h-screen w-full flex items-center overflow-hidden bg-[#1c3c24]"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={about?.whoWeAreImage || "/about_mushrooms.jpg"} 
          alt="SporoNova Cleanroom Laboratory"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c3c24] via-[#1c3c24]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f9faf7] via-transparent to-[#1c3c24]/60" />
      </div>

      <div className="container relative z-20 mx-auto px-6 md:px-12 pt-32 pb-24 h-full flex flex-col justify-center">
        <div className="max-w-4xl space-y-8">
          <div className="hero-element inline-block">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7baa6b] font-extrabold bg-[#1c3c24]/80 px-4 py-2 rounded-full border border-[#4e8c4a]/30 backdrop-blur-md">
              {about?.heroSubtitle || "ABOUT SPORONOVA"}
            </span>
          </div>
          
          <h1 className="hero-element font-display font-black tracking-tight text-[#f9faf7] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
            {about?.heroTitle || "Science and Commitment Behind Every Kernel"}
          </h1>
          
          <p className="hero-element text-[#e6e4dc] text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl font-sans">
            {about?.whoWeAreParagraph1 || "For over a decade, SporoNova has partnered with commercial cultivators, horticulture boards, and rural cooperatives to modernize mycology cultivation."}
          </p>
          
          <div className="hero-element flex flex-wrap items-center gap-4 pt-4">
            <a 
              href="#who-we-are" 
              className="rounded-full bg-[#4e8c4a] text-[#f9faf7] px-8 py-4 text-[10px] font-bold uppercase tracking-wider hover:bg-[#7baa6b] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center gap-2 group"
            >
              Explore Our Story
              <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#our-science" 
              className="rounded-full bg-transparent border border-[#e6e4dc]/60 text-[#f9faf7] px-8 py-4 text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
            >
              Our Technology
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
