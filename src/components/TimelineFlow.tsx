"use client";

import React, { useState } from "react";
import { ArrowRight, Settings, Thermometer, ShieldAlert, Sparkles, Clock, X, ChevronRight } from "lucide-react";

interface TimelineStep {
  num: string;
  title: string;
  subtitle: string;
  details: {
    description: string;
    equipment: string[];
    temperature?: string;
    humidity?: string;
    time: string;
    precautions: string;
    tips: string;
  };
  svgIllustration: React.ReactNode;
}

const STEPS: TimelineStep[] = [
  {
    num: "01",
    title: "Spore",
    subtitle: "Life begins with a tiny spore",
    svgIllustration: (
      <svg className="w-12 h-12 text-bio-gold" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="16" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="6" fill="currentColor" />
        <circle cx="30" cy="35" r="2.5" fill="currentColor" fillOpacity="0.7" />
        <circle cx="70" cy="65" r="3" fill="currentColor" fillOpacity="0.7" />
        <circle cx="32" cy="68" r="2" fill="currentColor" fillOpacity="0.7" />
        <circle cx="68" cy="32" r="3.5" fill="currentColor" fillOpacity="0.7" />
      </svg>
    ),
    details: {
      description: "Isolating high-viability spores under ultra-sterile conditions. Spore prints are transferred to agar media slants to germinate and develop pure mother cultures.",
      equipment: ["Laminar Airflow Hood", "Inoculation Loop", "Petri Dishes", "Alcohol Burner"],
      temperature: "24°C - 26°C",
      time: "5 - 7 Days",
      precautions: "Sterilize loop to red-hot before touching spores. Perform all steps inside Class 100 sterile laminar airflow.",
      tips: "Utilize multi-spore inoculation first, then select sectors with dense, thick rhizomorphic mycelial growth.",
    },
  },
  {
    num: "02",
    title: "Mycelium Growth",
    subtitle: "The mycelium begins to grow",
    svgIllustration: (
      <svg className="w-12 h-12 text-forest-green" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 85 V45 M50 65 L32 50 M50 55 L70 38 M32 50 L20 42 M70 38 L82 28 M32 50 L40 32 M70 38 L62 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="45" r="3" fill="currentColor" />
        <circle cx="32" cy="50" r="2" fill="currentColor" />
        <circle cx="70" cy="38" r="2" fill="currentColor" />
      </svg>
    ),
    details: {
      description: "Germinated spores form a network of white thread-like hyphae. We sub-culture the rhizomorphic sectors to potato dextrose agar (PDA) plates to obtain pure, uniform genetics.",
      equipment: ["Incubator Cabinet", "Scalpel", "Parafilm", "PDA Agar Media"],
      temperature: "25°C",
      humidity: "60% - 65%",
      time: "8 - 12 Days",
      precautions: "Discard any plates showing green, black, or yellow molds immediately. Do not open contaminated plates.",
      tips: "Rhizomorphic mycelium (rope-like threads) grows faster and yields better results than cottony sectoring.",
    },
  },
  {
    num: "03",
    title: "Liquid Culture",
    subtitle: "Pure culture in liquid media",
    svgIllustration: (
      <svg className="w-12 h-12 text-bio-teal" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M38 25 H62 M42 25 V75 C42 80 58 80 58 75 V25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="62" r="3" fill="currentColor" fillOpacity="0.8" />
        <circle cx="47" cy="52" r="2" fill="currentColor" fillOpacity="0.8" />
        <circle cx="53" cy="45" r="2" fill="currentColor" fillOpacity="0.8" />
        <path d="M43 68 C47 70 53 70 57 68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    details: {
      description: "Transferring mycelial agar blocks into a sterilized liquid nutrient broth (dextrose, yeast extract, peptone). The bioreactor/shaker maintains constant oxygenation.",
      equipment: ["Orbital Shaker Table", "Bioreactor Vessel", "Liquid Broth Flasks", "Magnetic Stirrer"],
      temperature: "25°C",
      time: "5 - 7 Days",
      precautions: "Autoclave the liquid media at 121°C for 25 minutes. Excessive heat caramelizes sugars, hindering growth.",
      tips: "Incorporate magnetic stir bars and spin daily to break mycelial clumps into fine micro-colonies for faster colonization.",
    },
  },
  {
    num: "04",
    title: "Inoculation",
    subtitle: "Inoculating the prepared substrate",
    svgIllustration: (
      <svg className="w-12 h-12 text-bio-gold" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 75 H65 V85 H35 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
        <path d="M50 30 V65 L48 70 H52 L50 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="25" r="5" fill="currentColor" />
        <path d="M44 70 L38 65 M56 70 L62 65" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    details: {
      description: "Injecting active liquid culture or grain master spawn into sterile, hydrated cereal grains (wheat, millet) or sawdust substrate under HEPA filtration.",
      equipment: ["Automatic Syringe Injector", "Laminar Flow Bench", "Sterile Ports"],
      temperature: "22°C - 24°C",
      time: "24 Hours",
      precautions: "Sterilize injection ports with 70% isopropyl alcohol. Flame-sanitize syringe needle between containers.",
      tips: "Perform inoculation in a cool, dry room with zero draft wind to minimize ambient spore floating.",
    },
  },
  {
    num: "05",
    title: "Colonization",
    subtitle: "Mycelium spreads through the substrate",
    svgIllustration: (
      <svg className="w-12 h-12 text-forest-green" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="30" width="40" height="40" rx="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
        <path d="M38 38 L42 42 M62 38 L58 42 M38 62 L42 58 M62 62 L58 58 M50 34 V42 M50 66 V58 M34 50 H42 M66 50 H58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    details: {
      description: "Mycelium actively digests starches/hemicellulose in grains, coating each grain with a white mycelial mantle, binding the substrate into a solid matrix.",
      equipment: ["Climate-Controlled Incubation Room", "Shelving Units"],
      temperature: "24°C",
      humidity: "65% - 70%",
      time: "10 - 14 Days",
      precautions: "Keep CO2 levels high (above 2000 ppm) to encourage rapid vegetative growth. Shake jars at 30% colonization.",
      tips: "Shaking the container at 30% colonization redistributes points of inoculation, accelerating completion by 4-5 days.",
    },
  },
  {
    num: "06",
    title: "Fruiting",
    subtitle: "Primordia form and mushrooms emerge",
    svgIllustration: (
      <svg className="w-12 h-12 text-forest-green" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 80 V50 C50 40 40 40 40 32 C40 24 60 24 60 32 C60 40 50 40 50 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M35 32 C35 15 65 15 65 32 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    details: {
      description: "Exposing colonized spawn blocks to fruiting conditions. We shock the mycelium by introducing fresh air, lowering temperature, raising humidity, and providing light.",
      equipment: ["Automated Grow Chamber", "Foggers", "Exhaust Fans", "LED Grow Lights"],
      temperature: "16°C - 18°C",
      humidity: "85% - 95%",
      time: "3 - 5 Days",
      precautions: "High humidity is vital, but avoid standing water droplets directly on emerging mushroom pins.",
      tips: "Provide 12 hours of cool white LED light (6500K) to guide cap direction and accelerate pinning.",
    },
  },
  {
    num: "07",
    title: "Harvest",
    subtitle: "Healthy harvest for a healthy world",
    svgIllustration: (
      <svg className="w-12 h-12 text-forest-green" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 30 H68 C68 30 65 72 50 72 C35 72 32 30 32 30 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2.5" />
        <path d="M50 30 V12 C50 12 40 8 32 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="44" cy="40" r="4.5" fill="currentColor" />
        <circle cx="56" cy="42" r="3.5" fill="currentColor" />
        <circle cx="50" cy="50" r="4" fill="currentColor" />
      </svg>
    ),
    details: {
      description: "Harvesting mature mushrooms when the cap margins just begin to unroll, before spore dumping occurs. Gills are exposed but flat.",
      equipment: ["Harvesting Knives", "Sterile Trays", "Dehydrator (Optional)"],
      temperature: "4°C (Immediate chilling)",
      humidity: "90%",
      time: "1 - 2 Days",
      precautions: "Twist and pull at the base gently to avoid ripping the underlying mycelial bed for subsequent flushes.",
      tips: "Harvest in clusters rather than single stalks to preserve storage freshness.",
    },
  },
  {
    num: "08",
    title: "Packaging",
    subtitle: "Hygienic packing for quality delivery",
    svgIllustration: (
      <svg className="w-12 h-12 text-bio-teal" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="32" y="24" width="36" height="52" rx="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
        <line x1="38" y1="36" x2="62" y2="36" stroke="currentColor" strokeWidth="2" />
        <line x1="38" y1="46" x2="52" y2="46" stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="62" r="3.5" fill="currentColor" />
      </svg>
    ),
    details: {
      description: "Packing fresh mushrooms or spawn blocks in breathable, biodegradable micro-perforated bags to allow carbon dioxide exchange while blocking contaminants.",
      equipment: ["Micro-Perforated Bags", "Heat Sealing Machine", "QR Labeling Printer"],
      temperature: "2°C - 4°C",
      time: "3 Hours",
      precautions: "Ensure produce is completely dry before sealing to prevent bacterial soft rot in transit.",
      tips: "Affix batch QR codes mapping autoclave heat logs, inoculation date, and genomic purity certificate.",
    },
  },
  {
    num: "09",
    title: "Community Impact",
    subtitle: "Empowering communities and regenerating nature",
    svgIllustration: (
      <svg className="w-12 h-12 text-forest-green" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 65 C40 65 30 75 30 85 H70 C70 75 60 65 50 65 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="48" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M38 35 C42 42 58 42 62 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    details: {
      description: "Providing high-efficiency spawn and modern training to rural farmers, yielding sustainable household income and nutritional autonomy.",
      equipment: ["Mobile Training Kits", "Farmer Instruction Manuals"],
      time: "Ongoing",
      precautions: "Encourage simple, clean inoculation boxes (gloveboxes) for small-scale rural farms.",
      tips: "Create local cooperations to pool transport logistics and negotiate fair export value.",
    },
  },
  {
    num: "10",
    title: "Global Sustainability",
    subtitle: "Sustainable solutions for our planet",
    svgIllustration: (
      <svg className="w-12 h-12 text-bio-teal" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2.5" />
        <path d="M36 42 C40 38 46 44 44 52 C42 60 52 64 56 58 C60 52 66 54 62 66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="currentColor" fillOpacity="0.15" />
        <path d="M68 38 C64 34 54 36 50 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    details: {
      description: "Recycling spent mushroom substrate (SMS) into high-nitrogen soil compost or animal feed, creating a perfect circular agricultural loop.",
      equipment: ["Composting Shredders", "Bio-Fertilizer Mixers"],
      time: "Continuous",
      precautions: "Compost spent substrate fully to kill any lingering biological pathogens before field application.",
      tips: "Combine SMS with biochar to lock carbon into soil layers and create highly porous bio-fertilizers.",
    },
  },
];

export default function TimelineFlow() {
  const [selectedStep, setSelectedStep] = useState<TimelineStep | null>(null);

  return (
    <div className="w-full bg-[#f5f2eb] py-16 px-6 rounded-3xl border border-[#e5e1d5] shadow-sm">
      <div className="text-center mb-12">
        <h2 className="text-[#1c1917] font-display text-3xl md:text-4xl font-extrabold tracking-tight">
          From A Spore To A Better World
        </h2>
        <p className="text-[#686256] text-xs mt-2 font-medium tracking-wide">
          A time-lapse journey of innovation, cultivation and impact.
        </p>
      </div>

      {/* Horizontal scrolling row matching layout in screenshot */}
      <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-forest-green/20 scrollbar-track-transparent">
        <div className="flex items-center justify-between min-w-max px-4 gap-2">
          {STEPS.map((step, idx) => (
            <React.Fragment key={step.num}>
              
              {/* Timeline step item */}
              <div
                onClick={() => setSelectedStep(step)}
                className="flex flex-col items-center w-[160px] text-center cursor-pointer group"
              >
                {/* White circular pedestal (base) with drop shadow */}
                <div className="w-24 h-24 rounded-full bg-white shadow-md border border-[#e8e4d8] flex items-center justify-center relative mb-4 group-hover:border-bio-green transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg">
                  {step.svgIllustration}
                  
                  {/* Subtle hover pulse */}
                  <div className="absolute inset-0 rounded-full bg-bio-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Step number and Title in Green */}
                <div className="text-xs font-mono font-bold text-bio-green mb-1 flex items-center justify-center gap-1">
                  <span>{step.num}</span>
                  <span className="font-display font-black text-gray-900 group-hover:text-bio-green transition-colors">{step.title}</span>
                </div>

                {/* Subtitle description */}
                <p className="text-[10px] text-[#6b665c] leading-normal font-medium max-w-[130px] line-clamp-2">
                  {step.subtitle}
                </p>
              </div>

              {/* Separator arrow (chevron right) */}
              {idx < STEPS.length - 1 && (
                <div className="text-bio-green px-1 select-none">
                  <ChevronRight className="w-5 h-5 text-bio-green/60" />
                </div>
              )}

            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <span className="text-[10px] text-[#8e8778] font-mono uppercase tracking-widest">
          Click any pedestal node to view technical process parameters
        </span>
      </div>

      {/* Modal Popup with light theme styles */}
      {selectedStep && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-[#fcfbfa] border border-[#e5e1d5] w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative">
            
            {/* Header banner */}
            <div className="bg-[#f5f2eb] p-6 border-b border-[#e5e1d5] flex justify-between items-start">
              <div>
                <span className="text-xs text-bio-green font-mono uppercase tracking-wider block mb-1">
                  STAGE {selectedStep.num} &bull; PROCESS MONITOR
                </span>
                <h3 className="text-gray-900 font-display text-xl font-extrabold tracking-wide">
                  {selectedStep.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStep(null)}
                className="w-8 h-8 rounded-xl bg-white border border-[#e5e1d5] flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              
              <div>
                <span className="text-[9px] text-[#8e8778] font-mono uppercase tracking-widest block mb-1">Process Outline</span>
                <p className="text-gray-700 text-xs leading-relaxed">{selectedStep.details.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#e5e1d5]">
                
                {/* Parameters */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#f5f2eb] border border-[#e5e1d5] flex items-center justify-center text-bio-green shrink-0">
                      <Thermometer className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[8px] text-gray-500 font-mono block">TEMP RANGE</span>
                      <span className="text-gray-950 text-xs font-bold font-mono">
                        {selectedStep.details.temperature || "Ambient"}
                      </span>
                    </div>
                  </div>

                  {selectedStep.details.humidity && (
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#f5f2eb] border border-[#e5e1d5] flex items-center justify-center text-bio-green shrink-0">
                        <Settings className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[8px] text-gray-500 font-mono block">HUMIDITY LIMIT</span>
                        <span className="text-gray-950 text-xs font-bold font-mono">{selectedStep.details.humidity}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#f5f2eb] border border-[#e5e1d5] flex items-center justify-center text-bio-green shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[8px] text-gray-500 font-mono block">DURATION</span>
                      <span className="text-gray-950 text-xs font-bold font-mono">{selectedStep.details.time}</span>
                    </div>
                  </div>
                </div>

                {/* Equipment List */}
                <div className="bg-[#f5f2eb] p-3.5 rounded-xl border border-[#e5e1d5] flex flex-col justify-center">
                  <span className="text-[8px] text-bio-green font-mono uppercase tracking-widest block mb-1.5">Equipment</span>
                  <ul className="space-y-1 text-xs text-gray-700">
                    {selectedStep.details.equipment.map((eq, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-bio-green" />
                        {eq}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Warnings and Tips */}
              <div className="space-y-3 pt-3 border-t border-[#e5e1d5]">
                <div className="flex gap-2.5 bg-red-50 border border-red-200 p-3.5 rounded-xl">
                  <ShieldAlert className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[8px] text-red-600 font-bold uppercase tracking-wider block">Bio-Safety Precautions</span>
                    <p className="text-red-800 text-[11px] mt-0.5 leading-relaxed">{selectedStep.details.precautions}</p>
                  </div>
                </div>

                <div className="flex gap-2.5 bg-green-50 border border-green-200 p-3.5 rounded-xl">
                  <Sparkles className="w-4.5 h-4.5 text-bio-green shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[8px] text-bio-green font-bold uppercase tracking-wider block">Process Note</span>
                    <p className="text-green-800 text-[11px] mt-0.5 leading-relaxed">{selectedStep.details.tips}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="bg-[#f5f2eb] p-3 border-t border-[#e5e1d5] text-center text-[9px] text-[#8e8778] font-mono">
              SporoNova Biotechnology Pipeline Automation Standards
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
