"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms-context";
import ImageUploadDropzone from "@/components/admin/ImageUploadDropzone";
import { SectionStylesConfig } from "@/lib/styles-helper";
import BrandingSectionStylesControls from "@/components/admin/BrandingSectionStylesControls";
import IconPicker from "@/components/admin/IconPicker";
import {
  Save,
  Globe,
  Eye,
  Image as ImageIcon,
  Type,
  Sparkles,
  CheckCircle2,
  Award,
  Building,
  TrendingUp,
  Briefcase,
  Quote,
  Smartphone,
  BookOpen,
  Package,
  Trash2,
  Plus,
  PlusCircle,
} from "lucide-react";

export default function HomepageCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [activeTab, setActiveTab] = useState<
    "hero" | "productsHeader" | "credentials" | "partnerships" | "deliverables" | "industries" | "testimonials"
  >("hero");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [heroForm, setHeroForm] = useState<any>({});
  const [statsForm, setStatsForm] = useState<any[]>([]);
  const [productsHeaderForm, setProductsHeaderForm] = useState<any>({});
  const [credentialsForm, setCredentialsForm] = useState<any[]>([]);
  const [partnershipsForm, setPartnershipsForm] = useState<any[]>([]);
  const [deliverablesForm, setDeliverablesForm] = useState<any[]>([]);
  const [deliverablesStatsForm, setDeliverablesStatsForm] = useState<any[]>([]);
  const [industriesForm, setIndustriesForm] = useState<any[]>([]);

  const [successNumbersForm, setSuccessNumbersForm] = useState<any[]>([]);
  const [testimonialsForm, setTestimonialsForm] = useState<any[]>([]);

  // Style states
  const [heroStyles, setHeroStyles] = useState<SectionStylesConfig>({});
  const [statsStyles, setStatsStyles] = useState<SectionStylesConfig>({});
  const [productsHeaderStyles, setProductsHeaderStyles] = useState<SectionStylesConfig>({});
  const [credentialsStyles, setCredentialsStyles] = useState<SectionStylesConfig>({});
  const [partnershipsStyles, setPartnershipsStyles] = useState<SectionStylesConfig>({});
  const [deliverablesStyles, setDeliverablesStyles] = useState<SectionStylesConfig>({});
  const [industriesStyles, setIndustriesStyles] = useState<SectionStylesConfig>({});
  const [testimonialsStyles, setTestimonialsStyles] = useState<SectionStylesConfig>({});

  useEffect(() => {
    if (data) {
      setHeroForm(data.homepage?.hero || {});
      setStatsForm(
        (data.homepage as any)?.stats || [
          { value: "14+", label: "Mushroom Varieties", sublabel: "Including Shiitake & more", icon: "Leaf" },
          { value: "50%", label: "Higher Yield", sublabel: "Compared to grain spawn", icon: "Award" },
          { value: "3 Months", label: "Shelf Life", sublabel: "At 4°C temperature", icon: "Clock" },
          { value: "100%", label: "Organic & Chemical Free", sublabel: "Pure & safe cultivation", icon: "Shield" },
        ]
      );
      setProductsHeaderForm({
        badge: (data.homepage as any)?.productsSectionBadge || "Product Catalog",
        title: (data.homepage as any)?.productsSectionTitle || "Professional Spawn Categories",
        subtitle: (data.homepage as any)?.productsSectionSubtitle || "Explore our certified spawn selection. Select any category to view technical data sheets, storage values, and application guides.",
      });
      setCredentialsForm(data.credentials || []);
      setPartnershipsForm(
        (data as any).partnerships || [
          { title: "Government of Tripura", points: [] },
          { title: "JICA Foundation", points: [] },
          { title: "Indo-German Foundation", points: [] },
        ]
      );
      setDeliverablesForm(data.deliverables || []);
      setIndustriesForm(data.industries || []);
      setDeliverablesStatsForm(
        (data.homepage as any)?.deliverablesStats || [
          { value: "200+", label: "Farmers Trained Year 1" },
          { value: "50%", label: "Yield Increase per Farmer" },
          { value: "3x", label: "Income Multiplier (Projected)" },
          { value: "14", label: "Mushroom Varieties Available" },
        ]
      );

      setSuccessNumbersForm(
        (data as any).successNumbers || [
          { value: "14+", label: "Mushroom Varieties" },
          { value: "100+ MT", label: "Annual Production" },
          { value: "1000+", label: "Farmers Served" },
          { value: "12+", label: "Years Experience" },
        ]
      );
      setTestimonialsForm(data.testimonials || []);

      setHeroStyles(data.homepage?.hero?.styles || {});
      setStatsStyles((data.homepage as any)?.statsStyles || {});
      setProductsHeaderStyles((data.homepage as any)?.productsHeaderStyles || {});
      setCredentialsStyles((data.homepage as any)?.credentialsStyles || {});
      setPartnershipsStyles((data.homepage as any)?.partnershipsStyles || {});
      setDeliverablesStyles((data.homepage as any)?.deliverablesStyles || {});
      setIndustriesStyles((data.homepage as any)?.industriesStyles || {});
      setTestimonialsStyles((data.homepage as any)?.testimonialsStyles || {});
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // List item addition & deletion helpers
  const handleAddStat = () => {
    setStatsForm([...statsForm, { value: "New Stat", label: "Metric Label", sublabel: "Details Summary", icon: "Leaf" }]);
  };
  const handleDeleteStat = (idx: number) => {
    setStatsForm(statsForm.filter((_, i) => i !== idx));
  };



  const handleAddCredential = () => {
    setCredentialsForm([...credentialsForm, { title: "New Accreditation", status: "Status Description", desc: "Compliance detail summary" }]);
  };
  const handleDeleteCredential = (idx: number) => {
    setCredentialsForm(credentialsForm.filter((_, i) => i !== idx));
  };

  const handleAddPartner = () => {
    setPartnershipsForm([...partnershipsForm, { title: "New Partnering Agency", points: ["Livelihood improvement point"] }]);
  };
  const handleDeletePartner = (idx: number) => {
    setPartnershipsForm(partnershipsForm.filter((_, i) => i !== idx));
  };

  const handleAddDeliverable = () => {
    setDeliverablesForm([...deliverablesForm, { label: "Expected Deliverable Title", desc: "Detailed deliverable scope details" }]);
  };
  const handleDeleteDeliverable = (idx: number) => {
    setDeliverablesForm(deliverablesForm.filter((_, i) => i !== idx));
  };

  const handleAddIndustry = () => {
    setIndustriesForm([...industriesForm, { name: "Ecosystem Sector Name", desc: "Description of spawn deployment" }]);
  };
  const handleDeleteIndustry = (idx: number) => {
    setIndustriesForm(industriesForm.filter((_, i) => i !== idx));
  };



  const handleAddTestimonial = () => {
    setTestimonialsForm([...testimonialsForm, { quote: "Farmer review statement goes here.", author: "Grower Name", role: "Cooperative Leader" }]);
  };
  const handleDeleteTestimonial = (idx: number) => {
    setTestimonialsForm(testimonialsForm.filter((_, i) => i !== idx));
  };

  const handlePublish = async () => {
    // Optimistic instantly-visible save feedback for lightning fast UX
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);

    setSaving(true);

    const updatedData = {
      homepage: {
        ...data.homepage,
        hero: {
          ...heroForm,
          styles: heroStyles,
        },
        stats: statsForm,
        productsSectionBadge: productsHeaderForm.badge,
        productsSectionTitle: productsHeaderForm.title,
        productsSectionSubtitle: productsHeaderForm.subtitle,
        deliverablesStats: deliverablesStatsForm,
        statsStyles,
        productsHeaderStyles,
        credentialsStyles,
        partnershipsStyles,
        deliverablesStyles,
        industriesStyles,
        testimonialsStyles,
      },
      credentials: credentialsForm,
      partnerships: partnershipsForm,
      deliverables: deliverablesForm,
      industries: industriesForm,
      successNumbers: statsForm.map((s: any) => ({ value: s.value, label: s.label })),
      testimonials: testimonialsForm,
    };

    const success = await updateData(updatedData);
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] text-[10px] font-bold uppercase tracking-wider text-[#2c5e37] mb-2 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#4e8c4a]" /> Dynamic Live Customizer
          </div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Homepage Sections Manager</h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Manage every section, metric, text block, and list displayed on the public landing page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> Published Live Successfully!
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Reset ALL homepage sections to current saved state? All unsaved changes will be lost.")) {
                setHeroForm(data.homepage?.hero || {});
                setStatsForm((data.homepage as any)?.stats || []);
                setProductsHeaderForm({
                  badge: (data.homepage as any)?.productsSectionBadge || "Product Catalog",
                  title: (data.homepage as any)?.productsSectionTitle || "Professional Spawn Categories",
                  subtitle: (data.homepage as any)?.productsSectionSubtitle || "",
                });
                setCredentialsForm(data.credentials || []);
                setPartnershipsForm((data as any).partnerships || []);
                setDeliverablesForm(data.deliverables || []);
                setDeliverablesStatsForm((data.homepage as any)?.deliverablesStats || []);
                setIndustriesForm(data.industries || []);
                setTestimonialsForm(data.testimonials || []);
                setSuccessNumbersForm((data as any).successNumbers || []);
                setHeroStyles(data.homepage?.hero?.styles || {});
                setStatsStyles((data.homepage as any)?.statsStyles || {});
                setProductsHeaderStyles((data.homepage as any)?.productsHeaderStyles || {});
                setCredentialsStyles((data.homepage as any)?.credentialsStyles || {});
                setPartnershipsStyles((data.homepage as any)?.partnershipsStyles || {});
                setDeliverablesStyles((data.homepage as any)?.deliverablesStyles || {});
                setIndustriesStyles((data.homepage as any)?.industriesStyles || {});
                setTestimonialsStyles((data.homepage as any)?.testimonialsStyles || {});
              }
            }}
            className="px-5 py-3 border border-[#dce4da] hover:bg-red-50 hover:border-red-200 text-red-700 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer"
          >
            Reset All
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" /> Publish Home Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex flex-wrap border-b border-[#e2e8e0] gap-1">
        {[
          { id: "hero", label: "Hero & Stats" },
          { id: "productsHeader", label: "Product Catalog Header" },
          { id: "credentials", label: "Credentials" },
          { id: "partnerships", label: "Partnerships" },
          { id: "deliverables", label: "Deliverables & Impact" },
          { id: "industries", label: "Ecosystem" },
          { id: "testimonials", label: "Testimonials" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-2xl transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#1c3c24] text-white shadow-sm font-bold"
                : "text-[#2d5034] hover:bg-[#f0f5ef] hover:text-[#1c3c24]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Editor Columns */}
      <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 shadow-sm">
        {/* TAB 1: HERO & STATS */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-3">
              <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2">
                <Type className="w-4 h-4 text-[#4e8c4a]" /> Hero & Main Stats Settings
              </h2>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Revert Hero & Stats changes to current saved state?")) {
                    setHeroForm(data.homepage?.hero || {});
                    setStatsForm((data.homepage as any)?.stats || []);
                    setHeroStyles(data.homepage?.hero?.styles || {});
                    setStatsStyles((data.homepage as any)?.statsStyles || {});
                  }
                }}
                className="px-3 py-1.5 border border-[#dce4da] hover:bg-[#f0f5ef] text-[#2c5e37] text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
              >
                Reset Section
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Top Badge Label</label>
                <input
                  type="text"
                  value={heroForm.badge || ""}
                  onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                  className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">3D Interactive Model</label>
                <label className="flex items-center gap-2 py-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!heroForm.showModel}
                    onChange={(e) => setHeroForm({ ...heroForm, showModel: e.target.checked })}
                    className="w-4 h-4 rounded border-[#dce4da] text-[#1c3c24]"
                  />
                  <span className="text-xs font-bold text-[#1c3c24]">Render 3D model block on Hero right side</span>
                </label>
              </div>
            </div>

            <div>
              <ImageUploadDropzone
                label="Hero Section Photo (Right Side Forest / Mushroom Image)"
                value={heroForm.heroImage || "/hero_mushrooms.jpg"}
                onChange={(url) => setHeroForm({ ...heroForm, heroImage: url })}
                requiredWidth={1920}
                requiredHeight={1080}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Hero Heading Title</label>
              <textarea
                rows={2}
                value={heroForm.headingText || ""}
                onChange={(e) => setHeroForm({ ...heroForm, headingText: e.target.value })}
                className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Hero Subtitle Paragraph</label>
              <textarea
                rows={3}
                value={heroForm.subtitleText || ""}
                onChange={(e) => setHeroForm({ ...heroForm, subtitleText: e.target.value })}
                className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Primary Button Text</label>
                <input
                  type="text"
                  value={heroForm.ctaPrimaryText || ""}
                  onChange={(e) => setHeroForm({ ...heroForm, ctaPrimaryText: e.target.value })}
                  className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Secondary Button Text</label>
                <input
                  type="text"
                  value={heroForm.ctaSecondaryText || ""}
                  onChange={(e) => setHeroForm({ ...heroForm, ctaSecondaryText: e.target.value })}
                  className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                />
              </div>
            </div>

            <div className="border-t border-[#e2e8e0] pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#1c3c24] uppercase tracking-wider">Hero Core Stats</h3>
                <button
                  type="button"
                  onClick={handleAddStat}
                  className="px-3 py-1.5 bg-[#1c3c24] hover:bg-[#4e8c4a] text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Add Stat
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {statsForm.map((stat, idx) => (
                  <div key={idx} className="border border-[#e2e8e0] p-4 rounded-2xl bg-[#f9fbf8] space-y-3">
                    <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-2">
                      <span className="text-[10px] text-gray-500 font-mono font-bold">Stat Card #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteStat(idx)}
                        className="text-red-500 hover:text-red-750 transition-colors p-1"
                        title="Delete Stat"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[9px] font-bold text-[#2c5e37]">Metric Value</label>
                        <input
                          type="text"
                          value={stat.value || ""}
                          onChange={(e) => {
                            const updated = [...statsForm];
                            updated[idx].value = e.target.value;
                            setStatsForm(updated);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-bold text-[#1c3c24]"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-[#2c5e37]">Heading Label</label>
                        <input
                          type="text"
                          value={stat.label || ""}
                          onChange={(e) => {
                            const updated = [...statsForm];
                            updated[idx].label = e.target.value;
                            setStatsForm(updated);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-bold text-[#1c3c24]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[9px] font-bold text-[#2c5e37]">Subtitle Details</label>
                        <input
                          type="text"
                          value={stat.sublabel || ""}
                          onChange={(e) => {
                            const updated = [...statsForm];
                            updated[idx].sublabel = e.target.value;
                            setStatsForm(updated);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-medium text-gray-600"
                        />
                      </div>
                      <IconPicker
                        value={stat.icon || "Leaf"}
                        onChange={(iconName) => {
                          const updated = [...statsForm];
                          updated[idx].icon = iconName;
                          setStatsForm(updated);
                        }}
                        label="Card Icon"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <BrandingSectionStylesControls
              sectionName="Hero Main Area"
              styles={heroStyles}
              onChange={setHeroStyles}
            />

            <BrandingSectionStylesControls
              sectionName="Hero Stats Bar"
              styles={statsStyles}
              onChange={setStatsStyles}
            />
          </div>
        )}


        {activeTab === "productsHeader" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-3">
              <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2">
                <Package className="w-4 h-4 text-[#4e8c4a]" /> Product Catalog Header Settings
              </h2>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Revert Product Catalog Header changes to current saved state?")) {
                    setProductsHeaderForm({
                      badge: (data.homepage as any)?.productsSectionBadge || "Product Catalog",
                      title: (data.homepage as any)?.productsSectionTitle || "Professional Spawn Categories",
                      subtitle: (data.homepage as any)?.productsSectionSubtitle || "Explore our certified spawn selection.",
                    });
                    setProductsHeaderStyles((data.homepage as any)?.productsHeaderStyles || {});
                  }
                }}
                className="px-3 py-1.5 border border-[#dce4da] hover:bg-[#f0f5ef] text-[#2c5e37] text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
              >
                Reset Section
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Section Badge</label>
                <input
                  type="text"
                  value={productsHeaderForm.badge || ""}
                  onChange={(e) => setProductsHeaderForm({ ...productsHeaderForm, badge: e.target.value })}
                  className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Section Title</label>
                <input
                  type="text"
                  value={productsHeaderForm.title || ""}
                  onChange={(e) => setProductsHeaderForm({ ...productsHeaderForm, title: e.target.value })}
                  className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Section Subtitle / Description</label>
              <textarea
                rows={2}
                value={productsHeaderForm.subtitle || ""}
                onChange={(e) => setProductsHeaderForm({ ...productsHeaderForm, subtitle: e.target.value })}
                className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
              />
            </div>

            <BrandingSectionStylesControls
              sectionName="Products Section Header"
              styles={productsHeaderStyles}
              onChange={setProductsHeaderStyles}
            />
          </div>
        )}



        {/* TAB 4: CREDENTIALS */}
        {activeTab === "credentials" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#4e8c4a]" />
                <h2 className="text-base font-bold text-[#1c3c24]">Our Credentials & Certifications Settings</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Revert Credentials changes to current saved state?")) {
                      setCredentialsForm(data.credentials || []);
                      setCredentialsStyles((data.homepage as any)?.credentialsStyles || {});
                    }
                  }}
                  className="px-3 py-1.5 border border-[#dce4da] hover:bg-[#f0f5ef] text-[#2c5e37] text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Reset Section
                </button>
                <button
                  type="button"
                  onClick={handleAddCredential}
                  className="px-3 py-1.5 bg-[#1c3c24] hover:bg-[#4e8c4a] text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Add Credential
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {credentialsForm.map((item, idx) => (
                <div key={idx} className="border border-[#e2e8e0] p-4 rounded-2xl bg-[#f9fbf8] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-2">
                    <span className="text-[10px] text-gray-500 font-mono font-bold">Credential Card #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteCredential(idx)}
                      className="text-red-500 hover:text-red-750 transition-colors p-1"
                      title="Delete Credential"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-bold text-[#2c5e37]">Credential Title</label>
                      <input
                        type="text"
                        value={item.title || ""}
                        onChange={(e) => {
                          const updated = [...credentialsForm];
                          updated[idx].title = e.target.value;
                          setCredentialsForm(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-bold text-[#1c3c24]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#2c5e37]">Accreditation Status</label>
                      <input
                        type="text"
                        value={item.status || ""}
                        onChange={(e) => {
                          const updated = [...credentialsForm];
                          updated[idx].status = e.target.value;
                          setCredentialsForm(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-bold text-[#1c3c24]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-bold text-[#2c5e37]">Details Summary</label>
                      <textarea
                        rows={2}
                        value={item.desc || ""}
                        onChange={(e) => {
                          const updated = [...credentialsForm];
                          updated[idx].desc = e.target.value;
                          setCredentialsForm(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-medium text-gray-600"
                      />
                    </div>
                    <IconPicker
                      value={item.icon || "ShieldCheck"}
                      onChange={(iconName) => {
                        const updated = [...credentialsForm];
                        updated[idx].icon = iconName;
                        setCredentialsForm(updated);
                      }}
                      label="Select Icon"
                    />
                  </div>
                </div>
              ))}
            </div>

            <BrandingSectionStylesControls
              sectionName="Credentials Section"
              styles={credentialsStyles}
              onChange={setCredentialsStyles}
            />
          </div>
        )}

        {/* TAB 5: PARTNERSHIPS */}
        {activeTab === "partnerships" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-3">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#4e8c4a]" />
                <h2 className="text-base font-bold text-[#1c3c24]">Partnership Value Propositions</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Revert Partnerships changes to current saved state?")) {
                      setPartnershipsForm(
                        (data as any).partnerships || [
                          { title: "Government of Tripura", points: [] },
                          { title: "JICA Foundation", points: [] },
                          { title: "Indo-German Foundation", points: [] },
                        ]
                      );
                      setPartnershipsStyles((data.homepage as any)?.partnershipsStyles || {});
                    }
                  }}
                  className="px-3 py-1.5 border border-[#dce4da] hover:bg-[#f0f5ef] text-[#2c5e37] text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Reset Section
                </button>
                <button
                  type="button"
                  onClick={handleAddPartner}
                  className="px-3 py-1.5 bg-[#1c3c24] hover:bg-[#4e8c4a] text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Add Partner
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {partnershipsForm.map((partner, idx) => (
                <div key={idx} className="border border-[#e2e8e0] p-5 rounded-2xl bg-[#f9fbf8] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1c3c24] uppercase tracking-wider">Partner Agency #{idx + 1}</span>
                      <input
                        type="text"
                        value={partner.title || ""}
                        onChange={(e) => {
                          const updated = [...partnershipsForm];
                          updated[idx].title = e.target.value;
                          setPartnershipsForm(updated);
                        }}
                        className="px-3 py-1 bg-white border border-[#dce4da] rounded-xl text-xs font-bold text-[#1c3c24] w-64"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeletePartner(idx)}
                      className="text-red-500 hover:text-red-750 transition-colors p-1"
                      title="Delete Partner"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[9px] font-bold text-[#2c5e37] uppercase">Value Program Points (One per line)</label>
                    <textarea
                      rows={5}
                      value={partner.points ? partner.points.join("\n") : ""}
                      onChange={(e) => {
                        const updated = [...partnershipsForm];
                        updated[idx].points = e.target.value.split("\n");
                        setPartnershipsForm(updated);
                      }}
                      className="w-full px-4 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium leading-relaxed"
                      placeholder="Enter value proposition points (each on a new line)..."
                    />
                  </div>
                </div>
              ))}
            </div>

            <BrandingSectionStylesControls
              sectionName="Partnerships Section"
              styles={partnershipsStyles}
              onChange={setPartnershipsStyles}
            />
          </div>
        )}

        {/* TAB 6: DELIVERABLES & IMPACT */}
        {activeTab === "deliverables" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#4e8c4a]" />
                <h2 className="text-base font-bold text-[#1c3c24]">Expected Program Deliverables & Impact</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Revert Deliverables & Impact changes to current saved state?")) {
                      setDeliverablesForm(data.deliverables || []);
                      setDeliverablesStatsForm(
                        (data.homepage as any)?.deliverablesStats || [
                          { value: "200+", label: "Farmers Trained Year 1" },
                          { value: "50%", label: "Yield Increase per Farmer" },
                          { value: "3x", label: "Income Multiplier (Projected)" },
                          { value: "14", label: "Mushroom Varieties Available" },
                        ]
                      );
                      setDeliverablesStyles((data.homepage as any)?.deliverablesStyles || {});
                    }
                  }}
                  className="px-3 py-1.5 border border-[#dce4da] hover:bg-[#f0f5ef] text-[#2c5e37] text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Reset Section
                </button>
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="px-3 py-1.5 bg-[#1c3c24] hover:bg-[#4e8c4a] text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Add Deliverable
                </button>
              </div>
            </div>

            {/* Expected Impact Stats Section */}
            <div className="border border-[#e2e8e0] p-5 rounded-3xl bg-[#f9fbf8]/50 space-y-4">
              <h3 className="text-xs font-bold text-[#1c3c24] uppercase tracking-wider">Expected Impact Counters (4 Stats)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {deliverablesStatsForm.map((stat, idx) => (
                  <div key={idx} className="border border-[#e2e8e0] p-4 rounded-xl bg-white space-y-2">
                    <span className="text-[10px] text-gray-500 font-mono font-bold">Stat #{idx + 1}</span>
                    <div>
                      <label className="block text-[9px] font-bold text-[#2c5e37]">Metric Value</label>
                      <input
                        type="text"
                        value={stat.value || ""}
                        onChange={(e) => {
                          const updated = [...deliverablesStatsForm];
                          updated[idx].value = e.target.value;
                          setDeliverablesStatsForm(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-bold text-[#1c3c24]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#2c5e37]">Stat Label</label>
                      <input
                        type="text"
                        value={stat.label || ""}
                        onChange={(e) => {
                          const updated = [...deliverablesStatsForm];
                          updated[idx].label = e.target.value;
                          setDeliverablesStatsForm(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-bold text-[#1c3c24]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables List Section */}
            <div className="border-t border-[#e2e8e0] pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#1c3c24] uppercase tracking-wider">Key Programme Deliverables</h3>
              </div>
              <div className="space-y-4">
                {deliverablesForm.map((item, idx) => (
                  <div key={idx} className="border border-[#e2e8e0] p-4 rounded-2xl bg-[#f9fbf8] flex items-center gap-4 justify-between">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-[#2c5e37]">Label Heading</label>
                        <input
                          type="text"
                          value={item.label || ""}
                          onChange={(e) => {
                            const updated = [...deliverablesForm];
                            updated[idx].label = e.target.value;
                            setDeliverablesForm(updated);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-bold text-[#1c3c24]"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-[#2c5e37]">Detailed Deliverable Scope</label>
                        <input
                          type="text"
                          value={item.desc || ""}
                          onChange={(e) => {
                            const updated = [...deliverablesForm];
                            updated[idx].desc = e.target.value;
                            setDeliverablesForm(updated);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-medium text-gray-600"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteDeliverable(idx)}
                      className="text-red-500 hover:text-red-750 transition-colors p-1"
                      title="Delete Deliverable"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <BrandingSectionStylesControls
              sectionName="Deliverables Section"
              styles={deliverablesStyles}
              onChange={setDeliverablesStyles}
            />
          </div>
        )}
        {/* TAB 7: ECOSYSTEM */}
        {activeTab === "industries" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#4e8c4a]" />
                <h2 className="text-base font-bold text-[#1c3c24]">Ecosystem Integration (Industries We Serve)</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Revert Ecosystem changes to current saved state?")) {
                      setIndustriesForm(data.industries || []);
                      setIndustriesStyles((data.homepage as any)?.industriesStyles || {});
                    }
                  }}
                  className="px-3 py-1.5 border border-[#dce4da] hover:bg-[#f0f5ef] text-[#2c5e37] text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Reset Section
                </button>
                <button
                  type="button"
                  onClick={handleAddIndustry}
                  className="px-3 py-1.5 bg-[#1c3c24] hover:bg-[#4e8c4a] text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Add Sector
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {industriesForm.map((item, idx) => (
                <div key={idx} className="border border-[#e2e8e0] p-4 rounded-2xl bg-[#f9fbf8] space-y-2">
                  <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-2">
                    <span className="text-[10px] text-gray-500 font-mono font-bold">Industry Column #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteIndustry(idx)}
                      className="text-red-500 hover:text-red-750 transition-colors p-1"
                      title="Delete Sector"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-[#2c5e37]">Industry Name</label>
                    <input
                      type="text"
                      value={item.name || ""}
                      onChange={(e) => {
                        const updated = [...industriesForm];
                        updated[idx].name = e.target.value;
                        setIndustriesForm(updated);
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-bold text-[#1c3c24]"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-[#2c5e37]">Integration Description</label>
                    <textarea
                      rows={2}
                      value={item.desc || ""}
                      onChange={(e) => {
                        const updated = [...industriesForm];
                        updated[idx].desc = e.target.value;
                        setIndustriesForm(updated);
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-medium text-gray-600"
                    />
                  </div>
                </div>
              ))}
            </div>

            <BrandingSectionStylesControls
              sectionName="Ecosystem Section"
              styles={industriesStyles}
              onChange={setIndustriesStyles}
            />
          </div>
        )}

        {/* TAB 9: TESTIMONIALS */}
        {activeTab === "testimonials" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-3">
              <div className="flex items-center gap-2">
                <Quote className="w-4 h-4 text-[#4e8c4a]" />
                <h2 className="text-base font-bold text-[#1c3c24]">Grower Testimonials & Feedback</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Revert Testimonials changes to current saved state?")) {
                      setTestimonialsForm(data.testimonials || []);
                      setTestimonialsStyles((data.homepage as any)?.testimonialsStyles || {});
                    }
                  }}
                  className="px-3 py-1.5 border border-[#dce4da] hover:bg-[#f0f5ef] text-[#2c5e37] text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Reset Section
                </button>
                <button
                  type="button"
                  onClick={handleAddTestimonial}
                  className="px-3 py-1.5 bg-[#1c3c24] hover:bg-[#4e8c4a] text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Add Testimonial
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {testimonialsForm.map((item, idx) => (
                <div key={idx} className="border border-[#e2e8e0] p-4 rounded-2xl bg-[#f9fbf8] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-2">
                    <span className="text-[10px] text-gray-500 font-mono font-bold">Testimonial Quote #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteTestimonial(idx)}
                      className="text-red-500 hover:text-red-750 transition-colors p-1"
                      title="Delete Testimonial"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold text-[#2c5e37]">Author Name</label>
                      <input
                        type="text"
                        value={item.author || ""}
                        onChange={(e) => {
                          const updated = [...testimonialsForm];
                          updated[idx].author = e.target.value;
                          setTestimonialsForm(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-bold text-[#1c3c24]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#2c5e37]">Title / Position / Role</label>
                      <input
                        type="text"
                        value={item.role || ""}
                        onChange={(e) => {
                          const updated = [...testimonialsForm];
                          updated[idx].role = e.target.value;
                          setTestimonialsForm(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-bold text-[#1c3c24]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-[#2c5e37]">Quote Paragraph</label>
                    <textarea
                      rows={3}
                      value={item.quote || ""}
                      onChange={(e) => {
                        const updated = [...testimonialsForm];
                        updated[idx].quote = e.target.value;
                        setTestimonialsForm(updated);
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-medium text-gray-650 leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>

            <BrandingSectionStylesControls
              sectionName="Testimonials Section"
              styles={testimonialsStyles}
              onChange={setTestimonialsStyles}
            />
          </div>
        )}
      </div>
    </div>
  );
}
