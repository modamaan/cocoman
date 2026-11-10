"use client";

import React, { useEffect, useRef } from "react";

type LookbookControlsProps = {
  currentIndex: number;
  totalLooks: number;
  currentTitle: string;
  onPrev: () => void;
  onNext: () => void;
};

export function LookbookControls({
  currentIndex,
  totalLooks,
  currentTitle,
  onPrev,
  onNext,
}: LookbookControlsProps) {
  // Keep latest handler references without tearing down window event listener
  const onPrevRef = useRef(onPrev);
  const onNextRef = useRef(onNext);

  useEffect(() => {
    onPrevRef.current = onPrev;
    onNextRef.current = onNext;
  });

  // Global keyboard shortcuts: Left/Right arrows to step
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is actively typing in an input or textarea
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        onPrevRef.current();
      } else if (e.key === "ArrowRight") {
        onNextRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const progressPercent = totalLooks > 0 ? ((currentIndex + 1) / totalLooks) * 100 : 0;
  const formattedIndex = String(currentIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalLooks).padStart(2, "0");

  return (
    <div
      suppressHydrationWarning
      className="w-full max-w-[1920px] mx-auto flex items-center justify-between gap-4 px-4 sm:px-8 2xl:px-12 py-3 sm:py-3.5 select-none"
    >
      {/* Left: Look Title */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-[11px] sm:text-xs font-sans font-semibold tracking-[0.2em] uppercase text-jet-black/80 truncate max-w-[180px] sm:max-w-xs">
          {currentTitle}
        </span>
      </div>

      {/* Center: Timeline Progress & Counter */}
      <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
        <span className="text-[11px] sm:text-xs font-sans font-bold tracking-widest text-jet-black whitespace-nowrap">
          {formattedIndex} / {formattedTotal}
        </span>

        {/* Progress Bar Track */}
        <div className="hidden sm:block w-28 md:w-44 h-[2px] bg-jet-black/15 relative overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-jet-black transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Right: Prev / Next Chevrons */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <button
          suppressHydrationWarning
          type="button"
          onClick={onPrev}
          aria-label="Previous look"
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-jet-black/20 hover:border-jet-black hover:bg-jet-black hover:text-pure-white transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          suppressHydrationWarning
          type="button"
          onClick={onNext}
          aria-label="Next look"
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-jet-black/20 hover:border-jet-black hover:bg-jet-black hover:text-pure-white transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
