"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { User, Key, Save, CheckCircle2, Shield, Eye, EyeOff } from "lucide-react";

export default function ProfileCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const superAdminUser = data.users.find((u) => u.email === "admin@sporonova.com") || data.users[0];

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    if (newPass !== confirmPass) {
      setError("New passwords do not match");
      setSaving(false);
      return;
    }

    if (newPass.length < 6) {
      setError("Password must be at least 6 characters");
      setSaving(false);
      return;
    }

    const updatedUsers = data.users.map((u) =>
      u.id === superAdminUser.id ? { ...u, passwordHash: newPass } : u
    );

    const success = await updateData({ users: updatedUsers });
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setNewPass("");
      setConfirmPass("");
      setTimeout(() => setSaveSuccess(false), 4000);
    } else {
      setError("Failed to update password. Try again.");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] text-[10px] font-bold uppercase tracking-wider text-[#2c5e37] mb-2 font-mono">
            <User className="w-3.5 h-3.5 text-[#4e8c4a]" /> Profile Security
          </div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Account Credentials Profile</h1>
          <p className="text-xs text-gray-650 mt-1 font-medium">
            Manage your personal security credentials, account status, and password settings.
          </p>
        </div>
      </div>

      {/* Main Content card */}
      <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* User Card */}
        <div className="flex items-center gap-4 border-b border-[#e2e8e0] pb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#1c3c24] flex items-center justify-center text-white font-bold text-2xl shadow-sm uppercase">
            {superAdminUser.name.charAt(0)}
          </div>
          <div>
            <div className="text-lg font-bold text-[#1c3c24]">{superAdminUser.name}</div>
            <div className="text-xs text-[#2c5e37] font-mono font-bold mt-0.5">{superAdminUser.email}</div>
            <div className="mt-2 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] text-[#1c3c24] font-bold text-[9px] uppercase tracking-wider">
              <Shield className="w-3 h-3 text-[#4e8c4a]" /> {superAdminUser.role}
            </div>
          </div>
        </div>

        {/* Notices */}
        {saveSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Password updated successfully!
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-xs font-bold animate-fadeIn">
            {error}
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handleChangePassword} className="space-y-5 max-w-md pt-2">
          <h2 className="text-xs font-mono font-bold text-[#2c5e37] uppercase tracking-wider flex items-center gap-2 border-b border-dashed border-[#e2e8e0] pb-2">
            <Key className="w-4 h-4 text-[#4e8c4a]" /> Change Security Password
          </h2>

          {/* New Password */}
          <div>
            <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPass ? "text" : "password"}
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold outline-none focus:border-[#4e8c4a] transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-[#1c3c24] cursor-pointer"
              >
                {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[10px] font-bold text-[#2c5e37] uppercase tracking-wider mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-2.5 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold outline-none focus:border-[#4e8c4a] transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-[#1c3c24] cursor-pointer"
              >
                {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-[#1c3c24] hover:bg-[#2c5e37] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow cursor-pointer transition-all"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" /> Update Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
