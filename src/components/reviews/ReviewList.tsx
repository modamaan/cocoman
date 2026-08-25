'use client';

import React from 'react';
import type { Review } from '@/app/actions/judgeme';

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-8 text-center border-t border-jet-black/10">
        <p className="text-sm font-sans text-jet-black/70">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="py-8 border-t border-jet-black/10 space-y-8">
      <h3 className="text-xl font-serif text-jet-black">Customer Reviews</h3>
      
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="pb-6 border-b border-jet-black/5 last:border-0 last:pb-0">
            <div className="flex items-center gap-2 mb-2 text-[#FFC107]">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={star <= review.rating ? "currentColor" : "none"}
                  stroke={star <= review.rating ? "none" : "currentColor"}
                  strokeWidth={1.5}
                  className="w-4 h-4 text-[#FFC107]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.148.621-.531 1.115-1.078.784L12 18.354a.562.562 0 00-.533 0l-4.881 2.861c-.547.331-1.226-.163-1.078-.784l1.284-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              ))}
            </div>
            <h4 className="font-bold text-sm font-sans text-jet-black mb-1">{review.title}</h4>
            <p className="text-sm font-sans text-jet-black/80 mb-3">{review.body}</p>
            <div className="text-[11px] font-sans text-jet-black/50 uppercase tracking-wider">
              {review.reviewer?.name || 'Anonymous'} • {new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
