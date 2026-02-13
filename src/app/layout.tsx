import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { AppHeader } from '@/components/layout/header';
import { AppFooter } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Lexend } from 'next/font/google';
import { Clarity } from '@/components/Clarity';

export const metadata: Metadata = {
  title: {
    default: 'YiChess - Plataforma de Ajedrez Profesional',
    template: '%s | YiChess',
  },
  description:
    'La plataforma definitiva para ajedrecistas que buscan la excelencia. Análisis táctico avanzado, torneos internacionales y una comunidad de élite.',
};

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${lexend.variable} light scroll-smooth`}>
      <head />
      <body className={cn('font-display antialiased')}>
        <div className="relative flex min-h-dvh flex-col bg-background">
          <AppHeader />
          <main className="relative flex-1 flex flex-col">
            <div
              id="main-content"
              className="w-full flex flex-col items-center pb-16 md:pb-24"
            >
              {children}
            </div>
          </main>
          <AppFooter />
        </div>
        <Toaster />
<<<<<<< HEAD
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
        >
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vgs07lu7a9");
          `}
        </Script>
=======
        <Clarity /> {/* Solo cliente, solo producción */}
>>>>>>> 4a2e4d8226a59231cb3a681435e35728158eac70
      </body>
    </html>
  );
}