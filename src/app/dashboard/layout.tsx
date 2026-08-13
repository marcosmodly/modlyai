export const dynamic = 'force-dynamic'
export const revalidate = 0

import type { Metadata } from 'next'
import DashboardShell from '@/components/dashboard/DashboardShell'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardShell>{children}</DashboardShell>
}
