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
        const urlParts = item.url.split('?')[0].split('#')[0].split('/');
        handle = urlParts[urlParts.length - 1];
      } else {
        // Fallback handle if they haven't linked it in Shopify yet
        handle = item.title.toLowerCase().replace(/\s+/g, '-');
      }

      const collectionData = handle ? await getCollectionProducts(handle) : null;
      
      // Shopify allows collections without images, so fallback to the first product's image if needed
      const firstProductImage = collectionData?.products?.[0]?.featuredImage;
      
      return {
        id: item.id,
        title: item.title,
        url: item.url !== '#' ? item.url : `/collections/${handle}`,
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
    <section className="bg-warm-off-white text-jet-black py-20 px-4 md:px-16 w-full">
      {/* Header */}
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-tight">
          DISCOVER THE COLLECTIONS
        </h2>
        <Link 
          href="/collections/all-products" 
          className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-wider uppercase hover:opacity-70 transition-opacity"
        >
          VIEW ALL
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      {/* Scrollable Container */}
      <div className="flex overflow-x-auto gap-4 md:gap-8 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {displayCollections.map((collection) => (
          <Link 
            key={collection.id} 
            href={collection.url}
            className="group flex flex-col items-center gap-4 md:gap-6 w-[135px] sm:w-[160px] md:w-[200px] lg:w-[220px] shrink-0 snap-start md:snap-center"
          >
            {/* Pill shaped container */}
            <div className="w-full aspect-[1/2] rounded-[100px] overflow-hidden bg-soft-ivory relative flex items-center justify-center">
              {collection.image ? (
                <img 
                  src={collection.image.url} 
                  alt={collection.image.altText || collection.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <span className="text-xs font-sans font-medium text-jet-black/30 text-center px-4 uppercase tracking-widest">
                  Coming Soon
                </span>
              )}
              {/* Overlay for hover effect */}
              <div className="absolute inset-0 bg-jet-black/0 group-hover:bg-jet-black/10 transition-colors duration-300"></div>
            </div>
            
            <h3 className="text-sm font-sans font-bold tracking-widest uppercase text-center">
              {collection.title}
            </h3>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex justify-center md:hidden">
        <Link 
          href="/collections/all-products" 
          className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase border border-jet-black/20 px-6 py-3"
        >
          VIEW ALL
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
