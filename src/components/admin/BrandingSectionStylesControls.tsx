"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Palette, Type, LayoutGrid, Sliders, RotateCcw, Sparkles } from "lucide-react";
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

// 54 Selectable Google Fonts as requested
const GOOGLE_FONTS = [
  "Inter", "Poppins", "Roboto", "Open Sans", "Lato", "Montserrat", "Nunito", "Nunito Sans",
  "Raleway", "Merriweather", "Playfair Display", "Oswald", "Source Sans 3", "Source Serif 4",
  "Ubuntu", "Work Sans", "DM Sans", "Manrope", "Plus Jakarta Sans", "Outfit", "Quicksand",
  "Rubik", "Mulish", "Cabin", "Figtree", "Lexend", "Libre Baskerville", "Crimson Pro",
  "Cormorant Garamond", "Libre Franklin", "IBM Plex Sans", "IBM Plex Serif", "Roboto Slab",
  "PT Sans", "PT Serif", "Noto Sans", "Noto Serif", "Barlow", "Barlow Condensed", "Archivo",
  "Space Grotesk", "Space Mono", "Sora", "Urbanist", "Josefin Sans", "Bebas Neue", "Abril Fatface",
  "Bitter", "Karla", "Hind", "Assistant", "Exo 2", "Titillium Web", "Oxygen"
];

// Predefined spacing lists
const PREDEFINED_HEADING_SIZES = [
  "12", "14", "16", "18", "20", "22", "24", "26", "28", "30",
  "32", "34", "36", "38", "40", "42", "44", "48", "52", "56",
  "60", "64", "72"
];

const PREDEFINED_PARAGRAPH_SIZES = [
  "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
  "20", "22", "24"
];

const PREDEFINED_LINE_HEIGHTS = [
  "1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "2.0"
];

const PREDEFINED_LETTER_SPACINGS = [
  "-0.05em", "-0.03em", "-0.02em", "-0.01em", "0em", "0.01em", "0.02em", "0.03em", "0.05em", "0.08em", "0.1em"
];

const TEXT_ALIGNS = ["left", "center", "right", "justify"];

interface SuggestedTheme {
  name: string;
  description: string;
  colors: {
    bg: string;
    card: string;
    text: string;
    primary: string;
  };
  values: Partial<SectionStylesConfig>;
}

