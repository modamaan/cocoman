export const getHeroSlidesQuery = /* GraphQL */ `
  query getHeroSlides {
    metaobjects(type: "hero_slide", first: 10) {
      edges {
        node {
          id
          fields {
            key
            value
            reference {
              ... on MediaImage {
                image {
                  url
                  altText
                  width
                  height
                }
              }
              ... on Video {
                sources {
                  url
                  mimeType
                }
              }
            }
          }
        }
      }
    }
  }
`;
