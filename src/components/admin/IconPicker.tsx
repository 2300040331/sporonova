"use client";

import React, { useState } from "react";
import { Search, X, Grid, Heart, Sliders, ChevronDown } from "lucide-react";
import { ICON_CATEGORIES, getIconComponent } from "@/lib/icon-registry";

interface IconPickerProps {
  value?: string;
  onChange: (iconName: string) => void;
  label?: string;
}

export default function IconPicker({ value = "Leaf", onChange, label = "Select Icon" }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const SelectedIcon = getIconComponent(value) || getIconComponent("Leaf") || Grid;

  // Filter icons based on search term
  const allCategories = Object.keys(ICON_CATEGORIES);
  
  const getFilteredIcons = () => {
    if (!searchTerm) {
      if (activeCategory) {
        return ICON_CATEGORIES[activeCategory] || [];
      }
      // Default to showing first category or all
      return ICON_CATEGORIES["Nature & Agriculture"] || [];
    }

    const term = searchTerm.toLowerCase();
    const matches: string[] = [];
    Object.values(ICON_CATEGORIES).flat().forEach((icon) => {
      if (icon.toLowerCase().includes(term) && !matches.includes(icon)) {
        matches.push(icon);
      }
    });
    return matches;
  };

  const filteredIcons = getFilteredIcons();

  return (
    <div className="space-y-1">
      {label && <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">{label}</label>}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 bg-white hover:bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold transition-all cursor-pointer shadow-sm text-left"
        >
          <div className="flex items-center gap-2">
            <div className="p-1 bg-[#f0f5ef] rounded-lg text-[#4e8c4a]">
              <SelectedIcon className="w-4 h-4" />
            </div>
            <span>{value || "Leaf (Default)"}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 mt-1.5 bg-white border border-[#e2e8e0] rounded-2xl shadow-xl z-50 p-4 space-y-3 min-w-[280px]">
            {/* Header / Search */}
            <div className="flex items-center justify-between gap-2 border-b border-[#e2e8e0] pb-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search 200+ icons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs outline-none focus:border-[#4e8c4a]"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-650 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category tabs (only if not searching) */}
            {!searchTerm && (
              <div className="flex gap-1 overflow-x-auto pb-1.5 scrollbar-none border-b border-[#e2e8e0] -mx-4 px-4">
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer ${
                    activeCategory === null
                      ? "bg-[#1c3c24] text-white"
                      : "text-[#2c5e37] hover:bg-[#f0f5ef]"
                  }`}
                >
                  All
                </button>
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#1c3c24] text-white"
                        : "text-[#2c5e37] hover:bg-[#f0f5ef]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Icons Grid */}
            <div className="grid grid-cols-5 gap-2 max-h-[180px] overflow-y-auto pr-1">
              {filteredIcons.map((iconName) => {
                const IconComp = getIconComponent(iconName) || Grid;
                const isSelected = value === iconName;
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => {
                      onChange(iconName);
                      setIsOpen(false);
                    }}
                    title={iconName}
                    className={`p-2 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#1c3c24] border-[#1c3c24] text-white shadow-sm"
                        : "bg-[#f9fbf8] border-[#dce4da] text-[#2c5e37] hover:bg-[#f0f5ef] hover:border-[#4e8c4a]"
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </button>
                );
              })}
              {filteredIcons.length === 0 && (
                <div className="col-span-full py-4 text-center text-[10px] text-gray-500 font-bold">
                  No matching icons found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
