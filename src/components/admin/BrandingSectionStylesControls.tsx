"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Palette, Type, LayoutGrid, Sliders, RotateCcw } from "lucide-react";
import { SectionStylesConfig } from "@/lib/styles-helper";

interface BrandingSectionStylesControlsProps {
  styles?: SectionStylesConfig;
  onChange: (updatedStyles: SectionStylesConfig) => void;
  sectionName: string;
}

// Sporonova default theme values
const DEFAULTS: Record<string, string> = {
  backgroundColor: "#f9faf7",
  textColor: "#1c3c24",
  headingColor: "#1c3c24",
  borderColor: "#e6e4dc",
  iconColor: "#4e8c4a",
  buttonColor: "#1c3c24",
  buttonTextColor: "#ffffff",
  cardBgColor: "#ffffff",
  cardTextColor: "#1c3c24",
  headingSize: "36",
  paragraphSize: "14",
  buttonTextSize: "12",
  borderRadius: "16",
  iconSize: "24",
  fontFamily: "Outfit, sans-serif",
  textAlign: "left",
  lineHeight: "1.6",
  letterSpacing: "0em",
};

// Comprehensive font list like MS Word / Excel
const FONT_FAMILIES = [
  "Outfit, sans-serif",
  "Arial, sans-serif",
  "Arial Black, sans-serif",
  "Helvetica, sans-serif",
  "Helvetica Neue, sans-serif",
  "Verdana, sans-serif",
  "Tahoma, sans-serif",
  "Trebuchet MS, sans-serif",
  "Gill Sans, sans-serif",
  "Calibri, sans-serif",
  "Segoe UI, sans-serif",
  "Roboto, sans-serif",
  "Open Sans, sans-serif",
  "Lato, sans-serif",
  "Montserrat, sans-serif",
  "Poppins, sans-serif",
  "Inter, sans-serif",
  "Nunito, sans-serif",
  "Raleway, sans-serif",
  "Work Sans, sans-serif",
  "DM Sans, sans-serif",
  "Source Sans Pro, sans-serif",
  "Manrope, sans-serif",
  "Barlow, sans-serif",
  "Josefin Sans, sans-serif",
  "Quicksand, sans-serif",
  "Mulish, sans-serif",
  "Ubuntu, sans-serif",
  "Rubik, sans-serif",
  "Noto Sans, sans-serif",
  "Figtree, sans-serif",
  "Plus Jakarta Sans, sans-serif",
  "Space Grotesk, sans-serif",
  "Sora, sans-serif",
  "Albert Sans, sans-serif",
  "Times New Roman, serif",
  "Georgia, serif",
  "Garamond, serif",
  "Palatino, serif",
  "Book Antiqua, serif",
  "Cambria, serif",
  "Merriweather, serif",
  "Playfair Display, serif",
  "Lora, serif",
  "PT Serif, serif",
  "Noto Serif, serif",
  "Libre Baskerville, serif",
  "EB Garamond, serif",
  "DM Serif Display, serif",
  "Courier New, monospace",
  "Consolas, monospace",
  "Monaco, monospace",
  "Fira Code, monospace",
  "JetBrains Mono, monospace",
  "Source Code Pro, monospace",
  "IBM Plex Mono, monospace",
  "Space Mono, monospace",
  "Roboto Mono, monospace",
  "Comic Sans MS, cursive",
  "Brush Script MT, cursive",
  "Impact, sans-serif",
  "Lucida Console, monospace",
  "Franklin Gothic Medium, sans-serif",
  "Century Gothic, sans-serif",
  "Futura, sans-serif",
  "Avenir, sans-serif",
  "Optima, sans-serif",
];

// Font sizes like MS Word / Excel
const FONT_SIZES = [
  "8", "9", "10", "10.5", "11", "12", "14", "16", "18", "20",
  "22", "24", "26", "28", "32", "36", "40", "44", "48", "54",
  "60", "66", "72", "80", "88", "96",
];

