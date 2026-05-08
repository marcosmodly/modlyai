import { FurnitureItem } from '../types';

export interface ProductColor {
  name: string;
  hex: string;
  available: boolean;
}

export interface ProductMaterialOption {
  id: string;
  name: string;
  priceDelta: number;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  source?: string;
  productUrl?: string;
  externalId?: string;
  shopifyProductId?: string;
  storeId?: string;
  status?: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'm' | 'inches' | 'ft';
  };
  materials: string[];
  colors: ProductColor[];
  images: {
    front: string;
    side: string;
    angle: string;
    thumbnail: string;
  };
  tags: string[];
  customizer: {
    type: string;
    thumbnailLabel: string;
    defaultWidthIn: number;
    defaultDepthIn: number;
    widthRangeIn: [number, number];
    depthRangeIn: [number, number];
    materialOptions: ProductMaterialOption[];
  };
}

const FALLBACK_COLOR_HEX = ['#9CA3AF', '#1F2937', '#D4B896', '#D4C5B9', '#6B7280', '#C2410C'];

const COLOR_HEX_BY_NAME: Record<string, string> = {
  beige: '#F5F0E8',
  gray: '#9CA3AF',
  grey: '#9CA3AF',
  charcoal: '#374151',
  white: '#FFFFFF',
  black: '#111827',
  brown: '#92400E',
  navy_blue: '#1E3A5F',
  navy: '#1E3A5F',
  forest_green: '#166534',
  sage: '#84A98C',
  sage_green: '#84A98C',
  emerald: '#065F46',
  midnight_blue: '#1E3A8A',
  burgundy: '#7F1D1D',
  cream: '#FEFCE8',
  gold: '#D97706',
  walnut: '#7C3D12',
  oak: '#A16207',
  natural: '#D4B896',
  caramel: '#B45309',
  cognac: '#9A3412',
  rustic_brown: '#78350F',
  dark_walnut: '#431407',
  gray_wash: '#D1D5DB',
  smoked: '#6B7280',
  dusty_rose: '#FDA4AF',
  blush_pink: '#FBCFE8',
  clear: '#E0F2FE',
  white_oak: '#FEF9C3',
  pebble: '#C4B8AE',
  slate: '#475569',
  sand: '#D4C5B9',
  oat: '#D8CCB8',
  mist: '#CBD5E1',
  warm_oak: '#A16207',
  warmoak: '#A16207',
  blue: '#3B82F6',
  green: '#10B981',
  terracotta: '#C2410C',
  graphite: '#4B5563',
  chrome: '#9CA3AF',
  brass: '#B45309',
};

export const getColorHex = (colorName: string): string => {
  const normalized = colorName.toLowerCase().replace(/\s+/g, '_');
  return COLOR_HEX_BY_NAME[normalized] ?? '#E5E7EB';
};

export const getMaterialDescription = (material: string): string => {
  const descriptions: Record<string, string> = {
    Fabric: 'Soft and breathable, easy to maintain',
    Velvet: 'Luxurious feel, rich appearance',
    Leather: 'Durable and easy to clean, ages beautifully',
    Linen: 'Natural fiber, cool and textured',
    Bouclé: 'Cozy looped texture, on-trend',
    Boucle: 'Cozy looped texture, on-trend',
    Marble: 'Premium natural stone, unique patterns',
    'Tempered Glass': 'Modern and sleek, easy to clean',
    'Solid Wood': 'Long lasting, natural grain beauty',
    MDF: 'Smooth finish, affordable and sturdy',
    Metal: 'Industrial look, very durable',
    Rattan: 'Natural and lightweight, boho aesthetic',
    Wicker: 'Woven natural material, casual style',
    'Reclaimed Wood': 'Eco-friendly, unique character',
    Microfiber: 'Stain resistant, soft to touch',
    'Performance Fabric': 'Kid and pet friendly, highly durable',
    'Full Grain Leather': 'Top quality leather, develops patina',
    'PU Leather': 'Vegan leather, easy to wipe clean',
    Acrylic: 'Clear modern material, lightweight',
    Bamboo: 'Sustainable, strong natural material',
    'Engineered Wood': 'Consistent quality, moisture resistant',
    Upholstered: 'Padded and fabric wrapped, comfortable',
  };

  return descriptions[material] || 'Premium quality material';
};

const productMaterialOptions = (materials: string[]): ProductMaterialOption[] => {
  const uniqueMaterials = Array.from(new Set(materials.filter(Boolean)));

  if (uniqueMaterials.length === 0) {
    return [
      {
        id: 'standard_material',
        name: 'Standard Material',
        priceDelta: 0,
        description: 'Factory-standard finish for this product.',
      },
    ];
  }

  return uniqueMaterials.map((material, index) => ({
    id: material
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, ''),
    name: material,
    priceDelta: index === 0 ? 0 : index * 75,
    description: getMaterialDescription(material),
  }));
};

