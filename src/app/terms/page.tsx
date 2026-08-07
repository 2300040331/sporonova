import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Shield, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms of Service | SporoNova - Certified Spawn Multiplication Platform",
  description: "Terms and conditions governing the purchase, biosecurity compliance, and distribution of SporoNova certified mushroom spawn products.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#f9faf7] pt-28 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[10px] text-[#4e8c4a] font-mono uppercase tracking-widest hover:underline font-bold mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          {/* Header */}
          <div className="bg-white border border-[#e6e4dc] p-8 md:p-12 rounded-[2rem] shadow-sm mb-10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f9faf7] border border-[#e6e4dc] flex items-center justify-center text-[#4e8c4a]">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-[10px] text-[#4e8c4a] font-mono uppercase tracking-widest block font-extrabold">
              Legal & Compliance Framework
            </span>
            <h1 className="text-[#1c3c24] font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Terms of Service
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
              Last updated: August 2026. Please read these terms carefully before placing orders or utilizing SporoNova biological inoculants, mother cultures, or cultivation services.
            </p>
          </div>

          {/* Document Content */}
          <div className="bg-white border border-[#e6e4dc] p-8 md:p-12 rounded-[2rem] shadow-sm space-y-10 text-gray-600 text-xs sm:text-sm font-medium leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-[#1c3c24] font-display text-lg sm:text-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#4e8c4a]" /> 1. Acceptance of Terms
              </h2>
              <p>
                By accessing SporoNova websites, placing an inquiry, or completing a purchase of mushroom spawn products (including liquid spawn broth, grain spawn bags, mother cultures, or ready-to-fruit kits), you agree to be bound by these Terms of Service and applicable biosecurity standards.
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-gray-100">
              <h2 className="text-[#1c3c24] font-display text-lg sm:text-xl font-bold flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#4e8c4a]" /> 2. Biological Quality & Guarantee
              </h2>
              <p>
                SporoNova guarantees that all G0, G1, and G2 spawn items dispatched from our Class 100 HEPA laminar flow cleanrooms undergo strict microscopic micro-verification and agar purity plating prior to release.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
                <li>Visual inspect bags/slants immediately upon cold-chain delivery.</li>
                <li>Report any delivery transit damage or packaging breach within 48 hours of receipt.</li>
                <li>Store products strictly within the required temperature envelope (2°C - 4°C for liquid & grain spawn).</li>
              </ul>
            </section>

            <section className="space-y-3 pt-6 border-t border-gray-100">
              <h2 className="text-[#1c3c24] font-display text-lg sm:text-xl font-bold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#4e8c4a]" /> 3. Biosecurity & Intellectual Property
              </h2>
              <p>
                Genomic strain isolates, proprietary liquid nutrient formulations, and mother culture lines provided by SporoNova remain intellectual property of SporoNova or licensed agricultural partners. Uncertified re-duplication (G3+ multi-generation dilution) for commercial redistribution is strictly discouraged due to genetic drift and contamination risks.
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-gray-100">
              <h2 className="text-[#1c3c24] font-display text-lg sm:text-xl font-bold">
                4. Orders & Shipping Logistics
              </h2>
              <p>
                Because live mycelial cultures require refrigerated transport, shipping schedules are dependent on regional cold-chain availability. SporoNova reserves the right to adjust dispatch dates to ensure safe weather and transport conditions.
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-gray-100">
              <h2 className="text-[#1c3c24] font-display text-lg sm:text-xl font-bold">
                5. Contact & Institutional Inquiries
              </h2>
              <p>
                For official institutional contracts, state horticulture projects, or dispute resolutions, please contact our support team at <a href="mailto:support@sporonova.com" className="text-[#4e8c4a] underline font-bold">support@sporonova.com</a> or via direct phone inquiry at +91 7207208419.
              </p>
            </section>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
