"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { Save, Image as ImageIcon, Plus, Trash2 } from "lucide-react";

export default function GalleryCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const [gallery, setGallery] = useState(data.gallery);

  const handleSave = async () => {
    setSaving(true);
    await updateData({ gallery });
    setSaving(false);
  };

  const handleAdd = () => {
    setGallery([
      ...gallery,
      { id: `gal-${Date.now()}`, url: "/liquid_spawn_bottle.png", title: "New Gallery Photo", category: "Laboratory" },
    ]);
  };

  const handleDelete = (id: string) => {
    setGallery(gallery.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#163622]/80 border border-[#2E7D32]/30 p-6 rounded-3xl backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Public Photo Gallery CMS</h1>
          <p className="text-xs text-emerald-100/70 mt-1">Manage public image gallery photos, titles, and categories.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#2E7D32] hover:text-white"
          >
            <Plus className="w-4 h-4" /> Add Photo
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2E7D32] to-[#1F5E38] hover:from-[#388e3c] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow"
          >
            <Save className="w-4 h-4" /> Save Gallery
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((g, idx) => (
          <div key={g.id} className="bg-[#163622]/80 border border-[#2E7D32]/30 rounded-3xl p-4 space-y-3 relative flex flex-col justify-between">
            <div className="aspect-square bg-black/40 border border-white/10 rounded-2xl p-2 flex items-center justify-center">
              <img src={g.url} alt={g.title} className="max-h-full max-w-full object-contain" />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-emerald-300 uppercase">Image Title</label>
              <input
                type="text"
                value={g.title}
                onChange={(e) => {
                  const updated = [...gallery];
                  updated[idx].title = e.target.value;
                  setGallery(updated);
                }}
                className="w-full px-3 py-1.5 bg-black/30 border border-white/15 rounded-xl text-white text-xs font-bold"
              />
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-white/10">
              <span className="text-[10px] font-mono text-emerald-400">{g.category}</span>
              <button onClick={() => handleDelete(g.id)} className="p-1.5 text-red-400 hover:text-red-200">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
