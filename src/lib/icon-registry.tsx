"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

// Curated list of commonly-used Lucide icons, organized by category
export const ICON_CATEGORIES: Record<string, string[]> = {
  "Nature & Agriculture": [
    "Leaf", "TreePine", "Trees", "Sprout", "Flower", "Flower2", "Clover",
    "Apple", "Cherry", "Grape", "Wheat", "Vegan", "Sun", "Cloud", "CloudRain",
    "Droplets", "Snowflake", "Mountain", "MountainSnow", "Sunrise", "Sunset",
  ],
  "Science & Lab": [
    "Microscope", "FlaskConical", "FlaskRound", "TestTube", "TestTubes", "Atom",
    "Dna", "Beaker", "Pipette", "Syringe", "Pill", "Tablets", "Thermometer",
    "Biohazard", "Radiation", "Activity", "HeartPulse", "Brain",
  ],
  "Business & Finance": [
    "Building", "Building2", "Factory", "Landmark", "Briefcase", "HandCoins",
    "Wallet", "CreditCard", "DollarSign", "TrendingUp", "TrendingDown",
    "BarChart", "BarChart2", "BarChart3", "PieChart", "LineChart",
    "Presentation", "Receipt", "Banknote",
  ],
  "Awards & Badges": [
    "Award", "Trophy", "Medal", "Crown", "Star", "Stars", "Sparkle", "Sparkles",
    "Gem", "Diamond", "Badge", "BadgeCheck", "BadgePlus", "Ribbon",
    "ThumbsUp", "ThumbsDown", "Heart", "Flame",
  ],
  "People & Users": [
    "User", "UserCheck", "UserPlus", "Users", "UserCircle", "UserCog",
    "PersonStanding", "Baby", "Accessibility", "HandMetal", "Hand",
    "Handshake", "GraduationCap", "School",
  ],
  "Security & Safety": [
    "Shield", "ShieldCheck", "ShieldAlert", "Lock", "Unlock", "Key",
    "KeyRound", "Fingerprint", "ScanFace", "Eye", "EyeOff",
    "AlertTriangle", "AlertCircle", "Ban", "ShieldOff",
  ],
  "Technology & Tools": [
    "Cpu", "HardDrive", "Server", "Database", "Cloud", "Wifi",
    "Smartphone", "Monitor", "Laptop", "Tablet", "Watch", "Printer",
    "QrCode", "Barcode", "Scan", "Nfc", "Bluetooth", "Usb",
    "Settings", "Cog", "Wrench", "Hammer", "Drill",
  ],
  "Transport & Logistics": [
    "Truck", "Car", "Ship", "Plane", "Train", "Bike", "Bus",
    "Package", "PackageCheck", "PackagePlus", "PackageOpen",
    "Container", "Warehouse", "MapPin", "Navigation", "Route",
    "Compass", "Map", "Globe", "Globe2",
  ],
  "Communication": [
    "Mail", "MailOpen", "Phone", "PhoneCall", "MessageSquare", "MessageCircle",
    "Send", "AtSign", "Hash", "Bell", "BellRing", "Megaphone",
    "Radio", "Podcast", "Rss", "Share2", "ExternalLink",
  ],
  "Time & Calendar": [
    "Clock", "Clock1", "Clock2", "Clock3", "Clock4", "Timer", "TimerReset",
    "Hourglass", "Calendar", "CalendarDays", "CalendarCheck", "History",
    "AlarmClock", "Watch", "Stopwatch",
  ],
  "Documents & Files": [
    "File", "FileText", "FileCheck", "FilePlus", "FileSearch",
    "Folder", "FolderOpen", "FolderPlus", "Clipboard", "ClipboardCheck",
    "ClipboardList", "BookOpen", "Book", "BookMarked", "Notebook",
    "ScrollText", "Newspaper", "FileSpreadsheet",
  ],
  "Actions & UI": [
    "Check", "CheckCircle", "CheckCircle2", "CheckSquare", "X", "XCircle",
    "Plus", "PlusCircle", "Minus", "MinusCircle", "ArrowRight", "ArrowLeft",
    "ArrowUp", "ArrowDown", "RefreshCw", "RotateCw", "Download", "Upload",
    "Search", "ZoomIn", "ZoomOut", "Filter", "SlidersHorizontal",
    "LayoutGrid", "LayoutList", "Grid3X3", "Maximize", "Minimize",
  ],
  "Shapes & Misc": [
    "Circle", "Square", "Triangle", "Pentagon", "Hexagon", "Octagon",
    "Zap", "Bolt", "Power", "Target", "Crosshair", "Focus",
    "Infinity", "Sigma", "Pi", "Percent", "Hash",
    "Music", "Palette", "Paintbrush", "Pen", "PenTool", "Scissors",
    "Camera", "Image", "Video", "Play", "Pause",
  ],
};

// Flat list of all icon names
export const ALL_ICON_NAMES: string[] = Object.values(ICON_CATEGORIES).flat();

// Get a Lucide icon component by name string
export function getIconComponent(name: string): React.ComponentType<any> | null {
  if (!name) return null;
  const icons = LucideIcons as any;
  return icons[name] || null;
}

// Render an icon by name with optional styles
export function DynamicIcon({
  name,
  className = "w-5 h-5",
  style,
  fallback,
}: {
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
}) {
  if (!name) return fallback ? <>{fallback}</> : null;
  const IconComp = getIconComponent(name);
  if (!IconComp) return fallback ? <>{fallback}</> : null;
  return <IconComp className={className} style={style} />;
}
