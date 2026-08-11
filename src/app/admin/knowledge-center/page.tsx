"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms-context";
import { Save, BookOpen, Plus, Trash2, CheckCircle2 } from "lucide-react";

export default function KnowledgeCenterCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [items, setItems] = useState<any[]>(data?.knowledgeCenter || []);

  useEffect(() => {
    if (data?.knowledgeCenter) {
      setItems(data.knowledgeCenter);
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
    const success = await updateData({ knowledgeCenter: items });
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
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
        url: "/knowledge/new-article",
      },
    ]);
  };

  const handleDelete = (index: number) => {
    if (confirm("Are you sure you want to delete this resource/article?")) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Knowledge Base CMS</h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Manage public-facing articles, scientific resources, and cultivation manuals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> Published Successfully!
            </span>
          )}
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-3 bg-[#f0f5ef] border border-[#d2e4d0] text-[#1c3c24] rounded-2xl text-xs font-bold uppercase tracking-wider hover:bg-[#1c3c24] hover:text-white transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Resource
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Articles
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-3">
              <span className="text-xs font-bold text-[#2c5e37] uppercase tracking-widest font-mono flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#4e8c4a]" /> Resource #{idx + 1}: {item.title || ""}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(idx)}
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                title="Delete Resource"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">Article Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[idx].title = e.target.value;
                    setItems(updated);
                  }}
                  className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">Category</label>
                  <input
                    type="text"
                    value={item.category}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx].category = e.target.value;
                      setItems(updated);
                    }}
                    className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">Type</label>
                  <select
                    value={item.type}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[idx].type = e.target.value;
                      setItems(updated);
                    }}
                    className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                  >
                    <option value="Article">Article</option>
                    <option value="Blog">Blog</option>
                    <option value="News">News</option>
                    <option value="Video">Video</option>
                    <option value="Download">Download</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">Summary / Excerpt</label>
              <textarea
                rows={2}
                value={item.summary}
                onChange={(e) => {
                  const updated = [...items];
                  updated[idx].summary = e.target.value;
                  setItems(updated);
                }}
                className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">Path Slug / Link</label>
              <input
                type="text"
                value={item.url}
                onChange={(e) => {
                  const updated = [...items];
                  updated[idx].url = e.target.value;
                  setItems(updated);
                }}
                className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
