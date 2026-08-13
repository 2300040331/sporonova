"use client";

import React, { useEffect, useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { Search, Save, CheckCircle2, Globe } from "lucide-react";

export default function SeoCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [selectedRoute, setSelectedRoute] = useState<string>("home");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const defaultSeo = {
    metaTitle: "SporoNova | Premium Mushroom Spawn",
    metaDescription: "India's leading mushroom spawn manufacturer.",
    keywords: "mushroom spawn, liquid spawn",
    canonicalUrl: "https://sporonova.com/",
    ogImage: "/logo_transparent.png",
  };
  const [seoForm, setSeoForm] = useState(defaultSeo);

  useEffect(() => {
    if (data?.seo) {
      setSeoForm(data.seo[selectedRoute] || {
        ...defaultSeo,
        canonicalUrl: `https://sporonova.com/${selectedRoute === "home" ? "" : selectedRoute}`,
      });
    }
  }, [data, selectedRoute]);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSaveSeo = async () => {
    setSaving(true);
    const updatedSeoMap = {
      ...data.seo,
      [selectedRoute]: seoForm,
    };
    const success = await updateData({ seo: updatedSeoMap });
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">SEO Metadata & Schema Management</h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Configure Meta Titles, Meta Descriptions, Keywords, Canonical URLs, and OpenGraph social cards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> Meta Tags Published!
            </span>
          )}
          <button
            onClick={handleSaveSeo}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" /> Save SEO Settings
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex border-b border-[#e2e8e0] gap-2">
        {["home", "about", "process"].map((route) => (
          <button
            key={route}
            onClick={() => {
              setSelectedRoute(route);
            }}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-t-2xl transition-all cursor-pointer ${
              selectedRoute === route
                ? "bg-[#1c3c24] text-white shadow-sm font-bold"
                : "text-[#2d5034] hover:bg-[#f0f5ef] hover:text-[#1c3c24]"
            }`}
          >
            Route: /{route === "home" ? "" : route}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-4 shadow-sm">
          <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 border-b border-[#e2e8e0] pb-3">
            <Search className="w-4 h-4 text-[#4e8c4a]" /> Search Engine Meta Tags
          </h2>

          <div>
            <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">
              Meta Page Title
            </label>
            <input
              type="text"
              value={seoForm.metaTitle}
              onChange={(e) => setSeoForm({ ...seoForm, metaTitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">
              Meta Description
            </label>
            <textarea
              rows={3}
              value={seoForm.metaDescription}
              onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">
              Focus Search Keywords
            </label>
            <input
              type="text"
              value={seoForm.keywords}
              onChange={(e) => setSeoForm({ ...seoForm, keywords: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">
              Canonical URL
            </label>
            <input
              type="text"
              value={seoForm.canonicalUrl}
              onChange={(e) => setSeoForm({ ...seoForm, canonicalUrl: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
            />
          </div>
        </div>

        {/* Google Snippet & Social Card Live Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#2c5e37] uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#4e8c4a]" /> Google Search Preview
            </h3>

            <div className="bg-[#f9fbf8] border border-[#dce4da] p-4 rounded-2xl text-left shadow-xs">
              <div className="text-[11px] text-gray-600 font-mono line-clamp-1">{seoForm.canonicalUrl}</div>
              <div className="text-sm font-bold text-[#1a0dab] line-clamp-1 hover:underline cursor-pointer mt-0.5">
                {seoForm.metaTitle}
              </div>
              <div className="text-xs text-gray-700 line-clamp-2 mt-1">{seoForm.metaDescription}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
