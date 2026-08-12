"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

import { useBooking } from "@/components/BookingContext";

export function MobileStickyCTA() {
  const { openBookingModal } = useBooking();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show after scrolling past hero (approx 600px), hide near bottom (final CTA)
    const pageHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollBottom = pageHeight - (latest + windowHeight);
    
    if (latest > 600 && scrollBottom > 600) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/90 backdrop-blur-md border-t border-[var(--color-border-divider)] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden"
    >
      <Button 
        onClick={() => openBookingModal()}
        size="lg" 
        className="w-full text-base group"
      >
        Book Free Demo
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
}
