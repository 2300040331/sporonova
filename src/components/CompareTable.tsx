"use client";

import React, { useState } from "react";
import { Check, AlertTriangle, ArrowUpDown, Info } from "lucide-react";

interface SpawnData {
  id: string;
  name: string;
  shelfLife: string;
  yield: string;
  growthSpeed: string;
  cost: string;
  contamination: string;
  weight: string;
  storage: string;
  transport: string;
  bioEfficiency: string;
  applications: string;
  govProjects: string;
  commFarms: string;
  research: string;
}

const SPAWN_TYPES: SpawnData[] = [
  {
    id: "mother-culture",
    name: "Mother Culture",
    shelfLife: "6 - 12 Months",
    yield: "N/A (starter isolate)",
    growthSpeed: "Slow (agar agar medium)",
    cost: "High (expert genomics)",
    contamination: "High Risk (requires Level 2 lab cleanroom)",
    weight: "Very Light (glass test-tubes / slants)",
    storage: "Cryogenic / Refrigerator (2°C - 4°C)",
    transport: "Specialized climate-controlled shipping",
    bioEfficiency: "N/A (laboratory culture)",
    applications: "Inoculum breeding, genomic archiving",
    govProjects: "National Germplasm Preservation Projects",
    commFarms: "Primary breeding laboratories only",
    research: "High genetic tracing and CRISPR sequencing",
  },
  {
    id: "liquid-spawn",
    name: "Liquid Spawn",
    shelfLife: "2 - 3 Weeks (immediate use)",
    yield: "Exceptional (100% colonization points)",
    growthSpeed: "Extremely Fast (24-48 hours start)",
    cost: "Low (mass bioreactor scaling)",
    contamination: "Medium-Low (sealed transfer syringes)",
    weight: "Moderate (liquid volumes)",
    storage: "Strict Cold Storage (2°C - 4°C)",
    transport: "Accelerated cold-chain logistics",
    bioEfficiency: "90% - 125%",
    applications: "Bioreactor scaleups, industrial bag inoculation",
    govProjects: "State automated farming installations",
    commFarms: "Mass-production agaric commercial grow facilities",
    research: "Nutrient consumption dynamics studies",
  },
  {
    id: "grain-spawn",
    name: "Grain Spawn",
    shelfLife: "1 - 3 Months",
    yield: "High (solid colonization anchors)",
    growthSpeed: "Fast (7-10 days to colonization)",
    cost: "Moderate (grain sterilization processing)",
    contamination: "Medium (requires double seal filters)",
    weight: "Heavy (bulks grain bags)",
    storage: "Cold storage (2°C - 4°C)",
    transport: "Refrigerated road freight",
    bioEfficiency: "80% - 100%",
    applications: "Inoculating bulk pasteurized agricultural straw/compost",
    govProjects: "Regional cooperative farmer aid distributions",
    commFarms: "Standard baseline inoculant for button/oyster mushrooms",
    research: "Colonization velocity and grain preference testing",
  },
  {
    id: "sawdust-spawn",
    name: "Sawdust Spawn",
    shelfLife: "2 - 4 Months",
    yield: "Moderate-High (50-70%)",
    growthSpeed: "Moderate (14-21 days)",
    cost: "Low (recycled agro-forestry waste)",
    contamination: "Low (highly resistant cellulose structure)",
    weight: "Heavy (dense sawdust blocks)",
    storage: "Cool dry stores (4°C - 10°C)",
    transport: "Standard dry logistics cargo",
    bioEfficiency: "70% - 85%",
    applications: "Inoculating hardwood sawdust bags and wood logs",
    govProjects: "Agroforestry renewal & forest floor seeding",
    commFarms: "Primary inoculant for Shiitake, Maitake, and Ganoderma",
    research: "Lignocellulosic enzyme activity analysis",
  },
  {
    id: "plug-spawn",
    name: "Plug Spawn",
    shelfLife: "6 - 12 Months (extremely hardy)",
    yield: "Moderate (40-60%)",
    growthSpeed: "Slow (requires wood decay penetration)",
    cost: "Low (recycled wooden dowels)",
    contamination: "Very Low (protected inside hardwood plugs)",
    weight: "Very Light (dry wooden dowels)",
    storage: "Ambient dry drawer or refrigerator",
    transport: "Standard postal shipping",
    bioEfficiency: "55% - 70%",
    applications: "Inoculating tree stumps, logs, outdoor logs",
    govProjects: "Community reforestation & agroforestry training",
    commFarms: "Small-scale rustic outdoor log setups",
    research: "Wood decay rate and mycelial structural rigidity",
  },
  {
    id: "master-spawn",
    name: "Master Spawn",
    shelfLife: "2 - 3 Months",
    yield: "Very High (G1 generation genetics)",
    growthSpeed: "Fast (rhizomorphic selection)",
    cost: "High (limited sterile production batches)",
    contamination: "Medium (requires clean biological laboratory)",
    weight: "Moderate (packaged G1 glass jars)",
    storage: "Refrigeration (2°C - 4°C)",
    transport: "Insulated express parcel logs",
    bioEfficiency: "95% - 115%",
    applications: "Generating thousands of G2 commercial spawn bags",
    govProjects: "Cooperative spawn bank storage reserves",
    commFarms: "Internal scale-up laboratories",
    research: "Long-term pedigree genetic drift tracing",
  },
  {
    id: "commercial-spawn",
    name: "Commercial Spawn",
    shelfLife: "1 - 2 Months",
    yield: "Stable High (80-95%)",
    growthSpeed: "Fast (optimized formulation)",
    cost: "Low (economies of scale production)",
    contamination: "Low (hardened competitive genetics)",
    weight: "Heavy (bulk polypropylene bags)",
    storage: "Cold storage (2°C - 4°C)",
    transport: "Bulk refrigerated trucks",
    bioEfficiency: "85% - 100%",
    applications: "Direct substrate inoculation for massive mushroom houses",
    govProjects: "National agricultural food security initiatives",
    commFarms: "Baseline operational bulk substrate inoculation",
    research: "Yield-per-ton substrate calibration trials",
  },
];

