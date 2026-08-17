"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, Image as ImageIcon, Check, Loader2, AlertCircle } from "lucide-react";

interface ImageUploadDropzoneProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "auto";
  requiredWidth?: number;
  requiredHeight?: number;
}

export default function ImageUploadDropzone({
  value,
  onChange,
  label = "Upload Image",
  className = "",
  aspectRatio = "auto",
  requiredWidth,
  requiredHeight,
}: ImageUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDimensions, setCurrentDimensions] = useState<{ width: number; height: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      const img = new Image();
      img.onload = () => {
        setCurrentDimensions({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        setCurrentDimensions(null);
      };
      img.src = value;
    } else {
      setCurrentDimensions(null);
    }
  }, [value]);

  const validateAndGetDimensions = (file: File): Promise<{ width: number; height: number; isValid: boolean; errorMsg?: string }> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith("image/")) {
        resolve({ width: 0, height: 0, isValid: false, errorMsg: "Please drop a valid image file (PNG, JPG, WebP, SVG)." });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        resolve({ width: 0, height: 0, isValid: false, errorMsg: "Image file size must be less than 5 MB." });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          
          if (requiredWidth && requiredHeight) {
            if (width !== requiredWidth || height !== requiredHeight) {
              const msg = `Invalid Image Size. Required: ${requiredWidth} × ${requiredHeight} px. Uploaded: ${width} × ${height} px. Please upload an image with the required dimensions.`;
              resolve({ width, height, isValid: false, errorMsg: msg });
              return;
            }
          }
          resolve({ width, height, isValid: true });
        };
        img.onerror = () => {
          resolve({ width: 0, height: 0, isValid: false, errorMsg: "Failed to read image data." });
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadFile = async (file: File) => {
    setError(null);
    setUploading(true);

    try {
      const validation = await validateAndGetDimensions(file);
      if (!validation.isValid) {
        setError(validation.errorMsg || "Image validation failed.");
        setUploading(false);
        return;
      }

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

  const showRequirements = requiredWidth && requiredHeight;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider">
            {label}
          </label>
          {showRequirements && (
            <span className="text-[9px] font-bold text-gray-400 font-mono">
              Required: {requiredWidth} × {requiredHeight} px
            </span>
          )}
        </div>
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
            <span className="text-xs font-bold font-mono">Validating and Uploading...</span>
          </div>
        ) : value ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center group">
            <img
              src={value}
              alt="Preview"
              className="max-h-32 w-auto object-contain rounded-xl shadow-sm border border-[#e2e8e0] bg-white p-1"
            />
            
            {/* Status Information Box */}
            <div className="mt-2 text-[10px] font-bold text-[#2c5e37] flex flex-col items-center gap-0.5">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Image active · Drag a new image here to replace
              </span>
              
              {currentDimensions && (
                <span className="text-[9px] text-gray-500 font-mono mt-0.5">
                  Uploaded: {currentDimensions.width} × {currentDimensions.height} px | Required: {requiredWidth || "auto"} × {requiredHeight || "auto"} px | Status: <span className="text-emerald-600 font-bold">Valid</span>
                </span>
              )}
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
            {showRequirements && (
              <div className="text-[9px] text-red-500/80 font-bold font-mono bg-red-50 px-2 py-0.5 rounded-md mt-1 border border-red-100">
                Must be exactly {requiredWidth} × {requiredHeight} px
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-1 p-2.5 bg-red-50 border border-red-100 rounded-xl text-red-700 text-[10px] font-bold animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-650 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
