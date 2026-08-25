import http from 'http';
import https from 'https';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'cocoman-1dztemyw.myshopify.com';
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'c4977877bcd26d24f5dd9c0ee6f9f5dd';

const query = `
  query {
    collection(handle: "oversized") {
      id
      title
      handle
      products(first: 1) {
        edges {
          node {
            title
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

const postData = JSON.stringify({ query });

const options = {
  hostname: domain.replace(/^https?:\/\//, ''),
  path: '/api/2024-01/graphql.json',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token,
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Result:', data);
  });
});

req.on('error', (e) => console.error(e));
req.write(postData);
req.end();
