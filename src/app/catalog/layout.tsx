import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog | ModlyAI",
  description: "Browse and customize furniture products powered by ModlyAI's catalog-grounded recommendations.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
