'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

type CopyStatus = 'idle' | 'copied' | 'failed';

export default function CopyButton({
  value,
  className = '',
  label = 'Copy',
  copiedLabel = 'Copied',
  failedLabel = 'Copy failed',
}: {
  value: string;
  className?: string;
  label?: string;
  copiedLabel?: string;
  failedLabel?: string;
}) {
  const [status, setStatus] = useState<CopyStatus>('idle');

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }

    window.setTimeout(() => setStatus('idle'), 1800);
  }

  const buttonLabel = status === 'copied' ? copiedLabel : status === 'failed' ? failedLabel : label;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={[
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        className,
      ].join(' ')}
    >
      {status === 'copied' ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
      {buttonLabel}
    </button>
  );
}
