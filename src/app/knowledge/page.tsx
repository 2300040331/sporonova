import React from "react";
import Link from "next/link";
import { BookOpen, Search, Star, Layers, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCMSData } from "@/lib/cms-store";

interface ArticleMeta {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  complexity: "Basic" | "Intermediate" | "Advanced";
}

const ARTICLES: ArticleMeta[] = [
  {
    id: "what-are-mushrooms",
    title: "What are Mushrooms? The Fungi Kingdom Overview",
    category: "Mycology Basics",
    readTime: "5 min read",
    summary: "Discover the biological place of mushrooms in taxonomy, exploring the unique traits of the fungal kingdom that separate it from plants and animals.",
    complexity: "Basic",
  },
  {
    id: "mycelium",
    title: "Mycelium: The Underground Biosphere Network",
    category: "Mycelial Biology",
    readTime: "8 min read",
    summary: "Deep dive into hyphal networking, nutrient distribution, mycorrhizal symbiosis, and how mycelium forms the internet of forest floors.",
    complexity: "Intermediate",
  },
  {
    id: "spores",
    title: "Spores: Microscopic Genetic Dispersal Units",
    category: "Genetics",
    readTime: "6 min read",
    summary: "How mushroom spores germinating on agar plates form monokaryotic and dikaryotic vegetative mycelium networks.",
    complexity: "Advanced",
  },
  {
    id: "spawn",
    title: "Mushroom Spawn: Cultivation Carrier Principles",
    category: "Spawn Technology",
    readTime: "7 min read",
    summary: "Understand the physics of carriers: why grain kernels, wood dowels, and liquid media broth are used to multiply living mycelium blocks.",
    complexity: "Intermediate",
  },
  {
    id: "biological-efficiency",
    title: "Understanding the Biological Efficiency (BE) Formula",
    category: "Commercial Economics",
    readTime: "5 min read",
    summary: "Calibrate yields and calculate exactly how much fresh mushroom biomass is harvested per pound of dry agricultural substrate.",
    complexity: "Intermediate",
  },
  {
    id: "substrate",
    title: "Substrate Selection: Straw, Sawdust, and Compost",
    category: "Substrates",
    readTime: "8 min read",
    summary: "Compare organic structures. From lignocellulosic sawdust pellets for Shiitake to pasteurized cereal straw for Oyster mushrooms.",
    complexity: "Basic",
  },
  {
    id: "contamination",
    title: "Contamination Controls: Shielding Against Competitor Molds",
    category: "Cleanroom Practices",
    readTime: "10 min read",
    summary: "Identify green mold (Trichoderma), black bread mold, yeast, and sour bacterial wet-spot before they crash production bags.",
    complexity: "Advanced",
  },
  {
    id: "sterilization",
    title: "Sterilization vs. Pasteurization: Thermal Treatment Guidelines",
    category: "Biotechnology Labs",
    readTime: "9 min read",
    summary: "Detailed engineering guide on autoclave pressure parameters, bulk pasteurization chambers, and chemical lime baths.",
    complexity: "Advanced",
  },
];

export default function KnowledgeHub() {
  const data = getCMSData();
  const ARTICLES = (data.knowledgeCenter || []) as any[];

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-[#f9faf7] pt-24 min-h-screen">
        
        {/* Hub Header - Premium Forest Green banner */}
        <section className="py-8 px-6 max-w-7xl mx-auto">
          <div className="rounded-[2.5rem] overflow-hidden border border-[#e6e4dc] bg-[#1c3c24] text-white p-10 md:p-14 relative shadow-lg text-center space-y-6">
            {/* Decorative ambient background spots */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />

            <span className="text-[10px] text-[#7baa6b] font-mono uppercase tracking-widest block font-bold relative z-10">
              Interactive Encyclopedia
            </span>
            <h1 className="text-white font-display text-3xl md:text-5xl font-black tracking-tight leading-tight relative z-10">
              Mycology Knowledge Center
            </h1>
            <p className="text-white/80 text-xs sm:text-sm font-semibold max-w-2xl mx-auto leading-relaxed relative z-10">
              Delve into advanced biotechnology research, sterilizer recipes, mycelium growth dynamics, and commercial farm protocols compiled by SporoNova scientists.
            </p>

            <div className="max-w-md mx-auto relative pt-2 z-10">
              <div className="absolute left-4.5 top-5.5 text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search botanical research articles..."
                className="w-full bg-[#f9faf7] text-gray-800 placeholder-gray-400 rounded-full pl-11 pr-5 py-3 text-xs sm:text-sm font-semibold border border-transparent outline-none focus:ring-2 focus:ring-[#4e8c4a]/30 shadow-inner transition-all"
              />
            </div>
          </div>
        </section>

        {/* Article Grid - Asymmetric cards */}
        <section className="py-8 px-6 max-w-7xl mx-auto pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((art) => (
              <div
                key={art.id}
                className="bg-white border border-[#e6e4dc] p-7 rounded-[2rem] shadow-sm hover:shadow-md hover:border-[#4e8c4a]/40 transition-all flex flex-col justify-between min-h-[240px] group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-mono font-bold">
                    <span className="text-[#4e8c4a] uppercase tracking-wider">{art.category}</span>
                    <span className="text-gray-400">{art.readTime}</span>
                  </div>

                  <h3 className="text-[#1c3c24] font-display font-extrabold text-base md:text-lg leading-snug group-hover:text-[#4e8c4a] transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  
                  <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-gray-100/50 mt-4">
                  <span className={`px-2.5 py-1 rounded text-[8px] font-mono font-bold uppercase ${
                    art.complexity === "Basic"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : art.complexity === "Intermediate"
                      ? "bg-amber-50 text-amber-700 border border-amber-100"
                      : "bg-red-50 text-red-700 border border-red-100"
                  }`}>
                    {art.complexity}
                  </span>

                  <Link
                    href={`/knowledge/${art.id}`}
                    className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest text-[#4e8c4a] font-bold group-hover:translate-x-1 transition-transform"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
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
