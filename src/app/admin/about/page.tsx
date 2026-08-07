"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms-context";
import { 
  Save, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Compass, 
  FlaskConical, 
  Award, 
  Users, 
  BookOpen 
} from "lucide-react";

export default function AboutUsCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"intro" | "journey" | "science" | "quality" | "partners">("intro");

  const [aboutForm, setAboutForm] = useState<any>({
    heroTitle: "",
    heroSubtitle: "",
    whoWeAreTitle: "",
    whoWeAreParagraph1: "",
    whoWeAreParagraph2: "",
    whoWeAreImage: "",
    journeySteps: [],
    scienceCards: [],
    qualityCards: [],
    partnershipCards: [],
  });

  useEffect(() => {
    if (data?.about) {
      setAboutForm({
        heroTitle: data.about.heroTitle || "",
        heroSubtitle: data.about.heroSubtitle || "",
        whoWeAreTitle: data.about.whoWeAreTitle || "",
        whoWeAreParagraph1: data.about.whoWeAreParagraph1 || "",
        whoWeAreParagraph2: data.about.whoWeAreParagraph2 || "",
        whoWeAreImage: data.about.whoWeAreImage || "",
        journeySteps: data.about.journeySteps || [
          { stepNumber: 1, title: "Research Begins", description: "Started with a vision to modernize mushroom cultivation through scientific methods" },
          { stepNumber: 2, title: "Laboratory Development", description: "Established GMP-compliant cleanroom facilities with advanced biological protocols" },
          { stepNumber: 3, title: "Advanced Liquid Spawn Technology", description: "Pioneered liquid spawn broth technology for faster colonization" },
          { stepNumber: 4, title: "Commercial Production", description: "Scaled operations to serve commercial farmers across multiple states" },
          { stepNumber: 5, title: "Government Collaborations", description: "Partnered with JICA, NHB, and state horticulture departments" },
          { stepNumber: 6, title: "National Expansion", description: "Expanded distribution network to 200+ farmers across India" },
          { stepNumber: 7, title: "Future Global Growth", description: "Building next-generation spawn solutions with AI-powered quality control" },
        ],
        scienceCards: data.about.scienceCards || [
          { id: "sci-1", title: "Pure Mycelium Culture", description: "Isolated on sterile agar media slants and verified through phase contrast microscopic analysis for complete genetic authenticity.", badge: "Verified Standard" },
          { id: "sci-2", title: "Liquid Spawn Technology", description: "Active vegetative mycelium suspended in sterile liquid broth, engineered for 4x faster substrate colonization.", badge: "Verified Standard" },
          { id: "sci-3", title: "Genetic Stability", description: "Multi-generation testing and strain preservation prevent genetic degeneration across commercial multiplication cycles.", badge: "Verified Standard" },
          { id: "sci-4", title: "Laboratory Verification", description: "Rigorous quality inspection including microscopic sectoring checks and bio-efficiency purity validation.", badge: "Verified Standard" },
          { id: "sci-5", title: "Contamination Control", description: "Class 100 HEPA-filtered cleanrooms equipped with positive atmospheric pressure and continuous UV sterilization.", badge: "Verified Standard" },
          { id: "sci-6", title: "Cold Chain Storage", description: "Strict temperature-regulated cold chain distribution maintains mycelial dormancy until direct farm inoculation.", badge: "Verified Standard" },
        ],
        qualityCards: data.about.qualityCards || [
          { title: "GMP Laboratory", description: "Good Manufacturing Practice compliant facility ensuring contamination-free production" },
          { title: "ISO Standards", description: "International quality management standards across all processes" },
          { title: "DMR Certification", description: "Directorate of Mushroom Research validated protocols" },
          { title: "NHB Certification", description: "National Horticulture Board quality standards compliance" },
          { title: "Scientific Validation", description: "Rigorous strain verification and biological efficiency testing" },
        ],
        partnershipCards: data.about.partnershipCards || [
          { title: "Government Institutions", description: "Working with state horticulture departments and JICA for farmer empowerment programs." },
          { title: "Research Organizations", description: "Collaborating with ICAR-DMR and biotechnology research institutes." },
          { title: "Agricultural Universities", description: "Supplying research-grade cultures and training materials to academic institutions." },
          { title: "Farmer Cooperatives", description: "Supporting FPO formation and providing technical assistance to farming communities." },
          { title: "International Development Partners", description: "Partnering with global organizations for sustainable agricultural development." },
        ],
      });
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    const success = await updateData({ about: aboutForm });
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Helper functions for array updates
  const updateArrayItem = (key: string, index: number, field: string, value: any) => {
    const updated = [...(aboutForm[key] || [])];
    updated[index] = { ...updated[index], [field]: value };
    setAboutForm({ ...aboutForm, [key]: updated });
  };

  const addArrayItem = (key: string, newItem: any) => {
    const updated = [...(aboutForm[key] || []), newItem];
    setAboutForm({ ...aboutForm, [key]: updated });
  };

  const removeArrayItem = (key: string, index: number) => {
    const updated = (aboutForm[key] || []).filter((_: any, i: number) => i !== index);
    setAboutForm({ ...aboutForm, [key]: updated });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">About Us CMS Editor</h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Customize every text, timeline step, technology card, accreditation, and partnership on the About page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> About Page Saved Live!
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save All Changes
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-[#f0f5ef] border border-[#d2e4d0] p-2 rounded-2xl">
        <button
          onClick={() => setActiveTab("intro")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "intro" ? "bg-[#1c3c24] text-white shadow-sm" : "text-[#2d5034] hover:text-[#1c3c24]"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Hero & Who We Are
        </button>

        <button
          onClick={() => setActiveTab("journey")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "journey" ? "bg-[#1c3c24] text-white shadow-sm" : "text-[#2d5034] hover:text-[#1c3c24]"
          }`}
        >
          <Compass className="w-3.5 h-3.5" /> Journey Timeline ({aboutForm.journeySteps?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab("science")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "science" ? "bg-[#1c3c24] text-white shadow-sm" : "text-[#2d5034] hover:text-[#1c3c24]"
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5" /> Our Science ({aboutForm.scienceCards?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab("quality")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "quality" ? "bg-[#1c3c24] text-white shadow-sm" : "text-[#2d5034] hover:text-[#1c3c24]"
          }`}
        >
          <Award className="w-3.5 h-3.5" /> Quality & Accreditation ({aboutForm.qualityCards?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab("partners")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "partners" ? "bg-[#1c3c24] text-white shadow-sm" : "text-[#2d5034] hover:text-[#1c3c24]"
          }`}
        >
          <Users className="w-3.5 h-3.5" /> Partnerships ({aboutForm.partnershipCards?.length || 0})
        </button>
      </div>

      {/* TAB 1: HERO & WHO WE ARE */}
      {activeTab === "intro" && (
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1c3c24] border-b border-[#e2e8e0] pb-3">Hero & Header Content</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">
                Badge / Subtitle Tag
              </label>
              <input
                type="text"
                value={aboutForm.heroSubtitle || ""}
                onChange={(e) => setAboutForm({ ...aboutForm, heroSubtitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                placeholder="e.g. ABOUT SPORONOVA"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">
                Hero Main Title
              </label>
              <input
                type="text"
                value={aboutForm.heroTitle || ""}
                onChange={(e) => setAboutForm({ ...aboutForm, heroTitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                placeholder="Science and Commitment Behind Every Kernel"
              />
            </div>
          </div>

          <h2 className="text-lg font-bold text-white border-b border-white/10 pb-3 pt-4">Who We Are Section</h2>

          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">
              Who We Are Section Title
            </label>
            <input
              type="text"
              value={aboutForm.whoWeAreTitle || ""}
              onChange={(e) => setAboutForm({ ...aboutForm, whoWeAreTitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">
              First Paragraph
            </label>
            <textarea
              rows={3}
              value={aboutForm.whoWeAreParagraph1 || ""}
              onChange={(e) => setAboutForm({ ...aboutForm, whoWeAreParagraph1: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">
              Second Paragraph
            </label>
            <textarea
              rows={3}
              value={aboutForm.whoWeAreParagraph2 || ""}
              onChange={(e) => setAboutForm({ ...aboutForm, whoWeAreParagraph2: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">
              Section Image URL
            </label>
            <input
              type="text"
              value={aboutForm.whoWeAreImage || ""}
              onChange={(e) => setAboutForm({ ...aboutForm, whoWeAreImage: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono"
            />
          </div>
        </div>
      )}

      {/* TAB 2: JOURNEY TIMELINE */}
      {activeTab === "journey" && (
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#1c3c24]">The SporoNova Journey (Timeline Steps)</h2>
              <p className="text-xs text-gray-500 font-medium">Edit step titles and historical milestone descriptions.</p>
            </div>
            <button
              onClick={() => addArrayItem("journeySteps", {
                stepNumber: (aboutForm.journeySteps?.length || 0) + 1,
                title: "New Milestone",
                description: "Milestone details..."
              })}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1c3c24] hover:bg-[#2c5e37] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Timeline Step
            </button>
          </div>

          <div className="space-y-4">
            {aboutForm.journeySteps?.map((step: any, index: number) => (
              <div key={index} className="bg-[#f8faf7] border border-[#e2e8e0] p-4 rounded-2xl space-y-3 relative group">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 w-full">
                    <span className="w-8 h-8 rounded-full bg-[#1c3c24] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {step.stepNumber || index + 1}
                    </span>
                    <input
                      type="text"
                      value={step.title || ""}
                      onChange={(e) => updateArrayItem("journeySteps", index, "title", e.target.value)}
                      placeholder="Step Title"
                      className="w-full px-3 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                    />
                  </div>
                  <button
                    onClick={() => removeArrayItem("journeySteps", index)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 cursor-pointer"
                    title="Delete step"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <textarea
                    rows={2}
                    value={step.description || ""}
                    onChange={(e) => updateArrayItem("journeySteps", index, "description", e.target.value)}
                    placeholder="Milestone description..."
                    className="w-full px-3 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: OUR SCIENCE */}
      {activeTab === "science" && (
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#1c3c24]">Our Science (Technology Cards)</h2>
              <p className="text-xs text-gray-500 font-medium">Manage the 6 technical microbiology cards on the About page.</p>
            </div>
            <button
              onClick={() => addArrayItem("scienceCards", {
                title: "New Scientific Feature",
                description: "Feature description...",
                badge: "Verified Standard"
              })}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1c3c24] hover:bg-[#2c5e37] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Science Card
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aboutForm.scienceCards?.map((card: any, index: number) => (
              <div key={index} className="bg-[#f8faf7] border border-[#e2e8e0] p-4 rounded-2xl space-y-3 relative">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-[#2c5e37] uppercase font-bold">
                    Card 0{index + 1}
                  </span>
                  <button
                    onClick={() => removeArrayItem("scienceCards", index)}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] text-[#2c5e37] uppercase font-mono font-bold mb-1">Card Title</label>
                  <input
                    type="text"
                    value={card.title || ""}
                    onChange={(e) => updateArrayItem("scienceCards", index, "title", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#2c5e37] uppercase font-mono font-bold mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={card.description || ""}
                    onChange={(e) => updateArrayItem("scienceCards", index, "description", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: QUALITY & ACCREDITATION */}
      {activeTab === "quality" && (
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#1c3c24]">Quality Assurance & Certifications</h2>
              <p className="text-xs text-gray-500 font-medium">Manage GMP, ISO, DMR, and NHB compliance badges.</p>
            </div>
            <button
              onClick={() => addArrayItem("qualityCards", {
                title: "New Accreditation",
                description: "Certification details..."
              })}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1c3c24] hover:bg-[#2c5e37] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Accreditation
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aboutForm.qualityCards?.map((card: any, index: number) => (
              <div key={index} className="bg-[#f8faf7] border border-[#e2e8e0] p-4 rounded-2xl space-y-3 relative">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-[#2c5e37] uppercase font-bold">
                    Badge 0{index + 1}
                  </span>
                  <button
                    onClick={() => removeArrayItem("qualityCards", index)}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] text-[#2c5e37] uppercase font-mono font-bold mb-1">Accreditation Title</label>
                  <input
                    type="text"
                    value={card.title || ""}
                    onChange={(e) => updateArrayItem("qualityCards", index, "title", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#2c5e37] uppercase font-mono font-bold mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={card.description || ""}
                    onChange={(e) => updateArrayItem("qualityCards", index, "description", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PARTNERSHIPS */}
      {activeTab === "partners" && (
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#1c3c24]">Partnerships & Collaborations</h2>
              <p className="text-xs text-gray-500 font-medium">Edit government, ICAR-DMR, university, and cooperative partnerships.</p>
            </div>
            <button
              onClick={() => addArrayItem("partnershipCards", {
                title: "New Partner Category",
                description: "Partnership details..."
              })}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1c3c24] hover:bg-[#2c5e37] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Partnership Category
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aboutForm.partnershipCards?.map((card: any, index: number) => (
              <div key={index} className="bg-[#f8faf7] border border-[#e2e8e0] p-4 rounded-2xl space-y-3 relative">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-[#2c5e37] uppercase font-bold">
                    Partner 0{index + 1}
                  </span>
                  <button
                    onClick={() => removeArrayItem("partnershipCards", index)}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] text-[#2c5e37] uppercase font-mono font-bold mb-1">Institution Category</label>
                  <input
                    type="text"
                    value={card.title || ""}
                    onChange={(e) => updateArrayItem("partnershipCards", index, "title", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#2c5e37] uppercase font-mono font-bold mb-1">Collaboration Scope</label>
                  <textarea
                    rows={2}
                    value={card.description || ""}
                    onChange={(e) => updateArrayItem("partnershipCards", index, "description", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
