'use client';

/**
 * Demo page showing both image-only and 3D-enabled products
 */

import { useState } from 'react';
import Link from 'next/link';
import ProductConfigurator from '@/components/configurator/ProductConfigurator';
import { sampleSofaProduct, sampleChairProduct, sampleRules } from '@/lib/products/sample-products';
import { ProductSelection } from '@/lib/configurator/types';

export default function ConfiguratorDemoPage() {
  const [activeDemo, setActiveDemo] = useState<'sofa' | 'chair' | null>(null);

  const handleSelectionChange = (selection: ProductSelection) => {
    console.log('Demo selection changed:', selection);
  };

  return (
    <main className="min-h-screen bg-earth-background py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-heading mb-4">
            Configurator Demo
          </h1>
          <p className="text-lg md:text-xl text-text-primary max-w-2xl mx-auto mb-6">
            Explore the Hybrid Configurator with sample products. See how it works with images-only and 3D-enabled products.
          </p>
          <Link
            href="/configurator"
            className="inline-flex items-center gap-2 text-earth-sage hover:text-earth-forest transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Configurator
          </Link>
        </div>

        {!activeDemo ? (
          /* Demo Selection */
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image-only Demo */}
            <div className="bg-earth-card p-8 rounded-xl shadow-soft border border-earth-border">
              <div className="text-5xl mb-4">🖼️</div>
              <h2 className="text-2xl font-semibold text-text-heading mb-3">
                Image-Only Product (MVP)
              </h2>
              <p className="text-text-primary mb-4">
                This demo shows the configurator working with images only. No 3D assets required - perfect for MVP and low-friction onboarding.
              </p>
              <div className="space-y-2 mb-6 text-sm text-text-muted">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Image-based preview
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Rule-based validation
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Spec sheet generation
                </div>
              </div>
              <div className="bg-earth-input p-4 rounded-lg border border-earth-border mb-6">
                <p className="text-xs text-text-muted mb-2">Product:</p>
                <p className="font-semibold text-text-heading">{sampleSofaProduct.name}</p>
                <p className="text-sm text-text-primary mt-1">{sampleSofaProduct.description}</p>
              </div>
              <button
                onClick={() => setActiveDemo('sofa')}
                className="w-full px-6 py-3 bg-earth-sage text-white rounded-lg font-semibold hover:bg-earth-sage/90 transition-all"
              >
                Try Image-Only Demo →
              </button>
            </div>

            {/* 3D-enabled Demo */}
            <div className="bg-earth-card p-8 rounded-xl shadow-soft border border-earth-border">
              <div className="text-5xl mb-4">🎨</div>
              <h2 className="text-2xl font-semibold text-text-heading mb-3">
                3D-Enabled Product (Premium)
              </h2>
              <p className="text-text-primary mb-4">
                This demo shows the configurator with 3D GLB support. If the GLB fails to load, it automatically falls back to image preview.
              </p>
              <div className="space-y-2 mb-6 text-sm text-text-muted">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  3D GLB viewer (optional)
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Automatic fallback to images
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Material slot swapping
                </div>
              </div>
              <div className="bg-earth-input p-4 rounded-lg border border-earth-border mb-6">
                <p className="text-xs text-text-muted mb-2">Product:</p>
                <p className="font-semibold text-text-heading">{sampleChairProduct.name}</p>
                <p className="text-sm text-text-primary mt-1">{sampleChairProduct.description}</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                  ⚠️ Note: 3D viewer requires @google/model-viewer. Will fallback to image if not available.
                </p>
              </div>
              <button
                onClick={() => setActiveDemo('chair')}
                className="w-full px-6 py-3 bg-earth-forest text-white rounded-lg font-semibold hover:bg-earth-forest/90 transition-all"
              >
                Try 3D-Enabled Demo →
              </button>
            </div>
          </div>
        ) : (
          /* Active Demo */
          <div className="space-y-6">
            <button
              onClick={() => setActiveDemo(null)}
              className="flex items-center gap-2 text-text-muted hover:text-text-heading transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Demo Selection
            </button>

            {activeDemo === 'sofa' && (
              <div>
                <div className="bg-earth-sage/20 border border-earth-sage/50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-text-heading mb-2">Image-Only Demo</h3>
                  <p className="text-sm text-text-primary">
                    This product uses image-based preview. Try selecting different options to see how the preview updates.
                    Notice how rules prevent invalid combinations (e.g., &quot;Oak only for Premium line&quot;).
                  </p>
                </div>
                <ProductConfigurator
                  productConfig={sampleSofaProduct}
                  rules={sampleRules}
                  onSelectionChange={handleSelectionChange}
                />
              </div>
            )}

            {activeDemo === 'chair' && (
              <div>
                <div className="bg-earth-forest/20 border border-earth-forest/50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-text-heading mb-2">3D-Enabled Demo</h3>
                  <p className="text-sm text-text-primary">
                    This product has 3D GLB support enabled. If the GLB file is missing or fails to load,
                    the configurator will automatically fallback to image preview. The experience remains seamless.
                  </p>
                </div>
                <ProductConfigurator
                  productConfig={sampleChairProduct}
                  rules={[]} // Chair doesn't have complex rules in this demo
                  onSelectionChange={handleSelectionChange}
                />
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-earth-card p-8 rounded-xl shadow-soft border border-earth-border">
          <h2 className="text-2xl font-semibold text-text-heading mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-text-heading mb-2">1. Product Configuration</h3>
              <p className="text-sm text-text-primary">
                Products are defined using JSON configs with option groups, rules, and assets. No admin UI required for MVP.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-heading mb-2">2. Rule Engine</h3>
              <p className="text-sm text-text-primary">
                Rules validate selections in real-time. Invalid combinations are prevented, and helpful messages guide users.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-heading mb-2">3. Preview & Export</h3>
              <p className="text-sm text-text-primary">
                Preview updates live as options change. Generate spec sheets in JSON, HTML, or PDF format.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
