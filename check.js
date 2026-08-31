const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const domainMatch = env.match(/NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=(.*)/);
const tokenMatch = env.match(/NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=(.*)/);
if (!domainMatch || !tokenMatch) { console.log('Missing env vars'); process.exit(1); }
const domain = domainMatch[1].trim().replace(/['"]/g, '');
const token = tokenMatch[1].trim().replace(/['"]/g, '');

fetch('https://' + domain + '/api/2024-01/graphql.json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token
  },
  body: JSON.stringify({
    query: `
      query {
        menu(handle: "main-menu") {
          items {
            title
            items {
              title
            }
          }
        }
      }
    `
  })
}).then(res => res.json()).then(res => console.log(JSON.stringify(res, null, 2))).catch(console.error);
