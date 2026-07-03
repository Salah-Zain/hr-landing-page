"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export function AccordionItem({ question, answer, isOpen, onClick }: AccordionItemProps) {
  return (
    <div 
      className={cn(
        "rounded-2xl border border-gray-200 transition-all duration-300 overflow-hidden",
        isOpen 
          ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] shadow-gray-400/10" 
          : "bg-white/60 backdrop-blur-md hover:bg-white/80"
      )}
    >
      <button
        className="flex w-full items-center justify-between p-6 text-left"
        onClick={onClick}
      >
        <span className={cn("text-lg font-bold transition-colors duration-300 pr-4", isOpen ? "text-gray-900" : "text-gray-700")}>{question}</span>
        <div className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 border",
          isOpen 
            ? "bg-slate-900 text-white border-transparent shadow-md rotate-180" 
            : "bg-gray-50 text-gray-500 border-gray-200"
        )}>
          {isOpen ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed font-medium">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items, className }: { items: { question: string; answer: string }[], className?: string }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0); // Open the first item by default

  return (
    <div className={cn("w-full max-w-3xl mx-auto flex flex-col gap-4", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
