'use client';

import React, { useState } from 'react';
import { submitProductReview } from '@/app/actions/judgeme';

interface ReviewFormProps {
  productId: string;
}

export function ReviewForm({ productId }: ReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    const formData = new FormData(e.currentTarget);
    formData.append('productId', productId);
    formData.append('rating', rating.toString());

    try {
      const result = await submitProductReview(null, formData);
      if (result.success) {
        setStatus('success');
        setMessage(result.message);
        (e.target as HTMLFormElement).reset();
        setRating(5);
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    } catch (err) {
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-jet-black text-pure-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-jet-black/90 transition-colors"
      >
        Write a Review
      </button>
    );
  }

  if (status === 'success') {
    return (
      <div className="bg-soft-ivory p-6 border border-jet-black/10 text-center w-full">
        <h4 className="font-serif text-lg text-jet-black mb-2">Thank you!</h4>
        <p className="text-sm font-sans text-jet-black/70">{message}</p>
        <button 
          onClick={() => {
            setStatus('idle');
            setIsOpen(false);
          }}
          className="mt-4 text-xs font-bold tracking-widest uppercase border-b border-jet-black pb-1 hover:text-jet-black/70"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="bg-soft-ivory p-6 md:p-8 border border-jet-black/10 w-full relative">
      <button 
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-jet-black/50 hover:text-jet-black"
        aria-label="Close form"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h3 className="text-xl font-serif text-jet-black mb-6">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating selection */}
        <div>
          <label className="block text-xs font-bold font-sans tracking-widest uppercase mb-2">Rating</label>
          <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={(hoverRating || rating) >= star ? "#FFC107" : "none"}
                  stroke={(hoverRating || rating) >= star ? "none" : "#D9D6D0"}
                  strokeWidth={1.5}
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.148.621-.531 1.115-1.078.784L12 18.354a.562.562 0 00-.533 0l-4.881 2.861c-.547.331-1.226-.163-1.078-.784l1.284-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-bold font-sans tracking-widest uppercase mb-2">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              className="w-full bg-pure-white border border-jet-black/20 p-3 text-sm font-sans focus:outline-none focus:border-jet-black transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-bold font-sans tracking-widest uppercase mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="w-full bg-pure-white border border-jet-black/20 p-3 text-sm font-sans focus:outline-none focus:border-jet-black transition-colors"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="title" className="block text-xs font-bold font-sans tracking-widest uppercase mb-2">Review Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            required 
            className="w-full bg-pure-white border border-jet-black/20 p-3 text-sm font-sans focus:outline-none focus:border-jet-black transition-colors"
            placeholder="Great product!"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-xs font-bold font-sans tracking-widest uppercase mb-2">Review</label>
          <textarea 
            id="body" 
            name="body" 
            required 
            rows={4}
            className="w-full bg-pure-white border border-jet-black/20 p-3 text-sm font-sans focus:outline-none focus:border-jet-black transition-colors resize-y"
            placeholder="Tell us what you think..."
          ></textarea>
        </div>

        {status === 'error' && (
          <div className="text-red-500 text-sm font-sans bg-red-50 p-3 border border-red-200">
            {message}
          </div>
        )}

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full bg-jet-black text-pure-white py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-jet-black/90 transition-colors disabled:opacity-50"
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
