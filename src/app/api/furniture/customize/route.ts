import { NextRequest, NextResponse } from 'next/server';
import { CustomizationConfig } from '@/types';

// Generate material preview image using DALL-E 3
async function generateMaterialPreviewWithDALLE(
  config: CustomizationConfig,
  baseItemName: string
): Promise<string | null> {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const imageModel = process.env.OPENAI_IMAGE_MODEL || 'dall-e-3';
  
  if (!openaiApiKey) {
    console.warn('OPENAI_API_KEY not configured, skipping DALL-E image generation');
    return null;
  }

  try {
    // Build prompt for material visualization
    const materialDescription = [
      config.materialOverrides.primary && `Primary material: ${config.materialOverrides.primary}`,
      config.materialOverrides.legs && `Legs: ${config.materialOverrides.legs}`,
      config.materialOverrides.upholstery && `Upholstery: ${config.materialOverrides.upholstery}`,
    ].filter(Boolean).join(', ');

    const colorDescription = [
      config.colorScheme.primary && `Primary color: ${config.colorScheme.primary}`,
      config.colorScheme.secondary && `Secondary color: ${config.colorScheme.secondary}`,
      config.colorScheme.accent && `Accent color: ${config.colorScheme.accent}`,
    ].filter(Boolean).join(', ');

    const prompt = `A high-quality product photo of a ${baseItemName} furniture piece with ${materialDescription}. Color scheme: ${colorDescription}. Professional lighting, white background, product photography style.`;

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: imageModel,
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('DALL-E API error:', errorData);
      return null;
    }

    const data = await response.json();
    return data.data?.[0]?.url || null;
  } catch (error) {
    console.error('Error generating material preview with DALL-E:', error);
    return null;
  }
}

// Mock AI customization - In production, this would call actual AI services
async function customizeFurnitureWithAI(
  config: CustomizationConfig
): Promise<any> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock base dimensions (would come from base item in real implementation)
  const baseDimensions = {
    length: 2.2,
    width: 0.9,
    height: 0.85,
  };

  const adjustedDimensions = {
    length: baseDimensions.length + (config.dimensionAdjustments?.length || 0),
    width: baseDimensions.width + (config.dimensionAdjustments?.width || 0),
    height: baseDimensions.height + (config.dimensionAdjustments?.height || 0),
  };

  const dimensionChanges = {
    length: config.dimensionAdjustments?.length || 0,
    width: config.dimensionAdjustments?.width || 0,
    height: config.dimensionAdjustments?.height || 0,
  };

  // Build materials object
  const materials: any = {
    primary: config.materialOverrides.primary || 'Solid Oak',
    legs: config.materialOverrides.legs || 'Oak Wood',
  };
  if (config.materialOverrides.upholstery) {
    materials.upholstery = config.materialOverrides.upholstery;
  }

  // Generate AI notes
  const aiNotes = `Customized ${config.baseItemType || 'furniture'} with ${config.colorScheme.primary} primary color${
    config.colorScheme.secondary ? `, ${config.colorScheme.secondary} accents` : ''
  }${config.colorScheme.accent ? `, and ${config.colorScheme.accent} highlights` : ''}. ` +
    `Materials updated to ${materials.primary}${materials.legs ? ` with ${materials.legs} legs` : ''}. ` +
    (config.ornamentDetails && config.ornamentDetails.length > 0
      ? `Added details: ${config.ornamentDetails.join(', ')}. `
      : '') +
    (dimensionChanges.length !== 0 || dimensionChanges.width !== 0 || dimensionChanges.height !== 0
      ? `Dimensions adjusted: ${dimensionChanges.length !== 0 ? `length ${dimensionChanges.length > 0 ? '+' : ''}${dimensionChanges.length}m` : ''}${dimensionChanges.width !== 0 ? `, width ${dimensionChanges.width > 0 ? '+' : ''}${dimensionChanges.width}m` : ''}${dimensionChanges.height !== 0 ? `, height ${dimensionChanges.height > 0 ? '+' : ''}${dimensionChanges.height}m` : ''}.`
      : '');

  // Try to generate material preview with DALL-E 3 (if configured)
  let previewImageUrl: string | null = null;
  const useDALLE = process.env.OPENAI_IMAGE_MODEL && process.env.OPENAI_API_KEY;
  
  if (useDALLE) {
    previewImageUrl = await generateMaterialPreviewWithDALLE(
      config,
      config.baseItemType || 'furniture'
    );
  }

  return {
    name: `Custom ${config.baseItemType || 'Furniture'}`,
    dimensions: adjustedDimensions,
    dimensionChanges,
    colorScheme: config.colorScheme,
    materials,
    ornamentDetails: config.ornamentDetails || [],
    aiNotes,
    previewImageUrl, // DALL-E generated preview (if available)
  };
}

export async function POST(request: NextRequest) {
  try {
    const config: CustomizationConfig = await request.json();

    if (!config.baseItemId && !config.baseItemType) {
      return NextResponse.json(
        { error: 'Base item ID or type required' },
        { status: 400 }
      );
    }

    const result = await customizeFurnitureWithAI(config);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error customizing furniture:', error);
    return NextResponse.json(
      { error: 'Failed to customize furniture' },
      { status: 500 }
    );
  }
}
