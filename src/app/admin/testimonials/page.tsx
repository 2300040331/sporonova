"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms-context";
import { Save, Plus, Trash2, CheckCircle2, MessageSquare, Quote } from "lucide-react";

export default function TestimonialsCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    if (data?.testimonials) {
      setTestimonials(data.testimonials);
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
    const success = await updateData({ testimonials });
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    }
  };

  const handleAdd = () => {
    setTestimonials([
      ...testimonials,
      {
        quote: "SporoNova's spawn broth has increased our yields by 45%. We highly recommend their cleanroom materials.",
        author: "New Grower Partner",
        role: "Commercial Cultivator",
      },
    ]);
  };

  const handleDelete = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] text-[10px] font-bold uppercase tracking-wider text-[#2c5e37] mb-2 font-mono">
            <MessageSquare className="w-3.5 h-3.5 text-[#4e8c4a]" /> Social CMS
          </div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Grower Testimonials</h1>
          <p className="text-xs text-gray-650 mt-1 font-medium">
            Manage feedback quotes, grower names, and roles displayed in the sliding homepage testimonials carousel.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> Testimonials Saved Live!
            </span>
          )}
          
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#f0f5ef] hover:bg-[#dceada] border border-[#d2e4d0] text-[#1c3c24] font-bold text-xs uppercase tracking-wider rounded-2xl cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" /> Add Testimonial
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
                <Save className="w-4 h-4" /> Save Testimonials
              </>
            )}
          </button>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="space-y-6">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white border border-[#e2e8e0] rounded-3xl p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow relative">
            <div className="flex items-center justify-between border-b border-dashed border-[#e2e8e0] pb-2">
              <span className="text-[10px] font-mono font-bold text-[#4e8c4a] flex items-center gap-1">
                <Quote className="w-3.5 h-3.5" /> Testimonial Card #{idx + 1}
              </span>
              <button
                onClick={() => handleDelete(idx)}
                className="p-1.5 bg-red-50 hover:bg-red-600 hover:text-white border border-red-100 text-red-700 rounded-xl transition-all cursor-pointer"
                title="Delete Testimonial"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Author Name</label>
                <input
                  type="text"
                  value={t.author || ""}
                  onChange={(e) => updateItem(idx, "author", e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold outline-none focus:border-[#4e8c4a]"
                  placeholder="Grower name..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Author Role / Designation</label>
                <input
                  type="text"
                  value={t.role || ""}
                  onChange={(e) => updateItem(idx, "role", e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold outline-none focus:border-[#4e8c4a]"
                  placeholder="e.g. Commercial Farmer..."
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Feedback Quote</label>
              <textarea
                rows={3}
                value={t.quote || ""}
                onChange={(e) => updateItem(idx, "quote", e.target.value)}
                className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium outline-none focus:border-[#4e8c4a]"
                placeholder="Write the feedback quote here..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
