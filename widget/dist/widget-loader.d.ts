import { WidgetConfig } from './utils/config';
declare global {
    interface Window {
        ModlyWidget?: {
            init: (config?: Partial<WidgetConfig>) => void;
            destroy: () => void;
        };
    }
}
//# sourceMappingURL=widget-loader.d.ts.map