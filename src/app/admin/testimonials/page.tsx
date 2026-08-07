"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { Save, MessageSquare, Plus, Trash2, CheckCircle2 } from "lucide-react";

export default function TestimonialsCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const [testimonials, setTestimonials] = useState(data.testimonials);

  const handleSave = async () => {
    setSaving(true);
    await updateData({ testimonials });
    setSaving(false);
  };

  const handleAdd = () => {
    setTestimonials([
      ...testimonials,
      { quote: "SporoNova's spawn exceeded our yield expectations.", author: "Commercial Cultivator", role: "Farm Owner" },
    ]);
  };

  const handleDelete = (idx: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#163622]/80 border border-[#2E7D32]/30 p-6 rounded-3xl backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Testimonials CMS</h1>
          <p className="text-xs text-emerald-100/70 mt-1">Manage grower and partner testimonials displayed on the homepage.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#2E7D32] hover:text-white"
          >
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2E7D32] to-[#1F5E38] hover:from-[#388e3c] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow"
          >
            <Save className="w-4 h-4" /> Save Testimonials
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-[#163622]/80 border border-[#2E7D32]/30 rounded-3xl p-6 space-y-3 relative">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-400 uppercase font-mono">Testimonial #{idx + 1}</span>
              <button onClick={() => handleDelete(idx)} className="p-2 text-red-400 hover:text-red-200">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">Quote</label>
              <textarea
                rows={2}
                value={t.quote}
                onChange={(e) => {
                  const updated = [...testimonials];
                  updated[idx].quote = e.target.value;
                  setTestimonials(updated);
                }}
                className="w-full px-4 py-2 bg-black/30 border border-white/15 rounded-xl text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">Author Name</label>
                <input
                  type="text"
                  value={t.author}
                  onChange={(e) => {
                    const updated = [...testimonials];
                    updated[idx].author = e.target.value;
                    setTestimonials(updated);
                  }}
                  className="w-full px-4 py-2 bg-black/30 border border-white/15 rounded-xl text-white text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">Role / Designation</label>
                <input
                  type="text"
                  value={t.role}
                  onChange={(e) => {
                    const updated = [...testimonials];
                    updated[idx].role = e.target.value;
                    setTestimonials(updated);
                  }}
                  className="w-full px-4 py-2 bg-black/30 border border-white/15 rounded-xl text-white text-xs"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
