"use client";

import React from "react";
import { useCMS } from "@/lib/cms-context";
import { BarChart3, TrendingUp, Users, Smartphone, Monitor, Globe } from "lucide-react";

export default function AnalyticsCMSPage() {
  const { data, isLoading } = useCMS();

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { analytics } = data;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="bg-[#163622]/80 border border-[#2E7D32]/30 p-6 rounded-3xl backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white tracking-tight">Visitor & Performance Analytics</h1>
        <p className="text-xs text-emerald-100/70 mt-1">
          Monitor page views, unique traffic, popular products, and device breakdown metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#163622]/80 border border-[#2E7D32]/30 rounded-3xl p-6 shadow-xl">
          <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Total Page Views</div>
          <div className="text-3xl font-extrabold text-white mt-2">{analytics.pageViews.toLocaleString()}</div>
        </div>

        <div className="bg-[#163622]/80 border border-[#2E7D32]/30 rounded-3xl p-6 shadow-xl">
          <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Unique Visitors</div>
          <div className="text-3xl font-extrabold text-white mt-2">{analytics.uniqueVisitors.toLocaleString()}</div>
        </div>

        <div className="bg-[#163622]/80 border border-[#2E7D32]/30 rounded-3xl p-6 shadow-xl">
          <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Product Catalog Downloads</div>
          <div className="text-3xl font-extrabold text-white mt-2">{analytics.productDownloads.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#163622]/80 border border-[#2E7D32]/30 rounded-3xl p-6 shadow-xl">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" /> Top Visited Pages
          </h3>
          <div className="space-y-3">
            {analytics.topPages.map((tp) => (
              <div key={tp.page} className="flex items-center justify-between text-xs p-3 bg-black/30 rounded-xl">
                <span className="font-mono text-emerald-200">{tp.page}</span>
                <span className="font-bold text-white">{tp.views.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#163622]/80 border border-[#2E7D32]/30 rounded-3xl p-6 shadow-xl">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Monitor className="w-4 h-4 text-emerald-400" /> Device Traffic Breakdown
          </h3>
          <div className="space-y-4">
            {analytics.deviceBreakdown.map((db) => (
              <div key={db.device} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-emerald-200 font-semibold">{db.device}</span>
                  <span className="text-white font-bold">{db.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${db.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
