import React from 'react';
import ReactDOM from 'react-dom/client';
import { FurnitureAIWidgetButton } from './components/FurnitureAIWidgetButton';
import { WidgetConfig, fetchRemoteConfig, getApiBaseUrlFromConfigUrl, getWidgetTitle, mergeConfig } from './utils/config';
import widgetStyles from './styles/widget.css';

let widgetRoot: ReactDOM.Root | null = null;
let container: HTMLDivElement | null = null;
let mountNode: HTMLDivElement | null = null;

function injectWidgetStyles(root: ShadowRoot) {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('data-modly-widget-styles', '');
  styleElement.textContent = widgetStyles;
  root.appendChild(styleElement);
}

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
  mountNode = null;

  // Create container
  container = document.createElement('div');
  container.id = 'modly-widget-container';
  document.body.appendChild(container);
  const shadowRoot = container.attachShadow({ mode: 'open' });
  injectWidgetStyles(shadowRoot);
  mountNode = document.createElement('div');
  mountNode.className = 'modly-widget-root';
  shadowRoot.appendChild(mountNode);

  // Fetch remote config if configUrl is provided
  let remoteConfig: WidgetConfig = {};
  const configUrl = userConfig?.configUrl || ((userConfig?.widgetId || userConfig?.storeId) ? '/api/widget/config' : undefined);
  const apiBaseUrl = userConfig?.apiBaseUrl || getApiBaseUrlFromConfigUrl(configUrl);
  if (configUrl) {
    remoteConfig = await fetchRemoteConfig(configUrl, userConfig?.widgetId, userConfig?.storeId);
  }

  // Merge configs (remote > user > defaults)
  const finalConfig = mergeConfig({
    ...userConfig,
    ...(apiBaseUrl ? { apiBaseUrl } : {}),
    ...remoteConfig,
  });

  // Render widget
  widgetRoot = ReactDOM.createRoot(mountNode);
  widgetRoot.render(
    React.createElement(FurnitureAIWidgetButton, {
      config: finalConfig,
      buttonText: getWidgetTitle(finalConfig),
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
  mountNode = null;
}

// Expose global API
(window as typeof window & {
  ModlyWidget?: {
    init: (config?: Partial<WidgetConfig>) => void;
    destroy: () => void;
  };
}).ModlyWidget = {
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
  const script = document.querySelector<HTMLScriptElement>('[data-modly-widget]');
  if (script) {
    const storeId = script.dataset.storeId;
    const widgetId = script.dataset.widgetId;
    const configUrl = script.dataset.configUrl;

    if (configUrl || storeId || widgetId) {
      initWidget({
        configUrl: configUrl || undefined,
        storeId: storeId || undefined,
        widgetId: widgetId || undefined,
      });
    }
  }
}
