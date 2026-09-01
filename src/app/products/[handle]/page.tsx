import { notFound } from "next/navigation";
import { getProduct } from "@/lib/shopify";
import { ProductGallery } from "@/components/product/gallery/ProductGallery";
import { ProductForm } from "@/components/product/details/ProductForm";
import { ProductRecommendations } from "@/components/product/details/ProductRecommendations";
import { getProductReviews } from "@/app/actions/judgeme";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ReviewForm } from "@/components/reviews/ReviewForm";

import { ProductValues } from "@/components/product/details/ProductValues";

import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.handle);
  if (!product) return notFound();

  const title = product.seo?.title || product.title;
  const description = product.seo?.description || product.descriptionHtml.replace(/<[^>]+>/g, '').substring(0, 160);
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cocoman.store'}/products/${product.handle}`;
  const imageUrl = product.images?.[0]?.url || '';

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: imageUrl ? [{ url: imageUrl, width: 800, height: 800 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.handle);

  if (!product) {
    notFound();
  }

  const { reviews } = await getProductReviews(resolvedParams.handle);
  
  // Calculate basic stats for MVP
  const reviewCount = reviews.length;
  const reviewAverage = reviewCount > 0 
    ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviewCount 
    : 0;

  const reviewStats = {
    average: reviewAverage,
    count: reviewCount
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.seo?.description || product.descriptionHtml.replace(/<[^>]+>/g, '').substring(0, 160),
    image: product.images?.[0]?.url,
    offers: {
      '@type': 'Offer',
      availability: product.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      price: product.price,
      priceCurrency: product.currencyCode,
    },
    ...(reviewCount > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: reviewAverage.toFixed(1),
        reviewCount: reviewCount,
      }
    }),
  };

  return (
    <main className="min-h-screen bg-warm-off-white font-sans text-jet-black flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="flex flex-col md:flex-row gap-12 lg:gap-24 px-6 md:px-12 py-12 lg:py-24 max-w-[1600px] mx-auto w-full">
        {/* Gallery */}
        <div className="w-full md:w-3/5 lg:w-2/3">
          <ProductGallery images={product.images} />
        </div>

        {/* Info Form */}
        <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col pt-4 md:pt-0">
          <ProductForm product={product} reviewStats={reviewStats} />
        </div>
      </section>

      {/* Recommendations */}
      <Suspense fallback={<div className="h-96 w-full animate-pulse bg-jet-black/5" />}>
        <ProductRecommendations productId={product.id} />
      </Suspense>

      {/* Reviews Section */}
      <section className="px-6 md:px-12 py-12 bg-white w-full border-t border-jet-black/10">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-12">
          <div className="flex flex-col items-center w-full">
            <ReviewForm productId={product.id.split('/').pop() || ''} />
          </div>
          <div className="w-full">
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </section>

      {/* Product Values */}
      <ProductValues />
    </main>
  );
}
