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

    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
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
        'absolute inset-0 z-40 flex items-start justify-center pt-48 bg-background transition-opacity duration-500',
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="loader" />
    </div>
  );
}
