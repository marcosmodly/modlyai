'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NoStoreState({
  title,
}: {
  title: string
}) {
  const router = useRouter()
  const [retrying, setRetrying] = useState(false)

  const handleRetry = () => {
    setRetrying(true)
    router.refresh()
    window.setTimeout(() => setRetrying(false), 1500)
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
          {title}
        </p>
        <div role="status" aria-live="polite" className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          We couldn&apos;t find a ModlyAI store for this account. This usually resolves on its own shortly
          after signup - try again, or contact us if it persists.
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleRetry}
            disabled={retrying}
            className="inline-flex items-center gap-2 rounded-xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {retrying ? 'Checking...' : 'Try again'}
          </button>
          <a
            href="mailto:hello@modlyai.tech"
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            Email hello@modlyai.tech
          </a>
        </div>
      </section>
    </div>
  )
}
