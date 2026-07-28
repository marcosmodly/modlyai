'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export const PROFILE_UPDATED_EVENT = 'modly:profile-updated'

// Dispatch this after a successful avatar or store-logo save so every open
// Header/Sidebar instance refetches immediately, instead of waiting for a
// page reload.
export function notifyProfileUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT))
  }
}

export function useProfileSummary() {
  const { data: session } = useSession()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [controlPanelAvatarUrl, setControlPanelAvatarUrl] = useState<string | null>(null)
  const [storeLogoUrl, setStoreLogoUrl] = useState<string | null>(null)

  const load = () => {
    fetch('/api/account/profile-summary')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return
        setAvatarUrl(data.avatarUrl || null)
        setControlPanelAvatarUrl(data.controlPanelAvatarUrl || null)
        setStoreLogoUrl(data.storeLogoUrl || null)
      })
      .catch(() => {
        // Fail quietly - callers just fall back to the generated initial.
      })
  }

  useEffect(() => {
    if (!session?.user?.id) return
    load()

    window.addEventListener(PROFILE_UPDATED_EVENT, load)
    return () => window.removeEventListener(PROFILE_UPDATED_EVENT, load)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id])

  return { avatarUrl, controlPanelAvatarUrl, storeLogoUrl }
}
