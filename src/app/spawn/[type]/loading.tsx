import React from "react";
import Navbar from "@/components/Navbar";

export default function SpawnLoading() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#f9faf7] pt-24 min-h-screen">
        {/* HERO SKELETON */}
        <section className="relative py-20 px-6 border-b border-[#e6e4dc] bg-white">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            {/* Text skeleton */}
            <div className="flex-1 space-y-6 w-full">
              {/* Back link skeleton */}
              <div className="h-3 w-40 bg-[#f2f7f2] rounded-full animate-pulse" />

              {/* Category label */}
              <div className="space-y-3">
                <div className="h-2.5 w-32 bg-[#f2f7f2] rounded-full animate-pulse" />
                {/* Title */}
                <div className="h-10 w-64 bg-[#e6e4dc]/50 rounded-2xl animate-pulse" />
              </div>

              {/* Description lines */}
              <div className="space-y-2.5 max-w-xl">
                <div className="h-3 w-full bg-[#f2f7f2] rounded-full animate-pulse" />
                <div className="h-3 w-5/6 bg-[#f2f7f2] rounded-full animate-pulse" />
                <div className="h-3 w-3/4 bg-[#f2f7f2] rounded-full animate-pulse" />
              </div>

              {/* Specs cards skeleton */}
              <div className="grid grid-cols-2 gap-4 border-t border-[#e6e4dc]/80 pt-6">
                <div className="bg-[#f9faf7] p-4 rounded-2xl border border-[#e6e4dc] h-16 animate-pulse" />
                <div className="bg-[#f9faf7] p-4 rounded-2xl border border-[#e6e4dc] h-16 animate-pulse" />
              </div>
            </div>

            {/* 3D Model skeleton */}
            <div className="w-full lg:w-[450px] aspect-square bg-[#f9faf7] border border-[#e6e4dc] rounded-[2rem] overflow-hidden relative flex items-center justify-center shadow-sm">
              {/* Pulsating placeholder */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[#e6e4dc]/40 animate-pulse" />
                <div className="h-2.5 w-32 bg-[#e6e4dc]/30 rounded-full animate-pulse" />
                <div className="h-2 w-24 bg-[#e6e4dc]/20 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT SKELETON */}
        <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left column skeleton */}
          <div className="lg:col-span-8 space-y-12">
            {/* Section block */}
            <div className="space-y-4">
              <div className="h-7 w-48 bg-[#e6e4dc]/50 rounded-xl animate-pulse" />
              <div className="space-y-2.5">
                <div className="h-3 w-full bg-[#f2f7f2] rounded-full animate-pulse" />
                <div className="h-3 w-5/6 bg-[#f2f7f2] rounded-full animate-pulse" />
                <div className="h-3 w-4/5 bg-[#f2f7f2] rounded-full animate-pulse" />
              </div>
            </div>

            {/* Section block */}
            <div className="space-y-4">
              <div className="h-7 w-56 bg-[#e6e4dc]/50 rounded-xl animate-pulse" />
              <div className="space-y-2.5">
                <div className="h-3 w-full bg-[#f2f7f2] rounded-full animate-pulse" />
                <div className="h-3 w-3/4 bg-[#f2f7f2] rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right sidebar skeleton */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-[#e6e4dc] p-8 rounded-[2rem] h-48 animate-pulse" />
            <div className="bg-white border border-[#e6e4dc] p-8 rounded-[2rem] h-40 animate-pulse" />
          </div>
        </section>
      </main>
    </>
  );
}
