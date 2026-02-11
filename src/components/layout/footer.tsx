import Link from 'next/link';
import { Logo } from '@/components/logo';

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8">
            <Link href="/" className="flex items-center gap-3" aria-label="Volver al inicio de YiChess">
                <Logo className="size-7" />
                <span className="font-bold text-xl text-foreground">YiChess</span>
            </Link>
            <div className="flex items-center gap-6">
                <Link href="/reglas" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Reglas
                </Link>
                <Link href="/estrategias" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Estrategias
                </Link>
                <Link href="/contacto" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Contacto
                </Link>
            </div>
        </div>
        <div className="border-t border-border py-4">
            <p className="text-center text-xs text-muted-foreground">
                &copy; {currentYear} YiChess. Todos los derechos reservados.
            </p>
        </div>
      </div>
    </footer>
  );
}
