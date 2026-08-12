"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Users, 
  Search, 
  Download, 
  Calendar as CalendarIcon, 
  Clock, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock3, 
  Sparkles,
  RefreshCw,
  Filter,
  CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EnquiryItem {
  _id: string;
  name: string;
  age: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  program: string;
  status: "new" | "contacted" | "scheduled" | "enrolled" | "cancelled";
  createdAt: string;
}

function EnquiriesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const periodParam = searchParams.get("period") || "all";
  const dateParam = searchParams.get("date") || "";
  const monthParam = searchParams.get("month") || "";

  const todayStr = new Date().toISOString().split("T")[0];
  const currentMonthStr = new Date().toISOString().slice(0, 7);

  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [dateMode, setDateMode] = useState<"all" | "daily" | "monthly">(
    periodParam === "daily" ? "daily" : periodParam === "monthly" ? "monthly" : "all"
  );
  const [selectedDate, setSelectedDate] = useState<string>(dateParam || todayStr);
  const [selectedMonth, setSelectedMonth] = useState<string>(monthParam || currentMonthStr);

  // Sync state when URL searchParams change
  useEffect(() => {
    if (periodParam === "daily") {
      setDateMode("daily");
      if (dateParam) setSelectedDate(dateParam);
    } else if (periodParam === "monthly") {
      setDateMode("monthly");
      if (monthParam) setSelectedMonth(monthParam);
    } else {
      setDateMode("all");
    }
  }, [periodParam, dateParam, monthParam]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquire");
      const data = await res.json();
      if (data.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Update URL search params when date filter changes
  const updateUrlFilter = (mode: "all" | "daily" | "monthly", dateVal?: string, monthVal?: string) => {
    setDateMode(mode);
    const params = new URLSearchParams();
    if (mode === "daily") {
      params.set("period", "daily");
      params.set("date", dateVal || selectedDate);
    } else if (mode === "monthly") {
      params.set("period", "monthly");
      params.set("month", monthVal || selectedMonth);
    } else {
      params.set("period", "all");
    }
    router.push(`/admin/enquiries?${params.toString()}`);
  };

  const filteredEnquiries = enquiries.filter((item) => {
    // 1. Text Search Filter
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      item.program.toLowerCase().includes(search.toLowerCase());

    // 2. Status Filter
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    // 3. Date / Month Filter
    let matchesDate = true;
    if (dateMode === "daily") {
      const targetDate = selectedDate;
      matchesDate =
        item.preferredDate === targetDate ||
        item.createdAt.startsWith(targetDate);
    } else if (dateMode === "monthly") {
      const targetMonth = selectedMonth;
      matchesDate =
        item.preferredDate.startsWith(targetMonth) ||
        item.createdAt.startsWith(targetMonth);
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const exportCSV = () => {
    if (!filteredEnquiries.length) return;
    const headers = ["ID", "Name", "Age", "Phone", "Email", "Date", "Time", "Program", "Status", "CreatedAt"];
    const rows = filteredEnquiries.map((e) => [
      e._id,
      `"${e.name}"`,
      e.age,
      `"${e.phone}"`,
      `"${e.email}"`,
      e.preferredDate,
      `"${e.preferredTime}"`,
      `"${e.program}"`,
      e.status,
      e.createdAt
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    let filename = `perpex_enquiries_all_${todayStr}.csv`;
    if (dateMode === "daily") {
      filename = `perpex_enquiries_daily_${selectedDate}.csv`;
    } else if (dateMode === "monthly") {
      filename = `perpex_enquiries_monthly_${selectedMonth}.csv`;
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-[#fe9b19] border border-amber-500/20 text-xs font-bold uppercase tracking-wider">New</span>;
      case "contacted":
        return <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">Contacted</span>;
      case "scheduled":
        return <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">Scheduled</span>;
      case "enrolled":
        return <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/20 text-xs font-bold uppercase tracking-wider">Enrolled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold uppercase tracking-wider">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl shadow-xs border border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-[#fe9b19] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-time Lead Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Student Enquiries & Slots
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Filter, search, and export student consultation and interview bookings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchEnquiries}
            className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-all flex items-center justify-center"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          
          {/* Dynamic Export CSV Button */}
          <Button
            onClick={exportCSV}
            disabled={!filteredEnquiries.length}
            size="default"
            className="bg-slate-900 hover:bg-[#fe9b19] text-white font-bold rounded-2xl gap-2 shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>
              {dateMode === "daily" 
                ? "Export Daily CSV" 
                : dateMode === "monthly" 
                ? "Export Monthly CSV" 
                : "Export CSV"}
            </span>
          </Button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-[#fe9b19] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Total Enquiries</p>
            <h3 className="text-2xl font-black text-slate-900">{enquiries.length}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
            <Clock3 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">New Submissions</p>
            <h3 className="text-2xl font-black text-slate-900">
              {enquiries.filter((e) => e.status === "new").length}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Scheduled Slots</p>
            <h3 className="text-2xl font-black text-slate-900">
              {enquiries.filter((e) => e.status === "scheduled" || e.status === "enrolled").length}
            </h3>
          </div>
        </div>
      </div>

      {/* Date & Time Filter Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Frequency Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => updateUrlFilter("all")}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap ${
                dateMode === "all"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Time
            </button>

            <button
              onClick={() => updateUrlFilter("daily", todayStr)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                dateMode === "daily"
                  ? "bg-[#fe9b19] text-slate-950 font-bold shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Daily Filter</span>
            </button>

            <button
              onClick={() => updateUrlFilter("monthly", undefined, currentMonthStr)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                dateMode === "monthly"
                  ? "bg-blue-600 text-white font-bold shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Monthly Filter</span>
            </button>
          </div>

          {/* Active Date / Month Input Selector */}
          <div className="flex items-center gap-3">
            {dateMode === "daily" && (
              <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-2xl">
                <span className="text-xs font-bold text-[#fe9b19]">Select Date:</span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => updateUrlFilter("daily", e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 outline-none focus:border-[#fe9b19]"
                />
              </div>
            )}

            {dateMode === "monthly" && (
              <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-2xl">
                <span className="text-xs font-bold text-blue-600">Select Month:</span>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => updateUrlFilter("monthly", undefined, e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 outline-none focus:border-blue-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* Search & Status Filter Row */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student, phone, email..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:border-[#fe9b19] outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
            {["all", "new", "contacted", "scheduled", "enrolled"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-2xl text-[11px] font-extrabold uppercase tracking-wider transition-all whitespace-nowrap ${
                  statusFilter === st
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50/50 border-b border-slate-200/80 flex items-center justify-between">
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#fe9b19]" />
            <span>Showing {filteredEnquiries.length} of {enquiries.length} Enquiries</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">Student</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6">Program Track</th>
                <th className="py-4 px-6">Date & Time Slot</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Name & Age */}
                    <td className="py-4 px-6">
                      <div className="font-extrabold text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-400">Age: {item.age}</div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-6 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-800 text-xs font-semibold">
                        <Phone className="w-3.5 h-3.5 text-[#fe9b19]" />
                        <span>{item.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.email}</span>
                      </div>
                    </td>

                    {/* Program Track */}
                    <td className="py-4 px-6">
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold">
                        {item.program}
                      </span>
                    </td>

                    {/* Preferred Date & Time */}
                    <td className="py-4 px-6 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                        <span>{item.preferredDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.preferredTime}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Created At */}
                    <td className="py-4 px-6 text-xs text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-sm font-medium">
                    No student enquiries match your active filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AdminEnquiriesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-bold">Loading Admin Enquiries...</div>}>
      <EnquiriesContent />
    </Suspense>
  );
}
