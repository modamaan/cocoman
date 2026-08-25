require('dotenv').config({ path: '.env.local' });

async function checkCollection() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
  const query = `
    query getCollectionProducts($handle: String!, $filters: [ProductFilter!]) {
      collection(handle: $handle) {
        id
        title
        products(first: 5, filters: $filters) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    }
  `;

  console.log("Fetching collection 'all-products'...");
  try {
    const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({
        query,
        variables: { handle: 'all-products', filters: [] }
      }),
    });
    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
  } catch (err) {
    console.error(err);
  }
}

checkCollection();
