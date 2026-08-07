"use client";

import React from "react";
import { CMSProvider } from "@/lib/cms-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CMSProvider>{children}</CMSProvider>;
}
