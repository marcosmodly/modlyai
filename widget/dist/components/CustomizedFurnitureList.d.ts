import { CustomizedFurnitureItem } from '../types';
interface CustomizedFurnitureListProps {
    items: CustomizedFurnitureItem[];
    onItemRemoved?: () => void;
    onNavigateToCustomizer?: () => void;
    onRequestQuote?: (item: CustomizedFurnitureItem) => void;
}
export default function CustomizedFurnitureList({ items, onItemRemoved, onNavigateToCustomizer, onRequestQuote, }: CustomizedFurnitureListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CustomizedFurnitureList.d.ts.map