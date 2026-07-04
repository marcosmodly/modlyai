'use client'

import { SessionProvider } from 'next-auth/react'
import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
import TrialExpiredBanner from '@/components/dashboard/TrialExpiredBanner'

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-[linear-gradient(180deg,#f7f4ee_0%,#f3efe6_20%,#eff2f4_100%)] text-stone-900">
        <Sidebar />
        <div className="lg:pl-72">
          <Header />
          <main className="py-8 sm:py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <TrialExpiredBanner />
              {children}
            </div>
          </main>
        </div>
      </div>
    </SessionProvider>
  )
}
