'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Home,
  Link as LinkIcon,
  LogOut,
  Search,
  Settings,
} from 'lucide-react';

const navItems = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Products', href: '/dashboard/products' },
  { name: 'Analytics', href: '/dashboard/analytics' },
  { name: 'Integrations', href: '/dashboard/integrations' },
  { name: 'Settings', href: '/dashboard/settings' },
];

const titles: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/products': 'Products',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/integrations': 'Integrations',
  '/dashboard/settings': 'Settings',
};

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const currentTitle = titles[pathname] ?? 'Dashboard';
  const userEmail = session?.user?.email ?? 'store@example.com';
  const userInitial = userEmail[0]?.toUpperCase() ?? 'S';
  const userName = session?.user?.name || 'Store Owner';
  const storeName = session?.user?.storeName || 'My Store';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setDropdownOpen(false);
      }

      if (!notificationsRef.current?.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/70 bg-[#f7f4ee]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
              <span>ModlyAI</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>{currentTitle}</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">{currentTitle}</h2>
          </div>

          <div className="flex items-center gap-3">
            <label className="hidden items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-2.5 shadow-sm sm:flex">
              <Search className="h-4 w-4 text-stone-400" />
              <input
                type="search"
                placeholder="Search products, stores, sync logs..."
                className="w-64 border-0 bg-transparent p-0 text-sm text-stone-700 outline-none placeholder:text-stone-400"
              />
            </label>
            <div className="relative hidden sm:block" ref={notificationsRef}>
              <button
                type="button"
                onClick={() => setNotificationsOpen((open) => !open)}
                className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-600 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                aria-label="Open notifications"
                aria-expanded={notificationsOpen}
                aria-haspopup="dialog"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-amber-500" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-stone-200 bg-white p-4 shadow-lg">
                  <h3 className="text-sm font-semibold text-stone-900">Notifications</h3>
                  <p className="mt-3 text-sm text-stone-700">No notifications yet.</p>
                  <p className="mt-2 text-xs leading-5 text-stone-500">
                    Activity alerts will appear here once tracking is connected.
                  </p>
                </div>
              )}
            </div>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((open) => !open)}
                className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm text-white shadow-sm transition-colors hover:bg-gray-700"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
                  {userInitial}
                </div>
                <span className="hidden max-w-40 truncate sm:inline">{userEmail}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                  <div className="mb-2 border-b border-gray-100 px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                        {userInitial}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">{userName}</p>
                        <p className="truncate text-xs text-gray-500">{userEmail}</p>
                        <p className="truncate text-xs font-medium text-blue-600">{storeName}</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>

                  <Link
                    href="/dashboard/integrations"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <LinkIcon className="h-4 w-4" />
                    Integrations
                  </Link>

                  <Link
                    href="/"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Home className="h-4 w-4" />
                    Back to Website
                  </Link>

                  <div className="mt-2 border-t border-gray-100 pt-2">
                    <button
                      type="button"
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="overflow-x-auto lg:hidden">
          <div className="flex gap-2 pb-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'bg-stone-900 text-white'
                      : 'border border-stone-200 bg-white text-stone-700',
                  ].join(' ')}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
