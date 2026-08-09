'use client'

import { ImageOff, Plus, PackagePlus, Pencil, Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import NoStoreState from '@/components/dashboard/NoStoreState'
import ProductEditModal from '@/components/dashboard/ProductEditModal'
import { getBillingAccess } from '@/lib/billing/access'
import { formatCatalogCountLabel } from '@/lib/catalog-source'
import { formatLimit, getPlanLimits } from '@/lib/plans'
import { useCatalogProducts } from '@/lib/use-catalog-products'

const UNCATEGORIZED = '__uncategorized__'
const SEARCH_DEBOUNCE_MS = 200

async function safeJson(res: Response): Promise<{ error?: string; [key: string]: unknown }> {
  try {
    return await res.json()
  } catch {
    return { error: `Unexpected error (status ${res.status}). Please try again.` }
  }
}

function SelectAllCheckbox({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean
  indeterminate: boolean
  onChange: () => void
}) {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label="Select all products"
      className="h-4 w-4 rounded border-stone-300 text-blue-600 focus:ring-blue-500"
    />
  )
}

export default function ProductsPage() {
  const { data: session, status } = useSession()
  const storeId = session?.user?.storeId

  const catalog = useCatalogProducts(storeId)
  const [editingProduct, setEditingProduct] = useState<Record<string, any> | null>(null)
  const [creatingProduct, setCreatingProduct] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  // Keyed by product id, not a single global string, so a delete failure
  // shows up on the card it happened to instead of an unrelated banner at
  // the top of the page.
  const [deleteErrors, setDeleteErrors] = useState<Record<string, string>>({})
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [searchInput])

  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkDeleting, setBulkDeleting] = useState(false)
  const [bulkDeleteMessage, setBulkDeleteMessage] = useState('')

  const clearFromSelection = (ids: string[]) => {
    setSelectedIds((current) => {
      const next = new Set(current)
      ids.forEach((id) => next.delete(id))
      return next
    })
  }

  const handleDelete = async (product: Record<string, any>) => {
    const label = product.title || product.name || 'this product'
    if (!window.confirm(`Delete "${label}"? This can't be undone.`)) return

    setDeletingId(product.id)
    setDeleteErrors((current) => {
      const next = { ...current }
      delete next[product.id]
      return next
    })

    try {
      const res = await fetch(`/api/products/${product.id}`, { method: 'DELETE' })
      const result = await safeJson(res)

      if (!res.ok) {
        throw new Error(result?.error || 'Unable to delete product.')
      }

      clearFromSelection([product.id])
      catalog.refetch()
    } catch (error) {
      setDeleteErrors((current) => ({
        ...current,
        [product.id]: error instanceof Error ? error.message : 'Unable to delete product.',
      }))
    } finally {
      setDeletingId(null)
    }
  }

  const handleBulkDelete = async () => {
    const ids = [...selectedIds]
    if (ids.length === 0) return
    const label = `${ids.length} product${ids.length === 1 ? '' : 's'}`
    if (!window.confirm(`Delete ${label}? This can't be undone.`)) return

    setBulkDeleting(true)
    setBulkDeleteMessage('')

    try {
      const res = await fetch('/api/products/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      })
      const result = await safeJson(res)

      if (!res.ok) {
        throw new Error(result?.error || 'Unable to delete products.')
      }

      const deletedIds: string[] = Array.isArray(result.deletedIds) ? (result.deletedIds as string[]) : []
      const failed: { id: string; error: string }[] = Array.isArray(result.failed)
        ? (result.failed as { id: string; error: string }[])
        : []

      clearFromSelection(deletedIds)

      if (failed.length > 0) {
        setDeleteErrors((current) => {
          const next = { ...current }
          failed.forEach((entry) => {
            next[entry.id] = entry.error
          })
          return next
        })
        setBulkDeleteMessage(
          `Deleted ${deletedIds.length} of ${ids.length} products. ${failed.length} failed - still selected below, see each card.`
        )
      }

      if (deletedIds.length > 0) {
        catalog.refetch()
      }
    } catch (error) {
      setBulkDeleteMessage(error instanceof Error ? error.message : 'Unable to delete products.')
    } finally {
      setBulkDeleting(false)
    }
  }

  const products = [...(catalog.products ?? [])].sort((a: any, b: any) => {
    return String(a.title ?? '').localeCompare(String(b.title ?? ''))
  })
  const access = getBillingAccess(catalog.store)
  const productLimit = getPlanLimits(access.hasActiveAccess ? access.plan : 'free_trial').productLimit
  const productLimitReached = productLimit !== null && products.length >= productLimit

  // Category is free-text on every ingestion path (CSV, Shopify, WooCommerce,
  // manual) with no enforced taxonomy, so populate the filter from what's
  // actually there - and skip it entirely if most products don't have one,
  // rather than showing a filter that mostly just says "Uncategorized".
  const categorizedCount = products.filter((product: any) => String(product.category ?? '').trim()).length
  const showCategoryFilter = products.length > 0 && categorizedCount / products.length > 0.5
  const categories = useMemo(() => {
    if (!showCategoryFilter) return []
    return [...new Set(products.map((product: any) => String(product.category ?? '').trim()).filter(Boolean))].sort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, showCategoryFilter])

  const normalizedSearch = debouncedSearch.trim().toLowerCase()
  const filteredProducts = products.filter((product: any) => {
    if (categoryFilter !== 'all') {
      const category = String(product.category ?? '').trim()
      if (categoryFilter === UNCATEGORIZED) {
        if (category) return false
      } else if (category !== categoryFilter) {
        return false
      }
    }
    if (!normalizedSearch) return true
    const title = String(product.title ?? product.name ?? '').toLowerCase()
    const sku = String(product.sku ?? '').toLowerCase()
    return title.includes(normalizedSearch) || sku.includes(normalizedSearch)
  })
  const filteredIds = filteredProducts.map((product: any) => String(product.id))
  const allFilteredSelected = filteredIds.length > 0 && filteredIds.every((id) => selectedIds.has(id))
  const someFilteredSelected = filteredIds.some((id) => selectedIds.has(id))

  const toggleSelected = (id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (allFilteredSelected) {
        filteredIds.forEach((id) => next.delete(id))
      } else {
        filteredIds.forEach((id) => next.add(id))
      }
      return next
    })
  }

  if (status === 'loading' || catalog.isLoading) {
    return (
      <div className="flex p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!storeId) {
    console.error('[no-store] user has no store', { userId: session?.user?.id, page: 'Products' })
    return <NoStoreState title="Products" />
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-stone-200 bg-[linear-gradient(180deg,#fffdfa_0%,#f8f4ec_100%)] p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Catalog</p>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              {formatCatalogCountLabel(catalog)} in your catalog.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setCreatingProduct(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 hover:bg-stone-50"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </button>
            <Link
              href="/dashboard/integrations"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <PackagePlus className="h-4 w-4" />
              Import Products
            </Link>
          </div>
        </div>
      </section>

      {productLimitReached ? (
        <section className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          Your plan allows {formatLimit(productLimit)} products. Upgrade to import more.
        </section>
      ) : null}

      {products.length > 0 ? (
        <section className="rounded-[28px] border border-stone-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex shrink-0 items-center gap-2 text-sm font-medium text-stone-700">
              <SelectAllCheckbox
                checked={allFilteredSelected}
                indeterminate={!allFilteredSelected && someFilteredSelected}
                onChange={toggleSelectAll}
              />
              Select all
            </label>

            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search by name or SKU"
              className="min-w-[200px] flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {showCategoryFilter ? (
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All categories</option>
                <option value={UNCATEGORIZED}>Uncategorized</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            ) : null}

            <span className="shrink-0 text-sm text-stone-500">
              {filteredProducts.length} of {products.length} products
            </span>
          </div>
        </section>
      ) : null}

      {selectedIds.size > 0 ? (
        <section className="sticky top-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 shadow-sm">
          <p className="text-sm font-semibold text-blue-900">{selectedIds.size} selected</p>
          <div className="flex items-center gap-3">
            {bulkDeleteMessage ? (
              <p role="alert" className="text-sm font-medium text-red-700">
                {bulkDeleteMessage}
              </p>
            ) : null}
            <button
              type="button"
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 className="h-4 w-4" />
              {bulkDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </section>
      ) : null}

      {products.length === 0 ? (
        <section className="rounded-[32px] border border-stone-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-500">
            <PackagePlus className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-xl font-bold text-stone-950">No products yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-stone-500">Add a product yourself, or import your catalog to get started.</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCreatingProduct(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-6 py-2 text-sm font-medium text-stone-800 hover:bg-stone-50"
            >
              Add Product
            </button>
            <Link
              href="/dashboard/integrations"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Import via CSV
            </Link>
          </div>
        </section>
      ) : filteredProducts.length === 0 ? (
        <section className="rounded-[32px] border border-stone-200 bg-white p-12 text-center shadow-sm">
          <p className="text-sm text-stone-600">No products match your search or filter.</p>
          <button
            type="button"
            onClick={() => {
              setSearchInput('')
              setCategoryFilter('all')
            }}
            className="mt-3 text-sm font-medium text-blue-700 hover:underline"
          >
            Clear filters
          </button>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product: any) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {product.imageUrl && !imageErrors.has(product.id) ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-48 w-full object-cover"
                  onError={() => setImageErrors((current) => new Set(current).add(product.id))}
                />
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-stone-100 text-stone-400">
                  <ImageOff className="h-8 w-8" />
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(product.id)}
                      onChange={() => toggleSelected(product.id)}
                      aria-label={`Select ${product.title || product.name || 'this product'}`}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-stone-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <h3 className="font-semibold text-stone-950">{product.title}</h3>
                      <p className="mt-0.5 text-sm text-stone-500">{product.category || 'Uncategorized'}</p>
                    </div>
                  </div>
                  <span className="shrink-0 font-semibold text-blue-700">
                    {product.price !== undefined && Number.isFinite(Number(product.price))
                      ? `$${Number(product.price).toFixed(2)}`
                      : 'Price unavailable'}
                  </span>
                </div>

                {product.description ? (
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-600">{product.description}</p>
                ) : null}

                {product.dimensions ? (
                  <div className="mt-4 text-xs text-stone-500">{product.dimensions}</div>
                ) : null}

                {product.sku ? (
                  <div className="mt-3">
                    <span className="rounded-full bg-stone-100 px-2 py-1 text-xs text-stone-600">SKU: {product.sku}</span>
                  </div>
                ) : null}

                <div className="mt-4 flex items-center gap-2 border-t border-stone-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(product)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-stone-300 px-3 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(product)}
                    disabled={deletingId === product.id}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {deletingId === product.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>

                {deleteErrors[product.id] ? (
                  <p role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                    {deleteErrors[product.id]}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </section>
      )}

      {editingProduct ? (
        <ProductEditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSaved={() => {
            setEditingProduct(null)
            catalog.refetch()
          }}
        />
      ) : null}

      {creatingProduct ? (
        <ProductEditModal
          onClose={() => setCreatingProduct(false)}
          onSaved={() => {
            setCreatingProduct(false)
            catalog.refetch()
          }}
        />
      ) : null}
    </div>
  )
}
