"use client";

import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { MotionWrapper } from "@/components/MotionWrapper";
import { CheckCircle2, Briefcase, GraduationCap, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function CourseHighlights() {
  const highlights = [
    {
      title: "100% Practical Training",
      description: "No boring theory. You will learn by doing actual HR tasks using tools like Zoho People, Keka, and Excel HR.",
      icon: <Briefcase className="w-8 h-8 text-slate-600" />,
      color: "bg-slate-100"
    },
    {
      title: "Live Industry Projects",
      description: "Handle real company cases, manage dummy payrolls, and resolve complex employee relations scenarios before you even graduate.",
      icon: <CheckCircle2 className="w-8 h-8 text-slate-600" />,
      color: "bg-slate-100"
    },
    {
      title: "Taught by Top HR Leaders",
      description: "Learn directly from professionals who are actively working in the industry as HR Managers, Talent Acquisition Leads, and HRBPs.",
      icon: <Users className="w-8 h-8 text-slate-600" />,
      color: "bg-slate-100"
    },
    {
      title: "Dedicated Placement Support",
      description: "Resume building, mock interviews, and direct referrals. We don't just teach you; we work to get you hired in top companies.",
      icon: <GraduationCap className="w-8 h-8 text-slate-600" />,
      color: "bg-slate-100"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative" id="highlights">
      <div className="container mx-auto px-4 md:px-6">
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Why Choose <span className="text-amber-500">PlaceX?</span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-2xl mx-auto">
            We bridge the gap between academic knowledge and industry expectations.
          </p>
        </MotionWrapper>

        <div className="max-w-4xl mx-auto flex flex-col pb-[20vh]">
          {highlights.map((item, index) => (
            <div 
              key={index}
              className="sticky transition-all duration-500 ease-in-out w-full"
              style={{ 
                top: `${100 + index * 40}px`, 
                zIndex: index + 10,
                marginTop: index === 0 ? '0' : (index === highlights.length - 1 ? '10vh' : '40vh')
              }}
            >
              <div className="bg-white rounded-3xl md:rounded-[40px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 md:p-12 w-full flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                <div className={`w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center shadow-sm ${item.color}`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <MotionWrapper delay={0.2} yOffset={20} className="flex justify-center mt-8 relative z-50">
          <Link href="/schedule">
            <Button size="lg" className="flex items-center gap-2 bg-slate-900 hover:bg-amber-500 text-white px-8 h-14 rounded-full font-bold transition-colors">
              <span>Book a Free Demo</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </MotionWrapper>

      </div>
    </section>
  );
}
