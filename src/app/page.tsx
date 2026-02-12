import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { GraduationCap, BrainCog, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Inicio | YiChess',
};

const features = [
  {
    icon: <GraduationCap className="size-10 text-primary" />,
    title: 'Aprende y Domina',
    description: 'Desde los movimientos básicos hasta estrategias complejas, te guiamos en cada paso de tu aprendizaje.',
    href: '/reglas'
  },
  {
    icon: <BrainCog className="size-10 text-primary" />,
    title: 'Entrena tu Mente',
    description: 'Resuelve miles de puzzles tácticos adaptados a tu nivel y afila tu visión de juego.',
    href: '/puzzles'
  },
  {
    icon: <Trophy className="size-10 text-primary" />,
    title: 'Compite y Gana',
    description: 'Mide tus habilidades contra nuestra IA avanzada o desafía a otros jugadores en partidas emocionantes.',
    href: '/jugar'
  }
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full bg-background relative overflow-hidden">
        <div className="max-w-[1200px] w-full mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20 md:py-28 relative z-10">
            <div className="text-center md:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tighter mb-6 animate-fadeInSoft">
                Aprende de ajedrez en <span className="text-primary">YiChess</span>
              </h1>
              <p className="max-w-2xl mx-auto md:mx-0 text-lg text-muted-foreground font-light leading-relaxed mb-10">
                La plataforma para ajedrecistas que buscan aprender. Aprende jugadas, movimientos, piezas y estrategias.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto mx-auto md:mx-0">
                <Link href="/jugar" className="inline-block w-full sm:w-auto text-center bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Empezar a Jugar
                </Link>
                <Link href="/estrategias" className="inline-block w-full sm:w-auto text-center border border-border text-primary px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-accent transition-all">
                  Explorar Estrategias
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center md:justify-start">
                <Image
                    src="/chessin-hero.png"
                    alt="Héroe de Ajedrez"
                    width={300}
                    height={300}
                    className="object-contain drop-shadow-2xl"
                    priority
                />
            </div>
          </div>
        </div>
        <div className="absolute -right-40 -top-20 opacity-[0.03] text-foreground -z-0">
             <svg className="size-[600px]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="w-full bg-muted/30">
        <div className="max-w-[1200px] w-full mx-auto px-10 py-20 md:py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Todo lo que necesitas para ser un Gran Maestro
            </h2>
            <p className="mt-4 text-muted-foreground">
              YiChess te proporciona las herramientas y la comunidad para crecer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Link href={feature.href} key={feature.title} className="group block">
                <div className="bg-card border border-border/50 rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1">
                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 w-max mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Card Section */}
      <div className="max-w-[1200px] w-full mx-auto px-10 py-20">
        <div className="bg-primary rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 text-center">
            <h1 className="text-2xl md:text-5xl font-bold text-primary-foreground tracking-tight">
              Comienza con YiChess Hoy Mismo
            </h1>
            <p className="text-primary-foreground/80 text-base font-light max-w-2xl leading-relaxed mt-4 mx-auto">
              Mejora tus habilidades de ajedrez con YiChess.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 z-10 mt-8 justify-center">
              <Link href="/puzzles" className="text-center bg-background text-foreground font-black py-6 px-12 rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-[0.2em] shadow-lg">
                Resolver Puzzles
              </Link>
              <Link href="/estrategias" className="text-center bg-transparent border border-primary-foreground/40 text-primary-foreground font-bold py-6 px-12 rounded-xl hover:bg-primary-foreground/10 transition-all text-sm uppercase tracking-[0.2em]">
                Aprender Estrategias
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
