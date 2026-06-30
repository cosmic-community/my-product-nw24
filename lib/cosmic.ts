import { createBucketClient } from '@cosmicjs/sdk'
import type { Product, Category, Variant, Review } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK errors
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render metadata values that might be objects
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Format a price number as currency
export function formatPrice(price?: number): string {
  if (price === undefined || price === null) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

// ---------- Products ----------
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch products')
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .depth(1)
    return response.object as Product
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch product')
  }
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products', 'metadata.category': categoryId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch products by category')
  }
}

// ---------- Categories ----------
export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch categories')
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .depth(1)
    return response.object as Category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch category')
  }
}

// ---------- Variants ----------
export async function getAllVariants(): Promise<Variant[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'variants' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Variant[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch variants')
  }
}

export async function getVariantsByProduct(productId: string): Promise<Variant[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'variants', 'metadata.product': productId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Variant[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch variants')
  }
}

// ---------- Reviews ----------
export async function getAllReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Review[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch reviews')
  }
}

export async function getReviewsByProduct(productId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews', 'metadata.product': productId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Review[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch reviews')
  }
}