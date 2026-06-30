import type { Metadata } from 'next'
import { getAllProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export const metadata: Metadata = {
  title: 'All Products | My Product Store',
  description: 'Browse our complete collection of products.',
}

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">All Products</h1>
        <p className="mt-2 text-gray-600">{products.length} product{products.length !== 1 ? 's' : ''} available</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-5xl mb-4">🛍️</p>
          <p>No products available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}