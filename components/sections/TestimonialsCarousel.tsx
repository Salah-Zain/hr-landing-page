"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import { MotionWrapper } from "@/components/MotionWrapper";
import { fallbackContent } from "@/lib/content";

interface VideoTestimonial {
  id: string;
  name: string;
  batch: string;
  company: string;
  role: string;
  quote: string;
  tag: string;
  videoUrl: string;
  instagramUrl: string;
}

// Sub-component for individual Video Testimonial Card with Hover Playback Preview
function VideoCard({ item }: { item: VideoTestimonial }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay preview blocked or failed:", err);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <a
      href={item.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-slate-100 hover:border-amber-400 group cursor-pointer transition-all duration-500 bg-slate-950"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Element for Hover Preview */}
      <video
        ref={videoRef}
        src={`${item.videoUrl}#t=0.1`}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
      />

      {/* Dark overlay & contents */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-6 md:p-8 z-10">
        {/* Play Button Icon Overlay (grows and animates on hover) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-amber-400 transition-all duration-500 animate-pulse group-hover:animate-none">
            <Play className="w-7 h-7 fill-slate-950 translate-x-0.5" />
          </div>
        </div>
      </div>
    </a>
  );
}

export function TestimonialsCarousel() {
  const { videoTestimonials } = fallbackContent as {
    videoTestimonials: VideoTestimonial[];
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="testimonials">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Centered Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <MotionWrapper className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Hear From Our <span className="text-[#fe9b19]">Students</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              See how students switch careers and land high-paying roles in top companies through PerpeX.
            </p>
          </MotionWrapper>
        </div>

        {/* Video Stories Grid */}
        <MotionWrapper delay={0.2} className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {videoTestimonials.map((item) => (
              <VideoCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
