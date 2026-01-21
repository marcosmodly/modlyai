import { CustomizedFurnitureItem } from '../types';
export declare class Storage {
    private key;
    constructor(key?: string);
    saveCustomizedFurniture(item: Omit<CustomizedFurnitureItem, 'id' | 'savedAt'>): CustomizedFurnitureItem;
    getCustomizedFurniture(): CustomizedFurnitureItem[];
    removeCustomizedFurniture(id: string): boolean;
    clearCustomizedFurniture(): boolean;
}
//# sourceMappingURL=storage.d.ts.map