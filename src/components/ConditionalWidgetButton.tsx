'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import WidgetButton from '../../widget/src/components/WidgetButton';
import type { WidgetConfig } from '../../widget/src/utils/config';

export default function ConditionalWidgetButton() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const storeId = session?.user?.storeId;
  const [remoteConfig, setRemoteConfig] = useState<WidgetConfig | null>(null);
  const [configLoaded, setConfigLoaded] = useState(false);

  useEffect(() => {
    if (!storeId) {
      setRemoteConfig(null);
      setConfigLoaded(false);
      return;
    }

    setConfigLoaded(false);
    const controller = new AbortController();
    const params = new URLSearchParams({
      storeId,
      widgetId: storeId,
    });

    fetch(`/api/widget/config?${params.toString()}`, {
      signal: controller.signal,
      cache: 'no-store',
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((config) => {
        if (config) {
          setRemoteConfig(config);
        }
        setConfigLoaded(true);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.warn('Failed to load widget config for UI:', error);
          setConfigLoaded(true);
        }
      });

    return () => controller.abort();
  }, [storeId]);

  const widgetConfig = useMemo<WidgetConfig>(() => ({
    storeId,
    widgetId: storeId,
    apiKey: session?.user?.apiKey,
    ...remoteConfig,
  }), [remoteConfig, session?.user?.apiKey, storeId]);

  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  if (pathname === '/') {
    return null;
  }

  if (pathname?.startsWith('/auth')) {
    return null;
  }

  if (!session?.user) {
    const isHowItWorksPage = pathname === '/how-it-works';
    return (
      <Link
        href="/auth/signup"
        className={`fixed bottom-6 right-6 z-50 inline-flex h-11 items-center gap-2 rounded-full bg-[#171411] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-black ${
          isHowItWorksPage ? 'modly-signup-glow' : ''
        }`}
      >
        <Sparkles className="h-4 w-4" strokeWidth={2} />
        Sign up to try the widget
      </Link>
    );
  }

  if (storeId && !configLoaded) {
    return null;
  }

  return (
    <WidgetButton
      config={widgetConfig}
    />
  );
}
