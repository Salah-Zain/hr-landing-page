"use client";

import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, Quote } from "lucide-react";
import { MotionWrapper } from "@/components/MotionWrapper";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { fallbackContent } from "@/lib/content";

const tabs = ["Video Testimonials", "Success Stories", "Placement Experiences"];

export function TestimonialsCarousel() {
  const { testimonials } = fallbackContent;
  const [activeTab, setActiveTab] = useState(tabs[1]);

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="testimonials">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        <MotionWrapper className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Hear From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Students</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            See how students from different backgrounds started their HR careers through PlaceX.
          </p>
        </MotionWrapper>

        {/* Premium Toggles */}
        <MotionWrapper delay={0.2} className="flex justify-center mb-16">
          <div className="inline-flex bg-slate-200/50 p-1.5 rounded-full border border-slate-200 shadow-sm overflow-x-auto max-w-full no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap",
                  activeTab === tab 
                    ? "bg-slate-900 text-white shadow-md" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </MotionWrapper>

        {/* Carousel */}
        <MotionWrapper delay={0.3} className="overflow-visible py-4">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex touch-pan-y gap-6 px-4">
              {/* Duplicating for infinite smooth loop */}
              {[...testimonials, ...testimonials, ...testimonials].map((item, index) => (
                <div 
                  key={index} 
                  className="embla__slide flex-[0_0_90%] md:flex-[0_0_50%] lg:flex-[0_0_40%] xl:flex-[0_0_33%] min-w-0"
                >
                  <Card className="h-full bg-white border border-slate-100 rounded-[32px] md:rounded-[40px] hover:-translate-y-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 relative overflow-hidden group">
                    <Quote className="absolute top-8 left-8 w-20 h-20 text-slate-100 -z-10 group-hover:text-amber-50 transition-colors duration-500" />
                    <CardContent className="p-8 md:p-10 relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                        ))}
                      </div>
                      <p className="text-slate-700 text-lg md:text-xl mb-10 leading-relaxed font-medium flex-1">
                        &quot;{item.quote}&quot;
                      </p>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-auto gap-4 pt-6 border-t border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${item.name}&backgroundColor=f1f5f9`} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-base">{item.name}</h4>
                            <p className="text-sm text-slate-500 font-medium mt-0.5">{item.batch} • {item.company}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-50 text-amber-600 border border-amber-200/50 px-4 py-2 rounded-full whitespace-nowrap">
                          {item.tag}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>

      </div>
    </section>
  );
}
