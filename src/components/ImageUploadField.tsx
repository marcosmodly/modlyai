'use client'

import { ImagePlus, Loader2, Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'

async function safeJson(res: Response): Promise<{ error?: string; url?: string }> {
  try {
    return await res.json()
  } catch {
    return { error: `Unexpected error (status ${res.status}). Please try again.` }
  }
}

export default function ImageUploadField({
  value,
  onChange,
  shape = 'circle',
  size = 80,
  label,
  collapsible = false,
}: {
  value: string
  onChange: (url: string) => void
  shape?: 'circle' | 'square'
  size?: number
  label?: string
  collapsible?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState(!collapsible)

  const handleFile = async (file: File | undefined | null) => {
    if (!file) return
    setError('')
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/uploads/image', { method: 'POST', body: formData })
      const result = await safeJson(res)

      if (!res.ok || !result.url) {
        throw new Error(result?.error || 'Unable to upload image')
      }

      onChange(result.url)
      if (collapsible) setExpanded(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to upload image')
    } finally {
      setUploading(false)
    }
  }

  if (collapsible && !expanded) {
    return (
      <div>
        <div className="flex items-center gap-4">
          <div
            className={[
              'relative flex shrink-0 items-center justify-center overflow-hidden border border-stone-200 bg-white',
              shape === 'circle' ? 'rounded-full' : 'rounded-xl',
            ].join(' ')}
            style={{ width: size, height: size }}
          >
            {value ? (
              <img src={value} alt="" className="h-full w-full object-cover" />
            ) : (
              <ImagePlus className="h-5 w-5 text-stone-300" />
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
            >
              <Upload className="h-4 w-4" />
              {value ? 'Change photo' : 'Upload photo'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="rounded-full p-1.5 text-stone-400 transition hover:bg-stone-200 hover:text-stone-700"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        {error && <p className="mt-2 text-sm font-medium text-red-700">{error}</p>}
      </div>
    )
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          handleFile(e.dataTransfer.files?.[0])
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
        }}
        className={[
          'flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed p-4 transition',
          isDragging ? 'border-blue-400 bg-blue-50' : 'border-stone-300 bg-stone-50 hover:border-stone-400',
        ].join(' ')}
      >
        <div
          className={[
            'relative flex shrink-0 items-center justify-center overflow-hidden border border-stone-200 bg-white',
            shape === 'circle' ? 'rounded-full' : 'rounded-xl',
          ].join(' ')}
          style={{ width: size, height: size }}
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-stone-400" />
          ) : value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImagePlus className="h-5 w-5 text-stone-300" />
          )}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-stone-800">
            {label || 'Drag and drop an image, or click to browse'}
          </p>
          <p className="mt-1 text-xs text-stone-500">PNG, JPEG, WEBP, or GIF - up to 2MB.</p>
        </div>

        {value && !uploading && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onChange('')
              if (collapsible) setExpanded(false)
            }}
            className="ml-auto shrink-0 rounded-full p-1.5 text-stone-400 transition hover:bg-stone-200 hover:text-stone-700"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {collapsible && !uploading && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setExpanded(false)
            }}
            className="shrink-0 rounded-full px-2 py-1 text-xs font-medium text-stone-400 transition hover:bg-stone-200 hover:text-stone-700"
            aria-label="Cancel"
          >
            Cancel
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && <p className="mt-2 text-sm font-medium text-red-700">{error}</p>}
    </div>
  )
}
