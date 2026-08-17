"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Palette, Type, LayoutGrid, Sliders } from "lucide-react";
import { SectionStylesConfig } from "@/lib/styles-helper";

interface BrandingSectionStylesControlsProps {
  styles?: SectionStylesConfig;
  onChange: (updatedStyles: SectionStylesConfig) => void;
  sectionName: string;
}

// Sporonova default theme values
const DEFAULTS = {
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
};

export default function BrandingSectionStylesControls({
  styles = {},
  onChange,
  sectionName,
}: BrandingSectionStylesControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"typography" | "colors" | "spacing" | "cards">("typography");

  const updateStyle = (key: keyof SectionStylesConfig, value: any) => {
    onChange({
      ...styles,
      [key]: value === "" ? undefined : value,
    });
  };

  const clearStyles = () => {
    if (window.confirm(`Are you sure you want to reset all styling customizations for ${sectionName}?`)) {
      onChange({});
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

          {activeTab === "typography" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Font Family</label>
                <input
                  type="text"
                  placeholder="e.g. Outfit, sans-serif"
                  value={styles.fontFamily || ""}
                  onChange={(e) => updateStyle("fontFamily", e.target.value)}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Heading Size (px)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={DEFAULTS.headingSize}
                  value={styles.headingSize ?? ""}
                  onChange={(e) => updateStyle("headingSize", e.target.value ? parseInt(e.target.value) : "")}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Paragraph Size (px)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={DEFAULTS.paragraphSize}
                  value={styles.paragraphSize ?? ""}
                  onChange={(e) => updateStyle("paragraphSize", e.target.value ? parseInt(e.target.value) : "")}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Text Alignment</label>
                <input
                  type="text"
                  placeholder="e.g. left, center, right, justify"
                  value={styles.textAlign || ""}
                  onChange={(e) => updateStyle("textAlign", e.target.value)}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Line Height</label>
                <input
                  type="text"
                  placeholder="e.g. 1.6, 24px"
                  value={styles.lineHeight || ""}
                  onChange={(e) => updateStyle("lineHeight", e.target.value)}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Letter Spacing</label>
                <input
                  type="text"
                  placeholder="e.g. 0.05em, -1px"
                  value={styles.letterSpacing || ""}
                  onChange={(e) => updateStyle("letterSpacing", e.target.value)}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <label className="flex items-center gap-1.5 font-bold text-[#2c5e37] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!styles.bold}
                    onChange={(e) => updateStyle("bold", e.target.checked)}
                    className="rounded text-[#4e8c4a] focus:ring-[#4e8c4a]"
                  />
                  <span>Force Bold</span>
                </label>

                <label className="flex items-center gap-1.5 font-bold text-[#2c5e37] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!styles.italic}
                    onChange={(e) => updateStyle("italic", e.target.checked)}
                    className="rounded text-[#4e8c4a] focus:ring-[#4e8c4a]"
                  />
                  <span>Italic Text</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === "colors" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Background Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={styles.backgroundColor || DEFAULTS.backgroundColor}
                    onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-[#dce4da]"
                  />
                  <input
                    type="text"
                    placeholder={DEFAULTS.backgroundColor}
                    value={styles.backgroundColor || ""}
                    onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Text Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={styles.textColor || DEFAULTS.textColor}
                    onChange={(e) => updateStyle("textColor", e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-[#dce4da]"
                  />
                  <input
                    type="text"
                    placeholder={DEFAULTS.textColor}
                    value={styles.textColor || ""}
                    onChange={(e) => updateStyle("textColor", e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Heading Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={styles.headingColor || DEFAULTS.headingColor}
                    onChange={(e) => updateStyle("headingColor", e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-[#dce4da]"
                  />
                  <input
                    type="text"
                    placeholder={DEFAULTS.headingColor}
                    value={styles.headingColor || ""}
                    onChange={(e) => updateStyle("headingColor", e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Border Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={styles.borderColor || DEFAULTS.borderColor}
                    onChange={(e) => updateStyle("borderColor", e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-[#dce4da]"
                  />
                  <input
                    type="text"
                    placeholder={DEFAULTS.borderColor}
                    value={styles.borderColor || ""}
                    onChange={(e) => updateStyle("borderColor", e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Icon Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={styles.iconColor || DEFAULTS.iconColor}
                    onChange={(e) => updateStyle("iconColor", e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-[#dce4da]"
                  />
                  <input
                    type="text"
                    placeholder={DEFAULTS.iconColor}
                    value={styles.iconColor || ""}
                    onChange={(e) => updateStyle("iconColor", e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "spacing" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Padding Top (px)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 64"
                  value={styles.paddingTop ?? ""}
                  onChange={(e) => updateStyle("paddingTop", e.target.value ? parseInt(e.target.value) : "")}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Padding Bottom (px)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 64"
                  value={styles.paddingBottom ?? ""}
                  onChange={(e) => updateStyle("paddingBottom", e.target.value ? parseInt(e.target.value) : "")}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Padding Left (px)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 24"
                  value={styles.paddingLeft ?? ""}
                  onChange={(e) => updateStyle("paddingLeft", e.target.value ? parseInt(e.target.value) : "")}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Padding Right (px)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 24"
                  value={styles.paddingRight ?? ""}
                  onChange={(e) => updateStyle("paddingRight", e.target.value ? parseInt(e.target.value) : "")}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Margin Top (px)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 0"
                  value={styles.marginTop ?? ""}
                  onChange={(e) => updateStyle("marginTop", e.target.value ? parseInt(e.target.value) : "")}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Margin Bottom (px)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 0"
                  value={styles.marginBottom ?? ""}
                  onChange={(e) => updateStyle("marginBottom", e.target.value ? parseInt(e.target.value) : "")}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                />
              </div>
            </div>
          )}

          {activeTab === "cards" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Button Background Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={styles.buttonColor || DEFAULTS.buttonColor}
                    onChange={(e) => updateStyle("buttonColor", e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-[#dce4da]"
                  />
                  <input
                    type="text"
                    placeholder={DEFAULTS.buttonColor}
                    value={styles.buttonColor || ""}
                    onChange={(e) => updateStyle("buttonColor", e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Button Text Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={styles.buttonTextColor || DEFAULTS.buttonTextColor}
                    onChange={(e) => updateStyle("buttonTextColor", e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-[#dce4da]"
                  />
                  <input
                    type="text"
                    placeholder={DEFAULTS.buttonTextColor}
                    value={styles.buttonTextColor || ""}
                    onChange={(e) => updateStyle("buttonTextColor", e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Button Text Size (px)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={DEFAULTS.buttonTextSize}
                  value={styles.buttonTextSize ?? ""}
                  onChange={(e) => updateStyle("buttonTextSize", e.target.value ? parseInt(e.target.value) : "")}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Border Radius (px)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={DEFAULTS.borderRadius}
                  value={styles.borderRadius ?? ""}
                  onChange={(e) => updateStyle("borderRadius", e.target.value ? parseInt(e.target.value) : "")}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Card Background Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={styles.cardBgColor || DEFAULTS.cardBgColor}
                    onChange={(e) => updateStyle("cardBgColor", e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-[#dce4da]"
                  />
                  <input
                    type="text"
                    placeholder={DEFAULTS.cardBgColor}
                    value={styles.cardBgColor || ""}
                    onChange={(e) => updateStyle("cardBgColor", e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Card Text Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={styles.cardTextColor || DEFAULTS.cardTextColor}
                    onChange={(e) => updateStyle("cardTextColor", e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-[#dce4da]"
                  />
                  <input
                    type="text"
                    placeholder={DEFAULTS.cardTextColor}
                    value={styles.cardTextColor || ""}
                    onChange={(e) => updateStyle("cardTextColor", e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Icon Size (px)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={DEFAULTS.iconSize}
                  value={styles.iconSize ?? ""}
                  onChange={(e) => updateStyle("iconSize", e.target.value ? parseInt(e.target.value) : "")}
                  className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 border-t border-[#e2e8e0] pt-4">
            <button
              type="button"
              onClick={clearStyles}
              className="px-4 py-2 border border-[#dce4da] hover:bg-red-50 text-red-700 hover:border-red-200 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all"
            >
              Clear Custom Styles
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
