export const getCollectionProductsQueryV2 = /* GraphQL */ `
  query getCollectionProductsWithFilters($handle: String!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean, $first: Int, $filters: [ProductFilter!]) {
    collection(handle: $handle) {
      id
      title
      description
      seo {
        title
        description
      }
      image {
        url
        altText
        width
        height
      }
      products(first: $first, sortKey: $sortKey, reverse: $reverse, filters: $filters) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        edges {
          node {
            id
            title
            handle
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts($sortKey: ProductSortKeys, $reverse: Boolean, $first: Int, $query: String) {
    products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query) {
      edges {
        node {
          id
          title
          handle
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 2) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;
