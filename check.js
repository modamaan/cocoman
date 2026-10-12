const fs = require('fs');
const https = require('https');

const env = fs.readFileSync('.env.local', 'utf8');
const domainMatch = env.match(/NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=(.*)/);
const tokenMatch = env.match(/NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=(.*)/);
if (!domainMatch || !tokenMatch) { console.log('Missing env vars'); process.exit(1); }
const domain = domainMatch[1].trim().replace(/['"]/g, '');
const token = tokenMatch[1].trim().replace(/['"]/g, '');

const query = `
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
`;

fetch('https://' + domain + '/api/2024-01/graphql.json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token
  },
  body: JSON.stringify({ query })
})
.then(res => res.json())
.then(res => console.log('Standard fetch success:', JSON.stringify(res, null, 2)))
.catch((err) => {
  console.log('Standard fetch failed due to local DNS:', err.code || err.message);
  console.log('Running resilient fallback via Anycast IP...');

  const payload = JSON.stringify({ query });
  const req = https.request({
    host: '23.227.38.74',
    port: 443,
    path: '/api/2024-01/graphql.json',
    method: 'POST',
    headers: {
      'Host': domain,
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
      'Content-Length': Buffer.byteLength(payload)
    },
    servername: domain,
    timeout: 8000
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log('Fallback Response:', JSON.stringify(JSON.parse(data), null, 2)));
  });
  req.on('error', console.error);
  req.write(payload);
  req.end();
});

