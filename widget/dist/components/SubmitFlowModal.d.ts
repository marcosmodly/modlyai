import { CustomizationConfig, FurnitureItem } from '../types';
import { SpecSheet } from '../utils/specSheetGenerator';
import { ApiClient } from '../utils/apiClient';
interface SubmitFlowModalProps {
    config: CustomizationConfig;
    product?: FurnitureItem;
    apiClient: ApiClient;
    onSuccess: (data: {
        type: 'cart' | 'quote';
        id: string;
        specSheet?: SpecSheet;
        customer?: {
            name: string;
            email: string;
            phone?: string;
            notes?: string;
        };
    }) => void;
    onClose: () => void;
}
export declare function SubmitFlowModal({ config, product, apiClient, onSuccess, onClose, }: SubmitFlowModalProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=SubmitFlowModal.d.ts.map