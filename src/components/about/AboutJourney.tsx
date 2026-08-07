"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCMS } from "@/lib/cms-context";

const DEFAULT_MILESTONES = [
  { step: 1, title: "Research Begins", description: "Started with a vision to modernize mushroom cultivation through scientific methods" },
  { step: 2, title: "Laboratory Development", description: "Established GMP-compliant cleanroom facilities with advanced biological protocols" },
  { step: 3, title: "Advanced Liquid Spawn Technology", description: "Pioneered liquid spawn broth technology for faster colonization" },
  { step: 4, title: "Commercial Production", description: "Scaled operations to serve commercial farmers across multiple states" },
  { step: 5, title: "Government Collaborations", description: "Partnered with JICA, NHB, and state horticulture departments" },
  { step: 6, title: "National Expansion", description: "Expanded distribution network to 200+ farmers across India" },
  { step: 7, title: "Future Global Growth", description: "Building next-generation spawn solutions with AI-powered quality control" },
];

export default function AboutJourney() {
  const { data } = useCMS();
  const rawSteps = data?.about?.journeySteps || [];
  const activeMilestones = rawSteps.length > 0
    ? rawSteps.map((s, idx) => ({ step: s.stepNumber || idx + 1, title: s.title, description: s.description }))
    : DEFAULT_MILESTONES;

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const isEven = index % 2 === 0;
        const xOffset = window.innerWidth >= 768 ? (isEven ? -60 : 60) : 60;

        gsap.fromTo(
          card,
          { opacity: 0, x: xOffset },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-[#f9faf7] relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#4e8c4a] font-extrabold mb-4 block">
            Our Story
          </span>
          <h2 className="font-display font-black tracking-tight text-[#1c3c24] text-4xl md:text-5xl">
            The SporoNova Journey
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Glowing center line */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#4e8c4a]/20 via-[#4e8c4a] to-[#4e8c4a]/20 transform md:-translate-x-1/2 shadow-[0_0_15px_rgba(78,140,74,0.5)]"></div>

          <div className="space-y-12 relative">
            {activeMilestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className={`flex flex-col md:flex-row items-start md:items-center relative w-full ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[30px] md:left-1/2 top-6 md:top-1/2 w-4 h-4 rounded-full bg-[#4e8c4a] border-4 border-white transform -translate-x-1/2 md:-translate-y-1/2 z-10 animate-timeline-dot shadow-[0_0_10px_rgba(78,140,74,0.8)]"></div>

                  {/* Card Container */}
                  <div
                    className={`w-full md:w-[45%] pl-20 md:pl-0 ${
                      isEven ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="about-glass-card bg-white/75 backdrop-blur-[14px] border border-[#e6e4dc]/40 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e6e4dc]/50 text-[#1c3c24] font-bold text-sm">
                          {milestone.step}
                        </span>
                        <h3 className="font-display font-black text-xl text-[#1c3c24] tracking-tight">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed pl-11">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
