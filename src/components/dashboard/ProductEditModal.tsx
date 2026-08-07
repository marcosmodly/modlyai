'use client'

import { X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import ImageUploadField from '@/components/ImageUploadField'
import type { ProductCustomizationOptions } from '@/lib/product-customization'

const inputClass =
  'w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100'
const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-stone-500'

async function safeJson(res: Response): Promise<{ error?: string; [key: string]: unknown }> {
  try {
    return await res.json()
  } catch {
    return { error: `Unexpected error (status ${res.status}). Please try again.` }
  }
}

function optionValueName(value: unknown): string {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && 'name' in (value as Record<string, unknown>)) {
    return String((value as Record<string, unknown>).name ?? '')
  }
  return ''
}

function joinOptionNames(values: unknown): string {
  if (!Array.isArray(values)) return ''
  return values.map(optionValueName).filter(Boolean).join(', ')
}

function splitCommaList(value: string): string[] {
  return value.split(',').map((entry) => entry.trim()).filter(Boolean)
}

type DimensionField = { min: string; max: string; default: string }

function dimensionFromOptions(
  options: ProductCustomizationOptions | undefined,
  axis: 'width' | 'length' | 'height'
): DimensionField {
  const dimension = options?.dimensions?.[axis]
  return {
    min: dimension?.min !== undefined ? String(dimension.min) : '',
    max: dimension?.max !== undefined ? String(dimension.max) : '',
    default: dimension?.default !== undefined ? String(dimension.default) : '',
  }
}

function dimensionPayload(field: DimensionField) {
  const payload: Record<string, number> = {}
  if (field.min.trim()) payload.min = Number(field.min)
  if (field.max.trim()) payload.max = Number(field.max)
  if (field.default.trim()) payload.default = Number(field.default)
  return payload
}

function DimensionRow({
  label,
  value,
  onChange,
}: {
  label: string
  value: DimensionField
  onChange: (next: DimensionField) => void
}) {
  return (
    <div>
      <span className={labelClass}>{label} (in)</span>
      <div className="mt-2 grid grid-cols-3 gap-2">
        <input
          type="number"
          placeholder="Min"
          value={value.min}
          onChange={(event) => onChange({ ...value, min: event.target.value })}
          className={inputClass}
        />
        <input
          type="number"
          placeholder="Max"
          value={value.max}
          onChange={(event) => onChange({ ...value, max: event.target.value })}
          className={inputClass}
        />
        <input
          type="number"
          placeholder="Default"
          value={value.default}
          onChange={(event) => onChange({ ...value, default: event.target.value })}
          className={inputClass}
        />
      </div>
    </div>
  )
}

