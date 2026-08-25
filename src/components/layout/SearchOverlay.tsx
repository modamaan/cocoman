"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Collection } from "@/lib/shopify";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  collections: Collection[];
}

export function SearchOverlay({ isOpen, onClose, collections }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    // Clear query when closed
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-jet-black/50 z-[100] transition-opacity backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />

      {/* Overlay Drawer (Top) */}
      <div className="fixed inset-x-0 top-0 bg-warm-off-white z-[101] shadow-2xl animate-in slide-in-from-top duration-300">
        <div className="w-full">
          {/* Search Bar Container */}
          <div className="border-b border-jet-black/10 px-4 md:px-8 py-4 flex items-center">
            <svg className="text-jet-black w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.3-4.3"></path>
            </svg>
            
            <form onSubmit={handleSubmit} className="flex-1 mx-4">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-jet-black text-lg md:text-xl font-sans placeholder:text-jet-black/30"
              />
            </form>

            <button 
              onClick={onClose}
              className="text-jet-black hover:opacity-70 transition-opacity p-2"
              aria-label="Close search"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Most Searched Content */}
          <div className="px-4 md:px-12 py-8 max-w-[1600px] mx-auto">
            <h3 className="text-[10px] font-sans text-jet-black/50 uppercase tracking-[0.2em] mb-6 font-bold">
              Most Searched
            </h3>
            <ul className="flex flex-col gap-4">
              {collections.slice(0, 6).map((collection) => (
                <li key={collection.handle}>
                  <Link 
                    href={`/collections/${collection.handle}`}
                    onClick={onClose}
                    className="text-sm md:text-base font-sans text-jet-black/80 hover:text-jet-black transition-colors"
                  >
                    {collection.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
