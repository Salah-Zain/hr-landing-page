"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { MotionWrapper } from "@/components/MotionWrapper";
import { fallbackContent } from "@/lib/content";

const rotatingWords = ["START", "UPSKILL", "LEAD"];

export function Hero() {
  const { sub, body, cta1 } = fallbackContent.hero;
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridBackground.png')] w-full bg-no-repeat bg-cover bg-center pt-40 pb-44 flex flex-col items-center justify-center min-h-screen -mt-20">

        <MotionWrapper delay={0.2} yOffset={20}>
          <h1 className="text-5xl sm:text-6xl md:text-[64px] lg:text-[72px] font-extrabold max-w-[1000px] text-center mx-auto mt-10 text-slate-900 leading-[1.1] tracking-tight px-4" style={{ fontFamily: "var(--font-title-en), var(--font-title-ml), sans-serif" }}>
            <span className="italic">HR Career</span>{" "}
            <br className="block sm:hidden" />
            <span className="inline-grid [grid-template-areas:'text'] justify-start items-center italic">
              {/* Invisible spacer using the longest word to reserve exact width and prevent jitter */}
              <span className="invisible pointer-events-none [grid-area:text]">
                UPSKILL
              </span>
              
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: 90 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                  className="[grid-area:text] text-[#fe9b19] origin-bottom w-full text-left"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br className="block sm:hidden" />
            <br className="hidden sm:block" />{" "}
            ചെയ്യുവാൻ <span className="italic">Ready</span>
            <br />
            ആണോ?
          </h1>
        </MotionWrapper>

        <MotionWrapper delay={0.4} yOffset={20}>
          <h2 className="text-lg md:text-2xl font-bold text-center mx-auto mt-8 text-slate-800" style={{ fontFamily: "var(--font-title-en), var(--font-title-ml), sans-serif" }}>
            {sub}
          </h2>
        </MotionWrapper>

        <MotionWrapper delay={0.5} yOffset={20}>
          <p className="text-sm md:text-lg mx-auto max-w-2xl text-center mt-6 max-md:px-4 text-slate-600 font-medium leading-relaxed" style={{ fontFamily: "var(--font-body-en), var(--font-body-ml), sans-serif" }}>
            {body}
          </p>
        </MotionWrapper>

        <MotionWrapper delay={0.6} yOffset={20}>
          <div className="mx-auto w-full flex items-center justify-center mt-10">
            <Link href="/schedule">
              <Button size="lg" className="group">
                <span>{cta1}</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </MotionWrapper>
      </section>
    </>
  );
}
