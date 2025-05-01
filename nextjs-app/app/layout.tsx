import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';
import { Toaster } from "sonner";
import { LanguageProvider } from '@/context/LanguageContext';


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "My App",
    description: "A description for my app",
  };
}

const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-baskerville'
});

const sourceSans = Source_Sans_Pro({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  variable: '--font-source-sans'
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${baskerville.variable} bg-white text-black`}>
      <body>
        <LanguageProvider>
          <section className="min-h-screen">
            <Toaster />
            <main>{children}</main>
          </section>
          <SpeedInsights />
        </LanguageProvider>
      </body>
    </html>
  );
}
