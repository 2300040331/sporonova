"use client";

import React, { useState } from "react";
import { User, Users, Landmark, Search, Award } from "lucide-react";

interface RoleJourney {
  id: string;
  roleName: string;
  subtitle: string;
  icon: React.ReactNode;
  recommendedSpawn: string[];
  checklist: string[];
  guidance: string;
  certification: string;
}

const JOURNEYS: RoleJourney[] = [
  {
    id: "beginner",
    roleName: "Beginner Grower",
    subtitle: "Ideal for starting small in indoor grow tents",
    icon: <User className="w-5 h-5" />,
    recommendedSpawn: ["Grain Spawn (Oyster)", "Plug Spawn (Wood logs)"],
    checklist: [
      "Set up clean indoor space (room or small grow tent)",
      "Source pasteurized wheat straw or sawdust pellets",
      "Procure plastic cultivation bags with filter patches",
      "Maintain ambient temperature between 18°C and 24°C",
      "Spray water fine mist 3 times daily to hold 85% humidity",
    ],
    guidance: "Focus on simple, high-resilience strains like Pleurotus ostreatus (Grey Oyster). Avoid button mushrooms initially, as they require complex compost formulations and climate controls.",
    certification: "SporoNova Foundation Certificate in Basic Mycology",
  },
  {
    id: "intermediate",
    roleName: "Intermediate Cultivator",
    subtitle: "Expanding to semi-automated seasonal sheds",
    icon: <Users className="w-5 h-5" />,
    recommendedSpawn: ["Commercial Grain Spawn (Oyster/Milky)", "Mother Culture (strain trial)"],
    checklist: [
      "Construct outdoor thatched grow sheds or insulated rooms",
      "Build a simple substrate steaming chamber (drum sterilizer)",
      "Set up ultrasonic humidifiers with cycle timers",
      "Source bulk agricultural waste (cotton waste, bagasse, paddy straw)",
      "Implement hygiene protocols (hand wash, clean clothing, dust protection)",
    ],
    guidance: "Incorporate steam pasteurization rather than hot water bath. This reduces contamination by 60% and increases yield per bag. Start breeding mother culture slants for local scale-up.",
    certification: "State Department of Horticulture Spawn Handling Endorsement",
  },
  {
    id: "commercial",
    roleName: "Commercial Farmer",
    subtitle: "Industrial year-round climate houses and packaging",
    icon: <Award className="w-5 h-5" />,
    recommendedSpawn: ["Liquid Spawn Broth (Direct Inoculation)", "Master Spawn G1 jars"],
    checklist: [
      "Deploy fully insulated poly-urethane panels grow rooms",
      "Install automated HVAC heating, cooling, and carbon dioxide purging systems",
      "Set up a walk-in cold chain packaging room (2-4°C)",
      "Establish automated high-pressure steam autoclaves",
      "Formulate custom substrate additives (wheat bran, gypsum, calcium carbonate)",
    ],
    guidance: "Maximize efficiency by switching to liquid spawn broth inoculation. Liquid spawn reduces colonization time by 4 days, dropping operating costs and maximizing room turnover cycles.",
    certification: "ISO 22000 Food Safety & GMP Biotechnology Compliance",
  },
  {
    id: "researcher",
    roleName: "Biotech Researcher",
    subtitle: "Strain preservation, slants, and gene analysis",
    icon: <Search className="w-5 h-5" />,
    recommendedSpawn: ["Mother Culture slants", "Liquid Spawn Bioreactor Broth"],
    checklist: [
      "Construct a dedicated Class 100 laminar airflow cleanroom",
      "Source analytical laboratory microscope with camera mounts",
      "Procure premium bacteriological grade agar agar and peptones",
      "Install orbital shaker tables and digital pH telemetry probes",
      "Formulate custom malt extract agar (MEA) sectoring slants",
    ],
    guidance: "Run tissue culture isolations from wild clones to capture local environmental genetics. Conduct sector tests to isolate rhizomorphic mycelium sectors while discarding cottony mutation lines.",
    certification: "ICAR-DMR Certified Laboratory Quality Officer License",
  },
  {
    id: "government",
    roleName: "Government / NGO Officer",
    subtitle: "Empowering farming cooperatives and micro-grants",
    icon: <Landmark className="w-5 h-5" />,
    recommendedSpawn: ["Commercial Grain Spawn (Cooperative Bulk)", "Farmer Training Kits"],
    checklist: [
      "Launch district-level agricultural cooperative hubs",
      "Fund solar-powered community composting structures",
      "Distribute certified sterile spawn blocks to women self-help groups",
      "Monitor nutritional and economic indicators across 500+ rural households",
      "Affix batch QR cold-chain tracking for regional market distribution",
    ],
    guidance: "Design cooperative frameworks where a centralized sterile laboratory supplies grain spawn blocks to rural farmers who carry out grow operations in simple homestead sheds.",
    certification: "National Agricultural Food Security Initiative (NHB) Partner Code",
  },
];

