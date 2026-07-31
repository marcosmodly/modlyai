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
  // Many storefront themes (e.g. Shopify Dawn's base.css) ship a global
  // `div:empty { display: none }` reset. This container's real content lives
  // entirely in its shadow root, which doesn't count toward :empty - so
  // without a light-DOM child, those themes hide the widget outright. A
  // zero-width text node defeats :empty without being visible (the shadow
  // root has no <slot>, so light-DOM children are never rendered anyway).
  container.appendChild(document.createTextNode('​'))
  document.body.appendChild(container);
  const shadowRoot = container.attachShadow({ mode: 'open' });
  injectWidgetStyles(shadowRoot);
  mountNode = document.createElement('div');
  mountNode.className = 'modly-widget-root';
  shadowRoot.appendChild(mountNode);

  // Fetch remote config if configUrl is provided
  let remoteConfig: WidgetConfig = {};
  const configUrl = userConfig?.configUrl || ((userConfig?.widgetId || userConfig?.storeId || userConfig?.shop) ? '/api/widget/config' : undefined);
  const apiBaseUrl = userConfig?.apiBaseUrl || getApiBaseUrlFromConfigUrl(configUrl);
  if (configUrl) {
    remoteConfig = await fetchRemoteConfig(configUrl, userConfig?.widgetId, userConfig?.storeId, userConfig?.shop);
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
    return;
  }

  // Fallback for platforms that can only inject a plain <script src="...">
  // with no custom data-* attributes (e.g. Shopify's ScriptTag API, or the
  // theme app extension's embed block) - read storeId/widgetId/shop/configUrl
  // from this script's own src query string instead. document.currentScript
  // correctly refers to this exact <script> tag while it's synchronously
  // executing, even when it was inserted dynamically, as long as it isn't
  // type="module" or async-deferred in a way that breaks that association.
  const currentScript = document.currentScript as HTMLScriptElement | null;
  if (currentScript?.src) {
    try {
      const url = new URL(currentScript.src);
      const storeId = url.searchParams.get('storeId');
      const widgetId = url.searchParams.get('widgetId');
      const shop = url.searchParams.get('shop');
      const configUrl = url.searchParams.get('configUrl');

      if (storeId || widgetId || shop) {
        initWidget({
          configUrl: configUrl || undefined,
          storeId: storeId || undefined,
          widgetId: widgetId || undefined,
          shop: shop || undefined,
        });
      }
    } catch {
      // Malformed script src - nothing to auto-init from.
    }
  }
}
