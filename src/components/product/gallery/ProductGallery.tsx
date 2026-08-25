"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({ images }: { images: { url: string; altText: string; width: number; height: number }[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images?.length) {
    return (
      <div className="w-full aspect-[3/4] bg-soft-ivory flex items-center justify-center text-jet-black/50">
        No Image Available
      </div>
    );
  }

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 h-full">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-20 lg:w-24 shrink-0">
        {images.map((image, index) => (
          <button
            key={index}
            suppressHydrationWarning
            onClick={() => setActiveIndex(index)}
            className={`relative w-16 h-20 md:w-full md:h-[120px] shrink-0 border-2 transition-colors ${
              activeIndex === index ? 'border-jet-black' : 'border-transparent hover:border-jet-black/30'
            }`}
          >
            <img
              src={image.url}
              alt={image.altText || `Thumbnail ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-full bg-soft-ivory flex-grow">
        <img
          src={activeImage.url}
          alt={activeImage.altText || "Product Image"}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
