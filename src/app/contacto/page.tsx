import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { AppBreadcrumb } from '@/components/layout/breadcrumb';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Envíanos tus sugerencias o comentarios sobre YiChess Simplificado.',
};

export default function ContactPage() {
  return (
    <div className="max-w-[1200px] w-full px-10">
      <AppBreadcrumb />
      <div className='max-w-2xl mx-auto'>
        <header className="text-center mb-12">
            <h1 className="text-[#1a1a1a] dark:text-white text-5xl font-extrabold leading-tight tracking-tight mb-6">Contacto</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed max-w-xl mx-auto">
            ¿Tienes alguna sugerencia o comentario? Nos encantaría saber de ti.
            </p>
        </header>
        <ContactForm />
      </div>
    </div>
  );
}
