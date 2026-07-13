"use client";

import { useState, useRef, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
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
}

// Sub-component for individual Video Testimonial Card with Hover Playback Preview
function VideoCard({
  item,
  isPlaying,
  onPlay,
  onStop,
}: {
  item: VideoTestimonial;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay preview blocked or failed:", err);
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay();
  };

  const handleStopClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStop();
  };

  return (
    <div
      className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-slate-100 hover:border-amber-400 group cursor-pointer transition-all duration-500 bg-slate-950"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={!isPlaying ? handlePlayClick : undefined}
    >
      {isPlaying ? (
        <div className="absolute inset-0 w-full h-full z-20">
          <video
            src={item.videoUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Close button to stop video and return to card */}
          <button
            onClick={handleStopClick}
            className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-slate-950/80 text-white flex items-center justify-center border border-white/20 hover:bg-slate-800 transition-colors shadow-lg"
            aria-label="Stop video"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          {/* Video Element for Hover Preview */}
          <video
            ref={videoRef}
            src={item.videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
          />

          {/* Dark overlay & contents */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-between p-6 md:p-8 z-10">
            {/* Top Badges */}
            <div className="flex justify-between items-start gap-2">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-3.5 py-1.5 rounded-full shadow-lg">
                {item.tag}
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-slate-200 bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                {item.batch}
              </span>
            </div>

            {/* Play Button Icon Overlay (grows and animates on hover) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-amber-400 transition-all duration-500 animate-pulse group-hover:animate-none">
                <Play className="w-7 h-7 fill-slate-950 translate-x-0.5" />
              </div>
            </div>

            {/* Bottom Details */}
            <div className="space-y-2 mt-auto">
              <h4 className="text-lg md:text-xl font-extrabold text-white tracking-tight drop-shadow-md">
                {item.name}
              </h4>
              <p className="text-xs md:text-sm font-medium text-slate-200">
                {item.role} @ <span className="text-amber-400 font-bold">{item.company}</span>
              </p>
              <p className="text-[11px] md:text-xs text-slate-300 line-clamp-2 leading-relaxed italic opacity-90">
                &quot;{item.quote}&quot;
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function TestimonialsCarousel() {
  const { videoTestimonials } = fallbackContent as {
    videoTestimonials: VideoTestimonial[];
  };

  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [autoplayRef.current]
  );

  const hasStoppedRef = useRef(false);

  // Stop autoplay when a video is playing, resume when stopped
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins().autoplay;
    if (!autoplay) return;

    if (activePlayingId) {
      autoplay.stop();
      hasStoppedRef.current = true;
    } else if (hasStoppedRef.current) {
      autoplay.play();
      hasStoppedRef.current = false;
    }
  }, [activePlayingId, emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="testimonials">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header with Navigation Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <MotionWrapper className="text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Hear From Our <span className="text-[#fe9b19]">Students</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl font-medium">
              See how students switch careers and land high-paying roles in top companies through PerpeX.
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

        {/* Video Stories Carousel */}
        <MotionWrapper delay={0.2} className="overflow-visible py-4">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex touch-pan-y gap-6 px-4">
              {videoTestimonials.map((item) => (
                <div
                  key={item.id}
                  className="embla__slide flex-[0_0_85%] sm:flex-[0_0_48%] lg:flex-[0_0_31%] xl:flex-[0_0_24%] min-w-0"
                >
                  <VideoCard
                    item={item}
                    isPlaying={activePlayingId === item.id}
                    onPlay={() => setActivePlayingId(item.id)}
                    onStop={() => setActivePlayingId(null)}
                  />
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
