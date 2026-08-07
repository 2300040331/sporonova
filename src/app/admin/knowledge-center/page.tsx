"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms-context";
import { Save, BookOpen, Plus, Trash2 } from "lucide-react";

export default function KnowledgeCenterCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState(data?.knowledgeCenter || []);

  useEffect(() => {
    if (data?.knowledgeCenter) {
      setItems(data.knowledgeCenter);
    }
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
    await updateData({ knowledgeCenter: items });
    setSaving(false);
  };

  const handleAdd = () => {
    setItems([
      ...items,
      {
        id: `kc-${Date.now()}`,
        title: "New Knowledge Base Article",
        type: "Article",
        category: "Cultivation Guide",
        summary: "Article overview summary.",
        content: "Detailed content text...",
        date: new Date().toISOString().split("T")[0],
        author: "SporoNova Team",
      },
    ]);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#163622]/80 border border-[#2E7D32]/30 p-6 rounded-3xl backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Knowledge Center CMS</h1>
          <p className="text-xs text-emerald-100/70 mt-1">Manage articles, blogs, research papers, and downloadable cultivation PDFs.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#2E7D32] hover:text-white"
          >
            <Plus className="w-4 h-4" /> Add Article / PDF
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2E7D32] to-[#1F5E38] hover:from-[#388e3c] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow"
          >
            <Save className="w-4 h-4" /> Save Knowledge Center
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={item.id} className="bg-[#163622]/80 border border-[#2E7D32]/30 rounded-3xl p-6 space-y-3 relative">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-400 uppercase font-mono">{item.type} • {item.category}</span>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:text-red-200">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[idx].title = e.target.value;
                    setItems(updated);
                  }}
                  className="w-full px-4 py-2 bg-black/30 border border-white/15 rounded-xl text-white text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">Category</label>
                  <input
                    type="text"
                    value={item.category}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx].category = e.target.value;
                      setItems(updated);
                    }}
                    className="w-full px-4 py-2 bg-black/30 border border-white/15 rounded-xl text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">Type</label>
                  <input
                    type="text"
                    value={item.type}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx].type = e.target.value;
                      setItems(updated);
                    }}
                    className="w-full px-4 py-2 bg-black/30 border border-white/15 rounded-xl text-white text-xs font-bold"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">Summary / Excerpt</label>
              <textarea
                rows={2}
                value={item.summary}
                onChange={(e) => {
                  const updated = [...items];
                  updated[idx].summary = e.target.value;
                  setItems(updated);
                }}
                className="w-full px-4 py-2 bg-black/30 border border-white/15 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">PDF Download Link / URL</label>
              <input
                type="text"
                value={item.downloadUrl || ""}
                placeholder="/downloads/guide.pdf"
                onChange={(e) => {
                  const updated = [...items];
                  updated[idx].downloadUrl = e.target.value;
                  setItems(updated);
                }}
                className="w-full px-4 py-2 bg-black/30 border border-white/15 rounded-xl text-emerald-300 text-xs font-mono"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
