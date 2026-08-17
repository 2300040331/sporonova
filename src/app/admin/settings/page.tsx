"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { Settings, Save, CheckCircle2, Palette, Type, Sliders } from "lucide-react";

export default function SettingsCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [settingsForm, setSettingsForm] = useState(data?.settings || {
    siteName: "", primaryColor: "#1F5E38", secondaryColor: "#2E7D32", accentColor: "#4e8c4a",
    backgroundColor: "#f8f7f3", textColor: "#333333", fontFamilyHeading: "Outfit, sans-serif",
    fontFamilyBody: "Inter, sans-serif", containerWidth: "1280px", sectionPadding: "64px", borderRadius: "16px",
  });

  React.useEffect(() => {
    if (data?.settings) setSettingsForm(data.settings);
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
    setSaveSuccess(false);

    const success = await updateData({ settings: settingsForm });
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#163622]/80 border border-[#2E7D32]/30 p-6 rounded-3xl backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Global Website Settings & Styling</h1>
          <p className="text-xs text-emerald-100/70 mt-1">
            Customize site colors, typography fonts, container widths, and layout spacing without writing code.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-emerald-300 font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Settings Saved!
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Reset all settings to factory default brand colors and styles?")) {
                setSettingsForm({
                  siteName: data?.settings?.siteName || "SporoNova Biotech",
                  primaryColor: "#1F5E38",
                  secondaryColor: "#2E7D32",
                  accentColor: "#4e8c4a",
                  backgroundColor: "#f8f7f3",
                  textColor: "#333333",
                  fontFamilyHeading: "Outfit, sans-serif",
                  fontFamilyBody: "Inter, sans-serif",
                  containerWidth: "1280px",
                  sectionPadding: "64px",
                  borderRadius: "16px",
                });
              }
            }}
            className="px-5 py-3 border border-emerald-500/30 hover:bg-emerald-800/50 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer font-sans"
          >
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2E7D32] to-[#1F5E38] hover:from-[#388e3c] hover:to-[#276e42] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg cursor-pointer"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Settings
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-[#163622]/80 border border-[#2E7D32]/30 rounded-3xl p-6 space-y-6 shadow-xl">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
          <Palette className="w-4 h-4 text-emerald-400" /> Brand Color Palette
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
              Primary Brand Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settingsForm.primaryColor}
                onChange={(e) => setSettingsForm({ ...settingsForm, primaryColor: e.target.value })}
                className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={settingsForm.primaryColor}
                onChange={(e) => setSettingsForm({ ...settingsForm, primaryColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-white text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => setSettingsForm({ ...settingsForm, primaryColor: "#1F5E38" })}
                className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider border border-emerald-500/30 bg-emerald-800/40 hover:bg-emerald-700 hover:text-white text-emerald-200 rounded-lg transition-all cursor-pointer"
              >
                Default
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
              Secondary Green Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settingsForm.secondaryColor}
                onChange={(e) => setSettingsForm({ ...settingsForm, secondaryColor: e.target.value })}
                className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={settingsForm.secondaryColor}
                onChange={(e) => setSettingsForm({ ...settingsForm, secondaryColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-white text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => setSettingsForm({ ...settingsForm, secondaryColor: "#2E7D32" })}
                className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider border border-emerald-500/30 bg-emerald-800/40 hover:bg-emerald-700 hover:text-white text-emerald-200 rounded-lg transition-all cursor-pointer"
              >
                Default
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
              Accent Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settingsForm.accentColor}
                onChange={(e) => setSettingsForm({ ...settingsForm, accentColor: e.target.value })}
                className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={settingsForm.accentColor}
                onChange={(e) => setSettingsForm({ ...settingsForm, accentColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-white text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => setSettingsForm({ ...settingsForm, accentColor: "#4e8c4a" })}
                className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider border border-emerald-500/30 bg-emerald-800/40 hover:bg-emerald-700 hover:text-white text-emerald-200 rounded-lg transition-all cursor-pointer"
              >
                Default
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
              Site Background Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settingsForm.backgroundColor || "#f8f7f3"}
                onChange={(e) => setSettingsForm({ ...settingsForm, backgroundColor: e.target.value })}
                className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={settingsForm.backgroundColor || ""}
                onChange={(e) => setSettingsForm({ ...settingsForm, backgroundColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-white text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => setSettingsForm({ ...settingsForm, backgroundColor: "#f8f7f3" })}
                className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider border border-emerald-500/30 bg-emerald-800/40 hover:bg-emerald-700 hover:text-white text-emerald-200 rounded-lg transition-all cursor-pointer"
              >
                Default
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
              Main Body Text Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settingsForm.textColor || "#333333"}
                onChange={(e) => setSettingsForm({ ...settingsForm, textColor: e.target.value })}
                className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={settingsForm.textColor || ""}
                onChange={(e) => setSettingsForm({ ...settingsForm, textColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-black/30 border border-white/15 rounded-xl text-white text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => setSettingsForm({ ...settingsForm, textColor: "#333333" })}
                className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider border border-emerald-500/30 bg-emerald-800/40 hover:bg-emerald-700 hover:text-white text-emerald-200 rounded-lg transition-all cursor-pointer"
              >
                Default
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pt-4 pb-3">
          <Type className="w-4 h-4 text-emerald-400" /> Typography & Fonts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
              Heading Font Family
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={settingsForm.fontFamilyHeading}
                onChange={(e) => setSettingsForm({ ...settingsForm, fontFamilyHeading: e.target.value })}
                className="flex-1 px-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-white text-xs"
              />
              <button
                type="button"
                onClick={() => setSettingsForm({ ...settingsForm, fontFamilyHeading: "Outfit, sans-serif" })}
                className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider border border-emerald-500/30 bg-emerald-800/40 hover:bg-emerald-700 hover:text-white text-emerald-200 rounded-lg transition-all cursor-pointer"
              >
                Default
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
              Body Text Font Family
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={settingsForm.fontFamilyBody}
                onChange={(e) => setSettingsForm({ ...settingsForm, fontFamilyBody: e.target.value })}
                className="w-full px-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-white text-xs"
              />
              <button
                type="button"
                onClick={() => setSettingsForm({ ...settingsForm, fontFamilyBody: "Inter, sans-serif" })}
                className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider border border-emerald-500/30 bg-emerald-800/40 hover:bg-emerald-700 hover:text-white text-emerald-200 rounded-lg transition-all cursor-pointer"
              >
                Default
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pt-4 pb-3">
          <Sliders className="w-4 h-4 text-emerald-400" /> Layout & Spacing Defaults
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
              Container Max Width
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={settingsForm.containerWidth}
                onChange={(e) => setSettingsForm({ ...settingsForm, containerWidth: e.target.value })}
                className="flex-1 px-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-white text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => setSettingsForm({ ...settingsForm, containerWidth: "1280px" })}
                className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider border border-emerald-500/30 bg-emerald-800/40 hover:bg-emerald-700 hover:text-white text-emerald-200 rounded-lg transition-all cursor-pointer"
              >
                Default
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
              Section Vertical Padding
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={settingsForm.sectionPadding}
                onChange={(e) => setSettingsForm({ ...settingsForm, sectionPadding: e.target.value })}
                className="flex-1 px-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-white text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => setSettingsForm({ ...settingsForm, sectionPadding: "64px" })}
                className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider border border-emerald-500/30 bg-emerald-800/40 hover:bg-emerald-700 hover:text-white text-emerald-200 rounded-lg transition-all cursor-pointer"
              >
                Default
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
              Card Border Radius
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={settingsForm.borderRadius}
                onChange={(e) => setSettingsForm({ ...settingsForm, borderRadius: e.target.value })}
                className="flex-1 px-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-white text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => setSettingsForm({ ...settingsForm, borderRadius: "16px" })}
                className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider border border-emerald-500/30 bg-emerald-800/40 hover:bg-emerald-700 hover:text-white text-emerald-200 rounded-lg transition-all cursor-pointer"
              >
                Default
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
