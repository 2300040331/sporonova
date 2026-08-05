"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutMarquee from "@/components/about/AboutMarquee";
import AboutJourney from "@/components/about/AboutJourney";
import AboutWhoWeAre from "@/components/about/AboutWhoWeAre";
import AboutScience from "@/components/about/AboutScience";
import AboutWhyChoose from "@/components/about/AboutWhyChoose";
import AboutProcess from "@/components/about/AboutProcess";
import AboutQuality from "@/components/about/AboutQuality";
import AboutPartnerships from "@/components/about/AboutPartnerships";
import AboutTechnology from "@/components/about/AboutTechnology";
import AboutGallery from "@/components/about/AboutGallery";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPageClient() {
  const mainRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP ScrollTrigger refresh on content load
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />

      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Mouse Spotlight Effect (desktop only) */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(78, 140, 74, 0.03), transparent 40%)`,
          transition: "background 0.15s ease",
        }}
      />

      <main ref={mainRef} className="flex-1 relative z-[2]">
        {/* Section 1 — Immersive Hero */}
        <AboutHero />

        {/* Section 2 — Scrolling Marquee */}
        <AboutMarquee />

        {/* Section 3 — Our Journey Timeline */}
        <AboutJourney />

        {/* Section 4 — Who We Are */}
        <AboutWhoWeAre />

        {/* Section 5 — Our Science (DNA Layout) */}
        <AboutScience />

        {/* Section 6 — Why SporoNova (Bento Grid) */}
        <AboutWhyChoose />

        {/* Section 7 — Our Process */}
        <AboutProcess />

        {/* Section 8 — Quality Assurance */}
        <AboutQuality />

        {/* Section 9 — Partnerships */}
        <AboutPartnerships />

        {/* Section 10 — Technology Showcase */}
        <AboutTechnology />

        {/* Section 11 — Photo Gallery */}
        <AboutGallery />
      </main>

      <Footer />
    </>
  );
}
