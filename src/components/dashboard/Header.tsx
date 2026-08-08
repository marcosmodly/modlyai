'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Home,
  Link as LinkIcon,
  LogOut,
  Menu,
  Settings,
  X,
} from 'lucide-react';
import { dashboardNavigation, isDashboardNavItemActive } from '@/lib/dashboard-navigation';
import { formatRelativeTime } from '@/lib/format-session';
import { useProfileSummary } from '@/lib/use-profile-summary';

type NotificationRow = {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: number;
};

async function safeJson(res: Response): Promise<{ error?: string; [key: string]: unknown }> {
  try {
    return await res.json();
  } catch {
    return { error: `Unexpected error (status ${res.status}). Please try again.` };
  }
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationRow[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const mobileNavPanelRef = useRef<HTMLDivElement>(null);
  const mobileNavTriggerRef = useRef<HTMLButtonElement>(null);
  const currentTitle =
    dashboardNavigation.find((item) => isDashboardNavItemActive(pathname, item.href))?.name ?? 'Dashboard';
  const userEmail = session?.user?.email ?? 'store@example.com';
  const userInitial = userEmail[0]?.toUpperCase() ?? 'S';
  const userName = session?.user?.name || 'Store Owner';
  const storeName = session?.user?.storeName || 'My Store';
  const { avatarUrl } = useProfileSummary();

  const loadNotifications = () => {
    setLoadingNotifications(true);
    fetch('/api/notifications')
      .then(safeJson)
      .then((data) => {
        if (data.error) throw new Error(String(data.error));
        setNotifications((data.notifications as NotificationRow[]) || []);
        setUnreadCount(Number(data.unreadCount) || 0);
      })
      .catch(() => {
        // Fail quietly here - the bell just won't show anything new rather
        // than surfacing an error banner for a non-critical feature.
      })
      .finally(() => setLoadingNotifications(false));
  };

  useEffect(() => {
    if (!session?.user?.id) return;
    loadNotifications();
    // Light polling so the unread count stays roughly fresh without needing
    // a websocket/live-query setup for this.
    const interval = setInterval(loadNotifications, 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  const handleNotificationClick = async (notification: NotificationRow) => {
    if (!notification.read) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
      );
      setUnreadCount((count) => Math.max(0, count - 1));
      fetch(`/api/notifications/${notification.id}/read`, { method: 'POST' }).catch(() => {});
    }
    setNotificationsOpen(false);
    if (notification.link) {
      router.push(notification.link);
    }
  };

  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    try {
      await fetch('/api/notifications/mark-all-read', { method: 'POST' });
    } catch {
      // best-effort - a stale unread count on failure isn't worth surfacing an error for
    }
  };

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
        setMobileNavOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Auto-close on route change - covers both link clicks inside the drawer
  // and any other navigation (back/forward) while it happens to be open.
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileNavOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    mobileNavPanelRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    const handleTrapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !mobileNavPanelRef.current) return;

      const focusable = Array.from(
        mobileNavPanelRef.current.querySelectorAll<HTMLElement>(
          'a, button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTrapFocus);
    const trigger = mobileNavTriggerRef.current;
    return () => {
      document.removeEventListener('keydown', handleTrapFocus);
      document.body.style.overflow = previousBodyOverflow;
      trigger?.focus();
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
    <header className="sticky top-0 z-30 border-b border-stone-200/70 bg-[#f7f4ee]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
              <span>ModlyAI</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>{currentTitle}</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">{currentTitle}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              ref={mobileNavTriggerRef}
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-600 shadow-sm transition hover:border-blue-200 hover:text-blue-700 lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={mobileNavOpen}
              aria-haspopup="dialog"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative" ref={notificationsRef}>
              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen((open) => !open);
                  if (!notificationsOpen) loadNotifications();
                }}
                className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-600 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                aria-label="Open notifications"
                aria-expanded={notificationsOpen}
                aria-haspopup="dialog"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-stone-200 bg-white p-3 shadow-lg">
                  <div className="flex items-center justify-between px-1 pb-2">
                    <h3 className="text-sm font-semibold text-stone-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={handleMarkAllRead}
                        className="text-xs font-medium text-blue-600 hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  {loadingNotifications && notifications.length === 0 ? (
                    <p className="px-1 py-4 text-sm text-stone-500">Loading...</p>
                  ) : notifications.length === 0 ? (
                    <>
                      <p className="px-1 py-2 text-sm text-stone-700">No notifications yet.</p>
                      <p className="px-1 pb-1 text-xs leading-5 text-stone-500">
                        Activity like new quote requests and security alerts will appear here.
                      </p>
                    </>
                  ) : (
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <button
                          key={notification.id}
                          type="button"
                          onClick={() => handleNotificationClick(notification)}
                          className={`block w-full rounded-lg px-2 py-2.5 text-left transition hover:bg-stone-50 ${
                            notification.read ? '' : 'bg-blue-50/60'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {!notification.read && (
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                            )}
                            <div className={notification.read ? 'pl-3.5' : ''}>
                              <p className="text-sm font-medium text-stone-900">{notification.title}</p>
                              <p className="mt-0.5 text-xs text-stone-600">{notification.message}</p>
                              <p className="mt-1 text-xs text-stone-400">
                                {formatRelativeTime(notification.createdAt)}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((open) => !open)}
                className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm text-white shadow-sm transition-colors hover:bg-gray-700"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-600 text-sm font-bold text-white">
                  {avatarUrl ? <img src={avatarUrl} alt="" className="h-full w-full object-cover" /> : userInitial}
                </div>
                <span className="hidden max-w-40 truncate sm:inline">{userName}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                  <div className="mb-2 border-b border-gray-100 px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-600 font-bold text-white">
                        {avatarUrl ? <img src={avatarUrl} alt="" className="h-full w-full object-cover" /> : userInitial}
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

      </div>
    </header>

    {mounted && mobileNavOpen && createPortal(
      <div className="fixed inset-0 z-50 lg:hidden">
        <div
          className="absolute inset-0 bg-stone-950/50"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
        <div
          ref={mobileNavPanelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Dashboard navigation"
          className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-[#f8f4ec] p-4 shadow-xl"
        >
          <div className="flex items-center justify-between px-2 py-2">
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-stone-500">Menu</span>
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl text-stone-600 transition hover:bg-white"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav aria-label="Dashboard" className="mt-2 flex-1">
            <ul role="list" className="space-y-2">
              {dashboardNavigation.map((item) => {
                const isActive = isDashboardNavItemActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition',
                        isActive
                          ? 'bg-stone-900 text-white'
                          : 'text-stone-700 hover:bg-white',
                      ].join(' ')}
                    >
                      <item.icon className={['h-5 w-5 shrink-0', isActive ? 'text-amber-300' : 'text-stone-500'].join(' ')} />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>,
      document.body
    )}
    </>
  );
}
