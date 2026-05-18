import Link from "next/link";
import type { ReactNode } from "react";
import { legalLinks } from "@/lib/legal-links";

type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl font-semibold text-[#171411] md:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-[#665c52] md:text-base">{children}</div>
    </section>
  );
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#171411]">
      <section className="relative overflow-hidden border-b border-[#e7ddd1] px-6 py-14 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(209,178,132,0.18),transparent_40%),linear-gradient(180deg,#fffaf2_0%,#f8efe3_100%)]" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a714f]">Legal</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.01em] text-[#171411] md:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-7 text-[#665c52]">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <article className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-10 rounded-2xl border border-[#e1d7ca] bg-white p-8 shadow-[0_18px_45px_rgba(75,61,47,0.07)] md:p-10">
          {children}

          <div className="border-t border-[#eadfce] pt-8">
            <p className="text-sm font-semibold text-[#51483f]">Related policies</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-medium text-[#8a6238] underline-offset-2 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-[#665c52]">
              Questions? Contact{" "}
              <a href="mailto:legal@modlyai.tech" className="font-medium text-[#8a6238] hover:underline">
                legal@modlyai.tech
              </a>
              .
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
