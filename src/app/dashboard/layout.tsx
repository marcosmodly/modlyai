export const dynamic = 'force-dynamic'
export const revalidate = 0

import DashboardShell from '@/components/dashboard/DashboardShell'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardShell>{children}</DashboardShell>
}
