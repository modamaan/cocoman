"use client";

import React, { useState, useCallback } from "react";
import type { LookbookLook } from "@/lib/shopify";
import { ModelStage } from "./ModelStage";
import { LookbookControls } from "./LookbookControls";

export function ShopTheLookHero({ looks }: { looks: LookbookLook[] }) {
  const totalLooks = looks?.length || 0;

  // Initialize with the center avatar so both the left and right sides of the stage are filled
  const defaultIndex = totalLooks > 0 ? Math.floor((totalLooks - 1) / 2) : 0;
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);

  const handlePrev = useCallback(() => {
    if (totalLooks === 0) return;
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalLooks - 1));
  }, [totalLooks]);

  const handleNext = useCallback(() => {
    if (totalLooks === 0) return;
    setCurrentIndex((prev) => (prev < totalLooks - 1 ? prev + 1 : 0));
  }, [totalLooks]);

  if (!looks || looks.length === 0) return null;

  const currentLook = looks[currentIndex] || looks[0];

  return (
    <section className="relative w-full bg-warm-off-white text-jet-black min-h-[700px] lg:h-[calc(100vh-76px)] 2xl:h-[calc(100vh-80px)] 2xl:min-h-[860px] flex flex-col justify-between overflow-hidden border-b border-jet-black/10">
      {/* Main Full-Width Stage: Centered Freestanding Streetwear Avatars */}
      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
        <ModelStage
          looks={looks}
          currentIndex={currentIndex}
          onSelectIndex={setCurrentIndex}
        />
      </div>

      {/* Bottom Timeline Controls */}
      <div className="border-t border-jet-black/10 bg-warm-off-white/80 backdrop-blur-sm z-30">
        <LookbookControls
          currentIndex={currentIndex}
          totalLooks={totalLooks}
          currentTitle={currentLook.title}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </section>
  );
}
