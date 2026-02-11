import type { Metadata } from 'next';
import Image from 'next/image';
import { AppBreadcrumb } from '@/components/layout/breadcrumb';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  title: 'Reglas del Ajedrez',
  description: 'Aprende las reglas básicas del ajedrez, el movimiento de las piezas y los conceptos fundamentales para empezar a jugar.',
};

const pieceImagesData = [
    { id: 'king', name: 'El Rey' },
    { id: 'queen', name: 'La Dama' },
    { id: 'rook', name: 'La Torre' },
    { id: 'bishop', name: 'El Alfil' },
    { id: 'knight', name: 'El Caballo' },
    { id: 'pawn', name: 'El Peón' },
  ].map(piece => {
    const imageData = PlaceHolderImages.find(p => p.id === piece.id);
    return {
      ...piece,
      imageUrl: imageData?.imageUrl,
      imageHint: imageData?.imageHint,
    }
  }).filter(p => p.imageUrl);


const pieces: { name: string; description: string; }[] = [
    {
        name: 'El Rey',
        description: 'La pieza más importante. Solo se mueve una casilla en cualquier dirección. Si está en jaque y no puede moverse, es jaque mate.',
    },
    {
        name: 'La Dama',
        description: 'La pieza más poderosa. Se mueve cualquier número de casillas en línea recta: horizontal, vertical o diagonalmente.',
    },
    {
        name: 'La Torre',
        description: 'Se mueve cualquier número de casillas horizontal o verticalmente. Es una pieza poderosa en filas y columnas abiertas.',
    },
    {
        name: 'El Alfil',
        description: 'Se mueve cualquier número de casillas en diagonal. Cada jugador tiene un alfil que se mueve en casillas claras y otro en oscuras.',
    },
    {
        name: 'El Caballo',
        description: 'Se mueve en forma de "L": dos casillas en una dirección y luego una en perpendicular. Es la única pieza que puede saltar sobre otras.',
    },
    {
        name: 'El Peón',
        description: 'Avanza una casilla, pero dos en su primer movimiento. Captura en diagonal. Puede coronar y convertirse en otra pieza.',
    },
];

const concepts: { title: string, description: string }[] = [
    { title: "El Tablero", description: "Un campo de batalla de 64 casillas, 32 claras y 32 oscuras, donde se desarrolla toda la acción." },
    { title: "Jaque y Jaque Mate", description: "El 'Jaque' es una amenaza directa al rey. El 'Jaque Mate' ocurre cuando el rey está en jaque y no tiene escapatoria, finalizando la partida." },
    { title: "El Enroque", description: "Un movimiento especial para proteger a tu rey y activar tu torre. Es el único momento en que mueves dos piezas a la vez." },
    { title: "Promoción del Peón", description: "Si un peón alcanza la última fila, se 'corona' y puede convertirse en una dama, torre, alfil o caballo." },
    { title: "Captura al Paso", description: "Una regla especial que permite a un peón capturar a un peón enemigo que ha avanzado dos casillas desde su posición inicial." },
    { title: "Tablas (Empate)", description: "Una partida puede terminar en empate de varias formas: por ahogado, acuerdo, repetición o la regla de los 50 movimientos." },
];

const RuleStep = ({ title, description, index, isLast }: { title: string, description: string, index: number, isLast: boolean }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-6">
            <div className="flex-shrink-0 z-10 size-9 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-primary">
                <span>{index + 1}</span>
            </div>
            {!isLast && <div className="w-px flex-grow bg-border" />}
        </div>
        <div className="flex-grow pt-1 pb-12">
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            <p className="text-muted-foreground mt-2 leading-relaxed">{description}</p>
        </div>
    </div>
);


export default function RulesPage() {
  return (
    <div className="max-w-[1200px] w-full px-10">
        <AppBreadcrumb />
        <div className='max-w-3xl mx-auto'>
            <header className="text-center mb-20">
                <h1 className="text-5xl font-extrabold text-foreground tracking-tighter mb-4">Reglas Fundamentales del Ajedrez</h1>
                <p className="text-lg font-light text-muted-foreground max-w-3xl mx-auto">
                    Comprender las reglas es el primer paso para dominar el juego. Aquí encontrarás todo lo que necesitas para empezar a jugar, desde el movimiento de las piezas hasta el objetivo final.
                </p>
            </header>

            <div className="space-y-20">

                <section>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground mb-10 text-center">Conoce las Piezas</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                        {pieceImagesData.map((piece) => (
                            <div key={piece.id} className="flex flex-col items-center text-center group">
                                <div className="bg-card p-4 rounded-2xl border border-border group-hover:border-primary/20 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 w-full aspect-square flex items-center justify-center">
                                    <Image
                                        src={piece.imageUrl!}
                                        alt={`Pieza de ajedrez: ${piece.name}`}
                                        width={120}
                                        height={120}
                                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                        data-ai-hint={piece.imageHint}
                                    />
                                </div>
                                <h3 className="mt-4 font-bold text-lg text-foreground group-hover:text-primary transition-colors">{piece.name}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground mb-10">Movimiento de las Piezas</h2>
                    <div className="flex flex-col">
                        {pieces.map((piece, index) => (
                            <RuleStep 
                                key={piece.name} 
                                title={piece.name} 
                                description={piece.description} 
                                index={index}
                                isLast={index === pieces.length - 1}
                            />
                        ))}
                    </div>
                </section>

                <section>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground mb-10">Conceptos Clave y Reglas Especiales</h2>
                  <div className="flex flex-col">
                    {concepts.map((concept, index) => (
                        <RuleStep 
                            key={concept.title}
                            title={concept.title} 
                            description={concept.description} 
                            index={index} 
                            isLast={index === concepts.length - 1}
                        />
                    ))}
                  </div>
                </section>
            </div>
        </div>
    </div>
  );
}
