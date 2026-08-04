import React from 'react';
import { QuoteRequest } from '../types';
import { Product } from '../data/products';
import { WidgetConfig } from '../utils/config';
interface FurnitureCustomizerWidgetProps {
    config?: WidgetConfig;
    onNavigateToRoomPlanner?: () => void;
    selectedProduct?: Product | null;
    onSelectedProductChange?: (product: Product) => void;
    /** Called after a quote request submits successfully. */
    onQuoteSubmitted?: (data: {
        quoteRequest: QuoteRequest;
        response: any;
    }) => void;
}
export interface FurnitureCustomizerHandle {
    /** Saves the current draft (if not already saved) and marks it for the
     * Room Planner to scroll to and highlight — the same thing the in-panel
     * "View in Room Planner" button does, exposed so a host nav tab can
     * trigger it too when navigating away from the customizer directly. */
    saveDraftAndHighlight: () => void;
}
export declare const FurnitureCustomizerWidget: React.ForwardRefExoticComponent<FurnitureCustomizerWidgetProps & React.RefAttributes<FurnitureCustomizerHandle>>;
export {};
//# sourceMappingURL=FurnitureCustomizerWidget.d.ts.map