import { BarChart3, CreditCard, Home, Package, Puzzle, Settings, type LucideIcon } from 'lucide-react'

export type DashboardNavItem = {
  name: string
  href: string
  icon: LucideIcon
}

// Single source of truth for dashboard nav links - shared by Sidebar (desktop)
// and Header (mobile drawer + breadcrumb/title) so they can't drift apart.
export const dashboardNavigation: DashboardNavItem[] = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Integrations', href: '/dashboard/integrations', icon: Puzzle },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

// '/dashboard' must match exactly, or every nested route under it (e.g.
// every other nav item) would also match Overview. Every other item matches
// its own nested routes too, e.g. /dashboard/products/123 stays on Products.
export function isDashboardNavItemActive(pathname: string | null | undefined, href: string): boolean {
  if (!pathname) return false
  if (href === '/dashboard') return pathname === '/dashboard'
  return pathname === href || pathname.startsWith(`${href}/`)
}
