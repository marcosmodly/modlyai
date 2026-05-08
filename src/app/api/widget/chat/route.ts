import { NextRequest, NextResponse } from 'next/server';
import { ChatCatalogPayload, ChatRequest, ChatResponse, ConversationMessage, FurnitureItem } from '@/types';
import { getCatalogForRequest, catalogProductToFurnitureItem } from '@/lib/store-catalog';
import { getCatalogSnapshot, type CatalogSource, type NormalizedCatalogProduct } from '@/lib/catalog-source';
import { checkAiChatLimit, findStoreForUsage, incrementUsage } from '@/lib/usage-limits';

type ChatCatalog = {
  products: NormalizedCatalogProduct[];
  items: FurnitureItem[];
  source: CatalogSource;
  count: number;
};

// Fetch the same active catalog used by dashboard/product surfaces.
async function getChatCatalog(storeId?: string, apiKey?: string, storeDomain?: string): Promise<ChatCatalog> {
  const { catalog } = await getCatalogForRequest({ storeId, apiKey, domain: storeDomain });
  const products = Array.isArray(catalog.products) ? catalog.products : [];

  return {
    products,
    items: products.map(catalogProductToFurnitureItem),
    source: catalog.source,
    count: catalog.count,
  };
}

function getChatCatalogFromRequest(catalog?: ChatCatalogPayload): ChatCatalog | null {
  const products = Array.isArray(catalog?.products) ? catalog.products : [];
  if (products.length === 0) return null;

  const snapshot = getCatalogSnapshot(products, {
    catalogSource: catalog?.source,
  });

  return {
    products: snapshot.products,
    items: snapshot.products.map(catalogProductToFurnitureItem),
    source: snapshot.source,
    count: snapshot.count,
  };
}

function getSourceLabel(source: CatalogSource) {
  if (source === 'csv') return 'CSV';
  if (source === 'shopify') return 'Shopify';
  if (source === 'woocommerce') return 'WooCommerce';
  if (source === 'bigcommerce') return 'BigCommerce';
  if (source === 'manual') return 'manual catalog';
  return 'no active catalog';
}

function tokenize(value: string) {
  const stopWords = new Set([
    'a', 'an', 'and', 'any', 'are', 'best', 'can', 'for', 'from', 'have', 'i',
    'in', 'is', 'it', 'me', 'my', 'of', 'on', 'or', 'please', 'product',
    'recommend', 'recommendation', 'show', 'that', 'the', 'to', 'with', 'you',
  ]);

  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

function getSearchText(product: NormalizedCatalogProduct) {
  return [
    product.title,
    product.category,
    product.description,
    product.sku,
    product.dimensions,
    ...(product.tags ?? []),
  ].filter(Boolean).join(' ').toLowerCase();
}

function getRelevantProducts(
  query: string,
  products: NormalizedCatalogProduct[] | undefined,
  limit = 15
) {
  const safeProducts = Array.isArray(products) ? products : [];

  const tokens = tokenize(query);
  if (tokens.length === 0) return safeProducts.slice(0, limit);

  const scored = safeProducts.map((product, index) => {
    const searchText = getSearchText(product);
    const title = product.title.toLowerCase();
    const score = tokens.reduce((total, token) => {
      if (title.includes(token)) return total + 5;
      if (searchText.includes(token)) return total + 2;
      return total;
    }, 0);

    return { product, score, index };
  });

  const matching = scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map((entry) => entry.product);

  return matching.length > 0 ? matching : [];
}

function getClosestCatalogProducts(
  query: string,
  products: NormalizedCatalogProduct[] | undefined,
  limit = 3
) {
  const safeProducts = Array.isArray(products) ? products : [];
  const relevant = getRelevantProducts(query, safeProducts, limit);
  return relevant.length > 0 ? relevant.slice(0, limit) : safeProducts.slice(0, limit);
}

function formatPrice(price: NormalizedCatalogProduct['price']) {
  if (price === undefined || price === null || price === '') return undefined;
  if (typeof price === 'number' && Number.isFinite(price)) return `$${price.toFixed(2)}`;

  const parsed = Number(price);
  if (Number.isFinite(parsed)) return `$${parsed.toFixed(2)}`;
  return String(price);
}

function formatCatalogLine(product: NormalizedCatalogProduct, index: number) {
  const fields = [
    `name: ${product.title}`,
    product.category ? `category: ${product.category}` : null,
    product.description ? `description: ${product.description}` : null,
    formatPrice(product.price) ? `price: ${formatPrice(product.price)}` : null,
    product.dimensions ? `dimensions: ${product.dimensions}` : null,
    product.sku ? `sku: ${product.sku}` : null,
    product.tags?.length ? `tags: ${product.tags.join(', ')}` : null,
    product.image ? `image: ${product.image}` : null,
  ].filter(Boolean);

  return `${index + 1}: ${fields.join('; ')}`;
}

function isRecommendationRequest(message: string) {
  return /\b(recommend|suggest|best|match|looking for|need|want|fit|sofa|chair|table|bed|storage|lamp|shelf|console)\b/i.test(message);
}

function createAssistantResponse(text: string, recommendations?: FurnitureItem[], action?: any) {
  const responseMessage: ConversationMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    role: 'assistant',
    type: recommendations?.length ? 'recommendations' : action ? 'action' : 'text',
    content: text,
    timestamp: Date.now(),
    metadata: {
      recommendations: recommendations?.map(item => ({
        item,
        placement: { reasoning: 'Recommended from the active catalog' },
        reasoning: `This ${item.name} is available in the active catalog.`,
        matchScore: 0.8,
      })),
      action,
    },
  };

  const response: ChatResponse = {
    message: responseMessage,
  };

  return NextResponse.json({
    reply: text,
    ...response,
  });
}

