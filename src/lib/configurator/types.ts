/**
 * Core types for the Hybrid Configurator system
 */

export type ApprovalStatus = 'designer-approved' | 'factory-approved' | 'both' | 'none';

export interface Option {
  id: string;
  label: string;
  value: string;
  description?: string;
  imageUrl?: string;
  approvalStatus?: ApprovalStatus;
  metadata?: Record<string, any>;
}

export interface OptionGroup {
  id: string;
  label: string;
  description?: string;
  type: 'select' | 'radio' | 'checkbox' | 'number' | 'text';
  required: boolean;
  options: Option[];
  defaultOptionId?: string;
}

export interface PreviewAsset {
  type: 'image' | 'glb';
  url: string;
  thumbnailUrl?: string;
  materialSlots?: string[]; // For GLB: predefined material slot names
  metadata?: Record<string, any>;
}

export interface ImageVariant {
  key: string; // e.g., 'material:oak,color:beige'
  imageUrl: string;
  label?: string;
}

export interface ProductFeatureFlags {
  enable3DViewer: boolean;
  hasGLBAsset: boolean;
  tenantId?: string;
}

export interface ProductConfig {
  id: string;
  sku: string;
  name: string;
  description?: string;
  category?: string;
  brand?: string;
  
  // Dimensions (base)
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit?: 'cm' | 'm' | 'in';
  };
  
  // Configurable options
  optionGroups: OptionGroup[];
  
  // Preview assets
  previewAssets: PreviewAsset[];
  imageVariants?: ImageVariant[]; // Mapping for image-based preview
  defaultImageUrl?: string; // Fallback image
  
  // Feature flags
  featureFlags?: ProductFeatureFlags;
  
  // Metadata
  metadata?: Record<string, any>;
}

export interface ProductSelection {
  productId: string;
  selections: Record<string, string | string[] | number>; // optionGroupId -> optionId(s) or value
  timestamp: string; // ISO timestamp
  quoteId?: string; // Optional quote/request ID
  notes?: string;
}

export interface SpecSheetData {
  productId: string;
  productName: string;
  sku: string;
  timestamp: string;
  quoteId?: string;
  selections: Record<string, {
    groupLabel: string;
    selectedLabel: string;
    selectedValue: string;
  }>;
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  notes?: string;
  metadata?: Record<string, any>;
}
