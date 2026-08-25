import { HeroBanner } from "@/components/home/HeroBanner";
import { DiscoverCollections } from "@/components/home/DiscoverCollections";
import { DynamicCollections } from "@/components/home/DynamicCollections";
import { PromoCountdown } from "@/components/home/PromoCountdown";
import { InstagramFeed } from "@/components/home/InstagramFeed";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroBanner />
      <DiscoverCollections />

      {/* Bottom Promo Section */}
      <a
        href="/collections/men"
        className="relative block w-full bg-jet-black border-t border-pure-white/10 hover:opacity-95 transition-opacity"
      >
        {/* On desktop we can keep the fixed height, on mobile we use aspect ratio so the image isn't severely cropped */}
        <div className="w-full h-auto aspect-square md:aspect-auto md:h-[90vh]">
          <img
            src="/hero_2.png"
            alt="Men's collection"
            className="object-contain md:object-cover object-center w-full h-full"
          />
        </div>
      </a>

      <DynamicCollections />

      {/* Promo Countdown Section */}
      <PromoCountdown />

      {/* Instagram Feed Section */}
      <InstagramFeed />
    </main>
  );
}
