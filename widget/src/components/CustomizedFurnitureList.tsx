import React, { useState } from 'react';
import { CustomizedFurnitureItem } from '../types';
import { useWidgetContext } from '../utils/WidgetContext';

interface CustomizedFurnitureListProps {
  items: CustomizedFurnitureItem[];
  onItemRemoved?: () => void;
  onNavigateToCustomizer?: () => void;
  onRequestQuote?: (item: CustomizedFurnitureItem) => void;
}

const formatCurrency = (value: number | undefined, prefix = '') =>
  typeof value === 'number' && Number.isFinite(value)
    ? `${prefix}$${value.toLocaleString()}`
    : undefined;

const formatChoiceName = (value: string | { name: string } | undefined): string | undefined =>
  typeof value === 'string' ? value : value?.name;

const formatDimension = (value: number | undefined) =>
  typeof value === 'number' && Number.isFinite(value) ? `${value.toFixed(2)} m` : undefined;

const uniqueByName = <T extends { name: string }>(values: T[]) => {
  const seen = new Set<string>();
  return values.filter((value) => {
    const key = value.name.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export default function CustomizedFurnitureList({
  items,
  onItemRemoved,
  onNavigateToCustomizer,
  onRequestQuote,
}: CustomizedFurnitureListProps) {
  const { storage } = useWidgetContext();
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(() => new Set());

  const handleRemove = async (id: string) => {
    if (!confirm('Are you sure you want to remove this customized furniture item?')) {
      return;
    }

    setRemovingId(id);
    try {
      storage.removeCustomizedFurniture(id);
      onItemRemoved?.();
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setRemovingId(null);
    }
  };

  const handleNavigateToCustomizer = () => {
    if (onNavigateToCustomizer) {
      onNavigateToCustomizer();
      return;
    }

    window.dispatchEvent(new CustomEvent('modly:navigate-to-customizer'));
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 relative">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <p className="text-lg text-text-primary mb-2">No customized furniture yet</p>
        <p className="text-sm text-text-muted mb-4">
          Customize furniture in the Customizer to see your creations here
        </p>
        <button
          type="button"
          onClick={handleNavigateToCustomizer}
          className="px-6 py-3 bg-earth-forest text-white rounded-xl font-semibold hover:bg-earth-forest/90 transition-all duration-300 cursor-pointer relative z-10"
        >
          Go to Customizer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-950">My Customized Furniture</h2>
        <p className="mt-1 text-sm text-gray-500">{items.length} saved custom design{items.length === 1 ? '' : 's'}</p>
      </div>

      <div className={['grid grid-cols-1 gap-5', items.length === 1 ? 'mx-auto max-w-md' : 'sm:grid-cols-2 xl:grid-cols-3'].join(' ')}>
        {items.map((item) => {
          const imageUrl = item.imageUrl?.trim();
          const canShowImage = Boolean(imageUrl && !imageErrors.has(item.id));
          const productName = item.productName || item.name;
          const category = item.category || item.baseItemType;
          const selectedColor = formatChoiceName(item.selectedColor) || item.colorScheme.primary;
          const selectedMaterial = formatChoiceName(item.selectedMaterial) || item.materials.primary;
          const addOns = uniqueByName(
            item.selectedAddOns ??
              item.ornamentDetails?.map((name) => ({ name })) ??
              []
          );
          const shopifyOptions = (item.selectedShopifyOptions ?? []).filter(
            (option) => option.name.trim() && option.value.trim()
          );
          const dimensionRows = [
            ['Length', formatDimension(item.dimensions.length)],
            ['Width', formatDimension(item.dimensions.width)],
            ['Height', formatDimension(item.dimensions.height)],
          ].filter((row): row is [string, string] => Boolean(row[1]));
          const basePrice = formatCurrency(item.basePrice ?? item.price);
          const customizationPrice = formatCurrency(item.customizationPrice, '+');
          const estimatedTotal = formatCurrency(item.estimatedTotal);

          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_22px_55px_rgba(15,23,42,0.12)]"
            >
              <div className="relative p-3 pb-0">
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                  {canShowImage ? (
                    <img
                      src={imageUrl}
                      alt={productName}
                      className="h-full w-full object-cover"
                      onError={() =>
                        setImageErrors((prev) => {
                          const next = new Set(prev);
                          next.add(item.id);
                          return next;
                        })
                      }
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-50 to-stone-100 text-gray-300">
                      <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <span className="absolute right-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-gray-200">
                  Custom
                </span>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <h3 className="text-lg font-semibold leading-tight text-gray-950">{productName}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
                    {category && <span className="capitalize">{category}</span>}
                    {category && <span aria-hidden="true">/</span>}
                    <span>Saved {new Date(item.savedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {dimensionRows.length > 0 && (
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Dimensions</p>
                    <div className="grid grid-cols-3 gap-2">
                      {dimensionRows.map(([label, value]) => (
                        <div key={label}>
                          <p className="text-[11px] text-gray-500">{label}</p>
                          <p className="text-sm font-semibold text-gray-950">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(selectedColor || selectedMaterial || addOns.length > 0) && (
                  <div className="space-y-3">
                    {selectedColor && (
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Color</p>
                        <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-900">
                          {selectedColor}
                        </span>
                      </div>
                    )}

                    {selectedMaterial && (
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Material</p>
                        <span className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-sm font-medium text-stone-900">
                          {selectedMaterial}
                        </span>
                      </div>
                    )}

                    {addOns.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Add-ons</p>
                        <div className="flex flex-wrap gap-2">
                          {addOns.map((addOn) => (
                            <span key={addOn.name} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-900">
                              {addOn.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {shopifyOptions.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Options</p>
                    <div className="space-y-2 rounded-xl border border-gray-200 p-3">
                      {shopifyOptions.map((option) => (
                        <div key={`${option.name}-${option.value}`} className="flex items-center justify-between gap-3 text-sm">
                          <span className="text-gray-500">{option.name}</span>
                          <span className="text-right font-semibold text-gray-950">{option.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(basePrice || customizationPrice || estimatedTotal || item.pricingMode === 'quote_required') && (
                  <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">
                    {basePrice && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-gray-500">Base price</span>
                        <span className="font-semibold text-gray-950">{basePrice}</span>
                      </div>
                    )}
                    {customizationPrice && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-gray-500">Customizations</span>
                        <span className="font-semibold text-gray-950">{customizationPrice}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-3 border-t border-gray-200 pt-2">
                      <span className="font-semibold text-gray-700">Estimated total</span>
                      <span className="font-bold text-gray-950">
                        {item.pricingMode === 'quote_required' ? 'Quote required' : estimatedTotal ?? 'Quote required'}
                      </span>
                    </div>
                  </div>
                )}

                {item.customerRequestText?.trim() && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                    <p className="mb-1 text-xs font-semibold uppercase text-amber-800">Request</p>
                    <p className="line-clamp-3 text-sm text-amber-950">{item.customerRequestText}</p>
                  </div>
                )}

                <div className="space-y-2 border-t border-gray-100 pt-4">
                  {onRequestQuote && (
                    <button
                      type="button"
                      onClick={() => onRequestQuote(item)}
                      className="w-full rounded-xl bg-gray-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                      Request Quote
                    </button>
                  )}
                  <div className="flex gap-2">
                    {item.productUrl && (
                      <a
                        href={item.productUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        View in Catalog
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      disabled={removingId === item.id}
                      className="flex-1 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {removingId === item.id ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
