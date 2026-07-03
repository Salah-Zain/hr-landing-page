"use client";

import { MotionWrapper } from "@/components/MotionWrapper";
import { Accordion } from "@/components/ui/Accordion";
import { fallbackContent } from "@/lib/content";

export function FAQ() {
  const { faq } = fallbackContent;

  return (
    <section className="py-24 bg-transparent relative">
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">Questions</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Everything you need to know about the PerpeX HR program.
          </p>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <Accordion items={faq} />
        </MotionWrapper>
      </div>
    </section>
  );
}
