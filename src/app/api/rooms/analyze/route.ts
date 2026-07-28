import { NextRequest, NextResponse } from 'next/server';
import { RoomAnalysisResponse, Recommendation, FurnitureItem, RoomDimensions, RoomPreferences } from '@/types';
import { getCatalogForRequest } from '@/lib/store-catalog';
import { checkRoomPlannerLimit, findStoreForUsage, incrementUsage } from '@/lib/usage-limits';
import { publicWidgetOptionsResponse, withPublicWidgetCors } from '@/lib/public-widget-cors';

// Fetch catalog items
async function getCatalogItems(storeId?: string, widgetId?: string, apiKey?: string, storeDomain?: string): Promise<FurnitureItem[]> {
  const { items } = await getCatalogForRequest({ storeId, widgetId, apiKey, domain: storeDomain });
  return items;
}

// Mock AI analysis - Fallback when OpenAI API is unavailable
async function analyzeRoomWithMockAI(
  photos: File[],
  dimensions: RoomDimensions,
  preferences?: RoomPreferences,
  catalogItems?: FurnitureItem[]
): Promise<RoomAnalysisResponse> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock room analysis
  const roomAnalysis = {
    detectedStyle: preferences?.style?.[0] || 'Modern Minimalist',
    dominantColors: preferences?.colors || ['Beige', 'Forest Green', 'Terracotta'],
    existingFurniture: ['Sofa', 'Coffee Table'],
    freeSpace: {
      estimated: dimensions.length * dimensions.width * 0.6, // Assume 60% free space
      description: `${(dimensions.length * dimensions.width * 0.6).toFixed(1)} m² available`,
    },
  };

  // Use only catalog items. If none fit, return no recommendations rather than inventing products.
  const effectiveCatalogItems = catalogItems ?? [];
  const availableItems = effectiveCatalogItems.length > 0 
    ? effectiveCatalogItems.filter((item: FurnitureItem) => 
        item.dimensions.length <= dimensions.length * 0.8 &&
        item.dimensions.width <= dimensions.width * 0.8
      ).slice(0, 5)
    : [];

  const recommendations: Recommendation[] = availableItems.map((item, index) => {
    // Calculate placement coordinates based on room dimensions
    const itemLength = item.dimensions.length;
    const itemWidth = item.dimensions.width;
    const clearance = item.dimensions.clearance?.front || 0.5;
    
    // Calculate coordinates (x from west wall, y from south wall)
    let x = 0, y = 0;
    let wall: 'north' | 'south' | 'east' | 'west' | undefined = undefined;
    let distanceFromWalls: { north?: number; south?: number; east?: number; west?: number } = {};
    
    if (index === 0) {
      // First item: place against north wall
      wall = 'north';
      x = dimensions.width / 2 - itemWidth / 2; // Center horizontally
      y = dimensions.length - itemLength - 0.1; // Near north wall
      distanceFromWalls = {
        north: 0.1,
        south: dimensions.length - itemLength - 0.1,
        east: dimensions.width - x - itemWidth,
        west: x,
      };
    } else if (index === 1) {
      // Second item: center placement
      x = dimensions.width / 2 - itemWidth / 2;
      y = dimensions.length / 2 - itemLength / 2;
      distanceFromWalls = {
        north: dimensions.length - y - itemLength,
        south: y,
        east: dimensions.width - x - itemWidth,
        west: x,
      };
    } else {
      // Other items: corner placement
      wall = 'east';
      x = dimensions.width - itemWidth - 0.2;
      y = 0.2;
      distanceFromWalls = {
        north: dimensions.length - y - itemLength,
        south: y,
        east: 0.2,
        west: x,
      };
    }

    return {
      item,
      placement: {
        wall,
        position: wall ? `Against ${wall} wall` : 'Centered',
        coordinates: { x, y },
        distanceFromWalls,
        rotation: 0,
        reasoning: index === 0
          ? `Place against the north wall to maximize floor space and create a cozy seating area. Position at (${x.toFixed(2)}m, ${y.toFixed(2)}m) from southwest corner.`
          : index === 1
          ? `Center in front of the sofa with ${clearance}m clearance for comfortable access. Position at (${x.toFixed(2)}m, ${y.toFixed(2)}m) from southwest corner.`
          : `Position in the corner to add visual interest without obstructing traffic flow. Position at (${x.toFixed(2)}m, ${y.toFixed(2)}m) from southwest corner.`,
      },
      reasoning: `This ${item.name.toLowerCase()} complements the ${roomAnalysis.detectedStyle.toLowerCase()} style detected in your room. Its dimensions (${item.dimensions.length}m × ${item.dimensions.width}m) fit well within your ${dimensions.length}m × ${dimensions.width}m space, leaving adequate clearance for movement.`,
      matchScore: 0.85 - index * 0.1,
    };
  });

  return {
    recommendations,
    roomAnalysis,
  };
}

