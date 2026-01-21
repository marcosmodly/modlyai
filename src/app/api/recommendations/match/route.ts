import { NextRequest, NextResponse } from 'next/server';
import { RecommendationMatchRequest, RecommendationMatchResponse, FurnitureItem } from '@/types';

// Step 1: Rule-based filtering
function filterProducts(
  products: FurnitureItem[],
  budget?: { min?: number; max?: number },
  style?: string[],
  roomDimensions?: { length: number; width: number; height: number },
  roomType?: string,
  constraints?: string[],
  excludeOutOfStock?: boolean
): FurnitureItem[] {
  let filtered = [...products];

  // Filter by budget
  if (budget) {
    filtered = filtered.filter(product => {
      if (!product.priceRange) return true; // Include products without price if budget not strict
      const productMin = product.priceRange.min;
      const productMax = product.priceRange.max;
      
      if (budget.min !== undefined && budget.max !== undefined) {
        // Budget range: product must overlap with budget range
        return productMax >= budget.min && productMin <= budget.max;
      } else if (budget.min !== undefined) {
        // Only min budget: product max must be >= min
        return productMax >= budget.min;
      } else if (budget.max !== undefined) {
        // Only max budget: product min must be <= max
        return productMin <= budget.max;
      }
      return true;
    });
  }

  // Filter by style tags (if style preferences provided)
  if (style && style.length > 0) {
    filtered = filtered.filter(product => {
      // Product matches if any style tag matches user preferences
      return product.styleTags.some(tag => 
        style.some(pref => 
          tag.toLowerCase().includes(pref.toLowerCase()) || 
          pref.toLowerCase().includes(tag.toLowerCase())
        )
      );
    });
  }

  // Filter by room dimensions (ensure products fit)
  if (roomDimensions) {
    filtered = filtered.filter(product => {
      const clearance = product.dimensions.clearance?.front || 0.5;
      const totalLength = product.dimensions.length + clearance;
      const totalWidth = product.dimensions.width + (product.dimensions.clearance?.sides || 0) * 2;
      
      return totalLength <= roomDimensions.length * 0.9 && 
             totalWidth <= roomDimensions.width * 0.9 &&
             product.dimensions.height <= roomDimensions.height * 0.8;
    });
  }

  // Filter by category/room type compatibility
  if (roomType) {
    const roomTypeLower = roomType.toLowerCase();
    filtered = filtered.filter(product => {
      const categoryLower = product.category.toLowerCase();
      const subCategoryLower = product.subCategory?.toLowerCase() || '';
      
      // Basic room type to category mapping
      if (roomTypeLower === 'office') {
        return categoryLower.includes('seating') || categoryLower.includes('desk') || categoryLower.includes('storage');
      } else if (roomTypeLower === 'bedroom') {
        return categoryLower.includes('bed') || categoryLower.includes('storage') || categoryLower.includes('seating');
      } else if (roomTypeLower === 'dining') {
        return categoryLower.includes('table') || categoryLower.includes('dining') || categoryLower.includes('seating');
      } else if (roomTypeLower === 'kitchen') {
        return categoryLower.includes('table') || categoryLower.includes('storage');
      } else if (roomTypeLower === 'living') {
        return true; // Living rooms can have most furniture
      }
      return true; // Default: allow all if room type not recognized
    });
  }

  // Filter by availability
  if (excludeOutOfStock) {
    filtered = filtered.filter(product => 
      product.stockStatus !== 'out_of_stock'
    );
  }

  // Apply additional constraints if provided
  if (constraints && constraints.length > 0) {
    // Filter based on constraint keywords
    filtered = filtered.filter(product => {
      const productText = `${product.name} ${product.category} ${product.subCategory || ''} ${product.materials.primary} ${product.colors.main}`.toLowerCase();
      return constraints.some(constraint => 
        productText.includes(constraint.toLowerCase())
      );
    });
  }

  return filtered;
}

