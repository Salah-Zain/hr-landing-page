"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  // Close on ESC & click outside (mobile overlay)
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target as Node)) return;
      setMenuOpen(false);
    }

    if (menuOpen) {
      document.addEventListener("keydown", onKey);
      document.addEventListener("click", onClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClickOutside);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <section className="bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridBackground.png')] w-full bg-no-repeat bg-cover bg-center text-sm pb-44">
        <nav className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-6 w-full">
          <a href="/" aria-label="PlaceX home" className="flex items-center text-2xl font-black text-slate-900 tracking-tight">
            Place<span className="text-amber-500">X</span>
          </a>

          <div
            id="menu"
            ref={menuRef}
            className={[
              "max-md:absolute max-md:top-0 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-full max-md:bg-white/90 max-md:backdrop-blur",
              "flex items-center gap-8 font-medium text-slate-600",
              "max-md:flex-col max-md:justify-center",
              menuOpen ? "max-md:w-full z-50" : "max-md:w-0",
            ].join(" ")}
            aria-hidden={!menuOpen}
          >
            <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
            <a href="#program" className="hover:text-slate-900 transition-colors">Program</a>
            <a href="#testimonials" className="hover:text-slate-900 transition-colors">Testimonials</a>

            <button
              onClick={() => setMenuOpen(false)}
              className="md:hidden absolute top-6 right-6 bg-slate-800 hover:bg-black text-white p-2 rounded-md aspect-square font-medium transition"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <button className="hidden md:block bg-amber-500 hover:bg-amber-600 text-slate-900 px-6 py-2.5 rounded-full font-bold transition shadow-sm">
            Book Free Demo
          </button>

          <button
            id="open-menu"
            onClick={() => setMenuOpen(true)}
            className="md:hidden bg-slate-800 hover:bg-black text-white p-2 rounded-md aspect-square font-medium transition"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 12h16" />
              <path d="M4 18h16" />
              <path d="M4 6h16" />
            </svg>
          </button>
        </nav>

        <div className="flex items-center gap-2 border border-amber-200 bg-amber-50/50 rounded-full w-max mx-auto px-4 py-2 mt-24 md:mt-20">
          <Sparkles className="w-4 h-4 text-amber-600" />
        </div>

        <h1 className="text-5xl md:text-[72px] font-extrabold max-w-[900px] text-center mx-auto mt-10 text-slate-900 leading-[1.1] tracking-tight">
          HR Career Start Cheyyan <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Ready Ano?</span>
        </h1>

        <h2 className="text-lg md:text-2xl font-bold text-center mx-auto mt-8 text-slate-800">
          Learn Practical HR Skills. Work on Real Projects. Get Placement Support.
        </h2>

        <p className="text-sm md:text-lg mx-auto max-w-2xl text-center mt-6 max-md:px-4 text-slate-600 font-medium leading-relaxed">
          PerpeX HR Program is designed for people who want to build a real career in Human Resources — not just collect another certificate.
        </p>

        <div className="mx-auto w-full flex items-center justify-center mt-10">
          <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-full font-bold transition shadow-[0_8px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_40px_rgba(245,158,11,0.5)] hover:-translate-y-1">
            <span>Book Your Free Demo Class</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </>
  );
}
