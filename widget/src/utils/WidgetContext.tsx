import React, { createContext, useContext } from 'react';
import { ApiClient } from './apiClient';
import { Storage } from './storage';
import { WidgetConfig } from './config';

interface WidgetContextValue {
  apiClient: ApiClient;
  storage: Storage;
  config: WidgetConfig;
}

const WidgetContext = createContext<WidgetContextValue | null>(null);

export function WidgetProvider({ 
  children, 
  apiClient, 
  storage, 
  config 
}: { 
  children: React.ReactNode;
  apiClient: ApiClient;
  storage: Storage;
  config: WidgetConfig;
}) {
  return (
    <WidgetContext.Provider value={{ apiClient, storage, config }}>
      {children}
    </WidgetContext.Provider>
  );
}

export function useWidgetContext() {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error('useWidgetContext must be used within WidgetProvider');
  }
  return context;
}
