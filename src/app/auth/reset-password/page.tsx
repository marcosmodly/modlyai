'use client'

import { Suspense, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

async function safeJson(res: Response): Promise<{ error?: string; [key: string]: unknown }> {
  try {
    return await res.json()
  } catch {
    return { error: `Unexpected error (status ${res.status}). Please try again.` }
  }
}

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialEmail = useMemo(
    () => String(searchParams.get('email') || '').trim().toLowerCase(),
    [searchParams]
  )

  const [email, setEmail] = useState(initialEmail)
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const handleResend = async () => {
    setError('')
    setMessage('')
    setIsResending(true)

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })
      await safeJson(res)
      setMessage('If an account exists for that email, a new code has been sent.')
    } catch {
      setError('Could not resend code. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  const handleSubmit = async () => {
    setError('')
    setMessage('')

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), code, newPassword }),
      })
      const result = await safeJson(res)

      if (!res.ok) {
        throw new Error(result?.error || 'Invalid or expired code')
      }

      router.push('/auth/signin?reset=1')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid or expired code')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">
            Modly<span className="text-blue-600">AI</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">Enter your reset code and a new password</p>
        </div>

        <div className="space-y-4">
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
          {message ? (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          ) : null}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourstore.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Reset code</label>
            <input
              type="text"
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending || !email.trim()}
              className="mt-1 text-xs font-medium text-blue-600 hover:underline disabled:opacity-60"
            >
              {isResending ? 'Sending...' : "Didn't get a code? Resend"}
            </button>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">New password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              minLength={8}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Confirm new password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              minLength={8}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || code.length !== 6 || !email.trim()}
            className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? 'Resetting...' : 'Reset password'}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Remembered your password?{' '}
          <a href="/auth/signin" className="font-medium text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  )
}
