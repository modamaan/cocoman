'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { HeroSlide } from '@/lib/shopify';

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {slide.video ? (
            <video
              src={slide.video.url}
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full opacity-60"
            />
          ) : slide.image ? (
            <img
              src={slide.image.url}
              alt={slide.image.altText || 'Hero background'}
              className="object-cover w-full h-full opacity-60"
            />
          ) : (
            <div className="w-full h-full bg-jet-black opacity-60" />
          )}
        </div>
      ))}

      {/* Pagination / Controls overlay */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 text-xs font-sans tracking-widest text-pure-white/50">
        <span className="text-pure-white">{String(currentSlide + 1).padStart(2, '0')}</span>
        <div className="h-24 w-[1px] bg-pure-white/20 relative">
          <div 
            className="absolute top-0 left-0 w-full bg-pure-white transition-all duration-1000"
            style={{ 
              height: `${((currentSlide + 1) / slides.length) * 100}%` 
            }}
          />
        </div>
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
