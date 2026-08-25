"use server";

import { getProduct, type ProductDetails } from "@/lib/shopify";

/**
 * Server Action to securely fetch full product details (including options/variants)
 * on demand, so we don't have to bloat the main collection queries.
 */
export async function fetchProductDetails(handle: string): Promise<ProductDetails | null> {
  try {
    const product = await getProduct(handle);
    return product;
  } catch (error) {
    console.error("Error fetching product details via server action:", error);
    return null;
  }
}
