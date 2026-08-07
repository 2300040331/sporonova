"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms-context";
import { Inbox, Download, Search, Trash2, Mail, CheckCircle2, Phone, Calendar } from "lucide-react";

export default function ContactFormsCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Inquiry Type", "Title", "Message", "Created At", "Status"];
    const rows = data.contacts.map((c) => [
      c.id,
      `"${c.name}"`,
      `"${c.email}"`,
      `"${c.phone || ""}"`,
      `"${c.inquiryType}"`,
      `"${c.title}"`,
      `"${c.message.replace(/"/g, '""')}"`,
      `"${c.createdAt}"`,
      `"${c.status}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sporonova_contacts_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteSubmission = async (id: string) => {
    if (confirm("Delete this contact lead?")) {
      const updated = data.contacts.filter((c) => c.id !== id);
      await updateData({ contacts: updated });
      if (selectedSubmission?.id === id) setSelectedSubmission(null);
    }
  };

  const handleMarkStatus = async (id: string, status: "New" | "Read" | "Replied" | "Archived") => {
    const updated = data.contacts.map((c) => (c.id === id ? { ...c, status } : c));
    await updateData({ contacts: updated });
    if (selectedSubmission?.id === id) {
      setSelectedSubmission({ ...selectedSubmission, status });
    }
  };

  const filteredSubmissions = data.contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.inquiryType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Contact Submissions Inbox</h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Review product catalog requests, technical PDF inquiries, and commercial partnership leads.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-5 py-3 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" /> Export CSV Data
        </button>
      </div>

      {/* Main Grid: Left Submissions List / Right Details View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-3.5 text-[#4e8c4a]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads by name, email, or inquiry type..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#dce4da] rounded-2xl text-[#1c3c24] text-xs font-bold placeholder-gray-400"
            />
          </div>

          <div className="space-y-3">
            {filteredSubmissions.map((sub) => (
              <div
                key={sub.id}
                onClick={() => setSelectedSubmission(sub)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedSubmission?.id === sub.id
                    ? "bg-[#f0f5ef] border-[#1c3c24] shadow-md"
                    : "bg-white border-[#e2e8e0] hover:bg-[#f9fbf8]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1c3c24] text-sm">{sub.name}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      sub.status === "New" ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
                <div className="text-xs text-[#2c5e37] font-bold mt-1">{sub.inquiryType}</div>
                <div className="text-[11px] text-gray-500 font-mono mt-1 font-semibold">
                  {new Date(sub.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Detail View */}
        <div className="lg:col-span-6">
          {selectedSubmission ? (
            <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-5 text-[#1c3c24] shadow-sm sticky top-24">
              <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
                <h3 className="text-base font-bold text-[#1c3c24] flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-[#4e8c4a]" /> Inquiry Lead Details
                </h3>
                <button
                  onClick={() => handleDeleteSubmission(selectedSubmission.id)}
                  className="p-2 text-red-500 hover:text-red-700 cursor-pointer"
                  title="Delete Lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#2c5e37] font-mono text-[10px] font-bold uppercase">Contact Name</span>
                  <div className="text-sm font-bold text-[#1c3c24] mt-0.5">{selectedSubmission.name}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#2c5e37] font-mono text-[10px] font-bold uppercase">Email</span>
                    <div className="font-mono text-xs font-bold text-[#1c3c24] mt-0.5">{selectedSubmission.email}</div>
                  </div>
                  <div>
                    <span className="text-[#2c5e37] font-mono text-[10px] font-bold uppercase">Phone</span>
                    <div className="font-mono text-xs font-bold text-[#1c3c24] mt-0.5">{selectedSubmission.phone || "N/A"}</div>
                  </div>
                </div>

                <div>
                  <span className="text-[#2c5e37] font-mono text-[10px] font-bold uppercase">Inquiry Type</span>
                  <div className="font-bold text-[#1c3c24] text-xs mt-0.5">{selectedSubmission.inquiryType}</div>
                </div>

                <div>
                  <span className="text-[#2c5e37] font-mono text-[10px] font-bold uppercase">Message / Requirements</span>
                  <div className="bg-[#f9fbf8] border border-[#dce4da] rounded-2xl p-4 text-xs font-medium leading-relaxed text-[#1c3c24] mt-1">
                    {selectedSubmission.message}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e2e8e0] flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-500 font-bold uppercase">Status</span>
                <div className="flex gap-2">
                  {(["New", "Read", "Replied", "Archived"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleMarkStatus(selectedSubmission.id, st)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedSubmission.status === st
                          ? "bg-[#1c3c24] text-white"
                          : "bg-[#f0f5ef] border border-[#d2e4d0] text-[#1c3c24] hover:bg-gray-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#e2e8e0] rounded-3xl p-12 text-center text-gray-500 text-xs font-medium shadow-sm">
              Select a contact lead from the left list to view details and update response status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
