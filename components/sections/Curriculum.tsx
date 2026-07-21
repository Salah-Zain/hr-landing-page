"use client";

import { ClipboardList, Coins, MonitorSmartphone, BarChart3, MessageSquare, Building2, ArrowRight } from "lucide-react";
import { MotionWrapper } from "@/components/MotionWrapper";
import { Button } from "@/components/ui/Button";
import { fallbackContent } from "@/lib/content";

const iconMap: Record<string, React.ElementType> = {
  ClipboardList,
  Coins,
  MonitorSmartphone,
  BarChart3,
  MessageSquare,
  Building2
};

export function Curriculum() {
  const { curriculum } = fallbackContent;

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">
            What You&apos;ll <span className="text-[#fe9b19]">Master</span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-2xl mx-auto">
            6 industry-mapped modules built for real HR roles.
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-20">
          {curriculum.map((module, index) => {
            const Icon = iconMap[module.icon] || ClipboardList;
            
            return (
              <MotionWrapper key={index} delay={0.1 * index} yOffset={20}>
                <div className="h-full bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/80 transition-all duration-300 ease-out flex flex-col justify-start">
                  
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 sm:mb-8 shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                  </div>
                  
                  <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-2 tracking-tight">
                    {module.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    {module.description}
                  </p>
                </div>
              </MotionWrapper>
            );
          })}
        </div>

        <MotionWrapper delay={0.6} className="text-center">
          <a href="#pricing">
            <Button size="lg" className="w-full sm:w-auto group">
              <span>View Full Syllabus</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </MotionWrapper>
      </div>
    </section>
  );
}
