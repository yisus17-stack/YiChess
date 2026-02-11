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
              <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground block mb-4">Plataforma de Ajedrez</span>
              <h1 className="text-[#1a1a1a] text-6xl font-extrabold leading-tight tracking-tighter mb-8">
                Aprende de ajedrez en <span className="text-primary">YiChess</span>
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
              <div className="animate-fadeInSoft">
                <Image
                  alt="YiChess Pro"
                  className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700"
                  src="/chessin-hero.png"
                  width={480}
                  height={480}
                  priority
                />
              </div>
            </div>


          </div>
        </div>
      </div>
      <div className="max-w-[1200px] w-full mx-auto px-10">
        <div className="bg-primary rounded-3xl p-16 text-center flex flex-col items-center gap-10 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-5">
            <svg className="text-white size-[300px]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight z-10">
            Comienza con YiChess Hoy Mismo
          </h1>
          <p className="text-gray-300 text-lg font-light max-w-2xl z-10 leading-relaxed">
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
