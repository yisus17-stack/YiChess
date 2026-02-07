import type { Metadata } from 'next';
import { AppBreadcrumb } from '@/components/layout/breadcrumb';
import { BookOpen, BrainCircuit, Castle, Crown, Shield, Swords, Zap, Goal, UnfoldVertical, Pin, GitFork, Windmill } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Estrategias y Tácticas',
  description: 'Descubre estrategias y tácticas de ajedrez, desde aperturas hasta jaque mate.',
};

const strategies = [
  {
    name: 'Principios de Apertura',
    description: 'Explora las ideas fundamentales para empezar tus partidas con una sólida ventaja.',
    icon: <BookOpen className="size-10 text-primary" />,
    href: '#'
  },
  {
    name: 'Gambito de Dama',
    description: 'Una de las aperturas más antiguas y respetadas. Aprende a dominarla.',
    icon: <Crown className="size-10 text-primary" />,
    href: '#'
  },
  {
    name: 'Defensa Siciliana',
    description: 'La respuesta más popular y agresiva contra 1.e4. Descubre sus secretos.',
    icon: <Shield className="size-10 text-primary" />,
    href: '#'
  },
  {
    name: 'Estrategia General',
    description: 'Conceptos clave como el control del centro, desarrollo de piezas y estructura de peones.',
    icon: <BrainCircuit className="size-10 text-primary" />,
    href: '#'
  },
  {
    name: 'Enroque',
    description: 'Un movimiento especial para proteger a tu rey y activar tu torre. Es fundamental para la seguridad.',
    icon: <Castle className="size-10 text-primary" />,
    href: '#'
  },
  {
    name: 'La Clavada',
    description: 'Inmovilizar una pieza enemiga porque si se mueve, expondría a otra pieza más valiosa.',
    icon: <Pin className="size-10 text-primary" />,
    href: '#'
  },
  {
    name: 'La Horquilla',
    description: 'Un ataque de una sola pieza a dos o más piezas enemigas simultáneamente. Muy efectivo.',
    icon: <GitFork className="size-10 text-primary" />,
    href: '#'
  },
  {
    name: 'Ataque a la Descubierta',
    description: 'Mover una pieza para desatar un ataque de otra. Una táctica poderosa y a menudo sorprendente.',
    icon: <UnfoldVertical className="size-10 text-primary" />,
    href: '#'
  },
  {
    name: 'El Molino',
    description: 'Una rara pero devastadora táctica que combina jaques a la descubierta repetidos para ganar material.',
    icon: <Windmill className="size-10 text-primary" />,
    href: '#'
  },
  {
    name: 'Patrones de Jaque Mate',
    description: 'El objetivo final del ajedrez. Aprende diferentes patrones para dar el golpe de gracia.',
    icon: <Swords className="size-10 text-primary" />,
    href: '#'
  },
  {
    name: 'Jaque Mate de Coz',
    description: 'Un espectacular mate dado por un caballo cuando el rey enemigo está ahogado por sus propias piezas.',
    icon: <Zap className="size-10 text-primary" />,
    href: '#'
  },
  {
    name: 'Jaque del Pasillo',
    description: 'Un mate común en la octava fila, aprovechando que el rey no puede escapar hacia adelante.',
    icon: <Goal className="size-10 text-primary" />,
    href: '#'
  },
];

export default function StrategiesPage() {
  return (
    <div className="max-w-[1200px] w-full px-10">
      <AppBreadcrumb />
      <div className='max-w-4xl mx-auto'>
        <header className="text-center mb-16">
            <h1 className="text-[#1a1a1a] dark:text-white text-5xl font-extrabold leading-tight tracking-tight mb-6">Estrategias y Tácticas</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                Domina el tablero aprendiendo desde las aperturas fundamentales hasta las tácticas de jaque mate más letales.
            </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strategies.map((strategy) => (
            <Link href={strategy.href} key={strategy.name}>
              <div className="group bg-white dark:bg-card border border-gray-100 dark:border-border rounded-xl p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="mb-6">
                  {strategy.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{strategy.name}</h3>
                <p className="text-gray-500 dark:text-muted-foreground text-sm leading-relaxed">{strategy.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
