import { CustomizationConfig, FurnitureItem } from '../types';
import { ApiClient } from '../utils/apiClient';
interface SubmitFlowModalProps {
    config: CustomizationConfig;
    product?: FurnitureItem;
    apiClient: ApiClient;
    onSuccess: (data: {
        type: 'cart' | 'quote';
        id: string;
    }) => void;
    onClose: () => void;
}
export declare function SubmitFlowModal({ config, product, apiClient, onSuccess, onClose, }: SubmitFlowModalProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=SubmitFlowModal.d.ts.map