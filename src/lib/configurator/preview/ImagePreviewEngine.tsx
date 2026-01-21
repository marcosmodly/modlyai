'use client';

/**
 * Image-based preview engine
 * Default implementation that works with images only
 */

import { useState, useEffect, useMemo, ReactNode } from 'react';
import { PreviewEngine, PreviewEngineProps } from './PreviewEngine';
import { ProductSelection } from '../types';

export class ImagePreviewEngine implements PreviewEngine {
  private error: Error | null = null;

  supportsAsset(asset: { type: string }): boolean {
    return asset.type === 'image';
  }

  getName(): string {
    return 'ImagePreviewEngine';
  }

  getError(): Error | null {
    return this.error;
  }

  render(props: PreviewEngineProps): ReactNode {
    return <ImagePreviewComponent {...props} onError={(err) => { this.error = err; }} />;
  }
}

interface ImagePreviewComponentProps extends PreviewEngineProps {
  onError: (error: Error) => void;
}

function ImagePreviewComponent({
  selection,
  assets,
  imageVariants,
  defaultImageUrl,
  onError,
}: ImagePreviewComponentProps) {
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<Error | null>(null);

  // Find the best matching image based on current selection
  const selectedImage = useMemo(() => {
    // Try to find a matching image variant
    if (imageVariants && imageVariants.length > 0) {
      // Build a key from current selections
      const selectionKey = Object.entries(selection.selections)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([groupId, value]) => `${groupId}:${value}`)
        .join(',');

      // Try exact match first
      let variant = imageVariants.find(v => v.key === selectionKey);
      
      // Try partial matches (subset of selections)
      if (!variant) {
        const selectionParts = selectionKey.split(',');
        variant = imageVariants.find(v => {
          const variantParts = v.key.split(',');
          return selectionParts.every(part => variantParts.some(vp => vp.startsWith(part.split(':')[0] + ':')));
        });
      }

      if (variant) {
        return variant.imageUrl;
      }
    }

    // Fallback to first image asset
    const imageAsset = assets.find(a => a.type === 'image');
    if (imageAsset) {
      return imageAsset.url;
    }

    // Final fallback to default image
    return defaultImageUrl || null;
  }, [selection.selections, imageVariants, assets, defaultImageUrl]);

  useEffect(() => {
    if (selectedImage) {
      setCurrentImageUrl(selectedImage);
      setImageError(null);
    }
  }, [selectedImage]);

  const handleImageError = () => {
    const err = new Error('Failed to load preview image');
    setImageError(err);
    onError(err);
  };

  // Build labels for current selections
  const selectionLabels = Object.entries(selection.selections)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([groupId, value]) => {
      const label = typeof value === 'string' ? value : String(value);
      return { groupId, label };
    });

  if (imageError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-earth-background rounded-lg border border-earth-border p-8">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-text-primary text-sm mb-2">Image preview unavailable</p>
          <p className="text-text-muted text-xs">Failed to load preview image</p>
        </div>
      </div>
    );
  }

  if (!currentImageUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-earth-background rounded-lg border border-earth-border p-8">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-text-primary text-sm mb-2">Product Preview</p>
          <p className="text-text-muted text-xs">Select options to see preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-earth-background rounded-lg border border-earth-border overflow-hidden">
      {/* Image Container */}
      <div className="flex-1 relative min-h-[400px] bg-earth-card">
        <img
          src={currentImageUrl}
          alt="Product preview"
          className="w-full h-full object-contain"
          onError={handleImageError}
        />
      </div>

      {/* Selection Labels */}
      {selectionLabels.length > 0 && (
        <div className="p-4 bg-earth-card border-t border-earth-border">
          <div className="flex flex-wrap gap-2">
            {selectionLabels.map(({ groupId, label }) => (
              <span
                key={groupId}
                className="px-3 py-1 bg-earth-input border border-earth-border text-text-primary rounded-lg text-xs font-medium"
              >
                {groupId}: {label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Export singleton instance
export const imagePreviewEngine = new ImagePreviewEngine();
