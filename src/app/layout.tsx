import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import PaddleProvider from "@/components/PaddleProvider";
import Navbar from "@/components/Navbar";
import ConditionalWidgetButton from "@/components/ConditionalWidgetButton";
import SiteFooter from "@/components/SiteFooter";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const metadata: Metadata = {
  title: "ModlyAI - Intelligent Customization & Data-Driven Recommendations",
  description: "Premium AI platform for intelligent customization, data analysis, and personalized recommendations. Built for B2B and professional users.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/android-chrome-512x512.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <AuthSessionProvider>
          <PaddleProvider>
            <Script
              type="module"
              src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"
              strategy="lazyOnload"
            />
            <Navbar />
            <div className="flex-1">{children}</div>
            <SiteFooter showDemoDisclaimer={isDemoMode} />
            <ConditionalWidgetButton />
          </PaddleProvider>
        </AuthSessionProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}