import type { Metadata } from 'next';
import { AppBreadcrumb } from '@/components/layout/breadcrumb';

export const metadata: Metadata = {
  title: 'Reglas del Ajedrez',
  description: 'Aprende las reglas básicas del ajedrez, el movimiento de las piezas y los conceptos fundamentales para empezar a jugar.',
};

export default function RulesPage() {
  return (
    <div className="max-w-[1200px] w-full px-10">
      <AppBreadcrumb />
      <div className='max-w-2xl mx-auto'>
        <header className="text-center mb-12">
            <h1 className="text-[#1a1a1a] dark:text-white text-5xl font-extrabold leading-tight tracking-tight mb-6">Reglas del Ajedrez</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed max-w-xl mx-auto">
                Esta sección está en construcción.
            </p>
        </header>
      </div>
    </div>
  );
}
