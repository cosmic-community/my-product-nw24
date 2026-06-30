import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-extrabold text-brand-600">
            <span className="text-xl">🛍️</span>
            My Product
          </Link>
          <nav className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/products" className="hover:text-brand-600">Products</Link>
            <Link href="/categories" className="hover:text-brand-600">Categories</Link>
            <Link href="/reviews" className="hover:text-brand-600">Reviews</Link>
          </nav>
        </div>
        <p className="mt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} My Product. All rights reserved.
        </p>
      </div>
    </footer>
  )
}