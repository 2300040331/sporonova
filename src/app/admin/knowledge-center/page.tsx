"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms-context";
import { Save, BookOpen, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { SectionStylesConfig } from "@/lib/styles-helper";
import BrandingSectionStylesControls from "@/components/admin/BrandingSectionStylesControls";

export default function KnowledgeCenterCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [items, setItems] = useState<any[]>(data?.knowledgeCenter || []);
  const [knowledgeStyles, setKnowledgeStyles] = useState<SectionStylesConfig>({});

  useEffect(() => {
    if (data?.knowledgeCenter) {
      setItems(data.knowledgeCenter);
    }
    if ((data as any)?.knowledgeStyles) {
      setKnowledgeStyles((data as any).knowledgeStyles);
    } else {
      setKnowledgeStyles({});
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
    const success = await updateData({
      knowledgeCenter: items,
      knowledgeStyles: knowledgeStyles,
    } as any);
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
        id: `new-article-${Date.now()}`,
        title: "New Knowledge Base Article",
        type: "Article",
        category: "Cultivation Guide",
        summary: "Article overview summary.",
        content: "Write the article contents here.",
        date: new Date().toISOString().split("T")[0],
        author: "SporoNova Research",
        readTime: "5 min read",
        complexity: "Basic",
        url: "",
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
          <p className="text-xs text-gray-650 mt-1 font-medium">
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
            type="button"
            onClick={() => {
              if (window.confirm("Revert Knowledge changes to current saved state?")) {
                setItems(data?.knowledgeCenter || []);
                setKnowledgeStyles((data as any)?.knowledgeStyles || {});
              }
            }}
            className="px-5 py-3 border border-[#dce4da] hover:bg-[#f0f5ef] text-[#2c5e37] font-bold text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer font-sans"
          >
            Reset
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
                  value={item.title || ""}
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
                    value={item.category || ""}
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
                    value={item.type || "Article"}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">Complexity</label>
                <select
                  value={item.complexity || "Basic"}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[idx].complexity = e.target.value;
                    setItems(updated);
                  }}
                  className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                >
                  <option value="Basic">Basic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">Read Time (e.g. 5 min read)</label>
                <input
                  type="text"
                  value={item.readTime || ""}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[idx].readTime = e.target.value;
                    setItems(updated);
                  }}
                  className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">Path Slug / Link ID (e.g. what-are-mushrooms)</label>
                <input
                  type="text"
                  value={item.id || ""}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[idx].id = e.target.value;
                    setItems(updated);
                  }}
                  className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">Summary / Excerpt</label>
              <textarea
                rows={2}
                value={item.summary || ""}
                onChange={(e) => {
                  const updated = [...items];
                  updated[idx].summary = e.target.value;
                  setItems(updated);
                }}
                className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">Full Article Content (Text / Paragraphs)</label>
              <textarea
                rows={6}
                value={item.content || ""}
                onChange={(e) => {
                  const updated = [...items];
                  updated[idx].content = e.target.value;
                  setItems(updated);
                }}
                className="w-full px-4 py-3 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium leading-relaxed"
                placeholder="Write the full content of the article here..."
              />
            </div>
          </div>
        ))}
      </div>

      <BrandingSectionStylesControls
        sectionName="Knowledge Base Articles"
        styles={knowledgeStyles}
        onChange={setKnowledgeStyles}
      />
    </div>
  );
}
