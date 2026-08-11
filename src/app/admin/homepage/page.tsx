"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms-context";
import {
  Save,
  Globe,
  Eye,
  Image as ImageIcon,
  Type,
  Sparkles,
  CheckCircle2,
  List,
  Award,
  Building,
  TrendingUp,
  Briefcase,
  Quote,
  ShieldCheck,
  Smartphone,
  BookOpen,
  Info,
} from "lucide-react";

export default function HomepageCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [activeTab, setActiveTab] = useState<
    "hero" | "about" | "values" | "credentials" | "partnerships" | "deliverables" | "industries" | "testimonials"
  >("hero");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [heroForm, setHeroForm] = useState<any>({});
  const [statsForm, setStatsForm] = useState<any[]>([]);
  const [aboutForm, setAboutForm] = useState<any>({});
  const [valuesForm, setValuesForm] = useState<any>({});
  const [whyChooseUsCardsForm, setWhyChooseUsCardsForm] = useState<any[]>([]);
  const [credentialsForm, setCredentialsForm] = useState<any[]>([]);
  const [partnershipsForm, setPartnershipsForm] = useState<any[]>([]);
  const [deliverablesForm, setDeliverablesForm] = useState<any[]>([]);
  const [industriesForm, setIndustriesForm] = useState<any[]>([]);
  const [successNumbersForm, setSuccessNumbersForm] = useState<any[]>([]);
  const [testimonialsForm, setTestimonialsForm] = useState<any[]>([]);

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
      setAboutForm(data.about || {});
      setValuesForm({
        badge: (data.homepage as any)?.valuesSectionBadge || "Quality Assurance Protocols",
        title: data.homepage?.valuesSectionTitle || "Why Growers Choose SporoNova",
        subtitle: (data.homepage as any)?.valuesSectionSubtitle || "Our standard manufacturing protocols solve major cultivation hazards, ensuring optimal biological efficiency and reproducible harvest yields.",
      });
      setWhyChooseUsCardsForm(data.whyChooseUsCards || []);
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
      setSuccessNumbersForm(
        (data as any).successNumbers || [
          { value: "14+", label: "Mushroom Varieties" },
          { value: "100+ MT", label: "Annual Production" },
          { value: "1000+", label: "Farmers Served" },
          { value: "12+", label: "Years Experience" },
        ]
      );
      setTestimonialsForm(data.testimonials || []);
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handlePublish = async () => {
    setSaving(true);
    setSaveSuccess(false);

    const updatedData = {
      homepage: {
        ...data.homepage,
        hero: heroForm,
        stats: statsForm,
        valuesSectionBadge: valuesForm.badge,
        valuesSectionTitle: valuesForm.title,
        valuesSectionSubtitle: valuesForm.subtitle,
      },
      about: aboutForm,
      whyChooseUsCards: whyChooseUsCardsForm,
      credentials: credentialsForm,
      partnerships: partnershipsForm,
      deliverables: deliverablesForm,
      industries: industriesForm,
      successNumbers: successNumbersForm,
      testimonials: testimonialsForm,
    };

    const success = await updateData(updatedData);
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
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
          { id: "about", label: "About & Stats" },
          { id: "values", label: "Why Choose Us" },
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
            <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 border-b border-[#e2e8e0] pb-3">
              <Type className="w-4 h-4 text-[#4e8c4a]" /> Hero & Main Stats Settings
            </h2>

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
              <h3 className="text-xs font-bold text-[#1c3c24] uppercase tracking-wider">Hero 4 Core Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {statsForm.map((stat, idx) => (
                  <div key={idx} className="border border-[#e2e8e0] p-4 rounded-2xl bg-[#f9fbf8] space-y-3">
                    <span className="text-[10px] text-gray-500 font-mono font-bold">Stat Card #{idx + 1}</span>
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ABOUT SECTION */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 border-b border-[#e2e8e0] pb-3">
              <Info className="w-4 h-4 text-[#4e8c4a]" /> About Bio-Lab & Cleanroom Section
            </h2>

            <div>
              <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">About Hero Subheading</label>
              <input
                type="text"
                value={aboutForm.heroSubtitle || ""}
                onChange={(e) => setAboutForm({ ...aboutForm, heroSubtitle: e.target.value })}
                className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">About Main Title Text</label>
              <input
                type="text"
                value={aboutForm.heroTitle || ""}
                onChange={(e) => setAboutForm({ ...aboutForm, heroTitle: e.target.value, whoWeAreTitle: e.target.value })}
                className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Company Paragraph 1 (Introduction)</label>
              <textarea
                rows={3}
                value={aboutForm.whoWeAreParagraph1 || ""}
                onChange={(e) => setAboutForm({ ...aboutForm, whoWeAreParagraph1: e.target.value })}
                className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Company Paragraph 2 (Cleanroom Standard)</label>
              <textarea
                rows={3}
                value={aboutForm.whoWeAreParagraph2 || ""}
                onChange={(e) => setAboutForm({ ...aboutForm, whoWeAreParagraph2: e.target.value })}
                className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
              />
            </div>

            <div className="border-t border-[#e2e8e0] pt-6 space-y-4">
              <h3 className="text-xs font-bold text-[#1c3c24] uppercase tracking-wider">Achievements Counters (Success Numbers Row)</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {successNumbersForm.map((item, idx) => (
                  <div key={idx} className="border border-[#e2e8e0] p-4 rounded-xl bg-[#f9fbf8] space-y-2">
                    <span className="text-[10px] text-gray-500 font-mono font-bold">Counter #{idx + 1}</span>
                    <div>
                      <label className="block text-[9px] font-bold text-[#2c5e37]">Metric Value</label>
                      <input
                        type="text"
                        value={item.value || ""}
                        onChange={(e) => {
                          const updated = [...successNumbersForm];
                          updated[idx].value = e.target.value;
                          setSuccessNumbersForm(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-bold text-[#1c3c24]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#2c5e37]">Metric Label</label>
                      <input
                        type="text"
                        value={item.label || ""}
                        onChange={(e) => {
                          const updated = [...successNumbersForm];
                          updated[idx].label = e.target.value;
                          setSuccessNumbersForm(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-bold text-[#1c3c24]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: QUALITY STANDARDS */}
        {activeTab === "values" && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 border-b border-[#e2e8e0] pb-3">
              <ShieldCheck className="w-4 h-4 text-[#4e8c4a]" /> Quality Assurance Protocols Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Section Badge</label>
                <input
                  type="text"
                  value={valuesForm.badge || ""}
                  onChange={(e) => setValuesForm({ ...valuesForm, badge: e.target.value })}
                  className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Section Title</label>
                <input
                  type="text"
                  value={valuesForm.title || ""}
                  onChange={(e) => setValuesForm({ ...valuesForm, title: e.target.value })}
                  className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">Section Subtitle / Description</label>
              <textarea
                rows={2}
                value={valuesForm.subtitle || ""}
                onChange={(e) => setValuesForm({ ...valuesForm, subtitle: e.target.value })}
                className="w-full px-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
              />
            </div>

            <div className="border-t border-[#e2e8e0] pt-6 space-y-4">
              <h3 className="text-xs font-bold text-[#1c3c24] uppercase tracking-wider">Protocol Feature Cards (8 items)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {whyChooseUsCardsForm.map((card, idx) => (
                  <div key={card.id || idx} className="border border-[#e2e8e0] p-4 rounded-2xl bg-[#f9fbf8] space-y-3">
                    <span className="text-[10px] text-gray-500 font-mono font-bold">Protocol Card #{idx + 1}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[9px] font-bold text-[#2c5e37]">Header Title</label>
                        <input
                          type="text"
                          value={card.title || ""}
                          onChange={(e) => {
                            const updated = [...whyChooseUsCardsForm];
                            updated[idx].title = e.target.value;
                            setWhyChooseUsCardsForm(updated);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-bold text-[#1c3c24]"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-[#2c5e37]">Highlight Tag</label>
                        <input
                          type="text"
                          value={card.highlight || ""}
                          onChange={(e) => {
                            const updated = [...whyChooseUsCardsForm];
                            updated[idx].highlight = e.target.value;
                            setWhyChooseUsCardsForm(updated);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-bold text-[#1c3c24]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#2c5e37]">Description</label>
                      <textarea
                        rows={2}
                        value={card.description || ""}
                        onChange={(e) => {
                          const updated = [...whyChooseUsCardsForm];
                          updated[idx].description = e.target.value;
                          setWhyChooseUsCardsForm(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-[#dce4da] rounded-xl text-xs font-medium text-gray-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CREDENTIALS */}
        {activeTab === "credentials" && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 border-b border-[#e2e8e0] pb-3">
              <Award className="w-4 h-4 text-[#4e8c4a]" /> Our Credentials & Certifications Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {credentialsForm.map((item, idx) => (
                <div key={idx} className="border border-[#e2e8e0] p-4 rounded-2xl bg-[#f9fbf8] space-y-3">
                  <span className="text-[10px] text-gray-500 font-mono font-bold">Credential Card #{idx + 1}</span>
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PARTNERSHIPS */}
        {activeTab === "partnerships" && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 border-b border-[#e2e8e0] pb-3">
              <Building className="w-4 h-4 text-[#4e8c4a]" /> Partnership Value Propositions
            </h2>

            <div className="space-y-6">
              {partnershipsForm.map((partner, idx) => (
                <div key={idx} className="border border-[#e2e8e0] p-5 rounded-2xl bg-[#f9fbf8] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-2">
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

                  <div className="space-y-2">
                    <label className="block text-[9px] font-bold text-[#2c5e37] uppercase">Value Program Points (One per line)</label>
                    <textarea
                      rows={5}
                      value={partner.points ? partner.points.join("\n") : ""}
                      onChange={(e) => {
                        const updated = [...partnershipsForm];
                        updated[idx].points = e.target.value.split("\n").filter((p) => p.trim() !== "");
                        setPartnershipsForm(updated);
                      }}
                      className="w-full px-4 py-2 bg-white border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium leading-relaxed"
                      placeholder="Enter value proposition points (each on a new line)..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: DELIVERABLES & IMPACT */}
        {activeTab === "deliverables" && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 border-b border-[#e2e8e0] pb-3">
              <TrendingUp className="w-4 h-4 text-[#4e8c4a]" /> Expected Program Deliverables & Impact
            </h2>

            <div className="space-y-4">
              {deliverablesForm.map((item, idx) => (
                <div key={idx} className="border border-[#e2e8e0] p-4 rounded-2xl bg-[#f9fbf8] grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] text-gray-500 font-mono font-bold">Deliverable 0{idx + 1}</span>
                  </div>
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
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: ECOSYSTEM */}
        {activeTab === "industries" && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 border-b border-[#e2e8e0] pb-3">
              <Briefcase className="w-4 h-4 text-[#4e8c4a]" /> Ecosystem Integration (Industries We Serve)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {industriesForm.map((item, idx) => (
                <div key={idx} className="border border-[#e2e8e0] p-4 rounded-2xl bg-[#f9fbf8] space-y-2">
                  <span className="text-[10px] text-gray-500 font-mono font-bold">Industry Column #{idx + 1}</span>
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
          </div>
        )}

        {/* TAB 8: TESTIMONIALS */}
        {activeTab === "testimonials" && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 border-b border-[#e2e8e0] pb-3">
              <Quote className="w-4 h-4 text-[#4e8c4a]" /> Grower Testimonials & Feedback
            </h2>

            <div className="space-y-4">
              {testimonialsForm.map((item, idx) => (
                <div key={idx} className="border border-[#e2e8e0] p-4 rounded-2xl bg-[#f9fbf8] space-y-3">
                  <span className="text-[10px] text-gray-500 font-mono font-bold">Testimonial Quote #{idx + 1}</span>
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
          </div>
        )}
      </div>
    </div>
  );
}
