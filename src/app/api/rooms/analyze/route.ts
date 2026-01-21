import { NextRequest, NextResponse } from 'next/server';
import { RoomAnalysisResponse, Recommendation, FurnitureItem, RoomDimensions, RoomPreferences } from '@/types';

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

  // Use catalog items if available, otherwise use mock furniture
  const effectiveCatalogItems = catalogItems ?? [];
  const availableItems = effectiveCatalogItems.length > 0 
    ? effectiveCatalogItems.filter((item: FurnitureItem) => 
        item.dimensions.length <= dimensions.length * 0.8 &&
        item.dimensions.width <= dimensions.width * 0.8
      ).slice(0, 5)
    : [];

  if (availableItems.length === 0) {
    // Fallback to mock items if no catalog items match
    const mockFurniture: FurnitureItem[] = [
      {
        id: '1',
        name: 'Scandinavian Sofa',
        category: 'Seating',
        subCategory: 'Sofa',
        dimensions: {
          length: Math.min(2.2, dimensions.length * 0.7),
          width: 0.9,
          height: 0.85,
          seatHeight: 0.4,
          clearance: { front: 0.9, back: 0.1, sides: 0.2 },
        },
        materials: {
          primary: 'Solid Oak',
          secondary: 'Cotton Blend',
          upholstery: 'Linen',
          legs: 'Oak Wood',
        },
        colors: {
          main: 'Beige',
          accent: 'Forest Green',
        },
        styleTags: ['Scandinavian', 'Modern', 'Minimalist'],
        images: [],
        priceRange: { min: 1200, max: 1800 },
      },
      {
        id: '2',
        name: 'Modern Coffee Table',
        category: 'Tables',
        subCategory: 'Coffee Table',
        dimensions: {
          length: Math.min(1.4, dimensions.length * 0.4),
          width: 0.7,
          height: 0.45,
          clearance: { front: 0.5 },
        },
        materials: {
          primary: 'Walnut Wood',
          legs: 'Metal',
        },
        colors: {
          main: 'Walnut Brown',
        },
        styleTags: ['Modern', 'Minimalist'],
        images: [],
        priceRange: { min: 450, max: 650 },
      },
    ];
    availableItems.push(...mockFurniture);
  }

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

    // Build catalog context for AI prompt
    const catalogContext = (catalogItems ?? []).map((item: FurnitureItem) => 
      `- ${item.name} (${item.category}${item.subCategory ? `/${item.subCategory}` : ''}): ${item.styleTags.join(', ')} style, ${item.colors.main} color, ${item.dimensions.length}m × ${item.dimensions.width}m × ${item.dimensions.height}m, $${item.priceRange?.min || 0}-${item.priceRange?.max || 0}`
    ).join('\n');

    const systemPrompt = `You are an expert interior design AI. Analyze room photos and recommend furniture with detailed placement.

Available furniture catalog:
${catalogContext}

Room dimensions: ${dimensions.length}m (length) × ${dimensions.width}m (width) × ${dimensions.height}m (height)
Room type: ${dimensions.roomType}
${preferences?.style ? `User style preferences: ${preferences.style.join(', ')}` : ''}
${preferences?.colors ? `User color preferences: ${preferences.colors.join(', ')}` : ''}

Analyze the photos and provide a JSON response with this exact structure:
{
  "roomAnalysis": {
    "detectedStyle": "style name",
    "dominantColors": ["color1", "color2", "color3"],
    "existingFurniture": ["item1", "item2"],
    "freeSpace": {
      "estimated": number in square meters,
      "description": "text description"
    }
  },
  "recommendations": [
    {
      "itemName": "exact name from catalog",
      "reasoning": "why this item fits",
      "placement": {
        "wall": "north|south|east|west|center",
        "x": number in meters from west wall,
        "y": number in meters from south wall,
        "rotation": number in degrees (0-360),
        "reasoning": "detailed placement explanation"
      },
      "matchScore": number between 0 and 1
    }
  ]
}

Important:
- Recommend 3-5 items from the catalog
- Use exact item names from the catalog
- Calculate x, y coordinates based on room dimensions (${dimensions.length}m × ${dimensions.width}m)
- Ensure coordinates keep furniture within room bounds
- Consider traffic flow and aesthetics
- Provide detailed reasoning for each recommendation`;

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
        // Find matching catalog item by name
        const catalogItem = effectiveCatalogItems.find(item => 
          item.name.toLowerCase() === aiRec.itemName?.toLowerCase() ||
          item.name.toLowerCase().includes(aiRec.itemName?.toLowerCase() || '') ||
          aiRec.itemName?.toLowerCase().includes(item.name.toLowerCase())
        );

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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const photos = formData.getAll('photos') as File[];
    const dimensions = JSON.parse(formData.get('dimensions') as string) as RoomDimensions;
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

    // Fetch catalog items
    const catalogItems = await getCatalogItems();

    // Analyze room with AI
    const result = await analyzeRoomWithAI(photos, dimensions, preferences, catalogItems);

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
