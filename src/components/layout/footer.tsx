import Link from 'next/link';
import { Logo } from '@/components/logo';

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-[1200px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-4">
                <Logo className="size-6" />
                <span className="font-bold text-[10px] uppercase tracking-[0.3em] text-gray-400">YiChess © {currentYear} • Professional Chess Platform</span>
            </div>
            <div className="flex gap-12">
                <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors" href="#">Términos</Link>
                <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors" href="#">Privacidad</Link>
                <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors" href="#">Soporte</Link>
            </div>
            <div className="flex gap-8">
                <span className="material-symbols-outlined text-gray-300 hover:text-black cursor-pointer text-2xl transition-colors">language</span>
                <span className="material-symbols-outlined text-gray-300 hover:text-black cursor-pointer text-2xl transition-colors">share</span>
            </div>
        </div>
    </footer>
  );
}
