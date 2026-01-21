import { NextResponse } from 'next/server';
import { FurnitureItem } from '@/types';
import fs from 'fs/promises';
import path from 'path';

type DemoCatalogItem = {
  id: string;
  brand: string;
  source: string;
  name: string;
  category: string;
  shortDescription: string;
  price?: number | null;
  currency?: string | null;
  imageUrls?: string[] | null;
  variants?: Array<{ label: string; options: string[] }> | null;
  materials?: string[] | null;
  colors?: string[] | null;
  dimensions?: {
    width?: number | null;
    depth?: number | null;
    height?: number | null;
  } | null;
  tags?: string[] | null;
  productUrl?: string | null;
};

const DEMO_CATALOG_PATH = path.join(process.cwd(), 'data', 'catalogs', 'ikea_demo_catalog.json');

const mmToMeters = (value?: number | null): number => {
  if (!value || Number.isNaN(value)) return 0;
  return Number((value / 1000).toFixed(3));
};

const mapDemoItemToFurnitureItem = (item: DemoCatalogItem): FurnitureItem => {
  const width = mmToMeters(item.dimensions?.width ?? null);
  const depth = mmToMeters(item.dimensions?.depth ?? null);
  const height = mmToMeters(item.dimensions?.height ?? null);
  const materialPrimary = item.materials?.[0] || 'Unknown material';
  const colorMain = item.colors?.[0] || 'Unknown';

  return {
    id: item.id,
    name: item.name,
    category: item.category,
    brand: item.brand,
    dimensions: {
      length: depth || width || 0,
      width: width || depth || 0,
      height: height || 0,
      depth: depth || undefined,
    },
    materials: {
      primary: materialPrimary,
      secondary: item.materials?.[1] || undefined,
    },
    colors: {
      main: colorMain,
      accent: item.colors?.[1] || undefined,
    },
    styleTags: item.tags || [],
    images: item.imageUrls || [],
    priceRange: typeof item.price === 'number'
      ? { min: item.price, max: item.price }
      : undefined,
  };
};

// Mock catalog data - In production, this would come from a database
const mockCatalog: FurnitureItem[] = [
  {
    id: 'cat-1',
    name: 'Scandinavian Sofa',
    category: 'Seating',
    subCategory: 'Sofa',
    brand: 'Nordic Design',
    dimensions: {
      length: 2.2,
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
    stockStatus: 'in_stock',
  },
  {
    id: 'cat-2',
    name: 'Modern Coffee Table',
    category: 'Tables',
    subCategory: 'Coffee Table',
    brand: 'Urban Living',
    dimensions: {
      length: 1.4,
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
    stockStatus: 'in_stock',
  },
  {
    id: 'cat-3',
    name: 'Earthy Accent Chair',
    category: 'Seating',
    subCategory: 'Armchair',
    brand: 'Natural Home',
    dimensions: {
      length: 0.75,
      width: 0.8,
      height: 1.0,
      seatHeight: 0.42,
      clearance: { front: 0.7 },
    },
    materials: {
      primary: 'Rattan',
      upholstery: 'Terracotta Fabric',
    },
    colors: {
      main: 'Terracotta',
      accent: 'Natural Rattan',
    },
    styleTags: ['Bohemian', 'Earthy', 'Natural'],
    images: [],
    priceRange: { min: 350, max: 500 },
    stockStatus: 'in_stock',
  },
  {
    id: 'cat-4',
    name: 'Minimalist Dining Table',
    category: 'Tables',
    subCategory: 'Dining Table',
    brand: 'Simple Design',
    dimensions: {
      length: 2.0,
      width: 0.9,
      height: 0.75,
      clearance: { front: 0.8, sides: 0.6 },
    },
    materials: {
      primary: 'Oak Wood',
      legs: 'Oak Wood',
    },
    colors: {
      main: 'Natural Oak',
    },
    styleTags: ['Minimalist', 'Scandinavian', 'Modern'],
    images: [],
    priceRange: { min: 800, max: 1200 },
    stockStatus: 'in_stock',
  },
  {
    id: 'cat-5',
    name: 'Forest Green Bookshelf',
    category: 'Storage',
    subCategory: 'Bookshelf',
    brand: 'Earthy Living',
    dimensions: {
      length: 1.2,
      width: 0.4,
      height: 1.8,
      clearance: { front: 0.5 },
    },
    materials: {
      primary: 'Pine Wood',
    },
    colors: {
      main: 'Forest Green',
      accent: 'Natural Wood',
    },
    styleTags: ['Earthy', 'Natural', 'Rustic'],
    images: [],
    priceRange: { min: 300, max: 450 },
    stockStatus: 'in_stock',
  },
  {
    id: 'cat-6',
    name: 'Terracotta Side Table',
    category: 'Tables',
    subCategory: 'Side Table',
    brand: 'Warm Tones',
    dimensions: {
      length: 0.5,
      width: 0.5,
      height: 0.6,
      clearance: { front: 0.3 },
    },
    materials: {
      primary: 'Ceramic',
      legs: 'Metal',
    },
    colors: {
      main: 'Terracotta',
    },
    styleTags: ['Earthy', 'Bohemian', 'Modern'],
    images: [],
    priceRange: { min: 150, max: 250 },
    stockStatus: 'in_stock',
  },
];

export async function GET() {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  if (isDemoMode) {
    try {
      const raw = await fs.readFile(DEMO_CATALOG_PATH, 'utf8');
      const demoItems: DemoCatalogItem[] = JSON.parse(raw);
      const mappedItems = demoItems.map(mapDemoItemToFurnitureItem);
      return NextResponse.json({ items: mappedItems });
    } catch (error) {
      console.error('Failed to load demo catalog:', error);
      return NextResponse.json({ items: mockCatalog });
    }
  }

  return NextResponse.json({ items: mockCatalog });
}
