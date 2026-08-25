import { getProductRecommendations } from "@/lib/shopify";
import { ProductCard } from "@/components/product/ProductCard";

export async function ProductRecommendations({ productId }: { productId: string }) {
  const products = await getProductRecommendations(productId);

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-8 py-16 border-t border-jet-black/10">
      <div className="flex justify-center items-center gap-4 text-xs font-sans font-bold tracking-widest uppercase text-jet-black">
        <span className="opacity-60">People Also Bought</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 md:px-12">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
