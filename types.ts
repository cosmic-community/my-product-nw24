// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Image / file metafield structure
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Category object type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    category_image?: CosmicImage;
  };
}

// Product object type
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name?: string;
    description?: string;
    base_price?: number;
    sku?: string;
    in_stock?: boolean;
    gallery?: CosmicImage[];
    category?: Category;
  };
}

// Variant object type
export interface Variant extends CosmicObject {
  type: 'variants';
  metadata: {
    variant_name?: string;
    product?: Product;
    option_type?: string;
    price?: number;
    sku?: string;
    stock_count?: number;
  };
}

// Review object type
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    reviewer_name?: string;
    product?: Product;
    rating?: number;
    review?: string;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}

export function isVariant(obj: CosmicObject): obj is Variant {
  return obj.type === 'variants';
}