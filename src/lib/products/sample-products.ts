/**
 * Sample product data for demo
 * In production, this would be loaded from an API or database
 */

import { ProductConfig } from '@/lib/configurator/types';
import { Rule } from '@/lib/configurator/rules/types';

/**
 * Sample Product 1: Image-only sofa (MVP path)
 */
export const sampleSofaProduct: ProductConfig = {
  id: 'sofa-premium-001',
  sku: 'SOFA-PREM-001',
  name: 'Premium Modular Sofa',
  description: 'A luxurious modular sofa with customizable materials and sizes',
  category: 'Sofas',
  brand: 'ModlyFurniture',
  
  dimensions: {
    length: 220,
    width: 90,
    height: 85,
    unit: 'cm',
  },
  
  optionGroups: [
    {
      id: 'line',
      label: 'Product Line',
      description: 'Choose your product line',
      type: 'radio',
      required: true,
      defaultOptionId: 'standard',
      options: [
        {
          id: 'standard',
          label: 'Standard',
          value: 'standard',
          description: 'Standard line with basic materials',
          approvalStatus: 'factory-approved',
        },
        {
          id: 'premium',
          label: 'Premium',
          value: 'premium',
          description: 'Premium line with high-end materials',
          approvalStatus: 'designer-approved',
        },
      ],
    },
    {
      id: 'material',
      label: 'Material',
      description: 'Select primary material',
      type: 'radio',
      required: true,
      options: [
        {
          id: 'fabric-beige',
          label: 'Beige Fabric',
          value: 'fabric-beige',
          approvalStatus: 'both',
        },
        {
          id: 'fabric-navy',
          label: 'Navy Fabric',
          value: 'fabric-navy',
          approvalStatus: 'both',
        },
        {
          id: 'oak',
          label: 'Oak Wood',
          value: 'oak',
          approvalStatus: 'designer-approved',
        },
        {
          id: 'walnut',
          label: 'Walnut Wood',
          value: 'walnut',
          approvalStatus: 'designer-approved',
        },
        {
          id: 'leather-black',
          label: 'Black Leather',
          value: 'leather-black',
          approvalStatus: 'both',
        },
      ],
    },
    {
      id: 'size',
      label: 'Size',
      description: 'Select sofa size',
      type: 'radio',
      required: true,
      defaultOptionId: '180cm',
      options: [
        {
          id: '180cm',
          label: '180cm (2-seater)',
          value: '180cm',
        },
        {
          id: '220cm',
          label: '220cm (3-seater)',
          value: '220cm',
        },
        {
          id: '280cm',
          label: '280cm (4-seater)',
          value: '280cm',
        },
      ],
    },
    {
      id: 'legs',
      label: 'Leg Style',
      description: 'Choose leg style',
      type: 'select',
      required: false,
      options: [
        {
          id: 'legs-none',
          label: 'No legs (floor contact)',
          value: 'none',
        },
        {
          id: 'legs-type-a',
          label: 'Type A - Minimalist',
          value: 'type-a',
        },
        {
          id: 'legs-type-b',
          label: 'Type B - Classic',
          value: 'type-b',
        },
        {
          id: 'legs-type-c',
          label: 'Type C - Modern',
          value: 'type-c',
        },
      ],
    },
    {
      id: 'addons',
      label: 'Add-ons',
      description: 'Select additional features',
      type: 'checkbox',
      required: false,
      options: [
        {
          id: 'addon-cushions',
          label: 'Extra Cushions',
          value: 'cushions',
        },
        {
          id: 'addon-armrest',
          label: 'Adjustable Armrests',
          value: 'armrest',
        },
        {
          id: 'addon-storage',
          label: 'Under-seat Storage',
          value: 'storage',
        },
      ],
    },
  ],
  
  previewAssets: [
    {
      type: 'image',
      url: '/images/sofa-default.jpg',
      thumbnailUrl: '/images/sofa-default-thumb.jpg',
    },
  ],
  
  imageVariants: [
    {
      key: 'line:premium,material:oak',
      imageUrl: '/images/sofa-premium-oak.jpg',
      label: 'Premium Oak',
    },
    {
      key: 'line:premium,material:walnut',
      imageUrl: '/images/sofa-premium-walnut.jpg',
      label: 'Premium Walnut',
    },
    {
      key: 'line:standard,material:fabric-beige',
      imageUrl: '/images/sofa-standard-beige.jpg',
      label: 'Standard Beige',
    },
    {
      key: 'line:standard,material:fabric-navy',
      imageUrl: '/images/sofa-standard-navy.jpg',
      label: 'Standard Navy',
    },
  ],
  
  defaultImageUrl: '/images/sofa-default.jpg',
  
  featureFlags: {
    enable3DViewer: false,
    hasGLBAsset: false,
  },
};

