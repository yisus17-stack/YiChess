import Link from 'next/link';
import { Logo } from '@/components/logo';

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-[1200px] mx-auto px-10 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Volver al inicio de YiChess">
            <Logo className="size-7" />
            <h2 className="text-foreground text-xl font-bold tracking-tight">YiChess</h2>
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-right">
            &copy; {currentYear} YiChess. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
