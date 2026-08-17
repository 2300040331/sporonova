"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms-context";
import ImageUploadDropzone from "@/components/admin/ImageUploadDropzone";
import BrandingSectionStylesControls from "@/components/admin/BrandingSectionStylesControls";
import { 
  Save, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Compass, 
  FlaskConical, 
  Award, 
  Users, 
  BookOpen,
  HelpCircle,
  TrendingUp,
  Sliders,
  Image as ImageIcon,
  CheckSquare
} from "lucide-react";

export default function AboutUsCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "intro" | "journey" | "science" | "whyChoose" | "process" | "techBadges" | "quality" | "partners" | "gallery"
  >("intro");

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
    whyChooseCards: [],
    processSteps: [],
    techBadges: [],
    aboutGallery: [],
  });

  useEffect(() => {
    if (data?.about) {
      setAboutForm({
        ...data.about,
        heroTitle: data.about.heroTitle || "",
        heroSubtitle: data.about.heroSubtitle || "",
        whoWeAreTitle: data.about.whoWeAreTitle || "",
        whoWeAreParagraph1: data.about.whoWeAreParagraph1 || "",
        whoWeAreParagraph2: data.about.whoWeAreParagraph2 || "",
        whoWeAreImage: data.about.whoWeAreImage || "",
        journeySteps: data.about.journeySteps || [],
        scienceCards: data.about.scienceCards || [],
        qualityCards: data.about.qualityCards || [],
        partnershipCards: data.about.partnershipCards || [],
        whyChooseCards: data.about.whyChooseCards || [],
        processSteps: data.about.processSteps || [],
        techBadges: data.about.techBadges || [],
        aboutGallery: data.about.aboutGallery || [],
      });
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSave = async () => {
    // Optimistic instantly-visible save feedback for lightning fast UX
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);

    setSaving(true);
    // Keep fields that are not on the current editor tab (for example, vision
    // and mission) instead of silently removing them when About is saved.
    const success = await updateData({ about: { ...data.about, ...aboutForm } });
    setSaving(false);
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
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">About Us CMS Editor</h1>
          <p className="text-xs text-gray-650 mt-1 font-medium">
            Customize every section, heading, metric, list item, and image displayed on the About Us page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> About Page Saved Live!
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Revert About Page changes to current saved state?")) {
                if (data?.about) {
                  setAboutForm({
                    ...data.about,
                    heroTitle: data.about.heroTitle || "",
                    heroSubtitle: data.about.heroSubtitle || "",
                    whoWeAreTitle: data.about.whoWeAreTitle || "",
                    whoWeAreParagraph1: data.about.whoWeAreParagraph1 || "",
                    whoWeAreParagraph2: data.about.whoWeAreParagraph2 || "",
                    whoWeAreImage: data.about.whoWeAreImage || "",
                    journeySteps: data.about.journeySteps || [],
                    scienceCards: data.about.scienceCards || [],
                    qualityCards: data.about.qualityCards || [],
                    partnershipCards: data.about.partnershipCards || [],
                    whyChooseCards: data.about.whyChooseCards || [],
                    processSteps: data.about.processSteps || [],
                    techBadges: data.about.techBadges || [],
                    aboutGallery: data.about.aboutGallery || [],
                  });
                }
              }
            }}
            className="px-5 py-3 border border-[#dce4da] hover:bg-[#f0f5ef] text-[#2c5e37] font-bold text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer font-sans"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save About Changes
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap items-center gap-1 bg-[#f0f5ef] border border-[#d2e4d0] p-2 rounded-2xl">
        {[
          { id: "intro", label: "Intro & Hero", icon: BookOpen },
          { id: "journey", label: "Timeline Journey", icon: Compass },
          { id: "science", label: "Our Science", icon: FlaskConical },
          { id: "whyChoose", label: "Why Choose Us", icon: HelpCircle },
          { id: "process", label: "Our Process", icon: Sliders },
          { id: "techBadges", label: "Tech Showcase", icon: CheckSquare },
          { id: "quality", label: "Quality Assurance", icon: Award },
          { id: "partners", label: "Partnerships", icon: Users },
          { id: "gallery", label: "Photo Gallery", icon: ImageIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#1c3c24] text-white shadow-sm font-bold"
                  : "text-[#2d5034] hover:bg-white/50 hover:text-[#1c3c24]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label} ({aboutForm[tab.id === "intro" ? "aboutGallery" : tab.id === "whyChoose" ? "whyChooseCards" : tab.id === "process" ? "processSteps" : tab.id === "techBadges" ? "techBadges" : tab.id === "gallery" ? "aboutGallery" : tab.id + "Cards"]?.length || aboutForm[tab.id + "Steps"]?.length || 0})
            </button>
          );
        })}
      </div>

      {/* TAB 1: HERO & WHO WE ARE */}
      {activeTab === "intro" && (
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-6 shadow-sm">
          <h2 className="text-base font-bold text-[#1c3c24] border-b border-[#e2e8e0] pb-3">Hero & Header Content</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
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
              <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
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

          <h2 className="text-base font-bold text-[#1c3c24] border-b border-[#e2e8e0] pb-3 pt-4">Who We Are Section</h2>

          <div>
            <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={aboutForm.whoWeAreTitle || ""}
              onChange={(e) => setAboutForm({ ...aboutForm, whoWeAreTitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
              First Paragraph
            </label>
            <textarea
              rows={3}
              value={aboutForm.whoWeAreParagraph1 || ""}
              onChange={(e) => setAboutForm({ ...aboutForm, whoWeAreParagraph1: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
              Second Paragraph
            </label>
            <textarea
              rows={3}
              value={aboutForm.whoWeAreParagraph2 || ""}
              onChange={(e) => setAboutForm({ ...aboutForm, whoWeAreParagraph2: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
            />
          </div>

          <div>
            <ImageUploadDropzone
              label="Who We Are Section Image"
              value={aboutForm.whoWeAreImage || ""}
              onChange={(url) => setAboutForm({ ...aboutForm, whoWeAreImage: url })}
              requiredWidth={1200}
              requiredHeight={800}
            />
          </div>
        </div>
      )}

      {/* TAB 2: JOURNEY TIMELINE */}
      {activeTab === "journey" && (
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#1c3c24]">The SporoNova Journey (Timeline Steps)</h2>
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
              <div key={index} className="bg-[#f8faf7] border border-[#e2e8e0] p-4 rounded-2xl space-y-3 relative">
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
                    className="text-red-505 hover:text-red-750 p-2 rounded-lg hover:bg-red-50 cursor-pointer"
                    title="Delete step"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
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
              <h2 className="text-base font-bold text-[#1c3c24]">Our Science (Technology Cards)</h2>
              <p className="text-xs text-gray-500 font-medium">Manage the technical microbiology cards on the About page.</p>
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

      {/* TAB 4: WHY CHOOSE US (BENTO GRID) */}
      {activeTab === "whyChoose" && (
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#1c3c24]">Why SporoNova (Bento Cards)</h2>
              <p className="text-xs text-gray-500 font-medium">Manage the 8 core bento grid blocks explaining benefits.</p>
            </div>
            <button
              onClick={() => addArrayItem("whyChooseCards", {
                title: "New Value Proposition",
                description: "Describe the benefit details here..."
              })}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1c3c24] hover:bg-[#2c5e37] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Benefit Card
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aboutForm.whyChooseCards?.map((card: any, index: number) => (
              <div key={index} className="bg-[#f8faf7] border border-[#e2e8e0] p-4 rounded-2xl space-y-3 relative">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-[#2c5e37] uppercase font-bold">
                    Benefit Card 0{index + 1}
                  </span>
                  <button
                    onClick={() => removeArrayItem("whyChooseCards", index)}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] text-[#2c5e37] uppercase font-mono font-bold mb-1">Title</label>
                  <input
                    type="text"
                    value={card.title || ""}
                    onChange={(e) => updateArrayItem("whyChooseCards", index, "title", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#2c5e37] uppercase font-mono font-bold mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={card.description || ""}
                    onChange={(e) => updateArrayItem("whyChooseCards", index, "description", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: OUR PROCESS */}
      {activeTab === "process" && (
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#1c3c24]">Our Process (Timeline Steps)</h2>
              <p className="text-xs text-gray-500 font-medium">Manage the horizontal scrolling steps for spawn dispatching.</p>
            </div>
            <button
              onClick={() => addArrayItem("processSteps", {
                stepNumber: (aboutForm.processSteps?.length || 0) + 1,
                title: "New Process Step",
                description: "Describe this stage in detail..."
              })}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1c3c24] hover:bg-[#2c5e37] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Process Step
            </button>
          </div>

          <div className="space-y-4">
            {aboutForm.processSteps?.map((step: any, index: number) => (
              <div key={index} className="bg-[#f8faf7] border border-[#e2e8e0] p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 w-full">
                    <span className="w-8 h-8 rounded-full bg-[#1c3c24] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {step.stepNumber || index + 1}
                    </span>
                    <input
                      type="text"
                      value={step.title || ""}
                      onChange={(e) => updateArrayItem("processSteps", index, "title", e.target.value)}
                      placeholder="Step Title"
                      className="w-full px-3 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                    />
                  </div>
                  <button
                    onClick={() => removeArrayItem("processSteps", index)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <textarea
                    rows={2}
                    value={step.description || ""}
                    onChange={(e) => updateArrayItem("processSteps", index, "description", e.target.value)}
                    placeholder="Describe step details..."
                    className="w-full px-3 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: TECH SHOWCASE BADGES */}
      {activeTab === "techBadges" && (
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#1c3c24]">Tools of Innovation (Technology Badges)</h2>
              <p className="text-xs text-gray-500 font-medium">Manage floating tags shown in the dynamic tech circle.</p>
            </div>
            <button
              onClick={() => addArrayItem("techBadges", {
                label: "New Technology Tag"
              })}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1c3c24] hover:bg-[#2c5e37] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Tag Badge
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {aboutForm.techBadges?.map((badge: any, index: number) => (
              <div key={index} className="bg-[#f8faf7] border border-[#e2e8e0] p-4 rounded-xl flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={badge.label || ""}
                  onChange={(e) => updateArrayItem("techBadges", index, "label", e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                />
                <button
                  onClick={() => removeArrayItem("techBadges", index)}
                  className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: QUALITY & ACCREDITATION */}
      {activeTab === "quality" && (
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#1c3c24]">Quality Assurance & Certifications</h2>
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

      {/* TAB 8: PARTNERSHIPS */}
      {activeTab === "partners" && (
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#1c3c24]">Partnerships & Collaborations</h2>
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

      {/* TAB 9: GALLERY */}
      {activeTab === "gallery" && (
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#1c3c24]">About Gallery (Masonry Pictures)</h2>
              <p className="text-xs text-gray-500 font-medium">Manage images and hover descriptions inside the gallery.</p>
            </div>
            <button
              onClick={() => addArrayItem("aboutGallery", {
                url: "/about_header.jpg",
                title: "New Gallery Picture"
              })}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1c3c24] hover:bg-[#2c5e37] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Photo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aboutForm.aboutGallery?.map((img: any, index: number) => (
              <div key={index} className="bg-[#f8faf7] border border-[#e2e8e0] p-4 rounded-2xl space-y-3 flex gap-4">
                <img
                  src={img.url || "/about_header.jpg"}
                  alt={img.title}
                  className="w-20 h-20 object-cover rounded-xl border border-gray-200 bg-white"
                />
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#2c5e37] uppercase font-bold">Image #{index + 1}</span>
                    <button
                      onClick={() => removeArrayItem("aboutGallery", index)}
                      className="text-red-500 hover:text-red-750 p-1 rounded-lg hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <ImageUploadDropzone
                      label="Gallery Image Photo"
                      value={img.url || ""}
                      onChange={(url) => updateArrayItem("aboutGallery", index, "url", url)}
                      requiredWidth={800}
                      requiredHeight={600}
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-[#2c5e37] uppercase">Picture Caption / Hover Title</label>
                    <input
                      type="text"
                      value={img.title || ""}
                      onChange={(e) => updateArrayItem("aboutGallery", index, "title", e.target.value)}
                      className="w-full px-2 py-1 bg-white border border-[#dce4da] rounded-lg text-[#1c3c24] text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <BrandingSectionStylesControls
        sectionName="About Page Sections"
        styles={aboutForm.styles}
        onChange={(newStyles) => setAboutForm({ ...aboutForm, styles: newStyles })}
      />
    </div>
  );
}
