"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Leaf, Shield, ShieldCheck, Award, CheckCircle2, ChevronRight, ChevronLeft, Star, Users, Phone, MapPin, Mail, ClipboardList, Building2, HelpingHand, CheckSquare, Globe, Sparkles, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustIndicators from "@/components/TrustIndicators";
import ProcessTimelinePreview from "@/components/ProcessTimelinePreview";
import LiquidSpawnBottleCanvas from "@/components/canvas/LiquidSpawnBottleCanvas";
import GrainJarCanvas from "@/components/canvas/GrainJarCanvas";
import MushroomStructureCanvas from "@/components/canvas/MushroomStructureCanvas";
import { useCMS } from "@/lib/cms-context";
import { getSectionStyles, getHeadingStyles, getParagraphStyles, getButtonStyles } from "@/lib/styles-helper";
import { DynamicIcon } from "@/lib/icon-registry";

interface ProductCard {
  id: string;
  name: string;
  category: string;
  desc: string;
  href: string;
}

export const INQUIRY_MAPPINGS: Record<string, { title: string; message: string }> = {
  "Request Product Catalogue": {
    title: "Product Catalogue Request",
    message:
      "Hello, I would like to receive your latest mushroom spawn product catalogue. Please share details of your available mushroom spawn varieties, packaging options, pricing, and ordering information.",
  },
  "Request Technical PDF / Specifications": {
    title: "Technical Documentation Request",
    message:
      "Hello, I would like to receive the technical specifications for your mushroom spawn products. Please share information on storage conditions, shelf life, inoculation methods, cultivation guidelines, and recommended usage.",
  },
  "Request Bulk Spawn Quote": {
    title: "Bulk Spawn Quotation Request",
    message:
      "Hello, I am interested in purchasing mushroom spawn in bulk. Please provide a quotation including available varieties, pricing, minimum order quantity (MOQ), packaging options, delivery timeline, and payment terms.",
  },
  "Request Cooperative Partnership Info": {
    title: "Partnership Inquiry",
    message:
      "Hello, we are interested in exploring a partnership with Liquid Spawn. Please share information about dealership, distributorship, cooperative partnerships, commercial collaborations, and the application process.",
  },
  "General Cultivation Query": {
    title: "Mushroom Cultivation Support",
    message:
      "Hello, I have a question regarding mushroom cultivation. I would appreciate your guidance on spawn selection, cultivation techniques, disease management, yield optimization, or any other technical support.",
  },
};

const PRODUCTS: ProductCard[] = [
  {
    id: "liquid-spawn",
    name: "Liquid Spawn Broth",
    category: "Industrial Inoculant",
    desc: "Active vegetative mycelium cells suspended in sterilized liquid sugar broth, optimized for bioreactor inoculation.",
    href: "/spawn/liquid-spawn",
  },
  {
    id: "grain-spawn",
    name: "Grain Spawn Jars/Bags",
    category: "Carrier Matrix",
    desc: "Sterilized cereal grains (wheat, millet) fully colonized by pure mycelium, standard for bulk agricultural beds.",
    href: "/spawn/grain-spawn",
  },
  {
    id: "mother-culture",
    name: "Mother Culture Slants",
    category: "Genomic Isolate (G0)",
    desc: "Pure strain mycelium isolated on agar media slants inside glass tubes, serving as the primary genetic starting point.",
    href: "/spawn/mother-culture",
  },
  {
    id: "commercial-spawn",
    name: "Commercial Spawn Packs",
    category: "Bulk Production (G2)",
    desc: "Mass-production colonized grain bags distributed directly to commercial growers for direct substrate inoculation.",
    href: "/spawn/commercial-spawn",
  },
];

const VALUES = [
  { title: "Premium Quality", desc: "Genetically verified rhizomorphic strains yielding dense flushes.", tag: "GENOMIC PURITY", metric: "99.8%" },
  { title: "Scientific Production", desc: "Standardized laboratory parameters with precise autoclave logs.", tag: "HEPA CLASS 100", metric: "121°C / 15 PSI" },
  { title: "Low Contamination", desc: "Class 100 HEPA cleanroom filtration shields all transfers.", tag: "BIOSECURITY", metric: "< 0.01% RISK" },
  { title: "Consistent Performance", desc: "Rigorous testing guarantees reliable, reproducible spawn batches.", tag: "REPRODUCIBLE", metric: "100% PASS" },
  { title: "Expert Support", desc: "On-site cultivation guidance and substrate recipe optimization.", tag: "24/7 ADVISORY", metric: "FIELD CERTIFIED" },
  { title: "Certified Laboratory", desc: "State-accredited facilities compliant with standard biosecurity.", tag: "ISO 9001:2015", metric: "GMP VALIDATED" },
  { title: "Fast Distribution", desc: "Temperature-regulated cold chain ensures mycelial dormancy.", tag: "COLD CHAIN", metric: "2°C - 4°C VAULT" },
  { title: "Research & Innovation", desc: "Continuous strain breeding trials and growth optimization experiments.", tag: "STRAIN R&D", metric: "14+ VARIETIES" },
];

const INDUSTRIES = [
  { name: "Rural Farmers", desc: "Empowering growers with high-yield grain spawn and training." },
  { name: "Commercial Farms", desc: "Bulk liquid broth volumes for automated substrate bags." },
  { name: "Research Institutions", desc: "Providing genomic mother cultures and genetic tracing." },
  { name: "Universities", desc: "Supplying slants and sterile agar plates for botanical study." },
  { name: "Government Projects", desc: "Managing national cooperative horticulture aid packages." },
  { name: "NGO Projects", desc: "Partnering for micro-grant community food security programs." },
  { name: "Export Partners", desc: "International shipping certified cold-chain spawn logistics." },
];

const CREDENTIALS = [
  {
    title: "DMR Certified",
    status: "(Under Process)",
    desc: "Directorate of Mushroom Research certification validates scientific rigour of our spawn production protocols.",
    icon: <Award className="w-6 h-6 text-[#4e8c4a]" />,
  },
  {
    title: "NHB Certified",
    status: "(Under Process)",
    desc: "National Horticulture Board certification for horticultural produce quality standards.",
    icon: <CheckSquare className="w-6 h-6 text-[#4e8c4a]" />,
  },
  {
    title: "GMP Standard Lab",
    status: "Fully Operational",
    desc: "Good Manufacturing Practice compliant facility ensuring consistent, contamination-free liquid spawn production.",
    icon: <Building2 className="w-6 h-6 text-[#4e8c4a]" />,
  },
  {
    title: "ISO Standard",
    status: "Compliant",
    desc: "International quality management standards embedded across production and quality control processes.",
    icon: <Shield className="w-6 h-6 text-[#4e8c4a]" />,
  },
  {
    title: "12 Years of Experience",
    status: "Expert Team",
    desc: "Highly specialised team with over a decade of hands-on mushroom cultivation and spawn production expertise.",
    icon: <Users className="w-6 h-6 text-[#4e8c4a]" />,
  },
  {
    title: "14 Mushroom Varieties",
    status: "incl. Shiitake",
    desc: "Comprehensive portfolio covering shiitake, oyster, lion's mane and other high-value commercial species.",
    icon: <Leaf className="w-6 h-6 text-[#4e8c4a]" />,
  },
];

