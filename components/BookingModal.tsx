"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCircle2, CalendarPlus, Loader2 } from "lucide-react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/Button";

const TIME_SLOTS = [
  "10:00 AM - 11:00 AM",
  "11:30 AM - 12:30 PM",
  "02:00 PM - 03:00 PM",
  "04:00 PM - 05:00 PM",
  "06:00 PM - 07:00 PM"
];

export function BookingModal() {
  const { isOpen, selectedProgram, closeBookingModal } = useBooking();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    program: ""
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [calendarUrl, setCalendarUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Sync selectedProgram when modal opens
  useEffect(() => {
    if (selectedProgram) {
      setFormData((prev) => ({ ...prev, program: selectedProgram }));
    }
  }, [selectedProgram]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSubmitted(false);
        setErrorMsg("");
        setLoading(false);
        setCalendarUrl("");
        setFormData({
          name: "",
          age: "",
          phone: "",
          email: "",
          date: "",
          time: "",
          program: selectedProgram || ""
        });
      }, 300);
    }
  }, [isOpen, selectedProgram]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.time) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const submissionData = {
      ...formData,
      program: selectedProgram || formData.program || "Practical HR Management & Payroll"
    };

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setCalendarUrl(data.calendarUrl || "#");
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBookingModal}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Container matching reference image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.35 }}
            className="relative w-full max-w-md bg-white rounded-[28px] shadow-2xl p-6 sm:p-7 border border-slate-200 z-10 my-auto"
          >
            {!submitted ? (
              <div>
                {/* Header row with single-line Title and Close Button */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <h3 className="text-lg sm:text-[21px] font-black tracking-tight text-slate-900 whitespace-nowrap">
                    Book Your <span className="text-[#fe9b19]">Interview Slot</span>
                  </h3>
                  <button
                    onClick={closeBookingModal}
                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center text-sm font-bold transition-all shrink-0"
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>

                {errorMsg && (
                  <div className="mb-4 p-3.5 bg-red-50 text-red-600 text-xs font-semibold rounded-2xl border border-red-100">
                    {errorMsg}
                  </div>
                )}

                {/* Form Fields matching project UI styling */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Name Input */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium placeholder:text-slate-400 placeholder:font-medium placeholder:text-sm focus:bg-white focus:border-[#fe9b19] focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Age Input */}
                  <div>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Age"
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium placeholder:text-slate-400 placeholder:font-medium placeholder:text-sm focus:bg-white focus:border-[#fe9b19] focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Phone Number Input */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      required
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium placeholder:text-slate-400 placeholder:font-medium placeholder:text-sm focus:bg-white focus:border-[#fe9b19] focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium placeholder:text-slate-400 placeholder:font-medium placeholder:text-sm focus:bg-white focus:border-[#fe9b19] focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                        className={`w-full px-3.5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium focus:bg-white focus:border-[#fe9b19] focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-sans cursor-pointer ${
                          formData.date ? "text-slate-800" : "text-slate-400"
                        }`}
                      />
                    </div>

                    <div>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className={`w-full px-3.5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium focus:bg-white focus:border-[#fe9b19] focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-sans cursor-pointer ${
                          formData.time ? "text-slate-800" : "text-slate-400"
                        }`}
                      >
                        <option value="" disabled className="text-slate-400">Select Time</option>
                        {TIME_SLOTS.map((slot, i) => (
                          <option key={i} value={slot} className="text-slate-800">
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit Button matching project UI Button design */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="w-full"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting...</span>
                        </span>
                      ) : (
                        <span>Submit</span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              /* Success Screen matching project UI */
              <div className="p-4 text-center">
                <div className="w-16 h-16 bg-amber-500/10 text-[#fe9b19] rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-500/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-1">
                  Slot Reserved Successfully! 🎉
                </h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto mb-5 font-medium">
                  Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Your interview enquiry has been logged.
                </p>

                {/* Appointment Detail Summary */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left mb-5 space-y-2 text-xs font-semibold text-slate-800">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#fe9b19]" />
                    <span>Date: {formData.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#fe9b19]" />
                    <span>Time: {formData.time}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <a
                    href={calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-full shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all text-sm"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    <span>Add to Google Calendar</span>
                  </a>

                  <button
                    onClick={closeBookingModal}
                    className="w-full py-2.5 text-slate-500 hover:text-slate-900 text-xs font-bold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
