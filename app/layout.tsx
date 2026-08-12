import type { Metadata } from "next";
import { Poppins, Inter, Baloo_Chettan_2, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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

import { JsonLd } from "@/components/JsonLd";
import { ConditionalLayout } from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://perpex.in"),
  title: {
    default: "Best HR Management & Payroll Course in Kerala | PerpeX",
    template: "%s | PerpeX HR Academy"
  },
  description: "Master Practical HR, Payroll Processing, Statutory Compliance (PF/ESI/TDS), Zoho HRMS & GCC Labor Laws with 100% Placement Support at PerpeX HR Academy.",
  keywords: [
    "HR course in Kerala",
    "Best HR management course in Kerala",
    "Practical HR training course",
    "HR Generalist course Kerala",
    "HR Payroll training course",
    "Statutory Compliance HR course",
    "PF ESI TDS payroll training",
    "Zoho People HRMS training",
    "Keka HR software course",
    "Greythr payroll training",
    "Excel for HR management",
    "GCC Labor Laws HR course",
    "Gulf HR training Kerala",
    "Saudi UAE Kuwait Labor Law course",
    "HR course in Calicut Kozhikode",
    "HR course in Kochi Ernakulam",
    "HR training institute Kerala",
    "HR placement guarantee course Kerala",
    "HR course for freshers",
    "HR career transition course",
    "PerpeX HR Academy",
    "PerpeX HR consultation",
    "HR job training with placement support"
  ],
  authors: [{ name: "PerpeX HR Academy", url: "https://perpex.in" }],
  creator: "PerpeX",
  publisher: "PerpeX",
  alternates: {
    canonical: "https://perpex.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://perpex.in",
    siteName: "PerpeX HR Academy",
    title: "Best Practical HR Management & Payroll Course in Kerala | PerpeX",
    description: "Learn Real-world HR Skills, Payroll, Compliance & HRMS Tools. Get 100% Placement Support from Top Industry Experts.",
    images: [
      {
        url: "https://perpex.in/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "PerpeX HR Course Kerala - Practical HR Training Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Practical HR Management & Payroll Course | PerpeX",
    description: "Master Practical HR Skills, Payroll Processing, Zoho HRMS & GCC Labor Laws with 100% Placement Support.",
    images: ["https://perpex.in/images/hero-bg.jpg"],
  },
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
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2ZDQYVLJFP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2ZDQYVLJFP');
          `}
        </Script>
      </head>
      <body className={`${poppins.variable} ${inter.variable} ${balooChettan2.variable} ${notoMalayalam.variable} font-sans relative bg-white`}>
        <JsonLd />
        {/* Global Fixed Parallax Background - Clean White with faint dots */}
        <div className="fixed inset-0 pointer-events-none bg-dot-pattern opacity-60" style={{ zIndex: -50 }} />
        
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
