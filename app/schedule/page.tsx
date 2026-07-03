import { Phone, Mail, ArrowUpRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="pt-32 sm:pt-40">
        
        {/* Header Section */}
        <section className="mx-auto max-w-7xl px-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-amber-600 font-bold transition-all hover:-translate-x-1 mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div>
            <p className="text-xs uppercase font-bold tracking-[0.22em] text-amber-500">
              Start your journey
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-black sm:text-7xl md:text-8xl">
              Let&apos;s map out your <span className="italic font-light text-amber-500">HR Career.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-black/60 text-pretty sm:text-xl leading-relaxed">
              Select a time below to schedule your free live demo. We personally guide you through our platform, answer your questions, and show you exactly how PlaceX works.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <div className="grid gap-16 md:grid-cols-12">
            
            {/* Left Col: Direct Channels */}
            <div className="md:col-span-5">
              <div>
                <p className="text-xs uppercase font-bold tracking-[0.22em] text-black/40">
                  Direct Channels
                </p>
                
                <ul className="mt-6 divide-y border-y border-gray-200 divide-gray-200">
                  
                  {/* Phone */}
                  <li>
                    <a href="tel:+911234567890" className="group flex items-center justify-between gap-4 py-6">
                      <div className="flex items-center gap-4">
                        <span className="grid h-12 w-12 place-items-center rounded-full border border-gray-200 bg-transparent transition-all duration-300 group-hover:bg-black group-hover:border-black group-hover:text-white">
                          <Phone className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-black/40">Phone</p>
                          <p className="mt-1 text-base font-semibold text-black">+91 98765 43210</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-black/20 transition-all group-hover:text-amber-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>
                  </li>

                  {/* Email */}
                  <li>
                    <a href="mailto:hello@placex.com" className="group flex items-center justify-between gap-4 py-6">
                      <div className="flex items-center gap-4">
                        <span className="grid h-12 w-12 place-items-center rounded-full border border-gray-200 bg-transparent transition-all duration-300 group-hover:bg-black group-hover:border-black group-hover:text-white">
                          <Mail className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-black/40">Email</p>
                          <p className="mt-1 text-base font-semibold text-black">hello@placex.com</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-black/20 transition-all group-hover:text-amber-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>
                  </li>

                  {/* Instagram */}
                  <li>
                    <a href="https://www.instagram.com/placex" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 py-6">
                      <div className="flex items-center gap-4">
                        <span className="grid h-12 w-12 place-items-center rounded-full border border-gray-200 bg-transparent transition-all duration-300 group-hover:bg-black group-hover:border-black group-hover:text-white">
                          <InstagramIcon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-black/40">Instagram</p>
                          <p className="mt-1 text-base font-semibold text-black">@placex</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-black/20 transition-all group-hover:text-amber-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>
                  </li>

                  {/* LinkedIn */}
                  <li>
                    <a href="https://www.linkedin.com/company/placex" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 py-6">
                      <div className="flex items-center gap-4">
                        <span className="grid h-12 w-12 place-items-center rounded-full border border-gray-200 bg-transparent transition-all duration-300 group-hover:bg-black group-hover:border-black group-hover:text-white">
                          <LinkedinIcon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-black/40">LinkedIn</p>
                          <p className="mt-1 text-base font-semibold text-black">PlaceX</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-black/20 transition-all group-hover:text-amber-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>
                  </li>

                </ul>

                {/* Location */}
                <div className="mt-12 p-6 rounded-2xl bg-[#fafafa] border border-gray-200">
                  <p className="text-xs uppercase font-bold tracking-widest text-amber-500">
                    Location
                  </p>
                  <p className="mt-2 text-sm font-medium text-black leading-relaxed">
                    Kerala, India · Remote Worldwide <br />
                    <span className="text-black/40 font-normal underline decoration-amber-500/30">Available for global students.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Calendly */}
            <div className="md:col-span-7 h-full">
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-[#fafafa] w-full h-[600px] md:h-[720px] relative flex flex-col items-center justify-center group transition-colors hover:bg-slate-50">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-black/40">
                  <div className="h-8 w-8 rounded-full border-2 border-black/5 border-t-amber-500 animate-spin" aria-hidden="true"></div>
                  <p className="text-xs uppercase tracking-widest font-bold">Syncing Calendar...</p>
                  <p className="text-sm font-medium text-center max-w-[250px] opacity-60 mt-2">
                    Connect your real Calendly link here when ready.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}
