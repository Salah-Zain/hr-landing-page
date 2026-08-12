"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { Footer } from "@/components/sections/Footer";
import { BookingModal } from "@/components/BookingModal";
import { BookingProvider } from "@/components/BookingContext";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <BookingProvider>
      {isAdminRoute ? (
        <main className="min-h-screen bg-slate-50">{children}</main>
      ) : (
        <>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileStickyCTA />
          <BookingModal />
        </>
      )}
    </BookingProvider>
  );
}
