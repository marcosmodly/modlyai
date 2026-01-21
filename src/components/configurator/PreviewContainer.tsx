'use client';

/**
 * PreviewContainer - Handles engine selection and fallback logic
 */

import { useState, useEffect } from 'react';
import { ProductConfig, ProductSelection, PreviewAsset } from '@/lib/configurator/types';
import { getFeatureFlags, shouldUse3D } from '@/lib/configurator/feature-flags';
import { imagePreviewEngine } from '@/lib/configurator/preview/ImagePreviewEngine';
import { threeDPreviewEngine } from '@/lib/configurator/preview/ThreeDPreviewEngine';
import { PreviewEngine } from '@/lib/configurator/preview/PreviewEngine';

interface PreviewContainerProps {
  productConfig: ProductConfig;
  selection: ProductSelection;
}

export default function PreviewContainer({
  productConfig,
  selection,
}: PreviewContainerProps) {
  const [currentEngine, setCurrentEngine] = useState<PreviewEngine>(imagePreviewEngine);
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);

  useEffect(() => {
    // MVP: Always use image preview engine
    // 3D viewer is disabled for MVP but kept in codebase for future use
    setCurrentEngine(imagePreviewEngine);
    setFallbackMessage(null);
  }, [productConfig]);

  // Check for errors in current engine
  useEffect(() => {
    const error = currentEngine.getError();
    if (error && currentEngine === threeDPreviewEngine) {
      // Fallback to image on error
      setCurrentEngine(imagePreviewEngine);
      setFallbackMessage('3D preview failed to load, showing image preview instead');
    }
  }, [currentEngine]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1">
        {currentEngine.render({
          productId: productConfig.id,
          selection,
          assets: productConfig.previewAssets,
          imageVariants: productConfig.imageVariants,
          defaultImageUrl: productConfig.defaultImageUrl,
          onError: (error) => {
            console.error('Preview engine error:', error);
          },
        })}
      </div>
    </div>
  );
}
