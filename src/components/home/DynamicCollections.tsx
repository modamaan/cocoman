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
      return collectionData;
    })
  );

  // Filter out any collections that failed to fetch or have no products
  const activeCollections = collectionsWithProducts.filter(
    (col) => col !== null && col.products && col.products.length > 0
  );

  if (activeCollections.length === 0) {
    return null;
  }

  return (
    <>
      {activeCollections.map((collection, index) => {
        // Alternate background color slightly if desired, or keep them all soft-ivory
        // We'll stick to the soft-ivory from the design, but maybe add a top border to separate them
        return (
          <section key={collection!.id} className="bg-soft-ivory text-jet-black py-16 px-6 md:px-16 w-full border-t border-jet-black/5">
            {/* Header */}
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-xl md:text-2xl font-serif font-bold uppercase tracking-tight">
                {collection!.title}
              </h2>
              <Link 
                href={`/collections/${collection!.id.split('/').pop()?.toLowerCase() || collection!.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-2 text-[10px] md:text-xs font-semibold tracking-wider uppercase hover:opacity-70 transition-opacity"
              >
                VIEW ALL
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            {/* Products Carousel */}
            <ProductCarousel products={collection!.products} />

          </section>
        );
      })}
    </>
  );
}
