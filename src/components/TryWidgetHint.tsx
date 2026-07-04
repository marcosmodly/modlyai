'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const AUTO_DISMISS_MS = 7000

export default function TryWidgetHint() {
  const { data: session, status } = useSession()
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user) return

    const showTimer = window.setTimeout(() => {
      setMounted(true)
      requestAnimationFrame(() => setVisible(true))
    }, 500)

    return () => window.clearTimeout(showTimer)
  }, [status, session?.user])

  useEffect(() => {
    if (!mounted) return

    const dismissTimer = window.setTimeout(() => setVisible(false), AUTO_DISMISS_MS)

    const onWidgetOpen = () => setVisible(false)
    window.addEventListener('modly:open-widget', onWidgetOpen)

    return () => {
      window.clearTimeout(dismissTimer)
      window.removeEventListener('modly:open-widget', onWidgetOpen)
    }
  }, [mounted])

  if (status !== 'authenticated' || !session?.user || !mounted) {
    return null
  }

  return (
    <>
      {/* Pulsing ring sized to match the real widget button's footprint (fixed bottom-6 right-6, ~44px tall) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed bottom-6 right-6 z-40 h-11 min-w-[112px] transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="modly-hint-ring absolute inset-0 rounded-full bg-[#244f85]/35" />
      </div>

      {/* Speech-bubble callout above the button */}
      <div
        className={`fixed bottom-[84px] right-6 z-40 flex flex-col items-end transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="modly-hint-in flex items-center gap-2 rounded-2xl bg-[#171411] px-4 py-2.5 text-sm font-semibold text-[#fffaf2] shadow-[0_12px_28px_rgba(0,0,0,0.28)]">
          Try the widget
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Dismiss"
            className="ml-1 flex h-4 w-4 items-center justify-center rounded-full text-[#c9bfb2] hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mr-8 mt-1 h-2.5 w-2.5 rotate-45 bg-[#171411]" />
      </div>
    </>
  )
}
