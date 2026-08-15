"use client";

import React from "react";
import Link from "next/link";
import { useCMS } from "@/lib/cms-context";
import {
  BarChart3,
  Users,
  Package,
  Inbox,
  Folder,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Edit,
  Globe,
  ShieldCheck,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { data, isLoading } = useCMS();

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#1c3c24] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const contacts = data.contacts || [];
  const products = data.products || [];
  const gallery = data.gallery || [];
  const analytics = data.analytics || { pageViews: 0, uniqueVisitors: 0, productDownloads: 0, topPages: [], deviceBreakdown: [] };

  const newSubmissionsCount = contacts.filter((c) => c.status === "New").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1c3c24] via-[#2c5e37] to-[#1c3c24] p-6 sm:p-8 text-white shadow-xl border border-[#1c3c24]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" /> Operational Control Desk
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              SporoNova Enterprise CMS
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl font-medium">
              All public content, products, media, and settings are connected in real-time. Edits saved here immediately reflect on the live website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/homepage"
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#1c3c24] hover:bg-[#f0f5ef] rounded-2xl font-bold text-xs uppercase tracking-wider shadow transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Edit className="w-4 h-4 text-[#4e8c4a]" /> Edit Live Site
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl font-bold text-xs transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4 text-emerald-300" /> View Public Site
            </a>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 shadow-sm relative overflow-hidden group hover:border-[#1c3c24]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-[#2c5e37] uppercase tracking-wider">
              Total Page Views
            </span>
            <div className="p-3 bg-[#f0f5ef] border border-[#d2e4d0] rounded-2xl text-[#1c3c24]">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#1c3c24] mt-3">
            {analytics.pageViews.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#2c5e37] mt-2 font-bold">
            <TrendingUp className="w-3.5 h-3.5 text-[#4e8c4a]" /> +14.2% from last month
          </div>
        </div>

        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 shadow-sm relative overflow-hidden group hover:border-[#1c3c24]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-[#2c5e37] uppercase tracking-wider">
              Active Products
            </span>
            <div className="p-3 bg-[#f0f5ef] border border-[#d2e4d0] rounded-2xl text-[#1c3c24]">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#1c3c24] mt-3">{products.length}</div>
          <div className="text-xs text-gray-500 mt-2 font-mono font-semibold">
            {products.filter((p) => p.status === "Published").length} Published • Live
          </div>
        </div>

        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 shadow-sm relative overflow-hidden group hover:border-[#1c3c24]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-[#2c5e37] uppercase tracking-wider">
              Contact Submissions
            </span>
            <div className="p-3 bg-[#f0f5ef] border border-[#d2e4d0] rounded-2xl text-[#1c3c24]">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#1c3c24] mt-3">{contacts.length}</div>
          <div className="text-xs text-amber-700 mt-2 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            {newSubmissionsCount} Unread Lead Requests
          </div>
        </div>

        <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 shadow-sm relative overflow-hidden group hover:border-[#1c3c24]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-[#2c5e37] uppercase tracking-wider">
              Gallery Photos
            </span>
            <div className="p-3 bg-[#f0f5ef] border border-[#d2e4d0] rounded-2xl text-[#1c3c24]">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#1c3c24] mt-3">{gallery.length}</div>
          <div className="text-xs text-gray-500 mt-2 font-mono font-semibold">Public Image Gallery</div>
        </div>
      </div>

      {/* Quick Access Modules Grid */}
      <div>
        <h2 className="text-base font-bold text-[#1c3c24] mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#4e8c4a]" /> Quick Section Management
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: "Homepage", href: "/admin/homepage", icon: Globe, count: "7 Sections" },
            { title: "Header", href: "/admin/header", icon: Globe, count: "Nav & Logo" },
            { title: "Products", href: "/admin/products", icon: Package, count: `${products.length} Items` },
            { title: "Gallery", href: "/admin/gallery", icon: ImageIcon, count: `${gallery.length} Images` },
            { title: "Backups", href: "/admin/backups", icon: ShieldCheck, count: "Auto Snapshot" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="bg-white border border-[#e2e8e0] hover:border-[#1c3c24] hover:shadow-md p-5 rounded-2xl transition-all group text-left block cursor-pointer"
              >
                <Icon className="w-5 h-5 text-[#4e8c4a] mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-[#1c3c24]">
                  {item.title}
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5 font-medium">{item.count}</div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Contact Form Submissions */}
      <div className="bg-white border border-[#e2e8e0] rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-[#1c3c24] flex items-center gap-2">
              <Inbox className="w-5 h-5 text-[#4e8c4a]" /> Recent Contact & Inquiry Leads
            </h2>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">
              Submissions received from public contact forms
            </p>
          </div>
          <Link
            href="/admin/forms"
            className="text-xs font-bold text-[#2c5e37] hover:text-[#1c3c24] flex items-center gap-1 cursor-pointer"
          >
            <span>View All Leads ({contacts.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e2e8e0] bg-[#f9fbf8] text-[11px] font-mono uppercase tracking-wider text-[#2c5e37]">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email / Phone</th>
                <th className="py-3 px-4">Inquiry Type</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8e0] text-xs">
              {contacts.slice(0, 5).map((submission) => (
                <tr key={submission.id} className="hover:bg-[#f9fbf8] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1c3c24]">{submission.name}</td>
                  <td className="py-3.5 px-4 text-gray-600">
                    <div>{submission.email}</div>
                    <div className="text-[10px] text-gray-500 font-mono">{submission.phone || "N/A"}</div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 font-medium">{submission.inquiryType}</td>
                  <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px]">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        submission.status === "New"
                          ? "bg-amber-50 border border-amber-200 text-amber-800"
                          : "bg-emerald-50 border border-emerald-200 text-emerald-800"
                      }`}
                    >
                      {submission.status}
                    </span>
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
