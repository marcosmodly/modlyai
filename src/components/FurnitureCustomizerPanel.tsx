'use client';

import { useEffect, useState } from 'react';
import { CustomizationConfig } from '@/types';
import ColorComboBox from './ColorComboBox';

interface FurnitureCustomizerPanelProps {
  baseItem?: {
    id?: string;
    name: string;
    type: string;
    currentConfig?: CustomizationConfig;
  };
  onCustomize: (config: CustomizationConfig) => void;
  isLoading?: boolean;
}

export default function FurnitureCustomizerPanel({
  baseItem,
  onCustomize,
  isLoading,
}: FurnitureCustomizerPanelProps) {
  const buildConfig = (item?: FurnitureCustomizerPanelProps['baseItem']): CustomizationConfig => ({
    baseItemId: item?.id,
    baseItemType: item?.type,
    baseItemName: item?.name,
    colorScheme: {
      primary: item?.currentConfig?.colorScheme?.primary || 'Beige',
      secondary: item?.currentConfig?.colorScheme?.secondary,
      accent: item?.currentConfig?.colorScheme?.accent,
    },
    materialOverrides: item?.currentConfig?.materialOverrides || {},
    ornamentDetails: item?.currentConfig?.ornamentDetails || [],
    dimensionAdjustments: item?.currentConfig?.dimensionAdjustments || {},
  });

  const [config, setConfig] = useState<CustomizationConfig>(() => buildConfig(baseItem));

  const [customPrompt, setCustomPrompt] = useState('');

  const controlsDisabled = isLoading || !baseItem;

  useEffect(() => {
    setConfig(buildConfig(baseItem));
    setCustomPrompt('');
  }, [baseItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baseItem) return;
    onCustomize(config);
  };

  const handlePromptCustomize = async () => {
    if (!baseItem) return;
    if (!customPrompt.trim()) return;
    
    console.log('Apply AI clicked', { promptText: customPrompt });
    
    // In a real implementation, this would call the API
    // For now, we'll just update the config based on common keywords
    const prompt = customPrompt.toLowerCase();
    
    // Create a proper deep copy of config to avoid mutations
    const newConfig: CustomizationConfig = {
      ...config,
      colorScheme: { ...config.colorScheme },
      materialOverrides: { ...config.materialOverrides },
      dimensionAdjustments: { ...(config.dimensionAdjustments || {}) },
      ornamentDetails: [...(config.ornamentDetails || [])],
    };

    // Color adjustments
    if (prompt.includes('darker') || prompt.includes('dark')) {
      newConfig.colorScheme.primary = 'Dark Brown';
    }
    if (prompt.includes('lighter') || prompt.includes('light')) {
      newConfig.colorScheme.primary = 'Light Beige';
    }
    if (prompt.includes('green')) {
      newConfig.colorScheme.accent = 'Forest Green';
    }
    if (prompt.includes('terracotta') || prompt.includes('orange')) {
      newConfig.colorScheme.accent = 'Terracotta';
    }
    
    // Material adjustments
    if (prompt.includes('wood') || prompt.includes('oak')) {
      newConfig.materialOverrides.legs = 'Oak Wood';
      if (!newConfig.materialOverrides.primary) {
        newConfig.materialOverrides.primary = 'Solid Oak';
      }
    }
    if (prompt.includes('walnut')) {
      newConfig.materialOverrides.primary = 'Walnut Wood';
    }
    if (prompt.includes('metal')) {
      newConfig.materialOverrides.legs = 'Metal';
    }
    
    // Dimension adjustments
    if (!newConfig.dimensionAdjustments) {
      newConfig.dimensionAdjustments = {};
    }
    if (prompt.includes('longer') || prompt.includes('extend')) {
      newConfig.dimensionAdjustments.length = (newConfig.dimensionAdjustments.length || 0) + 0.2;
    }
    if (prompt.includes('shorter')) {
      newConfig.dimensionAdjustments.length = Math.max(-1, (newConfig.dimensionAdjustments.length || 0) - 0.2);
    }
    if (prompt.includes('wider')) {
      newConfig.dimensionAdjustments.width = (newConfig.dimensionAdjustments.width || 0) + 0.2;
    }
    if (prompt.includes('narrower')) {
      newConfig.dimensionAdjustments.width = Math.max(-1, (newConfig.dimensionAdjustments.width || 0) - 0.2);
    }
    if (prompt.includes('taller') || prompt.includes('higher')) {
      newConfig.dimensionAdjustments.height = (newConfig.dimensionAdjustments.height || 0) + 0.1;
    }
    if (prompt.includes('lower') || prompt.includes('shorter height')) {
      newConfig.dimensionAdjustments.height = Math.max(-1, (newConfig.dimensionAdjustments.height || 0) - 0.1);
    }

    console.log('AI response', { aiResult: newConfig });

    // Update both the form state and trigger the API call
    setConfig(newConfig);
    setCustomPrompt('');
    
    console.log('Applied customization updated', { nextCustomization: newConfig });
    
    onCustomize(newConfig);
  };

  const colorOptions = [
    'Beige', 'Sand', 'Taupe', 'Cream', 'Ivory', 'White', 'Black', 'Charcoal',
    'Gray', 'Navy', 'Forest Green', 'Olive Green', 'Terracotta', 'Rust',
    'Walnut', 'Oak', 'Dark Brown', 'Light Brown', 'Brass', 'Gold', 'Silver',
  ];

  const materialOptions = [
    'Solid Oak', 'Walnut Wood', 'Pine Wood', 'Metal',
    'Rattan', 'Cotton Blend', 'Linen', 'Leather',
  ];

  return (
    <div className="space-y-6">
      {/* AI Prompt Customization */}
      <div>
        <label className="block text-lg font-semibold text-text-heading mb-3">
          Describe Your Customization (AI-powered)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="e.g., Make it darker with oak legs and add terracotta accents"
            disabled={controlsDisabled}
            className="flex-1 px-4 py-2.5 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]"
          />
          <button
            type="button"
            onClick={handlePromptCustomize}
            disabled={controlsDisabled || !customPrompt.trim()}
            className="px-6 py-2 bg-earth-forest text-white rounded-xl font-medium hover:bg-earth-forest/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Apply AI
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Color Scheme */}
        <div>
          <label className="block text-lg font-semibold text-text-heading mb-3">
            Color Scheme
          </label>
          <div className="grid md:grid-cols-3 gap-4">
            <ColorComboBox
              label="Primary Color"
              value={config.colorScheme.primary}
              onChange={(value) =>
                setConfig({
                  ...config,
                  colorScheme: { ...config.colorScheme, primary: value },
                })
              }
              options={colorOptions}
              placeholder="e.g. Warm beige, ivory, charcoal"
              disabled={controlsDisabled}
            />
            <ColorComboBox
              label="Secondary Color"
              value={config.colorScheme.secondary || ''}
              onChange={(value) =>
                setConfig({
                  ...config,
                  colorScheme: { ...config.colorScheme, secondary: value },
                })
              }
              options={colorOptions}
              placeholder="e.g. Walnut brown, dark gray"
              disabled={controlsDisabled}
            />
            <ColorComboBox
              label="Accent Color"
              value={config.colorScheme.accent || ''}
              onChange={(value) =>
                setConfig({
                  ...config,
                  colorScheme: { ...config.colorScheme, accent: value },
                })
              }
              options={colorOptions}
              placeholder="e.g. Terracotta, brass, muted gold"
              disabled={controlsDisabled}
            />
          </div>
        </div>

        {/* Material Overrides */}
        <div>
          <label className="block text-lg font-semibold text-text-heading mb-3">
            Material Overrides
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Primary Material
              </label>
              <select
                value={config.materialOverrides.primary || ''}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    materialOverrides: {
                      ...config.materialOverrides,
                      primary: e.target.value,
                    },
                  })
                }
                disabled={controlsDisabled}
                className="w-full px-4 py-2.5 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all [&>option]:bg-white [&>option]:text-[#1A1C19]"
              >
                <option value="">Keep Original</option>
                {materialOptions.map((material) => (
                  <option key={material} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Legs Material
              </label>
              <select
                value={config.materialOverrides.legs || ''}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    materialOverrides: {
                      ...config.materialOverrides,
                      legs: e.target.value,
                    },
                  })
                }
                disabled={controlsDisabled}
                className="w-full px-4 py-2.5 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all [&>option]:bg-white [&>option]:text-[#1A1C19]"
              >
                <option value="">Keep Original</option>
                {materialOptions.map((material) => (
                  <option key={material} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dimension Adjustments */}
        <div>
          <label className="block text-lg font-semibold text-text-heading mb-3">
            Dimension Adjustments (meters)
          </label>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Length Adjustment
              </label>
              <input
                type="number"
                step="0.1"
                value={config.dimensionAdjustments?.length || 0}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    dimensionAdjustments: {
                      ...config.dimensionAdjustments,
                      length: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                disabled={controlsDisabled}
                className="w-full px-4 py-2.5 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Width Adjustment
              </label>
              <input
                type="number"
                step="0.1"
                value={config.dimensionAdjustments?.width || 0}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    dimensionAdjustments: {
                      ...config.dimensionAdjustments,
                      width: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                disabled={controlsDisabled}
                className="w-full px-4 py-2.5 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Height Adjustment
              </label>
              <input
                type="number"
                step="0.1"
                value={config.dimensionAdjustments?.height || 0}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    dimensionAdjustments: {
                      ...config.dimensionAdjustments,
                      height: parseFloat(e.target.value) || 0,
                    },
                  })
                }
                disabled={controlsDisabled}
                className="w-full px-4 py-2.5 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]"
              />
            </div>
          </div>
        </div>

        {/* Ornaments */}
        <div>
          <label className="block text-lg font-semibold text-text-primary mb-3">
            Ornaments & Details
          </label>
          <textarea
            value={config.ornamentDetails?.join(', ') || ''}
            onChange={(e) =>
              setConfig({
                ...config,
                ornamentDetails: e.target.value.split(',').map(s => s.trim()).filter(Boolean),
              })
            }
            placeholder="e.g., Carved legs, Decorative buttons, Tufted back"
            disabled={controlsDisabled}
            className="w-full px-4 py-2.5 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={controlsDisabled}
          className="w-full px-8 py-4 bg-earth-forest text-white rounded-xl font-semibold text-lg hover:bg-earth-forest/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? 'Processing Customization...' : 'Apply Customization'}
        </button>
      </form>
    </div>
  );
}