// Map sectionName to 3 tailored suggested themes
const getSuggestedThemes = (sectionName: string): SuggestedTheme[] => {
  const norm = sectionName.toLowerCase().trim();
  
  if (norm.includes("homepage")) {
    return [
      {
        name: "Premium Healthcare",
        description: "Elegant Obsidian styling for deep clinical impact.",
        colors: { bg: "#0c0f17", card: "#1b1e2a", text: "#cbd5e1", primary: "#00f2fe" },
        values: {
          backgroundColor: "#0c0f17",
          textColor: "#cbd5e1",
          headingColor: "#ffffff",
          cardBgColor: "#1b1e2a",
          cardTextColor: "#f8fafc",
          buttonColor: "#00f2fe",
          buttonTextColor: "#0c0f17",
          fontFamily: "Outfit, sans-serif",
          headingSize: 48,
          paragraphSize: 16,
          borderRadius: 24,
          iconColor: "#00f2fe",
          headingWeight: "700"
        }
      },
      {
        name: "Modern Green",
        description: "Fresh, trustworthy agricultural tone.",
        colors: { bg: "#f9faf7", card: "#ffffff", text: "#1c3c24", primary: "#4e8c4a" },
        values: {
          backgroundColor: "#f9faf7",
          textColor: "#1c3c24",
          headingColor: "#1c3c24",
          cardBgColor: "#ffffff",
          cardTextColor: "#1c3c24",
          buttonColor: "#4e8c4a",
          buttonTextColor: "#ffffff",
          fontFamily: "Inter, sans-serif",
          headingSize: 44,
          paragraphSize: 15,
          borderRadius: 16,
          iconColor: "#4e8c4a",
          headingWeight: "600"
        }
      },
      {
        name: "Corporate Trust",
        description: "Balanced obsidian accents with professional type.",
        colors: { bg: "#ffffff", card: "#f8fafc", text: "#334155", primary: "#1c3c24" },
        values: {
          backgroundColor: "#ffffff",
          textColor: "#334155",
          headingColor: "#0f172a",
          cardBgColor: "#f8fafc",
          cardTextColor: "#334155",
          buttonColor: "#1c3c24",
          buttonTextColor: "#ffffff",
          fontFamily: "Poppins, sans-serif",
          headingSize: 40,
          paragraphSize: 14,
          borderRadius: 12,
          iconColor: "#1c3c24",
          headingWeight: "500"
        }
      }
    ];
  }
  
  if (norm.includes("header")) {
    return [
      {
        name: "Elegant Brand",
        description: "Full colored brand header with high contrast.",
        colors: { bg: "#1c3c24", card: "#1c3c24", text: "#ffffff", primary: "#7baa6b" },
        values: {
          backgroundColor: "#1c3c24",
          textColor: "#ffffff",
          headingColor: "#ffffff",
          fontFamily: "Outfit, sans-serif",
          headingSize: 24,
          paragraphSize: 14,
          iconColor: "#7baa6b",
          headingWeight: "700"
        }
      },
      {
        name: "Clean Navigation",
        description: "Crisp white headers with solid link colors.",
        colors: { bg: "#ffffff", card: "#ffffff", text: "#1c3c24", primary: "#4e8c4a" },
        values: {
          backgroundColor: "#ffffff",
          textColor: "#1c3c24",
          headingColor: "#1c3c24",
          fontFamily: "Inter, sans-serif",
          headingSize: 20,
          paragraphSize: 14,
          iconColor: "#4e8c4a",
          headingWeight: "600"
        }
      },
      {
        name: "Premium Minimal",
        description: "Soft clean branding with modern spacing.",
        colors: { bg: "#f9faf7", card: "#f9faf7", text: "#333333", primary: "#00f2fe" },
        values: {
          backgroundColor: "#f9faf7",
          textColor: "#333333",
          headingColor: "#1c3c24",
          fontFamily: "Montserrat, sans-serif",
          headingSize: 18,
          paragraphSize: 14,
          iconColor: "#00f2fe",
          headingWeight: "500"
        }
      }
    ];
  }
  
  if (norm.includes("product")) {
    return [
      {
        name: "Fresh Pharma",
        description: "Vibrant herbal accents on clean white backgrounds.",
        colors: { bg: "#f4f9f4", card: "#ffffff", text: "#1c3c24", primary: "#2e7d32" },
        values: {
          backgroundColor: "#f4f9f4",
          textColor: "#1c3c24",
          headingColor: "#1c3c24",
          cardBgColor: "#ffffff",
          cardTextColor: "#1c3c24",
          buttonColor: "#2e7d32",
          buttonTextColor: "#ffffff",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          headingSize: 36,
          paragraphSize: 14,
          borderRadius: 16,
          headingWeight: "700"
        }
      },
      {
        name: "Clinical Product",
        description: "Highly structured corporate card presentation.",
        colors: { bg: "#f8fafc", card: "#ffffff", text: "#334155", primary: "#0f172a" },
        values: {
          backgroundColor: "#f8fafc",
          textColor: "#475569",
          headingColor: "#0f172a",
          cardBgColor: "#ffffff",
          cardTextColor: "#334155",
          buttonColor: "#0f172a",
          buttonTextColor: "#ffffff",
          fontFamily: "Inter, sans-serif",
          headingSize: 32,
          paragraphSize: 14,
          borderRadius: 12,
          headingWeight: "600"
        }
      },
      {
        name: "Trust & Care",
        description: "Soft clinical design with round card frames.",
        colors: { bg: "#ffffff", card: "#f8fafc", text: "#1e293b", primary: "#1c3c24" },
        values: {
          backgroundColor: "#ffffff",
          textColor: "#334155",
          headingColor: "#1e293b",
          cardBgColor: "#f8fafc",
          cardTextColor: "#334155",
          buttonColor: "#1c3c24",
          buttonTextColor: "#ffffff",
          fontFamily: "Raleway, sans-serif",
          headingSize: 34,
          paragraphSize: 14,
          borderRadius: 20,
          headingWeight: "500"
        }
      }
    ];
  }
  
  if (norm.includes("process")) {
    return [
      {
        name: "Scientific Blue",
        description: "Sleek dark obsidian tech lab styling.",
        colors: { bg: "#070911", card: "#1b1e2a", text: "#f1f5f9", primary: "#00f2fe" },
        values: {
          backgroundColor: "#070911",
          textColor: "#e2e8f0",
          headingColor: "#ffffff",
          cardBgColor: "#1b1e2a",
          cardTextColor: "#f1f5f9",
          buttonColor: "#00f2fe",
          buttonTextColor: "#070911",
          fontFamily: "Space Grotesk, sans-serif",
          headingSize: 36,
          paragraphSize: 14,
          borderRadius: 24,
          iconColor: "#00f2fe",
          headingWeight: "700"
        }
      },
      {
        name: "Manufacturing Green",
        description: "Clean organic process timeline tones.",
        colors: { bg: "#f9faf7", card: "#ffffff", text: "#1c3c24", primary: "#4e8c4a" },
        values: {
          backgroundColor: "#f9faf7",
          textColor: "#2d3748",
          headingColor: "#1c3c24",
          cardBgColor: "#ffffff",
          cardTextColor: "#1c3c24",
          buttonColor: "#4e8c4a",
          buttonTextColor: "#ffffff",
          fontFamily: "Work Sans, sans-serif",
          headingSize: 32,
          paragraphSize: 14,
          borderRadius: 16,
          iconColor: "#4e8c4a",
          headingWeight: "600"
        }
      },
      {
        name: "Industrial Clean",
        description: "High contrast professional step navigation.",
        colors: { bg: "#ffffff", card: "#f8fafc", text: "#334155", primary: "#0f172a" },
        values: {
          backgroundColor: "#ffffff",
          textColor: "#334155",
          headingColor: "#0f172a",
          cardBgColor: "#f8fafc",
          cardTextColor: "#334155",
          buttonColor: "#0f172a",
          buttonTextColor: "#ffffff",
          fontFamily: "Outfit, sans-serif",
          headingSize: 30,
          paragraphSize: 14,
          borderRadius: 12,
          iconColor: "#0f172a",
          headingWeight: "500"
        }
      }
    ];
  }
  
  if (norm.includes("about")) {
    return [
      {
        name: "Corporate Trust",
        description: "Clean research-institution-inspired design.",
        colors: { bg: "#ffffff", card: "#f8fafc", text: "#334155", primary: "#1c3c24" },
        values: {
          backgroundColor: "#ffffff",
          textColor: "#334155",
          headingColor: "#0f172a",
          cardBgColor: "#f8fafc",
          cardTextColor: "#334155",
          buttonColor: "#1c3c24",
          buttonTextColor: "#ffffff",
          fontFamily: "Inter, sans-serif",
          headingSize: 36,
          paragraphSize: 14,
          borderRadius: 16,
          headingWeight: "600"
        }
      },
      {
        name: "Heritage Green",
        description: "Elegant serif type with natural shades.",
        colors: { bg: "#f9faf7", card: "#ffffff", text: "#1c3c24", primary: "#4e8c4a" },
        values: {
          backgroundColor: "#f9faf7",
          textColor: "#1c3c24",
          headingColor: "#1c3c24",
          cardBgColor: "#ffffff",
          cardTextColor: "#1c3c24",
          buttonColor: "#4e8c4a",
          buttonTextColor: "#ffffff",
          fontFamily: "Playfair Display, serif",
          headingSize: 40,
          paragraphSize: 14,
          borderRadius: 16,
          headingWeight: "700"
        }
      },
      {
        name: "Premium Healthcare",
        description: "Modern obsidian theme with bioluminescent badges.",
        colors: { bg: "#070911", card: "#1b1e2a", text: "#ffffff", primary: "#39ff14" },
        values: {
          backgroundColor: "#070911",
          textColor: "#cbd5e1",
          headingColor: "#ffffff",
          cardBgColor: "#1b1e2a",
          cardTextColor: "#ffffff",
          buttonColor: "#39ff14",
          buttonTextColor: "#070911",
          fontFamily: "Outfit, sans-serif",
          headingSize: 38,
          paragraphSize: 14,
          borderRadius: 24,
          headingWeight: "800"
        }
      }
    ];
  }
  
  if (norm.includes("why-choose-us") || norm.includes("choose")) {
    return [
      {
        name: "Excellence Green",
        description: "Premium green accents with rounded card slots.",
        colors: { bg: "#f9faf7", card: "#ffffff", text: "#1c3c24", primary: "#4e8c4a" },
        values: {
          backgroundColor: "#f9faf7",
          textColor: "#1c3c24",
          headingColor: "#1c3c24",
          cardBgColor: "#ffffff",
          cardTextColor: "#1c3c24",
          buttonColor: "#4e8c4a",
          buttonTextColor: "#ffffff",
          fontFamily: "Outfit, sans-serif",
          headingSize: 36,
          paragraphSize: 14,
          borderRadius: 24,
          iconColor: "#4e8c4a",
          headingWeight: "700"
        }
      },
      {
        name: "Modern Trust",
        description: "High readability, clean contrast business card cells.",
        colors: { bg: "#ffffff", card: "#f8fafc", text: "#0f172a", primary: "#1e293b" },
        values: {
          backgroundColor: "#ffffff",
          textColor: "#334155",
          headingColor: "#0f172a",
          cardBgColor: "#f8fafc",
          cardTextColor: "#334155",
          buttonColor: "#1e293b",
          buttonTextColor: "#ffffff",
          fontFamily: "Poppins, sans-serif",
          headingSize: 34,
          paragraphSize: 14,
          borderRadius: 16,
          iconColor: "#1e293b",
          headingWeight: "600"
        }
      },
      {
        name: "Premium Care",
        description: "Vibrant dark mode cells for biotech services.",
        colors: { bg: "#070911", card: "#1b1e2a", text: "#e2e8f0", primary: "#00f2fe" },
        values: {
          backgroundColor: "#070911",
          textColor: "#cbd5e1",
          headingColor: "#ffffff",
          cardBgColor: "#1b1e2a",
          cardTextColor: "#e2e8f0",
          buttonColor: "#00f2fe",
          buttonTextColor: "#070911",
          fontFamily: "Inter, sans-serif",
          headingSize: 36,
          paragraphSize: 14,
          borderRadius: 20,
          iconColor: "#00f2fe",
          headingWeight: "500"
        }
      }
    ];
  }
  
  if (norm.includes("knowledge")) {
    return [
      {
        name: "Editorial Clean",
        description: "Elegant serif reading panel with soft card dividers.",
        colors: { bg: "#ffffff", card: "#f8fafc", text: "#1e293b", primary: "#0f172a" },
        values: {
          backgroundColor: "#ffffff",
          textColor: "#334155",
          headingColor: "#1e293b",
          cardBgColor: "#f8fafc",
          cardTextColor: "#334155",
          buttonColor: "#0f172a",
          buttonTextColor: "#ffffff",
          fontFamily: "Merriweather, serif",
          headingSize: 36,
          paragraphSize: 15,
          borderRadius: 8,
          lineHeight: "1.8",
          headingWeight: "600"
        }
      },
      {
        name: "Medical Research",
        description: "Modern professional clinical reading layout.",
        colors: { bg: "#f8fafc", card: "#ffffff", text: "#334155", primary: "#1c3c24" },
        values: {
          backgroundColor: "#f8fafc",
          textColor: "#334155",
          headingColor: "#1c3c24",
          cardBgColor: "#ffffff",
          cardTextColor: "#334155",
          buttonColor: "#1c3c24",
          buttonTextColor: "#ffffff",
          fontFamily: "Source Serif 4, serif",
          headingSize: 34,
          paragraphSize: 14,
          borderRadius: 12,
          lineHeight: "1.7",
          headingWeight: "700"
        }
      },
      {
        name: "Knowledge Green",
        description: "Clean organic styling for reading guides.",
        colors: { bg: "#f9faf7", card: "#ffffff", text: "#1c3c24", primary: "#4e8c4a" },
        values: {
          backgroundColor: "#f9faf7",
          textColor: "#1c3c24",
          headingColor: "#1c3c24",
          cardBgColor: "#ffffff",
          cardTextColor: "#1c3c24",
          buttonColor: "#4e8c4a",
          buttonTextColor: "#ffffff",
          fontFamily: "Inter, sans-serif",
          headingSize: 32,
          paragraphSize: 14,
          borderRadius: 16,
          lineHeight: "1.6",
          headingWeight: "500"
        }
      }
    ];
  }
  
  if (norm.includes("gallery")) {
    return [
      {
        name: "Minimal Showcase",
        description: "Clean minimal backdrop for photographic alignment.",
        colors: { bg: "#ffffff", card: "#ffffff", text: "#333333", primary: "#1c3c24" },
        values: {
          backgroundColor: "#ffffff",
          textColor: "#333333",
          headingColor: "#1c3c24",
          cardBgColor: "#ffffff",
          cardTextColor: "#333333",
          buttonColor: "#1c3c24",
          buttonTextColor: "#ffffff",
          fontFamily: "Montserrat, sans-serif",
          headingSize: 30,
          paragraphSize: 14,
          borderRadius: 16,
          headingWeight: "700"
        }
      },
      {
        name: "Premium White",
        description: "Soft grey backing with white photographic slots.",
        colors: { bg: "#f9faf7", card: "#ffffff", text: "#1c3c24", primary: "#4e8c4a" },
        values: {
          backgroundColor: "#f9faf7",
          textColor: "#1c3c24",
          headingColor: "#1c3c24",
          cardBgColor: "#ffffff",
          cardTextColor: "#1c3c24",
          buttonColor: "#4e8c4a",
          buttonTextColor: "#ffffff",
          fontFamily: "Outfit, sans-serif",
          headingSize: 28,
          paragraphSize: 14,
          borderRadius: 24,
          headingWeight: "600"
        }
      },
      {
        name: "Elegant Medical",
        description: "High-contrast obsidian showcase panels.",
        colors: { bg: "#0c0f17", card: "#1b1e2a", text: "#ffffff", primary: "#00f2fe" },
        values: {
          backgroundColor: "#0c0f17",
          textColor: "#cbd5e1",
          headingColor: "#ffffff",
          cardBgColor: "#1b1e2a",
          cardTextColor: "#ffffff",
          buttonColor: "#00f2fe",
          buttonTextColor: "#0c0f17",
          fontFamily: "Space Grotesk, sans-serif",
          headingSize: 32,
          paragraphSize: 14,
          borderRadius: 20,
          headingWeight: "500"
        }
      }
    ];
  }
  
  if (norm.includes("form") || norm.includes("contact")) {
    return [
      {
        name: "Friendly Support",
        description: "Clean input boxes with round corner edges.",
        colors: { bg: "#ffffff", card: "#f8fafc", text: "#1e293b", primary: "#4e8c4a" },
        values: {
          backgroundColor: "#ffffff",
          textColor: "#334155",
          headingColor: "#1e293b",
          cardBgColor: "#f8fafc",
          cardTextColor: "#334155",
          buttonColor: "#4e8c4a",
          buttonTextColor: "#ffffff",
          fontFamily: "Quicksand, sans-serif",
          headingSize: 30,
          paragraphSize: 14,
          borderRadius: 20,
          headingWeight: "600"
        }
      },
      {
        name: "Clean Healthcare",
        description: "Clinical look with pure white focus boxes.",
        colors: { bg: "#f9faf7", card: "#ffffff", text: "#1c3c24", primary: "#1c3c24" },
        values: {
          backgroundColor: "#f9faf7",
          textColor: "#1c3c24",
          headingColor: "#1c3c24",
          cardBgColor: "#ffffff",
          cardTextColor: "#1c3c24",
          buttonColor: "#1c3c24",
          buttonTextColor: "#ffffff",
          fontFamily: "Inter, sans-serif",
          headingSize: 28,
          paragraphSize: 14,
          borderRadius: 12,
          headingWeight: "700"
        }
      },
      {
        name: "Professional Trust",
        description: "Strong border shapes and solid dark highlights.",
        colors: { bg: "#ffffff", card: "#ffffff", text: "#0f172a", primary: "#0f172a" },
        values: {
          backgroundColor: "#ffffff",
          textColor: "#334155",
          headingColor: "#0f172a",
          cardBgColor: "#ffffff",
          cardTextColor: "#0f172a",
          buttonColor: "#0f172a",
          buttonTextColor: "#ffffff",
          fontFamily: "Poppins, sans-serif",
          headingSize: 32,
          paragraphSize: 14,
          borderRadius: 8,
          headingWeight: "600"
        }
      }
    ];
  }

  // Generic Fallback for other settings
  return [
    {
      name: "Default Brand",
      description: "Standard clean style mapping to corporate design.",
      colors: { bg: "#f9faf7", card: "#ffffff", text: "#1c3c24", primary: "#1c3c24" },
      values: {
        backgroundColor: "#f9faf7",
        textColor: "#1c3c24",
        headingColor: "#1c3c24",
        cardBgColor: "#ffffff",
        cardTextColor: "#1c3c24",
        buttonColor: "#1c3c24",
        buttonTextColor: "#ffffff",
        fontFamily: "Outfit, sans-serif",
        headingSize: 36,
        paragraphSize: 14,
        borderRadius: 16,
        iconColor: "#4e8c4a",
        headingWeight: "700"
      }
    },
    {
      name: "Eco Nature",
      description: "Soft environmental focus styling with gentle type.",
      colors: { bg: "#ffffff", card: "#ffffff", text: "#1c3c24", primary: "#4e8c4a" },
      values: {
        backgroundColor: "#ffffff",
        textColor: "#2d3748",
        headingColor: "#1c3c24",
        cardBgColor: "#ffffff",
        cardTextColor: "#1c3c24",
        buttonColor: "#4e8c4a",
        buttonTextColor: "#ffffff",
        fontFamily: "Inter, sans-serif",
        headingSize: 34,
        paragraphSize: 14,
        borderRadius: 12,
        iconColor: "#4e8c4a",
        headingWeight: "600"
      }
    },
    {
      name: "Clinical Modern",
      description: "Crisp white elements with professional dark text.",
      colors: { bg: "#f8fafc", card: "#ffffff", text: "#334155", primary: "#0f172a" },
      values: {
        backgroundColor: "#f8fafc",
        textColor: "#334155",
        headingColor: "#0f172a",
        cardBgColor: "#ffffff",
        cardTextColor: "#334155",
        buttonColor: "#0f172a",
        buttonTextColor: "#ffffff",
        fontFamily: "Poppins, sans-serif",
        headingSize: 32,
        paragraphSize: 14,
        borderRadius: 16,
        iconColor: "#0f172a",
        headingWeight: "500"
      }
    }
  ];
};

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
  const [activeTab, setActiveTab] = useState<"themes" | "typography" | "colors" | "spacing" | "cards">("themes");
  const [fontSearch, setFontSearch] = useState("");
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);

  // Dynamically load Google Fonts on mount for visual preview
  useEffect(() => {
    if (!isOpen) return;
    
    // Split fonts into batches to prevent URL length limits in browser
    const fontNames = [
      "Inter", "Poppins", "Roboto", "Open Sans", "Lato", "Montserrat", "Nunito", 
      "Raleway", "Merriweather", "Playfair Display", "Oswald", "Ubuntu", 
      "Work Sans", "DM Sans", "Manrope", "Plus Jakarta Sans", "Outfit", "Quicksand", 
      "Rubik", "Mulish", "Cabin", "Figtree", "Lexend", "Libre Baskerville", "Crimson Pro", 
      "Cormorant Garamond", "IBM Plex Sans", "IBM Plex Serif", "Roboto Slab", "PT Sans", 
      "PT Serif", "Noto Sans", "Noto Serif", "Barlow", "Archivo", "Space Grotesk", 
      "Space Mono", "Sora", "Urbanist", "Josefin Sans", "Bebas Neue", "Abril Fatface", 
      "Bitter", "Karla", "Hind", "Assistant", "Exo 2", "Titillium Web", "Oxygen"
    ];
    
    const families = fontNames.map(f => f.replace(/ /g, "+") + ":wght@400;700").join("&family=");
    const href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
    
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, [isOpen]);

  const updateStyle = (key: keyof SectionStylesConfig, value: any) => {
    onChange({ ...styles, [key]: value === "" || value === "custom" ? undefined : value });
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
          <div className="flex border-b border-[#e2e8e0] gap-1 pb-1 overflow-x-auto scrollbar-none">
            {[
              { id: "themes", label: "Suggested Themes", icon: Sparkles },
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
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

          {/* ───── SUGGESTED THEMES TAB ───── */}
          {activeTab === "themes" && (
            <div className="space-y-4">
              <div className="text-[10px] text-gray-500 font-medium pb-2 border-b border-[#e2e8e0]">
                Apply a professionally suggested design preset for the <span className="font-extrabold text-[#1c3c24]">{sectionName}</span>. Manual custom settings remain fully adjustable afterwards.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getSuggestedThemes(sectionName).map((theme) => (
                  <div key={theme.name} className="flex flex-col bg-[#f9fbf8] border border-[#e2e8e0] rounded-2xl p-4 justify-between space-y-4 shadow-sm hover:shadow-md transition-all duration-300">
                    <div>
                      <h4 className="text-xs font-extrabold text-[#1c3c24]">{theme.name}</h4>
                      <p className="text-[10px] text-gray-600 mt-1 leading-normal font-medium">{theme.description}</p>
                    </div>
                    
                    {/* Visual Previews */}
                    <div className="space-y-3 p-3 bg-white border border-[#dce4da] rounded-xl text-xs">
                      {/* Color Palette Preview */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-gray-400 font-mono font-bold">Palette:</span>
                        <div className="flex gap-1">
                          <span className="w-3.5 h-3.5 rounded-full border border-gray-200" style={{ backgroundColor: theme.colors.bg }} title="Background" />
                          <span className="w-3.5 h-3.5 rounded-full border border-gray-200" style={{ backgroundColor: theme.colors.card }} title="Card Background" />
                          <span className="w-3.5 h-3.5 rounded-full border border-gray-200" style={{ backgroundColor: theme.colors.text }} title="Text Color" />
                          <span className="w-3.5 h-3.5 rounded-full border border-gray-200" style={{ backgroundColor: theme.colors.primary }} title="Primary Button Color" />
                        </div>
                      </div>
                      
                      {/* Typography Preview */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-gray-400 font-mono font-bold">Type:</span>
                        <span className="text-[10px] font-bold text-[#1c3c24]" style={{ fontFamily: theme.values.fontFamily }}>
                          Aa {theme.values.fontFamily?.split(",")[0]}
                        </span>
                      </div>
                      
                      {/* Mini Card & Button Preview */}
                      <div className="p-2 border rounded-lg space-y-1.5" style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.primary + "33" }}>
                        <span className="block text-[8px] font-bold" style={{ color: theme.colors.text }}>Sample Card Content</span>
                        <span className="inline-block px-2 py-0.5 text-[8px] font-bold rounded uppercase tracking-wider text-center" style={{ backgroundColor: theme.colors.primary, color: theme.colors.bg === "#ffffff" || theme.colors.bg === "#f9faf7" ? "#ffffff" : theme.colors.bg }}>
                          Mini Button
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const mergedStyles = {
                          ...styles,
                          ...theme.values
                        };
                        onChange(mergedStyles);
                      }}
                      className="w-full py-2 bg-[#1c3c24] hover:bg-[#4e8c4a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
                    >
                      Apply Theme
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ───── TYPOGRAPHY TAB ───── */}
          {activeTab === "typography" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                {/* Searchable Font Family Picker */}
                <div>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Font Family</label>
                  <div className="flex gap-1.5">
                    <div className="flex-1 relative">
                      <button
                        type="button"
                        onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
                        className="w-full flex items-center justify-between px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] font-bold text-left min-w-0"
                        style={{ fontFamily: styles.fontFamily || DEFAULTS.fontFamily }}
                      >
                        <span className="truncate">{styles.fontFamily ? styles.fontFamily.split(",")[0] : "Outfit"}</span>
                        <ChevronDown className="w-3.5 h-3.5 opacity-70 shrink-0 ml-1" />
                      </button>
                      
                      {fontDropdownOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-[98]" 
                            onClick={() => setFontDropdownOpen(false)} 
                          />
                          <div className="absolute z-[99] mt-1 w-full bg-white border border-[#e2e8e0] rounded-xl shadow-xl p-2 space-y-2">
                            <input
                              type="text"
                              placeholder="Search fonts..."
                              value={fontSearch}
                              onChange={(e) => setFontSearch(e.target.value)}
                              className="w-full px-3 py-1.5 bg-[#f9fbf8] border border-[#dce4da] rounded-lg text-xs font-medium text-[#1c3c24] outline-none"
                            />
                            <div className="max-h-56 overflow-y-auto divide-y divide-[#f0f5ef]">
                              {GOOGLE_FONTS.filter(f => f.toLowerCase().includes(fontSearch.toLowerCase())).map((font) => (
                                <button
                                  key={font}
                                  type="button"
                                  onClick={() => {
                                    updateStyle("fontFamily", `${font}, sans-serif`);
                                    setFontDropdownOpen(false);
                                    setFontSearch("");
                                  }}
                                  className="w-full text-left px-3 py-2 hover:bg-[#f0f5ef] text-[#1c3c24] font-medium text-xs block transition-all"
                                  style={{ fontFamily: `${font}, sans-serif` }}
                                >
                                  {font} — Aa Bb Cc 123
                                </button>
                              ))}
                              {GOOGLE_FONTS.filter(f => f.toLowerCase().includes(fontSearch.toLowerCase())).length === 0 && (
                                <div className="text-center py-4 text-xs text-gray-400 font-medium">No matching fonts found</div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <DefaultBtn onClick={() => applyDefault("fontFamily")} />
                  </div>
                </div>

                {/* Font Weight */}
                <div>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Font Weight</label>
                  <div className="flex gap-1.5">
                    <select
                      value={styles.headingWeight || ""}
                      onChange={(e) => updateStyle("headingWeight", e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] cursor-pointer"
                    >
                      <option value="">Default</option>
                      <option value="100">100 Thin</option>
                      <option value="200">200 Extra Light</option>
                      <option value="300">300 Light</option>
                      <option value="400">400 Regular</option>
                      <option value="500">500 Medium</option>
                      <option value="600">600 Semi Bold</option>
                      <option value="700">700 Bold</option>
                      <option value="800">800 Extra Bold</option>
                      <option value="900">900 Black</option>
                    </select>
                    <DefaultBtn onClick={() => updateStyle("headingWeight", undefined)} title="Clear" />
                  </div>
                </div>

                {/* Predefined Heading Size Selector */}
                <div>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Heading Size</label>
                  <div className="flex gap-1.5">
                    <div className="flex-1 flex gap-1.5">
                      <select
                        value={
                          !styles.headingSize 
                            ? "" 
                            : PREDEFINED_HEADING_SIZES.includes(styles.headingSize.toString().replace("px", "").trim()) 
                              ? styles.headingSize.toString().replace("px", "").trim() 
                              : "custom"
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "custom") {
                            updateStyle("headingSize", styles.headingSize || 40);
                          } else if (val === "") {
                            updateStyle("headingSize", undefined);
                          } else {
                            updateStyle("headingSize", parseInt(val) || val);
                          }
                        }}
                        className="flex-1 px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                      >
                        <option value="">Default ({DEFAULTS.headingSize}px)</option>
                        {PREDEFINED_HEADING_SIZES.map(s => (
                          <option key={s} value={s}>{s} px</option>
                        ))}
                        <option value="custom">Custom...</option>
                      </select>

                      {styles.headingSize !== undefined && (!PREDEFINED_HEADING_SIZES.includes(styles.headingSize.toString().replace("px", "").trim())) && (
                        <input
                          type="text"
                          placeholder="Size (px)"
                          value={styles.headingSize}
                          onChange={(e) => updateStyle("headingSize", e.target.value)}
                          className="w-16 px-2 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] font-bold"
                        />
                      )}
                    </div>
                    <DefaultBtn onClick={() => applyDefault("headingSize")} />
                  </div>
                </div>

                {/* Predefined Paragraph Size Selector */}
                <div>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Paragraph Size</label>
                  <div className="flex gap-1.5">
                    <div className="flex-1 flex gap-1.5">
                      <select
                        value={
                          !styles.paragraphSize 
                            ? "" 
                            : PREDEFINED_PARAGRAPH_SIZES.includes(styles.paragraphSize.toString().replace("px", "").trim()) 
                              ? styles.paragraphSize.toString().replace("px", "").trim() 
                              : "custom"
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "custom") {
                            updateStyle("paragraphSize", styles.paragraphSize || 16);
                          } else if (val === "") {
                            updateStyle("paragraphSize", undefined);
                          } else {
                            updateStyle("paragraphSize", parseInt(val) || val);
                          }
                        }}
                        className="flex-1 px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                      >
                        <option value="">Default ({DEFAULTS.paragraphSize}px)</option>
                        {PREDEFINED_PARAGRAPH_SIZES.map(s => (
                          <option key={s} value={s}>{s} px</option>
                        ))}
                        <option value="custom">Custom...</option>
                      </select>

                      {styles.paragraphSize !== undefined && (!PREDEFINED_PARAGRAPH_SIZES.includes(styles.paragraphSize.toString().replace("px", "").trim())) && (
                        <input
                          type="text"
                          placeholder="Size (px)"
                          value={styles.paragraphSize}
                          onChange={(e) => updateStyle("paragraphSize", e.target.value)}
                          className="w-16 px-2 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] font-bold"
                        />
                      )}
                    </div>
                    <DefaultBtn onClick={() => applyDefault("paragraphSize")} />
                  </div>
                </div>

                {/* Predefined Line Height Selector */}
                <div>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Line Height</label>
                  <div className="flex gap-1.5">
                    <div className="flex-1 flex gap-1.5">
                      <select
                        value={
                          !styles.lineHeight 
                            ? "" 
                            : PREDEFINED_LINE_HEIGHTS.includes(styles.lineHeight.toString().trim()) 
                              ? styles.lineHeight.toString().trim() 
                              : "custom"
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "custom") {
                            updateStyle("lineHeight", styles.lineHeight || "1.5");
                          } else if (val === "") {
                            updateStyle("lineHeight", undefined);
                          } else {
                            updateStyle("lineHeight", val);
                          }
                        }}
                        className="flex-1 px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                      >
                        <option value="">Default ({DEFAULTS.lineHeight})</option>
                        {PREDEFINED_LINE_HEIGHTS.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                        <option value="custom">Custom...</option>
                      </select>

                      {styles.lineHeight !== undefined && (!PREDEFINED_LINE_HEIGHTS.includes(styles.lineHeight.toString().trim())) && (
                        <input
                          type="text"
                          placeholder="Line height"
                          value={styles.lineHeight}
                          onChange={(e) => updateStyle("lineHeight", e.target.value)}
                          className="w-16 px-2 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] font-bold"
                        />
                      )}
                    </div>
                    <DefaultBtn onClick={() => applyDefault("lineHeight")} />
                  </div>
                </div>

                {/* Predefined Letter Spacing Selector */}
                <div>
                  <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Letter Spacing</label>
                  <div className="flex gap-1.5">
                    <div className="flex-1 flex gap-1.5">
                      <select
                        value={
                          !styles.letterSpacing 
                            ? "" 
                            : PREDEFINED_LETTER_SPACINGS.includes(styles.letterSpacing.toString().trim()) 
                              ? styles.letterSpacing.toString().trim() 
                              : "custom"
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "custom") {
                            updateStyle("letterSpacing", styles.letterSpacing || "0.05em");
                          } else if (val === "") {
                            updateStyle("letterSpacing", undefined);
                          } else {
                            updateStyle("letterSpacing", val);
                          }
                        }}
                        className="flex-1 px-3 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24]"
                      >
                        <option value="">Default ({DEFAULTS.letterSpacing})</option>
                        {PREDEFINED_LETTER_SPACINGS.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                        <option value="custom">Custom...</option>
                      </select>

                      {styles.letterSpacing !== undefined && (!PREDEFINED_LETTER_SPACINGS.includes(styles.letterSpacing.toString().trim())) && (
                        <input
                          type="text"
                          placeholder="Spacing"
                          value={styles.letterSpacing}
                          onChange={(e) => updateStyle("letterSpacing", e.target.value)}
                          className="w-16 px-2 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] font-bold"
                        />
                      )}
                    </div>
                    <DefaultBtn onClick={() => applyDefault("letterSpacing")} />
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

              {/* Real-time Live Typography Preview */}
              <div className="mt-4 p-4 border border-[#e2e8e0] bg-[#f9fbf8] rounded-xl space-y-2">
                <span className="text-[9px] font-bold text-[#4e8c4a] uppercase tracking-wider block">Live Typography Preview</span>
                <div 
                  style={{
                    fontFamily: styles.fontFamily || DEFAULTS.fontFamily,
                    textAlign: (styles.textAlign as any) || (DEFAULTS.textAlign as any),
                  }}
                  className="space-y-1"
                >
                  <h4 
                    style={{
                      fontSize: styles.headingSize ? (isNaN(Number(styles.headingSize)) ? styles.headingSize : `${styles.headingSize}px`) : `${DEFAULTS.headingSize}px`,
                      fontWeight: styles.bold ? "bold" : (styles.headingWeight || "bold"),
                      fontStyle: styles.italic ? "italic" : "normal",
                      color: styles.headingColor || DEFAULTS.headingColor,
                      lineHeight: styles.lineHeight || DEFAULTS.lineHeight,
                      letterSpacing: styles.letterSpacing || DEFAULTS.letterSpacing,
                    }}
                  >
                    Sporonova Healthcare
                  </h4>
                  <p 
                    style={{
                      fontSize: styles.paragraphSize ? (isNaN(Number(styles.paragraphSize)) ? styles.paragraphSize : `${styles.paragraphSize}px`) : `${DEFAULTS.paragraphSize}px`,
                      fontWeight: styles.bold ? "normal" : (styles.headingWeight || "normal"),
                      fontStyle: styles.italic ? "italic" : "normal",
                      color: styles.textColor || DEFAULTS.textColor,
                      lineHeight: styles.lineHeight || DEFAULTS.lineHeight,
                      letterSpacing: styles.letterSpacing || DEFAULTS.letterSpacing,
                    }}
                  >
                    Professional pharmaceutical solutions
                  </p>
                </div>
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
