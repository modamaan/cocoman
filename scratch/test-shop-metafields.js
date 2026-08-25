

async function fetchShopMetafields() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    console.error('Missing env vars');
    return;
  }

  const query = `
    query {
      shop {
        id
        name
        metafields(identifiers: [
          {namespace: "custom", key: "offer_title"},
          {namespace: "custom", key: "offer_end_date"}
        ]) {
          namespace
          key
          value
          type
        }
      }
    }
  `;

  try {
    const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
  } catch (e) {
    console.error(e);
  }
}

fetchShopMetafields();
