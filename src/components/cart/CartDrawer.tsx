"use client";

import { useCart } from "./CartContext";
import Link from "next/link";
import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updateItemQuantity, removeItem } from "@/app/cart/actions";

function RemoveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="text-[10px] font-sans text-jet-black/50 underline uppercase tracking-widest hover:text-jet-black transition-colors disabled:opacity-50">
      {pending ? "..." : "Remove"}
    </button>
  );
}

function QuantityForm({ item }: { item: any }) {
  const [updateState, updateAction, isUpdating] = useActionState(updateItemQuantity, null);
  
  return (
    <div className="flex items-center border border-jet-black/20">
      <form action={updateAction}>
        <input type="hidden" name="lineId" value={item.id} />
        <input type="hidden" name="quantity" value={item.quantity - 1} />
        <button type="submit" disabled={isUpdating} className="px-3 py-1 text-xs font-sans text-jet-black/60 hover:bg-jet-black/5 disabled:opacity-50 transition-colors">-</button>
      </form>
      <span className="px-3 py-1 text-xs font-sans text-jet-black/60 min-w-[2.5rem] text-center border-x border-jet-black/20">{item.quantity}</span>
      <form action={updateAction}>
        <input type="hidden" name="lineId" value={item.id} />
        <input type="hidden" name="quantity" value={item.quantity + 1} />
        <button type="submit" disabled={isUpdating} className="px-3 py-1 text-xs font-sans text-jet-black/60 hover:bg-jet-black/5 disabled:opacity-50 transition-colors">+</button>
      </form>
    </div>
  );
}

function CartItem({ item }: { item: any }) {
  const [removeState, removeAction] = useActionState(removeItem, null);
  
  const merchandise = item.merchandise;
  const product = merchandise.product;
  
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: item.cost.totalAmount.currencyCode,
  }).format(parseFloat(item.cost.totalAmount.amount));

  return (
    <div className="flex gap-4">
      <div className="w-24 h-32 relative bg-soft-ivory shrink-0">
        {product.featuredImage && (
          <img 
            src={product.featuredImage.url} 
            alt={product.featuredImage.altText || product.title}
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div className="flex flex-col justify-between py-1 flex-1">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-jet-black leading-snug">
              {product.title}
            </h3>
            <span className="text-xs font-sans font-medium text-jet-black">
              {price}
            </span>
          </div>
          {merchandise.title !== 'Default Title' && (
            <p className="text-[10px] font-sans text-jet-black/60 uppercase tracking-wider">
              {merchandise.title}
            </p>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <QuantityForm item={item} />
          <form action={removeAction}>
            <input type="hidden" name="lineId" value={item.id} />
            <RemoveButton />
          </form>
        </div>
      </div>
    </div>
  );
}

export function CartDrawer({ cart }: { cart: any }) {
  const { isOpen, closeCart } = useCart();

  const lines = cart?.lines?.edges || [];
  const itemCount = lines.reduce((total: number, edge: any) => total + edge.node.quantity, 0);
  const subtotal = cart?.cost?.subtotalAmount;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-jet-black/50 z-[100] backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-warm-off-white z-[101] shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-jet-black/10">
          <h2 className="text-lg font-serif tracking-widest uppercase text-jet-black">
            Your Bag ({itemCount})
          </h2>
          <button 
            type="button"
            suppressHydrationWarning
            onClick={closeCart}
            className="p-2 hover:opacity-70 transition-opacity text-jet-black cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="pointer-events-none">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-jet-black/60">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 01-8 0"></path>
              </svg>
              <p className="font-sans text-sm tracking-widest uppercase">Your bag is empty</p>
              <button suppressHydrationWarning onClick={closeCart} className="mt-4 border border-jet-black px-6 py-3 text-xs font-sans font-bold tracking-widest uppercase text-jet-black hover:bg-jet-black hover:text-pure-white transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            lines.map((edge: any) => (
              <CartItem key={edge.node.id} item={edge.node} />
            ))
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="p-6 border-t border-jet-black/10 bg-warm-off-white flex flex-col gap-4">
            <div className="flex justify-between items-center text-jet-black">
              <span className="text-sm font-sans font-bold uppercase tracking-widest">Subtotal</span>
              <span className="text-sm font-sans font-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: subtotal?.currencyCode || 'USD',
                }).format(parseFloat(subtotal?.amount || '0'))}
              </span>
            </div>
            <p className="text-[10px] font-sans text-jet-black/60 uppercase tracking-widest text-center">
              Shipping & taxes calculated at checkout
            </p>
            {cart?.checkoutUrl ? (
              <a 
                href={cart.checkoutUrl}
                className="w-full bg-jet-black text-pure-white py-4 text-sm font-sans font-bold tracking-widest uppercase text-center hover:bg-jet-black/90 transition-colors"
              >
                Checkout
              </a>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}
