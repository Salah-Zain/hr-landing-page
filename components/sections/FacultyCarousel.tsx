"use client";

import { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { MotionWrapper } from "@/components/MotionWrapper";
import { fallbackContent } from "@/lib/content";
import Image from "next/image";

export function FacultyCarousel() {
  const { faculty } = fallbackContent;

  // Triplicate the items so the auto-loop is completely seamless and never runs out of slides
  const duplicatedFaculty = [...faculty, ...faculty, ...faculty];

  const autoplayRef = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: true
    },
    [autoplayRef.current]
  );

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="faculty">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-amber-500/10 to-transparent blur-[100px] -z-10 pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 md:px-6 relative z-20">

        {/* Centered Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <MotionWrapper className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Meet Our <span className="text-[#fe9b19]">Expert Faculty</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Master real-world HR skills with guidance from corporate HR executives and consultants.
            </p>
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
                  {/* Full Width & Height Card Container */}
                  <div className="relative h-[440px] rounded-[32px] overflow-hidden bg-slate-950 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(254,155,25,0.2)] border border-slate-200/60 hover:border-amber-400 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-end">
                    {/* Faculty Image - Zoomed to fill full width & height */}
                    <Image
                      src={item.photo}
                      alt={item.name}
                      fill
                      className="object-cover object-center scale-[1.85] origin-center opacity-100 group-hover:scale-[1.95] transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 350px"
                    />

                    {/* Dark Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />

                      {/* Content Area - Aligned Side-by-Side */}
                      <div className="relative z-20 p-6 flex items-end justify-between gap-3 w-full mt-auto">
                        {/* Left: Name, Title & Company */}
                        <div className="space-y-1 min-w-0 flex-1">
                          <h3 className="text-xl font-extrabold text-white tracking-tight drop-shadow-sm truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs font-semibold text-amber-400 truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-300 font-medium truncate">
                            @ {item.company}
                          </p>
                        </div>

                        {/* Right: LinkedIn Badge */}
                        <a
                          href="#"
                          className="px-3.5 py-2 bg-white text-slate-950 hover:bg-amber-400 hover:text-slate-950 text-xs font-bold rounded-full shadow-md transition-all duration-300 flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0 mb-0.5"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          <span>LinkedIn</span>
                        </a>
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
