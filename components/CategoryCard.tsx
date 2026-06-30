import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const image = category.metadata?.category_image
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative rounded-2xl overflow-hidden h-56 block"
    >
      {image ? (
        <img
          src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
          alt={name}
          width={400}
          height={300}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-700" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="text-xl font-bold">{name}</h3>
        {description && (
          <p className="mt-1 text-sm text-white/80 line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  )
}