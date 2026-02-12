import type { Metadata } from 'next';
import Link from 'next/link';
import { AppBreadcrumb } from '@/components/layout/breadcrumb';
import { Home, Gamepad2, Puzzle, BookOpen, BrainCircuit, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mapa del Sitio',
  description: 'Encuentra todas las secciones y páginas de YiChess en un solo lugar.',
};

const navLinks = [
    { href: "/", label: "Inicio", description: "Vuelve a la página principal.", icon: <Home className="size-8 text-primary" /> },
    { href: "/jugar", label: "Jugar", description: "Desafía a nuestra IA en una partida de ajedrez.", icon: <Gamepad2 className="size-8 text-primary" /> },
    { href: "/puzzles", label: "Puzzles", description: "Agudiza tu mente con nuestros puzzles de táctica.", icon: <Puzzle className="size-8 text-primary" /> },
    { href: "/reglas", label: "Reglas", description: "Aprende todo sobre el movimiento de las piezas y las reglas del juego.", icon: <BookOpen className="size-8 text-primary" /> },
    { href: "/estrategias", label: "Estrategias", description: "Explora aperturas, tácticas y conceptos estratégicos.", icon: <BrainCircuit className="size-8 text-primary" /> },
    { href: "/contacto", label: "Contacto", description: "Ponte en contacto con nosotros para cualquier consulta.", icon: <Mail className="size-8 text-primary" /> },
];

const SiteMapCard = ({ label, description, icon, href }: { label: string, description: string, icon: React.ReactNode, href: string }) => (
    <Link href={href} className="block h-full">
      <div className="group relative bg-card border border-border rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 flex items-start gap-5 overflow-hidden">
        <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 shrink-0 z-10">
          {icon}
        </div>
        <div className="flex flex-col z-10">
          <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{label}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
);


export default function MapaDelSitioPage() {
  return (
    <div className="max-w-[1200px] w-full px-10">
      <AppBreadcrumb />
      <div className='max-w-4xl mx-auto'>
        <header className="text-center mb-12 md:mb-16">
            <h1 className="text-5xl font-extrabold text-foreground tracking-tighter mb-4">Mapa del Sitio</h1>
            <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
                Navega fácilmente por todas las secciones de YiChess. Aquí tienes un resumen de todo nuestro contenido.
            </p>
        </header>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {navLinks.map((link) => (
              <SiteMapCard key={link.href} {...link} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
