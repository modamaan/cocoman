import React from 'react';
import { getPromoMetafields } from '@/lib/shopify';
import { CountdownTimer } from './CountdownTimer';

export async function PromoCountdown() {
  const { title, endDate } = await getPromoMetafields();

  return (
    <section className="bg-jet-black text-pure-white w-full border-t border-pure-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-16 flex flex-col gap-12">
        
        {/* Top Row: Title + Countdown */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 border-b border-pure-white/10 pb-12">
          {/* Dynamic Title */}
          <div className="text-xl md:text-2xl font-sans font-semibold tracking-widest text-center md:text-left opacity-90 uppercase">
            {title || 'Limited Time Offer'}
          </div>
          
          {/* Dynamic Countdown Timer */}
          <CountdownTimer endDateStr={endDate} />
        </div>

        {/* Bottom Row: 4 Feature Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y sm:divide-y-0 md:divide-x divide-pure-white/10">
          
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center px-4 pt-6 md:pt-0">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-6 opacity-80">
              <line x1="3" y1="3" x2="21" y2="21" />
              <line x1="3" y1="9" x2="15" y2="21" />
              <line x1="9" y1="3" x2="21" y2="15" />
              <line x1="21" y1="3" x2="3" y2="21" />
              <line x1="15" y1="3" x2="3" y2="15" />
              <line x1="21" y1="9" x2="9" y2="21" />
            </svg>
            <h4 className="text-sm font-sans font-bold uppercase tracking-widest mb-2 opacity-90">PREMIUM FABRICS</h4>
            <p className="text-xs font-sans font-light opacity-60">Soft long-lasting materials.</p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center px-4 pt-6 md:pt-0">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-6 opacity-80">
              <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
            </svg>
            <h4 className="text-sm font-sans font-bold uppercase tracking-widest mb-2 opacity-90">PERFECT FIT</h4>
            <p className="text-xs font-sans font-light opacity-60">Consistent sizing for every body.</p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center px-4 pt-6 md:pt-0">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-6 opacity-80">
              <path d="M14.5 13.5L21 7l-4-4-6.5 6.5" />
              <path d="M12 18.5l-6 1.5 1.5-6" />
              <path d="M16 8l-8 8" />
              <path d="M4.5 19.5L3 21" />
              <circle cx="18" cy="6" r="1.5" fill="currentColor" />
            </svg>
            <h4 className="text-sm font-sans font-bold uppercase tracking-widest mb-2 opacity-90">STRONG STITCHING</h4>
            <p className="text-xs font-sans font-light opacity-60">Reinforced seams for endurance.</p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center px-4 pt-6 md:pt-0">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-6 opacity-80">
              <path d="M4 10V8a2 2 0 012-2h12a2 2 0 012 2v2" />
              <path d="M2 14v-2c0-1.1.9-2 2-2h16a2 2 0 012 2v2" />
              <path d="M6 14v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
              <path d="M12 6v16" />
            </svg>
            <h4 className="text-sm font-sans font-bold uppercase tracking-widest mb-2 opacity-90">DURABLE WEAR</h4>
            <p className="text-xs font-sans font-light opacity-60">Built to handle daily use.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