// Real AI analysis using OpenAI Vision API
async function analyzeRoomWithAI(
  photos: File[],
  dimensions: RoomDimensions,
  preferences?: RoomPreferences,
  catalogItems?: FurnitureItem[]
): Promise<RoomAnalysisResponse> {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  
  if (!openaiApiKey) {
    console.warn('OPENAI_API_KEY not configured, falling back to mock analysis');
    return analyzeRoomWithMockAI(photos, dimensions, preferences, catalogItems);
  }

  try {
    // Convert photos to base64
    const photoBase64Promises = photos.map(async (photo) => {
      const arrayBuffer = await photo.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return buffer.toString('base64');
    });
    
    const photoBase64 = await Promise.all(photoBase64Promises);

    // Build catalog context for AI prompt — includes materials, secondary/accent
    // colors, and clearance specs, not just name/style/one-color/dimensions/price,
    // so the AI has enough detail to actually reason about fit and harmony.
    const catalogContext = (catalogItems ?? []).map((item: FurnitureItem) => {
      const materialsList = [item.materials?.primary, item.materials?.secondary, item.materials?.upholstery, item.materials?.legs]
        .filter(Boolean)
        .join('/');
      const colorList = [item.colors?.main, item.colors?.accent].filter(Boolean).join(' with ');
      const clearance = item.dimensions.clearance;
      const clearanceText = clearance
        ? ` | clearance needed: front ${clearance.front ?? 0}m, back ${clearance.back ?? 0}m, sides ${clearance.sides ?? 0}m`
        : '';
      return `- id:${item.id} | ${item.name} (${item.category}${item.subCategory ? `/${item.subCategory}` : ''}): ${item.styleTags.join(', ')} style, color: ${colorList || 'unspecified'}, materials: ${materialsList || 'unspecified'}, ${item.dimensions.length}m × ${item.dimensions.width}m × ${item.dimensions.height}m${clearanceText}, $${item.priceRange?.min || 0}-${item.priceRange?.max || 0}`;
    }).join('\n');

    const systemPrompt = `You are an expert interior design AI. Analyze room photos and recommend furniture with detailed, precise placement.

Available furniture catalog (each item has a unique id, use it exactly when recommending):
${catalogContext}

Room dimensions: ${dimensions.length}m (length) × ${dimensions.width}m (width) × ${dimensions.height}m (height)
Room type: ${dimensions.roomType}
${preferences?.style ? `User style preferences: ${preferences.style.join(', ')}` : ''}
${preferences?.colors ? `User color preferences: ${preferences.colors.join(', ')}` : ''}

STEP 1 — Analyze the room photo(s) carefully and precisely:
- Identify every distinct dominant and accent color visible in the room (walls, floor, existing furniture, textiles), not just a generic guess. List them from most to least prominent.
- Identify the overall style (e.g. Modern Minimalist, Scandinavian, Industrial, Traditional, Bohemian).
- Identify every piece of existing furniture already in the room.
- Estimate free floor space in square meters, and briefly describe where that space is located (e.g. "open area along the north wall").

STEP 2 — For every catalog item you consider recommending, evaluate it against the room on FOUR specific criteria, and score each from 0 to 1:
1. sizeFit: does it fit the free space and room dimensions with realistic clearance? Use each item's listed clearance requirements (front/back/sides) plus a minimum 0.75m-0.9m walkway for main traffic paths and at least 0.45m clearance around any piece someone needs to walk past. Penalize items that would block a walkway or a door/window swing implied by the photo.
2. colorMaterialHarmony: does the item's color and material genuinely complement the room's actual detected colors and existing furniture's tones? Explicitly compare the item's listed color/material against what you identified in Step 1, do not just restate that colors exist, state whether they clash or harmonize and why.
3. styleCompatibility: does the item's style tag match or tastefully complement the detected room style and any user style preference?
4. existingFurnitureComplement: does the item avoid redundancy with what's already in the room (e.g. do not recommend a second coffee table if one exists), and does it complement rather than compete with existing pieces?

Compute an overall matchScore as the average of the four criteria above (do not just guess a single number).

Provide a JSON response with this exact structure:
{
  "roomAnalysis": {
    "detectedStyle": "style name",
    "dominantColors": ["color1", "color2", "color3"],
    "existingFurniture": ["item1", "item2"],
    "freeSpace": {
      "estimated": number in square meters,
      "description": "text description including where the free space is located"
    }
  },
  "recommendations": [
    {
      "itemId": "exact id from catalog (the id: field, not the name)",
      "reasoning": "why this item fits, referencing specific colors/materials/style/existing furniture from your Step 1 analysis",
      "matchBreakdown": {
        "sizeFit": number 0-1,
        "colorMaterialHarmony": number 0-1,
        "styleCompatibility": number 0-1,
        "existingFurnitureComplement": number 0-1
      },
      "matchScore": number 0-1 (average of the four scores above),
      "placement": {
        "wall": "north|south|east|west|center",
        "x": number in meters from west wall,
        "y": number in meters from south wall,
        "rotation": number in degrees (0-360),
        "reasoning": "detailed placement explanation including the clearance you left and why"
      }
    }
  ]
}

Important:
- Recommend 3-5 items from the catalog, using the item's id field exactly as listed
- Calculate x, y coordinates based on room dimensions (${dimensions.length}m × ${dimensions.width}m) and keep furniture fully within room bounds
- Do not recommend an item whose sizeFit score would be below 0.4 due to unrealistic clearance or overlap with existing furniture
- Every reasoning field must reference concrete details (actual colors, materials, or existing items) you observed, not generic statements`;

    // Call OpenAI Vision API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_VISION_MODEL || 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Analyze these room photos and provide furniture recommendations with detailed placement coordinates.' },
              ...photoBase64.map(base64 => ({
                type: 'image_url',
                image_url: { 
                  url: `data:image/jpeg;base64,${base64}`,
                  detail: 'high'
                }
              }))
            ]
          }
        ],
        max_tokens: 3000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = JSON.parse(data.choices[0]?.message?.content || '{}');

    // Match AI recommendations to catalog items
    const recommendations: Recommendation[] = [];
    const effectiveCatalogItems = catalogItems ?? [];
    
    if (aiResponse.recommendations && Array.isArray(aiResponse.recommendations)) {
      for (const aiRec of aiResponse.recommendations) {
        // Prefer matching by id (reliable, exact). Only fall back to fuzzy name
        // matching if the model didn't return an id or it didn't match anything,
        // since substring matching on names can misfire between similar products.
        let catalogItem = aiRec.itemId
          ? effectiveCatalogItems.find(item => item.id === aiRec.itemId)
          : undefined;

        if (!catalogItem && aiRec.itemName) {
          catalogItem = effectiveCatalogItems.find(item =>
            item.name.toLowerCase() === aiRec.itemName?.toLowerCase() ||
            item.name.toLowerCase().includes(aiRec.itemName?.toLowerCase() || '') ||
            aiRec.itemName?.toLowerCase().includes(item.name.toLowerCase())
          );
        }

        if (catalogItem) {
          const placement = aiRec.placement || {};
          const x = Math.max(0, Math.min(placement.x || 0, dimensions.width - catalogItem.dimensions.width));
          const y = Math.max(0, Math.min(placement.y || 0, dimensions.length - catalogItem.dimensions.length));
          
          // Calculate distance from walls
          const distanceFromWalls = {
            north: dimensions.length - y - catalogItem.dimensions.length,
            south: y,
            east: dimensions.width - x - catalogItem.dimensions.width,
            west: x,
          };

          const breakdown = aiRec.matchBreakdown;
          const clamp01 = (n: unknown) => (typeof n === 'number' ? Math.min(1, Math.max(0, n)) : undefined);

          recommendations.push({
            item: catalogItem,
            placement: {
              wall: placement.wall === 'center' ? undefined : placement.wall,
              position: placement.wall === 'center' ? 'Centered' : placement.wall ? `Against ${placement.wall} wall` : undefined,
              coordinates: { x, y },
              distanceFromWalls,
              rotation: placement.rotation || 0,
              reasoning: placement.reasoning || aiRec.reasoning || 'Recommended based on room analysis.',
            },
            reasoning: aiRec.reasoning || `This ${catalogItem.name.toLowerCase()} fits well in your room.`,
            matchScore: Math.min(1, Math.max(0, aiRec.matchScore || 0.8)),
            matchBreakdown: breakdown
              ? {
                  sizeFit: clamp01(breakdown.sizeFit),
                  colorMaterialHarmony: clamp01(breakdown.colorMaterialHarmony),
                  styleCompatibility: clamp01(breakdown.styleCompatibility),
                  existingFurnitureComplement: clamp01(breakdown.existingFurnitureComplement),
                }
              : undefined,
          });
        }
      }
    }

    // If no recommendations matched, fall back to mock
    if (recommendations.length === 0) {
      console.warn('No catalog items matched AI recommendations, using fallback');
      return analyzeRoomWithMockAI(photos, dimensions, preferences, catalogItems);
    }

    return {
      recommendations,
      roomAnalysis: aiResponse.roomAnalysis || {
        detectedStyle: 'Modern',
        dominantColors: ['Beige', 'White'],
        existingFurniture: [],
        freeSpace: {
          estimated: dimensions.length * dimensions.width * 0.6,
          description: `${(dimensions.length * dimensions.width * 0.6).toFixed(1)} m² available`,
        },
      },
    };
  } catch (error) {
    console.error('Error in AI analysis:', error);
    // Fallback to mock analysis on error
    return analyzeRoomWithMockAI(photos, dimensions, preferences, catalogItems);
  }
}

