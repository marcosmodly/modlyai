import React from 'react';
import { AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react';

export type ToastType = 'loading' | 'success' | 'error';

export interface ToastState {
  id: number;
  type: ToastType;
  message: string;
}

interface ActionToastProps {
  toast: ToastState | null;
  onDismiss: () => void;
}

const TOAST_STYLES: Record<ToastType, string> = {
  loading: 'border-gray-200 bg-white text-gray-800',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-red-200 bg-red-50 text-red-700',
};

export function ActionToast({ toast, onDismiss }: ActionToastProps) {
  if (!toast) return null;

  return (
    <div
      key={toast.id}
      className="fixed top-4 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 modly-panel-fade"
      role="status"
      aria-live="polite"
    >
      <div
        className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg ${TOAST_STYLES[toast.type]}`}
      >
        {toast.type === 'loading' && <Loader2 className="h-5 w-5 shrink-0 animate-spin" />}
        {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 shrink-0" />}
        {toast.type === 'error' && <AlertCircle className="h-5 w-5 shrink-0" />}
        <p className="flex-1 text-sm font-medium leading-snug">{toast.message}</p>
        {toast.type !== 'loading' && (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 rounded-full p-1 transition hover:bg-black/5"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
