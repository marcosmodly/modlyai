'use client';

/**
 * 3D GLB-based preview engine
 * Optional implementation that loads GLB models with material swapping
 * Automatically falls back to ImagePreviewEngine on errors
 */

import { useState, useEffect, useMemo, ReactNode } from 'react';
import { PreviewEngine, PreviewEngineProps } from './PreviewEngine';
import { ProductSelection, PreviewAsset } from '../types';
import { imagePreviewEngine } from './ImagePreviewEngine';

export class ThreeDPreviewEngine implements PreviewEngine {
  private error: Error | null = null;
  private hasModelViewer: boolean = false;

  constructor() {
    // Check if model-viewer is available
    if (typeof window !== 'undefined') {
      this.hasModelViewer = 'customElements' in window && 
        customElements.get('model-viewer') !== undefined;
    }
  }

  supportsAsset(asset: PreviewAsset): boolean {
    return asset.type === 'glb' && this.hasModelViewer;
  }

  getName(): string {
    return 'ThreeDPreviewEngine';
  }

  getError(): Error | null {
    return this.error;
  }

  render(props: PreviewEngineProps): ReactNode {
    // If model-viewer is not available, fallback immediately
    if (!this.hasModelViewer) {
      this.error = new Error('model-viewer not available');
      return imagePreviewEngine.render(props);
    }

    return <ThreeDPreviewComponent {...props} onError={(err) => { this.error = err; }} />;
  }
}

interface ThreeDPreviewComponentProps extends PreviewEngineProps {
  onError: (error: Error) => void;
}

function ThreeDPreviewComponent({
  selection,
  assets,
  onError,
}: ThreeDPreviewComponentProps) {
  const [glbUrl, setGlbUrl] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Find GLB asset
  const glbAsset = useMemo(() => {
    return assets.find(a => a.type === 'glb');
  }, [assets]);

  useEffect(() => {
    if (!glbAsset) {
      const err = new Error('No GLB asset found');
      setLoadError(err);
      onError(err);
      setIsLoading(false);
      return;
    }

    setGlbUrl(glbAsset.url);
    setIsLoading(true);
    setLoadError(null);

    // Try to load the GLB to verify it exists
    fetch(glbAsset.url, { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`GLB file not found: ${response.status}`);
        }
        setIsLoading(false);
      })
      .catch(err => {
        const error = err instanceof Error ? err : new Error('Failed to load GLB');
        setLoadError(error);
        onError(error);
        setIsLoading(false);
      });
  }, [glbAsset, onError]);

  // Get material slots from asset metadata
  const materialSlots = glbAsset?.materialSlots || [];
  
  // Map selections to material slot updates
  const materialUpdates = useMemo(() => {
    const updates: Record<string, string> = {};
    
    // Try to map option groups to material slots
    // This is a simple mapping - in production, this would be more sophisticated
    Object.entries(selection.selections).forEach(([groupId, value]) => {
      if (groupId.toLowerCase().includes('material') && typeof value === 'string') {
        // Find matching material slot
        const slot = materialSlots.find(s => 
          s.toLowerCase().includes(groupId.toLowerCase()) ||
          s.toLowerCase().includes(value.toLowerCase())
        );
        if (slot) {
          updates[slot] = value;
        }
      }
    });

    return updates;
  }, [selection.selections, materialSlots]);

  if (loadError || !glbUrl) {
    // Fallback to image preview
    return imagePreviewEngine.render({
      productId: '',
      selection,
      assets: assets.filter(a => a.type === 'image'),
      imageVariants: undefined,
      defaultImageUrl: undefined,
    });
  }

  // Render model-viewer component
  // Note: This requires @google/model-viewer to be installed
  // For now, we'll render a placeholder that shows the structure
  return (
    <div className="w-full h-full flex flex-col bg-earth-background rounded-lg border border-earth-border overflow-hidden">
      {/* 3D Viewer Container */}
      <div className="flex-1 relative min-h-[400px] bg-earth-card">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-sage mx-auto mb-4"></div>
              <p className="text-text-primary text-sm">Loading 3D model...</p>
            </div>
          </div>
        ) : (
          <>
            {/* model-viewer component */}
            {/* In production, this would be: */}
            {/* <model-viewer
              src={glbUrl}
              alt="3D Product Preview"
              camera-controls
              auto-rotate
              rotation-per-second="30deg"
              style={{ width: '100%', height: '100%' }}
            /> */}
            
            {/* Placeholder for now - will be replaced with actual model-viewer */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-text-primary text-sm mb-2">3D Preview</p>
                <p className="text-text-muted text-xs mb-4">GLB: {glbUrl.split('/').pop()}</p>
                {Object.keys(materialUpdates).length > 0 && (
                  <div className="mt-4 p-4 bg-earth-card rounded-lg border border-earth-border">
                    <p className="text-text-primary text-xs font-semibold mb-2">Material Updates:</p>
                    {Object.entries(materialUpdates).map(([slot, value]) => (
                      <p key={slot} className="text-text-primary text-xs">
                        {slot}: <span className="font-semibold">{value}</span>
                      </p>
                    ))}
                  </div>
                )}
                <p className="text-text-muted text-xs mt-4">
                  Install @google/model-viewer to enable 3D viewer
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="p-3 bg-earth-card border-t border-earth-border flex items-center justify-center gap-4 text-xs text-text-muted">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Scroll to zoom
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Drag to rotate
        </span>
      </div>
    </div>
  );
}

// Export singleton instance
export const threeDPreviewEngine = new ThreeDPreviewEngine();