// Text alignment options
const TEXT_ALIGNS = ["left", "center", "right", "justify"];

// Line height options
const LINE_HEIGHTS = ["1", "1.15", "1.2", "1.4", "1.5", "1.6", "1.8", "2", "2.5", "3"];

// Letter spacing options
const LETTER_SPACINGS = ["-0.05em", "-0.025em", "0em", "0.025em", "0.05em", "0.075em", "0.1em", "0.15em", "0.2em"];

// Border radius presets
const BORDER_RADII = ["0", "4", "8", "12", "16", "20", "24", "32", "9999"];

function DefaultBtn({ onClick, title }: { onClick: () => void; title?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title || "Apply Default"}
      className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider border border-[#d2e4d0] bg-[#f0f5ef] hover:bg-[#1c3c24] hover:text-white text-[#2c5e37] rounded-lg transition-all cursor-pointer whitespace-nowrap"
    >
      Default
    </button>
  );
}

export default function BrandingSectionStylesControls({
  styles = {},
  onChange,
  sectionName,
}: BrandingSectionStylesControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"typography" | "colors" | "spacing" | "cards">("typography");

  const updateStyle = (key: keyof SectionStylesConfig, value: any) => {
    onChange({ ...styles, [key]: value === "" ? undefined : value });
  };

  const applyDefault = (key: string) => {
    updateStyle(key as keyof SectionStylesConfig, DEFAULTS[key]);
  };

  const clearStyles = () => {
    if (window.confirm(`Reset all styling customizations for ${sectionName}?`)) {
      onChange({});
    }
  };

  const applyAllDefaults = () => {
    if (window.confirm(`Apply ALL default values to ${sectionName}?`)) {
      const allDefaults: any = {};
      Object.keys(DEFAULTS).forEach((k) => {
        const val = DEFAULTS[k];
        allDefaults[k] = isNaN(Number(val)) ? val : parseInt(val);
      });
      onChange(allDefaults);
    }
  };

  return (
    <div className="border border-[#e2e8e0] rounded-2xl bg-white shadow-sm overflow-hidden mt-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 bg-[#f9fbf8] hover:bg-[#f2f7f1] transition-colors cursor-pointer border-b border-[#e2e8e0]"
      >
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#4e8c4a]" />
          <span className="text-xs font-bold text-[#1c3c24] uppercase tracking-wider">
            🎨 Section Branding & Customization: {sectionName}
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </button>

      {isOpen && (
        <div className="p-5 space-y-4">
          <div className="flex border-b border-[#e2e8e0] gap-1 pb-1">
            {[
              { id: "typography", label: "Typography", icon: Type },
              { id: "colors", label: "Colors", icon: Palette },
              { id: "spacing", label: "Layout & Spacing", icon: LayoutGrid },
              { id: "cards", label: "Buttons & Cards", icon: Sliders },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#1c3c24] text-white shadow-sm"
                      : "text-[#2c5e37] hover:bg-[#f0f5ef]"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ───── TYPOGRAPHY TAB ───── */}
          {activeTab === "typography" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              {/* Font Family */}
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Font Family</label>
                <div className="flex gap-1.5">
                  <div className="flex-1 relative">
                    <input
                      list="fontFamilyList"
                      type="text"
                      placeholder={DEFAULTS.fontFamily}
                      value={styles.fontFamily || ""}
                      onChange={(e) => updateStyle("fontFamily", e.target.value)}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                      style={{ fontFamily: styles.fontFamily || DEFAULTS.fontFamily }}
                    />
                    <datalist id="fontFamilyList">
                      {FONT_FAMILIES.map((f) => (
                        <option key={f} value={f} />
                      ))}
                    </datalist>
                  </div>
                  <DefaultBtn onClick={() => applyDefault("fontFamily")} />
                </div>
              </div>

              {/* Heading Size */}
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Heading Size (px)</label>
                <div className="flex gap-1.5">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder={DEFAULTS.headingSize}
                      value={styles.headingSize ?? ""}
                      onChange={(e) => updateStyle("headingSize", e.target.value ? parseInt(e.target.value) || e.target.value : "")}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                    />
                  </div>
                  <DefaultBtn onClick={() => applyDefault("headingSize")} />
                </div>
              </div>

              {/* Paragraph Size */}
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Paragraph Size (px)</label>
                <div className="flex gap-1.5">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder={DEFAULTS.paragraphSize}
                      value={styles.paragraphSize ?? ""}
                      onChange={(e) => updateStyle("paragraphSize", e.target.value ? parseInt(e.target.value) || e.target.value : "")}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                    />
                  </div>
                  <DefaultBtn onClick={() => applyDefault("paragraphSize")} />
                </div>
              </div>

              {/* Text Alignment */}
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Text Alignment</label>
                <div className="flex gap-1.5">
                  <select
                    value={styles.textAlign || ""}
                    onChange={(e) => updateStyle("textAlign", e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] cursor-pointer"
                  >
                    <option value="">— Select —</option>
                    {TEXT_ALIGNS.map((a) => (
                      <option key={a} value={a}>{a.charAt(0).toUpperCase() + a.slice(1)}</option>
                    ))}
                  </select>
                  <DefaultBtn onClick={() => applyDefault("textAlign")} />
                </div>
              </div>

              {/* Line Height */}
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Line Height</label>
                <div className="flex gap-1.5">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder={DEFAULTS.lineHeight}
                      value={styles.lineHeight || ""}
                      onChange={(e) => updateStyle("lineHeight", e.target.value)}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                    />
                  </div>
                  <DefaultBtn onClick={() => applyDefault("lineHeight")} />
                </div>
              </div>

              {/* Letter Spacing */}
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Letter Spacing</label>
                <div className="flex gap-1.5">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder={DEFAULTS.letterSpacing}
                      value={styles.letterSpacing || ""}
                      onChange={(e) => updateStyle("letterSpacing", e.target.value)}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                    />
                  </div>
                  <DefaultBtn onClick={() => applyDefault("letterSpacing")} />
                </div>
              </div>

              {/* Bold / Italic toggles */}
              <div className="flex gap-4 pt-4 items-center col-span-full">
                <label className="flex items-center gap-1.5 font-bold text-[#2c5e37] cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={!!styles.bold}
                    onChange={(e) => updateStyle("bold", e.target.checked)}
                    className="rounded text-[#4e8c4a] focus:ring-[#4e8c4a]"
                  />
                  <span className="font-extrabold">B</span> Bold
                </label>
                <label className="flex items-center gap-1.5 font-bold text-[#2c5e37] cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={!!styles.italic}
                    onChange={(e) => updateStyle("italic", e.target.checked)}
                    className="rounded text-[#4e8c4a] focus:ring-[#4e8c4a]"
                  />
                  <span className="italic">I</span> Italic
                </label>
              </div>
            </div>
          )}

          {/* ───── COLORS TAB ───── */}
          {activeTab === "colors" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              {[
                { key: "backgroundColor", label: "Background Color" },
                { key: "textColor", label: "Text Color" },
                { key: "headingColor", label: "Heading Color" },
                { key: "borderColor", label: "Border Color" },
                { key: "iconColor", label: "Icon Color" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">{label}</label>
                  <div className="flex gap-1.5 items-center">
                    <input
                      type="color"
                      value={(styles as any)[key] || DEFAULTS[key]}
                      onChange={(e) => updateStyle(key as keyof SectionStylesConfig, e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-[#dce4da] shrink-0"
                    />
                    <input
                      type="text"
                      placeholder={DEFAULTS[key]}
                      value={(styles as any)[key] || ""}
                      onChange={(e) => updateStyle(key as keyof SectionStylesConfig, e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] min-w-0"
                    />
                    <DefaultBtn onClick={() => applyDefault(key)} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ───── SPACING TAB ───── */}
          {activeTab === "spacing" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs">
              {[
                { key: "paddingTop", label: "Padding Top (px)" },
                { key: "paddingBottom", label: "Padding Bottom (px)" },
                { key: "paddingLeft", label: "Padding Left (px)" },
                { key: "paddingRight", label: "Padding Right (px)" },
                { key: "marginTop", label: "Margin Top (px)" },
                { key: "marginBottom", label: "Margin Bottom (px)" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">{label}</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0"
                      value={(styles as any)[key] ?? ""}
                      onChange={(e) => updateStyle(key as keyof SectionStylesConfig, e.target.value ? parseInt(e.target.value) : "")}
                      className="flex-1 px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] min-w-0"
                    />
                    <DefaultBtn onClick={() => updateStyle(key as keyof SectionStylesConfig, undefined)} title="Clear" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ───── BUTTONS & CARDS TAB ───── */}
          {activeTab === "cards" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              {/* Button colors */}
              {[
                { key: "buttonColor", label: "Button Background" },
                { key: "buttonTextColor", label: "Button Text Color" },
                { key: "cardBgColor", label: "Card Background" },
                { key: "cardTextColor", label: "Card Text Color" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">{label}</label>
                  <div className="flex gap-1.5 items-center">
                    <input
                      type="color"
                      value={(styles as any)[key] || DEFAULTS[key]}
                      onChange={(e) => updateStyle(key as keyof SectionStylesConfig, e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-[#dce4da] shrink-0"
                    />
                    <input
                      type="text"
                      placeholder={DEFAULTS[key]}
                      value={(styles as any)[key] || ""}
                      onChange={(e) => updateStyle(key as keyof SectionStylesConfig, e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] min-w-0"
                    />
                    <DefaultBtn onClick={() => applyDefault(key)} />
                  </div>
                </div>
              ))}

              {/* Button Text Size */}
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Button Text Size (px)</label>
                <div className="flex gap-1.5">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder={DEFAULTS.buttonTextSize}
                      value={styles.buttonTextSize ?? ""}
                      onChange={(e) => updateStyle("buttonTextSize", e.target.value ? parseInt(e.target.value) || e.target.value : "")}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                    />
                  </div>
                  <DefaultBtn onClick={() => applyDefault("buttonTextSize")} />
                </div>
              </div>

              {/* Border Radius */}
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Border Radius (px)</label>
                <div className="flex gap-1.5">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder={DEFAULTS.borderRadius}
                      value={styles.borderRadius ?? ""}
                      onChange={(e) => updateStyle("borderRadius", e.target.value ? parseInt(e.target.value) || e.target.value : "")}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                    />
                  </div>
                  <DefaultBtn onClick={() => applyDefault("borderRadius")} />
                </div>
              </div>

              {/* Icon Size */}
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Icon Size (px)</label>
                <div className="flex gap-1.5">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder={DEFAULTS.iconSize}
                      value={styles.iconSize ?? ""}
                      onChange={(e) => updateStyle("iconSize", e.target.value ? parseInt(e.target.value) || e.target.value : "")}
                      className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                    />
                  </div>
                  <DefaultBtn onClick={() => applyDefault("iconSize")} />
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 border-t border-[#e2e8e0] pt-4">
            <button
              type="button"
              onClick={applyAllDefaults}
              className="px-4 py-2 border border-[#d2e4d0] bg-[#f0f5ef] hover:bg-[#1c3c24] hover:text-white text-[#2c5e37] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" /> Apply All Defaults
            </button>
            <button
              type="button"
              onClick={clearStyles}
              className="px-4 py-2 border border-[#dce4da] hover:bg-red-50 text-red-700 hover:border-red-200 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all"
            >
              Clear All Custom Styles
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
