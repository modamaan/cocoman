import React from "react";
import { getProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/product/ProductCard";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const query = typeof resolvedParams.q === "string" ? resolvedParams.q : "";

  let products: any[] = [];
  if (query) {
    products = await getProducts(query);
  }

  return (
    <div className="bg-warm-off-white text-jet-black min-h-screen pt-12 md:pt-20 pb-24">
      <header className="px-6 md:px-12 mb-12 max-w-7xl mx-auto text-center flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-serif mb-4 uppercase tracking-tight">
          Search Results
        </h1>
        {query ? (
          <p className="text-sm font-sans font-medium opacity-80">
            Showing results for "{query}"
          </p>
        ) : (
          <p className="text-sm font-sans font-medium opacity-80">
            Please enter a search term to find products.
          </p>
        )}
      </header>

      <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
        {products.length === 0 && query ? (
          <div className="py-20 text-center flex flex-col items-center gap-6">
            <svg className="w-16 h-16 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.3-4.3"></path>
            </svg>
            <p className="text-lg font-sans">We couldn't find any products matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
