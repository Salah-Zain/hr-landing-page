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
                  <div className="relative h-[360px] rounded-[32px] overflow-hidden bg-slate-950 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(254,155,25,0.2)] hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-end">
                    {/* Faculty Image - Fitted with subtle hover zoom */}
                    <Image
                      src={item.photo}
                      alt={item.name}
                      fill
                      className="object-cover object-top scale-100 origin-center opacity-100 group-hover:scale-105 transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 350px"
                    />

                    {/* Dark Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />

                      {/* Content Area */}
                      <div className="relative z-20 p-5 sm:p-6 w-full mt-auto">
                        {/* Name, Title & Company */}
                        <div className="space-y-1">
                          <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight drop-shadow-sm leading-tight break-words">
                            {item.name}
                          </h3>
                          <p className="text-xs font-semibold text-amber-400 leading-snug">
                            {item.title}
                          </p>
                          {item.company && (
                            <p className="text-xs text-slate-300 font-medium">
                              {item.company.includes("@") ? item.company : `@ ${item.company}`}
                            </p>
                          )}
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
