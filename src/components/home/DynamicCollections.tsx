import React from 'react';
import Link from 'next/link';
import { getMenu, getCollectionProducts } from '@/lib/shopify';
import { ProductCarousel } from '@/components/home/ProductCarousel';

export async function DynamicCollections() {
  // Fetch the custom menu the admin uses to control these sections
  const menuItems = await getMenu('homepage-featured-collections');

  if (!menuItems || menuItems.length === 0) {
    // If the admin hasn't created the menu yet, return nothing (or a fallback message)
    return null;
  }

  // Fetch all collections in parallel based on the menu items
  const collectionsWithProducts = await Promise.all(
    menuItems.map(async (item) => {
      let handle = '';
      if (item.url && item.url !== '#') {
        const urlParts = item.url.split('?')[0].split('#')[0].split('/');
        handle = urlParts[urlParts.length - 1];
      } else {
        handle = item.title.toLowerCase().replace(/\s+/g, '-');
      }

      const collectionData = handle ? await getCollectionProducts(handle, 'COLLECTION_DEFAULT', false) : null;
      return collectionData ? { collection: collectionData, handle, menuTitle: item.title } : null;
    })
  );

  // Filter out any collections that failed to fetch or have no products
  const activeCollections = collectionsWithProducts.filter(
    (col) => col !== null && col.collection.products && col.collection.products.length > 0
  );

  if (activeCollections.length === 0) {
    return null;
  }

  return (
    <>
      {activeCollections.map((colData) => {
        const { collection, handle, menuTitle } = colData!;
        return (
          <section key={collection.id} className="bg-soft-ivory text-jet-black py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-12 lg:px-16 w-full border-t border-jet-black/5">
            {/* Header: Single line with reduced mobile sizing */}
            <div className="flex items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10 w-full">
              <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl font-serif font-bold uppercase tracking-tight truncate">
                {menuTitle || collection.title}
              </h2>
              <Link
                href={`/collections/${handle}`}
                aria-label={`View all ${menuTitle || collection.title} products`}
                className="shrink-0 flex items-center gap-1.5 text-[9px] sm:text-[10px] md:text-xs font-sans font-semibold tracking-wider uppercase hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-1 focus-visible:ring-jet-black focus-visible:ring-offset-2"
              >
                <span>VIEW ALL</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-3 h-3 md:w-3.5 md:h-3.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Products Carousel */}
            <ProductCarousel products={collection.products} />

          </section>
        );
      })}
    </>
  );
}
