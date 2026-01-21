import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WidgetButton from "../../widget/src/components/WidgetButton";
import DemoDisclaimer from "@/components/DemoDisclaimer";

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
      <body className={inter.className}>
        <Script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"
          strategy="lazyOnload"
        />
        <Navbar />
        {children}
        {isDemoMode && (
          <footer className="mt-12 border-t border-subtle bg-dark-base px-6 py-4 text-center text-sm text-text-secondary">
            <DemoDisclaimer />
          </footer>
        )}
        <WidgetButton />
      </body>
    </html>
  );
}