import type { Metadata } from 'next';
import { AppBreadcrumb } from '@/components/layout/breadcrumb';
import { BookOpen, BrainCircuit, Castle, Crown, Shield, Swords } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Estrategias y Tácticas',
  description: 'Descubre estrategias y tácticas de ajedrez, desde aperturas hasta jaque mate.',
};

const strategySections = [
    {
        title: 'Aperturas',
        description: 'Comienza tus partidas con el pie derecho. Aprende a controlar el centro y desarrollar tus piezas eficazmente desde los primeros movimientos.',
        strategies: [
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
        ]
    },
    {
        title: 'Tácticas y Jaque Mate',
        description: 'La táctica decide el resultado de la mayoría de las partidas. Agudiza tu visión para encontrar jugadas ganadoras y patrones de mate.',
        strategies: [
             {
                name: 'Patrones de Jaque Mate',
                description: 'El objetivo final del ajedrez. Aprende diferentes patrones para dar el golpe de gracia.',
                icon: <Swords className="size-10 text-primary" />,
                href: '#'
              },
        ]
    },
    {
        title: 'Estrategia y Planificación',
        description: 'Piensa a largo plazo. Aprende a crear planes, mejorar la posición de tus piezas y explotar las debilidades del oponente.',
        strategies: [
            {
                name: 'Estrategia General',
                description: 'Conceptos clave como el control del centro, desarrollo de piezas y estructura de peones.',
                icon: <BrainCircuit className="size-10 text-primary" />,
                href: '#'
            },
            {
                name: 'Enroque',
                description: 'Un movimiento especial para proteger a tu rey y activar tu torre. Es fundamental para la seguridad y la coordinación.',
                icon: <Castle className="size-10 text-primary" />,
                href: '#'
            },
        ]
    }
];
  

export default function StrategiesPage() {
  return (
    <div className="max-w-[1200px] w-full px-10">
      <AppBreadcrumb />
      <div className='max-w-5xl mx-auto'>
        <header className="text-center mb-16">
            <h1 className="text-[#1a1a1a] dark:text-white text-5xl font-extrabold leading-tight tracking-tight mb-6">Estrategias y Tácticas</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed max-w-3xl mx-auto">
                Domina el tablero aprendiendo desde las aperturas fundamentales hasta las tácticas de jaque mate más letales, organizadas para tu aprendizaje.
            </p>
        </header>

        <div className="space-y-16">
          {strategySections.map((section) => (
            <section key={section.title}>
              <div className="text-center mb-10 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{section.title}</h2>
                <p className="text-gray-500 dark:text-muted-foreground">{section.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.strategies.map((strategy) => (
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
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
