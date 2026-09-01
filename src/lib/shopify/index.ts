function isDynamicServerError(err: any): boolean {
  if (!err) return false;
  const e = err.error || err;
  return e.digest === 'DYNAMIC_SERVER_USAGE' || (e.message && typeof e.message === 'string' && e.message.includes('Dynamic server usage'));
}

type GraphQLResponse<T> = {
  data: T;
  errors?: Array<{ message: string }>;
};

export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'no-store',
  tags,
}: {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<{ status: number; body: T } | never> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  // We use NEXT_PUBLIC_ here so the token can be used for client-side fetching (e.g. live cart updates) if needed.
  let token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (token) {
    token = token.replace(/['"]/g, '');
  }

  if (!domain || !token || token === 'YOUR_STOREFRONT_ACCESS_TOKEN_HERE') {
    throw new Error('Shopify credentials missing. Check .env.local');
  }

  // Robustly handle domain string in case 'https://' was accidentally included in the env variable
  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '').replace(/['"]/g, '');
  const endpoint = `https://${cleanDomain}/api/2024-01/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = (await result.json()) as GraphQLResponse<T>;

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body: body.data,
    };
  } catch (e) {
    if (isDynamicServerError(e)) throw e;
    throw {
      error: e,
      query,
    };
  }
}

export type Collection = {
  handle: string;
  title: string;
  description: string;
  image?: {
    url: string;
    altText: string;
    width: number;
    height: number;
  };
};

export async function getCollections(): Promise<Collection[]> {
  try {
    const { getCollectionsQuery } = await import('./queries/collections');
    const res = await shopifyFetch<{
      collections: {
        edges: Array<{ node: Collection }>;
      };
    }>({
      query: getCollectionsQuery,
      variables: {
        first: 100
      }
    });

    return res.body.collections.edges.map(edge => edge.node);
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn('⚠️ Shopify credentials missing or invalid. Falling back to mock data for collections.');
    
    // Fallback Mock Data
    return [
      {
        title: 'MINIMAL',
        handle: 'minimal',
        description: '',
        image: { url: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop', altText: '', width: 600, height: 1200 }
      },
      {
        title: 'CHAOS',
        handle: 'chaos',
        description: '',
        image: { url: 'https://images.unsplash.com/photo-1550614000-4b95d415d183?q=80&w=600&auto=format&fit=crop', altText: '', width: 600, height: 1200 }
      },
      {
        title: 'ESSENTIALS',
        handle: 'essentials',
        description: '',
        image: { url: 'https://images.unsplash.com/photo-1618517351616-38fb9c52e04f?q=80&w=600&auto=format&fit=crop', altText: '', width: 600, height: 1200 }
      },
      {
        title: 'HOODIES',
        handle: 'hoodies',
        description: '',
        image: { url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop', altText: '', width: 600, height: 1200 }
      },
      {
        title: 'ACCESSORIES',
        handle: 'accessories',
        description: '',
        image: { url: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600&auto=format&fit=crop', altText: '', width: 600, height: 1200 }
      }
    ];
  }
}

export type HeroSlide = {
  id: string;
  image?: { url: string; altText: string; width: number; height: number };
  video?: { url: string; mimeType: string };
  buttonLink?: string;
};

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const { getHeroSlidesQuery } = await import('./queries/hero');
    const res = await shopifyFetch<any>({
      query: getHeroSlidesQuery,
      tags: ['hero_slides']
    });

    const edges = res.body?.metaobjects?.edges || [];
    
    return edges.map((edge: any) => {
      const fields = edge.node.fields;
      
      const slide: HeroSlide = { id: edge.node.id };
      
      for (const field of fields) {
        if (field.key === 'button_link') {
          slide.buttonLink = field.value;
        }
        if (field.key === 'image' && field.reference?.image) {
          slide.image = field.reference.image;
        }
        if (field.key === 'video' && field.reference?.sources) {
          // Find MP4 or fallback to first source
          const mp4 = field.reference.sources.find((s: any) => s.mimeType === 'video/mp4');
          slide.video = mp4 || field.reference.sources[0];
        }
      }
      
      return slide;
    });
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn('⚠️ Failed to fetch hero slides:', error);
    return [];
  }
}

export type MenuItem = {
  id: string;
  title: string;
  url: string;
  items?: MenuItem[];
};

function parseMenuUrls(items: any[], domain: string): MenuItem[] {
  return items.map(item => {
    let finalUrl = '#';
    const originalUrl = item.url || '';

    try {
      const parsed = new URL(originalUrl);
      
      // Security: Strictly allow only HTTP and HTTPS protocols for absolute URLs
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        console.warn(`⚠️ Blocked unsafe protocol in menu URL: ${originalUrl}`);
        finalUrl = '#';
      } 
      // If the URL points to our Shopify backend, convert it to a local relative path
      else if (parsed.hostname.includes(domain) || parsed.hostname.includes('myshopify.com')) {
        // Preserve query parameters and fragments (e.g. /collections/all?sort=price#top)
        finalUrl = `${parsed.pathname}${parsed.search}${parsed.hash}`;
      } 
      // Otherwise, it's a safe external link (e.g., Instagram, Twitter)
      else {
        finalUrl = originalUrl;
      }
    } catch (e) {
    if (isDynamicServerError(e)) throw e;
      // If URL parsing fails, it might already be a relative path.
      // Security: Ensure it starts with '/' to prevent javascript: or relative path traversal injections.
      if (originalUrl.startsWith('/')) {
        finalUrl = originalUrl;
      }
    }
    
    return {
      id: item.id,
      title: item.title,
      url: finalUrl,
      items: item.items && item.items.length > 0 ? parseMenuUrls(item.items, domain) : []
    };
  });
}

export async function getMenu(handle: string): Promise<MenuItem[]> {
  try {
    const { getMenuQuery } = await import('./queries/menu');
    const res = await shopifyFetch<any>({
      query: getMenuQuery,
      variables: { handle },
      tags: ['menus']
    });

    const items = res.body?.menu?.items || [];
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    
    return parseMenuUrls(items, cleanDomain);
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn(`⚠️ Failed to fetch menu ${handle}:`, error);
    return [];
  }
}

export type Product = {
  id: string;
  title: string;
  handle: string;
  availableForSale: boolean;
  price: string;
  currencyCode: string;
  featuredImage?: { url: string; altText: string; width: number; height: number };
  hoverImage?: { url: string; altText: string; width: number; height: number };
};

export type FilterValue = {
  id: string;
  label: string;
  count: number;
  input: string;
};

export type Filter = {
  id: string;
  label: string;
  type: string;
  values: FilterValue[];
};

export type CollectionWithProducts = {
  id: string;
  title: string;
  description: string;
  seo?: { title?: string; description?: string };
  image?: { url: string; altText: string; width: number; height: number };
  products: Product[];
  availableFilters?: Filter[];
};

export async function getCollectionProducts(
  handle: string,
  sortKey: string = 'COLLECTION_DEFAULT',
  reverse: boolean = false,
  filters: any[] = []
): Promise<CollectionWithProducts | null> {
  try {
    const { getCollectionProductsQueryV2 } = await import('./queries/products');
    const res = await shopifyFetch<any>({
      cache: 'no-store',
      query: getCollectionProductsQueryV2,
      variables: { handle, sortKey, reverse, first: 48, filters },
      tags: ['collections', 'products']
    });

    const collection = res.body?.collection;
    if (!collection) return null;

    const products = collection.products.edges.map((edge: any) => {
      const node = edge.node;
      const images = node.images.edges.map((e: any) => e.node);
      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        availableForSale: node.availableForSale,
        price: node.priceRange.minVariantPrice.amount,
        currencyCode: node.priceRange.minVariantPrice.currencyCode,
        featuredImage: images[0],
        hoverImage: images[1]
      };
    });
    
    return {
      id: collection.id,
      title: collection.title,
      description: collection.description,
      seo: collection.seo,
      image: collection.image,
      products,
      availableFilters: collection.products.filters
    };
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn(`⚠️ Failed to fetch products for collection ${handle}:`, error);
    return null;
  }
}

export type PromoMetafields = {
  title: string | null;
  endDate: string | null;
};

export async function getPromoMetafields(): Promise<PromoMetafields> {
  try {
    const query = `
      query getPromoMetafields {
        shop {
          metafields(identifiers: [
            {namespace: "custom", key: "offer_title"},
            {namespace: "custom", key: "offer_end_date"}
          ]) {
            key
            value
          }
        }
      }
    `;

    const res = await shopifyFetch<any>({
      query,
      tags: ['metafields']
    });

    const metafields = res.body?.shop?.metafields || [];
    let title = null;
    let endDate = null;

    for (const field of metafields) {
      if (field?.key === 'offer_title') title = field.value;
      if (field?.key === 'offer_end_date') endDate = field.value;
    }

    return { title, endDate };
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn('⚠️ Failed to fetch promo metafields:', error);
    return { title: null, endDate: null };
  }
}
export type InstagramPost = {
  id: string;
  link: string | null;
  mediaType: string | null;
  image: { url: string; altText?: string; width?: number; height?: number } | null;
  videoUrl: string | null;
};

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const query = `
      query getInstagramPosts {
        metaobjects(type: "instagram_post", first: 10) {
          edges {
            node {
              id
              fields {
                key
                value
                reference {
                  ... on MediaImage {
                    image { url altText width height }
                  }
                  ... on Video {
                    sources { url mimeType }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const res = await shopifyFetch<any>({
      query,
      tags: ['instagram_posts']
    });

    const edges = res.body?.metaobjects?.edges || [];
    
    return edges.map((edge: any) => {
      const fields = edge.node.fields;
      
      const post: InstagramPost = { 
        id: edge.node.id,
        link: null,
        mediaType: null,
        image: null,
        videoUrl: null
      };
      
      for (const field of fields) {
        if (field.key === 'link') post.link = field.value;
        if (field.key === 'media_type') post.mediaType = field.value;
        if (field.key === 'image' && field.reference?.image) post.image = field.reference.image;
        if (field.key === 'video' && field.reference?.sources) {
          const mp4 = field.reference.sources.find((s: any) => s.mimeType === 'video/mp4');
          if (mp4) post.videoUrl = mp4.url;
        }
      }
      
      return post;
    });
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn('⚠️ Failed to fetch Instagram posts:', error);
    return [];
  }
}

export type ProductDetails = {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  availableForSale: boolean;
  price: string;
  currencyCode: string;
  options: { name: string; values: string[] }[];
  variants: { id: string; title: string; availableForSale: boolean; selectedOptions: { name: string; value: string }[]; price: string; currencyCode: string }[];
  images: { url: string; altText: string; width: number; height: number }[];
  seo: { title: string; description: string };
  productInfo: string | null;
  designStory: string | null;
  washCare: string | null;
  returnPolicy: string | null;
};

export async function getProduct(handle: string): Promise<ProductDetails | null> {
  try {
    const { getProductQuery } = await import('./queries/product');
    const res = await shopifyFetch<any>({
      query: getProductQuery,
      variables: { handle },
      tags: ['products']
    });

    const product = res.body?.product;
    if (!product) return null;

    return {
      id: product.id,
      handle: product.handle,
      title: product.title,
      descriptionHtml: product.descriptionHtml,
      availableForSale: product.availableForSale,
      price: product.priceRange.minVariantPrice.amount,
      currencyCode: product.priceRange.minVariantPrice.currencyCode,
      options: product.options.map((o: any) => ({ name: o.name, values: o.values })),
      variants: product.variants.edges.map((e: any) => ({
        id: e.node.id,
        title: e.node.title,
        availableForSale: e.node.availableForSale,
        selectedOptions: e.node.selectedOptions,
        price: e.node.price.amount,
        currencyCode: e.node.price.currencyCode,
      })),
      images: product.images.edges.map((e: any) => e.node),
      seo: product.seo,
      productInfo: product.productInfo?.value || null,
      designStory: product.designStory?.value || null,
      washCare: product.washCare?.value || null,
      returnPolicy: product.returnPolicy?.value || null
    };
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn(`⚠️ Failed to fetch product ${handle}:`, error);
    return null;
  }
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  try {
    const { getProductRecommendationsQuery } = await import('./queries/product');
    const res = await shopifyFetch<any>({
      query: getProductRecommendationsQuery,
      variables: { productId },
      tags: ['products', 'recommendations']
    });

    const recommendations = res.body?.productRecommendations || [];
    return recommendations.map((node: any) => {
      const images = node.images.edges.map((e: any) => e.node);
      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        availableForSale: node.availableForSale,
        price: node.priceRange.minVariantPrice.amount,
        currencyCode: node.priceRange.minVariantPrice.currencyCode,
        featuredImage: images[0],
        hoverImage: images[1]
      };
    });
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn(`⚠️ Failed to fetch recommendations for ${productId}:`, error);
    return [];
  }
}

export async function createCart(): Promise<any> {
  try {
    const { createCartMutation } = await import('./mutations/cart');
    const res = await shopifyFetch<any>({
      query: createCartMutation,
      variables: { lineItems: [] },
      cache: 'no-store'
    });
    return res.body?.cartCreate?.cart;
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn(`⚠️ Failed to create cart:`, error);
    return null;
  }
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<any> {
  try {
    const { addToCartMutation } = await import('./mutations/cart');
    const res = await shopifyFetch<any>({
      query: addToCartMutation,
      variables: { cartId, lines },
      cache: 'no-store'
    });
    return res.body?.cartLinesAdd?.cart;
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn(`⚠️ Failed to add to cart:`, error);
    return null;
  }
}

export async function updateCart(cartId: string, lines: { id: string; quantity: number }[]): Promise<any> {
  try {
    const { updateCartMutation } = await import('./mutations/cart');
    const res = await shopifyFetch<any>({
      query: updateCartMutation,
      variables: { cartId, lines },
      cache: 'no-store'
    });
    return res.body?.cartLinesUpdate?.cart;
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn(`⚠️ Failed to update cart:`, error);
    return null;
  }
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<any> {
  try {
    const { removeFromCartMutation } = await import('./mutations/cart');
    const res = await shopifyFetch<any>({
      query: removeFromCartMutation,
      variables: { cartId, lineIds },
      cache: 'no-store'
    });
    return res.body?.cartLinesRemove?.cart;
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn(`⚠️ Failed to remove from cart:`, error);
    return null;
  }
}

export async function getCart(cartId: string): Promise<any> {
  try {
    const { getCartQuery } = await import('./queries/cart');
    const res = await shopifyFetch<any>({
      query: getCartQuery,
      variables: { cartId },
      cache: 'no-store'
    });
    return res.body?.cart;
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn(`⚠️ Failed to get cart ${cartId}:`, error);
    return null;
  }
}

export async function getProducts(query: string): Promise<Product[]> {
  try {
    const { getProductsQuery } = await import('./queries/product');
    const res = await shopifyFetch<any>({
      query: getProductsQuery,
      variables: { query },
      tags: ['products']
    });

    const edges = res.body?.products?.edges || [];
    return edges.map((edge: any) => {
      const node = edge.node;
      const images = node.images?.edges?.map((i: any) => i.node) || [];
      
      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        availableForSale: node.availableForSale,
        price: node.priceRange.minVariantPrice.amount,
        currencyCode: node.priceRange.minVariantPrice.currencyCode,
        featuredImage: images[0],
        hoverImage: images[1]
      };
    });
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn(`⚠️ Failed to fetch products for query ${query}:`, error);
    return [];
  }
}

// ==========================================
// CUSTOMER & ACCOUNT
// ==========================================

export async function customerAccessTokenCreate(email: string, password: string): Promise<string | null> {
  try {
    const { customerAccessTokenCreateMutation } = await import('./mutations/customer');
    const res = await shopifyFetch<any>({
      query: customerAccessTokenCreateMutation,
      variables: { input: { email, password } },
      cache: 'no-store'
    });

    const data = res.body?.customerAccessTokenCreate;
    if (data?.customerUserErrors?.length > 0) {
      console.error('Login error:', data.customerUserErrors);
      return null;
    }
    return data?.customerAccessToken?.accessToken || null;
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn('⚠️ Failed to create customer access token:', error);
    return null;
  }
}

export async function customerCreate(email: string, password: string, firstName?: string, lastName?: string): Promise<boolean> {
  try {
    const { customerCreateMutation } = await import('./mutations/customer');
    const res = await shopifyFetch<any>({
      query: customerCreateMutation,
      variables: { input: { email, password, firstName, lastName, acceptsMarketing: true } },
      cache: 'no-store'
    });

    const data = res.body?.customerCreate;
    if (data?.customerUserErrors?.length > 0) {
      console.error('Registration error:', data.customerUserErrors);
      return false;
    }
    return !!data?.customer?.id;
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn('⚠️ Failed to create customer:', error);
    return false;
  }
}

export async function getCustomer(customerAccessToken: string): Promise<any> {
  try {
    const { getCustomerQuery } = await import('./queries/customer');
    const res = await shopifyFetch<any>({
      query: getCustomerQuery,
      variables: { customerAccessToken },
      cache: 'no-store'
    });

    return res.body?.customer || null;
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn('⚠️ Failed to get customer:', error);
    return null;
  }
}

export async function customerAddressCreate(customerAccessToken: string, address: any): Promise<boolean> {
  try {
    const { customerAddressCreateMutation } = await import('./mutations/customer');
    const res = await shopifyFetch<any>({
      query: customerAddressCreateMutation,
      variables: { customerAccessToken, address },
      cache: 'no-store'
    });
    return res.body?.customerAddressCreate?.customerUserErrors?.length === 0;
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn('⚠️ Failed to create address:', error);
    return false;
  }
}

export async function customerAddressUpdate(customerAccessToken: string, id: string, address: any): Promise<boolean> {
  try {
    const { customerAddressUpdateMutation } = await import('./mutations/customer');
    const res = await shopifyFetch<any>({
      query: customerAddressUpdateMutation,
      variables: { customerAccessToken, id, address },
      cache: 'no-store'
    });
    return res.body?.customerAddressUpdate?.customerUserErrors?.length === 0;
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn('⚠️ Failed to update address:', error);
    return false;
  }
}

export async function customerDefaultAddressUpdate(customerAccessToken: string, addressId: string): Promise<boolean> {
  try {
    const { customerDefaultAddressUpdateMutation } = await import('./mutations/customer');
    const res = await shopifyFetch<any>({
      query: customerDefaultAddressUpdateMutation,
      variables: { customerAccessToken, addressId },
      cache: 'no-store'
    });
    return res.body?.customerDefaultAddressUpdate?.customerUserErrors?.length === 0;
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn('⚠️ Failed to set default address:', error);
    return false;
  }
}

export async function recoverCustomerPassword(email: string): Promise<boolean> {
  try {
    const { customerRecoverMutation } = await import('./mutations/customer');
    const res = await shopifyFetch<any>({
      query: customerRecoverMutation,
      variables: { email },
      cache: 'no-store'
    });

    const data = res.body?.customerRecover;
    if (data?.customerUserErrors?.length > 0) {
      console.error('Recover password error:', data.customerUserErrors);
      return false;
    }
    return true;
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    console.warn('⚠️ Failed to recover password:', error);
    return false;
  }
}
