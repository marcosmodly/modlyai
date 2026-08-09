'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { RANGE_OPTIONS, type AnalyticsRange } from '@/lib/analytics-range'

export default function AnalyticsRangeSelector({ activeRange }: { activeRange: AnalyticsRange }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setRange = useCallback(
    (range: AnalyticsRange) => {
      if (range === activeRange) return
      const params = new URLSearchParams(searchParams.toString())
      params.set('range', range)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [activeRange, pathname, router, searchParams]
  )

  return (
    <div
      role="tablist"
      aria-label="Date range"
      className="inline-flex flex-wrap gap-1 rounded-2xl border border-stone-200 bg-stone-50 p-1"
    >
      {RANGE_OPTIONS.map((option) => {
        const isActive = option.id === activeRange
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setRange(option.id)}
            className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
              isActive ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-white'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
