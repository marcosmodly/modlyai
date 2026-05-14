import { FurnitureItem } from '../types';

export interface ProductColor {
  name: string;
  hex: string;
  available: boolean;
  price?: number;
}

export interface ProductMaterialOption {
  id: string;
  name: string;
  priceDelta?: number;
  description: string;
}

export type PricedOption = {
  name: string;
  price?: number;
};

export type CustomizationOptionValue = string | PricedOption;

export type DimensionOption = {
  min?: number;
  max?: number;
  default?: number;
  unit?: string;
  pricePerExtraUnit?: number;
};

export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  length?: number;
  width?: number;
  height?: number;
  source?: string;
  productUrl?: string;
  imageUrl?: string;
  image?: string;
  thumbnail?: string;
  externalId?: string;
  shopifyProductId?: string;
  storeId?: string;
  status?: string;
  customizationOptions?: {
    colors?: CustomizationOptionValue[] | string;
    materials?: CustomizationOptionValue[] | string;
    dimensions?: {
      width?: DimensionOption;
      length?: DimensionOption;
      height?: DimensionOption;
    };
    addOns?: Array<{ name: string; price?: number }>;
    shopifyOptions?: Array<{ name: string; values: CustomizationOptionValue[] }>;
    optionLabels?: Array<{ name: string; values: CustomizationOptionValue[] }>;
  };
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
    priceDelta: 0,
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

const normalizeStringList = (value: unknown): string[] => {
  const entries = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(/[|,]/)
      : [];

  return Array.from(
    new Set(
      entries
        .map((entry) => String(entry ?? '').trim())
        .filter(Boolean)
    )
  );
};

export const getOptionName = (value: CustomizationOptionValue): string =>
  typeof value === 'string' ? value : value.name;

export const getOptionPrice = (value: CustomizationOptionValue): number | undefined =>
  typeof value === 'string' ? undefined : value.price;

export const normalizeCustomizationOptionValues = (value: unknown): CustomizationOptionValue[] => {
  if (Array.isArray(value)) {
    const options = value
      .map((entry) => {
        if (typeof entry === 'string') return entry.trim();
        if (!entry || typeof entry !== 'object') return null;
        const option = entry as Record<string, unknown>;
        const name = String(option.name ?? '').trim();
        if (!name) return null;
        const price = typeof option.price === 'number' && Number.isFinite(option.price)
          ? option.price
          : typeof option.price === 'string' && option.price.trim() && Number.isFinite(Number(option.price))
            ? Number(option.price)
            : undefined;
        return price === undefined ? { name } : { name, price };
      })
      .filter(Boolean) as CustomizationOptionValue[];

    const seen = new Set<string>();
    return options.filter((option) => {
      const name = getOptionName(option).toLowerCase();
      if (seen.has(name)) return false;
      seen.add(name);
      return true;
    });
  }

  return normalizeStringList(value);
};

const normalizeCustomizationOptions = (value: unknown): Product['customizationOptions'] | undefined => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }

  const options = value as NonNullable<Product['customizationOptions']>;
  const colors = normalizeCustomizationOptionValues(options.colors);
  const materials = normalizeCustomizationOptionValues(options.materials);

  return {
    ...options,
    ...(colors.length > 0 ? { colors } : {}),
    ...(materials.length > 0 ? { materials } : {}),
  };
};

const dimensionsFromInches = (lengthIn: number, widthIn: number, heightIn: number) => ({
  length: inchesToMeters(lengthIn),
  width: inchesToMeters(widthIn),
  height: inchesToMeters(heightIn),
  unit: 'm' as const,
});

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
    customizationOptions: product.customizationOptions,
    stockStatus: product.source === 'shopify' ? 'custom_order' : undefined,
  };
}

