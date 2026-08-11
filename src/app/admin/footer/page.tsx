"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/lib/cms-context";
import { Save, CheckCircle2 } from "lucide-react";

export default function FooterCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [footerForm, setFooterForm] = useState<any>(data?.footer || {});

  useEffect(() => {
    if (data?.footer) {
      setFooterForm(data.footer);
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
    setSaveSuccess(false);

    const success = await updateData({ footer: footerForm });
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Footer CMS Editor</h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Manage Sporonova footer logo, address, contact details, social media handles, and copyright notice.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs text-[#2c5e37] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#4e8c4a]" /> Footer Published!
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Footer
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-5 shadow-sm">
        <div>
          <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
            Company Description
          </label>
          <textarea
            rows={2}
            value={footerForm.description || ""}
            onChange={(e) => setFooterForm({ ...footerForm, description: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-medium"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">
              Address
            </label>
            <input
              type="text"
              value={footerForm.address || ""}
              onChange={(e) => setFooterForm({ ...footerForm, address: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">
              Contact Email
            </label>
            <input
              type="email"
              value={footerForm.email || ""}
              onChange={(e) => setFooterForm({ ...footerForm, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={footerForm.phone || ""}
              onChange={(e) => setFooterForm({ ...footerForm, phone: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
            />
          </div>
        </div>

        <div className="border-t border-[#e2e8e0] pt-4">
          <label className="block text-xs font-semibold text-[#2c5e37] uppercase tracking-wider mb-2">
            Copyright Text
          </label>
          <input
            type="text"
            value={footerForm.copyrightText || ""}
            onChange={(e) => setFooterForm({ ...footerForm, copyrightText: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-mono font-bold"
          />
        </div>
      </div>
    </div>
  );
}
