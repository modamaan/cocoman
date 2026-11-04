import React from 'react';
import Link from 'next/link';
import { getMenu, getCollectionProducts } from '@/lib/shopify';

export async function DiscoverCollections() {
  const menuItems = await getMenu('discover-the-collections');

  // Fetch collection details for each menu item in parallel
  const activeCollections = await Promise.all(
    menuItems.map(async (item) => {
      let handle = '';
      if (item.url && item.url !== '#') {
        const match = item.url.match(/\/collections\/([^/?#]+)/);
        if (match) {
          handle = match[1];
        } else {
          const cleanUrl = item.url.split('?')[0].split('#')[0].replace(/\/+$/, '');
          const urlParts = cleanUrl.split('/');
          handle = urlParts[urlParts.length - 1];
        }
      }
      
      if (!handle || handle === '#') {
        // Fallback handle if not linked in Shopify navigation yet
        handle = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      }

      const collectionData = handle ? await getCollectionProducts(handle) : null;

      // Shopify allows collections without images, so fallback to the first product's image if needed
      const firstProductImage = collectionData?.products?.[0]?.featuredImage;

      return {
        id: item.id,
        title: item.title,
        url: `/collections/${handle}`,
        image: collectionData?.image || firstProductImage || null,
      };
    })
  );

  // If menu is completely empty, fallback so UI doesn't break
  const displayCollections = activeCollections.length > 0 ? activeCollections : [
    { id: '1', title: 'OVERSIZED', url: '#', image: null },
    { id: '2', title: 'MINIMAL', url: '#', image: null },
    { id: '3', title: 'CHAOS', url: '#', image: null }
  ];

  return (
    <section className="bg-warm-off-white text-jet-black py-16 md:py-24 px-4 md:px-8 lg:px-12 w-full">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-10 md:mb-14">
          <h2 className="text-xl md:text-3xl font-serif font-bold uppercase tracking-tight">
            DISCOVER THE COLLECTIONS
          </h2>
          <Link
            href="/collections/all-products"
            className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-wider uppercase hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-jet-black"
          >
            VIEW ALL
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Scrollable Card Container */}
        <div className="flex overflow-x-auto gap-4 md:gap-6 lg:gap-8 pb-6 snap-x snap-mandatory w-full lg:w-max lg:mx-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {displayCollections.map((collection) => (
            <Link
              key={collection.id}
              href={collection.url}
              aria-label={`Explore ${collection.title} collection`}
              className="group flex flex-col w-[220px] sm:w-[260px] md:w-[280px] lg:w-[320px] shrink-0 snap-start focus:outline-none focus-visible:ring-2 focus-visible:ring-jet-black focus-visible:ring-offset-4 focus-visible:ring-offset-warm-off-white transition-opacity"
            >
              {/* Card container */}
              <div className="w-full aspect-[4/5] overflow-hidden bg-soft-ivory border border-jet-black/10 relative flex items-center justify-center">
                {collection.image ? (
                  <img
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-xs font-sans font-medium text-jet-black/30 text-center px-4 uppercase tracking-widest">
                    Coming Soon
                  </span>
                )}
                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-jet-black/0 group-hover:bg-jet-black/10 transition-colors duration-300" aria-hidden="true" />
              </div>

              {/* Card caption */}
              <div className="flex items-center justify-between gap-2 mt-4 px-0.5">
                <h3 className="text-xs sm:text-sm font-sans font-bold tracking-[0.16em] uppercase text-jet-black group-hover:opacity-75 transition-opacity">
                  {collection.title}
                </h3>
                <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider uppercase text-jet-black/60 group-hover:text-jet-black transition-colors flex items-center gap-1 shrink-0">
                  EXPLORE
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/collections/all-products"
            className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase border border-jet-black/20 px-6 py-3 hover:bg-jet-black hover:text-pure-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-jet-black"
          >
            VIEW ALL
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
