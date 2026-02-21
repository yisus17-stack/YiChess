import type { Metadata } from 'next';
import { AppBreadcrumb } from '@/components/layout/breadcrumb';
import { ChessGame } from '@/components/chess-game';

export const metadata: Metadata = {
  title: 'Jugar Ajedrez',
  description: 'Juega una partida de ajedrez local con reglas oficiales. Practica tus movimientos y mejora tu juego en YiChess.',
};

export default function JugarPage() {
  return (
    <div className="max-w-[1200px] w-full px-4 sm:px-10">
      <AppBreadcrumb />
      <div className='max-w-6xl mx-auto'>
        <header className="mb-10 md:mb-16 text-center md:text-left">
            <h1 className="text-foreground text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter mb-4">
              Partida Local
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed max-w-3xl">
                Disfruta de una partida de ajedrez limpia y profesional. Nuestro tablero aplica todas las reglas oficiales de la FIDE: enroque, capturas al paso y validación de jaques.
            </p>
        </header>
        
        <ChessGame />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border pt-12 pb-20">
          <div className="space-y-3">
            <h3 className="font-bold text-lg">Reglas Oficiales</h3>
            <p className="text-muted-foreground text-sm">Validación estricta de movimientos según las normas internacionales.</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg">Interfaz Fluida</h3>
            <p className="text-muted-foreground text-sm">Diseño optimizado para una experiencia de juego sin distracciones.</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg">Enfoque Educativo</h3>
            <p className="text-muted-foreground text-sm">Visualiza tu historial de movimientos para analizar tu estrategia.</p>
          </div>
        </div>
      </div>
    </div>
  );
}