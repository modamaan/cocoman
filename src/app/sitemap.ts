import { MetadataRoute } from 'next';
import { getCollections, getProducts } from '@/lib/shopify';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cocoman.store';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }));

  let collectionsPromise = getCollections().catch(() => []);
  let productsPromise = getProducts('').catch(() => []);

  const [collections, products] = await Promise.all([
    collectionsPromise,
    productsPromise,
  ]);

  const collectionUrls = collections.map((collection) => ({
    url: `${baseUrl}/collections/${collection.handle}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.handle}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Also static pages
  const staticPages = ['/about', '/contact', '/privacy', '/terms', '/shipping'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...routesMap, ...collectionUrls, ...productUrls, ...staticPages];
}
