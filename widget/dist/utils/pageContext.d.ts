export interface PageContext {
    pageType?: 'product' | 'catalog' | 'category' | 'home' | 'other';
    productId?: string;
    productName?: string;
    category?: string;
    price?: number;
    currentUrl?: string;
    metadata?: Record<string, string>;
}
export declare class PageContextExtractor {
    private static readonly DATA_ATTRIBUTE_PREFIX;
    static extractContext(): PageContext;
    static watchForChanges(callback: (context: PageContext) => void): () => void;
}
//# sourceMappingURL=pageContext.d.ts.map