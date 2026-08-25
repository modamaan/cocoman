"use client";

import React, { useRef, useState, useEffect } from 'react';
import { ProductCard } from '@/components/product/ProductCard';

export function ProductCarousel({ products }: { products: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      // Calculate total pages based on scroll width vs client width
      const pages = Math.max(1, Math.ceil(scrollWidth / clientWidth));
      setTotalPages(pages);

      // Determine precise page number
      let current = 1;
      if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 2) {
        current = pages; // At the very end
      } else if (scrollLeft > 0) {
        current = Math.round(scrollLeft / clientWidth) + 1;
      }
      setCurrentPage(current);

      // Explicitly check bounds for button disable state
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [products]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      {/* Products Carousel */}
      <div 
        ref={scrollContainerRef}
        onScroll={updateScrollState}
        className="w-full overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex gap-4 md:gap-6"
      >
        {products.map((product) => (
          <div 
            key={product.id} 
            className="w-[80vw] sm:w-[45vw] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] snap-start shrink-0"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-8">
          <button 
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`p-2 transition-opacity ${!canScrollLeft ? 'opacity-20 cursor-not-allowed' : 'hover:opacity-60'}`} 
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div className="text-sm font-sans tracking-[0.2em] select-none">
            {currentPage} / {totalPages}
          </div>
          <button 
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`p-2 transition-opacity ${!canScrollRight ? 'opacity-20 cursor-not-allowed' : 'hover:opacity-60'}`} 
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
