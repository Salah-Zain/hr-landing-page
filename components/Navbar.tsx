"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { name: "About", href: "#program" },
  { name: "Program", href: "#faculty" },
  { name: "Testimonials", href: "#testimonials" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    lastScrollY.current = latest;
    
    // Check if scrolled down for styling
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide/Show logic
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Show when scrolling stops
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setHidden(false);
    }, 400); // Show navbar 400ms after scrolling stops
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-150%" },
        }}
        animate={hidden && !isMobileMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed inset-x-0 z-50 mx-auto transition-all duration-300 px-4 md:px-0",
          isScrolled ? "top-4 max-w-5xl" : "top-0 max-w-7xl"
        )}
      >
        <div className={cn(
          "mx-auto flex items-center justify-between transition-all duration-300",
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full h-16 px-6 md:px-8" 
            : "bg-transparent h-24 px-4 md:px-8"
        )}>
          {/* Logo */}
          <a href="#" className="text-2xl font-black tracking-tighter text-slate-900 flex items-center gap-1 group">
            Place<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 group-hover:from-orange-500 group-hover:to-amber-500 transition-all duration-500">X</span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 px-4 py-2 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <a href="#pricing">
              <Button size="sm" className="px-6 h-10 rounded-full hover:scale-105 transition-transform shadow-md shadow-amber-500/20 ml-2">
                Book Free Demo
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              "md:hidden p-2 rounded-full transition-colors",
              isScrolled ? "hover:bg-slate-100" : "hover:bg-slate-100/50"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="text-slate-900" size={24} /> : <Menu className="text-slate-900" size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-24 z-40 bg-white/95 backdrop-blur-2xl md:hidden rounded-3xl shadow-[0_20px_40px_rgb(0,0,0,0.1)] border border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-2">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-bold text-slate-800 p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-slate-100">
                <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button size="lg" className="w-full h-14 rounded-2xl text-lg shadow-lg shadow-amber-500/20">
                    Book Free Demo
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
