'use client'

import { useMemo } from 'react'
import { db } from '@/lib/instantdb'
import { getCatalogSnapshot } from '@/lib/catalog-source'

export function useCatalogProducts(storeId?: string | null) {
  const { data, isLoading, error } = db.useQuery(
    storeId
      ? {
          stores: {
            $: { where: { id: storeId } },
          },
          products: {
            $: { where: { storeId } },
          },
        }
      : null
  )

  const store = data?.stores?.[0] ?? null
  const rawProducts = data?.products

  const catalog = useMemo(() => {
    return getCatalogSnapshot(rawProducts, store)
  }, [rawProducts, store])

  return {
    ...catalog,
    isLoading,
    error,
  }
}
