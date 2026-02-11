'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const content = document.getElementById('main-content');
    if (content) {
      // Initially, collapse the content and make it transparent
      content.style.height = '0px';
      content.style.overflow = 'hidden';
      content.style.opacity = '0';
      // Prepare for the fade-in transition
      content.style.transition = 'opacity 0.5s ease-in-out';
    }

    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false); // Start fading out the loader
        
        if (content) {
            // Restore the height, pushing the footer down
            content.style.height = '';
            content.style.overflow = '';
            // Fade in the content
            content.style.opacity = '1';
        }
      }, 500); 
    };
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [isMounted]);

  return (
    <div
      className={cn(
        'absolute inset-0 z-40 flex items-center justify-center bg-background transition-opacity duration-500',
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="loader" />
    </div>
  );
}
