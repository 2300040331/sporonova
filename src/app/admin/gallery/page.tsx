"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms-context";
import {
  Save,
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  Upload,
  Copy,
  Check,
  Search,
  FolderOpen,
  LayoutGrid
} from "lucide-react";
import BrandingSectionStylesControls from "@/components/admin/BrandingSectionStylesControls";
import { SectionStylesConfig } from "@/lib/styles-helper";

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
  const [activeTab, setActiveTab] = useState<"gallery" | "media">("gallery");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [gallery, setGallery] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [galleryStyles, setGalleryStyles] = useState<SectionStylesConfig>({});
  
  // Search & Copy States
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Drag & Drop Batch Upload States
  const [isDraggingOverPage, setIsDraggingOverPage] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState("");

  // Dialog States
  const [addPhotoOpen, setAddPhotoOpen] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: "", category: "Laboratory" });
  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [adding, setAdding] = useState(false);

  // Quick Add from Media States
  const [quickAddPhoto, setQuickAddPhoto] = useState<any | null>(null);
  const [quickTitle, setQuickTitle] = useState("");
  const [quickCategory, setQuickCategory] = useState("Laboratory");

  const handleFilesBatchUpload = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (validFiles.length === 0) {
      alert("Please drop valid image files (PNG, JPG, WebP, SVG).");
      return;
    }

    setUploadingMedia(true);
    let currentMedia = [...media];
    let currentGallery = [...gallery];
    let count = 0;

    for (const file of validFiles) {
      count++;
      setUploadProgressText(`Uploading ${count} of ${validFiles.length}: ${file.name}...`);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const upload = await fetch("/api/cms/media", { method: "POST", body: formData });
        const uploaded = await upload.json();
        if (upload.ok && uploaded.url) {
          const newMediaItem = {
            id: uploaded.id || `med-${crypto.randomUUID()}`,
            filename: uploaded.filename || file.name,
            url: uploaded.url,
            size: uploaded.size || `${(file.size / 1024).toFixed(1)} KB`,
            mimeType: uploaded.mimeType || file.type,
            altText: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
            uploadedAt: uploaded.uploadedAt || new Date().toISOString().split("T")[0],
          };
          currentMedia = [newMediaItem, ...currentMedia];

          const addedPhoto = {
            id: `gal-${crypto.randomUUID()}`,
            url: uploaded.url,
            title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
            category: "Laboratory",
          };
          currentGallery = [addedPhoto, ...currentGallery];
        }
      } catch (err) {
        console.error("Upload error for file", file.name, err);
      }
    }

    const success = await updateData({ media: currentMedia, gallery: currentGallery });
    if (success) {
      setMedia(currentMedia);
      setGallery(currentGallery);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }
    setUploadingMedia(false);
    setUploadProgressText("");
  };

  useEffect(() => {
    if (data?.gallery) setGallery(data.gallery);
    if (data?.media) setMedia(data.media);
    if ((data as any)?.galleryStyles) setGalleryStyles((data as any).galleryStyles);
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Copy Path Helper
  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Save changes to database
  const handleSaveGallery = async () => {
    setSaving(true);
    const success = await updateData({ gallery, galleryStyles } as any);
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Delete from structured Gallery
  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm("Delete this gallery photo?")) return;
    const updatedGallery = gallery.filter((g) => g.id !== id);
    const success = await updateData({ gallery: updatedGallery });
    if (success) setGallery(updatedGallery);
    else alert("The gallery photo could not be deleted. Please try again.");
  };

  // Add new photo manually with upload
  const handleAddPhoto = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newPhotoFile) {
      alert("Please choose or drop an image file.");
      return;
    }

    setAdding(true);
    try {
      const formData = new FormData();
      formData.append("file", newPhotoFile);
      const upload = await fetch("/api/cms/media", { method: "POST", body: formData });
      const uploaded = await upload.json();
      if (!upload.ok) throw new Error(uploaded.error || "Image upload failed.");

      // Add to public gallery
      const addedPhoto = {
        id: `gal-${crypto.randomUUID()}`,
        url: uploaded.url,
        title: newPhoto.title.trim() || "New Gallery Photo",
        category: newPhoto.category,
      };
      const updatedGallery = [...gallery, addedPhoto];

      // Add to media library array too
      const newMediaItem = {
        id: uploaded.id || `med-${crypto.randomUUID()}`,
        filename: uploaded.filename || newPhotoFile.name,
        url: uploaded.url,
        size: uploaded.size || `${(newPhotoFile.size / 1024).toFixed(1)} KB`,
        mimeType: uploaded.mimeType || newPhotoFile.type,
        altText: newPhoto.title.trim() || newPhotoFile.name.replace(/\.[^/.]+$/, ""),
        uploadedAt: uploaded.uploadedAt || new Date().toISOString().split("T")[0],
      };
      const updatedMedia = [newMediaItem, ...media];

      const success = await updateData({ gallery: updatedGallery, media: updatedMedia });
      if (!success) throw new Error("The gallery/media data could not be saved.");

      setGallery(updatedGallery);
      setMedia(updatedMedia);
      setAddPhotoOpen(false);
      setNewPhoto({ title: "", category: "Laboratory" });
      setNewPhotoFile(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to add this photo.");
    } finally {
      setAdding(false);
    }
  };

  // Upload to raw media library directly
  const handleRawMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingMedia(true);

    try {
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);
      const upload = await fetch("/api/cms/media", { method: "POST", body: formData });
      const uploaded = await upload.json();
      if (!upload.ok) throw new Error(uploaded.error || "File upload failed.");

      const newMediaItem = {
        id: uploaded.id || `med-${crypto.randomUUID()}`,
        filename: uploaded.filename || file.name,
        url: uploaded.url,
        size: uploaded.size || `${(file.size / 1024).toFixed(1)} KB`,
        mimeType: uploaded.mimeType || file.type,
        altText: file.name.replace(/\.[^/.]+$/, ""),
        uploadedAt: uploaded.uploadedAt || new Date().toISOString().split("T")[0],
      };
      const updatedMedia = [newMediaItem, ...media];

      const success = await updateData({ media: updatedMedia });
      if (success) {
        setMedia(updatedMedia);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err: any) {
      alert(err.message || "Failed to upload file.");
    } finally {
      setUploadingMedia(false);
    }
  };

  // Delete from raw media library
  const handleDeleteMediaItem = async (item: any) => {
    if (!confirm("Are you sure you want to permanently delete this media file? It will be deleted from storage.")) return;

    try {
      const response = await fetch("/api/cms/media", {
        method: "DELETE",
        body: JSON.stringify({ url: item.url }),
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) throw new Error("Could not delete from Vercel storage.");

      const updatedMedia = media.filter((m) => m.id !== item.id);
      const updatedGallery = gallery.filter((g) => g.url !== item.url);

      const success = await updateData({ media: updatedMedia, gallery: updatedGallery });
      if (success) {
        setMedia(updatedMedia);
        setGallery(updatedGallery);
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete file.");
    }
  };

  // Add existing media file to Gallery
  const handleQuickAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAddPhoto) return;

    const addedPhoto = {
      id: `gal-${crypto.randomUUID()}`,
      url: quickAddPhoto.url,
      title: quickTitle.trim() || quickAddPhoto.filename.replace(/\.[^/.]+$/, ""),
      category: quickCategory,
    };
    const updatedGallery = [...gallery, addedPhoto];
    const success = await updateData({ gallery: updatedGallery });
    if (success) {
      setGallery(updatedGallery);
      setQuickAddPhoto(null);
      setQuickTitle("");
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      alert("Failed to add photo to Gallery.");
    }
  };

  const filteredMedia = media.filter((m) =>
    m.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] text-[10px] font-bold uppercase tracking-wider text-[#2c5e37] mb-2 font-mono">
            <ImageIcon className="w-3.5 h-3.5 text-[#4e8c4a]" /> Media CMS
          </div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Public Photo Gallery & Media Library</h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            Manage all media assets on the website, upload files, copy URL paths, and organize public gallery items.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> Changes Saved Live!
            </span>
          )}

          {activeTab === "gallery" ? (
            <>
              <button
                onClick={() => setAddPhotoOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#f0f5ef] hover:bg-gray-150 border border-[#d2e4d0] text-[#1c3c24] rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Photo
              </button>
              <button
                onClick={handleSaveGallery}
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
            </>
          ) : (
            <label className="flex items-center gap-2 px-6 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>{uploadingMedia ? "Uploading..." : "Upload New Asset"}</span>
              <input type="file" accept="image/*" onChange={handleRawMediaUpload} className="hidden" />
            </label>
          )}
        </div>
      </div>

      {/* Tabs Controller */}
      <div className="flex border-b border-[#e2e8e0] gap-6">
        <button
          onClick={() => setActiveTab("gallery")}
          className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "gallery"
              ? "border-b-2 border-[#1c3c24] text-[#1c3c24]"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          Public Photo Gallery ({gallery.length})
        </button>
        <button
          onClick={() => setActiveTab("media")}
          className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "media"
              ? "border-b-2 border-[#1c3c24] text-[#1c3c24]"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <FolderOpen className="w-4 h-4" />
          All Media Files ({media.length})
        </button>
      </div>

      {/* Interactive Drag & Drop Upload Zone */}
      <label
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDraggingOverPage(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDraggingOverPage(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDraggingOverPage(false);
          if (e.dataTransfer.files) {
            handleFilesBatchUpload(e.dataTransfer.files);
          }
        }}
        className={`block border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDraggingOverPage
            ? "border-[#4e8c4a] bg-[#f0f5ef] scale-[1.01] shadow-lg"
            : "border-[#d2e4d0] bg-white hover:border-[#4e8c4a] hover:bg-[#f9fbf8] shadow-sm"
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFilesBatchUpload(e.target.files);
          }}
        />
        {uploadingMedia ? (
          <div className="flex flex-col items-center gap-3 text-[#1c3c24]">
            <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
            <div className="text-sm font-bold text-[#1c3c24]">
              {uploadProgressText || "Uploading photos to media library..."}
            </div>
            <p className="text-xs text-gray-500 font-medium">Please wait while files are uploaded and saved.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-[#f0f5ef] border border-[#d2e4d0] rounded-2xl text-[#4e8c4a] group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <div className="text-sm font-extrabold text-[#1c3c24]">
              Drag & Drop Photos Here to Upload
            </div>
            <p className="text-xs text-gray-500 max-w-md">
              Drop single or multiple images directly from your computer. Files are instantly saved and added to your media catalog.
            </p>
            <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 bg-[#f0f5ef] border border-[#d2e4d0] rounded-full text-[10px] font-mono font-bold text-[#2c5e37]">
              Supports PNG, JPG, WebP, SVG · Up to 5 MB each
            </div>
          </div>
        )}
      </label>

      {/* TAB CONTENT: PUBLIC GALLERY */}
      {activeTab === "gallery" && (
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
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={g.url}
                    onChange={(e) => {
                      const updated = [...gallery];
                      updated[idx].url = e.target.value;
                      setGallery(updated);
                    }}
                    className="flex-1 px-3.5 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold outline-none focus:border-[#4e8c4a] transition-all"
                  />
                  <button
                    onClick={() => handleCopyUrl(g.url, g.id)}
                    className="p-2 bg-[#f0f5ef] hover:bg-[#1c3c24] hover:text-white rounded-xl text-[#1c3c24] border border-[#d2e4d0] transition-all cursor-pointer flex items-center justify-center"
                    title="Copy URL"
                  >
                    {copiedId === g.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
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
                  onClick={() => handleDeleteGalleryItem(g.id)} 
                  className="p-2 bg-red-50 hover:bg-red-600 hover:text-white border border-red-150 text-red-700 rounded-xl transition-all cursor-pointer"
                  title="Delete Photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: ALL MEDIA LIBRARY FILES */}
      {activeTab === "media" && (
        <div className="space-y-6">
          {/* Search Box */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-4 top-3.5 text-[#4e8c4a]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search files by name..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#dce4da] rounded-2xl text-[#1c3c24] text-xs font-bold outline-none placeholder-gray-400 focus:border-[#4e8c4a] transition-all shadow-sm"
            />
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#e2e8e0] rounded-2xl p-3 shadow-sm group relative flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-[#f8faf7] border border-[#e2e8e0] rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2 relative">
                  <img
                    src={item.url}
                    alt={item.altText || item.filename}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <div>
                  <div className="text-xs font-bold text-[#1c3c24] truncate" title={item.filename}>
                    {item.filename}
                  </div>
                  <div className="text-[9px] text-gray-500 font-mono mt-0.5">{item.size}</div>
                </div>

                <div className="flex items-center justify-between gap-1.5 pt-2.5 mt-2 border-t border-[#e2e8e0]">
                  <button
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    className="p-1.5 bg-[#f0f5ef] text-[#1c3c24] hover:bg-[#1c3c24] hover:text-white rounded-lg transition-all text-[9px] font-bold flex items-center gap-1 cursor-pointer border border-[#d2e4d0]"
                    title="Copy URL"
                  >
                    {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>

                  <button
                    onClick={() => {
                      setQuickAddPhoto(item);
                      setQuickTitle(item.filename.replace(/\.[^/.]+$/, ""));
                    }}
                    className="p-1.5 bg-[#1c3c24] text-white hover:bg-[#2c5e37] rounded-lg transition-all text-[9px] font-bold flex items-center gap-1 cursor-pointer"
                    title="Add to Public Gallery"
                  >
                    <Plus className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => handleDeleteMediaItem(item)}
                    className="p-1.5 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white rounded-lg transition-all cursor-pointer border border-red-100"
                    title="Delete Media File"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DIALOG: ADD GALLERY PHOTO DIALOG */}
      {addPhotoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#102315]/45 p-4">
          <form onSubmit={handleAddPhoto} className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#1c3c24]">Add Gallery Photo</h2>
                <p className="mt-1 text-xs text-gray-600">Drag an image here or choose one from your files. It will be uploaded and added to the gallery.</p>
              </div>
              <button type="button" onClick={() => setAddPhotoOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl" aria-label="Close dialog">
                <X className="h-5 w-5" />
              </button>
            </div>
            <label
              onDragOver={(event) => { event.preventDefault(); setIsDraggingFile(true); }}
              onDragLeave={() => setIsDraggingFile(false)}
              onDrop={(event) => {
                event.preventDefault();
                setIsDraggingFile(false);
                const file = event.dataTransfer.files?.[0];
                if (file?.type.startsWith("image/")) setNewPhotoFile(file);
                else alert("Please drop an image file.");
              }}
              className={`block cursor-pointer rounded-2xl border-2 border-dashed p-7 text-center transition-colors ${isDraggingFile ? "border-[#4e8c4a] bg-[#f0f5ef]" : "border-[#d2e4d0] bg-[#f9fbf8] hover:border-[#4e8c4a]"}`}
            >
              <input type="file" accept="image/*" className="sr-only" onChange={(event) => setNewPhotoFile(event.target.files?.[0] || null)} />
              <Upload className="mx-auto h-7 w-7 text-[#4e8c4a]" />
              <p className="mt-2 text-xs font-bold text-[#1c3c24]">{newPhotoFile ? newPhotoFile.name : "Drag and drop an image here"}</p>
              <p className="mt-1 text-[11px] text-gray-500">or click to choose from your files · Maximum 4 MB</p>
            </label>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2c5e37] mb-1">Title</label>
              <input value={newPhoto.title} onChange={(event) => setNewPhoto({ ...newPhoto, title: event.target.value })} placeholder="e.g. Laboratory culture preparation" className="w-full px-3.5 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold outline-none focus:border-[#4e8c4a]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2c5e37] mb-1">Category</label>
              <select value={newPhoto.category} onChange={(event) => setNewPhoto({ ...newPhoto, category: event.target.value })} className="w-full px-3.5 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold cursor-pointer">
                <option value="Laboratory">Laboratory</option>
                <option value="Production">Production</option>
                <option value="Genomics">Genomics</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setAddPhotoOpen(false)} className="px-4 py-2 text-xs font-bold text-[#1c3c24]">Cancel</button>
              <button disabled={adding} className="flex items-center gap-2 px-5 py-2.5 bg-[#1c3c24] text-white rounded-xl text-xs font-bold disabled:opacity-60 cursor-pointer">
                {adding ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Upload className="w-4 h-4" />}
                Add photo
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DIALOG: QUICK ADD EXISTING MEDIA TO GALLERY */}
      {quickAddPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#102315]/45 p-4">
          <form onSubmit={handleQuickAddSubmit} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-[#1c3c24]">Add to Public Gallery</h2>
                <p className="mt-0.5 text-xs text-gray-500">Add "{quickAddPhoto.filename}" to the public slideshow/gallery.</p>
              </div>
              <button type="button" onClick={() => setQuickAddPhoto(null)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl" aria-label="Close dialog">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="aspect-video max-h-32 bg-[#f9fbf8] border border-[#e2e8e0] rounded-xl overflow-hidden flex items-center justify-center p-2">
              <img src={quickAddPhoto.url} className="max-h-full object-contain rounded-lg" alt="Preview" />
            </div>

            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#2c5e37] mb-1">Image Title</label>
              <input
                value={quickTitle}
                onChange={(e) => setQuickTitle(e.target.value)}
                placeholder="e.g. Mycelium expansion"
                className="w-full px-3.5 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold outline-none focus:border-[#4e8c4a]"
                required
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#2c5e37] mb-1">Category</label>
              <select
                value={quickCategory}
                onChange={(e) => setQuickCategory(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold cursor-pointer"
              >
                <option value="Laboratory">Laboratory</option>
                <option value="Production">Production</option>
                <option value="Genomics">Genomics</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setQuickAddPhoto(null)} className="px-4 py-2 text-xs font-bold text-[#1c3c24]">Cancel</button>
              <button type="submit" className="px-5 py-2.5 bg-[#1c3c24] text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-[#2c5e37]">
                Add to Gallery
              </button>
            </div>
          </form>
        </div>
      )}

      <BrandingSectionStylesControls
        sectionName="Media & Photo Gallery"
        styles={galleryStyles}
        onChange={setGalleryStyles}
      />
    </div>
  );
}
