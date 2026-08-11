"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { Plus, Edit2, Trash2, Save, Star, Eye, EyeOff, Package, FileText, CheckCircle2, X } from "lucide-react";

function ProductThumbnail({ src, alt }: { src?: string; alt: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError || !src) {
    return (
      <div className="w-10 h-10 bg-emerald-950/60 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 shrink-0">
        <Package className="w-5 h-5" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setImgError(true)}
      className="w-10 h-10 object-contain bg-black/40 border border-white/10 rounded-xl p-1 shrink-0"
    />
  );
}

export default function ProductsCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
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
      specifications: { Purity: "99.9%", Storage: "2°C - 4°C" },
      sortOrder: data.products.length + 1,
    };
    setEditingProduct(newProd);
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

    await updateData({ products: updatedProducts });
    setSaving(false);
    setEditingProduct(null);
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Product Catalog Management</h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Manage Sporonova spawn products, categories, specifications, galleries, and PDF documentation.
          </p>
        </div>

        <button
          onClick={handleAddNewProduct}
          className="flex items-center gap-2 px-5 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
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
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#1c3c24] text-sm">{product.name}</div>
                    <div className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 font-medium">
                      {product.desc}
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
                        onClick={() => setEditingProduct({ ...product })}
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-[#1c3c24] shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-[#1c3c24]">
                <Package className="w-5 h-5 text-[#4e8c4a]" /> Edit Product: {editingProduct.name}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={editingProduct.name || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={editingProduct.category || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={editingProduct.desc || ""}
                onChange={(e) => setEditingProduct({ ...editingProduct, desc: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">
                  Thumbnail Image Path
                </label>
                <input
                  type="text"
                  value={editingProduct.thumbnail || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, thumbnail: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">
                  URL Slug / Path
                </label>
                <input
                  type="text"
                  value={editingProduct.href || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, href: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-semibold"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e2e8e0]">
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
                className="px-6 py-2.5 bg-[#1c3c24] hover:bg-[#2c5e37] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow"
              >
                <Save className="w-4 h-4" /> Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
