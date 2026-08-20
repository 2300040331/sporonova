"use client";

import React, { useState, useMemo } from "react";
import { useCMS } from "@/lib/cms-context";
import {
  Inbox,
  Download,
  Search,
  Trash2,
  Mail,
  CheckCircle2,
  Phone,
  Calendar,
  CheckSquare,
  Square,
  RotateCcw,
  Tag,
  AlertCircle,
  Eye,
  Send,
  MessageSquare,
} from "lucide-react";

export default function ContactFormsCMSPage() {
  const { data, updateData, isLoading } = useCMS();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<"All" | "New" | "Read" | "Replied" | "Archived">("All");

  const contacts = useMemo(() => {
    return Array.isArray(data?.contacts) ? data.contacts : [];
  }, [data?.contacts]);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const filteredSubmissions = contacts.filter((c) => {
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      c.name?.toLowerCase().includes(term) ||
      c.email?.toLowerCase().includes(term) ||
      c.phone?.toLowerCase().includes(term) ||
      c.inquiryType?.toLowerCase().includes(term) ||
      c.title?.toLowerCase().includes(term) ||
      c.message?.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  const handleExportCSV = (exportOnlySelected = false) => {
    const listToExport = exportOnlySelected && selectedIds.length > 0
      ? contacts.filter((c) => selectedIds.includes(c.id))
      : filteredSubmissions;

    if (listToExport.length === 0) {
      alert("No contact submissions to export.");
      return;
    }

    const headers = ["ID", "Name", "Email", "Phone", "Inquiry Type", "Title", "Message", "Created At", "Status"];
    const rows = listToExport.map((c) => [
      c.id,
      `"${(c.name || "").replace(/"/g, '""')}"`,
      `"${(c.email || "").replace(/"/g, '""')}"`,
      `"${(c.phone || "").replace(/"/g, '""')}"`,
      `"${(c.inquiryType || "").replace(/"/g, '""')}"`,
      `"${(c.title || "").replace(/"/g, '""')}"`,
      `"${(c.message || "").replace(/"/g, '""')}"`,
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

  const handleDeleteSubmission = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm("Are you sure you want to permanently delete this contact submission?")) {
      const updated = contacts.filter((c) => c.id !== id);
      await updateData({ contacts: updated });
      setSelectedIds((prev) => prev.filter((i) => i !== id));
      if (selectedSubmission?.id === id) setSelectedSubmission(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Permanently delete ${selectedIds.length} selected submission(s)?`)) {
      const updated = contacts.filter((c) => !selectedIds.includes(c.id));
      await updateData({ contacts: updated });
      if (selectedSubmission && selectedIds.includes(selectedSubmission.id)) {
        setSelectedSubmission(null);
      }
      setSelectedIds([]);
    }
  };

  const handleClearAll = async () => {
    if (contacts.length === 0) return;
    if (window.confirm("Are you sure you want to delete ALL contact submissions? This action cannot be undone.")) {
      await updateData({ contacts: [] });
      setSelectedSubmission(null);
      setSelectedIds([]);
    }
  };

  const handleMarkStatus = async (id: string, status: "New" | "Read" | "Replied" | "Archived") => {
    const updated = contacts.map((c) => (c.id === id ? { ...c, status } : c));
    await updateData({ contacts: updated });
    if (selectedSubmission?.id === id) {
      setSelectedSubmission({ ...selectedSubmission, status });
    }
  };

  const handleBulkMarkStatus = async (status: "New" | "Read" | "Replied" | "Archived") => {
    if (selectedIds.length === 0) return;
    const updated = contacts.map((c) => (selectedIds.includes(c.id) ? { ...c, status } : c));
    await updateData({ contacts: updated });
    if (selectedSubmission && selectedIds.includes(selectedSubmission.id)) {
      setSelectedSubmission({ ...selectedSubmission, status });
    }
  };

  const toggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAllFiltered = () => {
    const allFilteredIds = filteredSubmissions.map((c) => c.id);
    const areAllSelected = allFilteredIds.length > 0 && allFilteredIds.every((id) => selectedIds.includes(id));

    if (areAllSelected) {
      setSelectedIds((prev) => prev.filter((id) => !allFilteredIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...allFilteredIds])));
    }
  };

  const newCount = contacts.filter((c) => c.status === "New").length;
  const readCount = contacts.filter((c) => c.status === "Read").length;
  const repliedCount = contacts.filter((c) => c.status === "Replied").length;
  const archivedCount = contacts.filter((c) => c.status === "Archived").length;

  const allFilteredSelected =
    filteredSubmissions.length > 0 &&
    filteredSubmissions.every((c) => selectedIds.includes(c.id));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8e0] p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] text-[10px] font-bold uppercase tracking-wider text-[#2c5e37] mb-2 font-mono">
            <Inbox className="w-3.5 h-3.5 text-[#4e8c4a]" /> Real-time Lead CRM
          </div>
          <h1 className="text-2xl font-bold text-[#1c3c24] tracking-tight">Contact Submissions Inbox</h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Manage real customer inquiries from the website contact forms, WhatsApp leads, and quotation requests.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {contacts.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="px-4 py-2.5 bg-red-50 hover:bg-red-600 hover:text-white border border-red-200 text-red-700 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All Inbox
            </button>
          )}

          <button
            type="button"
            onClick={() => handleExportCSV(false)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1c3c24] hover:bg-[#2c5e37] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export CSV ({filteredSubmissions.length})
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white border border-[#e2e8e0] rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto bg-[#f0f5ef] p-1.5 rounded-2xl border border-[#d2e4d0]">
            {[
              { id: "All", label: "All Leads", count: contacts.length },
              { id: "New", label: "New", count: newCount },
              { id: "Read", label: "Read", count: readCount },
              { id: "Replied", label: "Replied", count: repliedCount },
              { id: "Archived", label: "Archived", count: archivedCount },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  statusFilter === tab.id
                    ? "bg-[#1c3c24] text-white shadow-sm"
                    : "text-[#2c5e37] hover:bg-white/60"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    statusFilter === tab.id
                      ? "bg-white/20 text-white font-bold"
                      : "bg-[#e2ece0] text-[#1c3c24]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#4e8c4a]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads by name, email, query..."
              className="w-full pl-10 pr-4 py-2 bg-[#f9fbf8] border border-[#dce4da] rounded-xl text-[#1c3c24] text-xs font-bold placeholder-gray-400 focus:outline-none focus:border-[#4e8c4a]"
            />
          </div>
        </div>

        {/* Multi-Selection & Bulk Action Bar */}
        {selectedIds.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-300 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4e8c4a] animate-ping" />
              <span className="text-xs font-bold text-[#1c3c24]">
                {selectedIds.length} lead(s) selected
              </span>
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="text-[11px] text-[#2c5e37] underline hover:text-[#1c3c24] ml-2 font-semibold cursor-pointer"
              >
                Deselect All
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleBulkMarkStatus("Read")}
                className="px-3 py-1 bg-white hover:bg-[#1c3c24] hover:text-white border border-[#d2e4d0] text-[#2c5e37] text-[11px] font-bold rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Mark Read
              </button>
              <button
                type="button"
                onClick={() => handleBulkMarkStatus("Replied")}
                className="px-3 py-1 bg-white hover:bg-[#1c3c24] hover:text-white border border-[#d2e4d0] text-[#2c5e37] text-[11px] font-bold rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Mark Replied
              </button>
              <button
                type="button"
                onClick={() => handleBulkMarkStatus("Archived")}
                className="px-3 py-1 bg-white hover:bg-gray-700 hover:text-white border border-gray-300 text-gray-700 text-[11px] font-bold rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Archive
              </button>
              <button
                type="button"
                onClick={() => handleExportCSV(true)}
                className="px-3 py-1 bg-white hover:bg-[#1c3c24] hover:text-white border border-[#d2e4d0] text-[#2c5e37] text-[11px] font-bold rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1"
              >
                <Download className="w-3 h-3" /> Export Selected
              </button>
              <button
                type="button"
                onClick={handleBulkDelete}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Delete Selected ({selectedIds.length})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Left Submissions List / Right Details View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Submissions Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          {/* Select All Checkbox Row */}
          {filteredSubmissions.length > 0 && (
            <div className="flex items-center justify-between px-3 py-2 bg-white border border-[#e2e8e0] rounded-2xl text-xs text-[#2c5e37] font-bold shadow-xs">
              <button
                type="button"
                onClick={toggleSelectAllFiltered}
                className="flex items-center gap-2 cursor-pointer hover:text-[#1c3c24]"
              >
                {allFilteredSelected ? (
                  <CheckSquare className="w-4 h-4 text-[#4e8c4a]" />
                ) : (
                  <Square className="w-4 h-4 text-gray-400" />
                )}
                <span>Select All ({filteredSubmissions.length})</span>
              </button>
              <span className="text-[11px] text-gray-400 font-normal">
                Click any inquiry to review full message
              </span>
            </div>
          )}

          {/* Submissions List */}
          {filteredSubmissions.length === 0 ? (
            <div className="bg-white border border-[#e2e8e0] rounded-3xl p-12 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#f0f5ef] border border-[#d2e4d0] flex items-center justify-center mx-auto text-[#4e8c4a]">
                <Inbox className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-[#1c3c24]">No Contact Submissions Found</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                {contacts.length === 0
                  ? "Your inbox is clean with zero fake data. When real visitors fill out contact forms on the website, their submissions will appear here instantly."
                  : "No submissions match your active filter or search query."}
              </p>
            </div>
          ) : (
            filteredSubmissions.map((sub) => {
              const isSelected = selectedIds.includes(sub.id);
              const isActive = selectedSubmission?.id === sub.id;

              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubmission(sub)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative group ${
                    isActive
                      ? "bg-[#f0f5ef] border-[#1c3c24] shadow-md ring-1 ring-[#1c3c24]"
                      : isSelected
                      ? "bg-emerald-50/50 border-[#4e8c4a]"
                      : "bg-white border-[#e2e8e0] hover:bg-[#f9fbf8] hover:border-[#4e8c4a]/60 shadow-xs"
                  }`}
                >
                  {/* Selection Checkbox */}
                  <button
                    type="button"
                    onClick={(e) => toggleSelectOne(sub.id, e)}
                    className="mt-0.5 text-gray-400 hover:text-[#4e8c4a] cursor-pointer shrink-0"
                    title="Select submission"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-[#4e8c4a]" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1c3c24] text-sm truncate">{sub.name}</span>
                        {sub.status === "New" && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                            sub.status === "New"
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : sub.status === "Replied"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : sub.status === "Archived"
                              ? "bg-gray-100 text-gray-600 border border-gray-300"
                              : "bg-blue-50 text-blue-800 border border-blue-200"
                          }`}
                        >
                          {sub.status}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleDeleteSubmission(sub.id, e)}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete submission"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-bold text-[#2c5e37] truncate">{sub.inquiryType}</div>

                    <p className="text-[11px] text-gray-500 line-clamp-1 font-medium">{sub.message}</p>

                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono pt-1">
                      <span>{sub.email}</span>
                      <span>{new Date(sub.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail Pane (5 Cols) */}
        <div className="lg:col-span-5">
          {selectedSubmission ? (
            <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 space-y-5 text-[#1c3c24] shadow-sm sticky top-24">
              <div className="flex items-center justify-between border-b border-[#e2e8e0] pb-4">
                <div className="flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-[#4e8c4a]" />
                  <div>
                    <h3 className="text-sm font-bold text-[#1c3c24]">Inquiry Lead Details</h3>
                    <span className="text-[10px] text-gray-400 font-mono block">
                      ID: {selectedSubmission.id}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleDeleteSubmission(selectedSubmission.id)}
                    className="p-2 bg-red-50 hover:bg-red-600 hover:text-white border border-red-200 text-red-700 rounded-xl transition-all cursor-pointer"
                    title="Delete Submission"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[#2c5e37] font-mono text-[10px] font-bold uppercase block">
                    Contact Name
                  </span>
                  <div className="text-sm font-bold text-[#1c3c24] mt-0.5">
                    {selectedSubmission.name}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#f9fbf8] border border-[#e2e8e0] p-3 rounded-xl">
                    <span className="text-gray-400 font-mono text-[9px] font-bold uppercase block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${selectedSubmission.email}`}
                      className="font-mono text-xs font-bold text-[#1c3c24] hover:text-[#4e8c4a] mt-0.5 block truncate"
                    >
                      {selectedSubmission.email}
                    </a>
                  </div>

                  <div className="bg-[#f9fbf8] border border-[#e2e8e0] p-3 rounded-xl">
                    <span className="text-gray-400 font-mono text-[9px] font-bold uppercase block">
                      Phone Number
                    </span>
                    <span className="font-mono text-xs font-bold text-[#1c3c24] mt-0.5 block">
                      {selectedSubmission.phone || "N/A"}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[#2c5e37] font-mono text-[10px] font-bold uppercase block">
                    Inquiry Category
                  </span>
                  <div className="font-bold text-[#1c3c24] text-xs mt-0.5 bg-[#f0f5ef] border border-[#d2e4d0] px-3 py-2 rounded-xl inline-block">
                    {selectedSubmission.inquiryType}
                  </div>
                </div>

                {selectedSubmission.title && (
                  <div>
                    <span className="text-[#2c5e37] font-mono text-[10px] font-bold uppercase block">
                      Inquiry Title
                    </span>
                    <div className="font-bold text-[#1c3c24] text-xs mt-0.5">
                      {selectedSubmission.title}
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-[#2c5e37] font-mono text-[10px] font-bold uppercase block">
                    Customer Message
                  </span>
                  <div className="bg-[#f9fbf8] border border-[#dce4da] rounded-2xl p-4 text-xs font-medium leading-relaxed text-[#1c3c24] mt-1 whitespace-pre-wrap">
                    {selectedSubmission.message}
                  </div>
                </div>

                <div className="text-[10px] font-mono text-gray-400 flex items-center justify-between pt-1">
                  <span>Submitted on:</span>
                  <span>{new Date(selectedSubmission.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="pt-4 border-t border-[#e2e8e0] space-y-2">
                <span className="text-[10px] font-mono text-gray-500 font-bold uppercase block">
                  Lead Follow-up Status
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {(["New", "Read", "Replied", "Archived"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleMarkStatus(selectedSubmission.id, st)}
                      className={`py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer text-center ${
                        selectedSubmission.status === st
                          ? "bg-[#1c3c24] text-white shadow-sm"
                          : "bg-[#f0f5ef] border border-[#d2e4d0] text-[#2c5e37] hover:bg-gray-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={`mailto:${selectedSubmission.email}?subject=RE: ${encodeURIComponent(selectedSubmission.title || selectedSubmission.inquiryType)}`}
                  className="flex-1 py-2.5 bg-[#1c3c24] hover:bg-[#2c5e37] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all text-center flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" /> Reply by Email
                </a>
                {data?.contact?.whatsappNumber && (
                  <a
                    href={`https://wa.me/${data.contact.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${selectedSubmission.name}, regarding your inquiry for ${selectedSubmission.inquiryType}...`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-[#4e8c4a] hover:bg-[#3d703a] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all text-center flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Open WhatsApp
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#e2e8e0] rounded-3xl p-12 text-center text-gray-500 text-xs font-medium shadow-sm space-y-2">
              <Inbox className="w-8 h-8 mx-auto text-gray-300" />
              <p className="font-bold text-[#1c3c24]">Select a Lead from the List</p>
              <p className="text-gray-400 text-[11px]">
                Click on any contact inquiry on the left to review customer messages, view timestamps, and update follow-up status.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
