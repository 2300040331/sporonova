"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { ICON_CATEGORIES, getIconComponent } from "@/lib/icon-registry";
import { 
  Palette, 
  Search, 
  Check, 
  Copy, 
  CheckCircle2, 
  Save, 
  HelpCircle,
  Sparkles,
  Sliders,
  Type,
  LayoutGrid
} from "lucide-react";

export default function IconLibraryCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Styling forms
  const [iconColor, setIconColor] = useState("");
  const [iconBgColor, setIconBgColor] = useState("");
  const [iconSize, setIconSize] = useState("");
  const [iconBorderRadius, setIconBorderRadius] = useState("");

  // Sync state from CMS on load
  React.useEffect(() => {
    if (data?.settings) {
      setIconColor((data.settings as any).iconColor || "#4e8c4a");
      setIconBgColor((data.settings as any).iconBgColor || "#f9faf7");
      setIconSize((data.settings as any).iconSize || "24");
      setIconBorderRadius((data.settings as any).iconBorderRadius || "16");
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedIcon(name);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  const handleSaveStyles = async () => {
    // Optimistic Save for instant feedback
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);

    setSaving(true);
    const updatedSettings = {
      ...data.settings,
      iconColor,
      iconBgColor,
      iconSize,
      iconBorderRadius,
    };
    await updateData({ settings: updatedSettings as any });
    setSaving(false);
  };

  // Filter icons
  const categories = Object.keys(ICON_CATEGORIES);
  const getFilteredIcons = () => {
    const allIcons = Object.values(ICON_CATEGORIES).flat();
    const term = searchTerm.toLowerCase();
    
    if (term) {
      return allIcons.filter((i) => i.toLowerCase().includes(term));
    }
    if (activeCategory) {
      return ICON_CATEGORIES[activeCategory] || [];
    }
    return allIcons;
  };

  const displayedIcons = getFilteredIcons();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] text-[10px] font-bold uppercase tracking-wider text-[#2c5e37] mb-2 font-mono">
            <Palette className="w-3.5 h-3.5 text-[#4e8c4a]" /> Asset Manager
          </div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">SporoNova Icon & Symbols Library</h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Browse all dynamic icons, copy their names to apply in sections, and configure global default icon styles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> Icon Settings Published!
            </span>
          )}
          <button
            onClick={handleSaveStyles}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Icon Customization
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Global Customization Controls */}
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 shadow-sm space-y-6 self-start">
          <div className="border-b border-[#e2e8e0] pb-3">
            <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#4e8c4a]" /> Default Icon Styling
            </h2>
            <p className="text-[10px] text-gray-500 font-medium mt-0.5">
              These settings apply to stats and credentials unless overridden in section branding.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Color */}
            <div>
              <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Default Icon Color</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={iconColor}
                  onChange={(e) => setIconColor(e.target.value)}
                  className="w-9 h-9 rounded-xl cursor-pointer border border-[#dce4da] shrink-0"
                />
                <input
                  type="text"
                  value={iconColor}
                  onChange={(e) => setIconColor(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] font-mono font-bold"
                />
              </div>
            </div>

            {/* Background Color */}
            <div>
              <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Icon Container Background</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={iconBgColor}
                  onChange={(e) => setIconBgColor(e.target.value)}
                  className="w-9 h-9 rounded-xl cursor-pointer border border-[#dce4da] shrink-0"
                />
                <input
                  type="text"
                  value={iconBgColor}
                  onChange={(e) => setIconBgColor(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] font-mono font-bold"
                />
              </div>
            </div>

            {/* Icon Size */}
            <div>
              <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Icon Size (px)</label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="24"
                  value={iconSize}
                  onChange={(e) => setIconSize(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] font-bold"
                />
                <button
                  type="button"
                  onClick={() => setIconSize("24")}
                  className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider border border-[#d2e4d0] bg-[#f0f5ef] hover:bg-[#1c3c24] hover:text-white text-[#2c5e37] rounded-lg transition-all cursor-pointer whitespace-nowrap"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Container Border Radius */}
            <div>
              <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Container Border Radius (px)</label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="16"
                  value={iconBorderRadius}
                  onChange={(e) => setIconBorderRadius(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] font-bold"
                />
                <button
                  type="button"
                  onClick={() => setIconBorderRadius("16")}
                  className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider border border-[#d2e4d0] bg-[#f0f5ef] hover:bg-[#1c3c24] hover:text-white text-[#2c5e37] rounded-lg transition-all cursor-pointer whitespace-nowrap"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="bg-[#f9fbf8] border border-[#dce4da] rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 mt-4">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Live Styling Preview</span>
              <div 
                className="flex items-center justify-center p-3 transition-all"
                style={{ 
                  backgroundColor: iconBgColor, 
                  borderRadius: `${iconBorderRadius}px`
                }}
              >
                <div style={{ color: iconColor }}>
                  {React.createElement(getIconComponent("Leaf") || Sparkles, {
                    style: { width: `${iconSize}px`, height: `${iconSize}px` }
                  })}
                </div>
              </div>
              <span className="text-[10px] text-gray-500 font-bold font-mono">Leaf Preview</span>
            </div>
          </div>
        </div>

        {/* Right Side: Icons Search and Showcase Grid */}
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 shadow-sm lg:col-span-2 space-y-5">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border-b border-[#e2e8e0] pb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search icon names (e.g. Leaf, Flask, Award)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-xs text-[#1c3c24] font-medium outline-none focus:border-[#4e8c4a]"
              />
            </div>
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="text-xs text-red-650 hover:underline font-bold self-center cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>

          {/* Category Tabs (only if not searching) */}
          {!searchTerm && (
            <div className="flex flex-wrap gap-1 bg-[#f0f5ef] border border-[#d2e4d0] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === null
                    ? "bg-[#1c3c24] text-white shadow-sm font-bold"
                    : "text-[#2d5034] hover:bg-white/50 hover:text-[#1c3c24]"
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#1c3c24] text-white shadow-sm font-bold"
                      : "text-[#2d5034] hover:bg-white/50 hover:text-[#1c3c24]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Icons Grid Container */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
            {displayedIcons.map((iconName) => {
              const IconComponent = getIconComponent(iconName) || HelpCircle;
              const isCopied = copiedIcon === iconName;
              return (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => handleCopy(iconName)}
                  className={`flex flex-col items-center justify-center p-4 border rounded-2xl transition-all cursor-pointer relative group text-center ${
                    isCopied
                      ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                      : "bg-[#f9fbf8] border-[#e2e8e0] text-[#1c3c24] hover:bg-white hover:border-[#4e8c4a]/50 hover:shadow-md"
                  }`}
                >
                  {/* Top copy hover helper */}
                  <span className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </span>

                  <div className="p-2 rounded-xl bg-white border border-[#e6e4dc] mb-2 text-[#4e8c4a] group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-mono font-bold truncate w-full px-1">{iconName}</span>
                </button>
              );
            })}
            {displayedIcons.length === 0 && (
              <div className="col-span-full py-12 text-center text-xs text-gray-500 font-bold">
                No matching icons found for "{searchTerm}"
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
