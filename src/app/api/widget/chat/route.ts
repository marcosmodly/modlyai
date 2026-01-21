import { NextRequest, NextResponse } from 'next/server';
import { ChatRequest, ChatResponse, ConversationMessage, FurnitureItem } from '@/types';

// Fetch catalog items
async function getCatalogItems(): Promise<FurnitureItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const response = await fetch(`${baseUrl}/api/catalog/items`, {
      cache: 'no-store',
    });
    if (response.ok) {
      const data = await response.json();
      return data.items || [];
    }
  } catch (error) {
    console.error('Failed to fetch catalog:', error);
  }
  return [];
}

// Build system prompt with catalog context
function buildSystemPrompt(catalogItems: FurnitureItem[], pageContext?: any): string {
  const catalogSummary = catalogItems.length > 0
    ? catalogItems.slice(0, 50).map((item, index) => {
        const priceText = item.priceRange ? `$${item.priceRange.min}-${item.priceRange.max}` : 'price varies';
        const subCategoryText = item.subCategory ? `/${item.subCategory}` : '';
        const styleText = item.styleTags.join(', ');
        return `${index + 1}: ${item.name} (${item.category}${subCategoryText}), style ${styleText}, color ${item.colors.main}, ${priceText}`;
      }).join('\n')
    : '0: No catalog items available.';

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
1) Only suggest options and combinations that exist in the provided product data and rules.
2) If something is not available, do not pretend it is.
3) If the user asks for something outside the allowed options:
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

INTERNAL CATALOG CONTEXT (DO NOT OUTPUT THIS LIST):
${catalogSummary}
${catalogItems.length > 50 ? `\n(Total: ${catalogItems.length} items. Showing first 50 for context.)` : ''}

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
1: The item name and why it matches their needs
2: Key features (style, color, dimensions if relevant)
3: How it fits their constraints (budget, space, style preferences)
4: Any factory constraints or lead time considerations

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
    const body: ChatRequest = await request.json();
    const { message, conversationHistory, context, userPreferences } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Fetch catalog items
    const catalogItems = await getCatalogItems();

    // Build system prompt with catalog
    const systemPrompt = buildSystemPrompt(catalogItems, context);

    // Format messages for OpenAI
    const messages = formatMessagesForOpenAI(conversationHistory, systemPrompt);
    
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
        temperature: 0.7,
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

    return NextResponse.json(response);
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
