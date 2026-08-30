'use client';

import { useState, useEffect } from 'react';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('earlyAccessSubscribed')) {
      setIsVisible(false);
    }
    const handleSubscribe = () => setIsVisible(false);
    window.addEventListener('earlyAccessSubscribedEvent', handleSubscribe);
    return () => window.removeEventListener('earlyAccessSubscribedEvent', handleSubscribe);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.dispatchEvent(new Event('openEarlyAccessPopup'));
  };

  if (!isVisible) return null;

  return (
    <div className="bg-jet-black text-pure-white w-full py-2.5 px-4 text-center cursor-pointer hover:bg-jet-black/90 transition-colors overflow-hidden">
      <p 
        onClick={handleClick}
        className="text-[9px] sm:text-[11px] font-bold tracking-[0.1em] sm:tracking-[0.2em] uppercase flex justify-center items-center gap-1 sm:gap-2 whitespace-nowrap"
      >
        <span>Early Access.</span>
        <span className="opacity-70 font-normal">Get first access to new drops.</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-70 hidden sm:block">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </p>
    </div>
  );
}