/**
 * Sample Product 2: 3D-enabled chair (with GLB)
 */
export const sampleChairProduct: ProductConfig = {
  id: 'chair-modern-001',
  sku: 'CHAIR-MOD-001',
  name: 'Modern Ergonomic Chair',
  description: 'A modern ergonomic chair with 3D visualization',
  category: 'Chairs',
  brand: 'ModlyFurniture',
  
  dimensions: {
    length: 60,
    width: 60,
    height: 120,
    unit: 'cm',
  },
  
  optionGroups: [
    {
      id: 'material',
      label: 'Material',
      description: 'Select chair material',
      type: 'radio',
      required: true,
      defaultOptionId: 'fabric-gray',
      options: [
        {
          id: 'fabric-gray',
          label: 'Gray Fabric',
          value: 'fabric-gray',
        },
        {
          id: 'leather-brown',
          label: 'Brown Leather',
          value: 'leather-brown',
        },
        {
          id: 'mesh-black',
          label: 'Black Mesh',
          value: 'mesh-black',
        },
      ],
    },
    {
      id: 'base',
      label: 'Base Color',
      description: 'Select base color',
      type: 'radio',
      required: true,
      defaultOptionId: 'base-silver',
      options: [
        {
          id: 'base-silver',
          label: 'Silver',
          value: 'silver',
        },
        {
          id: 'base-black',
          label: 'Black',
          value: 'black',
        },
      ],
    },
  ],
  
  previewAssets: [
    {
      type: 'glb',
      url: '/models/chair.glb',
      thumbnailUrl: '/images/chair-thumb.jpg',
      materialSlots: ['seat_material', 'back_material', 'base_color'],
    },
    {
      type: 'image',
      url: '/images/chair-default.jpg',
      thumbnailUrl: '/images/chair-thumb.jpg',
    },
  ],
  
  defaultImageUrl: '/images/chair-default.jpg',
  
  featureFlags: {
    enable3DViewer: true,
    hasGLBAsset: true,
  },
};

/**
 * Rules for sample products
 */
export const sampleRules: Rule[] = [
  // Rule 1: Oak only for Premium line
  {
    type: 'conditional',
    id: 'rule-1',
    name: 'Oak only for Premium',
    description: 'Oak material is only available for Premium line',
    condition: {
      optionGroupId: 'line',
      operator: 'equals',
      value: 'premium',
    },
    then: {
      optionGroupId: 'material',
      action: 'allow',
      values: ['oak', 'walnut', 'leather-black'],
    },
    else: {
      optionGroupId: 'material',
      action: 'allow',
      values: ['fabric-beige', 'fabric-navy'],
    },
  } as Rule,
  
  // Rule 2: Size 180cm only with legs type B
  {
    type: 'requirement',
    id: 'rule-2',
    name: 'Size 180cm requires legs type B',
    description: 'Size 180cm can only be used with legs type B',
    condition: {
      optionGroupId: 'size',
      operator: 'equals',
      value: '180cm',
    },
    requires: {
      optionGroupId: 'legs',
      operator: 'equals',
      value: 'legs-type-b',
    },
    message: 'Size 180cm requires legs type B to be selected',
  } as Rule,
  
  // Rule 3: Exclusion - certain material/leg combinations
  {
    type: 'exclusion',
    id: 'rule-3',
    name: 'Material and leg exclusion',
    description: 'Certain materials cannot be combined with certain leg types',
    optionGroupIds: ['material', 'legs'],
    values: {
      material: ['oak', 'walnut'],
      legs: ['legs-none'],
    },
    message: 'Wood materials cannot be used with floor contact (no legs)',
  } as Rule,
];

/**
 * Get product by ID
 */
export function getProductById(productId: string): ProductConfig | null {
  if (productId === 'sofa-premium-001') {
    return sampleSofaProduct;
  }
  if (productId === 'chair-modern-001') {
    return sampleChairProduct;
  }
  return null;
}

/**
 * Get all sample products
 */
export function getAllSampleProducts(): ProductConfig[] {
  return [sampleSofaProduct, sampleChairProduct];
}
