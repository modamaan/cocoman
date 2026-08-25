"use client";

import React, { useState, useEffect } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function CountdownTimer({ endDateStr }: { endDateStr: string | null }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (!endDateStr) return;
    
    const targetDate = new Date(endDateStr).getTime();

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(intervalId);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endDateStr]);

  // Prevent hydration mismatch by not rendering the numbers until client-side hydration
  if (!isClient) {
    return (
      <div className="flex items-center gap-2 md:gap-4 opacity-0">
        <TimeUnit value={0} label="Days" />
        <span className="text-xl md:text-3xl font-light opacity-50 mb-4">:</span>
        <TimeUnit value={0} label="Hours" />
        <span className="text-xl md:text-3xl font-light opacity-50 mb-4">:</span>
        <TimeUnit value={0} label="Min" />
        <span className="text-xl md:text-3xl font-light opacity-50 mb-4">:</span>
        <TimeUnit value={0} label="Sec" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-xl md:text-3xl font-light opacity-50 mb-4">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-xl md:text-3xl font-light opacity-50 mb-4">:</span>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <span className="text-xl md:text-3xl font-light opacity-50 mb-4">:</span>
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  // Pad with leading zero if less than 10
  const paddedValue = value < 10 ? `0${value}` : value;
  
  return (
    <div className="flex flex-col items-center justify-center border border-pure-white/20 rounded-md w-16 h-16 md:w-20 md:h-20 bg-pure-white/5 backdrop-blur-sm">
      <span className="text-xl md:text-3xl font-sans font-bold tracking-tight">{paddedValue}</span>
      <span className="text-[10px] md:text-xs font-sans uppercase tracking-widest opacity-60">{label}</span>
    </div>
  );
}
