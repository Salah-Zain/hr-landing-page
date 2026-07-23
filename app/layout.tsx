import type { Metadata } from "next";
import { Poppins, Inter, Baloo_Chettan_2, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { Footer } from "@/components/sections/Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["600", "700", "800"],
  variable: "--font-title-en",
  display: "swap"
});

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["400", "500"],
  variable: "--font-body-en",
  display: "swap"
});

const balooChettan2 = Baloo_Chettan_2({ 
  subsets: ["malayalam"], 
  weight: ["600", "700"],
  variable: "--font-title-ml",
  display: "swap"
});

const notoMalayalam = Noto_Sans_Malayalam({ 
  subsets: ["malayalam"], 
  weight: ["400", "500"],
  variable: "--font-body-ml",
  display: "swap"
});

export const metadata: Metadata = {
  title: "PerpeX HR Course | Learn Practical HR Skills",
  description: "PerpeX HR Program is designed for people who want to build a real career in Human Resources — not just collect another certificate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xqsxzqqgq9");
          `}
        </Script>
      </head>
      <body className={`${poppins.variable} ${inter.variable} ${balooChettan2.variable} ${notoMalayalam.variable} font-sans relative bg-white`}>
        {/* Global Fixed Parallax Background - Clean White with faint dots */}
        <div className="fixed inset-0 pointer-events-none bg-dot-pattern opacity-60" style={{ zIndex: -50 }} />
        
        <Navbar />
        {children}
        <Footer />
        <MobileStickyCTA />
        <Analytics />
      </body>
    </html>
  );
}
