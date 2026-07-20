import Link from "next/link";
import DemoDisclaimer from "@/components/DemoDisclaimer";
import { legalLinks } from "@/lib/legal-links";

type SiteFooterProps = {
  showDemoDisclaimer?: boolean;
};

const productLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/auth/signup", label: "Get Started" },
  { href: "/contact", label: "Request Pilot" },
] as const;

const companyLinks = [
  { href: "mailto:hello@modlyai.tech", label: "Contact" },
] as const;

const socialLinks = [
  {
    href: "https://www.instagram.com/modlyyai/?hl=en",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://x.com/ModlyyAI",
    label: "X",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.6L4.5 22H1.4l8.1-9.3L1 2h7l4.9 6L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />
      </svg>
    ),
  },
  {
    href: "https://www.reddit.com/user/Tralse09/",
    label: "Reddit",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <circle cx="12" cy="12" r="10" opacity="0" />
        <circle cx="9" cy="13" r="1.4" />
        <circle cx="15" cy="13" r="1.4" />
        <path d="M6.5 16c1.2 1 3.3 1 3.3 1s2.1 0 3.3-1" stroke="currentColor" strokeWidth={1.4} fill="none" strokeLinecap="round" />
        <circle cx="12" cy="12.5" r="6.5" stroke="currentColor" strokeWidth={1.4} fill="none" />
        <circle cx="18" cy="7" r="1.6" stroke="currentColor" strokeWidth={1.4} fill="none" />
        <path d="M12 6l1-4 3.2.7" stroke="currentColor" strokeWidth={1.4} fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "https://www.pinterest.com/modsy09/",
    label: "Pinterest",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2C6.5 2 3 5.6 3 10.1c0 2.7 1.5 4.5 3.8 4.5.5 0 1-.3 1.1-.9.1-.4-.4-1.9-.4-2.4 0-1.4 1.6-2.6 3.4-2.6 2.5 0 3.7 1.4 3.7 3.3 0 2.7-1.2 5-3.2 5-1 0-1.8-.8-1.6-1.9.3-1.2.9-2.5.9-3.4 0-.8-.4-1.4-1.3-1.4-1 0-1.9 1.1-1.9 2.6 0 .9.3 1.5.3 1.5s-1.1 4.5-1.2 5.3c-.2 1-.1 2.3 0 3.1a10 10 0 0 0 4.4.9c5.5 0 9-4 9-9.4C21 5.9 17.5 2 12 2Z" />
      </svg>
    ),
  },
] as const;

export default function SiteFooter({ showDemoDisclaimer = false }: SiteFooterProps) {
  return (
    <footer className="mt-auto bg-[#171411] px-6 py-14 text-[#e3ddd2]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <span className="text-xl font-bold text-white">
              Modly<span className="text-[#8fb0e0]">AI</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[#a89c8c]">
              AI room matching and product recommendations for furniture retailers.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#cfc6b8] transition hover:bg-white/10 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9c8f7d]">Product</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#cfc6b8] transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9c8f7d]">Company</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[#cfc6b8] transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9c8f7d]">Legal</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#cfc6b8] transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {showDemoDisclaimer ? (
          <div className="mt-10 max-w-3xl text-xs leading-5 text-[#9c8f7d]">
            <DemoDisclaimer />
          </div>
        ) : null}

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-[#9c8f7d]">
          © 2026 ModlyAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
