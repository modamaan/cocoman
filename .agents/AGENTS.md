# Cocoman Headless Shopify Store Rules

This file defines the strict coding guidelines, technology stack, and aesthetic rules for the Cocoman Next.js headless storefront. All agents working in this project MUST adhere to these rules.

## Technology Stack
- **Framework:** Next.js (App Router, Server Components).
- **Language:** TypeScript (Strict Mode).
- **Styling:** Tailwind CSS v4.
- **Backend:** Shopify Storefront API (GraphQL).

## Styling & Aesthetic Guidelines
- **Avoid the "AI Aesthetic":** Do NOT use generic purple/indigo default palettes, excessive layered shadows, or overly rounded corners.
- **Color Palette (Strict):**
  - Primary: Jet Black (`#0B0B0B`), Charcoal (`#282828`), Warm Off White (`#F5F3EF`), Pure White (`#FFFFFF`).
  - Neutrals: Soft Ivory (`#F8F6F2`), Light Gray (`#D9D6D0`), Medium Gray (`#8C8C8C`), Dark Gray (`#5E5E5E`).
- **Typography:**
  - `Cardo`: Primary typeface for headings, titles, and statements.
  - `Inter`: Secondary typeface for UI, navigation, and body text.
- **Micro-interactions:** Use clean, subtle animations on hover and load states to achieve a premium "streetwear" feel.

## Architecture Rules
1. **Component Colocation:** Keep components focused. Colocate related types and hooks with their components.
2. **Shopify Integration:** All data fetching for products, collections, and cart operations must go through the Shopify Storefront API GraphQL client.
3. **Accessibility (WCAG 2.1 AA):** Ensure all custom interactive elements (e.g., product carousels, cart drawers) are fully keyboard-navigable and have correct ARIA labels.
4. **Main Navigation Structure:** The global header navigation must explicitly use these exact links: `HOME`, `PRODUCTS` (with a dropdown), `ABOUT US`, and `CONTACT`.

## Enforcement
Agents must reference these guidelines when generating UI components or hooking up Shopify data to ensure the output remains true to the Cocoman brand.
