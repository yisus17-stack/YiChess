import type { Metadata } from 'next';
import { AppBreadcrumb } from '@/components/layout/breadcrumb';

export const metadata: Metadata = {
  title: 'Reglas del Ajedrez',
  description: 'Aprende las reglas básicas del ajedrez, el movimiento de las piezas y los conceptos fundamentales para empezar a jugar.',
};

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

const RuleItem = ({ title, description, index }: { title: string, description: string, index: number }) => (
    <div className="group relative flex gap-6 sm:gap-8 border-b py-8 transition-colors first:border-t hover:bg-card">
        <div className="w-12 sm:w-16 shrink-0 text-center sm:text-right">
            <span className="text-3xl sm:text-4xl font-black text-foreground/10 transition-colors group-hover:text-primary">{`0${index + 1}`}</span>
        </div>
        <div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    </div>
);


export default function RulesPage() {
  return (
    <div className="max-w-[1200px] w-full px-10">
        <AppBreadcrumb />
        <div className='max-w-5xl mx-auto'>
            <header className="text-center mb-20">
                <h1 className="text-5xl font-extrabold text-foreground tracking-tighter mb-4">Reglas Fundamentales del Ajedrez</h1>
                <p className="text-lg font-light text-muted-foreground max-w-3xl mx-auto">
                    Comprender las reglas es el primer paso para dominar el juego. Aquí encontrarás todo lo que necesitas para empezar a jugar, desde el movimiento de las piezas hasta el objetivo final.
                </p>
            </header>

            <div className="space-y-20">
                <section>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">Movimiento de las Piezas</h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl">Cada pieza tiene un movimiento único. Conocer cómo se mueven es esencial para construir tu estrategia y anticipar los planes de tu oponente.</p>
                    <div>
                        {pieces.map((piece, index) => (
                            <RuleItem key={piece.name} title={piece.name} description={piece.description} index={index} />
                        ))}
                    </div>
                </section>

                <section>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">Conceptos Clave y Reglas Especiales</h2>
                  <div>
                    {concepts.map((concept, index) => (
                        <RuleItem key={concept.title} title={concept.title} description={concept.description} index={index} />
                    ))}
                  </div>
                </section>
            </div>
        </div>
    </div>
  );
}
