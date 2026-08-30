'use client';

import { useState, useEffect } from 'react';
import { subscribeToNewsletter } from '@/app/actions/newsletter';

export function EarlyAccessPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if we should show the popup based on localStorage
    const lastDismissed = localStorage.getItem('earlyAccessDismissed');
    const isSubscribed = localStorage.getItem('earlyAccessSubscribed');

    if (isSubscribed) return;

    if (isSubscribed) return;

    // Trigger 1: Exit intent (mouse leaves the top of the viewport)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        // Only trigger exit intent if they haven't dismissed or subscribed
        if (!localStorage.getItem('earlyAccessDismissed') && !localStorage.getItem('earlyAccessSubscribed')) {
          setIsOpen(true);
        }
      }
    };

    // Trigger 2: Time fallback (show after 30 seconds if exit intent doesn't fire)
    const timeTrigger = setTimeout(() => {
      if (!localStorage.getItem('earlyAccessDismissed') && !localStorage.getItem('earlyAccessSubscribed')) {
        setIsOpen(true);
      }
    }, 30000);

    // Trigger 3: Manual trigger from announcement bar
    const handleManualOpen = () => {
      setIsOpen(true);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('openEarlyAccessPopup', handleManualOpen);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('openEarlyAccessPopup', handleManualOpen);
      clearTimeout(timeTrigger);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('earlyAccessDismissed', new Date().toISOString());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await subscribeToNewsletter(formData);
    
    if (result.success) {
      setIsSuccess(true);
      localStorage.setItem('earlyAccessSubscribed', 'true');
      window.dispatchEvent(new Event('earlyAccessSubscribedEvent'));
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
    
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-jet-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-soft-ivory border border-jet-black/10 shadow-2xl p-8 md:p-12">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-jet-black/60 hover:text-jet-black transition-colors"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <h3 className="font-serif text-2xl font-bold uppercase tracking-widest mb-4">You're on the list</h3>
            <p className="text-sm text-jet-black/70">
              Welcome to the inner circle. We will notify you the moment new collections drop.
            </p>
          </div>
        ) : (
          <div className="flex flex-col text-center">
            <h3 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-widest mb-4">
              Get Early Access
            </h3>
            <p className="text-sm text-jet-black/70 mb-8 leading-relaxed">
              Premium streetwear, produced in limited quantities. Get first access to our new drops and exclusive member-only collections before they sell out.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" suppressHydrationWarning>
              <input 
                type="email" 
                name="email"
                placeholder="Email address" 
                required
                suppressHydrationWarning
                className="w-full bg-transparent border border-jet-black/20 focus:border-jet-black px-4 py-3 text-sm outline-none transition-colors"
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                suppressHydrationWarning
                className="w-full bg-jet-black text-pure-white px-4 py-4 text-[13px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? 'Joining...' : 'Unlock Early Access'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