async function handlePOST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const photos = formData.getAll('photos') as File[];
    const dimensions = JSON.parse(formData.get('dimensions') as string) as RoomDimensions;
    const storeId = String(formData.get('storeId') || request.nextUrl.searchParams.get('storeId') || '');
    const widgetId = String(formData.get('widgetId') || request.nextUrl.searchParams.get('widgetId') || '');
    const apiKey = String(formData.get('apiKey') || request.nextUrl.searchParams.get('apiKey') || '');
    const storeDomain = String(
      formData.get('storeDomain') ||
      request.nextUrl.searchParams.get('storeDomain') ||
      request.nextUrl.searchParams.get('domain') ||
      ''
    );
    const preferences = formData.get('preferences')
      ? JSON.parse(formData.get('preferences') as string) as RoomPreferences
      : undefined;

    if (!photos || photos.length === 0) {
      return NextResponse.json(
        { error: 'No photos provided' },
        { status: 400 }
      );
    }

    if (!dimensions || !dimensions.length || !dimensions.width) {
      return NextResponse.json(
        { error: 'Invalid room dimensions' },
        { status: 400 }
      );
    }

    // Validate photo formats and sizes
    for (const photo of photos) {
      if (!photo.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'Invalid file type. Only images are allowed.' },
          { status: 400 }
        );
      }
      // Check file size (max 10MB per image)
      if (photo.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: `Image ${photo.name} is too large. Maximum size is 10MB.` },
          { status: 400 }
        );
      }
    }

    const usageStore = await findStoreForUsage({
      storeId: storeId || undefined,
      apiKey: apiKey || undefined,
      domain: storeDomain || undefined,
    });

    if (usageStore) {
      const usageCheck = checkRoomPlannerLimit(usageStore);
      if (!usageCheck.allowed) {
        return NextResponse.json(
          usageCheck.trialExpired
            ? {
                error: 'trial_expired',
                message: "This store's ModlyAI trial has ended. Please upgrade to continue using the AI widget.",
              }
            : {
                error: 'usage_limit_reached',
                message: 'You have reached your plan limit. Upgrade to continue.',
              },
          { status: 402 }
        );
      }
    }

    // Fetch catalog items
    const catalogItems = await getCatalogItems(
      storeId || undefined,
      widgetId || undefined,
      apiKey || undefined,
      storeDomain || undefined
    );

    // Analyze room with AI
    const result = await analyzeRoomWithAI(photos, dimensions, preferences, catalogItems);

    if (usageStore) {
      await incrementUsage(usageStore.id, 'roomPlanner', usageStore.roomPlannerAnalysesUsed);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error analyzing room:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze room';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return withPublicWidgetCors(await handlePOST(request));
}

export async function OPTIONS() {
  return publicWidgetOptionsResponse();
}
