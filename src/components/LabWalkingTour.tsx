"use client";

import React, { useState } from "react";
import { Shield, Settings, Thermometer, Wind, RefreshCw, Cpu, CheckCircle } from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  specs: {
    purpose: string;
    temperature?: string;
    humidity?: string;
    airflow?: string;
    pressure?: string;
    rpm?: string;
    sterilization?: string;
    hepaEfficiency?: string;
    capacity?: string;
  };
  details: string;
  hudChart: {
    label: string;
    value: string;
    percent: number;
    color: string;
  }[];
}

const EQUIPMENT_LIST: Equipment[] = [
  {
    id: "laminar-flow",
    name: "Laminar Air Flow Gating",
    category: "Inoculation Gating",
    icon: <Wind className="w-5 h-5 text-bio-teal" />,
    specs: {
      purpose: "Sterile horizontal airflow path for mother culture inoculation transfers",
      airflow: "0.45 m/s constant velocity",
      hepaEfficiency: "99.999% retention of 0.3μm micro-particles",
      sterilization: "UV-C light grid gating (254nm wave)",
    },
    details: "Utilizes positive-pressure horizontal air sweeps filtered by ultra-dense HEPA filters, creating a Class 100 sterile workspace. Used for inoculating slants, agar plates, and starting mother culture colonies.",
    hudChart: [
      { label: "HEPA Filtration purity", value: "99.999%", percent: 99.9, color: "bg-bio-teal" },
      { label: "Air Velocity stability", value: "0.45 m/s", percent: 90, color: "bg-bio-green" },
    ],
  },
  {
    id: "autoclave",
    name: "Industrial Steam Autoclave",
    category: "Media Sterilization",
    icon: <Cpu className="w-5 h-5 text-bio-teal" />,
    specs: {
      purpose: "Thermal sterilization of grains, sawdust bags, and agar formulas",
      temperature: "121°C (250°F) critical peak",
      pressure: "15 - 17 PSI constant steam force",
      sterilization: "High pressure saturated steam vacuum cycles",
      capacity: "500L horizontal steel chamber",
    },
    details: "High-pressure thermal autoclave sterilizers neutralize competitive mold spores, yeasts, and endobacteria inside grain spawn blocks. Operates on automated PLC program profiles.",
    hudChart: [
      { label: "Sterility verification", value: "100%", percent: 100, color: "bg-bio-green" },
      { label: "Pressure stress index", value: "15 PSI", percent: 75, color: "bg-bio-gold" },
    ],
  },
  {
    id: "incubator",
    name: "Climate-Controlled Incubator",
    category: "Mycelial Colonization",
    icon: <Thermometer className="w-5 h-5 text-bio-teal" />,
    specs: {
      purpose: "Incubation and growth phase regulation for mother agar slants",
      temperature: "24.5°C constant control limits",
      humidity: "60% - 65% RH bounds",
      airflow: "Gentle convection air displacement",
    },
    details: "Provides insulated, dark, stable atmospheric incubation essential for vegetative mycelium expansion. Prevents growth stalls triggered by rapid diurnal temperature fluctuations.",
    hudChart: [
      { label: "Temperature precision", value: "±0.2°C", percent: 95, color: "bg-bio-teal" },
      { label: "Relative Humidity tracking", value: "62% RH", percent: 80, color: "bg-bio-teal" },
    ],
  },
  {
    id: "bioreactor",
    name: "Industrial Bioreactor Vessel",
    category: "Liquid Spawn Cultivation",
    icon: <Settings className="w-5 h-5 text-bio-teal" />,
    specs: {
      purpose: "Suspended liquid-state mycelial broth fermentation and multiplication",
      capacity: "100 Liters continuous flow",
      rpm: "50 - 150 RPM agitator rotation speed",
      airflow: "Continuous sterile air sparging (0.2μm filter)",
      temperature: "25.0°C water jacket loops",
    },
    details: "SporoNova's signature bioreactors propagate liquid mycelial biomass inside liquid broth. Aeration nozzles release micro-bubbles, oxygenating suspended hyphal clumps without shearing.",
    hudChart: [
      { label: "Biomass multiplication", value: "10x / day", percent: 90, color: "bg-bio-green" },
      { label: "DO (Dissolved Oxygen) index", value: "85%", percent: 85, color: "bg-bio-teal" },
    ],
  },
  {
    id: "shaker",
    name: "Orbital Shaker Table",
    category: "Culture Expansion",
    icon: <RefreshCw className="w-5 h-5 text-bio-teal" />,
    specs: {
      purpose: "Gentle orbital agitation of Erlenmeyer liquid flasks to prevent clumping",
      rpm: "120 - 180 RPM orbit speeds",
      airflow: "Ambient room placement",
      capacity: "24 Flask slots per deck platform",
    },
    details: "Induces continuous orbital shear to break expanding mycelium clumps into millions of micro-inoculation points. Essential for liquid inoculant preparation prior to grain jar scaling.",
    hudChart: [
      { label: "Orbital speed balance", value: "130 RPM", percent: 75, color: "bg-bio-gold" },
      { label: "Vessel aeration coefficient", value: "High", percent: 85, color: "bg-bio-teal" },
    ],
  },
  {
    id: "cold-vault",
    name: "Cold Chain Vault Room",
    category: "Product Preservation",
    icon: <Shield className="w-5 h-5 text-bio-teal" />,
    specs: {
      purpose: "Slowing down biological respiration to preserve spawn viability",
      temperature: "2.0°C - 3.5°C constant chill",
      humidity: "40% - 50% low humidity (avoids box rot)",
      capacity: "15 Tons heavy-duty crate shelving",
    },
    details: "Refrigeration triggers a dormant state inside colonized grains, maintaining viability for 3 months. Essential for buffer reserves and national export logistics transport scheduling.",
    hudChart: [
      { label: "Cooling loop reliability", value: "99.9%", percent: 99, color: "bg-bio-teal" },
      { label: "Respiration deceleration", value: "Maximized", percent: 90, color: "bg-bio-green" },
    ],
  },
];

