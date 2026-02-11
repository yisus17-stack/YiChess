import Link from 'next/link';
import { Logo } from '@/components/logo';

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-[1200px] mx-auto px-10 py-5">
        <div className="flex justify-center items-center">
            <p className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap justify-center text-center">
                <Link href="/" className="flex items-center gap-1.5 font-semibold text-foreground hover:text-primary transition-colors" aria-label="Volver al inicio de YiChess">
                    <Logo className="size-4" />
                    <span>YiChess</span>
                </Link>
                <span>&copy; {currentYear}</span>
                <span className="hidden sm:block">&bull;</span>
                <span>Todos los derechos reservados.</span>
            </p>
        </div>
      </div>
    </footer>
  );
}
