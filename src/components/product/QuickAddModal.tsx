"use client";

import { useState, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { addItem } from "@/app/cart/actions";
import type { ProductDetails } from "@/lib/shopify";
import { useCart } from "@/components/cart/CartContext";

function SubmitButton({ availableForSale }: { availableForSale: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      suppressHydrationWarning
      type="submit"
      disabled={pending || !availableForSale}
      className="w-full bg-jet-black text-pure-white py-4 text-sm font-sans font-bold tracking-widest uppercase hover:bg-jet-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
    >
      {pending ? "Adding..." : availableForSale ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}

export function QuickAddModal({
  product,
  isOpen,
  onClose,
}: {
  product: ProductDetails;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { openCart } = useCart();
  const [state, formAction] = useActionState(addItem, null);
  const [quantity, setQuantity] = useState(1);

  // Local state for options
  const defaultVariant = product.variants.find((v) => v.availableForSale) || product.variants[0];
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const options: Record<string, string> = {};
    defaultVariant?.selectedOptions.forEach((o) => {
      options[o.name] = o.value;
    });
    return options;
  });

  useEffect(() => {
    if (state?.success) {
      onClose();
      openCart();
    }
  }, [state, onClose, openCart]);

  if (!isOpen) return null;

  const selectedVariant = product.variants.find((variant) => {
    return variant.selectedOptions.every(
      (option) => selectedOptions[option.name] === option.value
    );
  });

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: selectedVariant?.currencyCode || product.currencyCode,
  }).format(parseFloat(selectedVariant?.price || product.price));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-jet-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-warm-off-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-jet-black/60 hover:text-jet-black transition-colors z-10"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
          {/* Product Header */}
          <div className="flex gap-5 md:gap-6 items-start border-b border-jet-black/10 pb-6 mb-6">
            <div className="w-24 h-32 bg-soft-ivory flex-shrink-0 relative overflow-hidden">
              <img 
                src={product.images[0]?.url} 
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 pt-1 pr-6">
              <h2 className="text-lg md:text-xl font-serif text-jet-black uppercase tracking-tight leading-tight">
                {product.title}
              </h2>
              <p className="text-sm font-sans font-medium text-jet-black/80">
                {formattedPrice}
              </p>
            </div>
          </div>

          <form action={formAction} className="flex flex-col gap-6">
            <input type="hidden" name="variantId" value={selectedVariant?.id || ""} />
            <input type="hidden" name="quantity" value={quantity} />

            {/* Options (e.g. Size, Color) */}
            {product.options.map((option) => (
              <div key={option.name} className="flex flex-col gap-3">
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-jet-black">
                  {option.name}
                </span>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const isActive = selectedOptions[option.name] === value;
                    return (
                      <button
                        type="button"
                        key={value}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: value }))}
                        className={`border px-4 py-2 text-xs font-sans uppercase transition-colors ${isActive
                            ? 'border-jet-black bg-jet-black text-pure-white'
                            : 'border-jet-black/20 text-jet-black hover:border-jet-black bg-transparent'
                          }`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-jet-black">
                Quantity
              </span>
              <div className="flex items-center border border-jet-black/20 w-fit">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-jet-black hover:bg-jet-black/5 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-sans font-medium text-jet-black min-w-[3rem] text-center border-x border-jet-black/10">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-jet-black hover:bg-jet-black/5 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {state?.error && (
              <p className="text-red-500 text-xs font-sans">{state.error}</p>
            )}

            <SubmitButton availableForSale={selectedVariant?.availableForSale ?? false} />
          </form>
        </div>
      </div>
    </div>
  );
}
