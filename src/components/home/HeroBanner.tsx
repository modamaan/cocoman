import React from 'react';
import { HeroCarousel } from './HeroCarousel';
import type { HeroSlide } from '@/lib/shopify';

export function HeroBanner() {
  const activeSlides = [
    {
      id: 'hero-1',
      ultraLargeImage: { url: '/ultra_large_coco.png', altText: "Men's Collection", width: 1672, height: 941 },
      image: { url: '/large_coco.png', altText: "Men's Collection", width: 1672, height: 940 },
      mobileImage: { url: '/mobile_coco.png', altText: "Men's Collection", width: 941, height: 1672 },
      buttonLink: '/collections/all-products'
    }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-jet-black h-[85vh] md:h-auto md:aspect-[1672/940]">
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full">
        <HeroCarousel slides={activeSlides} />
      </div>
    </section>
  );
}
