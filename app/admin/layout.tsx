"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { 
  Users, 
  ArrowLeft, 
  Menu, 
  X, 
  ShieldCheck,
  CalendarDays,
  Calendar,
  Layers,
  Sparkles,
  Download
} from "lucide-react";

function SidebarContent({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (open: boolean) => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPeriod = searchParams.get("period") || "all";
  const todayStr = new Date().toISOString().split("T")[0];
  const currentMonthStr = new Date().toISOString().slice(0, 7);

  const dateFilterItems = [
    {
      name: "All Time Enquiries",
      href: "/admin/enquiries?period=all",
      periodKey: "all",
      icon: Layers,
      color: "text-slate-400"
    },
    {
      name: "Daily Enquiries",
      href: `/admin/enquiries?period=daily&date=${todayStr}`,
      periodKey: "daily",
      icon: CalendarDays,
      color: "text-[#fe9b19]"
    },
    {
      name: "Monthly Enquiries",
      href: `/admin/enquiries?period=monthly&month=${currentMonthStr}`,
      periodKey: "monthly",
      icon: Calendar,
      color: "text-blue-400"
    },
  ];

  return (
    <aside
      className={`fixed md:sticky top-0 bottom-0 left-0 z-40 w-68 bg-slate-950 text-slate-300 flex flex-col justify-between p-5 border-r border-slate-800/80 transition-transform duration-300 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } h-screen shrink-0 overflow-y-auto`}
    >
      <div className="space-y-6">
        {/* Brand Logo & Portal Badge */}
        <div className="flex flex-col gap-1.5 pt-2">
          <Link href="/admin/enquiries" className="flex items-center gap-2.5">
            <Image
              src="/images/logo/placex-logo.png"
              alt="PlaceX Logo"
              width={220}
              height={50}
              className="h-10 sm:h-12 w-auto object-contain brightness-0 invert"
            />
            <span className="text-[10px] font-extrabold tracking-widest bg-amber-500/20 text-[#fe9b19] px-2.5 py-0.5 rounded-full border border-amber-500/30 uppercase shadow-xs shrink-0">
              Admin
            </span>
          </Link>
          <p className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#fe9b19]" />
            <span>PerpeX HR Lead System</span>
          </p>
        </div>

        {/* Sidebar Section 1: Main Menu */}
        <div className="space-y-1">
          <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest px-3 mb-2">
            Navigation
          </div>
          <Link
            href="/admin/enquiries"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              pathname === "/admin/enquiries" && currentPeriod === "all"
                ? "bg-slate-800 text-white border border-slate-700 shadow-xs"
                : "hover:bg-slate-900 text-slate-300"
            }`}
          >
            <Users className="w-4 h-4 text-slate-400" />
            <span>All Enquiries</span>
          </Link>
        </div>

        {/* Sidebar Section 2: Date Filters (Daily & Monthly) */}
        <div className="space-y-1 pt-2 border-t border-slate-900">
          <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest px-3 mb-2 flex items-center justify-between">
            <span>Date Filters</span>
            <span className="text-[9px] bg-amber-500/10 text-[#fe9b19] px-1.5 py-0.5 rounded-md font-bold">Quick</span>
          </div>
          {dateFilterItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === "/admin/enquiries" && currentPeriod === item.periodKey;
            return (
              <Link
                key={item.periodKey}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#fe9b19] text-slate-950 shadow-md shadow-amber-500/10"
                    : "hover:bg-slate-900 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : item.color}`} />
                  <span>{item.name}</span>
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Quick Export Banner */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Download className="w-3.5 h-3.5 text-[#fe9b19]" />
            <span>Quick Lead Export</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
            Export filtered Daily, Monthly, or All Time lead records in CSV format.
          </p>
          <Link
            href={currentPeriod === "daily" ? `/admin/enquiries?period=daily&date=${todayStr}` : currentPeriod === "monthly" ? `/admin/enquiries?period=monthly&month=${currentMonthStr}` : "/admin/enquiries"}
            className="block w-full text-center py-2 bg-[#fe9b19] hover:bg-amber-500 text-slate-950 text-xs font-extrabold rounded-xl transition-all shadow-xs"
          >
            Go to Export
          </Link>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="pt-6 border-t border-slate-900 space-y-3 mt-6">
        <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-900/60 rounded-xl text-xs text-slate-400 border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-[#fe9b19]" />
          <span className="font-semibold text-slate-300">Admin Panel v1.0</span>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900 transition-all border border-transparent hover:border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </Link>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden flex items-center justify-between bg-slate-950 text-white p-4 border-b border-slate-800">
        <Link href="/admin/enquiries" className="flex items-center gap-2">
          <Image
            src="/images/logo/placex-logo.png"
            alt="PlaceX Logo"
            width={160}
            height={36}
            className="h-7 w-auto object-contain brightness-0 invert"
          />
          <span className="text-[10px] font-extrabold tracking-widest bg-amber-500/20 text-[#fe9b19] px-2 py-0.5 rounded-full border border-amber-500/30 uppercase shrink-0">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar with Suspense Boundary for searchParams */}
      <Suspense fallback={
        <div className="w-68 bg-slate-950 p-5 text-slate-500 font-bold text-xs">Loading Sidebar...</div>
      }>
        <SidebarContent mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      </Suspense>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <main className="p-4 sm:p-6 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
