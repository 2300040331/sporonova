"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { Save, HelpCircle, Plus, Trash2 } from "lucide-react";

export default function FaqsCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const [faqs, setFaqs] = useState(data.faqs);

  const handleSave = async () => {
    setSaving(true);
    await updateData({ faqs });
    setSaving(false);
  };

  const handleAdd = () => {
    setFaqs([
      ...faqs,
      { id: `faq-${Date.now()}`, question: "New FAQ Question?", answer: "Answer details here.", category: "General" },
    ]);
  };

  const handleDelete = (id: string) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#163622]/80 border border-[#2E7D32]/30 p-6 rounded-3xl backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">FAQs CMS</h1>
          <p className="text-xs text-emerald-100/70 mt-1">Manage frequently asked questions regarding spawn storage, biosecurity, and delivery.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#2E7D32] hover:text-white"
          >
            <Plus className="w-4 h-4" /> Add FAQ Item
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2E7D32] to-[#1F5E38] hover:from-[#388e3c] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow"
          >
            <Save className="w-4 h-4" /> Save FAQs
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((f, idx) => (
          <div key={f.id} className="bg-[#163622]/80 border border-[#2E7D32]/30 rounded-3xl p-6 space-y-3 relative">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-400 uppercase font-mono">FAQ #{idx + 1}</span>
              <button onClick={() => handleDelete(f.id)} className="p-2 text-red-400 hover:text-red-200">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">Question</label>
              <input
                type="text"
                value={f.question}
                onChange={(e) => {
                  const updated = [...faqs];
                  updated[idx].question = e.target.value;
                  setFaqs(updated);
                }}
                className="w-full px-4 py-2 bg-black/30 border border-white/15 rounded-xl text-white text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">Answer</label>
              <textarea
                rows={2}
                value={f.answer}
                onChange={(e) => {
                  const updated = [...faqs];
                  updated[idx].answer = e.target.value;
                  setFaqs(updated);
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
