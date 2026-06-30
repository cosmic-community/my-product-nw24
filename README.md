# My Product Store

![App Preview](https://imgix.cosmicjs.com/8568ccd0-74d5-11f1-a44c-d7f5892df684-autopilot-photo-1553062407-98eeb64c6a62-1782859584020.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern e-commerce storefront built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Browse products, explore categories, view product variants, and read customer reviews — all dynamically managed through your Cosmic bucket.

## Features

- 🛍️ **Product Catalog** — Browse all products with rich imagery, pricing, and stock status
- 🏷️ **Category Pages** — Explore products organized by category
- 🎨 **Product Variants** — View size, color, and other variant options with individual pricing
- ⭐ **Customer Reviews** — Read authentic customer reviews with star ratings
- 📱 **Fully Responsive** — Pixel-perfect on mobile, tablet, and desktop
- ⚡ **Server-Side Rendering** — Fast page loads with Next.js App Router & Server Components
- 🎯 **SEO Optimized** — Dynamic metadata for every page
- 🖼️ **Image Optimization** — imgix-powered responsive images

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a4446fbbc97f04ea2183e84&clone_repository=6a4447ebbc97f04ea2183ed1)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a SaaS product website with features, pricing tiers, documentation pages, and customer testimonials.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews"

### Code Generation Prompt

> Build a Next.js application for an online business called "My Product". The content is managed in Cosmic CMS with the following object types: categories, products, variants, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) or Node.js 18+
- A Cosmic account with a bucket containing `categories`, `products`, `variants`, and `reviews` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all products with their categories (depth for connected objects)
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single product by slug
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'my-product' })
  .depth(1)

// Fetch reviews for a specific product by object id
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': productId })
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with the following Cosmic object types:

- **categories** — Product categories with name, description, and image
- **products** — Products with name, description, price, SKU, stock status, gallery, and category relationship
- **variants** — Product variants with variant name, option type, price, SKU, and stock count
- **reviews** — Customer reviews with reviewer name, rating, and review text

Learn more in the [Cosmic documentation](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add your environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Add your environment variables
4. Deploy

<!-- README_END -->