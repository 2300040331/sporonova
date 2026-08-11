import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, ShieldAlert, Sparkles, Thermometer, FileText, Download, HelpCircle, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpawnCanvas from "@/components/SpawnCanvas";

interface SpawnDetail {
  id: string;
  name: string;
  scientificName: string;
  introduction: string;
  history: string;
  principle: string;
  composition: string[];
  advantages: string[];
  disadvantages: string[];
  applications: string[];
  process: string[];
  labSpecs: string[];
  storage: string;
  shelfLife: string;
  transport: string;
  qualityTesting: string[];
  commercialUses: string;
  govApplications: string;
  faqs: { q: string; a: string }[];
  papers: { title: string; author: string; journal: string }[];
}

const SPAWN_DETAILS: Record<string, SpawnDetail> = {
  "liquid-spawn": {
    id: "liquid-spawn",
    name: "Liquid Spawn",
    scientificName: "Mycelial Biomass Broth",
    introduction: "Active vegetative mycelium cells propagated inside a sterile liquid sugar solution, providing exponential inoculation surface coordinates.",
    history: "First pioneered in university research laboratories during the 1970s, liquid fermentation revolutionized commercial button mushroom yields by automating inoculant distribution.",
    principle: "Mycelium requires carbon, nitrogen, and minerals. In a liquid medium, gentle aeration breaks expanding cell clusters into microscopic fragments, each acting as an individual inoculation hub.",
    composition: [
      "Distilled Water (Pure H2O baseline)",
      "Organic Light Malt Extract (Carbon carbohydrate source)",
      "Bacteriological Yeast Extract (Nitrogen protein source)",
      "Magnesium Sulfate (Critical cell division mineral)",
    ],
    advantages: [
      "Exponentially faster colonization (90% decrease in lag phase)",
      "100% inoculation nodes covering the entire carrier matrix",
      "Bioreactor scaling reduces lab labor overheads",
      "Direct sterile needle syringe injection blocks mold spores",
    ],
    disadvantages: [
      "Short shelf life (must be chilled and used within 3 weeks)",
      "Requires advanced cleanroom testing to verify micro-contaminants",
      "Liquid turbidity makes visual contamination checks difficult",
    ],
    applications: [
      "Inoculating G1 grain master spawn jars",
      "Direct bioreactor biomass scale-up runs",
      "Automated commercial bagging line injections",
    ],
    process: [
      "Liquid Media Preparation: Dissolving sugars and nutrients at 45 minutes",
      "Autoclave Sterilization: Steaming at 121°C, 15 PSI for 25 minutes",
      "Cooling cycle: Ambient laminar cooling to 25°C for 6 hours",
      "Inoculation: Technicians inject G0 mother agar culture in HEPA hood",
      "Agitation & Aeration: Incubate on orbital shaker tables for 5 days",
    ],
    labSpecs: [
      "Class 100 sterile laminar air bench",
      "Orbital shaker incubator table",
      "Phase-contrast scientific microscope (1000x magnification)",
    ],
    storage: "Preserved inside clean air-filtered cold-vault refrigeration (2°C - 3.5°C). Do not freeze.",
    shelfLife: "21 Days maximum peak viability.",
    transport: "Certified logistics cold chain cargo (cold boxes at 4°C). Overnight air dispatch recommended.",
    qualityTesting: [
      "Agar sector plate testing: verifying clean rhizomorphic growth margins",
      "Liquid turbidity verification: checking for bacterial cloudiness",
      "Laser particle count check: monitoring mycelial density threshold",
    ],
    commercialUses: "Primary inoculant for massive white button and oyster commercial farms globally.",
    govApplications: "Distributed to municipal automated farms under state-backed horticulture technology grants.",
    faqs: [
      { q: "Why does liquid spawn grow faster than grain spawn?", a: "Liquid spawn contains millions of tiny suspended hyphal fragments per milliliter, which spread instantly across the substrate, whereas grain spawn inoculates only at direct grain contact points." },
      { q: "How do you detect contamination in liquid spawn?", a: "By testing sample drops on petri plates (agar plating) and checking for yeast or bacterial growth patterns under phase-contrast microscopes." },
    ],
    papers: [
      { title: "Liquid Fermentation of Pleurotus Strains in Stirred Bioreactors", author: "Dr. Kenji Sato et al.", journal: "Journal of Applied Mycology, 2023" },
      { title: "Comparative Yield Analysis of Liquid vs. Grain Spawn Inoculations", author: "H. Patel, R. Miller", journal: "Biotech Agriculture quarterly, 2025" },
    ],
  },
  "grain-spawn": {
    id: "grain-spawn",
    name: "Grain Spawn",
    scientificName: "Cereal Grain Vegetative Inoculant",
    introduction: "Sterilized cereal grains hydrated and colonized by pure mycelium, forming robust vegetative carrier kernels.",
    history: "Developed in the 1930s by agricultural scientist Senden, substituting wild compost spawn with sterile, grain-based carriers, establishing modern mushroom farming.",
    principle: "Grains act as both nutrition storehouses and physical anchors. When mixed with bulk substrates, each colonized grain acts as a center of biological mycelium expansion.",
    composition: [
      "Hydrated cereal grains (Wheat, Millet, or Rye grass kernels)",
      "Calcium Sulfate (Gypsum: acts as anti-clumping agent)",
      "Calcium Carbonate (Chalk: balances substrate pH levels)",
    ],
    advantages: [
      "Long shelf life (refrigerated up to 3 months)",
      "High carbohydrate storage provides energy to colonize poor soils",
      "Easy visual detection of competitive molds or bacterial wet-spot",
      "Physically easy to shake and disperse evenly throughout bulk compost",
    ],
    disadvantages: [
      "Attracts rodents and insect pests in outdoor environments",
      "Longer preparation cycle (requires grain boiling, drying, and soaking)",
      "Higher raw material costs (cereal grains prices rise seasonally)",
    ],
    applications: [
      "Direct inoculation of pasteurized agricultural straw bags",
      "Inoculating commercial mushroom compost beds",
      "Home cultivation setups in indoor grow chambers",
    ],
    process: [
      "Grain Hydration: Boiling cereal grains for 35 minutes to achieve 50% humidity",
      "Chalk/Gypsum Addition: Mixing powders to adjust pH and block clumping",
      "Autoclave Sterilization: Heating at 121°C (15 PSI) for 90 minutes",
      "Inoculation: Injecting active liquid spawn or transferring agar slants",
      "Incubation: Climate room storage for 14 days with manual shaking",
    ],
    labSpecs: [
      "Heavy duty autoclaves with vacuum extraction",
      "Bulk grain boiling and rinsing stations",
      "Temperature controlled high-airflow incubation bays",
    ],
    storage: "Clean refrigerated vaults (2°C - 4°C). Keep bags upright to prevent filter contamination.",
    shelfLife: "90 Days maximum refrigeration storage.",
    transport: "Refrigerated freight logistics trucks. Insulate bags to avoid condensation buildup.",
    qualityTesting: [
      "Visual bag mold check: looking for green Aspergillus or black Pin-mold",
      "Smell analysis: rejecting bags with sour bacterial cider scent",
      "Vigor bounce test: verifying rapid recovery after bag shaking",
    ],
    commercialUses: "The standard inoculant for commercial Oyster, Shiitake, and Button mushroom farming worldwide.",
    govApplications: "Distributed bulk spawn to rural cooperative agricultural training centers under microfinance projects.",
    faqs: [
      { q: "Which grain is best for spawn production?", a: "Millet is ideal due to its small grain size, which provides more inoculation points per kilogram. Wheat is preferred for larger mushrooms due to higher nutrient volumes." },
      { q: "What is the purpose of gypsum in grain spawn?", a: "Gypsum prevents individual grains from sticking together into a solid block, making it easy to break and shake the bag." },
    ],
    papers: [
      { title: "Influence of Cereal Grains on Vegetative Mycelium Expansion Rate", author: "Dr. Sarah Jenkins", journal: "Applied Agricultural Mycology, 2024" },
    ],
  },
  "mother-culture": {
    id: "mother-culture",
    name: "Mother Culture",
    scientificName: "Genomic Agar Sub-Culture (G0)",
    introduction: "Pure mycelial strains isolated on sterile agar media slants inside borosilicate tubes, serving as the primary genetic repository.",
    history: "Agar slant preservation was adapted from standard bacteriological methods in the early 20th century to prevent strain degeneration and mutation drift.",
    principle: "Mycelium is cultivated on a solid nutrient agar matrix. By slowing metabolic activity at low temperatures, pure genetic lines are preserved without cell division fatigue.",
    composition: [
      "Bacteriological Agar-Agar (Solidifying agent)",
      "Light Malt Extract (Nutrient carbohydrate source)",
      "Peptone (Nitrogen and amino acid building blocks)",
      "Yeast Extract (Vitamin B complex source)",
    ],
    advantages: [
      "Maintains original genetic purity with zero mutation drift",
      "Long-term viability storage (up to 12 months under chill)",
      "Ideal for strain breeding and international genetic exchange",
      "Provides clear visual verification of sectoring growth margins",
    ],
    disadvantages: [
      "Requires advanced cleanroom micro-dissection skills",
      "Extremely slow initial expansion rates",
      "Highly vulnerable to spore contamination during initial inoculation",
    ],
    applications: [
      "Inoculating G1 master grain jars or liquid broth inoculants",
      "Preserving rare regional wild mycology collections",
      "Long-term strain banking in university research centers",
    ],
    process: [
      "Agar Media Preparation: Melt malt agar solution at 95°C for 20 minutes",
      "Pressure Autoclaving: Sterilize at 121°C, 15 PSI for 20 minutes",
      "Slant Tube Pouring: Dispense and angle tubes under HEPA hood to solidify",
      "Aseptic Inoculation: Transfer mycelium tissue margins to agar face",
      "Incubation: Store at 24°C for 7 days to verify clean colony growth",
    ],
    labSpecs: [
      "Class 100 sterile laminar air bench hood",
      "Inoculation flame loop sanitizer",
      "Digital temperature-controlled incubator vault",
    ],
    storage: "Preserved inside clean air-filtered cold vaults at 2°C - 4°C. Keep tubes upright.",
    shelfLife: "12 Months maximum storage before slant transfer.",
    transport: "Insulated shipping tubes with thermal cold packs. Overnight air express recommended.",
    qualityTesting: [
      "Rhizomorphic margin check: verifying concentric growth rings",
      "Mutation sector check: identifying and discarding fuzzy mutations",
      "Sub-plating check: testing on potato dextrose agar plates",
    ],
    commercialUses: "Genetic backup for large scale commercial mushroom production networks.",
    govApplications: "Strain archives for agricultural research agencies and public biotechnology universities.",
    faqs: [
      { q: "Why are slants used instead of petri dishes for long-term storage?", a: "Petri dishes dry out quickly due to air gaps, whereas capped test tubes retain moisture and protect agar media from dehydration for up to a year." },
      { q: "What is genetic sectoring?", a: "Sectoring is when a section of mycelium mutates and grows at a different rate or texture. These sectors must be discarded to keep the genetic line pure." },
    ],
    papers: [
      { title: "Preservation and Maintenance of Basidiomycete Cults on Agar Slants", author: "Dr. L. Vance, et al.", journal: "Applied Biotechnology Review, 2024" },
    ],
  },
  "commercial-spawn": {
    id: "commercial-spawn",
    name: "Commercial Spawn",
    scientificName: "Bulk Substrate Inoculant (G2/G3)",
    introduction: "Fully colonized bulk grain or sawdust matrices packaged inside heavy-duty breathable filter bags, optimized for direct agricultural bed inoculation.",
    history: "Bulk spawn packaging evolved in the 1980s with the introduction of autoclavable polypropylene bags featuring integrated micro-filter patches, allowing gas exchange while blocking mold spores.",
    principle: "To colonize large volumes of substrate efficiently, spawn must be robust. Commercial spawn provides massive volume and inoculation points, allowing rapid colonizing of compost or straw.",
    composition: [
      "Sterilized organic millet or sorghum seeds",
      "Lignocellulosic hardwood sawdust matrix (for wood lovers)",
      "Agricultural gypsum (Anti-clumping mineral)",
      "Calcium carbonate (pH balancer)",
    ],
    advantages: [
      "Cost-effective bulk packaging for large scale commercial farms",
      "High inoculation point density due to millet seed distribution",
      "Sustained nutrition block to boost flush yield weights",
      "Bags are easy to shake and distribute evenly throughout bulk compost",
    ],
    disadvantages: [
      "High bulk freight shipping costs due to heavy package weights",
      "Lower shelf life compared to G1 master spawn",
      "Vulnerable to tearing during shipping or bed mixing",
    ],
    applications: [
      "Direct inoculation of pasteurized agricultural straw bags",
      "Inoculating commercial mushroom compost beds (Button mushrooms)",
      "Supplying agricultural cooperations under bulk farming programs",
    ],
    process: [
      "Bulk grain boiling: Hydrate seeds to 48% moisture contents",
      "Bag Filling & Sealing: Pack into filter bags and seal under clean airflow",
      "Sterilization: Autoclave bags at 121°C for 2.5 hours",
      "HEPA cooling: Rest bags in positive-pressure clean rooms for 12 hours",
      "Inoculation: Inject G1 master spawn into bags and seal",
    ],
    labSpecs: [
      "Large-capacity horizontal sterilizer autoclaves",
      "Bulk grain mixers and bag filling lines",
      "Temperature-controlled high-airflow incubation bays",
    ],
    storage: "Store in clean cold storage vaults (2°C - 3.5°C). Keep bags stacked upright with proper airflow space.",
    shelfLife: "60 Days peak viability under refrigeration.",
    transport: "Refrigerated freight logistics cargo at 4°C. Avoid humidity condensation.",
    qualityTesting: [
      "Visual bag inspection: check for green molds or yellow bacterial exudate",
      "Bounce test: verify raw vegetative recovery within 48 hours after bag shake",
      "Sector agar sub-plating test: check samples on petri dishes",
    ],
    commercialUses: "Direct inoculant for commercial Oyster, Shiitake, and Button mushroom farming worldwide.",
    govApplications: "Bulk spawn distribution to rural community grower networks under municipal agricultural aid projects.",
    faqs: [
      { q: "Can I use commercial spawn to make more spawn?", a: "We do not recommend expanding commercial spawn (G2) further, as third-generation scaling increases the risk of contamination and genetic mutation drift." },
      { q: "How much commercial spawn is needed for inoculation?", a: "Standard inoculation rate is 2% to 5% spawn weight to wet substrate weight, depending on the mushroom variety." },
    ],
    papers: [
      { title: "Yield and Biological Efficiency of Commercial Spawn Matrices", author: "H. Patel, R. Miller", journal: "Agricultural Biotechnology Quarterly, 2025" },
    ],
  },
  "growing-kits": {
    id: "growing-kits",
    name: "Mushroom Growing Kits",
    scientificName: "Ready-to-Fruit Substrate Blocks",
    introduction: "Pre-colonized, fully matured substrate blocks engineered for instant fruiting in home, institutional, or educational environments.",
    history: "Popularized in agricultural extension programs to make mushroom cultivation accessible to smallholder growers without expensive sterile cleanroom infrastructure.",
    principle: "The lignocellulosic substrate is fully consolidated by high-vigor mycelium. By exposing the block to oxygen, light, and high humidity, primordia formation (pinning) is triggered rapidly.",
    composition: [
      "Pasteurized hardwood sawdust & agricultural husks",
      "Organic wheat bran nutrient supplement (15%)",
      "Pure rhizomorphic strain inoculant (Millet/Sawdust)",
      "Hydrated agricultural gypsum (pH & structure stability)",
    ],
    advantages: [
      "Zero laboratory equipment required (just mist and harvest)",
      "High yield efficiency (up to 80-100% biological efficiency)",
      "Guaranteed contamination-free pre-incubated blocks",
      "Ideal for training, schools, urban growers, and culinary enthusiasts",
    ],
    disadvantages: [
      "Higher shipping weight per unit compared to raw grain spawn",
      "Requires moisture control during fruiting stage",
      "Limited flushes (typically 3 to 4 harvest flushes)",
    ],
    applications: [
      "Educational classroom science demonstrations and workshops",
      "Urban rooftop & indoor countertop mushroom farming",
      "Household fresh culinary gourmet mushroom production",
    ],
    process: [
      "Substrate Formulation: Blending hardwood sawdust, bran, and gypsum at 62% hydration",
      "Sterilization: Autoclaving at 121°C (15 PSI) for 3 hours",
      "Aseptic Inoculation: Inoculating with G1 grain spawn in Class 100 HEPA hood",
      "Incubation: 21-day temperature controlled dark room colonization",
      "Quality Check: Inspected for 100% white mycelial density before packaging",
    ],
    labSpecs: [
      "Industrial substrate mixing and bagging equipment",
      "High-pressure bulk autoclaves",
      "Environmentally controlled dark incubation chambers",
    ],
    storage: "Store in cool, dark place (15°C - 20°C) or refrigerate at 4°C to delay fruiting.",
    shelfLife: "45 Days unopened in refrigerated storage.",
    transport: "Standard box logistics with protective impact padding.",
    qualityTesting: [
      "Mycelial density inspection: verifying 100% solid block binding",
      "Bacterial exudate check: zero un-colonized patches or pooling liquid",
      "Pinning readiness test: sample verification of primordial knotting",
    ],
    commercialUses: "Direct-to-consumer retail kits, institutional educational tools, and restaurant micro-farms.",
    govApplications: "Distributed under rural livelihood and skill development initiatives.",
    faqs: [
      { q: "How many harvests can I get from one kit?", a: "Each kit produces 3 to 4 flushes of fresh mushrooms over a 4 to 6 week period when watered properly." },
      { q: "What conditions do growing kits need to fruit?", a: "High ambient humidity (85-90%), indirect room light, and clean fresh airflow at 18-24°C." },
    ],
    papers: [
      { title: "Optimization of Lignocellulosic Substrates for Ready-to-Fruit Block Kits", author: "Dr. K. Sharma", journal: "Journal of Horticultural Technology, 2024" },
    ],
  },
};

