import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import PaddleProvider from "@/components/PaddleProvider";
import Navbar from "@/components/Navbar";
import ConditionalWidgetButton from "@/components/ConditionalWidgetButton";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const title = "ModlyAI - Room visualizer and product customizer for furniture retailers";
const description =
  "Let shoppers upload a photo of their room and see your furniture in it, change fabrics and finishes, and request a quote - without leaving your product page. Works with Shopify, WooCommerce, and CSV catalogs.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://modlyai.tech"),
  openGraph: {
    type: "website",
    siteName: "ModlyAI",
    title: "See your furniture in their room",
    description,
    url: "https://modlyai.tech",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "A sofa shown in a customer's living room photo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "See your furniture in their room",
    description,
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
      <body className={`${inter.className} ${fraunces.variable} flex min-h-screen flex-col`}>
        <AuthSessionProvider>
          <PaddleProvider>
            <Script
              type="module"
              src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"
              strategy="lazyOnload"
            />
            <Navbar />
            <div className="flex flex-1 flex-col">{children}</div>
            <ConditionalWidgetButton />
          </PaddleProvider>
        </AuthSessionProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}