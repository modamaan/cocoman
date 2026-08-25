"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import type { Product, ProductDetails } from '@/lib/shopify';
import { fetchProductDetails } from '@/app/actions/product';
import { QuickAddModal } from './QuickAddModal';

export function ProductCard({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [fullDetails, setFullDetails] = useState<ProductDetails | null>(null);

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currencyCode,
  }).format(parseFloat(product.price));

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to PDP
    if (!product.availableForSale) return;

    if (fullDetails) {
      setIsModalOpen(true);
      return;
    }

    setIsLoadingDetails(true);
    const details = await fetchProductDetails(product.handle);
    if (details) {
      setFullDetails(details);
      setIsModalOpen(true);
    }
    setIsLoadingDetails(false);
  };

  return (
    <>
      <div className="group flex flex-col h-full w-full">
        {/* Image container */}
        <div className="relative w-full aspect-[4/5] bg-soft-ivory overflow-hidden">
          <Link href={`/products/${product.handle}`} className="block w-full h-full">
            {product.featuredImage ? (
              <>
                <img
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  className={`object-cover w-full h-full transition-opacity duration-500 ${product.hoverImage ? 'group-hover:opacity-0' : ''}`}
                />
                {product.hoverImage && (
                  <img
                    src={product.hoverImage.url}
                    alt={product.hoverImage.altText || product.title}
                    className="absolute inset-0 object-cover w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-jet-black/20 text-sm">
                NO IMAGE
              </div>
            )}

            {/* Badges */}
            {!product.availableForSale && (
              <div className="absolute top-4 left-4 bg-jet-black text-pure-white text-[10px] font-bold tracking-widest uppercase px-3 py-1">
                Sold Out
              </div>
            )}
          </Link>

          {/* Hover Add to Cart Button */}
          <div className="absolute bottom-0 left-0 w-full translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
            <button 
              suppressHydrationWarning
              onClick={handleQuickAdd}
              disabled={isLoadingDetails}
              className="w-full bg-jet-black/95 text-pure-white py-3.5 text-center text-[10px] md:text-[11px] font-sans font-bold tracking-[0.2em] uppercase backdrop-blur-sm hover:bg-jet-black transition-colors flex items-center justify-center gap-2"
            >
              {isLoadingDetails ? (
                <span className="w-4 h-4 border-2 border-pure-white/20 border-t-pure-white rounded-full animate-spin" />
              ) : product.availableForSale ? (
                "Add to Cart"
              ) : (
                "Out of Stock"
              )}
            </button>
          </div>
        </div>

        {/* Info */}
        <Link href={`/products/${product.handle}`} className="flex flex-col gap-2 mt-4 text-jet-black">
          <h3 className="text-[11px] md:text-xs font-sans font-medium tracking-wider uppercase leading-snug">
            {product.title}
          </h3>
          <p className="text-[11px] md:text-xs font-sans font-medium opacity-90">
            {price}
          </p>
        </Link>
      </div>

      {fullDetails && (
        <QuickAddModal 
          product={fullDetails} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}
