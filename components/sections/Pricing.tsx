"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight } from "lucide-react";

export function Pricing() {
  return (
    <section className="py-24 bg-transparent relative z-10" id="pricing">
      <div className="container mx-auto px-4 md:px-6">

        <div className="relative bg-white rounded-[3rem] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06)] max-w-4xl mx-auto py-16 px-6 md:px-12 text-center border border-slate-200 ring-1 ring-slate-100">

          {/* Glowing Orbs for Light Theme */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[#fe9b19] font-bold tracking-wide text-sm mb-6 uppercase"
            >
              Simple Pricing
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-slate-900 text-balance"
            >
              One Decision. <span className="text-[#fe9b19]">A Career That Pays You Back.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-500 max-w-2xl mx-auto mb-12 text-lg font-medium"
            >
              Join our comprehensive HR program and get ready for the modern workplace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-50 rounded-3xl border border-slate-100 p-8 md:p-12 max-w-2xl mx-auto text-left shadow-sm"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-left w-full">
                  <div className="text-slate-500 mb-2 font-semibold">Full Course Fee</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">₹45,000</span>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-slate-700 font-medium">
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                      <span>Comprehensive HR Curriculum</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 font-medium">
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                      <span>Expert Faculty & Mentorship</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 font-medium">
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                      <span>Placement Assistance</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto flex-shrink-0">
                  <a href="https://wa.me/?text=Hi%20PerpeX%2C%20I%20want%20to%20enroll%20in%20the%20HR%20Program" target="_blank" rel="noopener noreferrer" className="block w-full sm:w-auto">
                    <Button className="w-full sm:w-auto">
                      <span>Enroll Now</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                  <p className="text-xs text-slate-400 mt-4 text-center font-medium">Next batch starting soon</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
