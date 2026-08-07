"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { Folder, Upload, Trash2, Copy, Check, Image as ImageIcon, Search } from "lucide-react";

export default function MediaLibraryCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploading, setUploading] = useState(false);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteMedia = async (id: string) => {
    if (confirm("Delete this file from Media Library?")) {
      const updatedMedia = data.media.filter((m) => m.id !== id);
      await updateData({ media: updatedMedia });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    const file = files[0];
    const newMediaItem = {
      id: `med-${Date.now()}`,
      filename: file.name,
      url: `/${file.name}`,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      mimeType: file.type || "image/png",
      altText: file.name.split(".")[0],
      uploadedAt: new Date().toISOString().split("T")[0],
    };

    setTimeout(async () => {
      const updatedMedia = [newMediaItem, ...data.media];
      await updateData({ media: updatedMedia });
      setUploading(false);
    }, 800);
  };

  const filteredMedia = data.media.filter((m) =>
    m.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Central Media Library</h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Upload, crop, replace, and organize image assets used across the Sporonova public website.
          </p>
        </div>

        <label className="flex items-center gap-2 px-6 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>{uploading ? "Uploading..." : "Upload New Assets"}</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-4 top-3.5 text-[#4e8c4a]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search media files by name..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-[#dce4da] rounded-2xl text-[#1c3c24] text-xs font-bold placeholder-gray-400"
        />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#e2e8e0] rounded-2xl p-3 shadow-sm group relative flex flex-col justify-between"
          >
            <div className="aspect-square bg-[#f8faf7] border border-[#e2e8e0] rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2">
              <img
                src={item.url}
                alt={item.altText}
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <div className="text-xs font-bold text-[#1c3c24] truncate" title={item.filename}>
                {item.filename}
              </div>
              <div className="text-[10px] text-gray-500 font-mono mt-0.5">{item.size}</div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-3 mt-2 border-t border-[#e2e8e0]">
              <button
                onClick={() => handleCopyUrl(item.url, item.id)}
                className="p-1.5 bg-[#f0f5ef] text-[#1c3c24] hover:bg-[#1c3c24] hover:text-white rounded-lg transition-all text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                title="Copy Path"
              >
                {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              </button>

              <button
                onClick={() => handleDeleteMedia(item.id)}
                className="p-1.5 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white rounded-lg transition-all cursor-pointer"
                title="Delete Media"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
