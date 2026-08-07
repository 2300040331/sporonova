"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

export default function AboutVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { filter: "blur(10px)", opacity: 0.3, y: 40 },
          {
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "center center",
              scrub: 1,
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 bg-[#1c3c24] overflow-hidden flex items-center justify-center min-h-[70vh]"
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1c3c24] via-[#2a5a36] to-[#1c3c24] opacity-80 mix-blend-overlay"></div>
      
      {/* Light rays */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[100vw] h-[20vw] bg-gradient-to-r from-transparent via-[#7baa6b] to-transparent rotate-45 blur-3xl animate-pulse"></div>
        <div className="w-[100vw] h-[20vw] bg-gradient-to-r from-transparent via-[#4e8c4a] to-transparent -rotate-45 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating spores */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#7baa6b]/40 blur-[2px] animate-pulse"
          style={{
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
            transform: `translateY(${Math.random() * 100 - 50}px)`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto text-center" ref={textRef}>
        <Quote className="w-16 h-16 text-[#7baa6b]/30 mx-auto mb-8 rotate-180" />
        <p className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white text-center leading-relaxed">
          "Our mission is to revolutionize mushroom cultivation through scientific innovation, empowering farmers with sustainable technologies that create healthier harvests and stronger rural economies."
        </p>
        <Quote className="w-16 h-16 text-[#7baa6b]/30 mx-auto mt-8" />
      </div>
    </section>
  );
}
