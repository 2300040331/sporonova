"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import ImageUploadDropzone from "@/components/admin/ImageUploadDropzone";
import BrandingSectionStylesControls from "@/components/admin/BrandingSectionStylesControls";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  Package, 
  CheckCircle2, 
  X, 
  BookOpen, 
  Cpu, 
  Settings, 
  FileText, 
  Award, 
  HelpCircle,
  Truck
} from "lucide-react";

function ProductThumbnail({ src, alt }: { src?: string; alt: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError || !src) {
    return (
      <div className="w-10 h-10 bg-[#f0f5ef] border border-[#d2e4d0] rounded-xl flex items-center justify-center text-[#4e8c4a] shrink-0">
        <Package className="w-5 h-5" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setImgError(true)}
      className="w-10 h-10 object-contain bg-[#f9faf7] border border-[#e6e4dc] rounded-xl p-1 shrink-0"
    />
  );
}

export default function ProductsCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [modalTab, setModalTab] = useState<"basic" | "science" | "ingredients" | "process" | "logistics" | "faqs">("basic");

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleAddNewProduct = () => {
    const newProd = {
      id: `prod-${Date.now()}`,
      name: "New Mushroom Product",
      category: "Industrial Inoculant",
      desc: "High quality mycelium spawn matrix optimized for commercial mushroom farming.",
      href: "/spawn/new-product",
      status: "Published" as const,
      featured: false,
      thumbnail: "/liquid_spawn_bottle.png",
      images: ["/liquid_spawn_bottle.png"],
      specifications: { Storage: "2°C - 4°C", ShelfLife: "90 Days" },
      sortOrder: data.products.length + 1,
      scientificName: "Genomic Isolation (G0)",
      introduction: "Pre-colonized, fully matured substrate blocks engineered for instant fruiting...",
      history: "Adapted from standard bacteriological methods...",
      principle: "Mycelium requires carbon, nitrogen, and minerals...",
      composition: ["Organic grain matrices", "Gypsum mineral balancer"],
      advantages: ["Rapid colonization", "Zero contamination"],
      disadvantages: ["Short shelf life"],
      applications: ["Commercial bed inoculation"],
      process: ["Hydrate substrate", "Autoclave sterilize"],
      labSpecs: ["Class 100 sterile bench"],
      storage: "Store in cool dark refrigeration.",
      shelfLife: "60 Days peak viability.",
      transport: "Refrigerated freight logistics cargo.",
      qualityTesting: ["Agar sector plate testing"],
      commercialUses: "Industrial commercial farms.",
      govApplications: "Distributed under horticulture development initiatives.",
      faqs: [
        { q: "Is this sterile?", a: "Yes, fully autoclaved and HEPA sealed." },
        { q: "What is the recommended inoculation rate?", a: "Standard 2% to 5% by weight." }
      ],
      papers: [
        { title: "Mushroom Cultivation Standard Protocols", author: "Dr. Kenji Sato", journal: "Journal of Agritech, 2024" }
      ]
    };
    setEditingProduct(newProd);
    setModalTab("basic");
  };

  const handleSaveProduct = async (productToSave: any) => {
    setSaving(true);
    let updatedProducts = [...data.products];
    const index = updatedProducts.findIndex((p) => p.id === productToSave.id);

    if (index >= 0) {
      updatedProducts[index] = productToSave;
    } else {
      updatedProducts.push(productToSave);
    }

    const success = await updateData({ products: updatedProducts });
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updated = data.products.filter((p) => p.id !== id);
      await updateData({ products: updated });
    }
  };

  const handleToggleStatus = async (product: any) => {
    const newStatus = (product.status === "Published" ? "Hidden" : "Published") as "Published" | "Draft" | "Hidden";
    const updatedProducts = data.products.map((p) =>
      p.id === product.id ? { ...p, status: newStatus } : p
    );
    await updateData({ products: updatedProducts });
  };

  // Helper to sync comma-separated strings to array fields
  const syncArrayField = (field: string, textValue: string) => {
    const arr = textValue.split(",").map(s => s.trim()).filter(Boolean);
    setEditingProduct({ ...editingProduct, [field]: arr });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] text-[10px] font-bold uppercase tracking-wider text-[#2c5e37] mb-2 font-mono">
            <Package className="w-3.5 h-3.5 text-[#4e8c4a]" /> Catalog CMS
          </div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Product Catalog Management</h1>
          <p className="text-xs text-gray-650 mt-1 font-medium">
            Manage SporoNova spawn products, scientific parameters, timeline steps, logistics, and FAQs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> Catalog Updated Live!
            </span>
          )}
          <button
            onClick={handleAddNewProduct}
            className="flex items-center gap-2 px-5 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>
      </div>

      {/* Product List Table */}
      <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e2e8e0] bg-[#f9fbf8] text-[11px] font-mono uppercase tracking-wider text-[#2c5e37]">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8e0] text-xs">
              {data.products.map((product) => (
                <tr key={product.id} className="hover:bg-[#f9fbf8] transition-colors">
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <ProductThumbnail src={product.thumbnail} alt={product.name} />
                    <div>
                      <div className="font-bold text-[#1c3c24] text-sm">{product.name}</div>
                      <div className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 font-medium">
                        {product.desc}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#2c5e37] font-semibold">{product.category}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleStatus(product)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                        product.status === "Published"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-gray-100 text-gray-600 border border-gray-200"
                      }`}
                    >
                      {product.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct({ ...product });
                          setModalTab("basic");
                        }}
                        className="p-2 bg-[#f0f5ef] border border-[#d2e4d0] text-[#1c3c24] hover:bg-[#1c3c24] hover:text-white rounded-xl transition-all cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 bg-red-50 border border-red-200 text-red-700 hover:bg-red-600 hover:text-white rounded-xl transition-all cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 sm:p-8 max-w-3xl w-full text-[#1c3c24] shadow-2xl space-y-5 my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#4e8c4a]" />
                <div>
                  <h3 className="text-base font-bold text-[#1c3c24]">Edit Spawn Specifications</h3>
                  <p className="text-[10px] text-gray-500 font-bold">{editingProduct.name}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tab Headers */}
            <div className="flex flex-wrap gap-1 bg-[#f0f5ef] border border-[#d2e4d0] p-1 rounded-xl">
              {[
                { id: "basic", label: "Basic Info", icon: Settings },
                { id: "science", label: "Science Parameters", icon: BookOpen },
                { id: "ingredients", label: "Ingredients", icon: Award },
                { id: "process", label: "Process & Tech", icon: Cpu },
                { id: "logistics", label: "Logistics", icon: Truck },
                { id: "faqs", label: "FAQs & Papers", icon: HelpCircle }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setModalTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      modalTab === tab.id
                        ? "bg-[#1c3c24] text-white shadow-sm font-bold"
                        : "text-[#2d5034] hover:bg-white/50 hover:text-[#1c3c24]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Modal Body - Tab contents (Scrollable max height) */}
            <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-1 scrollbar-thin">
              
              {/* TAB 1: BASIC INFO */}
              {modalTab === "basic" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Product Name</label>
                      <input
                        type="text"
                        value={editingProduct.name || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Category</label>
                      <input
                        type="text"
                        value={editingProduct.category || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                        className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Brief Description (Catalog Grid)</label>
                    <textarea
                      rows={2}
                      value={editingProduct.desc || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, desc: e.target.value })}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                    />
                  </div>

                  <div>
                    <ImageUploadDropzone
                      label="Product Thumbnail Photo"
                      value={editingProduct.thumbnail || ""}
                      onChange={(url) => setEditingProduct({ ...editingProduct, thumbnail: url, images: [url] })}
                      requiredWidth={600}
                      requiredHeight={600}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">URL Route Slug</label>
                    <input
                      type="text"
                      value={editingProduct.href || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, href: e.target.value })}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: SCIENCE PARAMETERS */}
              {modalTab === "science" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Scientific / Formulation Name</label>
                      <input
                        type="text"
                        value={editingProduct.scientificName || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, scientificName: e.target.value })}
                        className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                        placeholder="e.g. Mycelial Biomass Broth"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Introductory Subtitle</label>
                      <input
                        type="text"
                        value={editingProduct.introduction || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, introduction: e.target.value })}
                        className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Historical Context</label>
                    <textarea
                      rows={2}
                      value={editingProduct.history || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, history: e.target.value })}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Scientific Principles</label>
                    <textarea
                      rows={2}
                      value={editingProduct.principle || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, principle: e.target.value })}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: INGREDIENTS & ADVANTAGES */}
              {modalTab === "ingredients" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                      Biomass Nutrient Composition (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={(editingProduct.composition || []).join(", ")}
                      onChange={(e) => syncArrayField("composition", e.target.value)}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                      Cultivation Advantages (Comma-separated)
                    </label>
                    <textarea
                      rows={2}
                      value={(editingProduct.advantages || []).join(", ")}
                      onChange={(e) => syncArrayField("advantages", e.target.value)}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                      Cultivation Limitations / Disadvantages (Comma-separated)
                    </label>
                    <textarea
                      rows={2}
                      value={(editingProduct.disadvantages || []).join(", ")}
                      onChange={(e) => syncArrayField("disadvantages", e.target.value)}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: PROCESS & REQUIREMENTS */}
              {modalTab === "process" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                      Lab Production Timeline Stages (Comma-separated)
                    </label>
                    <textarea
                      rows={2}
                      value={(editingProduct.process || []).join(", ")}
                      onChange={(e) => syncArrayField("process", e.target.value)}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                      Cleanroom Laboratory Hardware Requirements (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={(editingProduct.labSpecs || []).join(", ")}
                      onChange={(e) => syncArrayField("labSpecs", e.target.value)}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                      Recommended Practical Applications (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={(editingProduct.applications || []).join(", ")}
                      onChange={(e) => syncArrayField("applications", e.target.value)}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: LOGISTICS */}
              {modalTab === "logistics" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Storage Mode & Temp</label>
                      <input
                        type="text"
                        value={editingProduct.storage || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, storage: e.target.value })}
                        className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Shelf Life Duration</label>
                      <input
                        type="text"
                        value={editingProduct.shelfLife || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, shelfLife: e.target.value })}
                        className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Logistics Pipeline & Transport Details</label>
                    <input
                      type="text"
                      value={editingProduct.transport || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, transport: e.target.value })}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                      Sterility Quality testing items (Comma-separated)
                    </label>
                    <textarea
                      rows={2}
                      value={(editingProduct.qualityTesting || []).join(", ")}
                      onChange={(e) => syncArrayField("qualityTesting", e.target.value)}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Commercial Uses</label>
                      <input
                        type="text"
                        value={editingProduct.commercialUses || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, commercialUses: e.target.value })}
                        className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Government/Aid Applications</label>
                      <input
                        type="text"
                        value={editingProduct.govApplications || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, govApplications: e.target.value })}
                        className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: FAQS & PAPERS */}
              {modalTab === "faqs" && (
                <div className="space-y-4">
                  <div className="border-b border-[#e2e8e0] pb-2">
                    <span className="text-[10px] font-mono text-[#2c5e37] font-bold uppercase">Frequently Asked Questions</span>
                  </div>

                  {/* FAQ 1 */}
                  <div className="bg-[#f9fbf8] border border-[#dce4da] p-3 rounded-xl space-y-2">
                    <span className="text-[9px] font-mono font-bold text-[#4e8c4a]">FAQ #1</span>
                    <div>
                      <label className="block text-[9px] font-bold text-[#2c5e37] uppercase">Question</label>
                      <input
                        type="text"
                        value={editingProduct.faqs?.[0]?.q || ""}
                        onChange={(e) => {
                          const faqs = [...(editingProduct.faqs && editingProduct.faqs.length >= 2 
                            ? editingProduct.faqs 
                            : [
                                editingProduct.faqs?.[0] || { q: "", a: "" },
                                editingProduct.faqs?.[1] || { q: "", a: "" }
                              ])];
                          faqs[0] = { ...faqs[0], q: e.target.value };
                          setEditingProduct({ ...editingProduct, faqs });
                        }}
                        className="w-full px-2 py-1 bg-white border border-[#dce4da] rounded-lg text-[#1c3c24] text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#2c5e37] uppercase">Answer</label>
                      <textarea
                        rows={2}
                        value={editingProduct.faqs?.[0]?.a || ""}
                        onChange={(e) => {
                          const faqs = [...(editingProduct.faqs && editingProduct.faqs.length >= 2 
                            ? editingProduct.faqs 
                            : [
                                editingProduct.faqs?.[0] || { q: "", a: "" },
                                editingProduct.faqs?.[1] || { q: "", a: "" }
                              ])];
                          faqs[0] = { ...faqs[0], a: e.target.value };
                          setEditingProduct({ ...editingProduct, faqs });
                        }}
                        className="w-full px-2 py-1 bg-white border border-[#dce4da] rounded-lg text-[#1c3c24] text-xs font-medium"
                      />
                    </div>
                  </div>

                  {/* FAQ 2 */}
                  <div className="bg-[#f9fbf8] border border-[#dce4da] p-3 rounded-xl space-y-2">
                    <span className="text-[9px] font-mono font-bold text-[#4e8c4a]">FAQ #2</span>
                    <div>
                      <label className="block text-[9px] font-bold text-[#2c5e37] uppercase">Question</label>
                      <input
                        type="text"
                        value={editingProduct.faqs?.[1]?.q || ""}
                        onChange={(e) => {
                          const faqs = [...(editingProduct.faqs && editingProduct.faqs.length >= 2 
                            ? editingProduct.faqs 
                            : [
                                editingProduct.faqs?.[0] || { q: "", a: "" },
                                editingProduct.faqs?.[1] || { q: "", a: "" }
                              ])];
                          faqs[1] = { ...faqs[1], q: e.target.value };
                          setEditingProduct({ ...editingProduct, faqs });
                        }}
                        className="w-full px-2 py-1 bg-white border border-[#dce4da] rounded-lg text-[#1c3c24] text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#2c5e37] uppercase">Answer</label>
                      <textarea
                        rows={2}
                        value={editingProduct.faqs?.[1]?.a || ""}
                        onChange={(e) => {
                          const faqs = [...(editingProduct.faqs && editingProduct.faqs.length >= 2 
                            ? editingProduct.faqs 
                            : [
                                editingProduct.faqs?.[0] || { q: "", a: "" },
                                editingProduct.faqs?.[1] || { q: "", a: "" }
                              ])];
                          faqs[1] = { ...faqs[1], a: e.target.value };
                          setEditingProduct({ ...editingProduct, faqs });
                        }}
                        className="w-full px-2 py-1 bg-white border border-[#dce4da] rounded-lg text-[#1c3c24] text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="border-b border-[#e2e8e0] pb-2 pt-2">
                    <span className="text-[10px] font-mono text-[#2c5e37] font-bold uppercase">Genomic Whitepapers & Publications</span>
                  </div>

                  {/* Scientific Paper 1 */}
                  <div className="bg-[#f9fbf8] border border-[#dce4da] p-3 rounded-xl space-y-2">
                    <span className="text-[9px] font-mono font-bold text-[#4e8c4a]">Whitepaper Publication Reference</span>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="block text-[9px] font-bold text-[#2c5e37] uppercase">Paper Title</label>
                        <input
                          type="text"
                          value={editingProduct.papers?.[0]?.title || ""}
                          onChange={(e) => {
                            const papers = [...(editingProduct.papers && editingProduct.papers.length >= 1
                              ? editingProduct.papers
                              : [editingProduct.papers?.[0] || { title: "", author: "", journal: "" }])];
                            papers[0] = { ...papers[0], title: e.target.value };
                            setEditingProduct({ ...editingProduct, papers });
                          }}
                          className="w-full px-2 py-1 bg-white border border-[#dce4da] rounded-lg text-[#1c3c24] text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-[#2c5e37] uppercase">Author</label>
                        <input
                          type="text"
                          value={editingProduct.papers?.[0]?.author || ""}
                          onChange={(e) => {
                            const papers = [...(editingProduct.papers && editingProduct.papers.length >= 1
                              ? editingProduct.papers
                              : [editingProduct.papers?.[0] || { title: "", author: "", journal: "" }])];
                            papers[0] = { ...papers[0], author: e.target.value };
                            setEditingProduct({ ...editingProduct, papers });
                          }}
                          className="w-full px-2 py-1 bg-white border border-[#dce4da] rounded-lg text-[#1c3c24] text-xs font-bold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#2c5e37] uppercase">Journal & Year</label>
                      <input
                        type="text"
                        value={editingProduct.papers?.[0]?.journal || ""}
                        onChange={(e) => {
                          const papers = [...(editingProduct.papers && editingProduct.papers.length >= 1
                            ? editingProduct.papers
                            : [editingProduct.papers?.[0] || { title: "", author: "", journal: "" }])];
                          papers[0] = { ...papers[0], journal: e.target.value };
                          setEditingProduct({ ...editingProduct, papers });
                        }}
                        className="w-full px-2 py-1 bg-white border border-[#dce4da] rounded-lg text-[#1c3c24] text-xs font-semibold"
                        placeholder="e.g. Journal of Applied Mycology, 2024"
                      />
                    </div>
                  </div>
                </div>
              )}

            <BrandingSectionStylesControls
              sectionName="Product Display Style"
              styles={editingProduct.styles}
              onChange={(newStyles) => setEditingProduct({ ...editingProduct, styles: newStyles })}
            />

            </div>

            {/* Modal Footer actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e2e8e0]">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Revert product changes to current saved state?")) {
                    const original = data.products.find((p) => p.id === editingProduct.id);
                    if (original) {
                      setEditingProduct({ ...original });
                    }
                  }
                }}
                className="px-5 py-2.5 border border-[#dce4da] hover:bg-[#f0f5ef] text-[#2c5e37] font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer font-sans"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-5 py-2.5 bg-[#f0f5ef] hover:bg-gray-200 border border-[#d2e4d0] rounded-xl text-xs font-bold text-[#1c3c24]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveProduct(editingProduct)}
                disabled={saving}
                className="px-6 py-2.5 bg-[#1c3c24] hover:bg-[#2c5e37] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow cursor-pointer"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Product
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
