'use client';

/**
 * Minimal Admin UI for Product Configuration
 * JSON editor for product setup - designed for future admin UI integration
 */

import { useState } from 'react';
import { ProductConfig } from '@/lib/configurator/types';

interface ProductConfigEditorProps {
  initialConfig?: ProductConfig;
  onSave?: (config: ProductConfig) => void;
  onValidate?: (config: ProductConfig) => { valid: boolean; errors: string[] };
}

export default function ProductConfigEditor({
  initialConfig,
  onSave,
  onValidate,
}: ProductConfigEditorProps) {
  const [jsonText, setJsonText] = useState(() => {
    return initialConfig ? JSON.stringify(initialConfig, null, 2) : '';
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(true);

  const handleJsonChange = (value: string) => {
    setJsonText(value);
    setErrors([]);
    setIsValid(true);

    // Try to parse and validate
    try {
      const parsed = JSON.parse(value);
      const config = parsed as ProductConfig;

      // Basic validation
      const validationErrors: string[] = [];
      
      if (!config.id) validationErrors.push('Missing required field: id');
      if (!config.sku) validationErrors.push('Missing required field: sku');
      if (!config.name) validationErrors.push('Missing required field: name');
      if (!config.optionGroups || !Array.isArray(config.optionGroups)) {
        validationErrors.push('Missing or invalid optionGroups array');
      }
      if (!config.previewAssets || !Array.isArray(config.previewAssets)) {
        validationErrors.push('Missing or invalid previewAssets array');
      }

      // Check for at least one image asset
      const hasImage = config.previewAssets?.some(a => a.type === 'image');
      if (!hasImage && !config.defaultImageUrl) {
        validationErrors.push('Product must have at least one image asset or defaultImageUrl');
      }

      // Custom validation if provided
      if (onValidate) {
        const customValidation = onValidate(config);
        if (!customValidation.valid) {
          validationErrors.push(...customValidation.errors);
        }
      }

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } catch (e) {
      setErrors([`Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`]);
      setIsValid(false);
    }
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const config = parsed as ProductConfig;
      
      if (isValid && errors.length === 0) {
        onSave?.(config);
      }
    } catch (e) {
      setErrors([`Cannot save: Invalid JSON`]);
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setErrors([`Cannot format: Invalid JSON`]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-earth-card p-6 rounded-xl shadow-soft border border-earth-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-text-heading">Product Configuration Editor</h3>
          <div className="flex gap-2">
            <button
              onClick={handleFormat}
              className="px-4 py-2 bg-earth-input border border-earth-border text-text-heading rounded-lg font-medium hover:bg-earth-card transition-all text-sm"
            >
              Format JSON
            </button>
            <button
              onClick={handleSave}
              disabled={!isValid}
              className="px-4 py-2 bg-earth-forest text-white rounded-lg font-medium hover:bg-earth-forest/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Save Configuration
            </button>
          </div>
        </div>

        {/* Guidance */}
        <div className="mb-4 p-4 bg-earth-input rounded-lg border border-earth-border">
          <h4 className="font-semibold text-text-heading mb-2">Getting Started</h4>
          <div className="space-y-2 text-sm text-text-primary">
            <div className="flex items-start gap-2">
              <span className="text-earth-sage">✓</span>
              <span><strong>Start with images (recommended):</strong> Define imageVariants and defaultImageUrl. No GLB needed for MVP.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-earth-sage">✓</span>
              <span><strong>Add 3D later (optional):</strong> Add GLB assets to previewAssets and set featureFlags.enable3DViewer = true.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-earth-sage">✓</span>
              <span><strong>Define rules separately:</strong> Rules are defined in a separate rules array, not in the product config.</span>
            </div>
          </div>
        </div>

        {/* Validation Errors */}
        {errors.length > 0 && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 rounded-lg">
            <h4 className="font-semibold mb-2">Validation Errors:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* JSON Editor */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-text-heading">
            Product Configuration JSON
          </label>
          <textarea
            value={jsonText}
            onChange={(e) => handleJsonChange(e.target.value)}
            className={`w-full h-96 px-4 py-3 border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 transition-all ${
              isValid
                ? 'border-earth-border bg-white text-black'
                : 'border-red-500 bg-red-50 text-red-900'
            }`}
            placeholder='{"id": "product-001", "sku": "PROD-001", "name": "Product Name", ...}'
          />
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-sm">
          {isValid ? (
            <>
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-green-700 dark:text-green-400">Valid configuration</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700 dark:text-red-400">Configuration has errors</span>
            </>
          )}
        </div>
      </div>

      {/* Example Template */}
      <div className="bg-earth-card p-6 rounded-xl shadow-soft border border-earth-border">
        <h4 className="font-semibold text-text-heading mb-3">Example Template</h4>
        <button
          onClick={() => {
            const template: ProductConfig = {
              id: 'product-template',
              sku: 'TEMPLATE-001',
              name: 'Product Template',
              description: 'Template product configuration',
              category: 'Furniture',
              dimensions: {
                length: 100,
                width: 50,
                height: 80,
                unit: 'cm',
              },
              optionGroups: [
                {
                  id: 'material',
                  label: 'Material',
                  description: 'Select material',
                  type: 'radio',
                  required: true,
                  options: [
                    { id: 'opt1', label: 'Option 1', value: 'opt1' },
                    { id: 'opt2', label: 'Option 2', value: 'opt2' },
                  ],
                },
              ],
              previewAssets: [
                { type: 'image', url: '/images/product-default.jpg' },
              ],
              defaultImageUrl: '/images/product-default.jpg',
              featureFlags: {
                enable3DViewer: false,
                hasGLBAsset: false,
              },
            };
            setJsonText(JSON.stringify(template, null, 2));
          }}
          className="px-4 py-2 bg-earth-sage text-white rounded-lg font-medium hover:bg-earth-sage/90 transition-all text-sm"
        >
          Load Template
        </button>
      </div>
    </div>
  );
}
