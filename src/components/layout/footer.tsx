import Link from 'next/link';
import { Logo } from '@/components/logo';

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
        <div className="max-w-[1200px] mx-auto px-10 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
                <Link href="/" className="flex items-center gap-3" aria-label="Volver al inicio de YiChess">
                    <Logo className="size-7" />
                    <h2 className="text-foreground text-xl font-bold tracking-tight">YiChess</h2>
                </Link>
                <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Navegación principal del pie de página">
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/jugar">Jugar</Link>
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/reglas">Reglas</Link>
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/puzzles">Puzzles</Link>
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/estrategias">Estrategias</Link>
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/contacto">Contacto</Link>
                </nav>
            </div>
            <div className="mt-8 pt-6 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground">&copy; {currentYear} YiChess. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
  );
}
