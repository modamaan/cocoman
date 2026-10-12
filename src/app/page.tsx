import { HeroBanner } from "@/components/home/HeroBanner";
import { DiscoverCollections } from "@/components/home/DiscoverCollections";
import { SeasonalPromo } from "@/components/home/SeasonalPromo";
import { DynamicCollections } from "@/components/home/DynamicCollections";
import { PromoCountdown } from "@/components/home/PromoCountdown";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://cocoman.store',
  }
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroBanner />
      <DiscoverCollections />

      {/* Seasonal Promo Split Section */}
      <SeasonalPromo />

      <DynamicCollections />

      {/* Promo Countdown Section */}
      <PromoCountdown />

      {/* Instagram Feed Section */}
      <InstagramFeed />
    </main>
  );
}
