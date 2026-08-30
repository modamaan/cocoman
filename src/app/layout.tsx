import type { Metadata } from "next";
import { Inter, Cardo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cookies } from "next/headers";
import { getMenu, getCollections, getCart } from "@/lib/shopify";
import { CartProvider } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { EarlyAccessPopup } from "@/components/ui/EarlyAccessPopup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cardo = Cardo({
  variable: "--font-cardo",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Cocoman - Wear What Feels Like You",
  description: "Premium streetwear storefront",
  icons: {
    icon: "/cocoman_favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  const [mainMenuItems, collections, cart] = await Promise.all([
    getMenu('main-menu'),
    getCollections(),
    cartId ? getCart(cartId) : Promise.resolve(null)
  ]);

  // Fallback if the token is invalid or API fails so the UI doesn't crash completely
  const activeMenuItems = mainMenuItems.length > 0 ? mainMenuItems : [
    { id: '1', title: 'HOME', url: '/' },
    { id: '2', title: 'PRODUCTS', url: '/collections/all-products' },
    { id: '3', title: 'ABOUT US', url: '/about' },
    { id: '4', title: 'CONTACT', url: '/contact' },
  ];

  return (
    <html
      lang="en"
      className={`${inter.variable} ${cardo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-warm-off-white text-jet-black">
        <CartProvider>
          <AnnouncementBar />
          <Header menuItems={activeMenuItems} collections={collections} cart={cart} />
          {children}
          <CartDrawer cart={cart} />
        </CartProvider>
        <Footer />
        <EarlyAccessPopup />
      </body>
    </html>
  );
}