// Step 2: AI scoring/ranking
async function scoreProductsWithAI(
  products: FurnitureItem[],
  roomInfo?: { dimensions?: any; roomType?: string },
  style?: string[],
  budget?: { min?: number; max?: number }
): Promise<RecommendationMatchResponse> {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  
  if (!openaiApiKey) {
    // Fallback: return products with default scores if no API key
    return {
      summary: `Found ${products.length} matching products`,
      recommendations: products.slice(0, 10).map((product, index) => ({
        productId: product.id,
        matchScore: 0.8 - (index * 0.05),
        reason: `Matches your preferences for ${product.category.toLowerCase()}`,
      })),
    };
  }

  // Build catalog context for AI
  const catalogContext = products.map(product => {
    const priceInfo = product.priceRange 
      ? `$${product.priceRange.min}-${product.priceRange.max}` 
      : 'price varies';
    return `${product.id}: ${product.name} (${product.category}${product.subCategory ? `/${product.subCategory}` : ''}), ${product.styleTags.join(', ')} style, ${product.colors.main} color, ${product.dimensions.length}m×${product.dimensions.width}m×${product.dimensions.height}m, ${priceInfo}`;
  }).join('\n');

  const roomInfoText = roomInfo?.dimensions 
    ? `Room: ${roomInfo.dimensions.length}m × ${roomInfo.dimensions.width}m × ${roomInfo.dimensions.height}m, type: ${roomInfo.roomType || 'not specified'}`
    : roomInfo?.roomType 
    ? `Room type: ${roomInfo.roomType}`
    : 'Room info not provided';

  const styleText = style && style.length > 0 ? `Style preferences: ${style.join(', ')}` : 'No specific style preferences';
  const budgetText = budget 
    ? `Budget: ${budget.min !== undefined ? `$${budget.min}` : ''}${budget.min !== undefined && budget.max !== undefined ? '-' : ''}${budget.max !== undefined ? `$${budget.max}` : ''}`
    : 'No budget constraint';

  const systemPrompt = `You are ModlyAI, a furniture catalog recommendation assistant.

IMPORTANT RULES:
- You must return ONLY valid JSON. No markdown, no code blocks, no explanations outside JSON.
- Do NOT use markdown formatting (no **, no lists, no backticks).
- Do NOT invent products. Only use product IDs from the catalog provided below.
- Return JSON in this exact format:
{
  "summary": "short summary string",
  "recommendations": [
    {
      "productId": "string",
      "matchScore": 0.0,
      "reason": "short reason"
    }
  ]
}

CATALOG (use only these product IDs):
${catalogContext}

USER PREFERENCES:
${roomInfoText}
${styleText}
${budgetText}

TASK:
1. Score each product from the catalog (0.0 to 1.0) based on how well it matches user preferences
2. Rank products by match score (highest first)
3. Select top 10 products
4. Generate a short summary (one sentence)
5. Provide a brief reason for each recommendation

CRITICAL: Return ONLY the JSON object. No other text.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Provide product recommendations as JSON.' },
        ],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('OpenAI API error:', errorData);
      // Fallback to default scoring
      return {
        summary: `Found ${products.length} matching products`,
        recommendations: products.slice(0, 10).map((product, index) => ({
          productId: product.id,
          matchScore: 0.8 - (index * 0.05),
          reason: `Matches your preferences for ${product.category.toLowerCase()}`,
        })),
      };
    }

    const data = await response.json();
    const aiResponseText = data.choices[0]?.message?.content || '{}';
    
    // Parse JSON response
    let aiResponse: RecommendationMatchResponse;
    try {
      aiResponse = JSON.parse(aiResponseText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback
      return {
        summary: `Found ${products.length} matching products`,
        recommendations: products.slice(0, 10).map((product, index) => ({
          productId: product.id,
          matchScore: 0.8 - (index * 0.05),
          reason: `Matches your preferences for ${product.category.toLowerCase()}`,
        })),
      };
    }

    // Validate product IDs exist in catalog
    const validProductIds = new Set(products.map(p => p.id));
    const validatedRecommendations = (aiResponse.recommendations || []).filter(rec => 
      validProductIds.has(rec.productId)
    );

    return {
      summary: aiResponse.summary || `Found ${validatedRecommendations.length} matching products`,
      recommendations: validatedRecommendations.slice(0, 10),
    };
  } catch (error) {
    console.error('Error in AI scoring:', error);
    // Fallback to default scoring
    return {
      summary: `Found ${products.length} matching products`,
      recommendations: products.slice(0, 10).map((product, index) => ({
        productId: product.id,
        matchScore: 0.8 - (index * 0.05),
        reason: `Matches your preferences for ${product.category.toLowerCase()}`,
      })),
    };
  }
}

// Step 3: Main endpoint handler
export async function POST(request: NextRequest) {
  try {
    const body: RecommendationMatchRequest = await request.json();

    // Validate input
    if (!body.catalog || !Array.isArray(body.catalog) || body.catalog.length === 0) {
      return NextResponse.json(
        { error: 'Catalog array is required and must contain at least one product' },
        { status: 400 }
      );
    }

    // Validate product IDs exist
    const productIds = new Set(body.catalog.map(p => p.id));
    if (productIds.size !== body.catalog.length) {
      return NextResponse.json(
        { error: 'Catalog contains duplicate product IDs' },
        { status: 400 }
      );
    }

    // Step 1: Rule-based filtering
    const filteredProducts = filterProducts(
      body.catalog,
      body.budget,
      body.style,
      body.roomInfo?.dimensions,
      body.roomInfo?.roomType,
      body.constraints,
      body.excludeOutOfStock
    );

    // If no products match filters, return empty recommendations
    if (filteredProducts.length === 0) {
      return NextResponse.json({
        summary: 'No products match your criteria',
        recommendations: [],
      });
    }

    // Step 2: AI scoring/ranking
    const result = await scoreProductsWithAI(
      filteredProducts,
      body.roomInfo,
      body.style,
      body.budget
    );

    // Step 3: Return top N (already handled in AI scoring, but ensure limit)
    const maxResults = body.maxResults || 10;
    result.recommendations = result.recommendations.slice(0, maxResults);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in recommendation matching:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { 
        error: 'Failed to generate recommendations',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