const resolveColorHex = (colorName: string, index: number): string => {
  const hex = getColorHex(colorName);
  return hex === '#E5E7EB' ? FALLBACK_COLOR_HEX[index % FALLBACK_COLOR_HEX.length]! : hex;
};

const metersToInches = (value: number): number => Number((value / 0.0254).toFixed(1));

const inchesToMeters = (value: number): number => Number((value * 0.0254).toFixed(3));

const clampRange = (base: number, delta: number, minimum: number): [number, number] => {
  const min = Math.max(minimum, Math.round(base - delta));
  const max = Math.max(min + 1, Math.round(base + delta));
  return [min, max];
};

const twentyPercentRange = (base: number, minimum: number): [number, number] => {
  const min = Math.max(minimum, Math.round(base * 0.8));
  const max = Math.max(min + 1, Math.round(base * 1.2));
  return [min, max];
};

const normalizeProductType = (category: string): string => {
  const value = category.toLowerCase();

  if (value.endsWith('ies')) {
    return `${value.slice(0, -3)}y`;
  }
  if (value.endsWith('s')) {
    return value.slice(0, -1);
  }
  return value;
};

export const products: Product[] = [
  {
    id: 'demo-sofa-002',
    name: 'Modular Corner Sofa',
    category: 'Sofas',
    basePrice: 1099,
    dimensions: {
      length: 1.55,
      width: 2.4,
      height: 0.84,
      unit: 'm',
    },
    materials: ['Polyester', 'Engineered wood'],
    colors: [
      { name: 'Pebble', hex: '#C4B8AE', available: true },
      { name: 'Slate', hex: '#475569', available: true },
    ],
    images: {
      front: '/products/modular-corner-sofa-front.jpg',
      side: '/products/modular-corner-sofa-side.jpg',
      angle: '/products/modular-corner-sofa-angle.jpg',
      thumbnail: '/products/modular-corner-sofa-thumb.jpg',
    },
    tags: ['Sectional', 'Family', 'Modern'],
    customizer: {
      type: 'sofa',
      thumbnailLabel: 'Sectional',
      defaultWidthIn: 94.5,
      defaultDepthIn: 61,
      widthRangeIn: [84, 108],
      depthRangeIn: [54, 72],
      materialOptions: productMaterialOptions(['Polyester', 'Engineered wood']),
    },
  },
  {
    id: 'demo-chair-003',
    name: 'Woven Accent Lounge Chair',
    category: 'Chairs',
    basePrice: 199,
    dimensions: {
      length: 0.76,
      width: 0.72,
      height: 0.78,
      unit: 'm',
    },
    materials: ['Rattan', 'Steel'],
    colors: [
      { name: 'Natural', hex: '#D4B896', available: true },
      { name: 'Black', hex: '#1A1A1A', available: true },
    ],
    images: {
      front: '/products/woven-chair-front.jpg',
      side: '/products/woven-chair-side.jpg',
      angle: '/products/woven-chair-angle.jpg',
      thumbnail: '/products/woven-chair-thumb.jpg',
    },
    tags: ['Lounge', 'Boho', 'Lightweight'],
    customizer: {
      type: 'chair',
      thumbnailLabel: 'Lounge Chair',
      defaultWidthIn: 28.3,
      defaultDepthIn: 29.9,
      widthRangeIn: [24, 36],
      depthRangeIn: [24, 38],
      materialOptions: productMaterialOptions(['Rattan', 'Steel']),
    },
  },
  {
    id: 'demo-table-003',
    name: 'Low Profile Coffee Table',
    category: 'Tables',
    basePrice: 219,
    dimensions: {
      length: 0.6,
      width: 1.2,
      height: 0.42,
      unit: 'm',
    },
    materials: ['Engineered wood'],
    colors: [
      { name: 'Sand', hex: '#D4C5B9', available: true },
      { name: 'Graphite', hex: '#4B5563', available: true },
      { name: 'White', hex: '#F9FAFB', available: true },
    ],
    images: {
      front: '/products/low-profile-coffee-table-front.jpg',
      side: '/products/low-profile-coffee-table-side.jpg',
      angle: '/products/low-profile-coffee-table-angle.jpg',
      thumbnail: '/products/low-profile-coffee-table-thumb.jpg',
    },
    tags: ['Living room', 'Storage', 'Minimal'],
    customizer: {
      type: 'table',
      thumbnailLabel: 'Coffee Table',
      defaultWidthIn: 47.2,
      defaultDepthIn: 23.6,
      widthRangeIn: [40, 56],
      depthRangeIn: [20, 32],
      materialOptions: productMaterialOptions(['Engineered wood']),
    },
  },
  {
    id: 'custom-sofa',
    name: 'Custom Sofa',
    category: 'Sofas',
    basePrice: 899,
    dimensions: {
      length: 0.9,
      width: 2.2,
      height: 0.85,
      unit: 'm',
    },
    materials: ['Premium Fabric', 'Oak Wood Legs', 'Leather'],
    colors: [
      { name: 'Beige', hex: '#D4C5B9', available: true },
      { name: 'Navy', hex: '#1E293B', available: true },
      { name: 'Gray', hex: '#6B7280', available: true },
    ],
    images: {
      front: '/products/custom-sofa-front.jpg',
      side: '/products/custom-sofa-side.jpg',
      angle: '/products/custom-sofa-angle.jpg',
      thumbnail: '/products/custom-sofa-thumb.jpg',
    },
    tags: ['Custom', 'Configurable'],
    customizer: {
      type: 'sofa',
      thumbnailLabel: 'Custom Sofa',
      defaultWidthIn: 86.6,
      defaultDepthIn: 35.4,
      widthRangeIn: [72, 100],
      depthRangeIn: [30, 44],
      materialOptions: productMaterialOptions(['Premium Fabric', 'Leather', 'Oak Wood Legs']),
    },
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
}

export function productToFurnitureItem(product: Product): FurnitureItem {
  const length =
    product.dimensions.unit === 'inches'
      ? inchesToMeters(product.dimensions.length)
      : product.dimensions.length;
  const width =
    product.dimensions.unit === 'inches'
      ? inchesToMeters(product.dimensions.width)
      : product.dimensions.width;
  const height =
    product.dimensions.unit === 'inches'
      ? inchesToMeters(product.dimensions.height)
      : product.dimensions.height;

  return {
    id: product.id,
    name: product.name,
    category: product.category,
    subCategory: product.customizer.thumbnailLabel,
    dimensions: {
      length,
      width,
      height,
      depth: length,
    },
    materials: {
      primary: product.materials[0] ?? 'Custom',
      secondary: product.materials[1],
      upholstery: product.materials[0],
      legs: product.materials[2],
    },
    colors: {
      main: product.colors[0]?.name ?? 'Custom',
      accent: product.colors[1]?.name,
    },
    styleTags: product.tags,
    images: [
      product.images.front,
      product.images.side,
      product.images.angle,
      product.images.thumbnail,
    ].filter(Boolean),
    priceRange: product.basePrice > 0 ? { min: product.basePrice, max: product.basePrice } : undefined,
    price: product.basePrice,
    productUrl: product.productUrl,
    url: product.productUrl,
    source: product.source,
    externalId: product.externalId,
    shopifyProductId: product.shopifyProductId,
    storeId: product.storeId,
    status: product.status,
    stockStatus: product.source === 'shopify' ? 'custom_order' : undefined,
  };
}

export function productFromFurnitureItem(item: FurnitureItem): Product {
  const existing = getProductById(item.id);
  if (existing) {
    return existing;
  }

  const baseMaterials = Array.from(
    new Set(
      [
        item.materials.primary,
        item.materials.secondary,
        item.materials.upholstery,
        item.materials.legs,
      ].filter((value): value is string => Boolean(value))
    )
  );

  const baseColors = Array.from(
    new Set([item.colors.main, item.colors.accent].filter((value): value is string => Boolean(value)))
  );

  const widthIn = Math.max(18, Math.round(metersToInches(item.dimensions.width || 0.9)));
  const depthIn = Math.max(
    18,
    Math.round(metersToInches(item.dimensions.depth || item.dimensions.length || 0.9))
  );

  return {
    id: item.id,
    name: item.name,
    category: item.category,
    basePrice: item.priceRange?.min ?? 0,
    source: item.source,
    productUrl: item.productUrl || item.url,
    externalId: item.externalId,
    shopifyProductId: item.shopifyProductId,
    storeId: item.storeId,
    status: item.status,
    dimensions: {
      length: item.dimensions.length || item.dimensions.depth || 0,
      width: item.dimensions.width || 0,
      height: item.dimensions.height || 0,
      unit: 'm',
    },
    materials: baseMaterials.length > 0 ? baseMaterials : ['Custom'],
    colors:
      baseColors.length > 0
        ? baseColors.map((color, index) => ({
            name: color,
            hex: resolveColorHex(color, index),
            available: true,
          }))
        : [{ name: 'Custom', hex: FALLBACK_COLOR_HEX[0]!, available: true }],
    images: {
      front: item.images[0] ?? '',
      side: item.images[1] ?? item.images[0] ?? '',
      angle: item.images[2] ?? item.images[0] ?? '',
      thumbnail: item.images[0] ?? '',
    },
    tags: item.styleTags ?? [],
    customizer: {
      type: normalizeProductType(item.subCategory || item.category),
      thumbnailLabel: item.subCategory || item.category,
      defaultWidthIn: widthIn,
      defaultDepthIn: depthIn,
      widthRangeIn: twentyPercentRange(widthIn, 18),
      depthRangeIn: twentyPercentRange(depthIn, 18),
      materialOptions: productMaterialOptions(baseMaterials),
    },
  };
}
