import React from 'react';
import Link from 'next/link';

export function SeasonalPromo() {
  return (
    <section 
      aria-label="Seasonal Top Picks" 
      className="relative w-full border-t border-b border-light-gray/30 bg-pure-white"
    >
      <div className="w-full flex flex-row items-stretch min-h-[260px] sm:min-h-[360px] md:min-h-[500px] lg:min-h-[580px]">
        {/* Left: Campaign Image (50% on all screens) */}
        <div className="w-1/2 relative overflow-hidden bg-jet-black">
          <picture className="w-full h-full block">
            <source media="(min-width: 768px)" srcSet="/hero_big.png" />
            <img
              src="/hero_mobile.png"
              alt="The Season's Top Picks campaign model"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </picture>
        </div>

        {/* Right: Content Showcase (50% on all screens) */}
        <div className="w-1/2 relative bg-pure-white flex flex-col justify-center items-center text-center px-3 py-6 sm:px-8 sm:py-10 md:px-12 md:py-16 lg:px-20">
          {/* Center Content */}
          <div className="max-w-md w-full flex flex-col items-center">
            <h2 className="font-serif text-base sm:text-2xl md:text-4xl lg:text-5xl text-jet-black font-normal tracking-[0.05em] uppercase leading-[1.2]">
              BEYOND THE <br />
              BASICS
            </h2>

            <p className="font-sans text-[11px] sm:text-xs md:text-sm text-dark-gray/80 mt-2 sm:mt-3 max-w-[200px] sm:max-w-xs md:max-w-md font-light leading-relaxed">
              Elevated streetwear essentials engineered for modern livings.
            </p>

            <Link
              href="/collections/all-products"
              className="mt-3 sm:mt-6 md:mt-8 inline-flex items-center justify-center bg-jet-black text-pure-white hover:bg-charcoal px-3.5 py-2 sm:px-8 sm:py-3.5 md:px-10 md:py-4 text-[10px] sm:text-xs font-sans font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-jet-black focus-visible:ring-offset-2"
            >
              DISCOVER NOW
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
