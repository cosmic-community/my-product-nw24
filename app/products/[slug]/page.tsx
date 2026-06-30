// app/products/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getProductBySlug,
  getVariantsByProduct,
  getReviewsByProduct,
  getMetafieldValue,
  formatPrice,
} from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'
import ProductGallery from '@/components/ProductGallery'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) {
    return { title: 'Product Not Found' }
  }
  const name = getMetafieldValue(product.metadata?.name) || product.title
  return {
    title: `${name} | My Product Store`,
    description: getMetafieldValue(product.metadata?.description).slice(0, 160),
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const [variants, reviews] = await Promise.all([
    getVariantsByProduct(product.id),
    getReviewsByProduct(product.id),
  ])

  const name = getMetafieldValue(product.metadata?.name) || product.title
  const description = getMetafieldValue(product.metadata?.description)
  const sku = getMetafieldValue(product.metadata?.sku)
  const inStock = product.metadata?.in_stock
  const category = product.metadata?.category
  const gallery = product.metadata?.gallery || []

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.metadata?.rating ?? 0), 0) / reviews.length
      : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/products" className="hover:text-brand-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <ProductGallery images={gallery} alt={name} />

        {/* Details */}
        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="text-sm font-medium text-brand-600 uppercase tracking-wide hover:text-brand-700"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          )}
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">{name}</h1>

          {reviews.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <StarRating rating={avgRating} />
              <span className="text-sm text-gray-500">
                {avgRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          <p className="mt-5 text-3xl font-bold text-gray-900">
            {formatPrice(product.metadata?.base_price)}
          </p>

          <div className="mt-4">
            {inStock === false ? (
              <span className="inline-flex items-center gap-2 text-red-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-red-600" /> Out of Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-600" /> In Stock
              </span>
            )}
          </div>

          {description && (
            <div className="mt-6 prose prose-gray text-gray-600 leading-relaxed">
              <p>{description}</p>
            </div>
          )}

          {sku && (
            <p className="mt-6 text-sm text-gray-400">SKU: {sku}</p>
          )}

          {/* Variants */}
          {variants.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Variants</h2>
              <div className="space-y-3">
                {variants.map((variant) => {
                  const variantName = getMetafieldValue(variant.metadata?.variant_name) || variant.title
                  const optionType = getMetafieldValue(variant.metadata?.option_type)
                  const stockCount = variant.metadata?.stock_count ?? 0
                  return (
                    <div
                      key={variant.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-brand-300 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{variantName}</p>
                        {optionType && (
                          <p className="text-sm text-gray-500">{optionType}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(variant.metadata?.price)}
                        </p>
                        <p className={`text-xs ${stockCount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stockCount > 0 ? `${stockCount} in stock` : 'Out of stock'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showProductLink={false} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}