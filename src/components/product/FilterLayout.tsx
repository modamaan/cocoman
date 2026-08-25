"use client";

import React, { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import type { Filter, FilterValue } from '@/lib/shopify';

function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-jet-black/10 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-sm font-sans uppercase tracking-widest font-semibold">{title}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 opacity-60 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

function PriceRangeFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [min, setMin] = useState(searchParams.get('minPrice') || '');
  const [max, setMax] = useState(searchParams.get('maxPrice') || '');

  const applyPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (min) params.set('minPrice', min);
    else params.delete('minPrice');
    
    if (max) params.set('maxPrice', max);
    else params.delete('maxPrice');
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <form onSubmit={applyPrice} className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="relative w-full">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs opacity-50">₹</span>
          <input 
            type="number" 
            placeholder="Min" 
            value={min} 
            onChange={(e) => setMin(e.target.value)} 
            className="w-full border border-jet-black/20 pl-6 pr-2 py-2 text-sm font-sans bg-transparent focus:outline-none focus:border-jet-black"
          />
        </div>
        <span className="opacity-50">-</span>
        <div className="relative w-full">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs opacity-50">₹</span>
          <input 
            type="number" 
            placeholder="Max" 
            value={max} 
            onChange={(e) => setMax(e.target.value)} 
            className="w-full border border-jet-black/20 pl-6 pr-2 py-2 text-sm font-sans bg-transparent focus:outline-none focus:border-jet-black"
          />
        </div>
      </div>
      <button type="submit" className="w-full bg-jet-black text-pure-white text-[10px] font-bold uppercase tracking-widest py-2.5 hover:opacity-80 transition-opacity">
        Apply Filter
      </button>
    </form>
  );
}

function FilterLayoutInner({ children, availableFilters = [] }: { children: React.ReactNode, availableFilters?: Filter[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const activeFiltersCount = searchParams.getAll('filter').length + (searchParams.has('minPrice') || searchParams.has('maxPrice') ? 1 : 0);

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('filter');
    params.delete('minPrice');
    params.delete('maxPrice');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const handleOutsideClick = () => setIsSortOpen(false);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const updateFilter = (key: string, value: string, isArray: boolean = false) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (isArray) {
      const currentValues = params.getAll(key);
      if (currentValues.includes(value)) {
        params.delete(key);
        currentValues.filter(v => v !== value).forEach(v => params.append(key, v));
      } else {
        params.append(key, value);
      }
    } else {
      if (params.get(key) === value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const updateSort = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const isReverse = val.includes('_REVERSE');
    const sortVal = isReverse ? val.replace('_REVERSE', '') : val;
    
    params.set('sort', sortVal);
    if (isReverse) params.set('reverse', 'true');
    else params.delete('reverse');
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const isActive = (key: string, value: string) => searchParams.getAll(key).includes(value);

  const sortOptions = [
    { label: 'Featured', value: 'COLLECTION_DEFAULT' },
    { label: 'Price: Low to High', value: 'PRICE' },
    { label: 'Price: High to Low', value: 'PRICE_REVERSE' },
    { label: 'Newest', value: 'CREATED' }
  ];

  const currentSortValue = (() => {
    const sort = searchParams.get('sort') || 'COLLECTION_DEFAULT';
    const reverse = searchParams.get('reverse') === 'true';
    return sort + (reverse ? '_REVERSE' : '');
  })();
  const currentSortLabel = sortOptions.find(o => o.value === currentSortValue)?.label || 'Sort';

  return (
    <div className="w-full flex flex-col gap-6" suppressHydrationWarning>
      {/* Top Bar: Filters Toggle & Sort */}
      <div className="flex items-center gap-4">
        {availableFilters?.length > 0 && (
          <button 
            suppressHydrationWarning
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center justify-center border border-jet-black/20 hover:border-jet-black px-6 py-2.5 text-sm font-sans transition-colors min-w-[120px]"
          >
            {isFiltersOpen ? 'Hide Filters' : 'Filters'}
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-jet-black text-pure-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
        )}

        <div className="relative">
          <button 
            suppressHydrationWarning
            onClick={(e) => { e.stopPropagation(); setIsSortOpen(!isSortOpen); }}
            className="flex items-center justify-between border border-jet-black/20 hover:border-jet-black px-6 py-2.5 text-sm font-sans transition-colors min-w-[140px]"
          >
            {currentSortLabel}
            <svg 
              className={`w-3 h-3 ml-3 transition-transform duration-200 opacity-60 ${isSortOpen ? 'rotate-180' : ''}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Sort Dropdown */}
          {isSortOpen && (
            <div className="absolute top-full left-0 mt-2 w-full min-w-[200px] bg-warm-off-white border border-jet-black/10 shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => updateSort(option.value)}
                  className={`w-full text-left px-4 py-2.5 text-sm font-sans hover:bg-jet-black/5 ${currentSortValue === option.value ? 'font-bold' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">
        {/* Sidebar */}
        {isFiltersOpen && availableFilters.length > 0 && (
          <aside className="w-full lg:w-[280px] flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-300 lg:sticky lg:top-32">
            
            {/* Active Filters Header */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center justify-between pb-4 border-b border-jet-black/10">
                <span className="text-sm font-sans font-bold uppercase tracking-widest">Active Filters</span>
                <button 
                  onClick={clearFilters}
                  className="text-[11px] font-sans font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                >
                  Clear All
                </button>
              </div>
            )}

            {availableFilters.map(filter => (
              <Accordion key={filter.id} title={filter.label} defaultOpen={false}>
                {filter.type === 'LIST' ? (
                  <div className="flex flex-col gap-2">
                    {filter.values.map(val => {
                      // Shopify returns stringified JSON for the input field on list filters.
                      // We store this exact JSON string in the URL to pass back.
                      // We must encode it because it has quotes. Wait, URLSearchParams handles encoding.
                      const inputStr = typeof val.input === 'string' ? val.input : JSON.stringify(val.input);
                      
                      return (
                        <button
                          key={val.id}
                          onClick={() => updateFilter('filter', inputStr, true)}
                          className="flex items-center gap-3 py-1 group text-left"
                        >
                          <div className={`w-4 h-4 border border-jet-black flex items-center justify-center transition-colors flex-shrink-0 ${isActive('filter', inputStr) ? 'bg-jet-black text-pure-white' : 'group-hover:border-jet-black/60'}`}>
                            {isActive('filter', inputStr) && (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                            )}
                          </div>
                          <span className={`text-sm font-sans transition-opacity ${isActive('filter', inputStr) ? 'opacity-100 font-medium' : 'opacity-70 group-hover:opacity-100'}`}>
                            {val.label} <span className="opacity-40 text-xs ml-1">({val.count})</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : filter.type === 'PRICE_RANGE' ? (
                  <PriceRangeFilter />
                ) : null}
              </Accordion>
            ))}
          </aside>
        )}

        {/* Product Grid Area */}
        <div className="flex-grow min-w-0 transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}

export function FilterLayout({ children, availableFilters = [] }: { children: React.ReactNode, availableFilters?: Filter[] }) {
  return (
    <Suspense fallback={<div className="w-full min-h-[50vh] animate-pulse bg-jet-black/5" />}>
      <FilterLayoutInner availableFilters={availableFilters}>{children}</FilterLayoutInner>
    </Suspense>
  );
}
