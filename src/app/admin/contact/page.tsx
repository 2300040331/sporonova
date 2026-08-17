"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms-context";
import { Save, CheckCircle2, Mail, Info, MapPin, Phone, MessageSquare } from "lucide-react";
import BrandingSectionStylesControls from "@/components/admin/BrandingSectionStylesControls";

export default function ContactCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [contactForm, setContactForm] = useState<any>({
    badge: "",
    title: "",
    subtitle: "",
    getInTouchTitle: "",
    getInTouchParagraph: "",
    phone: "",
    address: "",
    email: "",
    footerTag: "",
    whatsappNumber: "",
    mapIframeUrl: "",
    styles: {},
  });

  useEffect(() => {
    if (data?.contact) {
      setContactForm({
        badge: data.contact.badge || "",
        title: data.contact.title || "",
        subtitle: data.contact.subtitle || "",
        getInTouchTitle: data.contact.getInTouchTitle || "",
        getInTouchParagraph: data.contact.getInTouchParagraph || "",
        phone: data.contact.phone || "",
        address: data.contact.address || "",
        email: data.contact.email || "",
        footerTag: data.contact.footerTag || "",
        whatsappNumber: data.contact.whatsappNumber || "",
        mapIframeUrl: data.contact.mapIframeUrl || "",
        styles: data.contact.styles || {},
      });
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    const success = await updateData({ contact: contactForm });
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] text-[10px] font-bold uppercase tracking-wider text-[#2c5e37] mb-2 font-mono">
            <Mail className="w-3.5 h-3.5 text-[#4e8c4a]" /> Contact Configuration
          </div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Contact Page CMS Editor</h1>
          <p className="text-xs text-gray-650 mt-1 font-medium">
            Manage titles, support numbers, addresses, emails, and Map configurations displayed on the public Contact Us page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> Contact Page Saved Live!
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Revert Contact Page changes to current saved state?")) {
                if (data?.contact) {
                  setContactForm({
                    badge: data.contact.badge || "",
                    title: data.contact.title || "",
                    subtitle: data.contact.subtitle || "",
                    getInTouchTitle: data.contact.getInTouchTitle || "",
                    getInTouchParagraph: data.contact.getInTouchParagraph || "",
                    phone: data.contact.phone || "",
                    address: data.contact.address || "",
                    email: data.contact.email || "",
                    footerTag: data.contact.footerTag || "",
                    whatsappNumber: data.contact.whatsappNumber || "",
                    mapIframeUrl: data.contact.mapIframeUrl || "",
                    styles: data.contact.styles || {},
                  });
                }
              }
            }}
            className="px-5 py-3 border border-[#dce4da] hover:bg-[#f0f5ef] text-[#2c5e37] font-bold text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer font-sans"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Contact Details
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 border-b border-[#e2e8e0] pb-3">
          <Info className="w-4 h-4 text-[#4e8c4a]" /> Main Header Content
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
              Badge / Subtitle Tag
            </label>
            <input
              type="text"
              value={contactForm.badge}
              onChange={(e) => setContactForm({ ...contactForm, badge: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
              placeholder="SporoNova Contact & Technical Center"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
              Page Main Title
            </label>
            <input
              type="text"
              value={contactForm.title}
              onChange={(e) => setContactForm({ ...contactForm, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
              placeholder="Get In Touch With Our Team"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
            Section Subtitle
          </label>
          <textarea
            rows={2}
            value={contactForm.subtitle}
            onChange={(e) => setContactForm({ ...contactForm, subtitle: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
            placeholder="Description text below the header..."
          />
        </div>

        <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 border-b border-[#e2e8e0] pb-3 pt-4">
          <MessageSquare className="w-4 h-4 text-[#4e8c4a]" /> Get In Touch Box Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
              Box Header Title
            </label>
            <input
              type="text"
              value={contactForm.getInTouchTitle}
              onChange={(e) => setContactForm({ ...contactForm, getInTouchTitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
              Footer / Accreditation Tag
            </label>
            <input
              type="text"
              value={contactForm.footerTag}
              onChange={(e) => setContactForm({ ...contactForm, footerTag: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
              placeholder="ISO & GMP ACCREDITED FACILITY"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
            Box Description Text
          </label>
          <textarea
            rows={2}
            value={contactForm.getInTouchParagraph}
            onChange={(e) => setContactForm({ ...contactForm, getInTouchParagraph: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
          />
        </div>

        <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 border-b border-[#e2e8e0] pb-3 pt-4">
          <Phone className="w-4 h-4 text-[#4e8c4a]" /> Direct Contact Support Channels
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
              Phone Number (Display)
            </label>
            <input
              type="text"
              value={contactForm.phone}
              onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
              placeholder="+91 7207208419"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
              WhatsApp Integration Number
            </label>
            <input
              type="text"
              value={contactForm.whatsappNumber}
              onChange={(e) => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
              placeholder="e.g. 917207208419 (No spaces or +)"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
              Support Email Address
            </label>
            <input
              type="email"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
              placeholder="sales@sporonova.com"
            />
          </div>
        </div>

        <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2 border-b border-[#e2e8e0] pb-3 pt-4">
          <MapPin className="w-4 h-4 text-[#4e8c4a]" /> Location & Map Settings
        </h2>

        <div>
          <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
            Physical Lab Address (Display)
          </label>
          <input
            type="text"
            value={contactForm.address}
            onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold"
            placeholder="Koni, Bilaspur, Chhattisgarh 495009"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
            Google Maps Iframe Embed Link (src attribute)
          </label>
          <textarea
            rows={3}
            value={contactForm.mapIframeUrl}
            onChange={(e) => setContactForm({ ...contactForm, mapIframeUrl: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
            placeholder="https://www.google.com/maps/embed..."
          />
        </div>
        
        <BrandingSectionStylesControls
          sectionName="Contact Details Section"
          styles={contactForm.styles}
          onChange={(newStyles) => setContactForm({ ...contactForm, styles: newStyles })}
        />
      </div>
    </div>
  );
}
