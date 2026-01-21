'use client';

/**
 * Product-specific configurator page
 * Loads product config and rules, renders the full configurator
 */

import { use } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductConfigurator from '@/components/configurator/ProductConfigurator';
import { getProductById } from '@/lib/products/sample-products';
import { sampleRules } from '@/lib/products/sample-products';
import { ProductSelection } from '@/lib/configurator/types';

export default function ProductConfiguratorPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const productId = resolvedParams.productId;

  const productConfig = getProductById(productId);

  if (!productConfig) {
    return (
      <main className="min-h-screen bg-earth-background py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 p-6 rounded-xl">
            <h1 className="text-2xl font-semibold mb-2">Product Not Found</h1>
            <p className="mb-4">The product with ID &quot;{productId}&quot; could not be found.</p>
            <button
              onClick={() => router.push('/configurator')}
              className="px-6 py-3 bg-earth-forest text-white rounded-lg font-semibold hover:bg-earth-forest/90 transition-all"
            >
              Back to Configurator
            </button>
          </div>
        </div>
      </main>
    );
  }

  const handleSelectionChange = (selection: ProductSelection) => {
    // In production, this could save to localStorage, send to API, etc.
    console.log('Selection changed:', selection);
  };

  return (
    <main className="min-h-screen bg-earth-background py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.push('/configurator')}
            className="flex items-center gap-2 text-text-muted hover:text-text-heading transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Product Selection
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-text-heading mb-2">
              {productConfig.name}
            </h1>
            <p className="text-lg text-text-primary">{productConfig.description}</p>
            {productConfig.brand && (
              <p className="text-sm text-text-muted mt-2">Brand: {productConfig.brand}</p>
            )}
          </div>
        </div>

        <ProductConfigurator
          productConfig={productConfig}
          rules={sampleRules}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </main>
  );
}
