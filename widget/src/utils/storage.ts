import { CustomizedFurnitureItem } from '../types';

export class Storage {
  private key: string;

  constructor(key: string = 'modly-customized-furniture') {
    this.key = key;
  }

  saveCustomizedFurniture(item: Omit<CustomizedFurnitureItem, 'id' | 'savedAt'>): CustomizedFurnitureItem {
    const items = this.getCustomizedFurniture();
    
    const newItem: CustomizedFurnitureItem = {
      ...item,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      savedAt: new Date().toISOString(),
    };
    
    items.push(newItem);
    
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.key, JSON.stringify(items));
      }
      return newItem;
    } catch (error) {
      console.error('Failed to save customized furniture:', error);
      throw error;
    }
  }

  getCustomizedFurniture(): CustomizedFurnitureItem[] {
    if (typeof window === 'undefined') {
      return [];
    }
    
    try {
      const stored = localStorage.getItem(this.key);
      if (!stored) {
        return [];
      }
      return JSON.parse(stored) as CustomizedFurnitureItem[];
    } catch (error) {
      console.error('Failed to load customized furniture:', error);
      return [];
    }
  }

  removeCustomizedFurniture(id: string): boolean {
    const items = this.getCustomizedFurniture();
    const filtered = items.filter(item => item.id !== id);
    
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.key, JSON.stringify(filtered));
      }
      return true;
    } catch (error) {
      console.error('Failed to remove customized furniture:', error);
      return false;
    }
  }

  clearCustomizedFurniture(): boolean {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(this.key);
      }
      return true;
    } catch (error) {
      console.error('Failed to clear customized furniture:', error);
      return false;
    }
  }
}
