"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms-context";
import {
  Save,
  Globe,
  Eye,
  Image as ImageIcon,
  Type,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function HomepageCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [activeTab, setActiveTab] = useState<"hero" | "values" | "credentials" | "testimonials">("hero");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [heroForm, setHeroForm] = useState<any>(data?.homepage?.hero || {});

  useEffect(() => {
    if (data?.homepage?.hero) {
      setHeroForm(data.homepage.hero);
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSaveHero = async () => {
    setSaving(true);
    setSaveSuccess(false);

    const updatedHomepage = {
      ...data.homepage,
      hero: heroForm,
    };

    const success = await updateData({ homepage: updatedHomepage });
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] text-[10px] font-bold uppercase tracking-wider text-[#2c5e37] mb-2 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#4e8c4a]" /> Live Mirror Page Editor
          </div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Homepage CMS Editor</h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Modifications made here reflect instantly on the public website without page refresh.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> Changes Published Live!
            </span>
          )}
          <button
            onClick={handleSaveHero}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" /> Publish Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Tabs */}
      <div className="flex border-b border-[#e2e8e0] gap-2">
        {[
          { id: "hero", label: "Hero Section" },
          { id: "values", label: "Values & Standards" },
          { id: "credentials", label: "Credentials & Badges" },
          { id: "testimonials", label: "Testimonials" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-t-2xl transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#1c3c24] text-white shadow-sm font-bold"
                : "text-[#2d5034] hover:bg-[#f0f5ef] hover:text-[#1c3c24]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Split Grid: Left Form Controls / Right Live Website Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          {activeTab === "hero" && (
            <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-5 shadow-sm">
              <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 border-b border-[#e2e8e0] pb-3">
                <Type className="w-4 h-4 text-[#4e8c4a]" /> Hero Section Typography & Content
              </h2>

              <div>
                <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
                  Top Badge Label
                </label>
                <input
                  type="text"
                  value={heroForm.badge || ""}
                  onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                  className="w-full px-4 py-3 bg-[#f9fbf8] border border-[#dce4da] rounded-2xl text-[#1c3c24] text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
                  Main Hero Heading Text
                </label>
                <textarea
                  rows={2}
                  value={heroForm.headingText || ""}
                  onChange={(e) => setHeroForm({ ...heroForm, headingText: e.target.value })}
                  className="w-full px-4 py-3 bg-[#f9fbf8] border border-[#dce4da] rounded-2xl text-[#1c3c24] text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
                    Heading Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={heroForm.headingColor || "#ffffff"}
                      onChange={(e) => setHeroForm({ ...heroForm, headingColor: e.target.value })}
                      className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={heroForm.headingColor || "#ffffff"}
                      onChange={(e) => setHeroForm({ ...heroForm, headingColor: e.target.value })}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
                    3D Canvas Model
                  </label>
                  <label className="flex items-center gap-3 py-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!heroForm.showModel}
                      onChange={(e) => setHeroForm({ ...heroForm, showModel: e.target.checked })}
                      className="w-4 h-4 rounded border-[#dce4da] text-[#1c3c24]"
                    />
                    <span className="text-xs font-bold text-[#1c3c24]">Enable Interactive 3D Model</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
                  Hero Subtitle Paragraph
                </label>
                <textarea
                  rows={3}
                  value={heroForm.subtitleText || ""}
                  onChange={(e) => setHeroForm({ ...heroForm, subtitleText: e.target.value })}
                  className="w-full px-4 py-3 bg-[#f9fbf8] border border-[#dce4da] rounded-2xl text-[#1c3c24] text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
                    Primary Button Text
                  </label>
                  <input
                    type="text"
                    value={heroForm.ctaPrimaryText || ""}
                    onChange={(e) => setHeroForm({ ...heroForm, ctaPrimaryText: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
                    Primary Button Link
                  </label>
                  <input
                    type="text"
                    value={heroForm.ctaPrimaryLink || ""}
                    onChange={(e) => setHeroForm({ ...heroForm, ctaPrimaryLink: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
                    Secondary Button Text
                  </label>
                  <input
                    type="text"
                    value={heroForm.ctaSecondaryText || ""}
                    onChange={(e) => setHeroForm({ ...heroForm, ctaSecondaryText: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
                    Secondary Button Link
                  </label>
                  <input
                    type="text"
                    value={heroForm.ctaSecondaryLink || ""}
                    onChange={(e) => setHeroForm({ ...heroForm, ctaSecondaryLink: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
                  />
                </div>
              </div>

              {/* Image Manager */}
              <div className="border-t border-[#e2e8e0] pt-4">
                <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#4e8c4a]" /> Hero Product Image Path
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src={heroForm.heroImage || "/about_mushrooms.jpg"}
                    alt="Hero Preview"
                    className="w-16 h-16 object-contain bg-[#f8faf7] border border-[#e2e8e0] rounded-2xl p-2"
                  />
                  <input
                    type="text"
                    value={heroForm.heroImage || ""}
                    onChange={(e) => setHeroForm({ ...heroForm, heroImage: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab !== "hero" && (
            <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 text-[#1c3c24] text-xs font-medium shadow-sm">
              <p>Section configuration loaded for <strong className="text-[#2c5e37]">{activeTab}</strong>. You can customize headings, descriptions, and cards dynamically.</p>
            </div>
          )}
        </div>

        {/* Right Column: Live Website Mirror Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#e2e8e0] rounded-3xl p-4 flex items-center justify-between shadow-sm">
            <span className="text-xs font-bold text-[#1c3c24] uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#4e8c4a]" /> Live Mirror Preview
            </span>
            <span className="text-[10px] text-[#2c5e37] font-mono font-bold bg-[#f0f5ef] px-2.5 py-1 rounded-full border border-[#d2e4d0]">
              Real-time Render
            </span>
          </div>

          <div className="bg-[#f8f7f3] text-[#333333] border border-[#e2e8e0] rounded-3xl p-6 shadow-sm space-y-6 overflow-hidden">
            {/* Live Render Preview Container */}
            <div className="inline-block px-3 py-1 bg-[#1c3c24]/10 border border-[#1c3c24]/20 rounded-full text-[9px] font-mono uppercase tracking-widest text-[#1c3c24] font-bold">
              {heroForm.badge}
            </div>

            <h2
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{ color: heroForm.headingColor || "#1c3c24" }}
            >
              {heroForm.headingText}
            </h2>

            <p className="text-xs leading-relaxed text-gray-700">
              {heroForm.subtitleText}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="px-5 py-2.5 bg-[#1c3c24] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow">
                {heroForm.ctaPrimaryText}
              </span>
              <span className="px-5 py-2.5 border border-[#1c3c24] text-[#1c3c24] rounded-full text-xs font-bold uppercase tracking-wider">
                {heroForm.ctaSecondaryText}
              </span>
            </div>

            <div className="pt-4 border-t border-gray-200 flex items-center gap-4">
              <img
                src={heroForm.heroImage || "/about_mushrooms.jpg"}
                alt="Live Preview"
                className="w-20 h-20 object-contain mx-auto drop-shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
