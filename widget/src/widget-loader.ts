import React from 'react';
import ReactDOM from 'react-dom/client';
import { FurnitureAIWidgetButton } from './components/FurnitureAIWidgetButton';
import { WidgetConfig, fetchRemoteConfig, mergeConfig } from './utils/config';

declare global {
  interface Window {
    ModlyWidget?: {
      init: (config?: Partial<WidgetConfig>) => void;
      destroy: () => void;
    };
  }
}

let widgetRoot: ReactDOM.Root | null = null;
let container: HTMLDivElement | null = null;

async function initWidget(userConfig?: Partial<WidgetConfig>) {
  // Destroy existing widget if any
  if (widgetRoot) {
    widgetRoot.unmount();
    widgetRoot = null;
  }
  if (container) {
    container.remove();
    container = null;
  }

  // Create container
  container = document.createElement('div');
  container.id = 'modly-widget-container';
  document.body.appendChild(container);

  // Fetch remote config if configUrl is provided
  let remoteConfig: WidgetConfig = {};
  if (userConfig?.configUrl) {
    remoteConfig = await fetchRemoteConfig(userConfig.configUrl, userConfig.widgetId);
  }

  // Merge configs (remote > user > defaults)
  const finalConfig = mergeConfig({
    ...userConfig,
    ...remoteConfig,
  });

  // Render widget
  widgetRoot = ReactDOM.createRoot(container);
  widgetRoot.render(
    React.createElement(FurnitureAIWidgetButton, {
      config: finalConfig,
      buttonText: finalConfig.theme?.buttonText || 'ModlyAI',
      buttonPosition: finalConfig.theme?.buttonPosition || 'bottom-right',
    })
  );
}

function destroyWidget() {
  if (widgetRoot) {
    widgetRoot.unmount();
    widgetRoot = null;
  }
  if (container) {
    container.remove();
    container = null;
  }
}

// Expose global API
window.ModlyWidget = {
  init: initWidget,
  destroy: destroyWidget,
};

// Auto-initialize if script has data attributes
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoInit);
} else {
  autoInit();
}

function autoInit() {
  const script = document.querySelector('script[data-modly-widget]');
  if (script) {
    const configUrl = script.getAttribute('data-config-url');
    const widgetId = script.getAttribute('data-widget-id');
    if (configUrl) {
      initWidget({ configUrl, widgetId: widgetId || undefined });
    }
  }
}