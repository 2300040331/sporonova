"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms-context";
import { Save, Plus, Trash2, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export default function WhyChooseUsCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [valuesList, setValuesList] = useState<any[]>([]);

  useEffect(() => {
    if (data?.values) {
      setValuesList(data.values);
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
    const success = await updateData({ values: valuesList });
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    }
  };

  const updateCard = (index: number, field: string, value: string) => {
    const updated = [...valuesList];
    updated[index] = { ...updated[index], [field]: value };
    setValuesList(updated);
  };

  const addCard = () => {
    const newCard = {
      tag: "NEW PROTOCOL",
      title: "Premium Quality",
      desc: "Genetically verified rhizomorphic strains yielding dense flushes.",
      metric: "100%",
    };
    setValuesList([...valuesList, newCard]);
  };

  const removeCard = (index: number) => {
    const updated = valuesList.filter((_, i) => i !== index);
    setValuesList(updated);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] text-[10px] font-bold uppercase tracking-wider text-[#2c5e37] mb-2 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4e8c4a]" /> Quality Assurance Protocols
          </div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Why Choose Us CMS Editor</h1>
          <p className="text-xs text-gray-650 mt-1 font-medium">
            Manage the Quality Assurance Protocols grid on the homepage. Edit benchmarks, titles, and description text.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> Quality Benchmarks Published!
            </span>
          )}
          
          <button
            onClick={addCard}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#f0f5ef] hover:bg-[#dceada] border border-[#d2e4d0] text-[#1c3c24] font-bold text-xs uppercase tracking-wider rounded-2xl cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" /> Add Protocol Card
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
                <Save className="w-4 h-4" /> Save Protocols
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {valuesList.map((card, idx) => {
          const numStr = (idx + 1).toString().padStart(2, "0");
          return (
            <div key={idx} className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-4 shadow-sm relative group hover:border-[#4e8c4a]/30 transition-all duration-300">
              <div className="flex justify-between items-center border-b border-[#e2e8e0] pb-2">
                <span className="text-xs font-mono font-bold text-[#4e8c4a] bg-[#f0f5ef] px-2.5 py-1 rounded-full border border-gray-100">
                  Protocol Card #{numStr}
                </span>
                
                <button
                  onClick={() => removeCard(idx)}
                  className="text-red-500 hover:text-red-750 p-1.5 rounded-lg hover:bg-red-50 cursor-pointer shrink-0 transition-colors"
                  title="Remove this card"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                    Tag Line / category
                  </label>
                  <input
                    type="text"
                    value={card.tag || ""}
                    onChange={(e) => updateCard(idx, "tag", e.target.value)}
                    className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                    placeholder="e.g. GENOMIC PURITY"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                    Card Title
                  </label>
                  <input
                    type="text"
                    value={card.title || ""}
                    onChange={(e) => updateCard(idx, "title", e.target.value)}
                    className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                    placeholder="e.g. Premium Quality"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                  Description Text
                </label>
                <textarea
                  rows={2}
                  value={card.desc || ""}
                  onChange={(e) => updateCard(idx, "desc", e.target.value)}
                  className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                  placeholder="Describe standard protocols..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                  Benchmark Metric Value
                </label>
                <input
                  type="text"
                  value={card.metric || ""}
                  onChange={(e) => updateCard(idx, "metric", e.target.value)}
                  className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
                  placeholder="e.g. 99.8%"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