function buildNoMatchResponse(message: string, products: NormalizedCatalogProduct[]) {
  const closest = getClosestCatalogProducts(message, products, 3);
  const closestItems = closest.map(catalogProductToFurnitureItem);
  const alternatives = closest
    .map((product, index) => {
      const details = [
        product.category,
        formatPrice(product.price),
        product.dimensions,
        product.sku ? `SKU: ${product.sku}` : null,
      ].filter(Boolean).join(', ');

      return `${index + 1}: ${product.title}${details ? ` (${details})` : ''}`;
    })
    .join('\n');

  const text = alternatives
    ? `1: No matching catalog product was found for that request.\n2: Closest available catalog items:\n${alternatives}`
    : '1: No matching catalog product was found for that request.';

  return createAssistantResponse(text, closestItems);
}

// Build system prompt with catalog context
function buildSystemPrompt(
  catalogProducts: NormalizedCatalogProduct[],
  catalogMeta: Pick<ChatCatalog, 'source' | 'count'>,
  pageContext?: any
): string {
  const catalogSummary = catalogProducts.length > 0
    ? catalogProducts.map(formatCatalogLine).join('\n')
    : '0: No catalog products available.';

  return `You are ModlyAI, a sales and configuration assistant for a furniture brand.

Your purpose:
- Help users choose between products in the brand's catalog.
- Help users configure products using ONLY factory-approved options.
- Explain differences, trade-offs, and use-cases like a professional sales consultant.
- Make the brand's existing designs easier to understand, compare, and order.

Very important boundaries:
- You do NOT design products.
- You do NOT invent new furniture, structures, parts, or construction methods.
- You do NOT override factory rules, constraints, or validations.
- You do NOT claim authorship of any design. All products are designed by the manufacturer/designer.

What you are allowed to do:
- Recommend products from the provided catalog below.
- Recommend materials, colors, sizes, and options that are explicitly allowed for each product.
- Guide the user using questions about:
  - Use case (home, office, hotel, etc.)
  - Space size
  - Budget sensitivity
  - Style preference
- Explain trade-offs in a practical, manufacturing-aware way:
  - Price vs durability
  - Lead time vs customization
  - Maintenance vs appearance
- Prefer standard options when possible and mention when something affects lead time or cost.

Rules you must always follow:
1) Only recommend products from the active catalog provided in INTERNAL CATALOG CONTEXT.
2) Use exact product names from the catalog.
3) Use exact prices, SKUs, dimensions, categories, and images only when they are present in the catalog.
4) Do not invent product names, prices, dimensions, SKUs, categories, images, materials, colors, or availability.
5) If no catalog product matches the user's request, say that no matching catalog product was found and suggest the closest available catalog products from the catalog.
6) If the active catalog is empty, say no products are currently available and ask the store owner to import or connect products.
7) Only suggest options and combinations that exist in the provided product data and rules.
8) If something is not available, do not pretend it is.
9) If the user asks for something outside the allowed options:
   - Explain politely that it is not part of the brand's standard, factory-approved configurations.
   - Offer:
     - The closest valid alternative, OR
     - To mark it as a "special request for human review".
4) If 3D or images are shown:
   - Treat them as visualization of the manufacturer's design, not your own creation.
5) Always frame suggestions as:
   - "Based on the brand's approved options…"
   - "This model was designed by the manufacturer…"
   - "Here are the configurations that follow their production rules…"

CUSTOMIZATION RULE (CRITICAL):
You may customize products ONLY by selecting from the manufacturer's predefined option groups (materials, finishes, handles, ornaments, components, sizes).
- You must never invent new parts, new shapes, or new construction details.
- All customization must stay within factory-approved configurations.
- Always describe changes as "switching to another available option" or "selecting another approved variant".
- Never suggest modifications that aren't in the predefined option groups.
- When helping users customize, guide them through the available option groups for that specific product.

Language restrictions:
- Never say: "I designed", "I created", "I redesigned", "I changed the structure", "I'll add", "I'll modify", "I'll create a custom".
- Always say: "I recommend", "This brand offers", "You can choose between", "You can switch to", "You can select from the available options".
- When customizing, say: "You can switch to another available option", "You can select another approved variant", "The manufacturer offers these options".

Tone:
- Professional, helpful, respectful to the manufacturer and their designers.
- Act like a knowledgeable showroom consultant, not a creative designer.

Your main goals:
- Reduce confusion
- Prevent invalid orders
- Speed up decisions
- Help the user choose the right product and configuration
- Respect the manufacturer's design and production system at all times

ACTIVE CATALOG:
Source: ${getSourceLabel(catalogMeta.source)}
Count: ${catalogMeta.count}

INTERNAL CATALOG CONTEXT (DO NOT OUTPUT THIS RAW LIST):
${catalogSummary}

AVAILABLE ACTIONS:
1: recommend: Suggest furniture items from the catalog based on user needs
2: analyze_room: Guide user through room planning (photos, dimensions, preferences)
3: customize: Help user customize furniture items using ONLY factory-approved options
4: browse: Show catalog items when user wants to explore

CURRENT PAGE CONTEXT:
${pageContext ? JSON.stringify(pageContext, null, 2) : 'No specific page context'}

RESPONSE FORMAT (PLAIN TEXT ONLY):
1: Use plain text only. Do not use markdown or formatting symbols like **, *, #, -, or bullet lists.
2: Do not output a catalog list. If a user asks to see items, direct them to the Catalog view in the UI.
3: Use simple numbered lines with colons, like "1: ..." on each line.
4: Keep the tone conversational and helpful, like a professional sales consultant.
5: Ask clarifying questions when user intent is unclear (one question at a time).
6: Make recommendations with reasoning when you have enough context.
7: Guide users step-by-step through complex tasks.
8: Explain why you're making specific recommendations.
9: Always reference the manufacturer's approved options and designs.

When recommending items, include:
1: Best match: exact catalog product name and price if available
2: Why it fits: concise reason based only on catalog fields and the user's request
3: Dimensions: include only if available
4: SKU: include only if available
5: Alternative options from the catalog: include exact catalog product names if available

When helping with customization:
1: You may customize products ONLY by selecting from the manufacturer's predefined option groups (materials, finishes, handles, ornaments, components, sizes)
2: You must never invent new parts, new shapes, or new construction details
3: All customization must stay within factory-approved configurations
4: Always describe changes as "switching to another available option" or "selecting another approved variant"
5: Only suggest options that are factory-approved for that specific product
6: Explain any rules or constraints (e.g., "Oak is only available in the Premium line")
7: Mention if a combination affects lead time or cost
8: If a requested option isn't available, politely explain and offer the closest valid alternative
9: Guide users through the available option groups for that specific product, never suggesting custom modifications

Remember: You're a sales and configuration assistant helping users navigate the brand's existing catalog and approved configurations. You respect the manufacturer's design and production system at all times.`;
}

