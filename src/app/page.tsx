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
                <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 block mb-4">Elite Chess Platform</span>
                <h1 className="text-[#1a1a1a] text-6xl font-extrabold leading-tight tracking-tighter mb-8">
                Eleva tu juego a un nivel profesional.
                </h1>
                <p className="text-gray-600 text-xl font-light leading-relaxed max-w-lg mb-10">
                La plataforma definitiva para ajedrecistas que buscan la excelencia. Análisis táctico avanzado, torneos internacionales y una comunidad de élite.
                </p>
                <div className="flex gap-4">
                <button className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-black transition-all">Empezar ahora</button>
                <button className="border border-gray-200 text-primary px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-gray-50 transition-all">Ver Rankings</button>
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
              Únete a la élite del ajedrez mundial
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl z-10 leading-relaxed">
              Mejora tu ELO, participa en torneos exclusivos con premios en metálico y analiza tus partidas con el motor de IA más potente del mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 z-10">
              <button className="bg-white text-black font-black py-5 px-12 rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-[0.2em] shadow-lg">
                  Empezar a jugar
              </button>
              <button className="bg-transparent border border-gray-700 text-white font-bold py-5 px-12 rounded-xl hover:bg-gray-800 transition-all text-sm uppercase tracking-[0.2em]">
                  Explorar Planes
              </button>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-b border-gray-100 bg-gray-50/30">
        <div className="max-w-[1200px] mx-auto px-10 grid grid-cols-1 md:grid-cols-4 py-12">
          <div className="text-center md:text-left md:px-8 vertical-divider">
            <h4 className="text-3xl font-bold mb-1">500k+</h4>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Jugadores Activos</p>
          </div>
          <div className="text-center md:text-left md:px-8 vertical-divider">
            <h4 className="text-3xl font-bold mb-1">2.8k</h4>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">GMs Registrados</p>
          </div>
          <div className="text-center md:text-left md:px-8 vertical-divider">
            <h4 className="text-3xl font-bold mb-1">15M+</h4>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Partidas Diarias</p>
          </div>
          <div className="text-center md:text-left md:px-8">
            <h4 className="text-3xl font-bold mb-1">99.9%</h4>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Uptime Garantizado</p>
          </div>
        </div>
      </div>
      <section className="max-w-[1200px] w-full mx-auto px-10 py-24">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="h-1 w-12 bg-black mb-6"></div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">Últimas Estrategias</h2>
          </div>
          <Link href="/estrategias" className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors flex items-center gap-2">
            Ver todas <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300">
            <div className="size-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <h3 className="text-xl font-bold mb-4">El Gambito de Dama Moderno</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">Un análisis profundo sobre las nuevas líneas adoptadas por la élite mundial en 2024.</p>
            <div className="flex items-center gap-2">
              <div className="size-6 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px]">person</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">GM Alex Volkov</span>
            </div>
          </div>
          <div className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300">
            <div className="size-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">grid_view</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Finales de Torre y Peón</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">La guía definitiva para salvar medio punto en posiciones críticas de final de partida.</p>
            <div className="flex items-center gap-2">
              <div className="size-6 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px]">person</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">IM Elena Rossi</span>
            </div>
          </div>
          <div className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300">
            <div className="size-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Patrones Tácticos en Blitz</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">Identifica oportunidades de mate en milisegundos con nuestro entrenamiento especializado.</p>
            <div className="flex items-center gap-2">
              <div className="size-6 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px]">person</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">WGM Sophie Chen</span>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
}
