export interface PageContext {
  pageType?: 'product' | 'catalog' | 'category' | 'home' | 'other';
  productId?: string;
  productName?: string;
  category?: string;
  price?: number;
  currentUrl?: string;
  metadata?: Record<string, string>;
}

export class PageContextExtractor {
  private static readonly DATA_ATTRIBUTE_PREFIX = 'data-modly-';

  static extractContext(): PageContext {
    const context: PageContext = {
      currentUrl: typeof window !== 'undefined' ? window.location.href : undefined,
      metadata: {},
    };

    // Extract data attributes from the page
    if (typeof document !== 'undefined') {
      // Check for data attributes on body or html element
      const body = document.body;
      const html = document.documentElement;

      // Extract all data-modly-* attributes
      [body, html].forEach((element) => {
        if (element) {
          Array.from(element.attributes).forEach((attr) => {
            if (attr.name.startsWith(this.DATA_ATTRIBUTE_PREFIX)) {
              const key = attr.name.replace(this.DATA_ATTRIBUTE_PREFIX, '');
              const value = attr.value;
              
              // Map common attributes
              switch (key) {
                case 'product-id':
                  context.productId = value;
                  break;
                case 'product-name':
                  context.productName = value;
                  break;
                case 'category':
                  context.category = value;
                  break;
                case 'price':
                  context.price = parseFloat(value);
                  break;
                case 'page-type':
                  context.pageType = value as PageContext['pageType'];
                  break;
                default:
                  context.metadata![key] = value;
              }
            }
          });
        }
      });

      // Try to infer page type from URL if not set
      if (!context.pageType && context.currentUrl) {
        const url = new URL(context.currentUrl);
        const pathname = url.pathname.toLowerCase();
        
        if (pathname.includes('/product/') || pathname.includes('/item/')) {
          context.pageType = 'product';
        } else if (pathname.includes('/catalog/') || pathname.includes('/shop/')) {
          context.pageType = 'catalog';
        } else if (pathname.includes('/category/') || pathname.includes('/collection/')) {
          context.pageType = 'category';
        } else if (pathname === '/' || pathname === '/index') {
          context.pageType = 'home';
        } else {
          context.pageType = 'other';
        }
      }

      // Try to extract product info from common selectors if not found via data attributes
      if (!context.productName && context.pageType === 'product') {
        const productNameSelectors = [
          'h1.product-title',
          'h1[data-testid="product-title"]',
          '.product-name',
          'h1',
        ];
        
        for (const selector of productNameSelectors) {
          const element = document.querySelector(selector);
          if (element && element.textContent) {
            context.productName = element.textContent.trim();
            break;
          }
        }
      }
    }

    return context;
  }

  static watchForChanges(callback: (context: PageContext) => void): () => void {
    if (typeof window === 'undefined') {
      return () => {};
    }

    let lastContext = this.extractContext();
    callback(lastContext);

    // Watch for URL changes (SPA navigation)
    let lastUrl = window.location.href;
    const checkUrl = () => {
      if (window.location.href !== lastUrl) {
        lastUrl = window.location.href;
        const newContext = this.extractContext();
        if (JSON.stringify(newContext) !== JSON.stringify(lastContext)) {
          lastContext = newContext;
          callback(newContext);
        }
      }
    };

    // Check periodically for URL changes
    const intervalId = setInterval(checkUrl, 1000);

    // Watch for attribute changes
    const observer = new MutationObserver(() => {
      const newContext = this.extractContext();
      if (JSON.stringify(newContext) !== JSON.stringify(lastContext)) {
        lastContext = newContext;
        callback(newContext);
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: Array.from(document.body.attributes)
        .map(attr => attr.name)
        .filter(name => name.startsWith(this.DATA_ATTRIBUTE_PREFIX)),
      subtree: true,
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: Array.from(document.documentElement.attributes)
        .map(attr => attr.name)
        .filter(name => name.startsWith(this.DATA_ATTRIBUTE_PREFIX)),
    });

    return () => {
      clearInterval(intervalId);
      observer.disconnect();
    };
  }
}
