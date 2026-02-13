'use client';
import { useEffect } from 'react';

export const Clarity = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const clarity = require('@microsoft/clarity-js');
      clarity.start({ projectId: 'vgs07lu7a9' });
    }
  }, []);

  return null;
};