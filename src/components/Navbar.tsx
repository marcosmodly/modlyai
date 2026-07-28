"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }
  
  // Determine if we're on a marketing page (homepage or other non-product pages)
  const isMarketingPage = pathname === "/" || 
                          pathname?.startsWith("/shop") ||
                          pathname?.startsWith("/about") || 
                          pathname?.startsWith("/pricing") ||
                          pathname?.startsWith("/faq") ||
                          pathname?.startsWith("/contact");

  const isConsumerMarketingPage = pathname?.startsWith("/shop");
  
  // Determine if we're on a widget/demo page
  const isProductPage = pathname?.startsWith("/widget-demo") ||
                       pathname?.startsWith("/room-planner") ||
                       pathname?.startsWith("/customizer") ||
                       pathname?.startsWith("/catalog") ||
                       pathname?.startsWith("/configurator") ||
                       pathname?.startsWith("/demo");

  const navLinkClass =
    "text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm md:text-base";

  const mobileNavLinkClass =
    "text-gray-700 hover:text-gray-900 transition-colors font-medium text-base py-2";

  const showNavLinks = isMarketingPage || isProductPage;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-5">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <Link 
            href="/" 
            className="justify-self-start text-3xl font-bold transition-colors duration-300 md:text-4xl"
            onClick={closeMobileMenu}
          >
            <span className="text-gray-900">Modly</span>
            <span className="text-[#3B82F6]">AI</span>
          </Link>

          <div className="hidden md:flex items-center justify-center gap-4 md:gap-6">
            {isMarketingPage && (
              <>
                <Link
                  href={isConsumerMarketingPage ? "/widget-demo" : "/how-it-works"}
                  className={navLinkClass}
                >
                  {isConsumerMarketingPage ? "Try Demo" : "See How It Works"}
                </Link>
                <Link
                  href="/faq"
                  className={navLinkClass}
                >
                  FAQ
                </Link>
                <Link
                  href="/pricing"
                  className={navLinkClass}
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  className={navLinkClass}
                >
                  Request Pilot
                </Link>
              </>
            )}
            {isProductPage && (
              <>
                <Link
                  href="/room-planner"
                  className={navLinkClass}
                >
                  Room Planner
                </Link>
                <Link
                  href="/customizer"
                  className={navLinkClass}
                >
                  Customizer
                </Link>
                <Link
                  href="/catalog"
                  className={navLinkClass}
                >
                  Catalog
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center justify-self-end gap-3">
            {showNavLinks && (
              <div className="hidden md:flex items-center gap-3">
                {session ? (
                  <Link
                    href="/dashboard"
                    className="rounded-full bg-[#171411] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      className="rounded-full bg-stone-100 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-200"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="rounded-full bg-[#171411] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
                    >
                      Get Started Free
                    </Link>
                  </>
                )}
              </div>
            )}

            {showNavLinks && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="flex md:hidden h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-stone-100"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </div>
        </div>

        {showNavLinks && mobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col border-t border-gray-100 pt-4">
            {isMarketingPage && (
              <>
                <Link
                  href={isConsumerMarketingPage ? "/widget-demo" : "/how-it-works"}
                  className={mobileNavLinkClass}
                  onClick={closeMobileMenu}
                >
                  {isConsumerMarketingPage ? "Try Demo" : "See How It Works"}
                </Link>
                <Link href="/faq" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                  FAQ
                </Link>
                <Link href="/pricing" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                  Pricing
                </Link>
                <Link href="/contact" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                  Request Pilot
                </Link>
              </>
            )}
            {isProductPage && (
              <>
                <Link href="/room-planner" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                  Room Planner
                </Link>
                <Link href="/customizer" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                  Customizer
                </Link>
                <Link href="/catalog" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                  Catalog
                </Link>
              </>
            )}

            <div className="mt-3 flex flex-col gap-3 border-t border-gray-100 pt-4">
              {session ? (
                <Link
                  href="/dashboard"
                  className="rounded-full bg-[#171411] px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-black"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="rounded-full bg-stone-100 px-5 py-2.5 text-center text-sm font-semibold text-stone-700 transition hover:bg-stone-200"
                    onClick={closeMobileMenu}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="rounded-full bg-[#171411] px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-black"
                    onClick={closeMobileMenu}
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
