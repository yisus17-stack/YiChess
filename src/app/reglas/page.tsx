import type { Metadata } from 'next';
import Image from 'next/image';
import { AppBreadcrumb } from '@/components/layout/breadcrumb';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { ChessPiece } from '@/lib/definitions';

export const metadata: Metadata = {
  title: 'Reglas del Ajedrez',
  description: 'Aprende las reglas básicas del ajedrez, el movimiento de las piezas y los conceptos fundamentales para empezar a jugar.',
};

const piecesData: { name: string; id: string; description: string }[] = [
    { name: 'El Rey', id: 'king', description: 'El rey es la pieza más importante. Puede moverse una casilla en cualquier dirección: horizontal, vertical o diagonal. El objetivo del juego es dar jaque mate al rey del oponente.' },
    { name: 'La Dama', id: 'queen', description: 'La dama (o reina) es la pieza más poderosa. Puede moverse cualquier número de casillas en línea recta, ya sea horizontal, vertical o diagonalmente.' },
    { name: 'La Torre', id: 'rook', description: 'La torre se mueve cualquier número de casillas en línea recta, horizontal o verticalmente. También participa en un movimiento especial llamado enroque.' },
    { name: 'El Alfil', id: 'bishop', description: 'El alfil se mueve cualquier número de casillas en diagonal. Cada jugador empieza con dos alfiles, uno en casillas claras y otro en casillas oscuras.' },
    { name: 'El Caballo', id: 'knight', description: 'El caballo se mueve en forma de "L": dos casillas en una dirección (horizontal o vertical) y luego una casilla en una dirección perpendicular. Es la única pieza que puede saltar sobre otras.' },
    { name: 'El Peón', id: 'pawn', description: 'El peón se mueve hacia adelante una casilla. En su primer movimiento, puede avanzar dos casillas. Captura en diagonal, una casilla hacia adelante. Si un peón llega al otro extremo del tablero, puede "promocionar" a cualquier otra pieza (excepto el rey).' },
];

const chessPieces: ChessPiece[] = piecesData.map(p => {
    const imageData = PlaceHolderImages.find(img => img.id === p.id);
    return {
        name: p.name,
        description: p.description,
        imageUrl: imageData?.imageUrl || 'https://placehold.co/600x400',
        imageHint: imageData?.imageHint || 'chess piece'
    }
});


export default function RulesPage() {
  return (
    <div className="max-w-[1200px] w-full px-10">
      <AppBreadcrumb />
      <div className='max-w-4xl mx-auto'>
        <header className="text-center mb-16">
            <h1 className="text-[#1a1a1a] dark:text-white text-5xl font-extrabold leading-tight tracking-tight mb-6">Reglas del Ajedrez</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed max-w-xl mx-auto">
                Aquí tienes una guía visual de cada pieza. Aprende sus movimientos y domina el tablero.
            </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {chessPieces.map((piece) => (
                <Card key={piece.name} className="rounded-2xl bg-card shadow-lg border-transparent hover:shadow-2xl transition-all duration-300 group flex flex-col">
                    <div className="overflow-hidden rounded-t-2xl">
                        <Image
                            src={piece.imageUrl}
                            alt={`Imagen de la pieza de ajedrez: ${piece.name}`}
                            width={600}
                            height={400}
                            data-ai-hint={piece.imageHint}
                            className="object-cover aspect-[16/9] w-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
                        />
                    </div>
                    <CardHeader className="p-6">
                        <CardTitle className="text-2xl font-bold text-card-foreground">{piece.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 flex-grow">
                        <p className="text-base text-muted-foreground leading-relaxed">
                            {piece.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
