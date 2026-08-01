'use client'

import { useEffect, useMemo, useState } from 'react'
import { getCatalogSnapshot } from '@/lib/catalog-source'

// This used to query InstantDB directly from the browser via the client SDK
// (db.useQuery({ stores: {...}, products: {...} })). That relied entirely on
// InstantDB permission rules for security, and since this app authenticates via
// NextAuth (not InstantDB's own auth), the client SDK is never actually signed in -
// meaning `stores` would have had to stay open to any visitor with the public
// app ID for this to keep working. Now that instant.perms.ts denies all client
// access to `stores`/`users`, this fetches from an authenticated server route
// instead, which checks the NextAuth session and only returns the caller's own store.
export function useCatalogProducts(storeId?: string | null) {
  const [data, setData] = useState<{ store: any; products: any[] } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refetchToken, setRefetchToken] = useState(0)

  useEffect(() => {
    if (!storeId) {
      setData(null)
      setIsLoading(false)
      return
    }

    let cancelled = false
    setIsLoading(true)
    setError(null)

    fetch('/api/dashboard/products')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to load your product catalog.')
        }
        return res.json()
      })
      .then((json) => {
        if (!cancelled) {
          setData(json)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to load your product catalog.'))
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [storeId, refetchToken])

  const store = data?.store ?? null
  const rawProducts = data?.products

  const catalog = useMemo(() => {
    return getCatalogSnapshot(rawProducts, store)
  }, [rawProducts, store])

  return {
    ...catalog,
    store,
    isLoading,
    error,
    refetch: () => setRefetchToken((token) => token + 1),
  }
}
