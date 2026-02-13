'use client';
import { useEffect } from 'react';

export const Clarity = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log('Clarity script ejecutándose'); // ✅ Esto confirma que se carga
      const script = document.createElement('script');
      script.src = 'https://www.clarity.ms/tag/vgs07lu7a9';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return null;
};