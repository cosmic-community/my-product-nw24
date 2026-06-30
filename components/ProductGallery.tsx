'use client'

import { useState } from 'react'
import type { CosmicImage } from '@/types'

interface ProductGalleryProps {
  images: CosmicImage[]
  alt: string
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-gray-100 flex items-center justify-center text-gray-300 text-6xl">
        🛍️
      </div>
    )
  }

  const activeImage = images[activeIndex] ?? images[0]

  if (!activeImage) {
    return (
      <div className="aspect-square rounded-2xl bg-gray-100 flex items-center justify-center text-gray-300 text-6xl">
        🛍️
      </div>
    )
  }

  return (
    <div>
      <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={`${activeImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
          alt={alt}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                index === activeIndex ? 'border-brand-500' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={`${alt} thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}