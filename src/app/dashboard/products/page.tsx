'use client'

import { ImageOff, PackagePlus, Pencil, Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import NoStoreState from '@/components/dashboard/NoStoreState'
import ProductEditModal from '@/components/dashboard/ProductEditModal'
import { getBillingAccess } from '@/lib/billing/access'
import { formatCatalogCountLabel } from '@/lib/catalog-source'
import { formatLimit, getPlanLimits } from '@/lib/plans'
import { useCatalogProducts } from '@/lib/use-catalog-products'

async function safeJson(res: Response): Promise<{ error?: string; [key: string]: unknown }> {
  try {
    return await res.json()
  } catch {
    return { error: `Unexpected error (status ${res.status}). Please try again.` }
  }
}

export default function ProductsPage() {
  const { data: session, status } = useSession()
  const storeId = session?.user?.storeId

  const catalog = useCatalogProducts(storeId)
  const [editingProduct, setEditingProduct] = useState<Record<string, any> | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState('')

  const handleDelete = async (product: Record<string, any>) => {
    const label = product.title || product.name || 'this product'
    if (!window.confirm(`Delete "${label}"? This can't be undone.`)) return

    setDeletingId(product.id)
    setDeleteError('')

    try {
      const res = await fetch(`/api/products/${product.id}`, { method: 'DELETE' })
      const result = await safeJson(res)

      if (!res.ok) {
        throw new Error(result?.error || 'Unable to delete product.')
      }

      catalog.refetch()
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Unable to delete product.')
    } finally {
      setDeletingId(null)
    }
  }

  const products = [...(catalog.products ?? [])].sort((a: any, b: any) => {
    return String(a.title ?? '').localeCompare(String(b.title ?? ''))
  })
  const access = getBillingAccess(catalog.store)
  const productLimit = getPlanLimits(access.hasActiveAccess ? access.plan : 'free_trial').productLimit
  const productLimitReached = productLimit !== null && products.length >= productLimit

  if (status === 'loading' || catalog.isLoading) {
    return (
      <div className="flex p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!storeId) {
    return <NoStoreState title="Products" />
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-stone-200 bg-[linear-gradient(180deg,#fffdfa_0%,#f8f4ec_100%)] p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Catalog</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-950">Products</h1>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              {formatCatalogCountLabel(catalog)} in your catalog.
            </p>
          </div>

          <Link
            href="/dashboard/integrations"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <PackagePlus className="h-4 w-4" />
            Import Products
          </Link>
        </div>
      </section>

      {productLimitReached ? (
        <section className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          Your plan allows {formatLimit(productLimit)} products. Upgrade to import more.
        </section>
      ) : null}

      {deleteError ? (
        <section className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {deleteError}
        </section>
      ) : null}

      {products.length === 0 ? (
        <section className="rounded-[32px] border border-stone-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-500">
            <PackagePlus className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-xl font-bold text-stone-950">No products yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-stone-500">Import your catalog to get started.</p>
          <Link
            href="/dashboard/integrations"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Import via CSV
          </Link>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product: any) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-48 w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                  }}
                />
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-stone-100 text-stone-400">
                  <ImageOff className="h-8 w-8" />
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                  <h2 className="font-semibold text-stone-950">{product.title}</h2>
                    <p className="mt-0.5 text-sm text-stone-500">{product.category || 'Uncategorized'}</p>
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
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(product)}
                    disabled={deletingId === product.id}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {deletingId === product.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
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
    </div>
  )
}
