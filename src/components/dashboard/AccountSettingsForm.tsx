'use client'

import { useSession } from 'next-auth/react'
import { Eye, EyeOff, KeyRound, LogOut, Mail, Save, User } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import ImageUploadField from '@/components/ImageUploadField'
import { notifyProfileUpdated } from '@/lib/use-profile-summary'

const inputClass =
  'w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100'

// Response bodies should always be JSON from our own API routes, but if
// something upstream ever returns an empty/HTML error page instead (a crash,
// a proxy timeout, etc.), don't let res.json() throw a confusing raw parse
// error - fall back to a generic message instead.
async function safeJson(res: Response): Promise<{ error?: string; [key: string]: unknown }> {
  try {
    return await res.json()
  } catch {
    return { error: `Unexpected error (status ${res.status}). Please try again.` }
  }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  )
}

function PasswordField({
  value,
  onChange,
  autoComplete,
}: {
  value: string
  onChange: (value: string) => void
  autoComplete: string
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} pr-11`}
        autoComplete={autoComplete}
        minLength={8}
      />
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-stone-400 transition hover:text-stone-700"
        aria-label={visible ? 'Hide password' : 'Show password'}
        tabIndex={-1}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}

function StatusMessage({ status, message }: { status: 'idle' | 'saving' | 'success' | 'error'; message: string }) {
  if (!message) return null
  return (
    <p className={`text-sm font-medium ${status === 'error' ? 'text-red-700' : 'text-emerald-700'}`}>{message}</p>
  )
}

export default function AccountSettingsForm({
  initialName,
  initialEmail,
  initialAvatarUrl,
  initialControlPanelAvatarUrl,
}: {
  initialName: string
  initialEmail: string
  initialAvatarUrl?: string
  initialControlPanelAvatarUrl?: string
}) {
  const { update } = useSession()

  // Profile (name + email) state
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || '')
  const [avatarStatus, setAvatarStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [avatarMessage, setAvatarMessage] = useState('')
  const [controlPanelAvatarUrl, setControlPanelAvatarUrl] = useState(initialControlPanelAvatarUrl || '')
  const [controlPanelAvatarStatus, setControlPanelAvatarStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [controlPanelAvatarMessage, setControlPanelAvatarMessage] = useState('')
  const [profileStatus, setProfileStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [profileMessage, setProfileMessage] = useState('')
  const [pendingEmailConfirm, setPendingEmailConfirm] = useState(false)
  const [emailCode, setEmailCode] = useState('')
  const [confirmStatus, setConfirmStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [confirmMessage, setConfirmMessage] = useState('')

  // Password state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [passwordMessage, setPasswordMessage] = useState('')

  // Sign out other devices state
  const [signOutStatus, setSignOutStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [signOutMessage, setSignOutMessage] = useState('')

  const handleAvatarChange = async (url: string) => {
    setAvatarUrl(url)
    setAvatarStatus('saving')
    setAvatarMessage('')

    try {
      const res = await fetch('/api/account/update-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatarUrl: url }),
      })
      const result = await safeJson(res)

      if (!res.ok) {
        throw new Error(result?.error || 'Unable to save photo')
      }

      notifyProfileUpdated()
      setAvatarStatus('success')
      setAvatarMessage(url ? 'Photo updated.' : 'Photo removed.')
    } catch (error) {
      setAvatarStatus('error')
      setAvatarMessage(error instanceof Error ? error.message : 'Unable to save photo')
    }
  }

  const handleControlPanelAvatarChange = async (url: string) => {
    setControlPanelAvatarUrl(url)
    setControlPanelAvatarStatus('saving')
    setControlPanelAvatarMessage('')

    try {
      const res = await fetch('/api/account/update-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ controlPanelAvatarUrl: url }),
      })
      const result = await safeJson(res)

      if (!res.ok) {
        throw new Error(result?.error || 'Unable to save photo')
      }

      notifyProfileUpdated()
      setControlPanelAvatarStatus('success')
      setControlPanelAvatarMessage(url ? 'Photo updated.' : 'Photo removed.')
    } catch (error) {
      setControlPanelAvatarStatus('error')
      setControlPanelAvatarMessage(error instanceof Error ? error.message : 'Unable to save photo')
    }
  }

  const handleProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setProfileStatus('saving')
    setProfileMessage('')

    const emailChanged = email.trim().toLowerCase() !== initialEmail.trim().toLowerCase()

    try {
      const res = await fetch('/api/account/update-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          ...(emailChanged ? { email } : {}),
        }),
      })
      const result = await safeJson(res)

      if (!res.ok) {
        throw new Error(result?.error || 'Unable to save changes')
      }

      if (result.pendingEmailVerificationRequired) {
        setPendingEmailConfirm(true)
        setProfileStatus('success')
        setProfileMessage(`We sent a confirmation code to ${email}. Enter it below to finish changing your email.`)
      } else {
        await update()
        setProfileStatus('success')
        setProfileMessage('Saved.')
      }
    } catch (error) {
      setProfileStatus('error')
      setProfileMessage(error instanceof Error ? error.message : 'Unable to save changes')
    }
  }

  const handleConfirmEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setConfirmStatus('saving')
    setConfirmMessage('')

    try {
      const res = await fetch('/api/account/confirm-email-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: emailCode }),
      })
      const result = await safeJson(res)

      if (!res.ok) {
        throw new Error(result?.error || 'Invalid or expired code')
      }

      await update()
      setPendingEmailConfirm(false)
      setEmailCode('')
      setConfirmStatus('success')
      setConfirmMessage('Email updated.')
    } catch (error) {
      setConfirmStatus('error')
      setConfirmMessage(error instanceof Error ? error.message : 'Invalid or expired code')
    }
  }

  const handleSignOutOtherDevices = async () => {
    setSignOutStatus('saving')
    setSignOutMessage('')

    try {
      const res = await fetch('/api/account/sign-out-other-devices', { method: 'POST' })
      const result = await safeJson(res)

      if (!res.ok) {
        throw new Error(result?.error || 'Unable to sign out other devices')
      }

      await update()
      setSignOutStatus('success')
      setSignOutMessage('You have been signed out of all other devices.')
    } catch (error) {
      setSignOutStatus('error')
      setSignOutMessage(error instanceof Error ? error.message : 'Unable to sign out other devices')
    }
  }

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPasswordStatus('saving')
    setPasswordMessage('')

    if (newPassword.length < 8) {
      setPasswordStatus('error')
      setPasswordMessage('New password must be at least 8 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatus('error')
      setPasswordMessage('New password and confirmation do not match.')
      return
    }

    try {
      const res = await fetch('/api/account/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const result = await safeJson(res)

      if (!res.ok) {
        throw new Error(result?.error || 'Unable to change password')
      }

      // Refresh this session's own token so it isn't logged out along with
      // every other device the tokenVersion bump just invalidated.
      await update()

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setPasswordStatus('success')
      setPasswordMessage('Password changed. You have been signed out of all other devices.')
    } catch (error) {
      setPasswordStatus('error')
      setPasswordMessage(error instanceof Error ? error.message : 'Unable to change password')
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-stone-500" />
          <h2 className="text-2xl font-bold tracking-tight text-stone-950">Account</h2>
        </div>
        <p className="mt-2 text-sm text-stone-600">Your name and login email.</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <span className="text-sm font-medium text-stone-700">Profile photo</span>
            <p className="mt-1 text-xs text-stone-500">Shown in the account menu at the top of the dashboard.</p>
            <div className="mt-2">
              <ImageUploadField value={avatarUrl} onChange={handleAvatarChange} collapsible size={64} />
            </div>
            <div className="mt-2">
              <StatusMessage status={avatarStatus} message={avatarMessage} />
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-stone-700">Control Panel photo</span>
            <p className="mt-1 text-xs text-stone-500">Shown in the sidebar's Control Panel - can be a different image.</p>
            <div className="mt-2">
              <ImageUploadField value={controlPanelAvatarUrl} onChange={handleControlPanelAvatarChange} collapsible size={64} />
            </div>
            <div className="mt-2">
              <StatusMessage status={controlPanelAvatarStatus} message={controlPanelAvatarMessage} />
            </div>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit} className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label="Name">
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                if (profileStatus === 'success') {
                  setProfileStatus('idle')
                  setProfileMessage('')
                }
              }}
              className={inputClass}
              placeholder="Your name"
            />
          </Field>
          <Field label="Email">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-stone-400" />
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (profileStatus === 'success') {
                    setProfileStatus('idle')
                    setProfileMessage('')
                  }
                }}
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
            <p className="mt-2 text-xs text-stone-500">
              Changing this sends a confirmation code to the new address before it takes effect.
            </p>
          </Field>

          <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
            <StatusMessage status={profileStatus} message={profileMessage} />
            <button
              type="submit"
              disabled={profileStatus === 'saving'}
              className="ml-auto inline-flex items-center gap-2 rounded-xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {profileStatus === 'saving' ? 'Saving profile...' : 'Save profile'}
            </button>
          </div>
        </form>

        {pendingEmailConfirm ? (
          <form
            onSubmit={handleConfirmEmail}
            className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5"
          >
            <p className="text-sm font-semibold text-blue-900">Confirm your new email</p>
            <p className="mt-1 text-xs text-blue-800">Enter the 6-digit code we sent to {email}.</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <input
                type="text"
                inputMode="numeric"
                value={emailCode}
                onChange={(event) => setEmailCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                className={`${inputClass} max-w-[160px] tracking-[0.3em]`}
                placeholder="000000"
              />
              <button
                type="submit"
                disabled={confirmStatus === 'saving' || emailCode.length !== 6}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {confirmStatus === 'saving' ? 'Confirming...' : 'Confirm email'}
              </button>
            </div>
            <div className="mt-2">
              <StatusMessage status={confirmStatus} message={confirmMessage} />
            </div>
          </form>
        ) : null}
      </section>

      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-stone-500" />
          <h2 className="text-2xl font-bold tracking-tight text-stone-950">Password</h2>
        </div>
        <p className="mt-2 text-sm text-stone-600">
          Changing your password signs you out of every other device and browser.
        </p>

        <form onSubmit={handlePasswordSubmit} className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label="Current password">
            <PasswordField
              value={currentPassword}
              onChange={setCurrentPassword}
              autoComplete="current-password"
            />
          </Field>
          <div className="hidden md:block" />
          <Field label="New password">
            <PasswordField value={newPassword} onChange={setNewPassword} autoComplete="new-password" />
          </Field>
          <Field label="Confirm new password">
            <PasswordField
              value={confirmPassword}
              onChange={setConfirmPassword}
              autoComplete="new-password"
            />
          </Field>

          <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
            <StatusMessage status={passwordStatus} message={passwordMessage} />
            <button
              type="submit"
              disabled={passwordStatus === 'saving'}
              className="ml-auto inline-flex items-center gap-2 rounded-xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <KeyRound className="h-4 w-4" />
              {passwordStatus === 'saving' ? 'Changing...' : 'Change password'}
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-6">
          <div>
            <p className="text-sm font-medium text-stone-800">Not sure if you're logged in elsewhere?</p>
            <p className="mt-1 text-xs text-stone-500">
              Sign out of every other device and browser without changing your password.
            </p>
            <div className="mt-2">
              <StatusMessage status={signOutStatus} message={signOutMessage} />
            </div>
          </div>
          <button
            type="button"
            onClick={handleSignOutOtherDevices}
            disabled={signOutStatus === 'saving'}
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            {signOutStatus === 'saving' ? 'Signing out...' : 'Sign out other devices'}
          </button>
        </div>
      </section>
    </div>
  )
}
