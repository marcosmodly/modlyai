'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { plans } from '@/lib/plans'

export default function SignUpPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    storeName: '',
  })

  const getSignupPasswordKey = (email: string) => {
    return `modlyai:signup-password:${email.trim().toLowerCase()}`
  }

  const getErrorMessage = (data: unknown) => {
    if (!data || typeof data !== 'object') {
      return 'Could not create account. Please check your details and try again.'
    }

    const response = data as { error?: unknown; message?: unknown }
    const message = typeof response.message === 'string' ? response.message : ''
    const error = typeof response.error === 'string' ? response.error : ''

    if (error === 'An account with this email already exists') {
      return 'An account with this email already exists.'
    }

    if (message && error !== 'signup_failed') {
      return message
    }

    if (error && error !== 'signup_failed') {
      return error
    }

    return 'Could not create account. Please check your details and try again.'
  }

  const handleSubmit = async () => {
    setError('')
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const responseText = await res.text()
      let data: unknown = {}

      try {
        data = responseText ? JSON.parse(responseText) : {}
      } catch {
        data = responseText
      }

      if (res.ok) {
        const email = form.email.trim().toLowerCase()
        const code = String(Math.floor(100000 + Math.random() * 900000))
        const expiry = Date.now() + 10 * 60 * 1000

        window.sessionStorage.setItem(getSignupPasswordKey(email), form.password)

        const verificationRes = await fetch('/api/auth/send-verification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code, expiry }),
        })

        if (!verificationRes.ok) {
          window.sessionStorage.removeItem(getSignupPasswordKey(email))
          setError('Account created, but we could not send the verification email. Please try again.')
          setIsSubmitting(false)
          return
        }

        router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`)
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[Signup failed]', res.status, data)
        }
        setError(getErrorMessage(data))
        setIsSubmitting(false)
      }
    } catch (submitError) {
      console.error('Signup failed:', submitError)
      setError('Could not create account. Please check your details and try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">
            Modly<span className="text-blue-600">AI</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">Start your free {plans.free_trial.priceLabel} trial</p>
        </div>

        <div className="mb-6 flex justify-center gap-4 text-xs text-gray-500">
          <span>{plans.free_trial.aiChatLimit} AI chats</span>
          <span>{plans.free_trial.roomPlannerLimit} room analyses</span>
          <span>No card</span>
        </div>

        <div className="space-y-4">
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              placeholder="John Smith"
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Store Name
            </label>
            <input
              type="text"
              placeholder="Modern Furniture Co."
              onChange={(event) =>
                setForm({ ...form, storeName: event.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@yourstore.com"
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              onChange={(event) =>
                setForm({ ...form, password: event.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? 'Creating account...' : 'Start Free Trial'}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a
            href="/auth/signin"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  )
}