const TESTIMONIALS = [
  {
    quote: "Switching to SporoNova's liquid spawn broth allowed us to double our weekly bag inoculation capacity. The colonization lag time decreased by four days, giving us massive savings on autoclave fuels.",
    author: "Dr. Aris Thorne",
    role: "Director, Peak Fungi Farms",
  },
  {
    quote: "Our district farming cooperative has distributed SporoNova's grain spawn packs to over 400 rural women growers. The biological efficiency and yield consistency have secured steady household incomes.",
    author: "R. Srinivasan",
    role: "NGO Cooperative Coordinator",
  },
  {
    quote: "As a research laboratory, genetic purity is paramount. SporoNova's G0 mother culture slants exhibit exceptional sectoring traits and zero mutation drift across scaling generations.",
    author: "Prof. Elaine Vance",
    role: "Department of Biotechnology, SVU",
  },
];

const DELIVERABLES = [
  { label: "Liquid Spawn Supply", desc: "Consistent supply of certified shiitake liquid spawn to all enrolled farmers" },
  { label: "Training & Capacity Building", desc: "Structured on-farm and classroom training modules in local languages" },
  { label: "Technical Support", desc: "On-call expert support during all cultivation cycles for 12 months" },
  { label: "Market Linkage", desc: "Facilitation of buyer connections, FPO formation, and export channels" },
  { label: "Documentation & Reporting", desc: "Quarterly impact reports with yield, BE%, and income data for all partners" },
];

