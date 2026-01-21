import { CustomizedFurnitureItem } from '@/types';

const STORAGE_KEY = 'modly-customized-furniture';

/**
 * Save a customized furniture item to localStorage
 */
export function saveCustomizedFurniture(item: Omit<CustomizedFurnitureItem, 'id' | 'savedAt'>): CustomizedFurnitureItem {
  const items = getCustomizedFurniture();
  
  const newItem: CustomizedFurnitureItem = {
    ...item,
    id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    savedAt: new Date().toISOString(),
  };
  
  items.push(newItem);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return newItem;
  } catch (error) {
    console.error('Failed to save customized furniture:', error);
    throw error;
  }
}

/**
 * Get all customized furniture items from localStorage
 */
export function getCustomizedFurniture(): CustomizedFurnitureItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) as CustomizedFurnitureItem[];
  } catch (error) {
    console.error('Failed to load customized furniture:', error);
    return [];
  }
}

/**
 * Remove a customized furniture item by ID
 */
export function removeCustomizedFurniture(id: string): boolean {
  const items = getCustomizedFurniture();
  const filtered = items.filter(item => item.id !== id);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to remove customized furniture:', error);
    return false;
  }
}

/**
 * Clear all customized furniture items
 */
export function clearCustomizedFurniture(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear customized furniture:', error);
    return false;
  }
}

/**
 * Check if a customized item already exists (by comparing key properties)
 */
export function itemExists(item: Omit<CustomizedFurnitureItem, 'id' | 'savedAt'>): boolean {
  const items = getCustomizedFurniture();
  return items.some(existing => 
    existing.name === item.name &&
    existing.baseItemType === item.baseItemType &&
    JSON.stringify(existing.dimensions) === JSON.stringify(item.dimensions) &&
    JSON.stringify(existing.colorScheme) === JSON.stringify(item.colorScheme)
  );
}