// Format conversation history for OpenAI
function formatMessagesForOpenAI(
  messages: ConversationMessage[],
  systemPrompt: string
): Array<{ role: 'system' | 'user' | 'assistant'; content: string }> {
  const formatted: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemPrompt },
  ];

  // Add conversation history (last 20 messages to stay within token limits)
  const recentMessages = messages.slice(-20);
  for (const msg of recentMessages) {
    if (msg.role === 'user' || msg.role === 'assistant') {
      let content = msg.content;
      
      // Include metadata in assistant messages if present
      if (msg.role === 'assistant' && msg.metadata?.recommendations) {
        const recs = msg.metadata.recommendations.map(r => r.item.name).join(', ');
        content += `\n[Recommended items: ${recs}]`;
      }
      
      formatted.push({
        role: msg.role,
        content,
      });
    }
  }

  return formatted;
}

// Parse OpenAI response to extract recommendations
function parseAIResponse(
  aiText: string,
  catalogItems: FurnitureItem[],
  userMessage: string
): { text: string; recommendations?: FurnitureItem[]; action?: any } {
  let text = aiText.trim();
  const recommendations: FurnitureItem[] = [];
  let action: any = undefined;

  // Try to extract item names mentioned in the response
  const mentionedItems: string[] = [];
  catalogItems.forEach(item => {
    if (text.toLowerCase().includes(item.name.toLowerCase())) {
      mentionedItems.push(item.name);
    }
  });

  // If items are mentioned, include them as recommendations
  if (mentionedItems.length > 0) {
    const recommendedItems = catalogItems.filter(item =>
      mentionedItems.includes(item.name)
    );
    recommendations.push(...recommendedItems.slice(0, 5)); // Limit to 5 recommendations
  }

  // Check for action triggers
  const lowerText = text.toLowerCase();
  if (lowerText.includes('upload photos') || lowerText.includes('room planner') || lowerText.includes('analyze your room')) {
    action = { type: 'open_room_planner' };
  } else if (lowerText.includes('customize') || lowerText.includes('customization')) {
    action = { type: 'open_customizer' };
  } else if (lowerText.includes('browse') || lowerText.includes('catalog') || lowerText.includes('show all')) {
    action = { type: 'show_catalog' };
  }

  return { text, recommendations: recommendations.length > 0 ? recommendations : undefined, action };
}

