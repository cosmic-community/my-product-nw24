import type { Metadata } from 'next'
import { getAllCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'

export const metadata: Metadata = {
  title: 'Categories | My Product Store',
  description: 'Browse products by category.',
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Categories</h1>
        <p className="mt-2 text-gray-600">Find products organized by category.</p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-5xl mb-4">🏷️</p>
          <p>No categories available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  )
}