export default function LabWalkingTour() {
  const [activeEq, setActiveEq] = useState<string>(EQUIPMENT_LIST[0].id);

  const selected = EQUIPMENT_LIST.find((e) => e.id === activeEq) || EQUIPMENT_LIST[0];

  return (
    <div className="w-full glass-panel rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row gap-8">
      
      {/* Selector side panel */}
      <div className="w-full lg:w-1/3 flex flex-col gap-3">
        <div>
          <span className="text-[10px] text-bio-teal font-mono uppercase tracking-widest block mb-1">Interactive Facility Tour</span>
          <h3 className="text-white font-display text-2xl font-bold tracking-wide">
            Biotech Virtual Laboratory
          </h3>
          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
            Click on any station node inside SporoNova's certified facility control loop to review system specs and air purity metrics.
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          {EQUIPMENT_LIST.map((eq) => (
            <button
              key={eq.id}
              onClick={() => setActiveEq(eq.id)}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                activeEq === eq.id
                  ? "bg-forest-green/20 border-bio-teal text-white"
                  : "bg-obsidian-dark border-white/5 text-gray-400 hover:border-white/15 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`p-2 rounded-lg transition-colors ${
                  activeEq === eq.id ? "bg-bio-teal/20" : "bg-white/5"
                }`}>
                  {eq.icon}
                </span>
                <div>
                  <h4 className="text-xs font-bold font-display uppercase tracking-wider">{eq.name}</h4>
                  <span className="text-[9px] text-gray-500 font-mono">{eq.category}</span>
                </div>
              </div>
              <CheckCircle className={`w-4 h-4 transition-all duration-300 ${
                activeEq === eq.id ? "text-bio-green scale-100" : "text-transparent scale-50"
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* Control Monitor Panel */}
      <div className="flex-1 bg-obsidian-gray/80 border border-white/10 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
        
        {/* Abstract background grid */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

        <div className="z-10 space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <span className="text-[9px] font-mono text-bio-teal uppercase tracking-widest">Active Laboratory Station</span>
              <h3 className="text-white font-display text-xl font-bold tracking-wide mt-0.5">{selected.name}</h3>
            </div>
            <span className="px-2.5 py-1 bg-forest-green text-[9px] text-bio-green font-mono uppercase rounded-md border border-bio-green/20">
              {selected.category}
            </span>
          </div>

          {/* Description */}
          <div>
            <span className="text-[10px] text-gray-500 font-mono uppercase block mb-1">Operational Description</span>
            <p className="text-gray-300 text-xs leading-relaxed">{selected.details}</p>
          </div>

          {/* Tech Parameters Grid */}
          <div>
            <span className="text-[10px] text-gray-500 font-mono uppercase block mb-3">System Telemetry Logs</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-obsidian-black/50 p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-[9px] text-gray-500 font-mono block uppercase">Operational Purpose</span>
                <span className="text-white text-xs block leading-relaxed font-semibold">{selected.specs.purpose}</span>
              </div>

              {selected.specs.temperature && (
                <div className="bg-obsidian-black/50 p-4 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[9px] text-gray-500 font-mono block uppercase">Chamber Temperature</span>
                  <span className="text-bio-green text-xs font-mono font-bold">{selected.specs.temperature}</span>
                </div>
              )}

              {selected.specs.pressure && (
                <div className="bg-obsidian-black/50 p-4 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[9px] text-gray-500 font-mono block uppercase">Steam Pressure Force</span>
                  <span className="text-bio-gold text-xs font-mono font-bold">{selected.specs.pressure}</span>
                </div>
              )}

              {selected.specs.airflow && (
                <div className="bg-obsidian-black/50 p-4 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[9px] text-gray-500 font-mono block uppercase">Fume Exhaust Airflow</span>
                  <span className="text-bio-teal text-xs font-mono font-bold">{selected.specs.airflow}</span>
                </div>
              )}

              {selected.specs.rpm && (
                <div className="bg-obsidian-black/50 p-4 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[9px] text-gray-500 font-mono block uppercase">Agitation Spin Speed</span>
                  <span className="text-white text-xs font-mono font-bold">{selected.specs.rpm}</span>
                </div>
              )}

              {selected.specs.sterilization && (
                <div className="bg-obsidian-black/50 p-4 rounded-xl border border-white/5 space-y-1 col-span-1 md:col-span-2">
                  <span className="text-[9px] text-gray-500 font-mono block uppercase">Sterility Clearance Method</span>
                  <span className="text-gray-300 text-xs font-semibold">{selected.specs.sterilization}</span>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* HUD Charts */}
        <div className="mt-8 pt-6 border-t border-white/5 z-10 space-y-4">
          <span className="text-[10px] text-gray-500 font-mono uppercase block">Purity & Performance Indication</span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selected.hudChart.map((c, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-gray-400">{c.label}</span>
                  <span className="text-white font-bold">{c.value}</span>
                </div>
                <div className="h-1.5 bg-obsidian-black rounded-full overflow-hidden">
                  <div
                    style={{ width: `${c.percent}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${c.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
