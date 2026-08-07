"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { Save, Compass, Plus, Trash2 } from "lucide-react";

export default function NavigationCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const [navLinks, setNavLinks] = useState(data.header.navLinks);

  const handleSave = async () => {
    setSaving(true);
    const updatedHeader = { ...data.header, navLinks };
    await updateData({ header: updatedHeader });
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#163622]/80 border border-[#2E7D32]/30 p-6 rounded-3xl backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Navigation Links Editor</h1>
          <p className="text-xs text-emerald-100/70 mt-1">Reorder and customize header & menu navigation items.</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2E7D32] to-[#1F5E38] hover:from-[#388e3c] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow"
        >
          <Save className="w-4 h-4" /> Save Navigation
        </button>
      </div>

      <div className="bg-[#163622]/80 border border-[#2E7D32]/30 rounded-3xl p-6 space-y-4">
        {navLinks.map((link, idx) => (
          <div key={idx} className="flex items-center gap-4 bg-black/30 p-3 rounded-2xl border border-white/10">
            <span className="text-xs font-mono font-bold text-emerald-400">#{idx + 1}</span>
            <input
              type="text"
              value={link.name}
              onChange={(e) => {
                const updated = [...navLinks];
                updated[idx].name = e.target.value;
                setNavLinks(updated);
              }}
              className="w-1/3 px-4 py-2 bg-black/40 border border-white/15 rounded-xl text-white text-xs font-bold"
            />
            <input
              type="text"
              value={link.href}
              onChange={(e) => {
                const updated = [...navLinks];
                updated[idx].href = e.target.value;
                setNavLinks(updated);
              }}
              className="w-1/2 px-4 py-2 bg-black/40 border border-white/15 rounded-xl text-white text-xs font-mono"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
