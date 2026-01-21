/**
 * Feature flags system for configurator
 * Controls 3D viewer enablement and other features per tenant/product
 */

import { ProductConfig, ProductFeatureFlags, PreviewAsset } from './types';

/**
 * Default feature flags
 */
const DEFAULT_FEATURE_FLAGS: ProductFeatureFlags = {
  enable3DViewer: false,
  hasGLBAsset: false,
};

/**
 * Get feature flags for a product
 * Checks product config and determines flags based on available assets
 */
export function getFeatureFlags(
  productConfig: ProductConfig,
  tenantId?: string
): ProductFeatureFlags {
  // Start with product-specific flags if provided
  const flags: ProductFeatureFlags = {
    ...DEFAULT_FEATURE_FLAGS,
    ...productConfig.featureFlags,
    tenantId,
  };

  // Auto-detect GLB asset
  const hasGLB = productConfig.previewAssets.some(asset => asset.type === 'glb');
  flags.hasGLBAsset = hasGLB;

  // If 3D viewer is enabled but no GLB exists, disable it
  if (flags.enable3DViewer && !flags.hasGLBAsset) {
    flags.enable3DViewer = false;
  }

  return flags;
}

/**
 * Check if a product has a valid GLB asset
 */
export function hasGLBAsset(productConfig: ProductConfig): boolean {
  const glbAssets = productConfig.previewAssets.filter(asset => asset.type === 'glb');
  return glbAssets.length > 0;
}

/**
 * Determine if 3D viewer should be used for a product
 */
export function shouldUse3D(
  productConfig: ProductConfig,
  flags?: ProductFeatureFlags
): boolean {
  const productFlags = flags || getFeatureFlags(productConfig);
  
  // Must have both flag enabled and GLB asset
  return productFlags.enable3DViewer && productFlags.hasGLBAsset;
}

/**
 * Get the best preview asset for a product
 * Returns GLB if 3D is enabled, otherwise returns first image
 */
export function getBestPreviewAsset(
  productConfig: ProductConfig,
  flags?: ProductFeatureFlags
): PreviewAsset | null {
  const use3D = shouldUse3D(productConfig, flags);
  
  if (use3D) {
    const glbAsset = productConfig.previewAssets.find(asset => asset.type === 'glb');
    if (glbAsset) {
      return glbAsset;
    }
  }

  // Fallback to image
  const imageAsset = productConfig.previewAssets.find(asset => asset.type === 'image');
  if (imageAsset) {
    return imageAsset;
  }

  return null;
}

/**
 * Check if 3D viewer is available in the browser
 */
export function is3DViewerAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // Check for model-viewer custom element
  return 'customElements' in window && 
    (customElements.get('model-viewer') !== undefined || 
     // Also check if it might be loaded dynamically
     document.querySelector('script[src*="model-viewer"]') !== null);
}
