import { CustomizedFurnitureItem } from '../types';
interface CustomizedFurnitureListProps {
    items: CustomizedFurnitureItem[];
    onItemRemoved?: () => void;
    onNavigateToCustomizer?: () => void;
    onRequestQuote?: (item: CustomizedFurnitureItem) => void;
    highlightItemId?: string | null;
}
export default function CustomizedFurnitureList({ items, onItemRemoved, onNavigateToCustomizer, onRequestQuote, highlightItemId, }: CustomizedFurnitureListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CustomizedFurnitureList.d.ts.map