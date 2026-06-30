import type { Metadata } from 'next'
import { getAllReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'

export const metadata: Metadata = {
  title: 'Customer Reviews | My Product Store',
  description: 'Read honest reviews from our customers.',
}

export default async function ReviewsPage() {
  const reviews = await getAllReviews()

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.metadata?.rating ?? 0), 0) / reviews.length
      : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Customer Reviews</h1>
        <p className="mt-2 text-gray-600">
          {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          {reviews.length > 0 && ` · ${avgRating.toFixed(1)} average rating`}
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-5xl mb-4">⭐</p>
          <p>No reviews available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  )
}