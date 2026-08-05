import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lock, Eye, ShieldCheck, ArrowLeft, Database, Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | SporoNova - Certified Spawn Multiplication Platform",
  description: "Privacy Policy detailing how SporoNova handles, secures, and protects customer, institution, and farmer data.",
};

export default function PrivacyPage() {
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
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-[10px] text-[#4e8c4a] font-mono uppercase tracking-widest block font-extrabold">
              Data Governance & Transparency
            </span>
            <h1 className="text-[#1c3c24] font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
              Last updated: August 2026. SporoNova is committed to safeguarding the privacy and biosecurity records of our farming partners, commercial clients, and institutional researchers.
            </p>
          </div>

          {/* Document Content */}
          <div className="bg-white border border-[#e6e4dc] p-8 md:p-12 rounded-[2rem] shadow-sm space-y-10 text-gray-600 text-xs sm:text-sm font-medium leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-[#1c3c24] font-display text-lg sm:text-xl font-bold flex items-center gap-2">
                <Database className="w-5 h-5 text-[#4e8c4a]" /> 1. Information We Collect
              </h2>
              <p>
                When you interact with SporoNova (via order inquiries, training enrollment, or contact forms), we collect:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
                <li>Contact details: Name, phone number, physical farm/facility address, and email.</li>
                <li>Order parameters: Mushroom strain preferences, spawn quantity requirements, and target dispatch dates.</li>
                <li>Technical interaction data: Basic anonymized website analytics to improve user experience.</li>
              </ul>
            </section>

            <section className="space-y-3 pt-6 border-t border-gray-100">
              <h2 className="text-[#1c3c24] font-display text-lg sm:text-xl font-bold flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#4e8c4a]" /> 2. How Information is Used
              </h2>
              <p>
                Your information is exclusively used for order fulfillment, cold-chain transport arrangement, biological purity certifications, and providing agricultural consultation support. We never sell, rent, or commercialize your personal data to third parties.
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-gray-100">
              <h2 className="text-[#1c3c24] font-display text-lg sm:text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#4e8c4a]" /> 3. Data Security & Storage
              </h2>
              <p>
                All institutional contracts and farmer order logs are encrypted and stored in secure cloud systems. Access is restricted to authorized SporoNova logistics and technical officers.
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-gray-100">
              <h2 className="text-[#1c3c24] font-display text-lg sm:text-xl font-bold flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#4e8c4a]" /> 4. Data Rights & Enquiries
              </h2>
              <p>
                You may request access to, correction of, or deletion of your contact records at any time by contacting our data privacy desk at <a href="mailto:privacy@sporonova.com" className="text-[#4e8c4a] underline font-bold">privacy@sporonova.com</a>.
              </p>
            </section>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
