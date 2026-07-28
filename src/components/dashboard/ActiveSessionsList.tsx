'use client'

import { Laptop, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { describeUserAgent, formatRelativeTime } from '@/lib/format-session'

type SessionRow = {
  id: string
  userAgent: string
  ip: string
  createdAt: number
  lastSeenAt: number
  isCurrent: boolean
}

async function safeJson(res: Response): Promise<{ error?: string; [key: string]: unknown }> {
  try {
    return await res.json()
  } catch {
    return { error: `Unexpected error (status ${res.status}). Please try again.` }
  }
}

export default function ActiveSessionsList() {
  const [sessions, setSessions] = useState<SessionRow[] | null>(null)
  const [error, setError] = useState('')
  const [revokingId, setRevokingId] = useState<string | null>(null)

  const load = () => {
    fetch('/api/account/sessions')
      .then(safeJson)
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setSessions((data.sessions as SessionRow[]) || [])
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load sessions.'))
  }

  useEffect(() => {
    load()
  }, [])

  const handleRevoke = async (sessionId: string) => {
    setRevokingId(sessionId)
    setError('')

    try {
      const res = await fetch(`/api/account/sessions/${sessionId}/revoke`, { method: 'POST' })
      const result = await safeJson(res)

      if (!res.ok) {
        throw new Error(result?.error || 'Unable to sign out that device.')
      }

      setSessions((prev) => (prev ? prev.filter((s) => s.id !== sessionId) : prev))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign out that device.')
    } finally {
      setRevokingId(null)
    }
  }

  return (
    <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Laptop className="h-5 w-5 text-stone-500" />
        <h2 className="text-2xl font-bold tracking-tight text-stone-950">Active sessions</h2>
      </div>
      <p className="mt-2 text-sm text-stone-600">Devices and browsers currently signed in to your account.</p>

      {error ? <p className="mt-4 text-sm font-medium text-red-700">{error}</p> : null}

      {sessions === null ? (
        <p className="mt-4 text-sm text-stone-500">Loading...</p>
      ) : sessions.length === 0 ? (
        <p className="mt-4 text-sm text-stone-500">No active sessions found.</p>
      ) : (
        <ul className="mt-4 divide-y divide-stone-100">
          {sessions.map((s) => (
            <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-medium text-stone-900">
                  {describeUserAgent(s.userAgent)}
                  {s.isCurrent ? (
                    <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      This device
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  {s.ip} &middot; Last active {formatRelativeTime(s.lastSeenAt)}
                </p>
              </div>
              {!s.isCurrent ? (
                <button
                  type="button"
                  onClick={() => handleRevoke(s.id)}
                  disabled={revokingId === s.id}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <X className="h-3.5 w-3.5" />
                  {revokingId === s.id ? 'Signing out...' : 'Sign out'}
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
