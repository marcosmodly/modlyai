'use client';

import { useState, useEffect } from 'react';
import { CustomizedFurnitureItem } from '@/types';

interface MaterialViewer3DProps {
  selectedMaterial?: string;
  onMaterialChange?: (material: string) => void;
  customizedItem?: CustomizedFurnitureItem;
  dimensions?: { length: number; width: number; height: number };
  materials?: { primary?: string; legs?: string; upholstery?: string };
}

// Map AI material names to viewer material IDs
function mapMaterialToViewerId(materialName: string | undefined): string {
  if (!materialName) return 'fabric';
  const lower = materialName.toLowerCase();
  if (lower.includes('wood') || lower.includes('oak') || lower.includes('walnut') || lower.includes('pine')) return 'wood';
  if (lower.includes('leather')) return 'leather';
  if (lower.includes('metal')) return 'metal';
  return 'fabric'; // default
}

export default function MaterialViewer3D({ 
  selectedMaterial, 
  onMaterialChange,
  customizedItem,
  dimensions,
  materials
}: MaterialViewer3DProps) {
  const [currentMaterial, setCurrentMaterial] = useState(selectedMaterial || 'fabric');
  
  const materialOptions = [
    { id: 'fabric', label: 'Fabric', icon: '🧵' },
    { id: 'wood', label: 'Wood', icon: '🪵' },
    { id: 'leather', label: 'Leather', icon: '🐄' },
    { id: 'metal', label: 'Metal', icon: '⚙️' },
  ];

  // Auto-update material when customizedItem or materials prop changes
  useEffect(() => {
    if (customizedItem?.materials) {
      const primaryMaterial = customizedItem.materials.primary;
      const mappedMaterial = mapMaterialToViewerId(primaryMaterial);
      if (mappedMaterial !== currentMaterial) {
        setCurrentMaterial(mappedMaterial);
        onMaterialChange?.(mappedMaterial);
      }
    } else if (materials?.primary) {
      const mappedMaterial = mapMaterialToViewerId(materials.primary);
      if (mappedMaterial !== currentMaterial) {
        setCurrentMaterial(mappedMaterial);
        onMaterialChange?.(mappedMaterial);
      }
    }
  }, [customizedItem?.materials, materials?.primary, currentMaterial, onMaterialChange]);

  // Update when selectedMaterial prop changes externally
  useEffect(() => {
    if (selectedMaterial && selectedMaterial !== currentMaterial) {
      setCurrentMaterial(selectedMaterial);
    }
  }, [selectedMaterial]);

  const handleMaterialChange = (material: string) => {
    setCurrentMaterial(material);
    onMaterialChange?.(material);
  };

  return (
    <div className="bg-[#2D312C] rounded-xl border border-earth-border p-4 md:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-heading">3D Material Viewer</h3>
        <div className="flex gap-2">
          {materialOptions.map((material) => (
            <button
              key={material.id}
              onClick={() => handleMaterialChange(material.id)}
              className={`w-10 h-10 rounded-lg border transition-all ${
                currentMaterial === material.id
                  ? 'bg-earth-sage border-earth-sage text-white'
                  : 'bg-earth-card border-earth-border text-text-primary hover:border-earth-sage/50'
              }`}
              title={material.label}
            >
              <span className="text-xl">{material.icon}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* 3D Viewer Container */}
      <div className="flex-1 bg-earth-background rounded-lg border border-earth-border relative overflow-hidden min-h-[400px]">
        {/* Using a div with background for now - model-viewer will be integrated when 3D models are available */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🪑</div>
            <p className="text-text-primary text-sm mb-2">3D Material Viewer</p>
            <p className="text-text-muted text-xs">Interactive preview with {currentMaterial} material</p>
            
            {/* Material Information */}
            <div className="mt-4 p-4 bg-earth-card rounded-lg border border-earth-border space-y-2">
              <p className="text-text-primary text-xs">
                Material: <span className="font-semibold capitalize">{currentMaterial}</span>
              </p>
              {(customizedItem?.materials || materials) && (
                <div className="text-text-primary text-xs mt-2 pt-2 border-t border-earth-border">
                  <p className="font-semibold mb-1">AI Customization:</p>
                  {customizedItem?.materials?.primary && (
                    <p>Primary: <span className="font-semibold">{customizedItem.materials.primary}</span></p>
                  )}
                  {customizedItem?.materials?.legs && (
                    <p>Legs: <span className="font-semibold">{customizedItem.materials.legs}</span></p>
                  )}
                  {customizedItem?.materials?.upholstery && (
                    <p>Upholstery: <span className="font-semibold">{customizedItem.materials.upholstery}</span></p>
                  )}
                  {materials?.primary && !customizedItem?.materials && (
                    <p>Primary: <span className="font-semibold">{materials.primary}</span></p>
                  )}
                </div>
              )}
            </div>

            {/* Dimensions Display */}
            {(dimensions || customizedItem?.dimensions) && (
              <div className="mt-4 p-4 bg-earth-card rounded-lg border border-earth-border">
                <p className="text-text-primary text-xs font-semibold mb-2">Dimensions:</p>
                <div className="text-text-primary text-xs space-y-1">
                  {(dimensions || customizedItem?.dimensions) && (
                    <>
                      <div>
                        Length: <span className="font-semibold">{(dimensions || customizedItem?.dimensions)?.length.toFixed(2)}m</span>
                        {customizedItem?.dimensionChanges?.length && (
                          <span className={`ml-2 ${customizedItem.dimensionChanges.length > 0 ? 'text-earth-sage' : 'text-red-400'}`}>
                            ({customizedItem.dimensionChanges.length > 0 ? '+' : ''}{customizedItem.dimensionChanges.length.toFixed(2)}m)
                          </span>
                        )}
                      </div>
                      <div>
                        Width: <span className="font-semibold">{(dimensions || customizedItem?.dimensions)?.width.toFixed(2)}m</span>
                        {customizedItem?.dimensionChanges?.width && (
                          <span className={`ml-2 ${customizedItem.dimensionChanges.width > 0 ? 'text-earth-sage' : 'text-red-400'}`}>
                            ({customizedItem.dimensionChanges.width > 0 ? '+' : ''}{customizedItem.dimensionChanges.width.toFixed(2)}m)
                          </span>
                        )}
                      </div>
                      <div>
                        Height: <span className="font-semibold">{(dimensions || customizedItem?.dimensions)?.height.toFixed(2)}m</span>
                        {customizedItem?.dimensionChanges?.height && (
                          <span className={`ml-2 ${customizedItem.dimensionChanges.height > 0 ? 'text-earth-sage' : 'text-red-400'}`}>
                            ({customizedItem.dimensionChanges.height > 0 ? '+' : ''}{customizedItem.dimensionChanges.height.toFixed(2)}m)
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Uncomment when 3D models are ready:
        <model-viewer
          src="/models/sofa.glb"
          alt="3D Furniture Model"
          camera-controls
          auto-rotate
          rotation-per-second="30deg"
          style={{
            width: '100%',
            height: '100%',
            minHeight: '400px',
          }}
          className="w-full h-full"
        />
        */}
      </div>
      
      {/* Controls moved to bottom */}
      <div className="mt-auto pt-3 flex items-center justify-center gap-4 text-xs text-text-muted">
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
