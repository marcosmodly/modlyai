'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function PasswordInput({
  value,
  onChange,
  placeholder = '••••••••',
  autoComplete,
  minLength,
  className = '',
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoComplete?: string
  minLength?: number
  className?: string
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 transition hover:text-gray-700"
        aria-label={visible ? 'Hide password' : 'Show password'}
        tabIndex={-1}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}
