const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const domain = env.match(/NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=(.*)/)[1].trim().replace(/^"|"$/g, '');
const token = env.match(/NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=(.*)/)[1].trim().replace(/^"|"$/g, '');

const endpoint = `https://${domain.replace(/^https?:\/\//, '').replace(/\/$/, '')}/api/2024-01/graphql.json`;

const query = `
query {
  product(handle: "cocoman-phantom-hoodie") {
    id
    title
    productInfo: metafield(namespace: "custom", key: "product_info") { value }
    designStory: metafield(namespace: "custom", key: "design_story") { value }
    washCare: metafield(namespace: "custom", key: "wash_care") { value }
    returnPolicy: metafield(namespace: "custom", key: "return_policy") { value }
  }
}
`;

fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token,
  },
  body: JSON.stringify({ query }),
})
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error(err));
