/**
 * Preview Engine abstraction
 * Defines the interface for preview engines (Image and 3D)
 */

import { ReactNode } from 'react';
import { ProductSelection, PreviewAsset } from '../types';

export interface PreviewEngineProps {
  productId: string;
  selection: ProductSelection;
  assets: PreviewAsset[];
  imageVariants?: Array<{ key: string; imageUrl: string; label?: string }>;
  defaultImageUrl?: string;
  onError?: (error: Error) => void;
}

export interface PreviewEngine {
  /**
   * Check if this engine can handle the given asset
   */
  supportsAsset(asset: PreviewAsset): boolean;
  
  /**
   * Render the preview component
   */
  render(props: PreviewEngineProps): ReactNode;
  
  /**
   * Get error state if preview failed
   */
  getError(): Error | null;
  
  /**
   * Get the engine name for debugging
   */
  getName(): string;
}
