"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { Database, Download, RefreshCw, ShieldCheck, CheckCircle2, Upload } from "lucide-react";

export default function BackupsCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [creating, setCreating] = useState(false);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleDownloadSnapshot = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sporonova_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCreateBackupPoint = async () => {
    setCreating(true);
    const newBackup = {
      id: `bak-${Date.now()}`,
      filename: `sporonova_backup_${new Date().toISOString().split("T")[0]}_manual.json`,
      createdAt: new Date().toISOString(),
      size: `${(JSON.stringify(data).length / 1024 / 1024).toFixed(2)} MB`,
      type: "Manual Snapshot",
    };

    const updated = [newBackup, ...data.backups];
    await updateData({ backups: updated });
    setCreating(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#163622]/80 border border-[#2E7D32]/30 p-6 rounded-3xl backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Database & Media Backup Engine</h1>
          <p className="text-xs text-emerald-100/70 mt-1">
            Create automated or manual database snapshots, download backup packages, and perform point-in-time restores.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadSnapshot}
            className="flex items-center gap-2 px-5 py-3 bg-[#1F5E38] border border-emerald-400/40 hover:bg-[#2E7D32] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download JSON Backup
          </button>
          <button
            onClick={handleCreateBackupPoint}
            disabled={creating}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#2E7D32] to-[#1F5E38] hover:from-[#388e3c] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow cursor-pointer"
          >
            {creating ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" /> Create Snapshot
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-[#163622]/80 border border-[#2E7D32]/30 rounded-3xl p-6 shadow-xl">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
          <Database className="w-4 h-4 text-emerald-400" /> Existing Backup Snapshots
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2E7D32]/30 text-[11px] font-mono uppercase tracking-wider text-emerald-300/70">
                <th className="py-3 px-4">Backup File Name</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4">File Size</th>
                <th className="py-3 px-4">Backup Type</th>
                <th className="py-3 px-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2E7D32]/20 text-xs">
              {data.backups.map((bak) => (
                <tr key={bak.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white font-mono">{bak.filename}</td>
                  <td className="py-3.5 px-4 text-emerald-200/80 font-mono text-[11px]">
                    {new Date(bak.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-300 font-mono">{bak.size}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-bold text-[10px] uppercase">
                      {bak.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={handleDownloadSnapshot}
                      className="p-2 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:bg-[#2E7D32] hover:text-white rounded-xl transition-all cursor-pointer"
                      title="Download Snapshot"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