export default function ProductEditModal({
  product,
  onClose,
  onSaved,
}: {
  product?: Record<string, any> | null
  onClose: () => void
  onSaved: () => void
}) {
  const isCreate = !product
  const options = (product?.customizationOptions ?? undefined) as ProductCustomizationOptions | undefined

  const [name, setName] = useState<string>(product?.title ?? product?.name ?? '')
  const [category, setCategory] = useState<string>(product?.category ?? '')
  const [price, setPrice] = useState<string>(
    product?.price !== undefined && product?.price !== null ? String(product.price) : ''
  )
  const [productStatus, setProductStatus] = useState<string>(product?.status || 'active')
  const [imageUrl, setImageUrl] = useState<string>(product?.imageUrl ?? product?.image ?? '')
  const [description, setDescription] = useState<string>(product?.description ?? '')
  const [productUrl, setProductUrl] = useState<string>(product?.productUrl ?? product?.url ?? '')
  const [sku, setSku] = useState<string>(product?.sku ?? '')
  const [colors, setColors] = useState<string>(joinOptionNames(options?.colors) || (product?.colors ?? ''))
  const [materials, setMaterials] = useState<string>(joinOptionNames(options?.materials) || (product?.materials ?? ''))
  const [width, setWidth] = useState<DimensionField>(dimensionFromOptions(options, 'width'))
  const [length, setLength] = useState<DimensionField>(dimensionFromOptions(options, 'length'))
  const [height, setHeight] = useState<DimensionField>(dimensionFromOptions(options, 'height'))

  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'error'>('idle')
  const [saveMessage, setSaveMessage] = useState('')
  const [nameError, setNameError] = useState('')
  const [priceError, setPriceError] = useState('')

  const titleId = useId()
  const dialogPanelRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const priceInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    nameInputRef.current?.focus()

    return () => {
      previouslyFocused?.focus()
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (saveState === 'saving') return
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogPanelRef.current) return

      const focusable = Array.from(
        dialogPanelRef.current.querySelectorAll<HTMLElement>(
          'a, button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, saveState])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setNameError('')
    setPriceError('')

    const trimmedName = name.trim()
    if (!trimmedName) {
      setNameError('Product name is required.')
      nameInputRef.current?.focus()
      return
    }

    const priceValue = price.trim() ? Number(price) : undefined
    if (price.trim() && (!Number.isFinite(priceValue) || (priceValue as number) < 0)) {
      setPriceError("Price can't be negative.")
      priceInputRef.current?.focus()
      return
    }

    setSaveState('saving')
    setSaveMessage('')

    try {
      const res = await fetch(isCreate ? '/api/products' : `/api/products/${product!.id}`, {
        method: isCreate ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          category,
          description,
          imageUrl,
          status: productStatus,
          productUrl: productUrl.trim(),
          sku: sku.trim(),
          ...(priceValue !== undefined ? { price: priceValue } : {}),
          colors: splitCommaList(colors),
          materials: splitCommaList(materials),
          dimensions: {
            width: dimensionPayload(width),
            length: dimensionPayload(length),
            height: dimensionPayload(height),
          },
        }),
      })
      const result = await safeJson(res)

      if (!res.ok) {
        throw new Error(result?.error || `Unable to ${isCreate ? 'create' : 'save'} product.`)
      }

      onSaved()
    } catch (error) {
      setSaveState('error')
      setSaveMessage(error instanceof Error ? error.message : `Unable to ${isCreate ? 'create' : 'save'} product.`)
    }
  }

  const closeIfNotSaving = () => {
    if (saveState === 'saving') return
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/50 p-4 opacity-100"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeIfNotSaving()
      }}
    >
      <div
        ref={dialogPanelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="my-8 w-full max-w-2xl rounded-[28px] border border-stone-200 bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <h2 id={titleId} className="text-lg font-bold text-stone-950">{isCreate ? 'Add product' : 'Edit product'}</h2>
          <button
            type="button"
            onClick={closeIfNotSaving}
            disabled={saveState === 'saving'}
            className="rounded-full p-3 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[75vh] space-y-6 overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Name</span>
              <input
                ref={nameInputRef}
                type="text"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  if (nameError) setNameError('')
                }}
                aria-invalid={nameError ? true : undefined}
                aria-describedby={nameError ? 'product-name-error' : undefined}
                className={`${inputClass} mt-2`}
              />
              {nameError ? (
                <p id="product-name-error" role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                  {nameError}
                </p>
              ) : null}
            </label>
            <label className="block">
              <span className={labelClass}>Category</span>
              <input
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className={`${inputClass} mt-2`}
              />
            </label>
            <label className="block">
              <span className={labelClass}>Price</span>
              <input
                ref={priceInputRef}
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value)
                  if (priceError) setPriceError('')
                }}
                aria-invalid={priceError ? true : undefined}
                aria-describedby={priceError ? 'product-price-error' : undefined}
                className={`${inputClass} mt-2`}
              />
              {priceError ? (
                <p id="product-price-error" role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                  {priceError}
                </p>
              ) : null}
            </label>
            <label className="block">
              <span className={labelClass}>Status</span>
              <select
                value={productStatus}
                onChange={(event) => setProductStatus(event.target.value)}
                className={`${inputClass} mt-2`}
              >
                <option value="active">Active</option>
                <option value="hidden">Hidden</option>
              </select>
            </label>
          </div>

          <div>
            <span className={labelClass}>Photo</span>
            <div className="mt-2">
              <ImageUploadField value={imageUrl} onChange={setImageUrl} shape="square" size={88} />
            </div>
          </div>

          <label className="block">
            <span className={labelClass}>Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              className={`${inputClass} mt-2`}
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Product page URL (optional)</span>
              <input
                type="text"
                value={productUrl}
                onChange={(event) => setProductUrl(event.target.value)}
                className={`${inputClass} mt-2`}
                placeholder="https://yourstore.com/products/example"
              />
              <p className="mt-1.5 text-xs text-stone-500">
                Where shoppers go when they tap &ldquo;View in catalog&rdquo;. Leave blank and we&apos;ll send them to your store search instead.
              </p>
            </label>
            <label className="block">
              <span className={labelClass}>SKU (optional)</span>
              <input
                type="text"
                value={sku}
                onChange={(event) => setSku(event.target.value)}
                className={`${inputClass} mt-2`}
              />
              <p className="mt-1.5 text-xs text-stone-500">
                Helps match this product if you later connect Shopify or re-import a CSV.
              </p>
            </label>
          </div>

          <div className="border-t border-stone-200 pt-5">
            <p className="text-sm font-semibold text-stone-800">Customization options</p>
            <p className="mt-1 text-xs text-stone-500">
              Shown to shoppers in the widget when customizing this product.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className={labelClass}>Colors</span>
                <input
                  type="text"
                  value={colors}
                  onChange={(event) => setColors(event.target.value)}
                  className={`${inputClass} mt-2`}
                  placeholder="Beige, Gray, White"
                />
              </label>
              <label className="block">
                <span className={labelClass}>Materials</span>
                <input
                  type="text"
                  value={materials}
                  onChange={(event) => setMaterials(event.target.value)}
                  className={`${inputClass} mt-2`}
                  placeholder="Oak, Walnut, Steel"
                />
              </label>
            </div>

            <div className="mt-4 space-y-4">
              <DimensionRow label="Width" value={width} onChange={setWidth} />
              <DimensionRow label="Length" value={length} onChange={setLength} />
              <DimensionRow label="Height" value={height} onChange={setHeight} />
            </div>
          </div>

          {saveMessage ? (
            <p role="alert" className={`text-sm font-medium ${saveState === 'error' ? 'text-red-700' : 'text-emerald-700'}`}>
              {saveMessage}
            </p>
          ) : null}

          <div className="flex items-center justify-end gap-3 border-t border-stone-200 pt-5">
            <button
              type="button"
              onClick={closeIfNotSaving}
              disabled={saveState === 'saving'}
              className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saveState === 'saving'}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saveState === 'saving' ? (isCreate ? 'Creating...' : 'Saving...') : isCreate ? 'Create product' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
