'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { ArrowRight, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type Piece = { 
    name: string; 
    description: string; 
    value: string | number; 
    imageUrl: string; 
    details: {
        title: string;
        history: string;
        strengths: string[];
        weaknesses: string[];
        tip: string;
    } | null;
};

const PieceInfoCard = ({ name, description, value, imageUrl, details }: Piece) => (
    <Dialog>
        <div className="bg-gradient-to-br from-card to-muted border border-border/50 rounded-2xl h-full flex flex-col">
          <div className="flex flex-1 flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 p-8 md:p-12">
            <div className="flex-[2] text-center lg:text-left">
              <p className="font-semibold text-primary mb-2 uppercase tracking-wider text-sm md:text-base">
                {value === '∞' ? 'Pieza Clave' : `Valor: ${value} puntos`}
              </p>
              <h3 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight">
                {name}
              </h3>
              <p className="text-muted-foreground text-lg md:text-xl mb-8">{description}</p>
              <div className="flex gap-4 justify-center lg:justify-start">
                {details ? (
                    <DialogTrigger asChild>
                        <Button size="lg" className='text-base'>Saber más</Button>
                    </DialogTrigger>
                ) : (
                    <Button size="lg" className='text-base' disabled>Saber más</Button>
                )}
                <Button size="lg" variant="outline" className='text-base'>
                  Ver ejemplos <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
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
        {details && (
            <DialogContent className="max-w-2xl p-8">
                <DialogHeader className="text-left mb-6">
                    <DialogTitle className="text-3xl font-extrabold text-foreground mb-2">{details.title}</DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground">
                        {details.history}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
                    <div>
                        <h4 className="font-bold text-lg mb-3 flex items-center gap-2"><ThumbsUp className="size-5 text-green-500" /> Fortalezas</h4>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            {details.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-3 flex items-center gap-2"><ThumbsDown className="size-5 text-red-500" /> Debilidades</h4>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            {details.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                    <h4 className="font-bold text-lg mb-2 text-primary/90">Consejo de Maestro</h4>
                    <p className="text-foreground/80">{details.tip}</p>
                </div>
            </DialogContent>
        )}
    </Dialog>
);


export function RulesPiecesCarousel({ pieces }: { pieces: Piece[] }) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [dotCount, setDotCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setDotCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };
        
        api.on("select", onSelect);
        api.on("reInit", onSelect);

        return () => {
            api.off("select", onSelect);
            api.off("reInit", onSelect);
        }
    }, [api]);

    const scrollTo = useCallback((index: number) => {
        api?.scrollTo(index);
    }, [api]);

    return (
        <section>
            <Carousel className="w-full" setApi={setApi} opts={{ loop: true }}>
                <CarouselContent>
                    {pieces.map((piece) => (
                        <CarouselItem key={piece.name} className="flex-grow">
                            <PieceInfoCard {...piece} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: dotCount || pieces.length }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${current === index ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/50 hover:bg-muted-foreground'}`}
                    aria-label={`Ir a la diapositiva ${index + 1}`}
                  />
                ))}
            </div>
        </section>
    );
}
