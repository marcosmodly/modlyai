import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageLightboxProps {
  src: string;
  alt?: string;
  onClose: () => void;
}

// Full-size image viewer opened by clicking a product/room photo thumbnail
// elsewhere in the widget. Deliberately opacity-only (no animated transform) -
// an animated transform on a position:fixed ancestor breaks any fixed-position
// descendant opened from inside a scrolling tab panel, the same bug already
// fixed once for the request-quote modal (see widget/src/styles/widget.css).
export default function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Image preview'}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        aria-label="Close image preview"
      >
        <X className="h-6 w-6" />
      </button>
      <img
        src={src}
        alt={alt || ''}
        onClick={(event) => event.stopPropagation()}
        className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
      />
    </div>
  );
}
