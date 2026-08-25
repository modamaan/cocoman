"use client";

import React, { useRef, useEffect, useState } from 'react';

export function AutoScroller({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if content overflows the container
    const checkOverflow = () => {
      if (container.scrollWidth > container.clientWidth) {
        setShouldScroll(true);
      } else {
        setShouldScroll(false);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => window.removeEventListener('resize', checkOverflow);
  }, [children]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !shouldScroll || isHovered || isDragging) return;

    let animationFrameId: number;
    let scrollPos = container.scrollLeft;
    let direction = 1;

    const scroll = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      // If we've reached the end, reverse direction
      if (scrollPos >= maxScroll) {
        direction = -1;
      } else if (scrollPos <= 0) {
        direction = 1;
      }

      // Very slow scroll speed (0.5px per frame)
      scrollPos += 0.5 * direction;
      container.scrollLeft = scrollPos;

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [shouldScroll, isHovered, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeftPos(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  return (
    <div 
      ref={containerRef}
      className={`w-full flex gap-4 md:gap-6 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseUpOrLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUpOrLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      style={{ scrollBehavior: 'auto' }}
    >
      {children}
    </div>
  );
}
