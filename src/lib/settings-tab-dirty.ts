'use client'

import { createContext, useCallback, useContext } from 'react'

export type SettingsTabId = 'widget' | 'store' | 'account' | 'security'

// Lets a tab's own form report whether it currently has unsaved changes,
// without SettingsTabs needing to know anything about what's inside each
// panel. A panel calls useSettingsTabDirty(tabId) once and passes the
// returned setter its own isDirty boolean (mirroring the pattern already
// proven in WhiteLabelSettingsForm's savedFormState tracking).
export const SettingsTabDirtyContext = createContext<((dirty: boolean) => void) | null>(null)

export function useSettingsTabDirty(tab: SettingsTabId) {
  const setTabDirty = useContext(SettingsTabDirtyContext)
  return useCallback(
    (dirty: boolean) => {
      setTabDirty?.(dirty)
    },
    [setTabDirty]
  )
}
