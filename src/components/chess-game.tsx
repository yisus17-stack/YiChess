
'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, ChevronLeft, Flag, Trophy, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ChessGame() {
  const game = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(game.fen());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

  const makeAMove = useCallback(
    (move: { from: string; to: string; promotion?: string }) => {
      try {
        const result = game.move(move);
        if (result) {
          setFen(game.fen());
          setMoveHistory(game.history());
          return result;
        }
      } catch (e) {
        return null;
      }
      return null;
    },
    [game]
  );

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // siempre promocionar a dama por simplicidad
    });

    if (move === null) return false;
    return true;
  }

  const resetGame = () => {
    game.reset();
    setFen(game.fen());
    setMoveHistory([]);
  };

  const undoMove = () => {
    game.undo();
    setFen(game.fen());
    setMoveHistory(game.history());
  };

  const getGameStatus = () => {
    if (game.isCheckmate()) return 'Jaque Mate - ¡Victoria!';
    if (game.isDraw()) return 'Tablas - Empate';
    if (game.isStalemate()) return 'Ahogado - Empate';
    if (game.isCheck()) return '¡Jaque!';
    return game.turn() === 'w' ? 'Turno de Blancas' : 'Turno de Negras';
  };

  const isGameOver = game.isGameOver();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 w-full max-w-[600px] mx-auto lg:mx-0">
        <div className="aspect-square bg-card border rounded-xl overflow-hidden shadow-2xl">
          <Chessboard 
            position={fen} 
            onPieceDrop={onDrop} 
            boardOrientation="white"
            customDarkSquareStyle={{ backgroundColor: 'hsl(var(--primary) / 0.2)' }}
            customLightSquareStyle={{ backgroundColor: 'hsl(var(--background))' }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-xl flex items-center gap-2">
              <Trophy className={cn("size-5", isGameOver ? "text-primary" : "text-muted-foreground")} />
              Estado del Juego
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className={cn(
              "text-lg font-bold p-4 rounded-lg text-center transition-colors",
              isGameOver ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
            )}>
              {getGameStatus()}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button variant="outline" onClick={undoMove} disabled={moveHistory.length === 0 || isGameOver} className="flex items-center gap-2">
                <ChevronLeft className="size-4" /> Deshacer
              </Button>
              <Button variant="outline" onClick={resetGame} className="flex items-center gap-2">
                <RotateCcw className="size-4" /> Reiniciar
              </Button>
            </div>
            
            <Button variant="destructive" className="w-full mt-3 flex items-center gap-2" disabled={isGameOver}>
               <Flag className="size-4" /> Rendirse
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-lg h-[300px] flex flex-col">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-xl flex items-center gap-2">
              <Info className="size-5 text-muted-foreground" />
              Historial de Movimientos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex-1 overflow-y-auto">
            {moveHistory.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-10 italic">Aún no hay movimientos</p>
            ) : (
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 font-mono text-sm">
                {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="flex justify-between border-b border-border/20 pb-1">
                      <span className="text-muted-foreground">{i + 1}.</span>
                      <span className="font-bold">{moveHistory[i * 2]}</span>
                    </div>
                    {moveHistory[i * 2 + 1] && (
                      <div className="flex justify-end border-b border-border/20 pb-1">
                        <span className="font-bold">{moveHistory[i * 2 + 1]}</span>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
