'use client';

import React from 'react';
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type Piece = { 
    name: string; 
    description: string; 
    value: string | number; 
    imageUrl: string; 
};

const PieceInfoCard = ({ name, description, value, imageUrl }: Piece) => (
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

export function RulesPiecesCarousel({ pieces }: { pieces: Piece[] }) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
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
    );
}
