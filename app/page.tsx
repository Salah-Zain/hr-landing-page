// Main landing page
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { WhoIsThisFor } from "@/components/sections/WhoIsThisFor";
import { Curriculum } from "@/components/sections/Curriculum";
import { CourseHighlights } from "@/components/sections/CourseHighlights";
import { FAQ } from "@/components/sections/FAQ";
import { Pricing } from "@/components/sections/Pricing";

// Lazy load carousels to improve initial page load performance
const FacultyCarousel = dynamic(
  () => import("@/components/sections/FacultyCarousel").then((mod) => mod.FacultyCarousel),
  { ssr: false }
);

const TestimonialsCarousel = dynamic(
  () => import("@/components/sections/TestimonialsCarousel").then((mod) => mod.TestimonialsCarousel),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TestimonialsCarousel />
      <WhoIsThisFor />
      <div className="relative z-10 bg-white/40 backdrop-blur-2xl shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.05)] border-t border-white/60">
        <FacultyCarousel />
        <Curriculum />
        <CourseHighlights />
        <FAQ />
      </div>
      <Pricing />
    </main>
  );
}
