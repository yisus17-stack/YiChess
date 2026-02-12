import type { Metadata } from 'next';
import { AppBreadcrumb } from '@/components/layout/breadcrumb';
import { BookOpen, BrainCircuit, Castle, Crown, Shield, Swords, Zap, Goal, UnfoldVertical, Pin, GitFork, Wind } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Estrategias y Tácticas',
  description: 'Descubre estrategias y tácticas de ajedrez, desde aperturas hasta jaque mate.',
};

// Section 1: Openings
const openings = [
  {
    name: 'Principios de Apertura',
    description: 'Controla el centro y desarrolla tus piezas para una sólida ventaja inicial.',
    icon: <BookOpen className="size-8 text-primary" />,
    href: '#'
  },
  {
    name: 'Gambito de Dama',
    description: 'Una apertura clásica y respetada que busca el control posicional.',
    icon: <Crown className="size-8 text-primary" />,
    href: '#'
  },
  {
    name: 'Defensa Siciliana',
    description: 'La respuesta más popular y agresiva contra 1.e4. Lucha por la iniciativa.',
    icon: <Shield className="size-8 text-primary" />,
    href: '#'
  },
  {
    name: 'Enroque',
    description: 'Un movimiento esencial para proteger a tu rey y conectar tus torres.',
    icon: <Castle className="size-8 text-primary" />,
    href: '#'
  },
];

// Section 2: Tactics
const tactics = [
  {
    name: 'La Clavada (Pin)',
    description: 'Inmoviliza una pieza enemiga para restringir su movimiento y crear amenazas.',
    icon: <Pin className="size-8 text-primary" />,
    href: '#'
  },
  {
    name: 'La Horquilla (Fork)',
    description: 'Ataca dos o más piezas enemigas simultáneamente con una sola pieza.',
    icon: <GitFork className="size-8 text-primary" />,
    href: '#'
  },
  {
    name: 'Ataque a la Descubierta',
    description: 'Mueve una pieza para desatar un ataque oculto de una pieza poderosa.',
    icon: <UnfoldVertical className="size-8 text-primary" />,
    href: '#'
  },
  {
    name: 'El Molino (Windmill)',
    description: 'Una rara pero devastadora táctica que combina jaques a la descubierta repetidos.',
    icon: <Wind className="size-8 text-primary" />,
    href: '#'
  },
];

// Section 3: Strategy & Mates
const strategyAndMates = [
  {
    name: 'Estrategia General',
    description: 'Aprende a crear planes a largo plazo, controlar el tablero y coordinar tus piezas.',
    icon: <BrainCircuit className="size-8 text-primary" />,
    href: '#'
  },
  {
    name: 'Patrones de Jaque Mate',
    description: 'Aprende las secuencias finales para dar el golpe de gracia a tu oponente.',
    icon: <Swords className="size-8 text-primary" />,
    href: '#'
  },
  {
    name: 'Jaque Mate de Coz',
    description: 'Un mate espectacular dado por un caballo cuando el rey está ahogado.',
    icon: <Zap className="size-8 text-primary" />,
    href: '#'
  },
  {
    name: 'Jaque del Pasillo',
    description: 'Un mate común en la última fila, atrapando al rey sin escapatoria.',
    icon: <Goal className="size-8 text-primary" />,
    href: '#'
  },
];

const StrategyCard = ({ name, description, icon, href }: { name: string, description: string, icon: React.ReactNode, href: string }) => (
    <Link href={href} className="block h-full">
      <div className="group relative bg-card border border-border rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 flex items-start gap-5 overflow-hidden">
        <span className="absolute -bottom-2 -right-1 text-[100px] font-black text-foreground/5 select-none z-0">
          {name.charAt(0).toUpperCase()}
        </span>
        <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 shrink-0 z-10">
          {icon}
        </div>
        <div className="flex flex-col z-10">
          <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{name}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  );


export default function StrategiesPage() {
  return (
    <div className="max-w-[1200px] w-full px-10">
      <AppBreadcrumb />
      <div className='max-w-5xl mx-auto'>
        <header className="text-center mb-12 md:mb-20">
            <h1 className="text-5xl font-extrabold text-foreground tracking-tighter mb-4">Domina el Arte del Ajedrez</h1>
            <p className="text-lg font-light text-muted-foreground max-w-3xl mx-auto">
                Explora los conceptos fundamentales, desde las aperturas más sólidas hasta las tácticas más letales. Cada lección te acerca a la maestría del tablero.
            </p>
        </header>

        <div className="space-y-12 md:space-y-20">
            <section>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">Aperturas y Desarrollo</h2>
              <p className="text-muted-foreground mb-6 md:mb-8 max-w-2xl">Los primeros movimientos son cruciales. Aprende a construir una base sólida para tus partidas y a tomar el control desde el inicio.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {openings.map((strategy) => (
                  <StrategyCard key={strategy.name} {...strategy} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">Tácticas Fundamentales</h2>
              <p className="text-muted-foreground mb-6 md:mb-8 max-w-2xl">La táctica decide la mayoría de las partidas. Aprende a crear oportunidades, a explotar las debilidades de tu oponente y a ganar material.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tactics.map((strategy) => (
                  <StrategyCard key={strategy.name} {...strategy} />
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">Estrategia y Jaque Mate</h2>
              <p className="text-muted-foreground mb-6 md:mb-8 max-w-2xl">Piensa a largo plazo y finaliza la partida. Reconoce y ejecuta los mates ganadores para asegurar la victoria.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {strategyAndMates.map((strategy) => (
                  <StrategyCard key={strategy.name} {...strategy} />
                ))}
              </div>
            </section>
        </div>

      </div>
    </div>
  );
}
