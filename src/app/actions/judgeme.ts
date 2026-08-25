'use server';

const JUDGEME_API_URL = 'https://judge.me/api/v1';
const API_TOKEN = process.env.JUDGEME_API_TOKEN;
const SHOP_DOMAIN = process.env.JUDGEME_SHOP_DOMAIN;

export interface Review {
  id: number;
  title: string;
  body: string;
  rating: number;
  reviewer: {
    name: string;
  };
  created_at: string;
}

export interface ReviewStats {
  average: number;
  count: number;
}

/**
 * Helper to fetch the internal Judge.me product ID using the Shopify product handle
 */
async function getJudgemeProductId(handle: string): Promise<number | null> {
  if (!API_TOKEN || !SHOP_DOMAIN) return null;

  try {
    const res = await fetch(
      `${JUDGEME_API_URL}/products/-1?api_token=${API_TOKEN}&shop_domain=${SHOP_DOMAIN}&handle=${handle}`,
      { next: { revalidate: 3600 } } // Cache the mapping for an hour
    );
    
    if (!res.ok) return null;
    
    const data = await res.json();
    return data.product?.id || null;
  } catch (error) {
    console.error('Error fetching Judge.me product ID:', error);
    return null;
  }
}

/**
 * Fetch approved reviews and stats for a specific product
 */
export async function getProductReviews(handle: string): Promise<{ reviews: Review[]; stats: ReviewStats | null }> {
  if (!API_TOKEN || !SHOP_DOMAIN) {
    return { reviews: [], stats: null };
  }

  const productId = await getJudgemeProductId(handle);
  
  if (!productId) {
    return { reviews: [], stats: null };
  }

  try {
    const res = await fetch(
      `${JUDGEME_API_URL}/reviews?api_token=${API_TOKEN}&shop_domain=${SHOP_DOMAIN}&product_id=${productId}&per_page=10`,
      { next: { tags: [`reviews-${handle}`], revalidate: 60 } }
    );

    if (!res.ok) {
      return { reviews: [], stats: null };
    }

    const data = await res.json();
    
    return { 
      reviews: data.reviews || [], 
      stats: null // We can calculate stats from the reviews array on the client or fetch separately if needed
    };
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    return { reviews: [], stats: null };
  }
}

/**
 * Submit a new review
 */
export async function submitProductReview(prevState: any, formData: FormData) {
  if (!API_TOKEN || !SHOP_DOMAIN) {
    return { success: false, message: 'Judge.me credentials missing.' };
  }

  const productId = formData.get('productId') as string;
  const rating = formData.get('rating') as string;
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  if (!productId || !rating || !name || !email || !body) {
    return { success: false, message: 'Please fill in all required fields.' };
  }

  try {
    const res = await fetch(`${JUDGEME_API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_token: API_TOKEN,
        shop_domain: SHOP_DOMAIN,
        id: productId,
        rating: parseInt(rating, 10),
        title,
        body,
        name,
        email,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, message: errorData.message || 'Failed to submit review.' };
    }

    return { success: true, message: 'Review submitted successfully! It will be displayed after approval.' };
  } catch (error) {
    console.error('Error submitting review:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
