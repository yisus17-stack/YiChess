import type { Metadata } from 'next';
import { AppBreadcrumb } from '@/components/layout/breadcrumb';
import { RulesPiecesTabs } from '@/components/rules-pieces-tabs';

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
            title: "El Rey",
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
        details: {
            title: "La Dama",
            history: "Originalmente una de las piezas más débiles (el 'ferz'), que solo se movía una casilla en diagonal. Su transformación a la pieza más poderosa en el siglo XV revolucionó el ajedrez europeo.",
            strengths: ["Movilidad excepcional.", "Capaz de atacar y defender simultáneamente en todo el tablero."],
            weaknesses: ["Es una pieza tan valiosa que su pérdida es casi siempre decisiva.", "Puede ser un objetivo para tácticas y amenazas."],
            tip: "No desarrolles tu dama demasiado pronto. Usarla al principio de la partida puede hacer que pierdas tiempos valiosos mientras el oponente la ataca con piezas de menor valor."
        }
    },
    {
        name: 'La Torre',
        description: 'Se mueve cualquier número de casillas horizontal o verticalmente. Es una pieza poderosa en filas y columnas abiertas.',
        value: 5,
        imageUrl: '/torre.png',
        details: {
            title: "La Torre",
            history: "Representa los carros de guerra en el ajedrez persa (el 'rukh'). Su movimiento simple pero poderoso la convierte en una pieza fundamental, especialmente en el final de la partida.",
            strengths: ["Controla filas y columnas enteras.", "Excelente para dar mates en la última fila ('back-rank mate')."],
            weaknesses: ["Es menos efectiva en posiciones cerradas y llenas de peones.", "Vulnerable a los ataques diagonales de los alfiles."],
            tip: "Una torre en la séptima fila es una ventaja posicional enorme. Puede atacar peones, restringir al rey enemigo y crear múltiples amenazas."
        }
    },
    {
        name: 'El Alfil',
        description: 'Se mueve cualquier número de casillas en diagonal. Cada jugador tiene un alfil que se mueve en casillas claras y otro en oscuras.',
        value: 3,
        imageUrl: '/alfil.png',
        details: {
            title: "El Alfil",
            history: "Simbolizaba a los elefantes en las primeras versiones del ajedrez ('gaja'). Su movimiento diagonal lo hace único y muy útil para crear amenazas a larga distancia.",
            strengths: ["Excelente en posiciones abiertas.", "La pareja de alfiles puede controlar una gran cantidad de casillas de ambos colores."],
            weaknesses: ["Limitado a casillas de un solo color.", "Puede quedar atrapado detrás de su propia cadena de peones."],
            tip: "Piensa en tus alfiles como 'alfil bueno' y 'alfil malo'. El 'bueno' es el que se mueve en casillas de color opuesto a tus peones centrales, el 'malo' está restringido por ellos."
        }
    },
    {
        name: 'El Caballo',
        description: 'Se mueve en forma de "L": dos casillas en una dirección y luego una en perpendicular. Es la única pieza que puede saltar sobre otras.',
        value: 3,
        imageUrl: '/caballo.png',
        details: {
            title: "El Caballo",
            history: "Su movimiento en 'L' es uno de los más antiguos y se ha mantenido sin cambios desde los inicios del ajedrez. Representa la caballería y su capacidad de saltar sobre obstáculos.",
            strengths: ["Puede saltar sobre otras piezas.", "Excelente en posiciones cerradas y para crear horquillas (forks)."],
            weaknesses: ["Es una pieza de corto alcance.", "Un caballo en el borde del tablero controla menos casillas y es menos poderoso."],
            tip: "¡Un caballo en el borde es una deshonra! (A knight on the rim is dim). Intenta mantener tus caballos cerca del centro del tablero para maximizar su poder."
        }
    },
    {
        name: 'El Peón',
        description: 'Avanza una casilla, pero dos en su primer movimiento. Captura en diagonal. Puede coronar y convertirse en otra pieza.',
        value: 1,
        imageUrl: '/peon.png',
        details: {
            title: "El Peón",
            history: "Considerado el 'alma del ajedrez' por Philidor. Representa la infantería. Aunque individualmente es la pieza más débil, la estructura de peones a menudo decide el resultado de la partida.",
            strengths: ["Pueden controlar casillas importantes.", "La posibilidad de coronar los convierte en una amenaza en el final."],
            weaknesses: ["Movilidad muy limitada.", "Un peón aislado o retrasado puede ser una debilidad estructural grave."],
            tip: "La mayoría de las partidas se ganan o se pierden por la estrategia de peones. Avanza tus peones con cuidado y busca crear 'peones pasados' en el final."
        }
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
        <div className='max-w-6xl mx-auto'>
            <RulesPiecesTabs pieces={pieces} />

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
