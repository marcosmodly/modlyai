import { FurnitureItem } from '../types';
import { WidgetConfig } from '../utils/config';
interface FurnitureRoomPlannerWidgetProps {
    config?: WidgetConfig;
    onCustomizeItem?: (item: FurnitureItem) => void;
    onNavigateToCustomizer?: () => void;
}
export declare function FurnitureRoomPlannerWidget({ config, onCustomizeItem, onNavigateToCustomizer }: FurnitureRoomPlannerWidgetProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FurnitureRoomPlannerWidget.d.ts.map