export default function FarmerJourneyMap() {
  const [activeTab, setActiveTab] = useState<string>(JOURNEYS[0].id);

  const selected = JOURNEYS.find((j) => j.id === activeTab) || JOURNEYS[0];

  return (
    <div className="w-full glass-panel rounded-3xl p-6 md:p-8">
      
      {/* Title */}
      <div className="text-center mb-10">
        <span className="text-xs text-bio-green font-mono uppercase tracking-widest block mb-2">Grower Ecosystem Map</span>
        <h2 className="text-white font-display text-3xl font-extrabold tracking-wide">
          Farmer & partner Solutions Journey
        </h2>
        <p className="text-gray-400 text-xs max-w-xl mx-auto mt-2">
          Select your agricultural profile to receive customized checklists, training guidelines, and recommended biological spawn formulations.
        </p>
      </div>

      {/* Tabs list */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 border-b border-white/5 pb-6">
        {JOURNEYS.map((j) => (
          <button
            key={j.id}
            onClick={() => setActiveTab(j.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 border ${
              activeTab === j.id
                ? "bg-forest-green text-white border-bio-teal/30 shadow-lg shadow-forest-green/20"
                : "bg-obsidian-dark border-white/5 text-gray-500 hover:text-white hover:border-white/15"
            }`}
          >
            {j.icon}
            {j.roleName}
          </button>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Guidance Column */}
        <div className="bg-obsidian-gray/80 border border-white/10 p-6 rounded-2xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 text-bio-teal mb-3">
              {selected.icon}
              <span className="text-[10px] text-bio-teal font-mono uppercase tracking-widest">Guidance Document</span>
            </div>
            <h3 className="text-white font-display text-xl font-bold tracking-wide mb-3">{selected.roleName} Journey</h3>
            <p className="text-gray-300 text-xs leading-relaxed">{selected.guidance}</p>
          </div>

          <div className="space-y-4">
            {/* Recommended Spawn */}
            <div>
              <span className="text-[9px] text-gray-500 font-mono uppercase block mb-2">Recommended Spawn Types</span>
              <div className="flex flex-wrap gap-2">
                {selected.recommendedSpawn.map((spawn, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono font-semibold text-bio-green">
                    {spawn}
                  </span>
                ))}
              </div>
            </div>

            {/* Certificate */}
            <div className="bg-obsidian-black/50 p-4 rounded-xl border border-white/5">
              <span className="text-[9px] text-gray-500 font-mono uppercase block mb-1">Target Certification Alignment</span>
              <span className="text-white text-xs font-semibold block">{selected.certification}</span>
            </div>
          </div>
        </div>

        {/* Checklist Column */}
        <div className="bg-obsidian-gray/80 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-bio-green font-mono uppercase tracking-widest block mb-4">Critical Action Checklist</span>
            <ul className="space-y-3">
              {selected.checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded bg-bio-teal/20 border border-bio-teal/40 flex items-center justify-center text-[10px] text-bio-teal font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-300 text-xs leading-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-[9px] text-gray-600 mt-6 text-center border-t border-white/5 pt-4">
            Follow guidelines carefully to maximize biological efficiency and prevent cross-contamination.
          </div>
        </div>

      </div>

    </div>
  );
}
