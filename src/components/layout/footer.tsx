import Link from 'next/link';
import { Logo } from '@/components/logo';

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-6">
        <div className="max-w-[1200px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-4">
                <Logo className="size-6" />
                <span className="font-bold text-[10px] uppercase tracking-[0.3em] text-muted-foreground">YiChess © {currentYear} • Plataforma de Ajedrez</span>
            </div>
            <div className="flex gap-12">
                <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors" href="/jugar">Jugar</Link>
                <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors" href="/reglas">Reglas</Link>
                <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors" href="/puzzles">Puzzles</Link>
                <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors" href="/estrategias">Estrategias</Link>
            </div>
        
        </div>
    </footer>
  );
}
