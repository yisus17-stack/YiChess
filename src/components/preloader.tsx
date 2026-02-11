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
      content.style.visibility = 'hidden';
      content.style.opacity = '0';
    }

    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
        if (content) {
            content.style.transition = 'opacity 0.5s ease-in-out';
            content.style.visibility = 'visible';
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
