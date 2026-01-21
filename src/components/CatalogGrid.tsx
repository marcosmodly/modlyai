'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FurnitureItem } from '@/types';

interface CatalogGridProps {
  onCustomizeItem?: (item: FurnitureItem) => void;
}

export default function CatalogGrid({ onCustomizeItem }: CatalogGridProps) {
  const router = useRouter();
  const [items, setItems] = useState<FurnitureItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/catalog/items');
        if (!response.ok) {
          throw new Error('Failed to load catalog');
        }
        const data = await response.json();
        setItems(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load catalog');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(items.map((item) => item.category).filter(Boolean));
    return ['All', ...Array.from(unique).sort()];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = searchQuery
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.styleTags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  const handleCustomize = (item: FurnitureItem) => {
    console.log('[CatalogGrid] Customizing item:', item.id, item.name);
    sessionStorage.setItem('modly-customize-item', JSON.stringify(item));
    onCustomizeItem?.(item);
    router.push('/customizer');
  };

  if (isLoading) {
    return (
      <div className="text-center py-12 text-[#A0A0A0]">
        <p className="text-lg">Loading catalog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-300">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, category, or style..."
          className="w-full md:max-w-md px-4 py-3 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]"
        />
        <div className="flex items-center gap-3">
          <label className="text-sm text-[#A0A0A0]">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-earth-border rounded-xl bg-[#1A1C19] text-[#F0EFEA] focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12 text-[#A0A0A0]">
          <p className="text-lg">No items found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#1A1C19] rounded-xl shadow-soft border border-earth-border overflow-hidden hover:border-earth-sage/30 transition-all duration-300 flex flex-col"
            >
              <div className="w-full h-56 bg-earth-input flex items-center justify-center overflow-hidden">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(event) => {
                      const image = event.currentTarget;
                      image.onerror = null;
                      image.src = '/demo-fallback.jpg';
                    }}
                  />
                ) : (
                  <svg className="w-16 h-16 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-[#F0EFEA]">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#A0A0A0]">{item.category}</p>
                </div>
                <div className="text-sm text-[#A0A0A0]">
                  <span className="text-[#F0EFEA] font-medium">Colors:</span>{' '}
                  {[item.colors.main, item.colors.accent].filter(Boolean).join(', ') || 'N/A'}
                </div>
                <div className="text-sm text-[#A0A0A0]">
                  <span className="text-[#F0EFEA] font-medium">Materials:</span>{' '}
                  {[item.materials.primary, item.materials.secondary]
                    .filter(Boolean)
                    .join(', ') || 'N/A'}
                </div>
                <button
                  onClick={() => handleCustomize(item)}
                  className="mt-auto inline-block w-full text-center px-4 py-2 bg-earth-forest text-white rounded-xl font-medium hover:bg-earth-forest/90 transition-all duration-300"
                >
                  Customize
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
