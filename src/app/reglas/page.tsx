import type { Metadata } from 'next';
import { AppBreadcrumb } from '@/components/layout/breadcrumb';
import { RulesPiecesCarousel } from '@/components/rules-pieces-carousel';

export const metadata: Metadata = {
  title: 'Reglas del Ajedrez',
  description: 'Aprende las reglas básicas del ajedrez, el movimiento de las piezas y los conceptos fundamentales para empezar a jugar.',
};

const pieces = [
    {
        name: 'El Rey',
        description: 'La pieza más importante. Solo se mueve una casilla en cualquier dirección. Si está en jaque y no puede moverse, es jaque mate.',
        value: '∞',
        imageUrl: '/rey.png',
        details: {
            title: "El Alma del Ajedrez: El Rey",
            history: "El Rey es la pieza más antigua y su movimiento ha permanecido casi sin cambios desde los orígenes del ajedrez en la India (Chaturanga). Su supervivencia es el objetivo del juego.",
            strengths: ["Esencial para la victoria.", "Puede apoyar a otras piezas en el final de la partida."],
            weaknesses: ["Movimiento muy limitado.", "Es el objetivo principal del oponente."],
            tip: "En el final, ¡el Rey se convierte en una pieza de ataque! No dudes en centralizarlo para controlar casillas clave y apoyar el avance de tus peones."
        }
    },
    {
        name: 'La Dama',
        description: 'La pieza más poderosa. Se mueve cualquier número de casillas en línea recta: horizontal, vertical o diagonalmente.',
        value: 9,
        imageUrl: '/dama.png',
        details: null
    },
    {
        name: 'La Torre',
        description: 'Se mueve cualquier número de casillas horizontal o verticalmente. Es una pieza poderosa en filas y columnas abiertas.',
        value: 5,
        imageUrl: '/torre.png',
        details: null
    },
    {
        name: 'El Alfil',
        description: 'Se mueve cualquier número de casillas en diagonal. Cada jugador tiene un alfil que se mueve en casillas claras y otro en oscuras.',
        value: 3,
        imageUrl: '/alfil.png',
        details: null
    },
    {
        name: 'El Caballo',
        description: 'Se mueve en forma de "L": dos casillas en una dirección y luego una en perpendicular. Es la única pieza que puede saltar sobre otras.',
        value: 3,
        imageUrl: '/caballo.png',
        details: null
    },
    {
        name: 'El Peón',
        description: 'Avanza una casilla, pero dos en su primer movimiento. Captura en diagonal. Puede coronar y convertirse en otra pieza.',
        value: 1,
        imageUrl: '/peon.png',
        details: null
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
        <div className='max-w-6xl mx-auto py-12'>
            <RulesPiecesCarousel pieces={pieces} />

            <section className="mt-20">
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
  );
}
