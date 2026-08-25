import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-jet-black text-pure-white pt-24 pb-12 px-8 md:px-16 w-full">
      <div className="max-w-[90rem] mx-auto flex flex-col">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-32 w-full">
          
          {/* Column 1: CARE */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-sans font-bold tracking-[0.2em] uppercase">Care</h4>
            <div className="flex flex-col gap-4 text-sm font-sans opacity-60">
              <Link href="/orders" className="hover:opacity-100 transition-opacity">Orders</Link>
              <Link href="/profile" className="hover:opacity-100 transition-opacity">Profile</Link>
              <Link href="/returns" className="hover:opacity-100 transition-opacity">Returns</Link>
              <Link href="/size-guide" className="hover:opacity-100 transition-opacity">Size Guide</Link>
            </div>
          </div>

          {/* Column 2: LET'S TALK */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-sans font-bold tracking-[0.2em] uppercase">Let's Talk</h4>
            <div className="flex flex-col gap-4 text-sm font-sans opacity-60">
              <a href="tel:+923489080771" className="hover:opacity-100 transition-opacity">+92 348 9080771</a>
              <a href="mailto:contactus@cocoman.in" className="hover:opacity-100 transition-opacity">contactus@cocoman.in</a>
              <span>Mirpur AJK</span>
              <span>24/7 Available</span>
            </div>
          </div>

          {/* Column 3: ABOUT */}
          <div className="flex flex-col gap-6 lg:pr-12">
            <h4 className="text-xs font-sans font-bold tracking-[0.2em] uppercase">About</h4>
            <div className="text-sm font-sans opacity-60 leading-relaxed flex flex-col gap-4">
              <p>COCOMAN is a movement, not just a brand. We create bold, minimal and timeless pieces for those who don't follow trends — they set them.</p>
              <p>Made for you. Not for everyone.</p>
            </div>
          </div>

          {/* Column 4: STAY UPDATED */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-sans font-bold tracking-[0.2em] uppercase">Stay Updated</h4>
            <p className="text-sm font-sans opacity-60">
              Subscribe for updates and special offers
            </p>
            <form className="flex w-full border border-pure-white/20 focus-within:border-pure-white/70 transition-colors p-1 mt-2">
              <input 
                type="email" 
                placeholder="Email address" 
                required
                suppressHydrationWarning
                className="w-full bg-transparent text-sm px-4 py-2 outline-none placeholder:text-pure-white/40"
              />
              <button 
                type="submit"
                aria-label="Subscribe"
                suppressHydrationWarning
                className="px-4 hover:opacity-70 transition-opacity flex items-center justify-center opacity-60 hover:opacity-100"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>
          </div>
          
        </div>

        {/* Huge COCOMAN Text */}
        <div className="w-full flex justify-center mb-10 overflow-hidden">
          <h1 className="text-[11vw] sm:text-[12vw] md:text-[11vw] lg:text-[10vw] leading-none font-serif font-normal tracking-[0.25em] uppercase text-pure-white/90 select-none text-center ml-[0.25em]">
            COCOMAN
          </h1>
        </div>

        {/* Divider */}
        <hr className="border-pure-white/10 w-full mb-10" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 w-full">
          <p className="text-xs font-sans opacity-40 tracking-wider order-2 sm:order-1 text-center sm:text-left">
            © 2026 COCOMAN. All rights reserved.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-8 items-center opacity-60 order-1 sm:order-2">
            {/* Facebook */}
            <a href="#" className="hover:opacity-100 transition-opacity" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/cocomanofficial2025/" className="hover:opacity-100 transition-opacity" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* TikTok */}
            <a href="#" className="hover:opacity-100 transition-opacity" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" className="hover:opacity-100 transition-opacity" aria-label="YouTube">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
