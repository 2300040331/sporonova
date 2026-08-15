"use client";

import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Check, Loader2 } from "lucide-react";

interface ImageUploadDropzoneProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "auto";
}

export default function ImageUploadDropzone({
  value,
  onChange,
  label = "Upload Image",
  className = "",
  aspectRatio = "auto",
}: ImageUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please drop a valid image file (PNG, JPG, WebP, SVG).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image file size must be less than 5 MB.");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/cms/media", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Upload failed");
      }

      onChange(json.url);
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await uploadFile(files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await uploadFile(files[0]);
    }
  };

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "video"
      ? "aspect-video"
      : "min-h-[140px]";

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider">
          {label}
        </label>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${aspectClass} ${
          isDragging
            ? "border-[#4e8c4a] bg-[#f0f5ef] scale-[1.01]"
            : "border-[#d2e4d0] bg-[#f9fbf8] hover:border-[#4e8c4a] hover:bg-[#f0f5ef]"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-[#1c3c24]">
            <Loader2 className="w-8 h-8 text-[#4e8c4a] animate-spin" />
            <span className="text-xs font-bold font-mono">Uploading to Vercel Blob...</span>
          </div>
        ) : value ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center group">
            <img
              src={value}
              alt="Preview"
              className="max-h-32 w-auto object-contain rounded-xl shadow-sm border border-[#e2e8e0] bg-white p-1"
            />
            <div className="mt-2 text-[10px] font-bold text-[#2c5e37] flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600" /> Image active · Drag a new image here to replace
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-gray-500">
            <div className="p-3 bg-white rounded-2xl border border-[#d2e4d0] shadow-sm text-[#4e8c4a]">
              <Upload className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-[#1c3c24] mt-1">
              Drag & drop photo here
            </div>
            <div className="text-[10px] text-gray-400 font-medium">
              or click to browse from your computer (PNG, JPG, WebP)
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-[10px] text-red-600 font-bold mt-1">{error}</p>
      )}
    </div>
  );
}
