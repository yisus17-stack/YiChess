'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const PieceInfoCard = ({ name, description, value, details }: Piece) => {
    return (
        <Dialog>
            <div className="bg-gradient-to-br from-card to-muted border border-border/50 rounded-2xl flex flex-col items-center justify-center text-center p-8 md:p-12 min-h-[380px]">
              <div className="max-w-xl">
                <p className="font-semibold text-primary mb-2 uppercase tracking-wider text-sm md:text-base">
                  {value === '∞' ? 'Pieza Clave' : `Valor: ${value} puntos`}
                </p>
                <h3 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight">
                  {name}
                </h3>
                <p className="text-muted-foreground text-lg md:text-xl mb-8">{description}</p>
                <div className="flex gap-4 justify-center">
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
};

const PieceImageTrigger = ({ piece }: { piece: Piece }) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div className="relative w-full h-full p-10">
            {isLoading && <Skeleton className="absolute inset-0 size-full rounded-xl" />}
            <Image
                src={piece.imageUrl}
                alt={piece.name}
                fill
                sizes="(max-width: 768px) 20vw, 10vw"
                className={cn(
                    "object-contain transition-opacity duration-300",
                    isLoading ? "opacity-0" : "opacity-100"
                )}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
};

export function RulesPiecesTabs({ pieces }: { pieces: Piece[] }) {
    return (
        <Tabs defaultValue={pieces[0].name} className="w-full">
            {pieces.map((piece) => (
                <TabsContent key={piece.name} value={piece.name} className="mt-0">
                    <PieceInfoCard {...piece} />
                </TabsContent>
            ))}
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto bg-transparent p-0 gap-4 mt-8">
                {pieces.map((piece) => (
                    <TabsTrigger 
                        key={piece.name} 
                        value={piece.name}
                        className="p-0 rounded-xl bg-muted/50 data-[state=active]:bg-card data-[state=active]:shadow-lg data-[state=active]:ring-2 data-[state=active]:ring-primary transition-all aspect-square h-auto flex items-center justify-center"
                    >
                        <PieceImageTrigger piece={piece} />
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}
