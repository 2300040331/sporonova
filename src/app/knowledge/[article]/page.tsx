import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, ShieldAlert, Sparkles, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ArticleDetail {
  id: string;
  title: string;
  category: string;
  readTime: string;
  complexity: string;
  content: React.ReactNode;
}

const ARTICLE_DETAILS: Record<string, ArticleDetail> = {
  "what-are-mushrooms": {
    id: "what-are-mushrooms",
    title: "What are Mushrooms? The Fungi Kingdom Overview",
    category: "Mycology Basics",
    readTime: "5 min read",
    complexity: "Basic",
    content: (
      <div className="space-y-6 text-base font-semibold text-gray-805 leading-relaxed">
        <p>
          In biological taxonomy, mushrooms do not belong to the plant kingdom, nor do they belong to the animal kingdom. Instead, they occupy their own distinct classification: the <strong>Kingdom Fungi</strong>. Unlike plants that utilize photosynthesis to synthesize carbohydrates from carbon dioxide and sunlight, fungi are heterotrophic. They must absorb nutrients from external organic substrates.
        </p>

        <h3 className="text-gray-950 font-display text-lg md:text-xl font-bold pt-4 border-b border-gray-100 pb-2">Key Characteristics of Fungi</h3>
        <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base font-bold text-gray-800">
          <li><strong>Cellular Composition:</strong> Fungal cell walls are composed of chitin, the same tough polysaccharide found in the shells of crabs and insects, whereas plant cell walls are made of cellulose.</li>
          <li><strong>Digestion:</strong> Mushrooms perform extracellular digestion, secreting enzymes into their surroundings to break down complex molecules like lignin and cellulose, and then absorbing the simple sugars.</li>
          <li><strong>Reproduction:</strong> Mushrooms release microscopic, single-celled haploid spores rather than multi-cellular seeds.</li>
        </ul>

        <div className="bg-[#f5f3ef]/50 border border-[#e6e4dc] p-6 rounded-2xl mt-6">
          <h4 className="text-[#4e8c4a] font-display font-bold text-xs uppercase flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4" /> Did You Know?
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-gray-700 leading-relaxed">
            Fungi are closer genetic relatives to animals than they are to plants! Under molecular sequencing, fungal DNA shares similar genetic evolutionary markers with mammalian cell structures.
          </p>
        </div>
      </div>
    ),
  },
  "mycelium": {
    id: "mycelium",
    title: "Mycelium: The Underground Biosphere Network",
    category: "Mycelial Biology",
    readTime: "8 min read",
    complexity: "Intermediate",
    content: (
      <div className="space-y-6 text-base font-semibold text-gray-855 leading-relaxed">
        <p>
          Mycelium is the true vegetative living body of the fungus, consisting of a massive, branching network of tubular filaments called <strong>hyphae</strong>. While the mushroom above the surface is a temporary reproductive construct, the mycelium network beneath the soil lives indefinitely, spreading across miles and consuming organic matter.
        </p>

        <h3 className="text-gray-950 font-display text-lg md:text-xl font-bold pt-4 border-b border-gray-100 pb-2">The Mycelial Communications Grid</h3>
        <p>
          Ecologist Suzanne Simard coined the term &quot;Wood Wide Web&quot; to describe how mycorrhizal mycelial networks form symbiotic connections with tree root systems. Through this biological connection:
        </p>
        <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base font-bold text-gray-800">
          <li>Trees send surplus photosynthesized sugars (carbon) down to the mycelium network.</li>
          <li>In return, the mycelium distributes absorbed nitrogen, phosphorus, and moisture back to the trees.</li>
          <li>If a tree is attacked by insect pests, it sends chemical warning signals through the mycelial network, prompting neighboring trees to trigger defensive tannin responses before the pests arrive.</li>
        </ul>

        <div className="bg-emerald-50/40 border border-emerald-100 p-6 rounded-2xl mt-6">
          <h4 className="text-emerald-800 font-display font-bold text-xs uppercase mb-1">Decentralized Resilience</h4>
          <p className="text-xs sm:text-sm font-semibold text-emerald-800 leading-relaxed">
            A mycelium network lacks a brain or master node. Every branch tip behaves autonomously, responding to moisture and nutrient gradients, demonstrating organic swarm intelligence.
          </p>
        </div>
      </div>
    ),
  },
  "biological-efficiency": {
    id: "biological-efficiency",
    title: "Understanding the Biological Efficiency (BE) Formula",
    category: "Commercial Economics",
    readTime: "5 min read",
    complexity: "Intermediate",
    content: (
      <div className="space-y-6 text-base font-semibold text-gray-805 leading-relaxed">
        <p>
          In commercial mushroom cultivation, yield cannot be calculated using simple surface area equations. Instead, mycologists use a standard metric called <strong>Biological Efficiency (BE)</strong> to evaluate how productively a mushroom strain converts substrate mass into edible mushroom harvests.
        </p>

        <h3 className="text-gray-950 font-display text-lg md:text-xl font-bold pt-4 border-b border-gray-100 pb-2">The Mathematical Equation</h3>
        <p>
          Biological Efficiency is calculated by dividing the total weight of fresh mushrooms harvested by the total dry weight of the substrate block used, multiplied by 100.
        </p>

        <div className="bg-[#f5f3ef]/50 border border-[#e6e4dc] p-6 rounded-2xl text-center space-y-3 my-6">
          <span className="text-[10px] text-gray-400 font-mono uppercase block font-bold">LaTeX Standard Calculation Formula</span>
          <div className="text-gray-900 text-sm md:text-base font-mono overflow-x-auto py-2">
            {"\\(\\text{Biological Efficiency (\\%)} = \\frac{\\text{Weight of Fresh Mushrooms Harvested}}{\\text{Dry Weight of Substrate Block}} \\times 100\\)"}
          </div>
        </div>

        <p>
          A Biological Efficiency rating of 100% means that 1 pound of fresh mushrooms is harvested from 1 pound of dry substrate. Different substrates and species combinations yield different BE ratings.
        </p>
      </div>
    ),
  },
};

