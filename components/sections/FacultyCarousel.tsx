"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { MotionWrapper } from "@/components/MotionWrapper";
import { Card, CardContent } from "@/components/ui/Card";
import { fallbackContent } from "@/lib/content";
import Link from "next/link";

export function FacultyCarousel() {
  const { faculty } = fallbackContent;
  
  // Triplicate the items so the auto-loop is completely seamless and never runs out of slides
  const duplicatedFaculty = [...faculty, ...faculty, ...faculty];

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: true
    },
    [Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="faculty">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-amber-500/10 to-transparent blur-[100px] -z-10 pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <MotionWrapper>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-slate-900 mb-16 tracking-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Expert Faculty</span>
          </h2>
        </MotionWrapper>

        <MotionWrapper delay={0.2} className="overflow-visible px-2 py-4" yOffset={20}>
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex touch-pan-y gap-6 px-4">
              {duplicatedFaculty.map((item, index) => (
                <div 
                  key={index} 
                  className="embla__slide flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_25%] min-w-0 pb-10"
                >
                  <Card className="h-full bg-white border border-slate-100 rounded-[32px] hover:-translate-y-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:shadow-amber-500/15 transition-all duration-500 group">
                    <CardContent className="p-8 flex flex-col items-center text-center relative h-full">
                      
                      {/* Avatar */}
                      <div className="w-24 h-24 rounded-[1.5rem] bg-slate-50 mb-6 overflow-hidden border-4 border-white shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-500">
                        <img 
                          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${item.name}&backgroundColor=fef3c7`} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <h3 className="text-xl font-extrabold text-slate-900 mb-1.5">{item.name}</h3>
                      <p className="text-amber-600 font-bold text-sm mb-1">{item.title}</p>
                      <p className="text-slate-500 font-medium text-sm mb-8">@ {item.company}</p>
                      
                      <div className="mt-auto w-full flex items-center justify-between pt-6 border-t border-slate-100">
                        <span className="inline-block bg-slate-50 text-slate-600 border border-slate-100 shadow-sm text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
                          {item.experience}
                        </span>
                        
                        <Link href="#" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-amber-100 flex items-center justify-center text-slate-400 hover:text-amber-600 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                        </Link>
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
