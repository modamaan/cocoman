import React from 'react';
import Link from 'next/link';
import { getCollectionProducts } from '@/lib/shopify';
import { ProductCard } from '@/components/product/ProductCard';

export async function FeaturedPieces() {
  // Fetch products from the featured-pieces collection (using its Shopify handle 'frontpage')
  const collectionData = await getCollectionProducts('frontpage', 'COLLECTION_DEFAULT', false);
  
  if (!collectionData || !collectionData.products || collectionData.products.length === 0) {
    return null;
  }

  const products = collectionData.products;

  return (
    <section className="bg-soft-ivory text-jet-black py-16 px-6 md:px-16 w-full border-t border-jet-black/5">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-xl md:text-2xl font-sans font-bold uppercase tracking-tight">
          FEATURED PIECES
        </h2>
        <Link 
          href="/collections/frontpage" 
          className="flex items-center gap-2 text-[10px] md:text-xs font-semibold tracking-wider uppercase hover:opacity-70 transition-opacity"
        >
          VIEW ALL
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      {/* Products Grid/Carousel */}
      <div className="w-full overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
        <div className="flex md:grid md:grid-cols-4 gap-2 md:gap-4 w-max md:w-full min-w-full">
          {products.map((product) => (
            <div key={product.id} className="w-[80vw] sm:w-[45vw] md:w-auto snap-start shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination / Controls (Visual) */}
      <div className="flex justify-center items-center gap-6 mt-4">
        <button className="hover:opacity-60 transition-opacity p-2" aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="text-sm font-sans tracking-[0.2em]">
          1 / {Math.max(1, Math.ceil(products.length / 4))}
        </div>
        <button className="hover:opacity-60 transition-opacity p-2" aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
