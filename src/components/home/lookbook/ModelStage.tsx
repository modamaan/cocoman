/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import type { LookbookLook } from "@/lib/shopify";

type ModelStageProps = {
  looks: LookbookLook[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
};

export function ModelStage({
  looks,
  currentIndex,
  onSelectIndex,
}: ModelStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Touch Swipe Handlers for mobile & trackpads
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0 && currentIndex > 0) {
        onSelectIndex(currentIndex - 1);
      } else if (deltaX < 0 && currentIndex < looks.length - 1) {
        onSelectIndex(currentIndex + 1);
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full flex items-center justify-center overflow-hidden select-none"
    >
      {/* 1. Studio Lighting Atmosphere & Architectural Sunlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Overhead softbox spotlight & warm studio ambient — reduced brightness so text shows through */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,_rgba(255,255,255,0.75)_0%,_rgba(245,243,239,0.45)_55%,_rgba(235,232,226,0.25)_100%)]" />
        {/* Soft diagonal window sunlight shaft from top-left (matches editorial reference) */}
        <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.12)_24%,transparent_52%)]" />
        {/* Perimeter studio vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,_transparent_60%,_rgba(11,11,11,0.035)_100%)]" />
      </div>

      {/* 2. Full-Backdrop Architectural Studio Blueprint Grid */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(11, 11, 11, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(11, 11, 11, 0.045) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          backgroundPosition: "center center",
          maskImage:
            "radial-gradient(ellipse 85% 75% at 50% 45%, black 25%, transparent 88%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 50% 45%, black 25%, transparent 88%)",
        }}
      />

      {/* 3. 3D Perspective Runway Floor Plane */}
      <div
        className="absolute bottom-0 inset-x-0 h-[44%] pointer-events-none select-none z-0 overflow-hidden"
        style={{
          perspective: "450px",
          perspectiveOrigin: "50% 0%",
          maskImage:
            "linear-gradient(to top, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 55%, transparent 100%)",
        }}
      >
        <div
          className="w-[200%] -left-[50%] h-[260%] relative origin-top"
          style={{
            transform: "rotateX(74deg)",
            backgroundImage: `
              linear-gradient(to right, rgba(11, 11, 11, 0.07) 1.5px, transparent 1.5px),
              linear-gradient(to bottom, rgba(11, 11, 11, 0.07) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "64px 64px",
            backgroundPosition: "center top",
          }}
        />
        {/* Soft floor shadow to ground models */}
        <div className="absolute bottom-0 inset-x-0 h-full bg-gradient-to-t from-jet-black/[0.05] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 4. Full-bleed "COCOMAN" editorial serif backdrop — 100% mathematically responsive across Mobile, Laptop & Large Monitors */}
      <div
        className="absolute inset-x-0 pointer-events-none select-none z-0 flex items-center justify-center px-3 sm:px-6"
        style={{ top: "8%" }}
      >
        <svg
          viewBox="0 0 1000 130"
          className="w-[90vw] sm:w-[84vw] max-w-[1350px] h-auto overflow-visible select-none"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="500"
            y="98"
            textAnchor="middle"
            className="font-serif uppercase font-normal"
            style={{
              fontFamily: "var(--font-cardo), Cardo, ui-serif, Georgia, serif",
              fontSize: "116px",
              letterSpacing: "0.07em",
              fill: "rgba(125, 115, 102, 0.45)",
            }}
          >
            COCOMAN
          </text>
        </svg>
      </div>

      {/* Model Carousel Stage — z-10 sits above the background text (z-0).
          All models are 100% solid opaque (opacity: 1.0) so text never shines through their bodies. */}
      <div
        className="relative w-full h-[74vh] sm:h-[78vh] lg:h-[82vh] 2xl:h-[86vh] flex items-center justify-center z-10"
      >
        {looks.map((look, index) => {
          const offset = index - currentIndex;
          const distance = Math.abs(offset);
          const isActive = index === currentIndex;

          // Calculate 3D perspective translation, scaling, depth, and z-index
          // All avatars are 100% opaque so background text is genuinely behind them
          let scale = 1.0;
          const opacity = 1.0;
          let translateY = 0;
          const zIndex = 25 - distance;

          if (offset === 0) {
            scale = 1.05;
            translateY = 0;
          } else if (distance === 1) {
            scale = 0.86;
            translateY = -14; // Steps slightly back on the floor
          } else if (distance === 2) {
            scale = 0.72;
            translateY = -24; // Further back on the floor
          } else {
            scale = 0.60;
            translateY = -34;
          }

          const transformStyle = `translateX(calc(${offset} * clamp(155px, 16vw, 320px))) translateY(${translateY}px) scale(${scale})`;

          return (
            <div
              key={look.id}
              onClick={() => {
                if (!isActive) {
                  onSelectIndex(index);
                }
              }}
              style={{
                transform: transformStyle,
                opacity,
                zIndex,
                transition: "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.55s ease",
              }}
              className={`absolute top-0 bottom-6 w-[260px] sm:w-[320px] lg:w-[380px] xl:w-[420px] 2xl:w-[460px] flex flex-col items-center justify-center cursor-pointer group ${
                !isActive ? "hover:opacity-85" : ""
              }`}
            >
              {/* Studio Ground Shadow underneath model's feet (scales with model depth) */}
              <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] max-w-[240px] h-3.5 sm:h-4 rounded-full bg-jet-black/30 blur-md pointer-events-none transition-all duration-500"
                style={{
                  transform: `translateX(-50%) scale(${scale})`,
                  opacity: isActive ? 0.38 : Math.max(0.06, 0.22 - distance * 0.05),
                }}
              />

              {/* Model Cutout Avatar Container */}
              <div className="relative w-full h-[90%] sm:h-[92%] lg:h-[95%] flex items-end justify-center">
                <img
                  src={look.modelImage.url}
                  alt={look.modelImage.altText || look.title}
                  draggable={false}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/look_avatar_1.png')) {
                      target.src = '/look_avatar_1.png';
                    }
                  }}
                  className="h-full w-auto max-h-[580px] sm:max-h-[640px] md:max-h-[700px] lg:max-h-[780px] xl:max-h-[840px] 2xl:max-h-[920px] object-contain object-bottom select-none pointer-events-none drop-shadow-[0_16px_32px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
