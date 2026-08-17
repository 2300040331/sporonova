"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Menu,
  Compass,
  Package,
  Layers,
  Cpu,
  Info,
  Award,
  BookOpen,
  Image as ImageIcon,
  Folder,
  MessageSquare,
  HelpCircle,
  Inbox,
  BarChart3,
  Settings,
  Database,
  User,
  LogOut,
  X,
  ExternalLink,
  Mail,
  Palette,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // If on the login page itself (/admin), render full screen login without sidebar
  const isLoginPage = pathname === "/admin";

  useEffect(() => {
    if (!isLoginPage) {
      fetch("/api/auth/me")
        .then((res) => res.json())
        .then((data) => {
          if (data.authenticated) {
            setCurrentUser(data.user);
          }
        })
        .catch(() => {});
    }
  }, [pathname, isLoginPage]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  interface NavItem {
    name: string;
    href: string;
    icon: any;
    superAdminOnly?: boolean;
  }

  const sidebarNavItems: NavItem[] = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Homepage", href: "/admin/homepage", icon: Home },
    { name: "Header", href: "/admin/header", icon: Menu },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Production Process", href: "/admin/production-process", icon: Cpu },
    { name: "About Us", href: "/admin/about", icon: Info },
    { name: "Why Choose Us", href: "/admin/why-choose-us", icon: Award },
    { name: "Icon Library", href: "/admin/icons", icon: Palette },
    { name: "Knowledge Center", href: "/admin/knowledge-center", icon: BookOpen },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Contact Forms", href: "/admin/forms", icon: Inbox },
    { name: "Contact Details", href: "/admin/contact", icon: Mail },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Backup", href: "/admin/backups", icon: Database },
    { name: "Profile", href: "/admin/profile", icon: User },
  ];

  return (
    <div className="h-screen bg-[#f8faf7] text-[#1c3c24] flex flex-col font-sans selection:bg-[#1c3c24] selection:text-white overflow-hidden">
      {/* Top Admin Header Bar */}
      <header className="h-16 bg-white/95 backdrop-blur-md border-b border-[#e2e8e0] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#1c3c24] hover:bg-[#f0f5ef] cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex p-2 rounded-xl text-[#1c3c24] hover:bg-[#f0f5ef] cursor-pointer"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <img
              src="/logo_transparent.png"
              alt="SporoNova CMS"
              className="h-8 md:h-9 w-auto object-contain mix-blend-multiply"
            />
            <span className="hidden sm:inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-[#2c5e37] bg-[#f0f5ef] border border-[#d2e4d0] px-2.5 py-1 rounded-full">
              CMS Suite v2.0
            </span>
          </Link>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-[#f0f5ef] border border-[#d2e4d0] text-[#1c3c24] hover:bg-[#1c3c24] hover:text-white transition-all shadow-sm"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Role Badge */}
          {currentUser && (
            <div className="hidden sm:flex items-center gap-2 bg-[#f0f5ef] border border-[#d2e4d0] px-3 py-1 rounded-xl text-xs">
              <span className="w-2 h-2 rounded-full bg-[#4e8c4a] animate-pulse" />
              <span className="font-bold text-[#1c3c24]">{currentUser.name}</span>
              <span className="text-[9px] text-[#2c5e37] uppercase font-mono font-bold tracking-wider bg-white px-1.5 py-0.5 rounded border border-[#d2e4d0]">
                {currentUser.role}
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-700 hover:bg-red-600 hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 relative">
        {/* Sidebar Desktop */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } hidden lg:flex flex-col bg-white border-r border-[#e2e8e0] transition-all duration-300 z-30 shadow-sm flex-shrink-0`}
        >
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
            {sidebarNavItems.map((item) => {
              if (item.superAdminOnly && currentUser?.role !== "Super Admin") {
                return null;
              }
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all group ${
                    isActive
                      ? "bg-[#1c3c24] text-white shadow-md shadow-[#1c3c24]/20 font-bold"
                      : "text-[#2d5034] hover:bg-[#f0f5ef] hover:text-[#1c3c24]"
                  }`}
                  title={item.name}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      isActive ? "text-white scale-110" : "text-[#4e8c4a] group-hover:scale-110"
                    }`}
                  />
                  {sidebarOpen && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          {sidebarOpen && (
            <div className="p-4 border-t border-[#e2e8e0] bg-[#f9fbf8] text-[10px] text-gray-500 font-mono text-center">
              <div className="font-bold text-[#1c3c24]">SPORONOVA CMS ENGINE</div>
              <div className="text-[#4e8c4a] mt-0.5 font-semibold">Real-time Public Sync</div>
            </div>
          )}
        </aside>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex">
            <div className="w-72 bg-white border-r border-[#e2e8e0] flex flex-col p-4 h-full overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <img src="/logo_transparent.png" className="h-8" />
                  <span className="text-xs font-bold text-[#1c3c24]">Admin Menu</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {sidebarNavItems.map((item) => {
                  if (item.superAdminOnly && currentUser?.role !== "Super Admin") {
                    return null;
                  }
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold ${
                        isActive
                          ? "bg-[#1c3c24] text-white font-bold"
                          : "text-[#2d5034] hover:bg-[#f0f5ef] hover:text-[#1c3c24]"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#4e8c4a]" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#f8faf7]">
          {children}
        </main>
      </div>
    </div>
  );
}
