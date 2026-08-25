"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { addItem } from "@/app/cart/actions";
import type { ProductDetails } from "@/lib/shopify";
import { useCart } from "@/components/cart/CartContext";
import { ProductAccordions } from "./ProductAccordions";
import { ShareButton } from "./ShareButton";
import { ProductRating } from "@/components/reviews/ProductRating";

function SubmitButtons({ availableForSale }: { availableForSale: boolean }) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-3 w-full">
      <button
        suppressHydrationWarning
        name="actionType"
        value="add_to_cart"
        type="submit"
        disabled={pending || !availableForSale}
        className="w-full border border-jet-black bg-transparent text-jet-black py-4 text-sm font-sans font-bold tracking-widest uppercase hover:bg-jet-black hover:text-pure-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Adding..." : availableForSale ? "Add to Cart" : "Out of Stock"}
      </button>

      {availableForSale && (
        <button
          suppressHydrationWarning
          name="actionType"
          value="buy_now"
          type="submit"
          disabled={pending}
          className="w-full bg-jet-black text-pure-white py-4 text-sm font-sans font-bold tracking-widest uppercase hover:bg-jet-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Loading..." : "Buy Now"}
        </button>
      )}
    </div>
  );
}

export function ProductForm({ product, reviewStats }: { product: ProductDetails; reviewStats: { average: number; count: number } }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { openCart } = useCart();

  const [state, formAction] = useActionState(addItem, null);

  useEffect(() => {
    if (state?.success) {
      openCart();
    }
  }, [state, openCart]);

  // Initialize selected options from URL, fallback to first variant's options
  const defaultVariant = product.variants.find((v) => v.availableForSale) || product.variants[0];
  const currentOptions: Record<string, string> = {};

  product.options.forEach((option) => {
    const urlValue = searchParams.get(option.name.toLowerCase());
    if (urlValue && option.values.includes(urlValue)) {
      currentOptions[option.name] = urlValue;
    } else {
      // Fallback to the default variant's option
      const defaultOption = defaultVariant.selectedOptions.find((o) => o.name === option.name);
      currentOptions[option.name] = defaultOption?.value || option.values[0];
    }
  });

  // Find the exact variant based on current options
  const selectedVariant = product.variants.find((variant) => {
    return variant.selectedOptions.every(
      (option) => currentOptions[option.name] === option.value
    );
  });

  const handleOptionSelect = (name: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(name.toLowerCase(), value);
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: selectedVariant?.currencyCode || product.currencyCode,
  }).format(parseFloat(selectedVariant?.price || product.price));

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-serif text-jet-black uppercase tracking-tight">
          {product.title}
        </h1>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-sans font-medium text-jet-black/80">
            {formattedPrice}
          </p>
          {reviewStats.count > 0 && (
            <ProductRating average={reviewStats.average} count={reviewStats.count} className="mt-1" />
          )}
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-6">
        {product.options.map((option) => (
          <div key={option.name} className="flex flex-col gap-3">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-jet-black">
              {option.name}
            </span>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isActive = currentOptions[option.name] === value;
                return (
                  <button
                    suppressHydrationWarning
                    key={value}
                    onClick={() => handleOptionSelect(option.name, value)}
                    className={`border px-4 py-2 text-xs font-sans uppercase transition-colors ${isActive
                        ? 'border-jet-black bg-jet-black text-pure-white'
                        : 'border-jet-black/20 text-jet-black hover:border-jet-black'
                      }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Add to Cart Form */}
      <form action={formAction} className="flex flex-col gap-4 mt-4">
        <input type="hidden" name="variantId" value={selectedVariant?.id || ""} />
        <SubmitButtons availableForSale={selectedVariant?.availableForSale || false} />
        {state?.error && (
          <p className="text-red-500 text-xs font-sans">{state.error}</p>
        )}
      </form>

      {/* Details accordion */}
      <ProductAccordions product={product} />

      {/* Share Button */}
      <ShareButton />
    </div>
  );
}
