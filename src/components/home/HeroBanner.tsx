import React from 'react';
import Link from 'next/link';
import { getHeroSlides } from '@/lib/shopify';
import { HeroCarousel } from './HeroCarousel';

export async function HeroBanner() {
  const slides = await getHeroSlides();

  // If no slides, fallback to a mocked slide so the UI still looks good
  const activeSlides = slides.length > 0 ? slides : [
    {
      id: 'mock-1',
      image: { url: 'https://images.unsplash.com/photo-1550614000-4b95d415d183?q=80&w=2000&auto=format&fit=crop', altText: '', width: 2000, height: 1000 },
      buttonLink: '/collections/all'
    }
  ];

  const firstSlideLink = activeSlides[0].buttonLink || '/collections/all';

  return (
    <section className="relative h-screen w-full overflow-hidden bg-jet-black">
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full">
        <HeroCarousel slides={activeSlides} />
      </div>
    </section>
  );
}
