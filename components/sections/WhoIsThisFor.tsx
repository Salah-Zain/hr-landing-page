"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  Building, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { MotionWrapper } from "@/components/MotionWrapper";
import { Button } from "@/components/ui/Button";

const AUTO_PLAY_DURATION = 5000; // 5 seconds per tab

export function WhoIsThisFor() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const steps = [
    { 
      icon: GraduationCap, 
      label: "Fresh Graduate", 
      tagline: "Career Launcher",
      desc: "Start your career right. Transition smoothly from campus to corporate with practical, hands-on HR training that makes you immediately employable in top companies.",
      highlights: [
        "Campus-to-Corporate Readiness",
        "Practical HR Tools Training",
        "100% Placement & Resume Support"
      ]
    },
    { 
      icon: Briefcase, 
      label: "Working Professional", 
      tagline: "Career Switcher",
      desc: "Switch to HR seamlessly. Leverage your existing workplace experience and pivot into a rewarding, high-growth HR career with our targeted industry curriculum.",
      highlights: [
        "Transferable Skill Mapping",
        "Targeted Industry Curriculum",
        "Fast-Track Career Transition"
      ]
    },
    { 
      icon: TrendingUp, 
      label: "HR Executive", 
      tagline: "Career Accelerator",
      desc: "Upskill and get promoted. Master advanced tools like Zoho, Keka, and Excel HR to take on strategic leadership roles with complete confidence.",
      highlights: [
        "Advanced HR Tools (Zoho, Keka)",
        "Strategic Leadership & Payroll",
        "Salary & Role Escalation"
      ]
    },
    { 
      icon: Building, 
      label: "Business Owner", 
      tagline: "System Builder",
      desc: "Manage your team better. Learn core HR compliance, payroll management, and effective employee relations to scale your business smoothly.",
      highlights: [
        "Core Statutory Compliance",
        "In-House Payroll Control",
        "Team Retention & Scaling"
      ]
    }
  ];

  // Auto-scrolling mobile active tab into view
  useEffect(() => {
    const activeTab = tabsRef.current[activeIndex];
    if (activeTab) {
      activeTab.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }
  }, [activeIndex]);

  // Sequential step advancement timer (0 -> 1 -> 2 -> 3 -> 0)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, AUTO_PLAY_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, steps.length]);

  // Smooth progress bar driver synchronized with activeIndex
  useEffect(() => {
    if (isPaused) return;

    setProgress(0);
    const startTime = Date.now();

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / AUTO_PLAY_DURATION) * 100, 100);
      setProgress(pct);
    }, 40);

    return () => clearInterval(progressTimer);
  }, [activeIndex, isPaused]);

  const handleTabClick = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  return (
    <section className="bg-slate-50/70 py-16 md:py-24 relative overflow-hidden" id="program">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-200/30 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-200/30 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <MotionWrapper className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-[#fe9b19] text-xs sm:text-sm font-bold mb-4 border border-amber-500/20">
            <Sparkles className="w-4 h-4 text-[#fe9b19]" />
            <span>Designed For Your Career Stage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight lang-ml">
            ഈ PROGRAM <span className="text-[#fe9b19]">ആർക്കൊക്കെ വേണ്ടിയാണ്?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            This program is crafted for individuals who are ready to take the next step in their career.
          </p>
        </MotionWrapper>

        {/* Interactive Showcase Container */}
        <div 
          className="max-w-6xl mx-auto bg-white rounded-3xl md:rounded-[36px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          
          {/* Mobile Tabs Header (Horizontal Scroll) */}
          <div className="md:hidden bg-slate-50 border-b border-slate-100 p-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {steps.map((step, idx) => {
              const isActive = activeIndex === idx;
              const Icon = step.icon;
              return (
                <button
                  key={idx}
                  ref={(el) => { tabsRef.current[idx] = el; }}
                  onClick={() => handleTabClick(idx)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 shrink-0 relative ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${isActive ? "bg-slate-100 text-slate-800" : "bg-slate-100/60 text-slate-400"}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="whitespace-nowrap">{step.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabUnderlineMobile"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#fe9b19] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row min-h-[480px]">
            
            {/* Desktop Left Sidebar Tabs */}
            <div className="hidden md:flex md:w-[36%] lg:w-[32%] bg-slate-50/80 border-r border-slate-100 p-3 lg:p-5 flex-col justify-center gap-2.5">
              {steps.map((step, idx) => {
                const isActive = activeIndex === idx;
                const Icon = step.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleTabClick(idx)}
                    className={`group relative flex items-center gap-3.5 p-3.5 lg:p-4 rounded-2xl text-left transition-all duration-300 w-full overflow-hidden ${
                      isActive
                        ? "bg-white shadow-md shadow-slate-200/60 text-slate-900 border border-slate-200/80"
                        : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-900 border border-transparent"
                    }`}
                  >
                    {/* Active Accent Bar Left */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#fe9b19]" />
                    )}

                    {/* Active Auto-play Progress Line at Bottom */}
                    {isActive && !isPaused && (
                      <div 
                        className="absolute bottom-0 left-0 h-[2.5px] bg-[#fe9b19] transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    )}

                    <div className={`w-10 h-10 lg:w-11 lg:h-11 shrink-0 rounded-xl flex items-center justify-center transition-transform duration-300 ${isActive ? "bg-slate-100 text-slate-800 scale-105" : "bg-slate-100 text-slate-400 group-hover:scale-105"}`}>
                      <Icon className="w-5 h-5 lg:w-5 lg:h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-xs font-extrabold uppercase tracking-wider ${isActive ? "text-slate-600" : "text-slate-400"}`}>
                          Step 0{idx + 1}
                        </span>
                      </div>
                      <h4 className={`font-extrabold text-sm lg:text-base leading-snug truncate ${isActive ? "text-slate-900" : "text-slate-600"}`}>
                        {step.label}
                      </h4>
                    </div>

                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? "text-[#fe9b19] translate-x-0.5" : "text-slate-300 opacity-0 group-hover:opacity-100"}`} />
                  </button>
                );
              })}
            </div>

            {/* Content Display Area */}
            <div className="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-between bg-white relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full flex-1 flex flex-col justify-between relative z-10"
                >
                  {/* Floating Subtle Background Icon */}
                  <div className="absolute -right-8 -bottom-8 opacity-[0.03] pointer-events-none transform rotate-12 select-none">
                    {(() => {
                      const ActiveIcon = steps[activeIndex].icon;
                      return <ActiveIcon className="w-[320px] h-[320px] text-slate-900" />;
                    })()}
                  </div>

                  <div>
                    {/* Header Pill & Step Number */}
                    <div className="flex items-center gap-3.5 mb-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                        {(() => {
                          const ActiveIcon = steps[activeIndex].icon;
                          return <ActiveIcon className="w-6 h-6 sm:w-7 sm:h-7" />;
                        })()}
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                          {steps[activeIndex].label}
                        </h3>
                      </div>
                    </div>

                    {/* Main Description */}
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mb-8 max-w-2xl">
                      {steps[activeIndex].desc}
                    </p>

                    {/* Highlight Outcomes / Bullet Points */}
                    <div className="space-y-3 mb-8 max-w-xl">
                      <h5 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-3">
                        Key Program Highlights
                      </h5>
                      {steps[activeIndex].highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-slate-800 text-sm sm:text-base font-semibold">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Centered Footer Action Button & Step Indicator */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col items-center justify-center text-center gap-3 w-full">
                    <a href="#pricing" className="w-full sm:w-auto flex justify-center">
                      <Button size="default" className="w-full sm:w-auto px-10">
                        <span>Enroll For This Track</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <span>Step {activeIndex + 1} of {steps.length}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span>Click any role to explore</span>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
