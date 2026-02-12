import Link from 'next/link';
import { Logo } from '@/components/logo';

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-[1200px] mx-auto px-10 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2" aria-label="Volver al inicio de YiChess">
            <Logo className="size-6" />
            <span className="font-bold text-lg text-foreground">YiChess</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/mapa-del-sitio" className="text-muted-foreground hover:text-foreground transition-colors">
              Mapa del Sitio
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              &copy; {currentYear} YiChess. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
