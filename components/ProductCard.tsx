import Link from 'next/link'
import type { Product } from '@/types'
import { getMetafieldValue, formatPrice } from '@/lib/cosmic'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const gallery = product.metadata?.gallery
  const firstImage = gallery && gallery.length > 0 ? gallery[0] : undefined
  const name = getMetafieldValue(product.metadata?.name) || product.title
  const inStock = product.metadata?.in_stock
  const category = product.metadata?.category

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-brand-300 hover:shadow-lg transition-all duration-200"
    >
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        {firstImage ? (
          <img
            src={`${firstImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl">
            🛍️
          </div>
        )}
        {inStock === false && (
          <span className="absolute top-3 left-3 bg-gray-900/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>
      <div className="p-4">
        {category && (
          <span className="text-xs font-medium text-brand-600 uppercase tracking-wide">
            {getMetafieldValue(category.metadata?.name) || category.title}
          </span>
        )}
        <h3 className="mt-1 font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-1">
          {name}
        </h3>
        <p className="mt-2 text-lg font-bold text-gray-900">
          {formatPrice(product.metadata?.base_price)}
        </p>
      </div>
    </Link>
  )
}