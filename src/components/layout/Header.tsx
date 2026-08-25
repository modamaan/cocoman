'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { MenuItem, Collection } from '@/lib/shopify';
import { useCart } from '../cart/CartContext';
import { SearchOverlay } from './SearchOverlay';

function MobileMenuAccordion({ item, setIsMobileMenuOpen }: { item: any, setIsMobileMenuOpen: (v: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between uppercase hover:opacity-70 transition-opacity w-full text-left font-semibold"
      >
        <span>{item.title}</span>
        <svg className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div className="flex flex-col gap-4 pl-4 border-l border-pure-white/20 animate-in fade-in slide-in-from-top-2 pt-2">
          {item.finalItems.map((subItem: any) => (
            <Link
              key={subItem.id}
              href={subItem.url || '#'}
              onClick={() => setIsMobileMenuOpen(false)}
              className="uppercase hover:opacity-70 transition-opacity text-[13px] opacity-70"
            >
              {subItem.title}
            </Link>
          ))}
          <Link
            href={item.url || '#'}
            onClick={() => setIsMobileMenuOpen(false)}
            className="uppercase hover:opacity-70 transition-opacity text-[13px] font-bold mt-2"
          >
            VIEW ALL {item.title} →
          </Link>
        </div>
      )}
    </div>
  );
}

export function Header({ menuItems, collections = [], cart = null }: { menuItems: MenuItem[], collections?: Collection[], cart?: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { openCart } = useCart();

  const lines = cart?.lines?.edges || [];
  const itemCount = lines.reduce((total: number, edge: any) => total + edge.node.quantity, 0);

  // Pre-calculate items so both desktop and mobile can access the injected collections
  const augmentedMenuItems = menuItems.map(item => {
    const isProductsItem = item.title.toUpperCase() === 'PRODUCTS' || item.title.toUpperCase() === 'CATALOG';
    const hasNestedItems = item.items && item.items.length > 0;

    let finalItems = item.items || [];
    if (isProductsItem && !hasNestedItems && collections.length > 0) {
      finalItems = collections.map(col => ({
        id: col.handle,
        title: col.title,
        url: `/collections/${col.handle}`
      }));
    }
    return { ...item, finalItems, showDropdown: finalItems.length > 0 };
  });

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-jet-black text-pure-white border-b border-pure-white/10 relative">
      {/* Logo */}
      <div className="text-xl md:text-2xl font-serif font-bold tracking-widest uppercase">
        <Link href="/">COCOMAN</Link>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider">
        {augmentedMenuItems.map((item) => {
          if (item.showDropdown) {
            return (
              <div key={item.id} className="relative group">
                <Link
                  href={item.url || '#'}
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-1 focus-visible:ring-pure-white focus-visible:ring-offset-4 focus-visible:ring-offset-jet-black uppercase group"
                >
                  <span>{item.title}</span>
                  <svg className="transition-transform group-hover:rotate-180" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                {/* CSS-only dropdown menu */}
                <div className="absolute top-full left-0 pt-6 hidden group-hover:block focus-within:block z-50">
                  <div className="bg-warm-off-white text-jet-black shadow-2xl p-6 min-w-[400px] flex flex-col">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
                      {item.finalItems.map((subItem: any) => {
                        const t = subItem.title.toLowerCase();
                        let icon = <div className="w-1.5 h-1.5 rounded-full bg-jet-black/40" />;
                        if (t.includes('shirt') || t.includes('polo')) {
                          icon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.38 3.46L16 2a8 8 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" /></svg>;
                        } else if (t.includes('jacket') || t.includes('hoodie')) {
                          icon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.38 3.46L16 2a8 8 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" /><path d="M12 2v20" /></svg>;
                        } else if (t.includes('bottom') || t.includes('pant')) {
                          icon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 22H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2h-4l-3-7-3 7z" /></svg>;
                        }

                        return (
                          <Link
                            key={subItem.id}
                            href={subItem.url || '#'}
                            className="hover:opacity-60 transition-opacity flex items-center gap-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-jet-black uppercase font-bold text-[10px] tracking-widest"
                          >
                            <span className="opacity-80">{icon}</span>
                            <span>{subItem.title}</span>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t border-jet-black/10">
                      <Link
                        href="/collections/all-products"
                        className="flex items-center gap-2 hover:opacity-60 transition-opacity uppercase font-bold text-[10px] tracking-widest"
                      >
                        VIEW ALL PRODUCTS
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Normalize Shopify page links for our custom routes
          let finalUrl = item.url || '#';
          if (finalUrl === '/pages/about') {
            finalUrl = '/about';
          } else if (finalUrl === '/pages/contact') {
            finalUrl = '/contact';
          }

          // Render a standard link
          return (
            <Link
              key={item.id}
              href={finalUrl}
              className="hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-1 focus-visible:ring-pure-white focus-visible:ring-offset-4 focus-visible:ring-offset-jet-black uppercase"
            >
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Utilities */}
      <div className="flex items-center gap-4 md:gap-6 text-sm">
        <button
          suppressHydrationWarning
          aria-label="Search"
          onClick={() => setIsSearchOpen(true)}
          className="hover:opacity-70 transition-opacity"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.3-4.3"></path>
          </svg>
        </button>
        <button aria-label="Account" suppressHydrationWarning className="hover:opacity-70 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
        <button suppressHydrationWarning onClick={openCart} aria-label="Cart" className="hover:opacity-70 transition-opacity flex items-center gap-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 01-8 0"></path>
          </svg>
          <span className="text-xs">{itemCount}</span>
        </button>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          suppressHydrationWarning
          aria-label="Menu"
          className="md:hidden hover:opacity-70 transition-opacity ml-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 8h16M4 16h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 h-screen bg-jet-black z-40 flex flex-col px-4 md:px-6 py-8 border-t border-pure-white/10 md:hidden overflow-y-auto pb-32">
          <nav className="flex flex-col gap-8 text-[15px] font-semibold tracking-widest">
            {augmentedMenuItems.map((item) => {
              if (item.showDropdown) {
                return (
                  <MobileMenuAccordion
                    key={item.id}
                    item={item}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                  />
                );
              }

              let finalUrl = item.url || '#';
              if (finalUrl === '/pages/about' || finalUrl === '/pages/about-us') {
                finalUrl = '/about';
              } else if (finalUrl === '/pages/contact' || finalUrl === '/pages/contact-us') {
                finalUrl = '/contact';
              }

              return (
                <Link
                  key={item.id}
                  href={finalUrl}
                  className="hover:opacity-70 transition-opacity uppercase"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        collections={collections}
      />
    </header>
  );
}
