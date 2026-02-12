import type { Metadata } from 'next';
import './globals.css';
import { AppHeader } from '@/components/layout/header';
import { AppFooter } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Lexend } from 'next/font/google';

export const metadata: Metadata = {
  title: {
    default: 'YiChess - Plataforma de Ajedrez Profesional',
    template: '%s | YiChess',
  },
  description: 'La plataforma definitiva para ajedrecistas que buscan la excelencia. Análisis táctico avanzado, torneos internacionales y una comunidad de élite.',
};

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${lexend.variable} light scroll-smooth`}>
      <head />
      <body className={cn('font-display antialiased')}>
        <div className="relative flex min-h-dvh flex-col bg-background">
          <AppHeader />
          <main className="relative flex-1 flex flex-col">
            <div id="main-content" className="w-full flex flex-col items-center pb-16 md:pb-24">
              {children}
            </div>
          </main>
          <AppFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
