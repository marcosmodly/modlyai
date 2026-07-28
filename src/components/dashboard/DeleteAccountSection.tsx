'use client'

import { signOut } from 'next-auth/react'
import { AlertTriangle, Eye, EyeOff, Trash2 } from 'lucide-react'
import { useState } from 'react'

async function safeJson(res: Response): Promise<{ error?: string; [key: string]: unknown }> {
  try {
    return await res.json()
  } catch {
    return { error: `Unexpected error (status ${res.status}). Please try again.` }
  }
}

type BlockedStore = { id: string; name: string | null; paddleCustomerId: string | null }

export default function DeleteAccountSection() {
  const [expanded, setExpanded] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmation, setConfirmation] = useState('')
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle')
  const [error, setError] = useState('')
  const [blockedStore, setBlockedStore] = useState<BlockedStore | null>(null)
  const [openingPortal, setOpeningPortal] = useState(false)

  const handleOpenBillingPortal = async () => {
    if (!blockedStore?.paddleCustomerId) return
    setOpeningPortal(true)

    try {
      const res = await fetch('/api/billing/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paddleCustomerId: blockedStore.paddleCustomerId }),
      })
      const result = await safeJson(res)

      if (!res.ok || !result.url) {
        throw new Error(result?.error || 'Unable to open billing portal')
      }

      window.open(String(result.url), '_blank', 'noopener,noreferrer')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to open billing portal')
    } finally {
      setOpeningPortal(false)
    }
  }

  const handleDelete = async () => {
    setStatus('saving')
    setError('')
    setBlockedStore(null)

    try {
      const res = await fetch('/api/account/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, confirmation }),
      })
      const result = await safeJson(res)

      if (!res.ok) {
        if (result?.blockedStore) {
          setBlockedStore(result.blockedStore as BlockedStore)
        }
        throw new Error(result?.error || 'Unable to delete account')
      }

      await signOut({ callbackUrl: '/' })
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Unable to delete account')
    }
  }

  return (
    <section className="rounded-[32px] border border-red-200 bg-red-50/40 p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-red-500" />
        <h2 className="text-2xl font-bold tracking-tight text-stone-950">Delete account</h2>
      </div>
      <p className="mt-2 text-sm text-stone-600">
        Permanently deletes your account. If you're the sole owner of a store with an active subscription,
        you'll need to cancel billing first.
      </p>

      {!expanded ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-300 bg-white px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
          Delete my account
        </button>
      ) : (
        <div className="mt-4 space-y-4 rounded-2xl border border-red-200 bg-white p-5">
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
              {blockedStore ? (
                <button
                  type="button"
                  onClick={handleOpenBillingPortal}
                  disabled={openingPortal || !blockedStore.paddleCustomerId}
                  className="mt-2 block font-semibold underline disabled:opacity-60"
                >
                  {openingPortal ? 'Opening...' : 'Manage billing'}
                </button>
              ) : null}
            </div>
          ) : null}

          <label className="block">
            <span className="text-sm font-medium text-stone-700">Confirm your password</span>
            <div className="relative mt-2">
              <input
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 pr-11 text-sm text-stone-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-stone-400 transition hover:text-stone-700"
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-stone-700">
              Type <span className="font-mono font-bold">DELETE</span> to confirm
            </span>
            <input
              type="text"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
              placeholder="DELETE"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDelete}
              disabled={status === 'saving' || confirmation !== 'DELETE' || !password}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 className="h-4 w-4" />
              {status === 'saving' ? 'Deleting...' : 'Permanently delete account'}
            </button>
            <button
              type="button"
              onClick={() => {
                setExpanded(false)
                setPassword('')
                setConfirmation('')
                setError('')
                setBlockedStore(null)
              }}
              className="text-sm font-medium text-stone-500 hover:text-stone-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
