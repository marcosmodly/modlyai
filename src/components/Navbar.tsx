"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/onboarding")) {
    return null;
  }
  
  // Determine if we're on a marketing page (homepage or other non-product pages)
  const isMarketingPage = pathname === "/" || 
                          pathname?.startsWith("/shop") ||
                          pathname?.startsWith("/about") || 
                          pathname?.startsWith("/pricing") ||
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

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-5">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-3xl font-bold transition-colors duration-300 md:text-4xl"
          >
            <span className="text-gray-900">Modly</span>
            <span className="text-[#3B82F6]">AI</span>
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            {(isMarketingPage || isProductPage) && (
              <>
                {isMarketingPage && (
                  <>
                    <Link
                      href={isConsumerMarketingPage ? "/widget-demo" : "/how-it-works"}
                      className={navLinkClass}
                    >
                      {isConsumerMarketingPage ? "Try Demo" : "See How It Works"}
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
                {session ? (
                  <Link
                    href="/dashboard"
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      className="px-4 py-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      Get Started Free
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
