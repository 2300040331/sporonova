"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  Palette,
  Type,
  LayoutGrid,
  Sliders,
  RotateCcw,
  Sparkles,
  Search,
  Check,
  Eye,
} from "lucide-react";
import { SectionStylesConfig } from "@/lib/styles-helper";

interface BrandingSectionStylesControlsProps {
  styles?: SectionStylesConfig;
  onChange: (updatedStyles: SectionStylesConfig) => void;
  sectionName: string;
}

// 50+ Top Google Fonts
const GOOGLE_FONTS = [
  "Outfit",
  "Inter",
  "Poppins",
  "Montserrat",
  "Roboto",
  "Open Sans",
  "Lato",
  "Raleway",
  "Nunito",
  "Work Sans",
  "DM Sans",
  "Manrope",
  "Playfair Display",
  "Merriweather",
  "Lora",
  "PT Serif",
  "Libre Baskerville",
  "EB Garamond",
  "DM Serif Display",
  "Cinzel",
  "Cormorant Garamond",
  "Space Grotesk",
  "Sora",
  "Plus Jakarta Sans",
  "Fira Code",
  "JetBrains Mono",
  "Space Mono",
  "Quicksand",
  "Barlow",
  "Josefin Sans",
  "Rubik",
  "Ubuntu",
  "Cabin",
  "Arvo",
  "Alegreya",
  "Bitter",
  "Crimson Text",
  "Domine",
  "Karma",
  "Newsreader",
  "Spectral",
  "Vollkorn",
  "Caveat",
  "Pacifico",
  "Satisfy",
  "Bebas Neue",
  "Oswald",
  "Anton",
  "Syne",
  "Unbounded",
];

const FONT_WEIGHTS = [
  { value: "100", label: "100 - Thin" },
  { value: "200", label: "200 - Extra Light" },
  { value: "300", label: "300 - Light" },
  { value: "400", label: "400 - Normal" },
  { value: "500", label: "500 - Medium" },
  { value: "600", label: "600 - Semi Bold" },
  { value: "700", label: "700 - Bold" },
  { value: "800", label: "800 - Extra Bold" },
  { value: "900", label: "900 - Black" },
];

const TEXT_ALIGNS = ["left", "center", "right", "justify"];

// Sporonova default theme fallback values
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
  cardBorderColor: "#e6e4dc",
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

interface SuggestedTheme {
  id: string;
  name: string;
  desc: string;
  styles: SectionStylesConfig;
}

