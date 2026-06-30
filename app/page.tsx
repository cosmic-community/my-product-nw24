import Link from 'next/link'
import { getAllProducts, getAllCategories, getAllReviews } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import CategoryCard from '@/components/CategoryCard'
import ReviewCard from '@/components/ReviewCard'

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getAllReviews(),
  ])

  const featuredProducts = products.slice(0, 4)
  const featuredCategories = categories.slice(0, 3)
  const featuredReviews = reviews.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-600 to-brand-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Discover products you'll love
            </h1>
            <p className="mt-6 text-lg md:text-xl text-brand-100">
              Browse our curated collection of quality products, organized by category,
              with honest reviews from real customers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-white text-brand-700 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
              >
                Shop All Products
              </Link>
              <Link
                href="/categories"
                className="bg-brand-500/30 backdrop-blur text-white font-semibold px-6 py-3 rounded-xl border border-white/30 hover:bg-brand-500/50 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl" />
      </section>

      {/* Featured Categories */}
      {featuredCategories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
              <p className="mt-2 text-gray-600">Find exactly what you're looking for.</p>
            </div>
            <Link href="/categories" className="text-brand-600 font-medium hover:text-brand-700">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                <p className="mt-2 text-gray-600">Hand-picked just for you.</p>
              </div>
              <Link href="/products" className="text-brand-600 font-medium hover:text-brand-700">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Reviews */}
      {featuredReviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">What customers say</h2>
              <p className="mt-2 text-gray-600">Real reviews from real shoppers.</p>
            </div>
            <Link href="/reviews" className="text-brand-600 font-medium hover:text-brand-700">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}