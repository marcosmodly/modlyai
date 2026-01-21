import React from 'react';
import { ApiClient } from './apiClient';
import { Storage } from './storage';
import { WidgetConfig } from './config';
interface WidgetContextValue {
    apiClient: ApiClient;
    storage: Storage;
    config: WidgetConfig;
}
export declare function WidgetProvider({ children, apiClient, storage, config }: {
    children: React.ReactNode;
    apiClient: ApiClient;
    storage: Storage;
    config: WidgetConfig;
}): import("react/jsx-runtime").JSX.Element;
export declare function useWidgetContext(): WidgetContextValue;
export {};
//# sourceMappingURL=WidgetContext.d.ts.map