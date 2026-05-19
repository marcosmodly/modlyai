'use client'

import { FormEvent, Suspense, useEffect, useMemo, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

function getSignupPasswordKey(email: string) {
  return `modlyai:signup-password:${email}`
}

function VerifyEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = useMemo(
    () => String(searchParams.get('email') || '').trim().toLowerCase(),
    [searchParams]
  )
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (!email) return
    setPassword(window.sessionStorage.getItem(getSignupPasswordKey(email)) || '')
  }, [email])

  const requestVerificationCode = async () => {
    setError('')
    setMessage('')
    setIsResending(true)

    try {
      const nextCode = String(Math.floor(100000 + Math.random() * 900000))
      const res = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: nextCode }),
      })

      if (!res.ok) {
        throw new Error('Could not resend code')
      }

      setMessage('A new verification code has been sent.')
    } catch {
      setError('Could not resend verification code. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  const handleCodeChange = (value: string) => {
    setCode(value.replace(/\D/g, '').slice(0, 6))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })

      if (!res.ok) {
        setError('Invalid or expired code')
        return
      }

      if (password) {
        const signInResult = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (signInResult?.ok) {
          window.sessionStorage.removeItem(getSignupPasswordKey(email))
          router.push('/dashboard')
          router.refresh()
          return
        }
      }

      router.push('/auth/signin')
    } catch {
      setError('Invalid or expired code')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">
            Modly<span className="text-blue-600">AI</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">Check your email</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <p className="text-center text-sm text-gray-600">
            We sent a 6-digit verification code to{' '}
            <span className="font-medium text-gray-900">{email || 'your email'}</span>.
          </p>

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
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              autoFocus
              value={code}
              onChange={(event) => handleCodeChange(event.target.value)}
              placeholder="123456"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-center text-lg font-semibold tracking-[0.3em] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || code.length !== 6 || !email}
            className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <button
          type="button"
          onClick={requestVerificationCode}
          disabled={isResending || !email}
          className="mt-6 w-full text-center text-sm font-medium text-blue-600 hover:underline disabled:opacity-60"
        >
          {isResending ? 'Sending...' : 'Resend code'}
        </button>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailForm />
    </Suspense>
  )
}
