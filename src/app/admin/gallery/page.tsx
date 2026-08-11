"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { Save, Image as ImageIcon, Plus, Trash2, CheckCircle2 } from "lucide-react";

function GalleryThumbnail({ src, alt }: { src: string; alt: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError || !src) {
    return (
      <div className="w-full h-full bg-[#f0f5ef] border border-[#d2e4d0] rounded-2xl flex flex-col items-center justify-center text-[#4e8c4a] shrink-0 p-4 gap-2">
        <ImageIcon className="w-8 h-8 opacity-75" />
        <span className="text-[10px] font-mono font-bold text-gray-400">Broken Image Path</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setImgError(true)}
      className="max-h-full max-w-full object-contain rounded-xl shadow-sm transition-transform duration-300 hover:scale-105"
    />
  );
}

export default function GalleryCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [gallery, setGallery] = useState<any[]>([]);

  React.useEffect(() => {
    if (data?.gallery) {
      setGallery(data.gallery);
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
    const success = await updateData({ gallery });
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleAdd = () => {
    setGallery([
      ...gallery,
      { id: `gal-${Date.now()}`, url: "/about_mushrooms.jpg", title: "New Gallery Photo", category: "Laboratory" },
    ]);
  };

  const handleDelete = (id: string) => {
    setGallery(gallery.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] text-[10px] font-bold uppercase tracking-wider text-[#2c5e37] mb-2 font-mono">
            <ImageIcon className="w-3.5 h-3.5 text-[#4e8c4a]" /> Media CMS
          </div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Public Photo Gallery CMS</h1>
          <p className="text-xs text-gray-650 mt-1 font-medium">
            Manage public image gallery photos, titles, and categories displayed across the website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> Gallery Updated Live!
            </span>
          )}
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#f0f5ef] hover:bg-gray-150 border border-[#d2e4d0] text-[#1c3c24] rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Photo
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
                <Save className="w-4 h-4" /> Save Gallery
              </>
            )}
          </button>
        </div>
      </div>

      {/* Gallery Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gallery.map((g, idx) => (
          <div key={g.id} className="bg-white border border-[#e2e8e0] rounded-3xl p-5 space-y-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            
            {/* Image Preview Window */}
            <div className="aspect-video bg-[#f9fbf8] border border-[#dce4da] rounded-2xl p-2 flex items-center justify-center relative overflow-hidden h-44">
              <GalleryThumbnail src={g.url} alt={g.title} />
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Image Title</label>
              <input
                type="text"
                value={g.title}
                onChange={(e) => {
                  const updated = [...gallery];
                  updated[idx].title = e.target.value;
                  setGallery(updated);
                }}
                className="w-full px-3.5 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold outline-none focus:border-[#4e8c4a] transition-all"
              />
            </div>

            {/* Category Path Input */}
            <div>
              <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Image URL Path</label>
              <input
                type="text"
                value={g.url}
                onChange={(e) => {
                  const updated = [...gallery];
                  updated[idx].url = e.target.value;
                  setGallery(updated);
                }}
                className="w-full px-3.5 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold outline-none focus:border-[#4e8c4a] transition-all"
              />
            </div>

            {/* Category & Action bar */}
            <div className="flex justify-between items-center pt-3 border-t border-[#e2e8e0]">
              <div>
                <label className="block text-[9px] font-bold text-[#2c5e37] uppercase mb-0.5">Category</label>
                <select
                  value={g.category}
                  onChange={(e) => {
                    const updated = [...gallery];
                    updated[idx].category = e.target.value;
                    setGallery(updated);
                  }}
                  className="bg-[#f0f5ef] border border-[#d2e4d0] text-[#1c3c24] text-[10px] font-bold py-1 px-2.5 rounded-lg cursor-pointer"
                >
                  <option value="Laboratory">Laboratory</option>
                  <option value="Production">Production</option>
                  <option value="Genomics">Genomics</option>
                </select>
              </div>
              <button 
                onClick={() => handleDelete(g.id)} 
                className="p-2 bg-red-50 hover:bg-red-600 hover:text-white border border-red-150 text-red-700 rounded-xl transition-all cursor-pointer"
                title="Delete Photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
