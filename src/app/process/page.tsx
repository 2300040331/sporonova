import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckSquare, ShieldAlert, Thermometer, Clock, HelpCircle, FileText, Settings, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ProcessStage {
  step: string;
  name: string;
  purpose: string;
  equipment: string[];
  temp?: string;
  time: string;
  humidity?: string;
  pressure?: string;
  precautions: string;
  qualityCheck: string;
}

const LIQUID_SPAWN_PROCESS: ProcessStage[] = [
  {
    step: "01",
    name: "Mother Culture Selection",
    purpose: "Isolating high-viability strains of fungi in pure culture to serve as the baseline inoculum.",
    equipment: ["Laminar Airflow Cabinet", "Inoculation Loop", "Petri Plates", "Agar Formula"],
    temp: "24°C - 25°C",
    time: "7 Days",
    precautions: "Discard any slants exhibiting off-color sectors or cottony mutations immediately.",
    qualityCheck: "Rhizomorphic density rating: verified uniform grid lines.",
  },
  {
    step: "02",
    name: "Media Preparation",
    purpose: "Dissolving sugars and nutrients to construct liquid broth optimized for vegetative mycelium scaling.",
    equipment: ["Laboratory Beakers", "Magnetic Hotplate", "Formulation Broth Balance"],
    time: "45 Minutes",
    precautions: "Use strict ratio limits. Excess sugars caramelize under autoclaving, blocking growth.",
    qualityCheck: "Initial solution pH testing target bounds: 5.8 - 6.2.",
  },
  {
    step: "03",
    name: "Sterilization",
    purpose: "High-temperature thermal autoclaving to eliminate competitor mold spores and yeasts in nutrient liquid.",
    equipment: ["Industrial Autoclave Chamber", "Thermocouple Data Logger"],
    temp: "121°C (250°F)",
    time: "25 Minutes",
    pressure: "15 PSI",
    precautions: "Monitor chamber pressure logs. Maintain maximum thermal heat for the entire timing cycle.",
    qualityCheck: "Autoclave temperature sensor chart clearance.",
  },
  {
    step: "04",
    name: "Cooling Cycle",
    purpose: "Cooling media to inoculation temperature to prevent killing the living mother culture cells.",
    equipment: ["HEPA Forced Air cooling bench"],
    temp: "25°C",
    time: "6 Hours",
    precautions: "Do not touch or move bottles until the solution reaches a complete cool state.",
    qualityCheck: "Digital infrared thermometer test.",
  },
  {
    step: "05",
    name: "Inoculation",
    purpose: "Aseptic transfer of mother culture blocks directly into sterile liquid broth flasks.",
    equipment: ["Class 100 Inoculation bench", "Flame Loop Sanitizer"],
    temp: "24°C",
    time: "30 Minutes",
    precautions: "Technicians sanitize hands with 70% alcohol. Syringe ports flamed red-hot.",
    qualityCheck: "Post-inoculation seal integrity inspection.",
  },
  {
    step: "06",
    name: "Incubation & Agitation",
    purpose: "Fostering mycelium cell growth and multiplying biomass through gentle rotational spinning.",
    equipment: ["Orbital Shaker Tables", "Water-Jacket Incubator"],
    temp: "25.0°C",
    time: "5 - 7 Days",
    precautions: "Adjust RPM speeds to prevent mechanical damage to fine hyphal branches.",
    qualityCheck: "DO (Dissolved Oxygen) percentage logs: 80% saturation.",
  },
  {
    step: "07",
    name: "Growth Monitoring",
    purpose: "Reviewing colonization logs and tracking density indicators daily.",
    equipment: ["Turbidity meter", "Genomic sequencing logs"],
    time: "Daily",
    precautions: "Isolate containers displaying cell clumping or growth stalls.",
    qualityCheck: "Turbidity reading parameters check.",
  },
  {
    step: "08",
    name: "Quality testing",
    purpose: "Verifying absolute purity of broth blocks prior to bulk crop distribution.",
    equipment: ["Agar sector petri plating", "Phase contrast micro-viewer"],
    time: "2 Days",
    precautions: "Reject any batches showing micro-yeasts or lactic bacteria cells.",
    qualityCheck: "Zero competitive spore verification under 1000x zoom.",
  },
  {
    step: "09",
    name: "Aseptic Packaging",
    purpose: "Sealing clean broth containers inside sterile syringe bags with micro-filter locks.",
    equipment: ["Clean packaging heat sealing line"],
    temp: "20°C",
    time: "2 Hours",
    precautions: "Monitor room air filter gauges. Verify no leaks in seals.",
    qualityCheck: "Sealing pressure test: zero gas leaks.",
  },
  {
    step: "10",
    name: "Cold Storage Vault",
    purpose: "Inducing a dormant state inside mycelial cells to preserve spawn viability.",
    equipment: ["Industrial chill vault shelves"],
    temp: "2.0°C - 3.5°C",
    time: "Up to 21 Days",
    precautions: "Never allow temperatures to dip below freezing, as ice crystal formations destroy cell walls.",
    qualityCheck: "Continuous digital temperature logger logs check.",
  },
  {
    step: "11",
    name: "Distribution",
    purpose: "Dispatching fresh spawn under climate control directly to growers.",
    equipment: ["Insulated cold box logistics cargo"],
    temp: "4.0°C",
    time: "Overnight delivery",
    precautions: "Ensure cold packs do not directly touch bags to avoid localized frost bites.",
    qualityCheck: "Delivery reception temperature verification log.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#f9faf7] pt-24 min-h-screen">
        
        {/* Header split banner */}
        <section className="py-8 px-6 max-w-7xl mx-auto">
          <div className="rounded-[2.5rem] overflow-hidden border border-[#e6e4dc] bg-white shadow-lg grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[30vh]">
            
            <div className="lg:col-span-7 bg-[#1c3c24] text-white p-10 md:p-14 flex flex-col justify-center space-y-6 relative overflow-hidden">
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
              
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-[9px] text-[#7baa6b] font-mono uppercase tracking-widest hover:underline relative z-10 font-bold"
              >
                &larr; Back to Home
              </Link>
              
              <h1 className="text-white font-display text-3xl md:text-4xl font-black tracking-tight leading-tight relative z-10">
                Our Manufacturing Process
              </h1>
              
              <p className="text-white/80 text-xs sm:text-sm font-semibold max-w-xl leading-relaxed relative z-10">
                SporoNova operates automated industrial pipelines. Below is the detailed step-by-step manufacturing journey for our signature Liquid Spawn Broth formulation.
              </p>
            </div>

            <div className="lg:col-span-5 relative min-h-[200px] lg:min-h-full">
              <img
                src="/process_header.jpg"
                alt="Our Scientific Inoculation Process"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

          </div>
        </section>

        {/* Timeline details mapping - connected timeline steps */}
        <section className="py-12 px-6 max-w-4xl mx-auto pb-24 space-y-12">
          
          <div className="relative border-l border-[#e6e4dc] pl-10 ml-6 space-y-12">
            {LIQUID_SPAWN_PROCESS.map((stage) => (
              <div
                key={stage.step}
                className="relative bg-white border border-[#e6e4dc] p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:border-[#4e8c4a]/40 transition-all space-y-5"
              >
                
                {/* Step circle indicator - Floating z-index bubble */}
                <span className="absolute -left-[61px] top-6 w-10 h-10 rounded-full bg-white border-2 border-[#4e8c4a] flex items-center justify-center text-xs font-mono font-black text-[#4e8c4a] shadow-sm z-10">
                  {stage.step}
                </span>

                {/* Title */}
                <div>
                  <span className="text-[9px] text-[#4e8c4a] font-mono uppercase tracking-widest block mb-0.5 font-bold">Manufacturing Stage</span>
                  <h3 className="text-[#1c3c24] font-display text-lg md:text-xl font-bold tracking-wide">
                    {stage.name}
                  </h3>
                </div>

                {/* Purpose */}
                <p className="text-gray-600 text-xs sm:text-sm font-semibold leading-relaxed">
                  {stage.purpose}
                </p>

                {/* Technical Parameters grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-gray-100/50 pt-4 font-mono text-[9px] leading-tight">
                  {stage.temp && (
                    <div className="bg-[#f9faf7] p-3 rounded-xl border border-[#e6e4dc]">
                      <span className="text-gray-400 block font-bold">TEMPERATURE</span>
                      <span className="text-gray-700 font-extrabold block mt-0.5">{stage.temp}</span>
                    </div>
                  )}
                  {stage.pressure && (
                    <div className="bg-[#f9faf7] p-3 rounded-xl border border-[#e6e4dc]">
                      <span className="text-gray-400 block font-bold">PRESSURE</span>
                      <span className="text-gray-700 font-extrabold block mt-0.5">{stage.pressure}</span>
                    </div>
                  )}
                  {stage.humidity && (
                    <div className="bg-[#f9faf7] p-3 rounded-xl border border-[#e6e4dc]">
                      <span className="text-gray-400 block font-bold">HUMIDITY</span>
                      <span className="text-gray-700 font-extrabold block mt-0.5">{stage.humidity}</span>
                    </div>
                  )}
                  <div className="bg-[#f9faf7] p-3 rounded-xl border border-[#e6e4dc]">
                    <span className="text-gray-400 block font-bold">DURATION</span>
                    <span className="text-gray-700 font-extrabold block mt-0.5">{stage.time}</span>
                  </div>
                </div>

                {/* Equipment tag list */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {stage.equipment.map((eq) => (
                    <span
                      key={eq}
                      className="bg-gray-100 border border-gray-200/40 px-2.5 py-1 rounded-md text-[8px] font-mono tracking-wider text-gray-500 font-bold uppercase"
                    >
                      {eq}
                    </span>
                  ))}
                </div>

                {/* Precautions and quality checks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100/50 pt-4 text-xs font-semibold">
                  <div className="bg-amber-50/50 border border-amber-100/60 p-4 rounded-xl space-y-1">
                    <span className="text-amber-800 font-mono text-[9px] uppercase tracking-widest font-bold block">Biosecurity Precaution</span>
                    <p className="text-amber-900 leading-relaxed">{stage.precautions}</p>
                  </div>
                  <div className="bg-emerald-50/50 border border-emerald-100/60 p-4 rounded-xl space-y-1">
                    <span className="text-emerald-800 font-mono text-[9px] uppercase tracking-widest font-bold block">Quality Control Check</span>
                    <p className="text-emerald-900 leading-relaxed">{stage.qualityCheck}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