export default function Homepage() {
  const { data } = useCMS();
  const hero = data?.homepage?.hero;
  
  const heroStyles = data?.homepage?.hero?.styles;
  const statsStyles = (data?.homepage as any)?.statsStyles;
  const productsHeaderStyles = (data?.homepage as any)?.productsHeaderStyles;
  const credentialsStyles = (data?.homepage as any)?.credentialsStyles;
  const partnershipsStyles = (data?.homepage as any)?.partnershipsStyles;
  const deliverablesStyles = (data?.homepage as any)?.deliverablesStyles;
  const industriesStyles = (data?.homepage as any)?.industriesStyles;
  const testimonialsStyles = (data?.homepage as any)?.testimonialsStyles;
  const whyChooseUsStyles = (data?.homepage as any)?.whyChooseUsStyles;

  const productsList = data?.products && data.products.length > 0 ? data.products : PRODUCTS;
  const testimonialsList = data?.testimonials && data.testimonials.length > 0 ? data.testimonials : TESTIMONIALS;
  const valuesList = data?.values && data.values.length > 0 ? data.values : VALUES;
  const credentialsList = data?.credentials && data.credentials.length > 0 ? data.credentials : CREDENTIALS;
  const deliverablesList = data?.deliverables && data.deliverables.length > 0 ? data.deliverables : DELIVERABLES;
  const industriesList = data?.industries && data.industries.length > 0 ? data.industries : INDUSTRIES;
  const deliverablesStatsList = (data?.homepage as any)?.deliverablesStats && (data?.homepage as any).deliverablesStats.length > 0
    ? (data?.homepage as any).deliverablesStats
    : [
        { value: "200+", label: "Farmers Trained Year 1" },
        { value: "50%", label: "Yield Increase per Farmer" },
        { value: "3x", label: "Income Multiplier (Projected)" },
        { value: "14", label: "Mushroom Varieties Available" },
      ];
  const statsList = (data?.homepage as any)?.stats && (data?.homepage as any).stats.length > 0
    ? (data?.homepage as any).stats
    : [
        { value: "14+", label: "Mushroom Varieties", sublabel: "Including Shiitake & more", icon: "Leaf" },
        { value: "50%", label: "Higher Yield", sublabel: "Compared to grain spawn", icon: "Award" },
        { value: "3 Months", label: "Shelf Life", sublabel: "At 4°C temperature", icon: "Clock" },
        { value: "100%", label: "Organic & Chemical Free", sublabel: "Pure & safe cultivation", icon: "Shield" },
      ];
  const partnershipsList = (data as any)?.partnerships && (data as any).partnerships.length > 0 ? (data as any).partnerships : [
    {
      title: "Government of Tripura",
      points: [
        "Livelihood enhancement for tribal & rural farmers",
        "Agricultural diversification & income doubling",
        "Skill development through structured training",
        "Export potential for premium mushrooms",
        "Alignment with North-East India Development goals"
      ]
    },
    {
      title: "JICA Foundation",
      points: [
        "Proven, scalable agri-tech intervention",
        "SDG alignment: Zero Hunger, Decent Work",
        "Community-led inclusive development model",
        "Traceable impact metrics (yield, income, BE%)",
        "Replicable across other North-East states"
      ]
    },
    {
      title: "Indo-German Foundation",
      points: [
        "Technology transfer from science to farm",
        "GMP & ISO-aligned production standards",
        "Innovation in sustainable food systems",
        "Cross-border knowledge exchange potential",
        "Bilateral cooperation in food & agriculture"
      ]
    }
  ];

  const [heroProduct, setHeroProduct] = useState<"liquid" | "grain" | "mushroom">("liquid");
  const [reviewIdx, setReviewIdx] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "",
    title: "",
    message: "",
  });

  const [isTitleEdited, setIsTitleEdited] = useState(false);
  const [isMessageEdited, setIsMessageEdited] = useState(false);

  const nextReview = () => {
    setReviewIdx((prev) => (prev + 1) % testimonialsList.length);
  };

  const prevReview = () => {
    setReviewIdx((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  const handleInquiryTypeChange = (newType: string) => {
    if (!newType) {
      setFormData((prev) => ({
        ...prev,
        inquiryType: "",
        title: "",
        message: "",
      }));
      setIsTitleEdited(false);
      setIsMessageEdited(false);
      return;
    }

    const mapping = INQUIRY_MAPPINGS[newType] || {
      title: "",
      message: "",
    };

    const hasManualEdits = isTitleEdited || isMessageEdited;

    if (hasManualEdits) {
      const confirmReplace = window.confirm(
        "Changing the inquiry type will update your Title and Message fields to the corresponding default template. Replace your existing edits?"
      );
      if (!confirmReplace) {
        setFormData((prev) => ({ ...prev, inquiryType: newType }));
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      inquiryType: newType,
      title: mapping.title,
      message: mapping.message,
    }));
    setIsTitleEdited(false);
    setIsMessageEdited(false);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({ ...prev, title: val }));
    setIsTitleEdited(true);
  };

  const handleMessageChange = (val: string) => {
    setFormData((prev) => ({ ...prev, message: val }));
    setIsMessageEdited(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.inquiryType) {
      alert("Please select an inquiry type.");
      return;
    }
    const phoneNumber = data?.contact?.whatsappNumber || "917207208419";
    const text = `*Name:* ${encodeURIComponent(formData.name || "N/A")}%0A*Email:* ${encodeURIComponent(formData.email || "N/A")}%0A*Inquiry Type:* ${encodeURIComponent(formData.inquiryType)}%0A*Title:* ${encodeURIComponent(formData.title || "N/A")}%0A*Message:* ${encodeURIComponent(formData.message || "N/A")}`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-luxury-beige">
        
        {/* HERO SECTION */}
        <section className="pt-32 pb-16 px-6 bg-[#f9faf7] relative" style={getSectionStyles(heroStyles)}>
          <div className="max-w-7xl mx-auto rounded-[2.5rem] overflow-hidden border border-[#e6e4dc] bg-white shadow-xl grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[70vh]">
            
            {/* Left Copy Column */}
            <div 
              className="lg:col-span-6 bg-[#1c3c24] text-white p-10 md:p-16 flex flex-col justify-center space-y-8 relative overflow-hidden"
              style={{ backgroundColor: heroStyles?.backgroundColor || undefined }}
            >
              {/* Background accent ring */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/5 rounded-full pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />

              <span className="text-[10px] text-[#7baa6b] font-mono uppercase tracking-widest block font-black relative z-10">
                {hero?.badge || "SporoNova • Agricultural Spawn Manufacturer"}
              </span>
              <h1
                className="text-white font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight relative z-10 font-sans"
                style={{ ...getHeadingStyles(heroStyles), color: heroStyles?.headingColor || heroStyles?.textColor || undefined }}
              >
                {hero?.headingText || "Premium Mushroom Spawn for Better Harvests"}
              </h1>
              <p 
                className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl relative z-10 font-sans"
                style={{ ...getParagraphStyles(heroStyles), color: heroStyles?.paragraphColor || undefined }}
              >
                {hero?.subtitleText || "We produce high-quality mushroom spawn using scientific methods, helping farmers, entrepreneurs, research institutions, and commercial growers achieve consistent and healthy mushroom production."}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4 relative z-10">
                <Link
                  href={hero?.ctaPrimaryLink || "/#products"}
                  className="px-8 py-3.5 bg-[#4e8c4a] text-white text-[10px] font-bold uppercase tracking-wider rounded-full hover:bg-white hover:text-[#1c3c24] transition-all shadow-md shadow-[#4e8c4a]/10"
                  style={getButtonStyles(heroStyles)}
                >
                  {hero?.ctaPrimaryText || "Explore Our Products →"}
                </Link>
                <Link
                  href={hero?.ctaSecondaryLink || "/contact"}
                  className="px-8 py-3.5 bg-transparent border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#7baa6b]" /> {hero?.ctaSecondaryText || "Talk to an Expert"}
                </Link>
              </div>
            </div>

            {/* Right Display Image Column */}
            <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-full">
              <img
                src={hero?.heroImage || "/hero_mushrooms.jpg"}
                alt="Premium Mushroom Cultivation"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

          </div>
        </section>

        {/* FLOATING STATS BAR */}
        <section className="px-6 relative z-20" style={getSectionStyles(statsStyles)}>
          <div 
            className="max-w-7xl mx-auto -mt-12 bg-white rounded-3xl border border-[#e6e4dc]/80 shadow-lg p-6 md:py-8 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            style={{ 
              backgroundColor: statsStyles?.cardBgColor || undefined, 
              borderColor: statsStyles?.cardBorderColor || undefined, 
              borderRadius: statsStyles?.cardBorderRadius !== undefined ? `${statsStyles.cardBorderRadius}px` : undefined 
            }}
          >
            
            {statsList.map((st: any, idx: number) => {
              const defaultIcons = ["Leaf", "Award", "Clock", "Shield"];
              const iconName = st.icon || defaultIcons[idx % defaultIcons.length];
              return (
                <div key={idx} className="flex items-start gap-4">
                  <div 
                    className="p-3 bg-[#f9faf7] border border-[#e6e4dc] shrink-0"
                    style={{ 
                      backgroundColor: statsStyles?.backgroundColor || (data?.settings as any)?.iconBgColor || undefined,
                      borderColor: statsStyles?.borderColor || undefined,
                      borderRadius: statsStyles?.borderRadius !== undefined ? `${statsStyles.borderRadius}px` : (data?.settings as any)?.iconBorderRadius !== undefined ? `${(data?.settings as any).iconBorderRadius}px` : undefined,
                    }}
                  >
                    <DynamicIcon 
                      name={iconName}
                      className="w-5 h-5 text-[#4e8c4a]" 
                      style={{ 
                        color: statsStyles?.iconColor || (data?.settings as any)?.iconColor || undefined,
                        width: statsStyles?.iconSize !== undefined ? `${statsStyles.iconSize}px` : (data?.settings as any)?.iconSize !== undefined ? `${(data?.settings as any).iconSize}px` : undefined,
                        height: statsStyles?.iconSize !== undefined ? `${statsStyles.iconSize}px` : (data?.settings as any)?.iconSize !== undefined ? `${(data?.settings as any).iconSize}px` : undefined,
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <span 
                      className="font-display font-extrabold text-gray-900 text-base block leading-none font-sans"
                      style={getHeadingStyles(statsStyles)}
                    >
                      {st.value}
                    </span>
                    <span 
                      className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block font-sans"
                      style={getParagraphStyles(statsStyles)}
                    >
                      {st.label}
                    </span>
                    <span className="text-[9px] text-gray-400 font-semibold block">{st.sublabel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* COMPANY INTRODUCTION - Who We Are Section */}
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left copy column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] text-[#4e8c4a] font-mono uppercase tracking-widest block font-extrabold">
                {data?.about?.heroSubtitle || "ABOUT SPORONOVA"}
              </span>
              <h2 className="text-[#1c3c24] font-display text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {data?.about?.whoWeAreTitle || "Science and Commitment Behind Every Kernel"}
              </h2>
            </div>
            
            <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
              {data?.about?.whoWeAreParagraph1 || "For over a decade, SporoNova has partnered with commercial cultivators, horticulture boards, and rural cooperatives to modernize mycology cultivation. We ensure pure mycelial expansion by sourcing tested substrate grains, balancing media pH, and verifying strain genetics under strict laboratory clearance."}
            </p>

            {/* Sub-card: Standards and Cleanroom */}
            <div className="bg-white border border-[#e6e4dc]/70 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <h4 className="text-gray-950 font-display font-extrabold text-base tracking-wide">
                Who We Are & Our Cleanroom Standards
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm font-semibold leading-relaxed">
                {data?.about?.whoWeAreParagraph2 || "SporoNova operates certified agricultural inoculation cleanrooms, utilizing advanced biological protocols to preserve genetic lines. We focus on providing high-yield, disease-resistant spawn formulas that guarantee crops flush predictably."}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-gray-700 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#f9faf7] border border-[#e6e4dc] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4e8c4a]" />
                  </div>
                  <span>Class 100 Laminar Airflow</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#f9faf7] border border-[#e6e4dc] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4e8c4a]" />
                  </div>
                  <span>Saturated Steam Autoclaves</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#f9faf7] border border-[#e6e4dc] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4e8c4a]" />
                  </div>
                  <span>Phase Contrast Micro-Verification</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#f9faf7] border border-[#e6e4dc] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4e8c4a]" />
                  </div>
                  <span>Dormant Cold Chain Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Video Preview Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-[2rem] overflow-hidden border border-[#e6e4dc] shadow-lg group aspect-[4/3] cursor-pointer">
              {/* Play trigger overlay */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors z-10 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {/* Styled play triangle icon */}
                  <svg className="w-6 h-6 text-[#1c3c24] fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <img
                src={data?.about?.whoWeAreImage || "/about_mushrooms.jpg"}
                alt="White button mushrooms growing from compost"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION - Asymmetrical Layout Diversity Grid */}
        <section id="products" className="py-24 bg-white border-t border-b border-[#e6e4dc] px-6" style={getSectionStyles(productsHeaderStyles)}>
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16 relative">
              <span className="text-xs text-[#4e8c4a] font-mono uppercase tracking-widest block mb-1 font-bold">
                {(data?.homepage as any)?.productsSectionBadge || "Product Catalog"}
              </span>
              <h2 
                className="font-display text-3xl md:text-4xl font-black tracking-tight text-[#1c3c24] font-sans"
                style={getHeadingStyles(productsHeaderStyles)}
              >
                {(data?.homepage as any)?.productsSectionTitle || "Professional Spawn Categories"}
              </h2>
              <div className="w-12 h-1 bg-[#4e8c4a] mx-auto mt-4 rounded-full" />
              <p 
                className="text-gray-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-medium font-sans"
                style={getParagraphStyles(productsHeaderStyles)}
              >
                {(data?.homepage as any)?.productsSectionSubtitle || "Explore our certified spawn selection. Select any category to view technical data sheets, storage values, and application guides."}
              </p>
            </div>

            {/* Asymmetrical composition layout rows */}
            <div className="space-y-8">
              
              {/* Row 1: Liquid Spawn & Grain Spawn */}
              <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                {/* Liquid Spawn Broth */}
                <div className="w-full lg:w-2/3 bg-[#f2f7f2]/50 border border-[#e6e4dc] rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="space-y-4 max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4e8c4a]" />
                      <span className="text-[10px] text-gray-500 font-mono block uppercase font-bold tracking-wider">{(productsList[0] || PRODUCTS[0]).category}</span>
                    </div>
                    <h4 className="text-[#1c3c24] font-display font-extrabold text-xl md:text-2xl leading-snug group-hover:text-[#4e8c4a] transition-colors">
                      {(productsList[0] || PRODUCTS[0]).name}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm font-semibold leading-relaxed">
                      {(productsList[0] || PRODUCTS[0]).desc}
                    </p>
                    <div className="pt-4">
                      <Link
                        href={(productsList[0] || PRODUCTS[0]).href}
                        className="inline-flex items-center justify-center px-6 py-3 bg-[#1c3c24] hover:bg-[#4e8c4a] rounded-full text-[10px] font-bold uppercase tracking-wider text-white transition-all"
                      >
                        View Specifications &rarr;
                      </Link>
                    </div>
                  </div>
                  {/* Canvas block */}
                  <div className="w-48 h-48 rounded-2xl bg-white border border-[#e6e4dc] relative overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                    <LiquidSpawnBottleCanvas hideSidebar={true} />
                  </div>
                </div>

                {/* Grain Spawn Jars/Bags */}
                <div className="w-full lg:w-1/3 bg-[#f4f5f0]/50 border border-[#e6e4dc] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4e8c4a]" />
                      <span className="text-[10px] text-gray-500 font-mono block uppercase font-bold tracking-wider">{(productsList[1] || PRODUCTS[1]).category}</span>
                    </div>
                    <h4 className="text-[#1c3c24] font-display font-extrabold text-xl md:text-2xl leading-snug group-hover:text-[#4e8c4a] transition-colors">
                      {(productsList[1] || PRODUCTS[1]).name}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm font-semibold leading-relaxed">
                      {(productsList[1] || PRODUCTS[1]).desc}
                    </p>
                  </div>
                  {/* Canvas block or CTA */}
                  <div className="mt-6 flex flex-col gap-4">
                    <div className="w-full h-32 rounded-xl bg-white border border-[#e6e4dc] relative overflow-hidden flex items-center justify-center">
                      <GrainJarCanvas hideSidebar={true} />
                    </div>
                    <Link
                      href={(productsList[1] || PRODUCTS[1]).href}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#1c3c24] hover:bg-[#4e8c4a] rounded-full text-[10px] font-bold uppercase tracking-wider text-white transition-all text-center"
                    >
                      View Specifications &rarr;
                    </Link>
                  </div>
                </div>
              </div>

              {/* Row 2: Mother Culture & Commercial Spawn */}
              <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                {/* Mother Culture Slants */}
                <div className="w-full lg:w-1/3 bg-white border border-[#e6e4dc] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4e8c4a]" />
                      <span className="text-[10px] text-gray-500 font-mono block uppercase font-bold tracking-wider">{(productsList[2] || PRODUCTS[2]).category}</span>
                    </div>
                    <h4 className="text-[#1c3c24] font-display font-extrabold text-xl md:text-2xl leading-snug group-hover:text-[#4e8c4a] transition-colors">
                      {(productsList[2] || PRODUCTS[2]).name}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm font-semibold leading-relaxed">
                      {(productsList[2] || PRODUCTS[2]).desc}
                    </p>
                  </div>
                  <div className="pt-6">
                    <Link
                      href={(productsList[2] || PRODUCTS[2]).href}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-transparent border border-[#e6e4dc] text-[#1c3c24] hover:bg-[#1c3c24] hover:text-white rounded-full text-[10px] font-bold uppercase tracking-wider transition-all text-center"
                    >
                      View Specifications &rarr;
                    </Link>
                  </div>
                </div>

                {/* Commercial Spawn Packs */}
                <div className="w-full lg:w-2/3 bg-[#fcfbfa] border border-[#e6e4dc] rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="space-y-4 max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4e8c4a]" />
                      <span className="text-[10px] text-gray-500 font-mono block uppercase font-bold tracking-wider">{(productsList[3] || PRODUCTS[3]).category}</span>
                    </div>
                    <h4 className="text-[#1c3c24] font-display font-extrabold text-xl md:text-2xl leading-snug group-hover:text-[#4e8c4a] transition-colors">
                      {(productsList[3] || PRODUCTS[3]).name}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm font-semibold leading-relaxed">
                      {(productsList[3] || PRODUCTS[3]).desc}
                    </p>
                    <div className="pt-4">
                      <Link
                        href={(productsList[3] || PRODUCTS[3]).href}
                        className="inline-flex items-center justify-center px-6 py-3 bg-[#1c3c24] hover:bg-[#4e8c4a] rounded-full text-[10px] font-bold uppercase tracking-wider text-white transition-all"
                      >
                        View Specifications &rarr;
                      </Link>
                    </div>
                  </div>
                  {/* Decorative placeholder block or canvas */}
                  <div className="w-48 h-32 rounded-xl bg-white border border-[#e6e4dc] relative overflow-hidden shrink-0 flex items-center justify-center">
                    <Leaf className="w-12 h-12 text-[#4e8c4a]/20" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* WHY CHOOSE US - Highly Animated, Interactive & Dynamic Cards */}
        <section id="why-choose-us" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden" style={getSectionStyles(whyChooseUsStyles)}>
          {/* Subtle ambient gradient light pulse background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#4e8c4a]/10 via-[#7baa6b]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-[#e6e4dc]/60 relative z-10"
          >
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4e8c4a]/10 border border-[#4e8c4a]/30 text-[#4e8c4a] text-[10px] font-mono font-extrabold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#4e8c4a] animate-ping" />
                {(data?.homepage as any)?.valuesSectionBadge || "Quality Assurance Protocols"}
              </div>
              <h2 
                className="font-display text-3xl md:text-5xl font-black tracking-tight text-[#1c3c24] leading-tight font-sans"
                style={getHeadingStyles(whyChooseUsStyles)}
              >
                {(data?.homepage as any)?.valuesSectionTitle || "Why Growers Choose SporoNova"}
              </h2>
            </div>
            <div className="md:col-span-4">
              <p 
                className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed font-sans"
                style={getParagraphStyles(whyChooseUsStyles)}
              >
                {(data?.homepage as any)?.valuesSectionSubtitle || "Our standard manufacturing protocols solve major cultivation hazards, ensuring optimal biological efficiency and reproducible harvest yields."}
              </p>
            </div>
          </motion.div>

          {/* Animated Staggered Value Grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 relative z-10"
          >
            {valuesList.map((val, idx) => {
              const defaultIcons = ["Leaf", "Sparkles", "Shield", "Award", "Users", "Building2", "Clock", "Globe"];
              const iconName = (val as any).icon || defaultIcons[idx % defaultIcons.length];
              const numStr = (idx + 1).toString().padStart(2, "0");

              return (
                <motion.div
                  key={val.title}
                  variants={{
                    hidden: { opacity: 0, y: 35, scale: 0.96 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
                  }}
                  whileHover={{ y: -10, scale: 1.025 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="group bg-white border border-[#e6e4dc] rounded-[2rem] p-7 space-y-6 hover:border-[#4e8c4a]/50 hover:shadow-2xl hover:shadow-[#4e8c4a]/10 transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-default"
                  style={{
                    backgroundColor: whyChooseUsStyles?.cardBgColor || undefined,
                    borderColor: whyChooseUsStyles?.cardBorderColor || undefined,
                    borderRadius: whyChooseUsStyles?.cardBorderRadius !== undefined ? `${whyChooseUsStyles.cardBorderRadius}px` : undefined,
                  }}
                >
                  {/* Hover Accent Top Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4e8c4a] via-[#7baa6b] to-[#1c3c24] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="space-y-5">
                    {/* Top Bar: Icon + Index */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#f9faf7] border border-[#e6e4dc] group-hover:bg-[#1c3c24] group-hover:border-[#1c3c24] group-hover:text-white group-hover:rotate-6 flex items-center justify-center text-[#4e8c4a] transition-all duration-300 shadow-sm">
                        <DynamicIcon name={iconName} className="w-5 h-5 transition-transform group-hover:scale-110" />
                      </div>
                      <span className="font-mono text-xs font-black text-gray-300 group-hover:text-[#4e8c4a] transition-colors duration-300 bg-[#f9faf7] px-2.5 py-1 rounded-full border border-gray-100">
                        {numStr}
                      </span>
                    </div>

                    {/* Title & Tag */}
                    <div className="space-y-1.5">
                      <span className="text-[8px] font-mono font-bold tracking-widest text-[#4e8c4a] uppercase block">
                        {val.tag}
                      </span>
                      <h4 className="text-[#1c3c24] font-display font-extrabold text-base md:text-lg leading-tight group-hover:text-[#1c3c24] font-sans">
                        {val.title}
                      </h4>
                    </div>

                    <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed font-sans">
                      {val.desc}
                    </p>
                  </div>

                  {/* Bottom Metric Chip */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[8px] text-gray-400 font-mono uppercase font-extrabold tracking-wider">
                      BENCHMARK
                    </span>
                    <span className="text-[10px] font-mono font-black text-[#4e8c4a] bg-[#f9faf7] border border-[#e6e4dc] group-hover:border-[#4e8c4a]/40 px-2.5 py-1 rounded-lg transition-colors">
                      {val.metric}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
        {/* CREDENTIALS & CERTIFICATIONS (Sliding Carousel / Marquee) */}
        <section id="accreditation" className="py-24 bg-white border-t border-[#e6e4dc] scroll-mt-24" style={getSectionStyles(credentialsStyles)}>
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Dark green header bar with badge & slider status */}
            <div 
              className="bg-[#1c3c24] text-white py-7 px-8 sm:px-10 rounded-t-3xl border-b border-white/10 relative overflow-hidden shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{ backgroundColor: credentialsStyles?.backgroundColor || undefined }}
            >
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />
              <div className="space-y-1 relative z-10">
                <span className="text-[10px] text-[#7baa6b] font-mono uppercase tracking-widest block font-extrabold">
                  Verified Compliance & Credentials
                </span>
                <h2 
                  className="font-display text-2xl md:text-3xl font-extrabold tracking-wide font-sans"
                  style={getHeadingStyles(credentialsStyles)}
                >
                  Our Credentials & Certifications
                </h2>
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/70 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md flex items-center gap-2 font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#7baa6b] animate-ping" />
                  Auto-Sliding Deck
                </span>
              </div>
            </div>

            {/* Sliding Marquee Body */}
            <div className="bg-[#f9faf7]/70 border-l border-r border-b border-[#e6e4dc] py-10 px-4 md:px-6 rounded-b-3xl relative overflow-hidden">
              {/* Soft edge gradient blur overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#f9faf7] via-[#f9faf7]/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#f9faf7] via-[#f9faf7]/80 to-transparent z-10 pointer-events-none" />

              {/* Sliding Marquee Track */}
              <div className="animate-marquee flex gap-6">
                {credentialsList.concat(credentialsList).concat(credentialsList).map((cred, idx) => (
                  <div
                    key={`${cred.title}-${idx}`}
                    className="group bg-white border border-[#e6e4dc] p-7 rounded-[1.75rem] hover:border-[#4e8c4a]/60 hover:shadow-xl hover:shadow-[#4e8c4a]/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between w-[320px] sm:w-[360px] shrink-0 relative overflow-hidden cursor-default"
                    style={{
                      backgroundColor: credentialsStyles?.cardBgColor || undefined,
                      borderColor: credentialsStyles?.cardBorderColor || undefined,
                      borderRadius: credentialsStyles?.cardBorderRadius !== undefined ? `${credentialsStyles.cardBorderRadius}px` : undefined,
                    }}
                  >
                    {/* Hover Top Accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4e8c4a] to-[#7baa6b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div 
                          className="p-3.5 bg-[#f9faf7] border border-[#e6e4dc] group-hover:bg-[#1c3c24] group-hover:border-[#1c3c24] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs"
                          style={{
                            backgroundColor: credentialsStyles?.backgroundColor || (data?.settings as any)?.iconBgColor || undefined,
                            borderRadius: credentialsStyles?.borderRadius !== undefined ? `${credentialsStyles.borderRadius}px` : (data?.settings as any)?.iconBorderRadius !== undefined ? `${(data?.settings as any).iconBorderRadius}px` : "16px",
                          }}
                        >
                          {typeof (cred as any).icon === "string" ? (
                            <DynamicIcon
                              name={(cred as any).icon}
                              className="w-5 h-5 text-[#4e8c4a] group-hover:text-white transition-colors"
                              style={{ 
                                color: credentialsStyles?.iconColor || (data?.settings as any)?.iconColor || undefined,
                                width: credentialsStyles?.iconSize !== undefined ? `${credentialsStyles.iconSize}px` : (data?.settings as any)?.iconSize !== undefined ? `${(data?.settings as any).iconSize}px` : undefined,
                                height: credentialsStyles?.iconSize !== undefined ? `${credentialsStyles.iconSize}px` : (data?.settings as any)?.iconSize !== undefined ? `${(data?.settings as any).iconSize}px` : undefined,
                              }}
                              fallback={<ShieldCheck className="w-5 h-5 text-[#4e8c4a] group-hover:text-white transition-colors" style={{ color: credentialsStyles?.iconColor || (data?.settings as any)?.iconColor || undefined }} />}
                            />
                          ) : React.isValidElement((cred as any).icon) ? (
                            React.cloneElement((cred as any).icon as React.ReactElement<any>, {
                              className: "w-5 h-5 text-[#4e8c4a] group-hover:text-white transition-colors",
                              style: { 
                                color: credentialsStyles?.iconColor || (data?.settings as any)?.iconColor || undefined,
                                width: credentialsStyles?.iconSize !== undefined ? `${credentialsStyles.iconSize}px` : (data?.settings as any)?.iconSize !== undefined ? `${(data?.settings as any).iconSize}px` : undefined,
                                height: credentialsStyles?.iconSize !== undefined ? `${credentialsStyles.iconSize}px` : (data?.settings as any)?.iconSize !== undefined ? `${(data?.settings as any).iconSize}px` : undefined,
                              }
                            })
                          ) : (
                            <ShieldCheck className="w-5 h-5 text-[#4e8c4a] group-hover:text-white transition-colors" style={{ color: credentialsStyles?.iconColor || (data?.settings as any)?.iconColor || undefined }} />
                          )}
                        </div>
                        <div>
                          <h4 className="text-[#1c3c24] font-display font-extrabold text-base leading-snug group-hover:text-[#1c3c24]">
                            {cred.title}
                          </h4>
                          <span className={`text-[10px] font-mono font-bold block mt-0.5 ${
                            cred.status.includes("Operational") || cred.status.includes("Compliant") || cred.status.includes("Expert")
                              ? "text-emerald-600"
                              : "text-[#4e8c4a]"
                          }`}>
                            ● {cred.status}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed pt-2 border-t border-gray-100/60">
                        {cred.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* PARTNERSHIP VALUE PROPOSITION */}
        <section className="py-24 px-6 max-w-7xl mx-auto" style={getSectionStyles(partnershipsStyles)}>
          
          <div 
            className="bg-[#1c3c24] text-white py-8 px-10 rounded-t-3xl border-b border-white/10 relative overflow-hidden shadow-md"
            style={{ backgroundColor: partnershipsStyles?.backgroundColor || undefined }}
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />
            <h2 
              className="font-display text-2xl md:text-3xl font-extrabold tracking-wide font-sans"
              style={getHeadingStyles(partnershipsStyles)}
            >
              Partnership Value Proposition
            </h2>
          </div>

          <div className="bg-[#f9faf7]/50 border-l border-r border-b border-[#e6e4dc] p-8 md:p-10 rounded-b-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {partnershipsList.map((partner: any, idx: number) => {
                const IconComp = idx === 0 ? Building2 : idx === 1 ? Globe : HelpingHand;
                return (
                  <div 
                    key={partner.title || idx} 
                    className="bg-white text-gray-900 p-8 md:p-10 rounded-[2rem] flex flex-col justify-between space-y-6 shadow-sm hover:scale-[1.01] transition-transform duration-300 border border-[#e6e4dc] relative overflow-hidden"
                    style={{
                      backgroundColor: partnershipsStyles?.cardBgColor || undefined,
                      borderColor: partnershipsStyles?.cardBorderColor || undefined,
                      borderRadius: partnershipsStyles?.cardBorderRadius !== undefined ? `${partnershipsStyles.cardBorderRadius}px` : undefined,
                    }}
                  >
                    <div className="space-y-6 relative z-10">
                      <div className="flex flex-col items-center text-center">
                        <IconComp className="w-12 h-12 text-[#4e8c4a] mb-3" />
                        <h4 className="font-display font-extrabold text-lg text-[#1c3c24] border-b-2 border-amber-500 pb-2 px-4">
                          {partner.title}
                        </h4>
                      </div>
                      <ul className="space-y-3.5 text-xs text-gray-600 list-disc pl-4 font-semibold leading-relaxed">
                        {partner.points?.map((pt: string, pIdx: number) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* EXPECTED IMPACT & DELIVERABLES */}
        <section className="py-24 bg-white border-t border-b border-[#e6e4dc] px-6" style={getSectionStyles(deliverablesStyles)}>
          <div className="max-w-7xl mx-auto">
            
            <div 
              className="bg-[#1c3c24] text-white py-8 px-10 rounded-t-3xl border-b border-white/10 relative overflow-hidden shadow-md"
              style={{ backgroundColor: deliverablesStyles?.backgroundColor || undefined }}
            >
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />
              <h2 
                className="font-display text-2xl md:text-3xl font-extrabold tracking-wide font-sans"
                style={getHeadingStyles(deliverablesStyles)}
              >
                Expected Impact & Deliverables
              </h2>
            </div>

            <div className="bg-[#f9faf7]/50 border-l border-r border-b border-[#e6e4dc] p-8 md:p-10 rounded-b-3xl space-y-12">
              
              {/* Counters Row - Floating Stat panels */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {deliverablesStatsList.map((stat: any, idx: number) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-[#e6e4dc]/75 p-6 rounded-2xl text-center space-y-1.5 shadow-sm"
                    style={{
                      backgroundColor: deliverablesStyles?.cardBgColor || undefined,
                      borderColor: deliverablesStyles?.cardBorderColor || undefined,
                      borderRadius: deliverablesStyles?.cardBorderRadius !== undefined ? `${deliverablesStyles.cardBorderRadius}px` : undefined,
                    }}
                  >
                    <span className="font-display font-black text-3xl md:text-4xl text-[#4e8c4a] block">{stat.value}</span>
                    <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest font-bold block leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Key Deliverables connected pipeline */}
              <div className="space-y-8 pt-4">
                <h3 className="text-[#1c3c24] font-display text-lg font-bold tracking-wide">
                  Key Programme Deliverables
                </h3>

                <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4 relative py-2">
                  {/* Background connector line for desktop */}
                  <div className="hidden lg:block absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-[#e6e4dc] z-0 pointer-events-none" />

                  {deliverablesList.map((del, idx) => (
                    <React.Fragment key={del.label}>
                      {/* Card Box */}
                      <motion.div
                        whileHover={{ y: -3 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-white border border-[#e6e4dc] p-5 rounded-2xl flex flex-col justify-between flex-1 shadow-sm hover:border-[#4e8c4a] transition-all relative z-10 space-y-3 min-h-[160px]"
                      >
                        {/* Step badge */}
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <span className="text-[9px] text-[#4e8c4a] font-mono font-black uppercase tracking-widest">
                            Deliverable 0{idx + 1}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-[#4e8c4a]" />
                        </div>

                        {/* Label */}
                        <h4 className="text-[#1c3c24] font-display font-extrabold text-xs tracking-wider uppercase leading-snug">
                          {del.label}
                        </h4>

                        {/* Description */}
                        <p className="text-gray-500 text-[11px] font-semibold leading-relaxed">
                          {del.desc}
                        </p>
                      </motion.div>

                      {/* Connection indicator - desktop chevron */}
                      {idx < deliverablesList.length - 1 && (
                        <div className="hidden lg:flex items-center text-[#4e8c4a] z-10 shrink-0 self-center">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      )}

                      {/* Connection indicator - mobile chevron */}
                      {idx < deliverablesList.length - 1 && (
                        <div className="lg:hidden flex justify-center text-[#4e8c4a] my-1">
                          <ChevronRight className="w-4 h-4 rotate-90" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>
        {/* INDUSTRIES WE SERVE MARQUEE */}
        <section className="py-24 bg-[#f9faf7] border-t border-b border-[#e6e4dc] px-6" style={getSectionStyles(industriesStyles)}>
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-xs text-[#4e8c4a] font-mono uppercase tracking-widest block mb-1 font-bold">
                Ecosystem Integration
              </span>
              <h2 
                className="font-display text-3xl font-black tracking-wide text-[#1c3c24] font-sans"
                style={getHeadingStyles(industriesStyles)}
              >
                Industries We Serve
              </h2>
              <div className="w-12 h-1 bg-[#4e8c4a] mx-auto mt-4 rounded-full" />
            </div>

            <div className="relative w-full overflow-hidden py-4">
              {/* Soft edge blur overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f9faf7] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f9faf7] to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee flex gap-6">
                {industriesList.concat(industriesList).concat(industriesList).map((ind: any, idx: number) => (
                  <div
                    key={`${ind.name}-${idx}`}
                    title={ind.desc}
                    className="bg-white border border-[#e6e4dc] hover:border-[#4e8c4a]/50 p-8 rounded-[2rem] text-center space-y-3 flex flex-col justify-center min-h-[190px] w-[320px] shrink-0 shadow-sm hover:shadow-md transition-all cursor-default"
                  >
                    <span className="text-[#1c3c24] font-display font-extrabold text-base tracking-wide block">
                      {ind.name}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold leading-relaxed block">
                      {ind.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* PRODUCTION PROCESS PREVIEW TIMELINE */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <ProcessTimelinePreview />
        </section>

        {/* SUCCESS NUMBERS */}
        <section className="py-20 bg-[#1c3c24] text-white px-6 shadow-md">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {statsList.map((stat: any, idx: number) => (
              <div key={idx} className="space-y-1 pt-4 md:pt-0">
                <span className="font-display font-black text-3xl md:text-5xl block text-[#7baa6b]">{stat.value}</span>
                <span className="text-[10px] text-white/70 uppercase font-mono tracking-widest font-extrabold">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS SLIDING CAROUSEL */}
        <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden relative" style={getSectionStyles(testimonialsStyles)}>
          
          <div className="text-center mb-16">
            <span className="text-xs text-[#4e8c4a] font-mono uppercase tracking-widest block mb-1 font-bold">
              Customer Feedback
            </span>
            <h2 
              className="font-display text-3xl font-black tracking-wide text-[#1c3c24] font-sans"
              style={getHeadingStyles(testimonialsStyles)}
            >
              Trusted by Growers & Institutions
            </h2>
            <div className="w-12 h-1 bg-[#4e8c4a] mx-auto mt-4 rounded-full" />
          </div>

          <div className="max-w-3xl mx-auto relative px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIdx}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="bg-white border border-[#e6e4dc] rounded-[2rem] p-10 md:p-16 space-y-6 shadow-sm relative"
                style={{
                  backgroundColor: testimonialsStyles?.cardBgColor || undefined,
                  borderColor: testimonialsStyles?.cardBorderColor || undefined,
                  borderRadius: testimonialsStyles?.cardBorderRadius !== undefined ? `${testimonialsStyles.cardBorderRadius}px` : undefined,
                }}
              >
                <div className="flex text-amber-500 gap-1 justify-center">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>

                <p 
                  className="text-gray-600 text-base md:text-lg font-semibold leading-relaxed text-center italic font-sans"
                  style={getParagraphStyles(testimonialsStyles)}
                >
                  &quot;{(testimonialsList[reviewIdx] || TESTIMONIALS[0]).quote}&quot;
                </p>

                <div className="pt-6 border-t border-gray-100/50 flex flex-col items-center gap-1.5 justify-center">
                  <Users className="w-5 h-5 text-[#4e8c4a]" />
                  <h4 className="text-sm font-extrabold text-gray-900 leading-tight">
                    {(testimonialsList[reviewIdx] || TESTIMONIALS[0]).author}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-mono uppercase font-bold">
                    {(testimonialsList[reviewIdx] || TESTIMONIALS[0]).role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider arrows */}
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[#e6e4dc] flex items-center justify-center hover:border-[#4e8c4a] hover:text-[#4e8c4a] transition-all shadow-sm z-10 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[#e6e4dc] flex items-center justify-center hover:border-[#4e8c4a] hover:text-[#4e8c4a] transition-all shadow-sm z-10 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonialsList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setReviewIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  reviewIdx === idx ? "bg-[#4e8c4a] w-5" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

        </section>

        {/* REDESIGNED PREMIUM CONTACT US SECTION */}
        <section id="contact" className="py-28 bg-[#f9faf7] border-t border-[#e6e4dc] px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs text-[#4e8c4a] font-mono uppercase tracking-widest block font-bold">
                Contact Us
              </span>
              <h2 className="font-display text-3xl font-black text-[#1c3c24] leading-tight">
                Get In Touch With Our Team
              </h2>
              <div className="w-12 h-1 bg-[#4e8c4a] mx-auto mt-3 rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Left Column - Form */}
              <div className="bg-white border border-[#e6e4dc] p-8 rounded-[2rem] shadow-sm">
                <form className="space-y-5" onSubmit={handleContactSubmit}>
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-500 uppercase font-mono font-bold block">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-[#f9faf7] border border-[#e6e4dc] rounded-xl px-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-[#4e8c4a] focus:ring-1 focus:ring-[#4e8c4a]/10 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-500 uppercase font-mono font-bold block">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full bg-[#f9faf7] border border-[#e6e4dc] rounded-xl px-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-[#4e8c4a] focus:ring-1 focus:ring-[#4e8c4a]/10 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-500 uppercase font-mono font-bold block">Inquiry Type</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => handleInquiryTypeChange(e.target.value)}
                      className="w-full bg-[#f9faf7] border border-[#e6e4dc] rounded-xl px-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-[#4e8c4a] transition-all cursor-pointer"
                      required
                    >
                      <option value="">Select Inquiry Type</option>
                      <option value="Request Product Catalogue">Request Product Catalogue</option>
                      <option value="Request Technical PDF / Specifications">Request Technical PDF / Specifications</option>
                      <option value="Request Bulk Spawn Quote">Request Bulk Spawn Quote</option>
                      <option value="Request Cooperative Partnership Info">Request Cooperative Partnership Info</option>
                      <option value="General Cultivation Query">General Cultivation Query</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-500 uppercase font-mono font-bold block">Inquiry Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Inquiry title..."
                      className="w-full bg-[#f9faf7] border border-[#e6e4dc] rounded-xl px-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-[#4e8c4a] focus:ring-1 focus:ring-[#4e8c4a]/10 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] text-gray-500 uppercase font-mono font-bold block">Message Details</label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleMessageChange(e.target.value)}
                      placeholder="Specify spawn capacity needs or strain selections..."
                      className="w-full bg-[#f9faf7] border border-[#e6e4dc] rounded-xl px-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-[#4e8c4a] focus:ring-1 focus:ring-[#4e8c4a]/10 transition-all resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#1c3c24] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#4e8c4a] transition-all shadow-md shadow-[#1c3c24]/5 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ClipboardList className="w-3.5 h-3.5" /> Send Message via WhatsApp
                  </button>
                </form>
              </div>

              {/* Right Column - Map Embed */}
              <div className="rounded-[2rem] overflow-hidden border border-[#e6e4dc] shadow-sm relative min-h-[350px] lg:min-h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3696.8524458312014!2d82.1388031!3d22.1129528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280b2a265691f1%3A0xc3f605a9c9f2b86d!2sKoni%2C%20Bilaspur%2C%20Chhattisgarh%20495009!5e0!3m2!1sen!2sin!4v1783234000000!5m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen={false}
                  loading="lazy"
                ></iframe>
              </div>

            </div>
          </div>
        </section>



      </main>
      <Footer />
    </>
  );
}
