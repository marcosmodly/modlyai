import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | ModlyAI",
  description:
    "Talk to ModlyAI about adding AI room matching and product recommendations to your furniture storefront.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
