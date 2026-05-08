'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { ArrowLeftIcon, BarChart3, Home, Package, Puzzle, Settings, LogOut } from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Integrations', href: '/dashboard/integrations', icon: Puzzle },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const storeName = session?.user?.storeName || 'My Store';
  const userEmail = session?.user?.email || 'store@example.com';
  const storeInitial = storeName[0]?.toUpperCase() || 'M';

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
      <div className="relative flex grow flex-col overflow-y-auto border-r border-stone-200/70 bg-[linear-gradient(180deg,#f8f4ec_0%,#f5efe4_30%,#f3f5f7_100%)] px-6 pb-6 pt-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,rgba(180,143,93,0.16),transparent_55%),radial-gradient(circle_at_top_right,rgba(29,78,216,0.08),transparent_45%)]" />

        <div className="relative px-4 py-3">
          <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">Control Panel</p>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
              {storeInitial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-gray-900">{storeName}</p>
              <p className="truncate text-xs text-gray-500 max-w-[140px]">{userEmail}</p>
            </div>
          </div>
        </div>

        <div className="relative mt-8 rounded-3xl border border-stone-200/80 bg-white/80 p-4 shadow-sm backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Store Health</p>
          <p className="mt-3 text-3xl font-bold text-stone-900">98.4%</p>
          <p className="mt-2 text-sm text-stone-600">Widget uptime across product pages this month.</p>
        </div>

        <nav className="relative mt-8 flex flex-1 flex-col">
          <ul role="list" className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={[
                      'group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition',
                      isActive
                        ? 'bg-stone-900 text-white shadow-lg shadow-stone-300/50'
                        : 'text-stone-700 hover:bg-white hover:text-stone-950',
                    ].join(' ')}
                  >
                    <item.icon className={['h-5 w-5 shrink-0', isActive ? 'text-amber-300' : 'text-stone-500 group-hover:text-blue-700'].join(' ')} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto space-y-3">
            <Link
              href="/"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Website
            </Link>

            <div className="rounded-3xl border border-stone-200/80 bg-white/85 p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-stone-900">Need implementation help?</p>
                <p className="mt-1 text-xs leading-5 text-stone-600">
                  Review install snippets and sync logs before publishing changes live.
                </p>
              </div>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-stone-200 text-stone-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                aria-label="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
