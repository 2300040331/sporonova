"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { CMSData } from "./cms-store";

interface CMSContextType {
  data: CMSData | null;
  isLoading: boolean;
  updateData: (newData: Partial<CMSData>) => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const CMSContext = createContext<CMSContextType>({
  data: null,
  isLoading: true,
  updateData: async () => false,
  refreshData: async () => {},
});

const LOCAL_STORAGE_KEY = "sporonova_cms_data";

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCMSContent = async () => {
    try {
      // Bypass browser & Next.js cache with timestamp parameter
      const res = await fetch(`/api/cms/content?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Pragma": "no-cache" },
      });

      if (res.ok) {
        const json = await res.json();
        setData(json);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json));
        } catch (e) {
          // ignore quota errors
        }
      }
    } catch (e) {
      console.error("Failed to fetch CMS content", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 1. Initial local cache check for instant zero-flicker rendering
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        setData(parsed);
        setIsLoading(false);
      }
    } catch (e) {
      // ignore JSON parse error
    }

    // 2. Fetch fresh data from server
    fetchCMSContent();

    // 3. Real-time event listener for updates across tabs and components
    const handleCMSUpdated = (e: any) => {
      if (e.detail) {
        setData(e.detail);
      } else {
        fetchCMSContent();
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY && e.newValue) {
        try {
          setData(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };

    window.addEventListener("cms-updated", handleCMSUpdated);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("cms-updated", handleCMSUpdated);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateData = async (newData: Partial<CMSData>): Promise<boolean> => {
    const currentBase = data || {};
    const merged = { ...currentBase, ...newData } as CMSData;

    // Instant local state & localStorage update across all tabs
    setData(merged);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent("cms-updated", { detail: merged }));
    } catch (e) {
      // ignore
    }

    try {
      const res = await fetch(`/api/cms/content?t=${Date.now()}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(merged),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.data) {
          setData(result.data);
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result.data));
          } catch (e) {}
        }
        return true;
      }
      return false;
    } catch (e) {
      console.error("Failed to save CMS data to backend", e);
      return false;
    }
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        isLoading,
        updateData,
        refreshData: fetchCMSContent,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
