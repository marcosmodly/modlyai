import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import Navbar from "@/components/Navbar";
import ConditionalWidgetButton from "@/components/ConditionalWidgetButton";
import SiteFooter from "@/components/SiteFooter";

const inter = Inter({ subsets: ["latin"] });
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const metadata: Metadata = {
  title: "ModlyAI - Intelligent Customization & Data-Driven Recommendations",
  description: "Premium AI platform for intelligent customization, data analysis, and personalized recommendations. Built for B2B and professional users.",
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
          <Script
            type="module"
            src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"
            strategy="lazyOnload"
          />
          <Navbar />
          <div className="flex-1">{children}</div>
          <SiteFooter showDemoDisclaimer={isDemoMode} />
          <ConditionalWidgetButton />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