export function productFromFurnitureItem(item: FurnitureItem): Product {
  const existing = getProductById(item.id);
  if (existing) {
    return existing;
  }

  const rawItem = item as FurnitureItem & {
    length?: number;
    width?: number;
    height?: number;
    colors?: FurnitureItem['colors'] | string[] | string;
    materials?: FurnitureItem['materials'] | string[] | string;
  };
  const customizationOptions = normalizeCustomizationOptions(item.customizationOptions);
  const explicitMaterials = normalizeCustomizationOptionValues(customizationOptions?.materials).map(getOptionName);
  const explicitColors = normalizeCustomizationOptionValues(customizationOptions?.colors).map(getOptionName);
  const rawMaterials = Array.isArray(rawItem.materials) || typeof rawItem.materials === 'string'
    ? normalizeStringList(rawItem.materials)
    : [];
  const rawColors = Array.isArray(rawItem.colors) || typeof rawItem.colors === 'string'
    ? normalizeStringList(rawItem.colors)
    : [];
  const baseMaterials = Array.from(
    new Set(
      [
        ...explicitMaterials,
        ...rawMaterials,
        ...(
          !Array.isArray(rawItem.materials) && typeof rawItem.materials !== 'string'
            ? [
                rawItem.materials.primary,
                rawItem.materials.secondary,
                rawItem.materials.upholstery,
                rawItem.materials.legs,
              ]
            : []
        ),
      ].filter((value): value is string => Boolean(value))
    )
  );

  const baseColors = Array.from(
    new Set(
      [
        ...explicitColors,
        ...rawColors,
        ...(
          !Array.isArray(rawItem.colors) && typeof rawItem.colors !== 'string'
            ? [rawItem.colors.main, rawItem.colors.accent]
            : []
        ),
      ].filter((value): value is string => Boolean(value))
    )
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
    length: rawItem.length ?? metersToInches(item.dimensions.length || item.dimensions.depth || 0),
    width: rawItem.width ?? metersToInches(item.dimensions.width || 0),
    height: rawItem.height ?? metersToInches(item.dimensions.height || 0),
    source: item.source,
    productUrl: item.productUrl || item.url,
    imageUrl: item.images[0],
    image: item.images[0],
    thumbnail: item.images[0],
    externalId: item.externalId,
    shopifyProductId: item.shopifyProductId,
    storeId: item.storeId,
    status: item.status,
    customizationOptions,
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

export function productFromCatalogProduct(product: any, index = 0): Product {
  const existing = product?.id ? getProductById(String(product.id)) : undefined;
  if (existing) {
    return existing;
  }

  const name = String(product?.title ?? product?.name ?? `Product ${index + 1}`);
  const materials = normalizeStringList(product?.materials);
  const colorNames = normalizeStringList(product?.colors);
  const lengthIn = Number(product?.length) || 0;
  const widthIn = Number(product?.width) || 0;
  const heightIn = Number(product?.height) || 0;
  const image = String(product?.imageUrl ?? product?.image ?? product?.images?.[0] ?? '');
  const price = Number(product?.price ?? product?.priceRange?.min ?? 0) || 0;
  const customizationOptions = normalizeCustomizationOptions(product?.customizationOptions);

  return {
    id: String(product?.id ?? `catalog-product-${index + 1}`),
    name,
    category: String(product?.category ?? 'Furniture'),
    basePrice: price,
    length: lengthIn,
    width: widthIn,
    height: heightIn,
    source: product?.source ? String(product.source) : undefined,
    productUrl: product?.productUrl ? String(product.productUrl) : product?.url ? String(product.url) : undefined,
    imageUrl: image,
    image,
    thumbnail: String(product?.thumbnail ?? image),
    externalId: product?.externalId ? String(product.externalId) : undefined,
    shopifyProductId: product?.shopifyProductId ? String(product.shopifyProductId) : undefined,
    storeId: product?.storeId ? String(product.storeId) : undefined,
    status: product?.status ? String(product.status) : undefined,
    customizationOptions,
    dimensions: dimensionsFromInches(lengthIn, widthIn, heightIn),
    materials: materials.length > 0 ? materials : ['Custom'],
    colors:
      colorNames.length > 0
        ? colorNames.map((color, colorIndex) => ({
            name: color,
            hex: resolveColorHex(color, colorIndex),
            available: true,
          }))
        : [{ name: 'Custom', hex: FALLBACK_COLOR_HEX[0]!, available: true }],
    images: {
      front: image,
      side: image,
      angle: image,
      thumbnail: image,
    },
    tags: Array.isArray(product?.tags) ? product.tags : [],
    customizer: {
      type: normalizeProductType(String(product?.category ?? 'Furniture')),
      thumbnailLabel: String(product?.category ?? 'Furniture'),
      defaultWidthIn: Math.max(18, Math.round(widthIn || 36)),
      defaultDepthIn: Math.max(18, Math.round(lengthIn || 36)),
      widthRangeIn: twentyPercentRange(Math.max(18, Math.round(widthIn || 36)), 18),
      depthRangeIn: twentyPercentRange(Math.max(18, Math.round(lengthIn || 36)), 18),
      materialOptions: productMaterialOptions(materials),
    },
  };
}
