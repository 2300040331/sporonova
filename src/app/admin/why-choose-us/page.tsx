"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { Save, Award, CheckCircle2 } from "lucide-react";

export default function WhyChooseUsCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const [cards, setCards] = useState(data.whyChooseUsCards);

  const handleSave = async () => {
    setSaving(true);
    const success = await updateData({ whyChooseUsCards: cards });
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Why Choose Us CMS</h1>
          <p className="text-xs text-emerald-100/70 mt-1">
            Manage feature cards, metrics, and value propositions displayed on the live website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-emerald-300 font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cards Saved!
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2E7D32] to-[#1F5E38] hover:from-[#388e3c] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Value Cards
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, idx) => (
          <div key={card.id} className="bg-[#163622]/80 border border-[#2E7D32]/30 rounded-3xl p-6 space-y-3 shadow-xl">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-400 uppercase font-mono">{card.highlight}</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">Card Title</label>
              <input
                type="text"
                value={card.title}
                onChange={(e) => {
                  const updated = [...cards];
                  updated[idx].title = e.target.value;
                  setCards(updated);
                }}
                className="w-full px-4 py-2 bg-black/30 border border-white/15 rounded-xl text-white text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">Description</label>
              <textarea
                rows={2}
                value={card.description}
                onChange={(e) => {
                  const updated = [...cards];
                  updated[idx].description = e.target.value;
                  setCards(updated);
                }}
                className="w-full px-4 py-2 bg-black/30 border border-white/15 rounded-xl text-white text-xs"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
