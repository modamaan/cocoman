import React from 'react';
import { getInstagramPosts } from '@/lib/shopify';
import { AutoScroller } from './AutoScroller';

export async function InstagramFeed() {
  const posts = await getInstagramPosts();

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-warm-off-white text-jet-black py-16 md:py-24 w-full border-t border-jet-black/5 overflow-hidden">
      <div className="px-6 md:px-16 mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-lg md:text-3xl font-serif font-bold uppercase tracking-tight">
          @COCMAN.OFFICIAL
        </h2>
        <a 
          href="https://www.instagram.com/cocomanofficial2025/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase hover:opacity-70 transition-opacity border border-jet-black/20 px-6 py-3"
        >
          FOLLOW @COCOMAN
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
      </div>

      {/* Auto-Scrolling Feed */}
      <div className="w-full">
        <AutoScroller>
          {posts.map((post) => (
            <a 
              key={post.id}
              href={post.link || '#'} 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-[70vw] sm:w-[40vw] md:w-[25vw] lg:w-[20vw] shrink-0 aspect-[3/4] bg-jet-black/5 rounded-sm overflow-hidden"
            >
              {post.videoUrl ? (
                <video 
                  src={post.videoUrl} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : post.image ? (
                <img 
                  src={post.image.url} 
                  alt={post.image.altText || 'Instagram Post'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm opacity-50 uppercase tracking-widest">
                  {post.mediaType || 'Loading...'}
                </div>
              )}

              {/* Instagram Hover Overlay */}
              <div className="absolute inset-0 bg-jet-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
              </div>
            </a>
          ))}
        </AutoScroller>
      </div>
    </section>
  );
}
