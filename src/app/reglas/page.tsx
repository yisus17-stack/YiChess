'use client';

import type { Metadata } from 'next';
import Image from 'next/image';
import { AppBreadcrumb } from '@/components/layout/breadcrumb';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
  } from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import React from 'react';

export const metadata: Metadata = {
  title: 'Reglas del Ajedrez',
  description: 'Aprende las reglas básicas del ajedrez, el movimiento de las piezas y los conceptos fundamentales para empezar a jugar.',
};

const pieces: { name: string; description: string; value: string | number; imageUrl: string; }[] = [
    {
        name: 'El Rey',
        description: 'La pieza más importante. Solo se mueve una casilla en cualquier dirección. Si está en jaque y no puede moverse, es jaque mate.',
        value: '∞',
        imageUrl: '/rey.png'
    },
    {
        name: 'La Dama',
        description: 'La pieza más poderosa. Se mueve cualquier número de casillas en línea recta: horizontal, vertical o diagonalmente.',
        value: 9,
        imageUrl: '/dama.png'
    },
    {
        name: 'La Torre',
        description: 'Se mueve cualquier número de casillas horizontal o verticalmente. Es una pieza poderosa en filas y columnas abiertas.',
        value: 5,
        imageUrl: '/torre.png'
    },
    {
        name: 'El Alfil',
        description: 'Se mueve cualquier número de casillas en diagonal. Cada jugador tiene un alfil que se mueve en casillas claras y otro en oscuras.',
        value: 3,
        imageUrl: '/alfil.png'
    },
    {
        name: 'El Caballo',
        description: 'Se mueve en forma de "L": dos casillas en una dirección y luego una en perpendicular. Es la única pieza que puede saltar sobre otras.',
        value: 3,
        imageUrl: '/caballo.png'
    },
    {
        name: 'El Peón',
        description: 'Avanza una casilla, pero dos en su primer movimiento. Captura en diagonal. Puede coronar y convertirse en otra pieza.',
        value: 1,
        imageUrl: '/peon.png'
    },
];

const concepts: { title: string, description: string }[] = [
    { title: "El Tablero", description: "Un campo de batalla de 64 casillas, 32 claras y 32 oscuras, donde se desarrolla toda la acción." },
    { title: "Jaque y Jaque Mate", description: "El 'Jaque' es una amenaza directa al rey. El 'Jaque Mate' ocurre cuando el rey está en jaque y no tiene escapatoria, finalizando la partida." },
    { title: "El Enroque", description: "Un movimiento especial para proteger a tu rey y activar tu torre. Es el único momento en que mueves dos piezas a la vez." },
    { title: "Promoción del Peón", description: "Si un peón alcanza la última fila, se 'corona' y puede convertirse en una dama, torre, alfil o caballo." },
    { title: "Captura al Paso", description: "Una regla especial que permite a un peón capturar a un peón enemigo que ha avanzado dos casillas desde su posición inicial." },
    { title: "Tablas (Empate)", description: "Una partida puede terminar en empate de varias formas: por ahogado, acuerdo, repetición o la regla de los 50 movimientos." },
];

const RuleStep = ({ title, description, index, isLast }: { title: string, description: string, index: number, isLast: boolean }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-6">
            <div className="flex-shrink-0 z-10 size-9 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-primary">
                <span>{index + 1}</span>
            </div>
            {!isLast && <div className="w-px flex-grow bg-border" />}
        </div>
        <div className="flex-grow pt-1 pb-12">
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            <p className="text-muted-foreground mt-2 leading-relaxed">{description}</p>
        </div>
    </div>
);

const PieceInfoCard = ({ name, description, value, imageUrl }: { name: string; description: string; value: string | number; imageUrl: string; }) => (
    <div className="bg-card border border-border/50 rounded-2xl">
      <div className="flex flex-col lg:flex-row items-center gap-8 p-8 md:p-12">
        <div className="flex-1 text-center lg:text-left">
          <p className="font-semibold text-primary mb-2 uppercase tracking-wider text-sm">
            {value === '∞' ? 'Pieza Clave' : `Valor: ${value} puntos`}
          </p>
          <h3 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            {name}
          </h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg">{description}</p>
          <div className="flex gap-4 justify-center lg:justify-start">
            <Button size="lg">Saber más</Button>
            <Button size="lg" variant="ghost">
              Ver ejemplos <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center lg:w-1/3">
          <Image
              src={imageUrl}
              alt={`Pieza de ajedrez: ${name}`}
              width={200}
              height={200}
              className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
);


export default function RulesPage() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="max-w-[1200px] w-full px-10">
        <AppBreadcrumb />
        <div className='max-w-4xl mx-auto'>
            <header className="text-center mb-20">
                <h1 className="text-5xl font-extrabold text-foreground tracking-tighter mb-4">Reglas Fundamentales del Ajedrez</h1>
                <p className="text-lg font-light text-muted-foreground max-w-3xl mx-auto">
                    Comprender las reglas es el primer paso para dominar el juego. Aquí encontrarás todo lo que necesitas para empezar a jugar, desde el movimiento de las piezas hasta el objetivo final.
                </p>
            </header>

            <div className="space-y-20">
                <section>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground mb-10 text-center">Movimiento y Valor de las Piezas</h2>
                    <Carousel className="w-full" setApi={setApi} opts={{ loop: true }}>
                        <CarouselContent>
                            {pieces.map((piece) => (
                                <CarouselItem key={piece.name}>
                                    <PieceInfoCard {...piece} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: count }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${current === index + 1 ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/50 hover:bg-muted-foreground'}`}
                            aria-label={`Ir a la diapositiva ${index + 1}`}
                          />
                        ))}
                    </div>
                </section>

                <section>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground mb-10">Conceptos Clave y Reglas Especiales</h2>
                  <div className="flex flex-col">
                    {concepts.map((concept, index) => (
                        <RuleStep 
                            key={concept.title}
                            title={concept.title} 
                            description={concept.description} 
                            index={index} 
                            isLast={index === concepts.length - 1}
                        />
                    ))}
                  </div>
                </section>
            </div>
        </div>
    </div>
  );
}