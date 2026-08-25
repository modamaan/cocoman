"use server";

import { createCart, addToCart, getCart, updateCart, removeFromCart } from "@/lib/shopify";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addItem(prevState: any, formData: FormData) {
  const variantId = formData.get("variantId") as string;
  if (!variantId) {
    return { error: "Missing variant ID" };
  }

  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  const quantity = Number(formData.get("quantity") || "1");

  if (!cartId || !cart) {
    cart = await createCart();
    if (!cart || !cart.id) {
      return { error: "Failed to create cart" };
    }
    cartId = cart.id;
    cookieStore.set("cartId", cartId as string, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  }

  const updatedCart = await addToCart(cartId as string, [{ merchandiseId: variantId, quantity }]);

  if (!updatedCart) {
    return { error: "Failed to add item to cart" };
  }

  // Revalidate the layout so the cart is re-fetched on the server
  revalidatePath('/', 'layout');

  const actionType = formData.get("actionType");
  if (actionType === "buy_now" && updatedCart.checkoutUrl) {
    redirect(updatedCart.checkoutUrl);
  }

  return { success: true };
}

export async function updateItemQuantity(prevState: any, formData: FormData) {
  const lineId = formData.get("lineId") as string;
  const quantity = Number(formData.get("quantity"));

  if (!lineId || isNaN(quantity)) {
    return { error: "Missing line ID or invalid quantity" };
  }

  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) {
    return { error: "Missing cart ID" };
  }

  if (quantity === 0) {
    await removeFromCart(cartId, [lineId]);
  } else {
    await updateCart(cartId, [{ id: lineId, quantity }]);
  }

  revalidatePath('/', 'layout');
  return { success: true };
}

export async function removeItem(prevState: any, formData: FormData) {
  const lineId = formData.get("lineId") as string;

  if (!lineId) {
    return { error: "Missing line ID" };
  }

  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) {
    return { error: "Missing cart ID" };
  }

  await removeFromCart(cartId, [lineId]);

  revalidatePath('/', 'layout');
  return { success: true };
}
