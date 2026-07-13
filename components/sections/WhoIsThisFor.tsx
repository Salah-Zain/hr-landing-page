"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { GraduationCap, Briefcase, TrendingUp, Building, ChevronRight } from "lucide-react";
import { MotionWrapper } from "@/components/MotionWrapper";

export function WhoIsThisFor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const steps = [
    { 
      icon: GraduationCap, 
      label: "Fresh Graduate", 
      desc: "Start your career right. Transition smoothly from campus to corporate with practical, hands-on HR training that makes you immediately employable in top companies.",
      color: "from-amber-400 to-orange-500",
      bgLight: "bg-amber-50"
    },
    { 
      icon: Briefcase, 
      label: "Working Professional", 
      desc: "Switch to HR seamlessly. Leverage your existing experience and pivot into a rewarding, high-growth HR career with our targeted industry curriculum.",
      color: "from-blue-400 to-indigo-500",
      bgLight: "bg-blue-50"
    },
    { 
      icon: TrendingUp, 
      label: "HR Executive", 
      desc: "Upskill and get promoted. Master advanced tools like Zoho, Keka, and Excel HR to take on strategic leadership roles with complete confidence.",
      color: "from-emerald-400 to-teal-500",
      bgLight: "bg-emerald-50"
    },
    { 
      icon: Building, 
      label: "Business Owner", 
      desc: "Manage your team better. Learn core HR compliance, payroll management, and effective employee relations to scale your business smoothly.",
      color: "from-purple-400 to-pink-500",
      bgLight: "bg-purple-50"
    }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      steps.length - 1,
      Math.max(0, Math.floor(latest * (steps.length + 1)))
    );
    setActiveIndex(index);
  });

  return (
    <section className="bg-slate-50 relative md:h-[300vh]" id="program" ref={containerRef}>
      <div className="md:sticky md:top-0 md:h-screen w-full flex flex-col items-center justify-center md:overflow-hidden">
        
        <div className="container mx-auto px-4 md:px-6 w-full h-full flex flex-col justify-center py-6 md:py-8 lg:py-12">
          <MotionWrapper className="text-center mb-6 md:mb-8 shrink-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6 tracking-tight lang-ml">
              ഈ PROGRAM <span className="text-[#fe9b19]">ആർക്കൊക്കെ വേണ്ടിയാണ്?</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-medium lang-ml">
              ജീവിതത്തിൽ അടുത്ത ഘട്ടത്തിലേക്ക് കടക്കാൻ തയ്യാറുള്ളവർക്കായി തയ്യാറാക്കിയ പ്രോഗ്രാമാണിത്.
            </p>
          </MotionWrapper>

          <div className="max-w-6xl w-full mx-auto relative z-10 flex-1 h-auto md:h-full md:max-h-[75vh] min-h-[450px] md:min-h-[400px] lg:min-h-[500px] mb-12 md:mb-0">
            {/* Main Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[32px] md:rounded-[40px] shadow-2xl shadow-slate-200/60 border border-white/60 overflow-hidden flex flex-col md:flex-row relative h-auto md:h-full">
              
              {/* Sidebar Tabs */}
              <div className="md:w-[35%] lg:w-[32%] bg-slate-50/80 border-b md:border-b-0 md:border-r border-slate-100 p-2 md:p-3 lg:p-6 flex flex-row md:flex-col items-center md:items-stretch gap-2 md:gap-2 lg:gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar relative z-20 h-20 md:h-full flex-none">
                {steps.map((step, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`flex items-center gap-3 px-3 md:px-4 lg:px-5 rounded-2xl text-left transition-all duration-300 shrink-0 md:shrink w-[200px] md:w-full h-12 md:h-auto md:py-3 lg:py-5 relative overflow-hidden ${
                        isActive 
                          ? "bg-white shadow-md shadow-slate-200/50 text-slate-900 border border-slate-100" 
                          : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-900 border border-transparent"
                      }`}
                    >
                      {/* Active Indicator Line */}
                      {isActive && (
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${step.color} rounded-l-2xl`} />
                      )}
                      
                      <div className={`w-8 h-8 md:w-8 md:h-8 lg:w-12 lg:h-12 shrink-0 rounded-xl flex items-center justify-center transition-colors duration-300 ${isActive ? `${step.bgLight} text-slate-900` : "bg-slate-100 text-slate-400"}`}>
                        <step.icon className="w-4 h-4 md:w-4 md:h-4 lg:w-6 lg:h-6" />
                      </div>
                      <span className={`font-bold text-sm lg:text-lg whitespace-nowrap md:whitespace-normal transition-colors duration-300 ${isActive ? "text-slate-900" : ""}`}>
                        {step.label}
                      </span>
                      {isActive && (
                        <ChevronRight className="w-5 h-5 ml-auto hidden md:block text-slate-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Content Area */}
              <div className="md:w-[65%] lg:w-[68%] p-6 md:p-8 lg:p-20 flex-1 h-auto md:h-full flex flex-col justify-start md:justify-center bg-white relative overflow-hidden">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full relative z-10 flex flex-col justify-start md:justify-center h-auto md:h-full py-4 md:py-0"
                  >
                    {/* Massive Floating Background Icon */}
                    <div className="absolute -right-10 -bottom-10 opacity-[0.03] pointer-events-none transform rotate-12">
                      {(() => {
                        const ActiveIcon = steps[activeIndex].icon;
                        return <ActiveIcon className="w-[400px] h-[400px] text-slate-900" />;
                      })()}
                    </div>

                    <div className="relative z-10 max-w-2xl">
                      <div className="flex items-center gap-5 mb-8">
                        <div className={`w-16 h-16 xl:w-20 xl:h-20 rounded-3xl bg-gradient-to-br ${steps[activeIndex].color} flex items-center justify-center shadow-lg shadow-slate-200 shrink-0 text-white`}>
                          {(() => {
                            const ActiveIcon = steps[activeIndex].icon;
                            return <ActiveIcon className="w-8 h-8 xl:w-10 xl:h-10" />;
                          })()}
                        </div>
                        <div className={`px-4 py-1.5 rounded-full ${steps[activeIndex].bgLight} text-slate-700 text-xs sm:text-sm font-extrabold tracking-widest uppercase border border-white shrink-0 shadow-sm`}>
                          Step 0{activeIndex + 1}
                        </div>
                      </div>
                      
                      <h3 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                        {steps[activeIndex].label}
                      </h3>
                      <p className="text-lg xl:text-xl text-slate-500 leading-relaxed font-medium">
                        {steps[activeIndex].desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