// Section-Tailored Smart Suggestions Dictionary (3 Themes Per Section Type)
function getSmartSuggestions(sectionName: string): SuggestedTheme[] {
  const nameLower = sectionName.toLowerCase();

  if (nameLower.includes("hero") || nameLower.includes("banner")) {
    return [
      {
        id: "hero-1",
        name: "Majestic Forest",
        desc: "Deep emerald tones with luminous sage accents & bold headings.",
        styles: {
          backgroundColor: "#0d2818",
          textColor: "#e8f5e9",
          headingColor: "#ffffff",
          headingWeight: "700",
          iconColor: "#52b788",
          buttonColor: "#52b788",
          buttonTextColor: "#0d2818",
          cardBgColor: "#163824",
          cardTextColor: "#e8f5e9",
          cardBorderColor: "#2d6a4f",
          fontFamily: "Outfit, sans-serif",
          headingSize: 44,
          paragraphSize: 16,
          borderRadius: 20,
        },
      },
      {
        id: "hero-2",
        name: "Bioluminescent Dark",
        desc: "Futuristic obsidian atmosphere with electric cyan accents.",
        styles: {
          backgroundColor: "#0b0f19",
          textColor: "#94a3b8",
          headingColor: "#00f2fe",
          headingWeight: "800",
          iconColor: "#00f2fe",
          buttonColor: "#00f2fe",
          buttonTextColor: "#0b0f19",
          cardBgColor: "#151c2e",
          cardTextColor: "#f1f5f9",
          cardBorderColor: "#1e293b",
          fontFamily: "Space Grotesk, sans-serif",
          headingSize: 48,
          paragraphSize: 16,
          borderRadius: 24,
        },
      },
      {
        id: "hero-3",
        name: "Clean Ivory Harvest",
        desc: "Warm editorial palette with refined serif typography.",
        styles: {
          backgroundColor: "#fcfbfa",
          textColor: "#332c27",
          headingColor: "#1c3c24",
          headingWeight: "600",
          iconColor: "#d97706",
          buttonColor: "#1c3c24",
          buttonTextColor: "#ffffff",
          cardBgColor: "#ffffff",
          cardTextColor: "#332c27",
          cardBorderColor: "#f1eee7",
          fontFamily: "Playfair Display, serif",
          headingSize: 40,
          paragraphSize: 15,
          borderRadius: 16,
        },
      },
    ];
  }

  if (nameLower.includes("product") || nameLower.includes("catalog")) {
    return [
      {
        id: "prod-1",
        name: "Pure Spore Lab",
        desc: "Clinical mint clarity highlighting scientific purity.",
        styles: {
          backgroundColor: "#f4f8f4",
          textColor: "#2d3748",
          headingColor: "#1a4d2e",
          headingWeight: "700",
          iconColor: "#4e8c4a",
          buttonColor: "#1a4d2e",
          buttonTextColor: "#ffffff",
          cardBgColor: "#ffffff",
          cardTextColor: "#2d3748",
          cardBorderColor: "#d2e4d0",
          fontFamily: "Inter, sans-serif",
          headingSize: 32,
          paragraphSize: 14,
          borderRadius: 16,
        },
      },
      {
        id: "prod-2",
        name: "Golden Gourmet",
        desc: "Rich amber & bronze tones for luxury gourmet varieties.",
        styles: {
          backgroundColor: "#faf6f0",
          textColor: "#4a3b32",
          headingColor: "#78350f",
          headingWeight: "700",
          iconColor: "#d97706",
          buttonColor: "#78350f",
          buttonTextColor: "#ffffff",
          cardBgColor: "#ffffff",
          cardTextColor: "#4a3b32",
          cardBorderColor: "#fef3c7",
          fontFamily: "Montserrat, sans-serif",
          headingSize: 36,
          paragraphSize: 14,
          borderRadius: 20,
        },
      },
      {
        id: "prod-3",
        name: "Obsidian Cultivation",
        desc: "High-contrast dark grid with glowing emerald borders.",
        styles: {
          backgroundColor: "#111827",
          textColor: "#9ca3af",
          headingColor: "#34d399",
          headingWeight: "700",
          iconColor: "#34d399",
          buttonColor: "#10b981",
          buttonTextColor: "#064e3b",
          cardBgColor: "#1f2937",
          cardTextColor: "#f3f4f6",
          cardBorderColor: "#374151",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          headingSize: 32,
          paragraphSize: 14,
          borderRadius: 16,
        },
      },
    ];
  }

  if (nameLower.includes("process") || nameLower.includes("production")) {
    return [
      {
        id: "proc-1",
        name: "Sterile Laboratory",
        desc: "Crisp white & sterile green for clean room step displays.",
        styles: {
          backgroundColor: "#ffffff",
          textColor: "#1f2937",
          headingColor: "#15803d",
          headingWeight: "700",
          iconColor: "#16a34a",
          buttonColor: "#15803d",
          buttonTextColor: "#ffffff",
          cardBgColor: "#f8fafc",
          cardTextColor: "#1e293b",
          cardBorderColor: "#e2e8f0",
          fontFamily: "Inter, sans-serif",
          headingSize: 32,
          paragraphSize: 14,
          borderRadius: 16,
        },
      },
      {
        id: "proc-2",
        name: "Mycelium Incubation",
        desc: "Deep dark slate with bioluminescent green progress lines.",
        styles: {
          backgroundColor: "#0f172a",
          textColor: "#94a3b8",
          headingColor: "#4ade80",
          headingWeight: "700",
          iconColor: "#4ade80",
          buttonColor: "#22c55e",
          buttonTextColor: "#052e16",
          cardBgColor: "#1e293b",
          cardTextColor: "#f1f5f9",
          cardBorderColor: "#334155",
          fontFamily: "Space Grotesk, sans-serif",
          headingSize: 34,
          paragraphSize: 14,
          borderRadius: 20,
        },
      },
      {
        id: "proc-3",
        name: "Bio-Industrial Emerald",
        desc: "Industrial strength forest tones for large-scale operations.",
        styles: {
          backgroundColor: "#f4f7f4",
          textColor: "#1c3c24",
          headingColor: "#1c3c24",
          headingWeight: "800",
          iconColor: "#2d6a4f",
          buttonColor: "#1c3c24",
          buttonTextColor: "#ffffff",
          cardBgColor: "#ffffff",
          cardTextColor: "#1c3c24",
          cardBorderColor: "#c8dad0",
          fontFamily: "Poppins, sans-serif",
          headingSize: 36,
          paragraphSize: 14,
          borderRadius: 12,
        },
      },
    ];
  }

  if (nameLower.includes("testimonial") || nameLower.includes("review")) {
    return [
      {
        id: "test-1",
        name: "Trust & Integrity",
        desc: "Calm sage green with white review cards & trusted badges.",
        styles: {
          backgroundColor: "#f2f7f1",
          textColor: "#2c5e37",
          headingColor: "#1c3c24",
          headingWeight: "700",
          iconColor: "#4e8c4a",
          buttonColor: "#1c3c24",
          buttonTextColor: "#ffffff",
          cardBgColor: "#ffffff",
          cardTextColor: "#2c5e37",
          cardBorderColor: "#d2e4d0",
          fontFamily: "Outfit, sans-serif",
          headingSize: 32,
          paragraphSize: 14,
          borderRadius: 20,
        },
      },
      {
        id: "test-2",
        name: "Academic Review",
        desc: "Refined editorial typography with warm stone backgrounds.",
        styles: {
          backgroundColor: "#faf9f6",
          textColor: "#443931",
          headingColor: "#2b1c11",
          headingWeight: "600",
          iconColor: "#b45309",
          buttonColor: "#2b1c11",
          buttonTextColor: "#ffffff",
          cardBgColor: "#ffffff",
          cardTextColor: "#443931",
          cardBorderColor: "#eee8dd",
          fontFamily: "Lora, serif",
          headingSize: 32,
          paragraphSize: 15,
          borderRadius: 16,
        },
      },
      {
        id: "test-3",
        name: "Modern Farmer",
        desc: "Vibrant high-contrast layout for high impact social proof.",
        styles: {
          backgroundColor: "#163824",
          textColor: "#d8f3dc",
          headingColor: "#ffffff",
          headingWeight: "700",
          iconColor: "#74c69d",
          buttonColor: "#74c69d",
          buttonTextColor: "#081c15",
          cardBgColor: "#2d6a4f",
          cardTextColor: "#ffffff",
          cardBorderColor: "#40916c",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          headingSize: 34,
          paragraphSize: 14,
          borderRadius: 24,
        },
      },
    ];
  }

  // Universal Fallback 3 Smart Suggestions for all other sections
  return [
    {
      id: "gen-1",
      name: "Organic Spore",
      desc: "Balanced natural greens with crisp white cards & clear typography.",
      styles: {
        backgroundColor: "#f9faf7",
        textColor: "#1c3c24",
        headingColor: "#1c3c24",
        headingWeight: "700",
        iconColor: "#4e8c4a",
        buttonColor: "#1c3c24",
        buttonTextColor: "#ffffff",
        cardBgColor: "#ffffff",
        cardTextColor: "#1c3c24",
        cardBorderColor: "#e6e4dc",
        fontFamily: "Outfit, sans-serif",
        headingSize: 36,
        paragraphSize: 14,
        borderRadius: 16,
      },
    },
    {
      id: "gen-2",
      name: "Bio-Tech Lab",
      desc: "Modern cyan & obsidian contrast built for high-tech research.",
      styles: {
        backgroundColor: "#0c0f17",
        textColor: "#cbd5e1",
        headingColor: "#38bdf8",
        headingWeight: "700",
        iconColor: "#38bdf8",
        buttonColor: "#0284c7",
        buttonTextColor: "#ffffff",
        cardBgColor: "#1e293b",
        cardTextColor: "#f8fafc",
        cardBorderColor: "#334155",
        fontFamily: "Space Grotesk, sans-serif",
        headingSize: 36,
        paragraphSize: 14,
        borderRadius: 16,
      },
    },
    {
      id: "gen-3",
      name: "Editorial Warmth",
      desc: "Warm earthy tones with elegant serif headings.",
      styles: {
        backgroundColor: "#fdfbf7",
        textColor: "#443931",
        headingColor: "#2b1c11",
        headingWeight: "600",
        iconColor: "#b45309",
        buttonColor: "#2b1c11",
        buttonTextColor: "#ffffff",
        cardBgColor: "#ffffff",
        cardTextColor: "#443931",
        cardBorderColor: "#f3ede2",
        fontFamily: "Playfair Display, serif",
        headingSize: 36,
        paragraphSize: 14,
        borderRadius: 12,
      },
    },
  ];
}

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
  const [activeTab, setActiveTab] = useState<"suggestions" | "typography" | "colors" | "spacing" | "cards">("suggestions");
  const [fontSearch, setFontSearch] = useState("");
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  // Dynamically load Google Fonts stylesheet when panel opens
  useEffect(() => {
    if (isOpen && !fontsLoaded) {
      const linkId = "google-fonts-branding-customizer";
      if (!document.getElementById(linkId)) {
        const link = document.createElement("link");
        link.id = linkId;
        link.rel = "stylesheet";
        const fontFamiliesParam = GOOGLE_FONTS.map((f) => f.replace(/ /g, "+") + ":wght@300;400;600;700").join("&family=");
        link.href = `https://fonts.googleapis.com/css2?family=${fontFamiliesParam}&display=swap`;
        document.head.appendChild(link);
      }
      setFontsLoaded(true);
    }
  }, [isOpen, fontsLoaded]);

  const updateStyle = (key: keyof SectionStylesConfig, value: any) => {
    onChange({ ...styles, [key]: value === "" ? undefined : value });
  };

  const applyDefault = (key: string) => {
    updateStyle(key as keyof SectionStylesConfig, DEFAULTS[key]);
  };

  const resetTypography = () => {
    if (window.confirm(`Reset typography (fonts, sizes, weights) to default for ${sectionName}?`)) {
      const updated = { ...styles };
      delete updated.fontFamily;
      delete updated.headingWeight;
      delete updated.textAlign;
      delete updated.headingSize;
      delete updated.paragraphSize;
      delete updated.lineHeight;
      delete updated.letterSpacing;
      delete updated.bold;
      delete updated.italic;
      onChange(updated);
      setAppliedNotification("Typography reset to default!");
      setTimeout(() => setAppliedNotification(null), 3000);
    }
  };

  const resetColors = () => {
    if (window.confirm(`Reset colors (background, text, headings, buttons, cards) to default for ${sectionName}?`)) {
      const updated = { ...styles };
      delete updated.backgroundColor;
      delete updated.textColor;
      delete updated.headingColor;
      delete updated.borderColor;
      delete updated.iconColor;
      delete updated.buttonColor;
      delete updated.buttonTextColor;
      delete updated.cardBgColor;
      delete updated.cardTextColor;
      delete updated.cardBorderColor;
      onChange(updated);
      setAppliedNotification("Colors reset to default!");
      setTimeout(() => setAppliedNotification(null), 3000);
    }
  };

  const clearStyles = () => {
    if (window.confirm(`Reset all styling customizations to original defaults for ${sectionName}?`)) {
      onChange({});
      setAppliedNotification("Custom styles cleared & restored to defaults!");
      setTimeout(() => setAppliedNotification(null), 3000);
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
      setAppliedNotification("All default styles applied!");
      setTimeout(() => setAppliedNotification(null), 3000);
    }
  };

  const applyTheme = (theme: SuggestedTheme) => {
    onChange({ ...styles, ...theme.styles });
    setAppliedNotification(`Theme "${theme.name}" applied & published live!`);
    setTimeout(() => setAppliedNotification(null), 3000);
  };

  const isThemeActive = (theme: SuggestedTheme) => {
    if (!styles || Object.keys(styles).length === 0) return false;
    const bgMatch = !theme.styles.backgroundColor || styles.backgroundColor?.toLowerCase() === theme.styles.backgroundColor.toLowerCase();
    const cardMatch = !theme.styles.cardBgColor || styles.cardBgColor?.toLowerCase() === theme.styles.cardBgColor.toLowerCase();
    const btnMatch = !theme.styles.buttonColor || styles.buttonColor?.toLowerCase() === theme.styles.buttonColor.toLowerCase();
    return Boolean(bgMatch && cardMatch && btnMatch);
  };

  const filteredFonts = useMemo(() => {
    return GOOGLE_FONTS.filter((f) => f.toLowerCase().includes(fontSearch.toLowerCase()));
  }, [fontSearch]);

  const smartSuggestions = useMemo(() => getSmartSuggestions(sectionName), [sectionName]);

  const currentFontFamilyName = styles.fontFamily ? styles.fontFamily.split(",")[0].replace(/['"]/g, "").trim() : "Outfit";

  return (
    <div className="border border-[#e2e8e0] rounded-2xl bg-white shadow-sm overflow-hidden mt-6">
      <div className="w-full flex items-center justify-between px-5 py-4 bg-[#f9fbf8] border-b border-[#e2e8e0]">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 flex items-center justify-between text-left cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#4e8c4a]" />
            <span className="text-xs font-bold text-[#1c3c24] uppercase tracking-wider">
              🎨 Section Branding & Customization: {sectionName}
            </span>
          </div>
          {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500 mr-3" /> : <ChevronDown className="w-4 h-4 text-gray-500 mr-3" />}
        </button>

        <button
          type="button"
          onClick={clearStyles}
          title="Reset all colors & fonts to default"
          className="px-3 py-1.5 bg-[#f0f5ef] hover:bg-[#1c3c24] hover:text-white border border-[#d2e4d0] text-[#2c5e37] rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3 h-3" /> Reset Colors & Fonts
        </button>
      </div>

      {isOpen && (
        <div className="p-5 space-y-4">
          {/* Real-time Notification Banner */}
          {appliedNotification && (
            <div className="px-4 py-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-xs">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{appliedNotification}</span>
            </div>
          )}

          <div className="flex border-b border-[#e2e8e0] gap-1 pb-1 overflow-x-auto">
            {[
              { id: "suggestions", label: "Smart Suggestions (3 Themes)", icon: Sparkles },
              { id: "typography", label: "Typography & Fonts", icon: Type },
              { id: "colors", label: "Colors & Palettes", icon: Palette },
              { id: "spacing", label: "Layout & Spacing", icon: LayoutGrid },
              { id: "cards", label: "Buttons & Cards", icon: Sliders },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
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

          {/* ───── SMART SUGGESTIONS TAB ───── */}
          {activeTab === "suggestions" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider">
                  Smart Suggestions Tailored for {sectionName}
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-bold">1-Click Live Publish</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {smartSuggestions.map((t) => {
                  const bg = (t.styles.backgroundColor as string) || "#ffffff";
                  const cardBg = (t.styles.cardBgColor as string) || "#ffffff";
                  const txt = (t.styles.textColor as string) || "#000000";
                  const btn = (t.styles.buttonColor as string) || "#1c3c24";
                  const btnTxt = (t.styles.buttonTextColor as string) || "#ffffff";
                  const font = (t.styles.fontFamily as string) || "Outfit";
                  const isActive = isThemeActive(t);

                  return (
                    <div
                      key={t.id}
                      className={`border rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all shadow-sm group relative ${
                        isActive
                          ? "border-[#4e8c4a] bg-emerald-50/40 ring-2 ring-[#4e8c4a]/30"
                          : "border-[#e2e8e0] bg-[#f9fbf8] hover:border-[#4e8c4a]"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#1c3c24] text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                          <Check className="w-2.5 h-2.5 text-[#52b788]" /> Active
                        </div>
                      )}

                      <div className="space-y-1 pr-14">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-[#1c3c24] group-hover:text-[#4e8c4a] transition-colors">
                            {t.name}
                          </h4>
                          <span
                            className="px-1.5 py-0.5 rounded-md text-[8px] font-bold border border-gray-200"
                            style={{ fontFamily: font, backgroundColor: bg, color: txt }}
                          >
                            Aa
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-600 line-clamp-2">{t.desc}</p>
                      </div>

                      {/* Preview Box */}
                      <div
                        className="p-3 rounded-xl border border-gray-200 space-y-2 relative overflow-hidden"
                        style={{ backgroundColor: bg }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold" style={{ color: t.styles.headingColor || txt, fontFamily: font }}>
                            Heading Preview
                          </span>
                          {/* Color Circles */}
                          <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full border border-gray-300 shadow-xs" style={{ backgroundColor: bg }} title="BG" />
                            <span className="w-2.5 h-2.5 rounded-full border border-gray-300 shadow-xs" style={{ backgroundColor: cardBg }} title="Card BG" />
                            <span className="w-2.5 h-2.5 rounded-full border border-gray-300 shadow-xs" style={{ backgroundColor: txt }} title="Text" />
                            <span className="w-2.5 h-2.5 rounded-full border border-gray-300 shadow-xs" style={{ backgroundColor: btn }} title="Accent" />
                          </div>
                        </div>

                        {/* Mini Card Preview */}
                        <div
                          className="p-2 rounded-lg border text-[10px]"
                          style={{
                            backgroundColor: cardBg,
                            color: t.styles.cardTextColor || txt,
                            borderColor: t.styles.cardBorderColor || "#e2e8e0",
                            fontFamily: font,
                          }}
                        >
                          Mini Card Content
                        </div>

                        {/* Mini Button Preview */}
                        <div className="pt-1 flex justify-end">
                          <span
                            className="px-2 py-1 text-[9px] font-bold rounded-md shadow-2xs"
                            style={{ backgroundColor: btn, color: btnTxt }}
                          >
                            Sample Button
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => applyTheme(t)}
                        className={`w-full py-2 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-2xs ${
                          isActive
                            ? "bg-[#1c3c24] text-white border border-[#1c3c24]"
                            : "bg-white border border-[#d2e4d0] hover:bg-[#1c3c24] hover:text-white text-[#2c5e37]"
                        }`}
                      >
                        {isActive ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#52b788]" /> Re-Apply Theme
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" /> Apply Theme
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ───── TYPOGRAPHY TAB ───── */}
          {activeTab === "typography" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-2">
                <span className="text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider">
                  Typography & Font Family Controls
                </span>
                <button
                  type="button"
                  onClick={resetTypography}
                  className="px-3 py-1 bg-[#f0f5ef] hover:bg-[#1c3c24] hover:text-white border border-[#d2e4d0] text-[#2c5e37] rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Typography
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                {/* Searchable Font Picker */}
                <div className="relative">
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
                    Font Family (50+ Google Fonts)
                  </label>
                  <div className="flex gap-1.5">
                    <div className="flex-1 relative">
                      <button
                        type="button"
                        onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
                        className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-left flex items-center justify-between cursor-pointer"
                        style={{ fontFamily: styles.fontFamily || DEFAULTS.fontFamily }}
                      >
                        <span className="truncate">{currentFontFamilyName}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      </button>

                      {fontDropdownOpen && (
                        <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-[#dce4da] rounded-2xl shadow-xl p-2 space-y-2 max-h-64 overflow-hidden flex flex-col">
                          <div className="relative">
                            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              placeholder="Search fonts..."
                              value={fontSearch}
                              onChange={(e) => setFontSearch(e.target.value)}
                              className="w-full pl-8 pr-3 py-1.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-xs"
                              autoFocus
                            />
                          </div>

                          <div className="overflow-y-auto flex-1 space-y-0.5 pr-1">
                            {filteredFonts.map((f) => {
                              const isSelected = currentFontFamilyName.toLowerCase() === f.toLowerCase();
                              return (
                                <button
                                  key={f}
                                  type="button"
                                  onClick={() => {
                                    updateStyle("fontFamily", `${f}, sans-serif`);
                                    setFontDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between hover:bg-[#f0f5ef] cursor-pointer transition-colors ${
                                    isSelected ? "bg-[#e8f2e6] text-[#1c3c24] font-bold" : "text-gray-700"
                                  }`}
                                  style={{ fontFamily: `${f}, sans-serif` }}
                                >
                                  <span>{f}</span>
                                  {isSelected && <Check className="w-3.5 h-3.5 text-[#4e8c4a]" />}
                                </button>
                              );
                            })}
                            {filteredFonts.length === 0 && (
                              <div className="p-3 text-center text-gray-400 text-xs font-mono">No matching fonts</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <DefaultBtn onClick={() => applyDefault("fontFamily")} />
                  </div>
                </div>

                {/* Heading Weight */}
                <div>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Font Weight</label>
                  <div className="flex gap-1.5">
                    <select
                      value={styles.headingWeight || "700"}
                      onChange={(e) => updateStyle("headingWeight", e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] cursor-pointer"
                    >
                      {FONT_WEIGHTS.map((w) => (
                        <option key={w.value} value={w.value}>
                          {w.label}
                        </option>
                      ))}
                    </select>
                    <DefaultBtn onClick={() => applyDefault("headingWeight")} />
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
                        <option key={a} value={a}>
                          {a.charAt(0).toUpperCase() + a.slice(1)}
                        </option>
                      ))}
                    </select>
                    <DefaultBtn onClick={() => applyDefault("textAlign")} />
                  </div>
                </div>

                {/* Heading Size (px) - Option-free Manual Text Input */}
                <div>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Heading Size (px)</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder={DEFAULTS.headingSize}
                      value={styles.headingSize ?? ""}
                      onChange={(e) => updateStyle("headingSize", e.target.value ? parseInt(e.target.value) || e.target.value : "")}
                      className="flex-1 px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] min-w-0"
                    />
                    <DefaultBtn onClick={() => applyDefault("headingSize")} />
                  </div>
                </div>

                {/* Paragraph Size (px) - Option-free Manual Text Input */}
                <div>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Paragraph Size (px)</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder={DEFAULTS.paragraphSize}
                      value={styles.paragraphSize ?? ""}
                      onChange={(e) => updateStyle("paragraphSize", e.target.value ? parseInt(e.target.value) || e.target.value : "")}
                      className="flex-1 px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] min-w-0"
                    />
                    <DefaultBtn onClick={() => applyDefault("paragraphSize")} />
                  </div>
                </div>

                {/* Line Height - Option-free Manual Text Input */}
                <div>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Line Height</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder={DEFAULTS.lineHeight}
                      value={styles.lineHeight || ""}
                      onChange={(e) => updateStyle("lineHeight", e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] min-w-0"
                    />
                    <DefaultBtn onClick={() => applyDefault("lineHeight")} />
                  </div>
                </div>

                {/* Letter Spacing - Option-free Manual Text Input */}
                <div>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Letter Spacing</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder={DEFAULTS.letterSpacing}
                      value={styles.letterSpacing || ""}
                      onChange={(e) => updateStyle("letterSpacing", e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] min-w-0"
                    />
                    <DefaultBtn onClick={() => applyDefault("letterSpacing")} />
                  </div>
                </div>

                {/* Bold / Italic toggles */}
                <div className="flex gap-4 items-center col-span-full pt-2">
                  <label className="flex items-center gap-1.5 font-bold text-[#2c5e37] cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={!!styles.bold}
                      onChange={(e) => updateStyle("bold", e.target.checked)}
                      className="rounded text-[#4e8c4a] focus:ring-[#4e8c4a]"
                    />
                    <span className="font-extrabold">B</span> Bold Heading
                  </label>
                  <label className="flex items-center gap-1.5 font-bold text-[#2c5e37] cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={!!styles.italic}
                      onChange={(e) => updateStyle("italic", e.target.checked)}
                      className="rounded text-[#4e8c4a] focus:ring-[#4e8c4a]"
                    />
                    <span className="italic">I</span> Italic Text
                  </label>
                </div>
              </div>

              {/* ───── LIVE TYPOGRAPHY PREVIEW BOX ───── */}
              <div className="border border-[#dce4da] bg-[#f9fbf8] rounded-2xl p-4 space-y-2 mt-4">
                <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-2">
                  <span className="text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#4e8c4a]" /> Live Typography Preview
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">
                    Font: {currentFontFamilyName} | Size: {styles.headingSize || DEFAULTS.headingSize}px
                  </span>
                </div>

                <div
                  className="p-4 rounded-xl transition-all"
                  style={{
                    backgroundColor: styles.backgroundColor || "#ffffff",
                    textAlign: (styles.textAlign as any) || "left",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: styles.fontFamily || DEFAULTS.fontFamily,
                      fontSize: styles.headingSize ? `${styles.headingSize}px` : `${DEFAULTS.headingSize}px`,
                      fontWeight: styles.headingWeight || (styles.bold ? "700" : "600"),
                      fontStyle: styles.italic ? "italic" : "normal",
                      color: styles.headingColor || styles.textColor || "#1c3c24",
                      lineHeight: styles.lineHeight || DEFAULTS.lineHeight,
                      letterSpacing: styles.letterSpacing || DEFAULTS.letterSpacing,
                    }}
                  >
                    Engineered Mycelium & Fungi Cultivation
                  </h3>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: styles.fontFamily || DEFAULTS.fontFamily,
                      fontSize: styles.paragraphSize ? `${styles.paragraphSize}px` : `${DEFAULTS.paragraphSize}px`,
                      fontStyle: styles.italic ? "italic" : "normal",
                      color: styles.textColor || "#1c3c24",
                      lineHeight: styles.lineHeight || DEFAULTS.lineHeight,
                      letterSpacing: styles.letterSpacing || DEFAULTS.letterSpacing,
                    }}
                  >
                    High-yield, genetically validated mushroom strains engineered for commercial growers, laboratory research, and industrial spawn production.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ───── COLORS TAB ───── */}
          {activeTab === "colors" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-2">
                <span className="text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider">
                  Colors & Theme Palette Controls
                </span>
                <button
                  type="button"
                  onClick={resetColors}
                  className="px-3 py-1 bg-[#f0f5ef] hover:bg-[#1c3c24] hover:text-white border border-[#d2e4d0] text-[#2c5e37] rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Colors
                </button>
              </div>

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
              {/* Button & Card colors */}
              {[
                { key: "buttonColor", label: "Button Background" },
                { key: "buttonTextColor", label: "Button Text Color" },
                { key: "cardBgColor", label: "Card Background" },
                { key: "cardTextColor", label: "Card Text Color" },
                { key: "cardBorderColor", label: "Card Border Color" },
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
                  <input
                    type="text"
                    placeholder={DEFAULTS.buttonTextSize}
                    value={styles.buttonTextSize ?? ""}
                    onChange={(e) => updateStyle("buttonTextSize", e.target.value ? parseInt(e.target.value) || e.target.value : "")}
                    className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                  />
                  <DefaultBtn onClick={() => applyDefault("buttonTextSize")} />
                </div>
              </div>

              {/* Border Radius */}
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Border Radius (px)</label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder={DEFAULTS.borderRadius}
                    value={styles.borderRadius ?? ""}
                    onChange={(e) => updateStyle("borderRadius", e.target.value ? parseInt(e.target.value) || e.target.value : "")}
                    className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                  />
                  <DefaultBtn onClick={() => applyDefault("borderRadius")} />
                </div>
              </div>

              {/* Icon Size */}
              <div>
                <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Icon Size (px)</label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder={DEFAULTS.iconSize}
                    value={styles.iconSize ?? ""}
                    onChange={(e) => updateStyle("iconSize", e.target.value ? parseInt(e.target.value) || e.target.value : "")}
                    className="w-full px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                  />
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
