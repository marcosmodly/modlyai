"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  // Determine if we're on a marketing page (homepage or other non-product pages)
  const isMarketingPage = pathname === "/" || 
                          pathname?.startsWith("/about") || 
                          pathname?.startsWith("/pricing") ||
                          pathname?.startsWith("/contact");
  
  // Determine if we're on a widget/demo page
  const isProductPage = pathname?.startsWith("/widget-demo") ||
                       pathname?.startsWith("/room-planner") ||
                       pathname?.startsWith("/customizer") ||
                       pathname?.startsWith("/catalog") ||
                       pathname?.startsWith("/configurator") ||
                       pathname?.startsWith("/demo");

  return (
    <nav className="bg-dark-base border-b border-subtle">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-5">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-3xl md:text-4xl font-bold text-text-primary hover:text-gradient-ai transition-all duration-300"
          >
            <span className="text-gradient-ai">Modly</span>
            <span className="text-text-primary">AI</span>
          </Link>
          <div className="flex gap-8 md:gap-10">
            {isMarketingPage && (
              <>
                <Link
                  href="/widget-demo"
                  className="text-text-secondary hover:text-text-primary transition-colors font-medium text-sm md:text-base relative group"
                >
                  Try Demo
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-ai group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  href="/contact"
                  className="text-text-secondary hover:text-text-primary transition-colors font-medium text-sm md:text-base relative group"
                >
                  Request Pilot
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-ai group-hover:w-full transition-all duration-300"></span>
                </Link>
              </>
            )}
            {isProductPage && (
              <>
                <Link
                  href="/room-planner"
                  className="text-text-secondary hover:text-text-primary transition-colors font-medium text-sm md:text-base relative group"
                >
                  Room Planner
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-ai group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  href="/customizer"
                  className="text-text-secondary hover:text-text-primary transition-colors font-medium text-sm md:text-base relative group"
                >
                  Customizer
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-ai group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  href="/catalog"
                  className="text-text-secondary hover:text-text-primary transition-colors font-medium text-sm md:text-base relative group"
                >
                  Catalog
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-ai group-hover:w-full transition-all duration-300"></span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
