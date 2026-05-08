'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function StoreUrlInput({ initialUrl = '' }: { initialUrl?: string }) {
  const { data: session } = useSession()
  const [storeUrl, setStoreUrl] = useState(initialUrl)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const saveStoreUrl = async () => {
    if (!session?.user?.storeId) {
      setMessage('Missing store')
      return
    }

    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/store/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: session.user.storeId,
          url: storeUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save URL')
      }

      setStoreUrl(data.store?.url || storeUrl)
      setMessage('Saved')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to save URL')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mb-6">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Your Store Website URL
      </label>
      <div className="flex gap-2">
        <input
          type="url"
          placeholder="https://yourstore.com"
          value={storeUrl}
          onChange={(e) => setStoreUrl(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm"
        />
        <button
          type="button"
          onClick={saveStoreUrl}
          disabled={saving}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
      {message ? <p className="mt-2 text-sm text-stone-500">{message}</p> : null}
    </div>
  )
}
