"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { User, Key, Save, CheckCircle2, Shield } from "lucide-react";

export default function ProfileCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const superAdminUser = data.users.find((u) => u.email === "admin@sporonova.com") || data.users[0];

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPass !== confirmPass) {
      setError("New passwords do not match");
      return;
    }

    if (newPass.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const updatedUsers = data.users.map((u) =>
      u.id === superAdminUser.id ? { ...u, passwordHash: newPass } : u
    );

    await updateData({ users: updatedUsers });
    setSaveSuccess(true);
    setNewPass("");
    setConfirmPass("");
    setCurrentPass("");
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-[#163622]/80 border border-[#2E7D32]/30 p-6 rounded-3xl backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white tracking-tight">Administrator Account Profile</h1>
        <p className="text-xs text-emerald-100/70 mt-1">
          Manage your account credentials, security settings, and password updates.
        </p>
      </div>

      <div className="bg-[#163622]/80 border border-[#2E7D32]/30 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-4 border-b border-white/10 pb-4">
          <div className="w-16 h-16 rounded-2xl bg-[#2E7D32] flex items-center justify-center text-white font-bold text-2xl shadow">
            {superAdminUser.name.charAt(0)}
          </div>
          <div>
            <div className="text-lg font-bold text-white">{superAdminUser.name}</div>
            <div className="text-xs text-emerald-200/70 font-mono">{superAdminUser.email}</div>
            <div className="mt-1 inline-block px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-300 font-bold text-[10px] uppercase">
              {superAdminUser.role}
            </div>
          </div>
        </div>

        {saveSuccess && (
          <div className="p-4 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-2xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Password updated successfully!
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-500/20 border border-red-400/30 text-red-300 rounded-2xl text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-400" /> Change Security Password
          </h2>

          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-black/30 border border-white/15 rounded-xl text-white text-xs"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-[#2E7D32] to-[#1F5E38] hover:from-[#388e3c] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow cursor-pointer"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
