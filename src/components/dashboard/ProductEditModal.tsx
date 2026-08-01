'use client'

import { X } from 'lucide-react'
import { useState } from 'react'
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
  product: Record<string, any>
  onClose: () => void
  onSaved: () => void
}) {
  const options = (product.customizationOptions ?? undefined) as ProductCustomizationOptions | undefined

  const [name, setName] = useState<string>(product.title ?? product.name ?? '')
  const [category, setCategory] = useState<string>(product.category ?? '')
  const [price, setPrice] = useState<string>(
    product.price !== undefined && product.price !== null ? String(product.price) : ''
  )
  const [productStatus, setProductStatus] = useState<string>(product.status || 'active')
  const [imageUrl, setImageUrl] = useState<string>(product.imageUrl ?? product.image ?? '')
  const [description, setDescription] = useState<string>(product.description ?? '')
  const [colors, setColors] = useState<string>(joinOptionNames(options?.colors) || (product.colors ?? ''))
  const [materials, setMaterials] = useState<string>(joinOptionNames(options?.materials) || (product.materials ?? ''))
  const [width, setWidth] = useState<DimensionField>(dimensionFromOptions(options, 'width'))
  const [length, setLength] = useState<DimensionField>(dimensionFromOptions(options, 'length'))
  const [height, setHeight] = useState<DimensionField>(dimensionFromOptions(options, 'height'))

  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'error'>('idle')
  const [saveMessage, setSaveMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedName = name.trim()
    if (!trimmedName) {
      setSaveState('error')
      setSaveMessage('Product name is required.')
      return
    }

    const priceValue = price.trim() ? Number(price) : undefined
    if (price.trim() && (!Number.isFinite(priceValue) || (priceValue as number) < 0)) {
      setSaveState('error')
      setSaveMessage('Price must be a positive number.')
      return
    }

    setSaveState('saving')
    setSaveMessage('')

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          category,
          description,
          imageUrl,
          status: productStatus,
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
        throw new Error(result?.error || 'Unable to save product.')
      }

      onSaved()
    } catch (error) {
      setSaveState('error')
      setSaveMessage(error instanceof Error ? error.message : 'Unable to save product.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/50 p-4 opacity-100">
      <div className="my-8 w-full max-w-2xl rounded-[28px] border border-stone-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <h2 className="text-lg font-bold text-stone-950">Edit product</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
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
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={`${inputClass} mt-2`}
                required
              />
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
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className={`${inputClass} mt-2`}
              />
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

          <label className="block">
            <span className={labelClass}>Image URL</span>
            <input
              type="text"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              className={`${inputClass} mt-2`}
              placeholder="https://..."
            />
          </label>

          <label className="block">
            <span className={labelClass}>Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              className={`${inputClass} mt-2`}
            />
          </label>

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
            <p className={`text-sm font-medium ${saveState === 'error' ? 'text-red-700' : 'text-emerald-700'}`}>
              {saveMessage}
            </p>
          ) : null}

          <div className="flex items-center justify-end gap-3 border-t border-stone-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saveState === 'saving'}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saveState === 'saving' ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
