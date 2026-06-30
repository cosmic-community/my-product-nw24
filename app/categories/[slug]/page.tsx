// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getProductsByCategory, getMetafieldValue } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) {
    return { title: 'Category Not Found' }
  }
  const name = getMetafieldValue(category.metadata?.name) || category.title
  return {
    title: `${name} | My Product Store`,
    description: getMetafieldValue(category.metadata?.description).slice(0, 160),
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const image = category.metadata?.category_image

  return (
    <div>
      {/* Category hero */}
      <div className="relative h-64 md:h-80 bg-brand-700 overflow-hidden">
        {image && (
          <img
            src={`${image.imgix_url}?w=2000&h=800&fit=crop&auto=format,compress`}
            alt={name}
            width={1000}
            height={400}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full text-white">
            <nav className="text-sm text-white/70 mb-3">
              <Link href="/categories" className="hover:text-white">Categories</Link>
              <span className="mx-2">/</span>
              <span>{name}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold">{name}</h1>
            {description && (
              <p className="mt-3 max-w-2xl text-white/80">{description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="mb-8 text-gray-600">
          {products.length} product{products.length !== 1 ? 's' : ''} in this category
        </p>
        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-5xl mb-4">🛍️</p>
            <p>No products in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}