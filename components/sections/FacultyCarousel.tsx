"use client";

import { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Award, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { MotionWrapper } from "@/components/MotionWrapper";
import { fallbackContent } from "@/lib/content";
import Link from "next/link";
import Image from "next/image";

export function FacultyCarousel() {
  const { faculty } = fallbackContent;
  
  // Triplicate the items so the auto-loop is completely seamless and never runs out of slides
  const duplicatedFaculty = [...faculty, ...faculty, ...faculty];

  const autoplayRef = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: true
    },
    [autoplayRef.current]
  );

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="faculty">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-amber-500/10 to-transparent blur-[100px] -z-10 pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        
        {/* Header with Navigation Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <MotionWrapper className="text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Meet Our <span className="text-[#fe9b19]">Expert Faculty</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl font-medium mt-2">
              Learn directly from experienced HR Leaders and Consultants working in premium MNCs.
            </p>
          </MotionWrapper>

          {/* Navigation Arrows */}
          <MotionWrapper delay={0.1} className="flex items-center gap-3 shrink-0">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </MotionWrapper>
        </div>

        {/* Carousel View */}
        <MotionWrapper delay={0.2} className="overflow-visible px-2 py-4" yOffset={20}>
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex touch-pan-y gap-6 px-4">
              {duplicatedFaculty.map((item, index) => (
                <div 
                  key={index} 
                  className="embla__slide flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_25%] min-w-0 pb-6"
                >
                  {/* Bezel Double-border Container */}
                  <div className="p-2 rounded-[38px] border border-slate-200/50 bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(254,155,25,0.12)] hover:border-amber-400 hover:-translate-y-2 transition-all duration-500 group">
                    <div className="relative h-[420px] rounded-[30px] overflow-hidden bg-slate-950 flex flex-col justify-end">
                      {/* Faculty Image */}
                      <Image 
                        src={item.photo} 
                        alt={item.name}
                        fill
                        className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                      
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />

                      {/* Content Area */}
                      <div className="relative z-20 p-6 flex flex-col h-full justify-end">
                        
                        {/* Top Experience Tag */}
                        <div className="absolute top-4 left-4 z-20">
                          <span className="inline-flex items-center gap-1 bg-slate-950/60 backdrop-blur-md text-amber-400 border border-white/10 text-[10px] font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                            <Award className="w-3.5 h-3.5" />
                            {item.experience.replace(" experience", "")}
                          </span>
                        </div>

                        {/* Name & Title */}
                        <div className="space-y-1 mb-6">
                          <h3 className="text-xl font-extrabold text-white tracking-tight drop-shadow-sm">
                            {item.name}
                          </h3>
                          <p className="text-xs font-semibold text-amber-400">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-350 font-medium">
                            @ {item.company}
                          </p>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-2">
                          <div className="flex items-center gap-1.5 text-slate-300 text-xs font-semibold">
                            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                            <span>HR Leader</span>
                          </div>

                          <Link 
                            href="#" 
                            className="px-4 py-2 bg-white text-slate-950 hover:bg-amber-400 hover:text-slate-950 text-xs font-bold rounded-full shadow-md transition-all duration-300 flex items-center gap-1.5 active:scale-95 cursor-pointer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                          </Link>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