export async function POST(request: NextRequest) {
  try {
    let body: Partial<ChatRequest>;
    try {
      body = await request.json();
    } catch (error) {
      console.error('Invalid chat request JSON:', error);
      return NextResponse.json(
        { error: 'Invalid JSON request body' },
        { status: 400 }
      );
    }

    const {
      message = '',
      conversationHistory = [],
      storeId,
      context,
      apiKey,
      publicApiKey,
      storeDomain,
      catalog,
    } = body;
    const resolvedApiKey = apiKey || publicApiKey;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (process.env.MODLYAI_CHAT_TEST_MODE === 'true') {
      return NextResponse.json({ reply: 'Test response from ModlyAI backend.' });
    }

    // Prefer the catalog sent by the widget, then fall back to the shared server catalog.
    const requestCatalog = getChatCatalogFromRequest(catalog);
    const activeCatalog = requestCatalog ?? await getChatCatalog(storeId, resolvedApiKey, storeDomain);
    const catalogItems = activeCatalog.items;
    const usageStore = await findStoreForUsage({
      storeId,
      apiKey: resolvedApiKey,
      domain: storeDomain,
    });

    if (usageStore) {
      const usageCheck = checkAiChatLimit(usageStore);
      if (!usageCheck.allowed) {
        return createAssistantResponse(
          usageCheck.trialExpired
            ? 'Your free trial has ended. Upgrade to continue using ModlyAI.'
            : 'This store has reached its monthly AI chat limit. Please contact the store owner or upgrade the ModlyAI plan.'
        );
      }
    }

    if (activeCatalog.count === 0) {
      return createAssistantResponse(
        '1: No products are currently available because the active catalog is empty.\n2: Please ask the store owner to import a CSV catalog or connect a product source.'
      );
    }

    const relevantProducts = getRelevantProducts(message, activeCatalog.products, 50);

    if (isRecommendationRequest(message) && relevantProducts.length === 0) {
      return buildNoMatchResponse(message, activeCatalog.products);
    }

    // Build system prompt with catalog
    const systemPrompt = buildSystemPrompt(
      relevantProducts.length > 0 ? relevantProducts : activeCatalog.products,
      { source: activeCatalog.source, count: activeCatalog.count },
      context
    );

    // Format messages for OpenAI
    const messages = formatMessagesForOpenAI(Array.isArray(conversationHistory) ? conversationHistory : [], systemPrompt);
    
    // Add current user message
    messages.push({ role: 'user', content: message });

    // Call OpenAI API
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      console.error('OPENAI_API_KEY not configured');
      return NextResponse.json(
        { 
          error: 'AI service not configured. Please set OPENAI_API_KEY environment variable.',
          details: 'The OpenAI API key is required for the chat functionality to work.'
        },
        { status: 500 }
      );
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini',
        messages,
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    if (!openaiResponse.ok) {
      let errorData: any;
      try {
        errorData = await openaiResponse.json();
      } catch (e) {
        errorData = await openaiResponse.text();
      }
      console.error('OpenAI API error:', errorData);
      
      let errorMessage = 'Failed to get AI response';
      let errorCode = errorData?.error?.code || errorData?.error?.type;
      
      if (errorData?.error?.message) {
        // Handle specific error types
        if (errorCode === 'insufficient_quota' || errorData.error.message.includes('quota')) {
          errorMessage = 'OpenAI API quota exceeded. The API key has reached its usage limit. Please check your OpenAI account billing and usage limits, or contact the administrator to upgrade the plan.';
        } else if (errorCode === 'invalid_api_key') {
          errorMessage = 'Invalid OpenAI API key. Please check the API key configuration.';
        } else if (errorCode === 'rate_limit_exceeded') {
          errorMessage = 'OpenAI API rate limit exceeded. Please try again in a moment.';
        } else {
          errorMessage = `OpenAI API error: ${errorData.error.message}`;
        }
      } else if (typeof errorData === 'string') {
        errorMessage = `OpenAI API error: ${errorData}`;
      }
      
      return NextResponse.json(
        { error: errorMessage, code: errorCode },
        { status: openaiResponse.status || 500 }
      );
    }

    const openaiData = await openaiResponse.json();
    const aiText = openaiData.choices[0]?.message?.content || 'I apologize, but I encountered an error processing your request.';

    // Parse response
    const parsed = parseAIResponse(aiText, catalogItems, message);

    // Create response message
    const responseMessage: ConversationMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: 'assistant',
      type: parsed.recommendations ? 'recommendations' : parsed.action ? 'action' : 'text',
      content: parsed.text,
      timestamp: Date.now(),
      metadata: {
        recommendations: parsed.recommendations?.map(item => ({
          item,
          placement: { reasoning: 'Recommended based on your preferences' },
          reasoning: `This ${item.name} matches your needs based on our conversation.`,
          matchScore: 0.8,
        })),
        action: parsed.action,
      },
    };

    const response: ChatResponse = {
      message: responseMessage,
    };

    if (usageStore) {
      await incrementUsage(usageStore.id, 'aiChat', usageStore.aiChatsUsed);
    }

    return NextResponse.json({
      reply: parsed.text,
      ...response,
    });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
