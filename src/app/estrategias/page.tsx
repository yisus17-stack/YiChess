import type { Metadata } from 'next';
import { AppBreadcrumb } from '@/components/layout/breadcrumb';

export const metadata: Metadata = {
  title: 'Estrategias y Tácticas',
  description: 'Descubre estrategias y tácticas de ajedrez. Sección en construcción.',
};

export default function StrategiesPage() {
  return (
    <div className="max-w-[1200px] w-full px-10">
      <AppBreadcrumb />
      <div className='max-w-2xl mx-auto'>
        <header className="text-center mb-12">
            <h1 className="text-[#1a1a1a] dark:text-white text-5xl font-extrabold leading-tight tracking-tight mb-6">Estrategias y Tácticas</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed max-w-xl mx-auto">
                Esta sección está en construcción. ¡Pronto podrás aprender las mejores estratégias del juego!
            </p>
        </header>
      </div>
    </div>
  );
}
