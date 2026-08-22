"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import heavy THREE.js canvas components with ssr: false
// This prevents the entire THREE.js bundle from blocking page load
// and only loads the specific canvas needed for the current product type
const LiquidSpawnBottleCanvas = dynamic(
  () => import("@/components/canvas/LiquidSpawnBottleCanvas"),
  {
    ssr: false,
    loading: () => <CanvasLoadingPlaceholder />,
  }
);

const GrainJarCanvas = dynamic(
  () => import("@/components/canvas/GrainJarCanvas"),
  {
    ssr: false,
    loading: () => <CanvasLoadingPlaceholder />,
  }
);

const SpawnMorphCanvas = dynamic(
  () => import("@/components/canvas/SpawnMorphCanvas"),
  {
    ssr: false,
    loading: () => <CanvasLoadingPlaceholder />,
  }
);

const MushroomStructureCanvas = dynamic(
  () => import("@/components/canvas/MushroomStructureCanvas"),
  {
    ssr: false,
    loading: () => <CanvasLoadingPlaceholder />,
  }
);

function CanvasLoadingPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-[#e6e4dc] border-t-[#4e8c4a] animate-spin" />
        <span className="text-[9px] text-gray-400 font-mono uppercase tracking-widest font-bold">
          Loading 3D Model
        </span>
      </div>
    </div>
  );
}

interface SpawnCanvasProps {
  type: string;
}

export default function SpawnCanvas({ type }: SpawnCanvasProps) {
  const norm = (type || "").toLowerCase().trim();

  if (norm.includes("liquid") || norm.includes("bottle") || norm.includes("broth")) {
    return <LiquidSpawnBottleCanvas />;
  }
  if (norm.includes("grain") || norm.includes("jar") || norm.includes("cereal") || norm.includes("bag")) {
    return <GrainJarCanvas />;
  }
  if (norm.includes("mother") || norm.includes("culture") || norm.includes("slant") || norm.includes("agar") || norm.includes("mushroom")) {
    return <MushroomStructureCanvas hideSidebar={true} />;
  }
  return <SpawnMorphCanvas />;
}
