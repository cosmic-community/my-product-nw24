import Link from 'next/link'
import type { Review } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'

interface ReviewCardProps {
  review: Review
  showProductLink?: boolean
}

export default function ReviewCard({ review, showProductLink = true }: ReviewCardProps) {
  const reviewerName = getMetafieldValue(review.metadata?.reviewer_name) || 'Anonymous'
  const reviewText = getMetafieldValue(review.metadata?.review)
  const rating = review.metadata?.rating ?? 0
  const product = review.metadata?.product

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">
            {reviewerName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{reviewerName}</p>
            <StarRating rating={Number(rating)} size="sm" />
          </div>
        </div>
      </div>
      {reviewText && (
        <p className="mt-4 text-gray-600 text-sm leading-relaxed flex-1">{reviewText}</p>
      )}
      {showProductLink && product && (
        <Link
          href={`/products/${product.slug}`}
          className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          {getMetafieldValue(product.metadata?.name) || product.title} →
        </Link>
      )}
    </div>
  )
}