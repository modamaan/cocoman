'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { subscribeToNewsletter } from '@/app/actions/newsletter';

export function Footer() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await subscribeToNewsletter(formData);

    if (result.success) {
      localStorage.setItem('earlyAccessSubscribed', 'true');
      window.dispatchEvent(new Event('earlyAccessSubscribedEvent'));
      setIsSubscribed(true);
    }
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-jet-black text-pure-white pt-24 pb-12 px-8 md:px-16 w-full font-sans">
      <div className="max-w-[90rem] mx-auto flex flex-col">

        {/* Top Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 md:gap-12 mb-32 w-full">

          {/* Column 1: CUSTOMER SERVICE */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[11px] font-bold tracking-widest uppercase">Customer Service</h4>
            <div className="flex flex-col gap-4 text-[13.5px] opacity-60">
              <Link href="/contact" className="hover:opacity-100 transition-opacity">Contact us</Link>
            </div>
          </div>

          {/* Column 2: COMPANY */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-bold tracking-widest uppercase">Company</h4>
            <div className="flex flex-col gap-4 text-[13.5px] opacity-60">
              <Link href="/about" className="hover:opacity-100 transition-opacity">About us</Link>
              <Link href="/privacy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
              <Link href="/shipping" className="hover:opacity-100 transition-opacity">Shipping Policy</Link>
              <Link href="/terms" className="hover:opacity-100 transition-opacity">Terms and Conditions</Link>
            </div>
          </div>

          {/* Column 3: FOLLOW US */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-bold tracking-widest uppercase">Follow Us</h4>

            {isSubscribed ? (
              <div className="flex w-full items-center justify-center p-4 border border-pure-white/20 text-sm tracking-widest uppercase">
                You're on the list
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                suppressHydrationWarning
                className="flex w-full border border-pure-white/20 focus-within:border-pure-white/70 transition-colors"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email Us"
                  required
                  suppressHydrationWarning
                  className="w-full bg-transparent text-[13.5px] px-4 py-3 outline-none placeholder:text-pure-white/40 text-pure-white"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  disabled={isSubmitting}
                  suppressHydrationWarning
                  className="px-4 hover:opacity-70 transition-opacity flex items-center justify-center text-pure-white disabled:opacity-50"
                >
                  {isSubmitting ? '...' : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </form>
            )}

            <p className="text-[12px] opacity-60 leading-relaxed max-w-sm">
              Apply for our free membership to receive exclusive deals, news, and events.
            </p>


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
        <div className="flex flex-col items-center justify-center gap-6 w-full">
          <p className="text-[12px] opacity-60 tracking-wide text-center">
            © 2025 COCOMAN. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-6 items-center">
            {/* Facebook */}
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/cocomanofficial2025/" className="opacity-80 hover:opacity-100 transition-opacity" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* TikTok */}
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" aria-label="YouTube">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#0B0B0B" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