interface PageProps {
  params: Promise<{ article: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { article } = await params;
  const detail = ARTICLE_DETAILS[article];

  const isFallback = !detail;
  const displayTitle = isFallback
    ? article.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : detail.title;

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-luxury-beige pt-24 min-h-screen">
        
        {/* Banner Area - unique grey panel block */}
        <section className="bg-luxury-stone border border-[#e6e4dc]/70 p-8 rounded-[2rem] max-w-4xl mx-auto my-6 space-y-4 shadow-luxury relative">
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-1.5 text-[10px] text-[#4e8c4a] font-mono uppercase tracking-widest hover:text-[#3c6d39] hover:underline relative z-10 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Knowledge Center
          </Link>
          
          <div className="flex justify-between items-center text-xs font-mono relative z-10">
            <span className="text-[#4e8c4a] uppercase font-black">{!isFallback ? detail.category : "Mycology Study"}</span>
            <span className="text-gray-400 font-bold">{!isFallback ? detail.readTime : "6 min read"}</span>
          </div>

          <h1 className="font-display text-2xl md:text-3xl font-black tracking-tight leading-tight relative z-10 bg-gradient-to-r from-gray-950 via-[#4e8c4a] to-emerald-700 bg-clip-text text-transparent">
            {displayTitle}
          </h1>
        </section>

        {/* Content Area */}
        <section className="py-8 px-6 max-w-4xl mx-auto pb-24">
          <div className="bg-white border border-[#e6e4dc]/70 rounded-[2.5rem] p-8 md:p-14 shadow-luxury">
            {!isFallback ? (
              detail.content
            ) : (
              <div className="space-y-6 text-sm sm:text-base font-semibold text-gray-800 leading-relaxed">
                <p>
                  This article explores the technical parameters, biological components, and laboratory protocols involved in <strong>{displayTitle}</strong>.
                </p>
                <p>
                  Mycological crop production requires sterile technique, temperature controls, and moisture containment. Maintaining aseptic handling protocols under Laminar Air Flow is highly critical.
                </p>
              </div>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return [
    { article: "what-are-mushrooms" },
    { article: "mycelium" },
    { article: "spores" },
    { article: "spawn" },
    { article: "biological-efficiency" },
    { article: "substrate" },
    { article: "contamination" },
    { article: "sterilization" },
  ];
}
