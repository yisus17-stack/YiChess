import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 md:py-20 max-w-[1200px] w-full px-10">
      <h1 className="text-8xl font-black text-primary">404</h1>
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Página No Encontrada</h2>
      <p className="mt-4 text-lg text-gray-600">
        Lo sentimos ajedrecista, no pudimos encontrar la página que estás buscando.
      </p>
      <Button asChild className="mt-10 bg-primary text-white font-bold py-4 px-10 rounded-lg hover:bg-black transition-all text-sm uppercase tracking-widest shadow-lg">
        <Link href="/">Volver al Inicio</Link>
      </Button>
    </div>
  );
}
