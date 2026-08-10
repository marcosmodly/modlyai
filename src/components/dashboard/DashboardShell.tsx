'use client'

import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
import TrialExpiredBanner from '@/components/dashboard/TrialExpiredBanner'

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-dashboard-shell text-stone-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-stone-950 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>
      <Sidebar />
      <div className="lg:pl-72">
        <Header />
        {/* tabIndex=-1: a plain <main> isn't focusable, so without it the
            skip link scrolls here but keyboard focus silently stays at the
            top - the next Tab would jump back to the nav instead of
            continuing into the content the link just promised to skip to. */}
        <main id="main" tabIndex={-1} className="py-8 sm:py-10 focus:outline-none">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TrialExpiredBanner />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
