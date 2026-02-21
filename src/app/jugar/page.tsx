
import type { Metadata } from 'next';
import { AppBreadcrumb } from '@/components/layout/breadcrumb';
import { ChessGame } from '@/components/chess-game';

export const metadata: Metadata = {
  title: 'Jugar Ajedrez',
  description: 'Juega una partida de ajedrez con reglas oficiales. Practica tus movimientos y mejora tu juego.',
};

export default function JugarPage() {
  return (
    <div className="max-w-[1200px] w-full px-10">
      <AppBreadcrumb />
      <div className='max-w-6xl mx-auto'>
        <header className="mb-8 md:mb-12">
            <h1 className="text-foreground text-5xl font-extrabold leading-tight tracking-tight mb-4">Partida de Ajedrez</h1>
            <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-2xl">
                Pon a prueba tus conocimientos en un tablero con reglas oficiales. Puedes mover las piezas libremente siguiendo las normas del ajedrez profesional.
            </p>
        </header>
        
        <ChessGame />
      </div>
    </div>
  );
}
