import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inicio | YiChess',
};

export default function HomePage() {
  
  return (
    <>
      <div className="w-full">
        <div className="max-w-[1200px] w-full mx-auto px-10 py-16 md:py-24">
            <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 text-left">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 block mb-4">Plataforma de Ajedrez</span>
                <h1 className="text-[#1a1a1a] text-6xl font-extrabold leading-tight tracking-tighter mb-8">
                Aprende acerca de ajedrez con <span className="text-primary">YiChess</span>
                </h1>
                <p className="text-gray-600 text-xl font-light leading-relaxed max-w-lg mb-10">
                La plataforma para ajedrecistas que buscan aprender. Aprende jugadas, movimientos, piezas y estrategias.
                </p>
                <div className="flex gap-4">
                <Link href="/jugar">
                  <button className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-black transition-all" >Empezar ahora</button>
                </Link>
                <Link href="/reglas">
                  <button className="border border-gray-200 text-primary px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-gray-50 transition-all">Ver reglas</button>
                </Link>
                </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-4/12 flex items-center justify-center">
                <Image
                    alt="YiChess Pro"
                    className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700"
                    src="/chessin-hero.png"
                    width={480}
                    height={480}
                    />
            </div>
            </div>
        </div>
      </div>
      <div className="max-w-[1200px] w-full mx-auto px-10 mb-24">
        <div className="bg-primary rounded-3xl p-16 text-center flex flex-col items-center gap-10 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-5">
              <span className="material-symbols-outlined text-[300px] text-white">chess</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight z-10">
              Comienza con YiChess Hoy Mismo
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl z-10 leading-relaxed">
              Mejora tus habilidades de ajedrez con YiChess.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 z-10">
              <Link href="/jugar" className="bg-white text-black font-black py-5 px-12 rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-[0.2em] shadow-lg">
                  Empezar a jugar
              </Link>
              <Link href="/reglas" className="bg-transparent border border-gray-700 text-white font-bold py-5 px-12 rounded-xl hover:bg-gray-800 transition-all text-sm uppercase tracking-[0.2em]">
                  Explorar Reglas
              </Link>
          </div>
        </div>
      </div>
     
      
    </>
  );
}