interface PageProps {
  params: Promise<{ type: string }>;
}

export default async function SpawnPage({ params }: PageProps) {
  const { type } = await params;
  const detail = SPAWN_DETAILS[type];
  const isFallback = !detail;
  
  const displayTitle = isFallback
    ? type.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : detail.name;

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-[#f9faf7] pt-24 min-h-screen">
        
        {/* HERO SECTION - Premium Green and Beige style */}
        <section className="relative py-20 px-6 border-b border-[#e6e4dc] bg-white">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            
            {/* Text description */}
            <div className="flex-1 space-y-6">
              <Link
                href="/#products"
                className="inline-flex items-center gap-1.5 text-[9px] text-[#4e8c4a] font-mono uppercase tracking-widest hover:underline font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Spawn Catalog
              </Link>
              <div>
                <span className="text-[9px] text-[#4e8c4a] font-mono uppercase tracking-widest block mb-1 font-bold">
                  {!isFallback ? detail.scientificName : "Biotechnology Formula"}
                </span>
                <h1 className="text-[#1c3c24] font-display text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  {displayTitle}
                </h1>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed max-w-xl">
                {!isFallback
                  ? detail.introduction
                  : `Comprehensive specifications, laboratory recipes, and production workflows for SporoNova's certified ${displayTitle} formulas.`}
              </p>

              {!isFallback && (
                <div className="grid grid-cols-2 gap-4 border-t border-[#e6e4dc]/80 pt-6 font-mono text-[9px] font-bold">
                  <div className="bg-[#f9faf7] p-4 rounded-2xl border border-[#e6e4dc] flex items-center gap-3.5 shadow-sm">
                    <Clock className="w-5 h-5 text-[#4e8c4a]" />
                    <div>
                      <span className="text-[8px] text-gray-400 block">SHELF LIFE</span>
                      <span className="text-gray-700 font-extrabold block mt-0.5">{detail.shelfLife}</span>
                    </div>
                  </div>
                  <div className="bg-[#f9faf7] p-4 rounded-2xl border border-[#e6e4dc] flex items-center gap-3.5 shadow-sm">
                    <Thermometer className="w-5 h-5 text-[#4e8c4a]" />
                    <div>
                      <span className="text-[8px] text-gray-400 block">STORAGE MODE</span>
                      <span className="text-gray-700 font-extrabold block mt-0.5">2°C - 4°C Refrigeration</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive 3D Model Display Column */}
            <div className="w-full lg:w-[450px] min-h-[530px] lg:min-h-0 lg:aspect-square bg-[#f9faf7] border border-[#e6e4dc] rounded-[2rem] overflow-hidden relative flex flex-col items-stretch lg:flex-row lg:items-center lg:justify-center shadow-sm p-3 hover:scale-[1.01] transition-transform duration-500">
              <SpawnCanvas type={type} />
              
              {type !== "commercial-spawn" && (
                <div className="absolute bottom-4 left-4 bg-white px-2.5 py-1.5 rounded-lg border border-[#e6e4dc]/80 pointer-events-none text-[9px] font-mono text-[#4e8c4a] select-none z-10 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-[#4e8c4a] rounded-full animate-ping" />
                  Bioluminescent WebGL Render
                </div>
              )}
            </div>

          </div>
        </section>

        {/* DETAILED SPEC SECTIONS */}
        {!isFallback && (
          <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Main column articles */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* History */}
              <div className="space-y-4">
                <h3 className="text-[#1c3c24] font-display text-2xl md:text-3xl font-extrabold tracking-tight">Historical Context</h3>
                <p className="text-gray-500 text-sm md:text-base font-semibold leading-relaxed">{detail.history}</p>
              </div>

              {/* Scientific principle */}
              <div className="space-y-4">
                <h3 className="text-[#1c3c24] font-display text-2xl md:text-3xl font-extrabold tracking-tight">Scientific Principles</h3>
                <p className="text-gray-500 text-sm md:text-base font-semibold leading-relaxed">{detail.principle}</p>
              </div>

              {/* Production Process Timeline Flow */}
              <div className="space-y-8 pt-8 border-t border-[#e6e4dc]">
                <h3 className="text-[#1c3c24] font-display text-2xl md:text-3xl font-extrabold tracking-tight">Lab Production Timeline</h3>
                
                <div className="relative border-l border-[#e6e4dc] pl-8 ml-3 space-y-8">
                  {detail.process.map((step, idx) => {
                    const [title, desc] = step.split(":");
                    return (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[37px] top-0 w-6 h-6 rounded-full bg-white border-2 border-[#4e8c4a] flex items-center justify-center text-[9px] font-mono font-black text-[#4e8c4a] shadow-sm">
                          {idx + 1}
                        </span>
                        <h4 className="text-[#1c3c24] font-display font-extrabold text-sm mb-1">{title}</h4>
                        <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">{desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Composition & Quality Testing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#e6e4dc]">
                <div className="bg-white border border-[#e6e4dc] p-7 rounded-[2rem] shadow-sm space-y-4">
                  <h4 className="text-[#1c3c24] font-display font-bold text-base border-b border-gray-100 pb-2">Biomass Nutrient Composition</h4>
                  <ul className="space-y-3">
                    {detail.composition.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm font-semibold text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#4e8c4a] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-[#e6e4dc] p-7 rounded-[2rem] shadow-sm space-y-4">
                  <h4 className="text-[#1c3c24] font-display font-bold text-base border-b border-gray-100 pb-2">Sterility Quality Testing</h4>
                  <ul className="space-y-3">
                    {detail.qualityTesting.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm font-semibold text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#4e8c4a] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQs */}
              <div className="space-y-8 pt-8 border-t border-[#e6e4dc]">
                <h3 className="text-[#1c3c24] font-display text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-[#4e8c4a]" /> Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {detail.faqs.map((faq, i) => (
                    <div key={i} className="bg-white border border-[#e6e4dc] p-6 rounded-[1.5rem] space-y-2 shadow-sm">
                      <h4 className="text-[#1c3c24] text-sm font-extrabold font-display">{faq.q}</h4>
                      <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right sidebar details */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Lab Requirements */}
              <div className="bg-white border border-[#e6e4dc] p-8 rounded-[2rem] space-y-4 shadow-sm">
                <span className="text-[9px] text-[#4e8c4a] font-mono uppercase tracking-widest block font-bold">Cleanroom Requirements</span>
                <h4 className="text-[#1c3c24] font-display font-bold text-sm">Laboratory Hardware Specifications</h4>
                <ul className="space-y-3 pt-2">
                  {detail.labSpecs.map((spec, i) => (
                    <li key={i} className="text-xs sm:text-sm font-semibold text-gray-500 flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4e8c4a] mt-1.5 shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Logistics */}
              <div className="bg-white border border-[#e6e4dc] p-8 rounded-[2rem] space-y-4 shadow-sm">
                <span className="text-[9px] text-[#4e8c4a] font-mono uppercase tracking-widest block font-bold">Transport & Shelf life</span>
                <h4 className="text-[#1c3c24] font-display font-bold text-sm">Cold Chain Logistics Matrix</h4>
                
                <div className="space-y-4 text-xs sm:text-sm pt-2">
                  <div>
                    <span className="text-[8px] text-gray-400 font-mono block font-bold">LOGISTICS PIPELINE</span>
                    <p className="text-gray-700 font-extrabold mt-0.5 leading-normal">{detail.transport}</p>
                  </div>
                  <div>
                    <span className="text-[8px] text-gray-400 font-mono block font-bold">STORAGE ENVELOPE</span>
                    <p className="text-gray-700 font-extrabold mt-0.5 leading-normal">{detail.storage}</p>
                  </div>
                </div>
              </div>

              {/* Research publications */}
              <div className="bg-white border border-[#e6e4dc] p-8 rounded-[2rem] space-y-6 shadow-sm">
                <span className="text-[9px] text-[#4e8c4a] font-mono uppercase tracking-widest block font-bold">Research & Documents</span>
                <h4 className="text-[#1c3c24] font-display font-bold text-sm">Genomic Whitepapers</h4>
                
                <div className="space-y-4">
                  {detail.papers.map((paper, i) => (
                    <div key={i} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0 space-y-1 hover:pl-1 transition-all duration-300">
                      <span className="text-gray-700 text-xs font-bold hover:text-[#4e8c4a] cursor-pointer block leading-snug">
                        {paper.title}
                      </span>
                      <span className="text-[8px] text-gray-400 block font-mono">
                        {paper.author} &bull; {paper.journal}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/contact?inquiry=pdf&product=${encodeURIComponent(detail.name)}`}
                  className="w-full py-3.5 bg-[#1c3c24] text-white rounded-xl text-[9px] font-mono uppercase tracking-widest hover:bg-[#4e8c4a] transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Request Technical PDF
                </Link>
              </div>

            </div>

          </section>
        )}

        {/* Fallback styling for non-item pages */}
        {isFallback && (
          <section className="py-28 px-6 text-center max-w-xl mx-auto space-y-6">
            <ShieldAlert className="w-12 h-12 text-[#4e8c4a] mx-auto" />
            <h3 className="text-[#1c3c24] font-display text-2xl font-bold">Sub-Culture Data Encrypted</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-semibold">
              Detailed biological formulations and autoclave timing logs for this specific spawn category are locked under state agricultural biosecurity guidelines. Please contact SporoNova research officers for compliance access credentials.
            </p>
            <div className="pt-4">
              <Link href="/" className="px-7 py-3.5 bg-[#1c3c24] text-xs font-mono uppercase tracking-widest text-white rounded-xl hover:bg-[#4e8c4a] transition-all cursor-pointer">
                Return to Network Home
              </Link>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return [
    { type: "liquid-spawn" },
    { type: "grain-spawn" },
    { type: "mother-culture" },
    { type: "commercial-spawn" },
    { type: "growing-kits" },
  ];
}
