import Link from "next/link";
import DemoDisclaimer from "@/components/DemoDisclaimer";
import { legalLinks } from "@/lib/legal-links";

type SiteFooterProps = {
  showDemoDisclaimer?: boolean;
};

export default function SiteFooter({ showDemoDisclaimer = false }: SiteFooterProps) {
  return (
    <footer className="mt-auto border-t border-[#e7ddd1] bg-[#fffaf2] px-6 py-8 text-center">
      <p className="text-sm text-[#665c52]">© 2026 ModlyAI. All rights reserved.</p>
      <nav aria-label="Legal" className="mt-3 text-sm text-[#665c52]">
        {legalLinks.map((link, index) => (
          <span key={link.href}>
            {index > 0 ? <span className="mx-2 text-[#c4b5a4]">|</span> : null}
            <Link
              href={link.href}
              className="font-medium text-[#8a6238] underline-offset-2 transition hover:underline"
            >
              {link.label}
            </Link>
          </span>
        ))}
      </nav>
      {showDemoDisclaimer ? (
        <div className="mx-auto mt-4 max-w-3xl text-xs leading-5 text-[#8a7f72]">
          <DemoDisclaimer />
        </div>
      ) : null}
    </footer>
  );
}