export default function CompareTable() {
  const [spawnA, setSpawnA] = useState<string>(SPAWN_TYPES[1].id); // default Liquid Spawn
  const [spawnB, setSpawnB] = useState<string>(SPAWN_TYPES[2].id); // default Grain Spawn

  const dataA = SPAWN_TYPES.find((s) => s.id === spawnA) || SPAWN_TYPES[1];
  const dataB = SPAWN_TYPES.find((s) => s.id === spawnB) || SPAWN_TYPES[2];

  const compareRows = [
    { label: "Shelf Life", key: "shelfLife" },
    { label: "Growth Speed", key: "growthSpeed" },
    { label: "Biological Efficiency", key: "bioEfficiency" },
    { label: "Inoculation Yield", key: "yield" },
    { label: "Product Cost", key: "cost" },
    { label: "Contamination Risk", key: "contamination" },
    { label: "Storage Requirements", key: "storage" },
    { label: "Transportation Logistics", key: "transport" },
    { label: "Package Weight", key: "weight" },
    { label: "Core Applications", key: "applications" },
    { label: "Government Initiatives", key: "govProjects" },
    { label: "Commercial Farms", key: "commFarms" },
    { label: "Scientific Research Focus", key: "research" },
  ];

  return (
    <div className="w-full glass-panel rounded-3xl p-6 md:p-8">
      
      {/* Head selectors */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between border-b border-white/5 pb-8 mb-8">
        <div>
          <span className="text-[10px] text-bio-green font-mono uppercase tracking-widest block mb-1">Interactive Dashboard</span>
          <h3 className="text-white font-display text-2xl font-bold tracking-wide">
            Biotech Spawn Matrix
          </h3>
          <p className="text-gray-400 text-xs mt-1 max-w-md leading-relaxed">
            Select any two spawn categories to perform side-by-side comparative analysis of biological efficiency, shelf life, and operational costs.
          </p>
        </div>

        {/* Dropper selectors */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto mt-6 md:mt-0">
          <div className="flex flex-col gap-1.5 w-full sm:w-48">
            <label className="text-[10px] text-gray-500 font-mono uppercase">Spawn Type A</label>
            <select
              value={spawnA}
              onChange={(e) => setSpawnA(e.target.value)}
              className="bg-obsidian-dark border border-white/10 text-white rounded-xl px-3 py-2 text-xs focus:border-bio-teal/50 outline-none w-full"
            >
              {SPAWN_TYPES.map((s) => (
                <option key={s.id} value={s.id} disabled={s.id === spawnB}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="text-gray-600 self-end py-2 hidden sm:block">
            <ArrowUpDown className="w-4 h-4" />
          </div>

          <div className="flex flex-col gap-1.5 w-full sm:w-48">
            <label className="text-[10px] text-gray-500 font-mono uppercase">Spawn Type B</label>
            <select
              value={spawnB}
              onChange={(e) => setSpawnB(e.target.value)}
              className="bg-obsidian-dark border border-white/10 text-white rounded-xl px-3 py-2 text-xs focus:border-bio-teal/50 outline-none w-full"
            >
              {SPAWN_TYPES.map((s) => (
                <option key={s.id} value={s.id} disabled={s.id === spawnA}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-4 pr-4 text-xs font-mono uppercase text-gray-400 w-1/4">Biological Metric</th>
              <th className="py-4 px-4 bg-forest-green/10 text-bio-teal font-display text-sm font-bold border-l border-white/5 w-3/8">
                {dataA.name}
              </th>
              <th className="py-4 px-4 bg-bio-teal/5 text-bio-green font-display text-sm font-bold border-l border-white/5 w-3/8">
                {dataB.name}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {compareRows.map((row) => {
              const valA = dataA[row.key as keyof SpawnData];
              const valB = dataB[row.key as keyof SpawnData];

              // Check if values have warnings or highlights
              const isWarningA = valA.toLowerCase().includes("high risk");
              const isWarningB = valB.toLowerCase().includes("high risk");

              return (
                <tr key={row.key} className="hover:bg-white/2 transition-colors group">
                  <td className="py-4 pr-4 text-xs font-semibold text-gray-400 group-hover:text-white flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-gray-600 shrink-0" />
                    {row.label}
                  </td>
                  <td className={`py-4 px-4 text-xs border-l border-white/5 font-mono ${
                    isWarningA ? "text-red-400" : "text-gray-300"
                  }`}>
                    {isWarningA && <AlertTriangle className="w-3.5 h-3.5 inline mr-1 text-red-400" />}
                    {valA}
                  </td>
                  <td className={`py-4 px-4 text-xs border-l border-white/5 font-mono ${
                    isWarningB ? "text-red-400" : "text-gray-300"
                  }`}>
                    {isWarningB && <AlertTriangle className="w-3.5 h-3.5 inline mr-1 text-red-400" />}
                    {valB}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-obsidian-black/40 border border-white/5 p-4 rounded-2xl flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-bio-teal/20 flex items-center justify-center shrink-0">
          <Check className="w-4.5 h-4.5 text-bio-teal" />
        </div>
        <p className="text-[10px] text-gray-500 leading-normal">
          <strong>Biological Efficiency Note:</strong> Biological efficiency (BE) is the ratio of weight of fresh mushrooms harvested per unit dry weight of substrate block. Highly calibrated liquid spawn setups yield the highest BE values.
        </p>
      </div>

    </div>
  );
}
