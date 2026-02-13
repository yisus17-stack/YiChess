'use client';
import { useEffect } from 'react';

export const Clarity = () => {
  useEffect(() => {
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })((window as any), document, "clarity", "script", "vgs07lu7a9");
  }, []);

  return null;
};
