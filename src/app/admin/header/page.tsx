"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms-context";
import { Save, CheckCircle2, Menu, Plus, Trash2, Sliders } from "lucide-react";
import BrandingSectionStylesControls from "@/components/admin/BrandingSectionStylesControls";

export default function HeaderCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [headerForm, setHeaderForm] = useState<any>(data?.header || {});

  useEffect(() => {
    if (data?.header) {
      setHeaderForm(data.header);
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
    setSaving(true);
    setSaveSuccess(false);

    const success = await updateData({ header: headerForm });
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleAddNavLink = () => {
    setHeaderForm({
      ...headerForm,
      navLinks: [
        ...(headerForm.navLinks || []),
        { name: "New Link", href: "/new-page", order: (headerForm.navLinks || []).length + 1 },
      ],
    });
  };

  const handleRemoveNavLink = (index: number) => {
    const updated = (headerForm.navLinks || []).filter((_: any, i: number) => i !== index);
    setHeaderForm({ ...headerForm, navLinks: updated });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Header & Navigation CMS</h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Manage Sporonova website header logo, navigation links, colors, and CTA button.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> Header Published!
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Revert Header changes to current saved state?")) {
                setHeaderForm(data?.header || {});
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
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Header
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-6 shadow-sm">
        <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 border-b border-[#e2e8e0] pb-3">
          <Menu className="w-4 h-4 text-[#4e8c4a]" /> Logo & Branding
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
              Logo Image Path / URL
            </label>
            <input
              type="text"
              value={headerForm.logoUrl || ""}
              onChange={(e) => setHeaderForm({ ...headerForm, logoUrl: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
              Logo Alt Text
            </label>
            <input
              type="text"
              value={headerForm.logoAlt || ""}
              onChange={(e) => setHeaderForm({ ...headerForm, logoAlt: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-semibold"
            />
          </div>
        </div>

        <div className="border-t border-[#e2e8e0] pt-4">
          <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 mb-4">
            <Sliders className="w-4 h-4 text-[#4e8c4a]" /> Navigation Menu Links & Order
          </h2>

          <div className="space-y-3">
            {(headerForm.navLinks || []).map((link: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-[#f8faf7] border border-[#e2e8e0] p-3 rounded-2xl"
              >
                <span className="w-6 text-center text-xs font-mono font-bold text-[#2c5e37]">
                  #{idx + 1}
                </span>
                <input
                  type="text"
                  value={link.name || ""}
                  onChange={(e) => {
                    const updated = [...(headerForm.navLinks || [])];
                    updated[idx].name = e.target.value;
                    setHeaderForm({ ...headerForm, navLinks: updated });
                  }}
                  placeholder="Link Name"
                  className="w-1/3 px-3 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                />
                <input
                  type="text"
                  value={link.href || ""}
                  onChange={(e) => {
                    const updated = [...(headerForm.navLinks || [])];
                    updated[idx].href = e.target.value;
                    setHeaderForm({ ...headerForm, navLinks: updated });
                  }}
                  placeholder="URL Path"
                  className="w-1/2 px-3 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-semibold"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveNavLink(idx)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddNavLink}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#f0f5ef] border border-[#d2e4d0] text-[#1c3c24] hover:bg-[#1c3c24] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Navigation Link
          </button>
        </div>

        <div className="border-t border-[#e2e8e0] pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
              Header CTA Button Label
            </label>
            <input
              type="text"
              value={headerForm.ctaText || ""}
              onChange={(e) => setHeaderForm({ ...headerForm, ctaText: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
              Header CTA Button Link
            </label>
            <input
              type="text"
              value={headerForm.ctaLink || ""}
              onChange={(e) => setHeaderForm({ ...headerForm, ctaLink: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
            />
          </div>
        </div>
        
        <BrandingSectionStylesControls
          sectionName="Website Header"
          styles={headerForm.styles}
          onChange={(newStyles) => setHeaderForm({ ...headerForm, styles: newStyles })}
        />
      </div>
    </div>
  );
}
