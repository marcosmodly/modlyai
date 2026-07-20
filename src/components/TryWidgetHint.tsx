'use client'

import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'

const AUTO_DISMISS_MS = 7000
const WIDGET_BUTTON_SELECTOR = '.modly-widget-button'

export default function TryWidgetHint() {
  const { data: session, status } = useSession()
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [buttonRect, setButtonRect] = useState<{ width: number; height: number } | null>(null)
  const measureIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user) return

    const showTimer = window.setTimeout(() => {
      setMounted(true)
      requestAnimationFrame(() => setVisible(true))
    }, 500)

    return () => window.clearTimeout(showTimer)
  }, [status, session?.user])

  // Measure the real widget button so the pulsing ring matches its actual
  // size, whether it's the wide text pill or the compact logo circle.
  useEffect(() => {
    if (!mounted) return

    const measure = () => {
      const el = document.querySelector<HTMLElement>(WIDGET_BUTTON_SELECTOR)
      if (el) {
        const rect = el.getBoundingClientRect()
        setButtonRect({ width: rect.width, height: rect.height })
      }
    }

    measure()
    // The widget button mounts asynchronously (it fetches remote config first),
    // so keep checking briefly until we find it or give up.
    measureIntervalRef.current = window.setInterval(measure, 400)
    window.addEventListener('resize', measure)

    const stopPolling = window.setTimeout(() => {
      if (measureIntervalRef.current) window.clearInterval(measureIntervalRef.current)
    }, 6000)

    return () => {
      if (measureIntervalRef.current) window.clearInterval(measureIntervalRef.current)
      window.clearTimeout(stopPolling)
      window.removeEventListener('resize', measure)
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    const dismissTimer = window.setTimeout(() => setVisible(false), AUTO_DISMISS_MS)

    const onWidgetOpen = () => setVisible(false)
    window.addEventListener('modly:open-widget', onWidgetOpen)

    // Dismiss as soon as the cursor reaches the real button, the nudge has
    // done its job once someone's actually moving toward it.
    const onPointerOver = (event: Event) => {
      const target = event.target as HTMLElement | null
      if (target?.closest?.(WIDGET_BUTTON_SELECTOR)) {
        setVisible(false)
      }
    }
    document.addEventListener('mouseover', onPointerOver)

    return () => {
      window.clearTimeout(dismissTimer)
      window.removeEventListener('modly:open-widget', onWidgetOpen)
      document.removeEventListener('mouseover', onPointerOver)
    }
  }, [mounted])

  if (status !== 'authenticated' || !session?.user || !mounted) {
    return null
  }

  const ringWidth = buttonRect?.width ?? 112
  const ringHeight = buttonRect?.height ?? 44
  // Bubble sits just above the button, plus a small gap, regardless of the
  // button's actual height (44px text pill vs ~52px logo circle).
  const bubbleBottomOffset = ringHeight + 24 + 16

  return (
    <>
      {/* Pulsing ring, sized to match the real widget button's current footprint */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed bottom-6 right-6 z-40 transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width: ringWidth, height: ringHeight }}
      >
        <span
          className="modly-hint-ring absolute inset-0 bg-[#244f85]/35"
          style={{ borderRadius: ringHeight / 2 }}
        />
      </div>

      {/* Speech-bubble callout above the button */}
      <div
        className={`fixed right-6 z-40 flex flex-col items-end transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ bottom: bubbleBottomOffset }}
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
