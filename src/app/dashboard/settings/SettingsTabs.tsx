'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SettingsTabDirtyContext, type SettingsTabId } from '@/lib/settings-tab-dirty'

export type { SettingsTabId }

const TABS: { id: SettingsTabId; label: string }[] = [
  { id: 'widget', label: 'Widget' },
  { id: 'store', label: 'Store' },
  { id: 'account', label: 'Account' },
  { id: 'security', label: 'Security' },
]

const TAB_IDS = TABS.map((tab) => tab.id)

// TEMPORARY during the build-order #8 migration: Security is still a
// placeholder (Sessions/Delete Account haven't moved in yet), but nothing
// else is, so defaulting to 'widget' is safe again - flip to no default
// override (or leave as 'widget') once Security's move makes this page
// fully coherent and every tab has real content.
const DEFAULT_TAB: SettingsTabId = 'widget'

function isSettingsTabId(value: string | null): value is SettingsTabId {
  return TAB_IDS.includes(value as SettingsTabId)
}

// Split out so each panel can call useSettingsTabDirty(tabId) once - see
// src/lib/settings-tab-dirty.ts. This inner provider just forwards to the
// shell's setTabDirty for a specific tab.
function TabDirtyScope({
  tab,
  setTabDirty,
  children,
}: {
  tab: SettingsTabId
  setTabDirty: (tab: SettingsTabId, dirty: boolean) => void
  children: React.ReactNode
}) {
  const scopedSetter = useCallback((dirty: boolean) => setTabDirty(tab, dirty), [tab, setTabDirty])
  return <SettingsTabDirtyContext.Provider value={scopedSetter}>{children}</SettingsTabDirtyContext.Provider>
}

export default function SettingsTabs({
  panels,
}: {
  panels: Record<SettingsTabId, React.ReactNode>
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabRefs = useRef<Partial<Record<SettingsTabId, HTMLButtonElement | null>>>({})

  const requestedTab = searchParams.get('tab')
  const activeTab: SettingsTabId = isSettingsTabId(requestedTab) ? requestedTab : DEFAULT_TAB

  const [dirtyTabs, setDirtyTabs] = useState<Set<SettingsTabId>>(new Set())
  // Mount a panel the first time it's visited, then keep it mounted (panels
  // themselves stay in the DOM via `hidden`, not unmounted, once mounted -
  // this only defers the *first* mount of tabs the merchant never opens).
  // This is also why switching tabs is non-destructive: a dirty panel just
  // sits hidden with its state intact, it isn't torn down.
  const [mountedTabs, setMountedTabs] = useState<Set<SettingsTabId>>(() => new Set([activeTab]))

  // Derived from activeTab, not written imperatively from goToTab - any
  // navigation that changes ?tab= (a Link, an onboarding CTA, browser
  // history) must mount the panel it lands on, not just clicks that went
  // through goToTab. Direct URL entry worked before this fix only because
  // the useState initializer above happened to seed the same value.
  useEffect(() => {
    setMountedTabs((current) => (current.has(activeTab) ? current : new Set(current).add(activeTab)))
  }, [activeTab])

  const setTabDirty = useCallback((tab: SettingsTabId, dirty: boolean) => {
    setDirtyTabs((current) => {
      const isCurrentlyDirty = current.has(tab)
      if (dirty === isCurrentlyDirty) return current
      const next = new Set(current)
      if (dirty) {
        next.add(tab)
      } else {
        next.delete(tab)
      }
      return next
    })
  }, [])

  const goToTab = useCallback(
    (tab: SettingsTabId) => {
      if (tab === activeTab) return

      // No confirm here on purpose: panels stay mounted (hidden, not
      // unmounted) once visited, so switching tabs never discards anything.
      // The amber dot on a dirty tab is the passive signal that work is
      // waiting there; beforeunload is what actually guards against loss,
      // when the merchant tries to leave the page entirely.
      //
      // replace, not push: tab switches shouldn't create browser-history
      // entries, so Back leaves the settings page rather than stepping
      // through tab states.
      const params = new URLSearchParams(searchParams.toString())
      params.set('tab', tab)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [activeTab, pathname, router, searchParams]
  )

  const handleTabKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const currentIndex = TAB_IDS.indexOf(activeTab)
      let nextIndex: number | null = null

      if (event.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % TAB_IDS.length
      } else if (event.key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + TAB_IDS.length) % TAB_IDS.length
      } else if (event.key === 'Home') {
        nextIndex = 0
      } else if (event.key === 'End') {
        nextIndex = TAB_IDS.length - 1
      } else {
        return
      }

      event.preventDefault()
      const nextTab = TAB_IDS[nextIndex]
      goToTab(nextTab)
      tabRefs.current[nextTab]?.focus()
    },
    [activeTab, goToTab]
  )

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label="Settings sections"
        className="flex flex-wrap gap-2 rounded-2xl border border-stone-200 bg-white p-2 shadow-sm"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab
          const isDirty = dirtyTabs.has(tab.id)
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el
              }}
              type="button"
              role="tab"
              id={`settings-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`settings-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => goToTab(tab.id)}
              onKeyDown={handleTabKeyDown}
              className={[
                'rounded-xl px-4 py-3 text-sm font-semibold outline-none transition',
                'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                isActive ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100',
              ].join(' ')}
            >
              {tab.label}
              {isDirty ? <span className="ml-1.5 text-amber-700" aria-hidden="true">•</span> : null}
              {isDirty ? <span className="sr-only"> (unsaved changes)</span> : null}
            </button>
          )
        })}
      </div>

      {TABS.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`settings-panel-${tab.id}`}
          aria-labelledby={`settings-tab-${tab.id}`}
          hidden={tab.id !== activeTab}
        >
          <TabDirtyScope tab={tab.id} setTabDirty={setTabDirty}>
            {mountedTabs.has(tab.id) ? panels[tab.id] : null}
          </TabDirtyScope>
        </div>
      ))}
    </div>
  )
}
