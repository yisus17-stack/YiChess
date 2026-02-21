'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, ChevronLeft, Flag, Trophy, Info, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function ChessGame() {
  const { toast } = useToast();
  // Inicializamos el juego con useMemo para que persista entre renders
  const game = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(game.fen());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [boardWidth, setBoardWidth] = useState(600);

  // Ajustar el tamaño del tablero responsivamente
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setBoardWidth(width - 40);
      else if (width < 1024) setBoardWidth(500);
      else setBoardWidth(600);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      promotion: 'q', // Siempre promocionar a dama por simplicidad en esta versión
    });

    if (move === null) return false;
    return true;
  }

  const resetGame = () => {
    game.reset();
    setFen(game.fen());
    setMoveHistory([]);
    toast({
      title: "Partida Reiniciada",
      description: "El tablero ha vuelto a la posición inicial.",
    });
  };

  const undoMove = () => {
    game.undo();
    setFen(game.fen());
    setMoveHistory(game.history());
  };

  const handleResign = () => {
    const winner = game.turn() === 'w' ? 'Negras' : 'Blancas';
    toast({
      title: "Partida Finalizada",
      description: `Las ${game.turn() === 'w' ? 'Blancas' : 'Negras'} se han rendido. ¡Victoria para las ${winner}!`,
    });
    resetGame();
  };

  const getGameStatus = () => {
    if (game.isCheckmate()) return '¡Jaque Mate!';
    if (game.isDraw()) return 'Tablas (Empate)';
    if (game.isStalemate()) return 'Ahogado (Empate)';
    if (game.isThreefoldRepetition()) return 'Repetición (Empate)';
    if (game.isCheck()) return '¡Jaque!';
    return game.turn() === 'w' ? 'Turno: Blancas' : 'Turno: Negras';
  };

  const isGameOver = game.isGameOver();

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center pb-10">
      {/* Contenedor del Tablero */}
      <div className="flex-1 flex flex-col items-center">
        <div 
          className="bg-card border-4 border-primary/10 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all"
          style={{ width: boardWidth, height: boardWidth }}
        >
          <Chessboard 
            position={fen} 
            onPieceDrop={onDrop} 
            boardOrientation="white"
            animationDuration={200}
            customDarkSquareStyle={{ backgroundColor: 'hsl(var(--primary) / 0.25)' }}
            customLightSquareStyle={{ backgroundColor: 'hsl(var(--background))' }}
            customBoardStyle={{
              borderRadius: '4px',
            }}
          />
        </div>
        
        {/* Indicador de turno móvil/tablet */}
        <div className="mt-6 lg:hidden w-full max-w-[500px]">
           <div className={cn(
            "text-lg font-bold p-4 rounded-xl text-center shadow-sm border border-border/50 transition-all",
            isGameOver ? "bg-primary text-primary-foreground scale-105" : "bg-muted text-foreground"
          )}>
            {getGameStatus()}
          </div>
        </div>
      </div>

      {/* Panel de Control e Historial */}
      <div className="w-full lg:w-[350px] space-y-6">
        <Card className="border-border/50 shadow-xl overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className={cn("size-5", isGameOver ? "text-primary animate-bounce" : "text-muted-foreground")} />
              Panel de Control
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className={cn(
              "hidden lg:block text-lg font-bold p-4 rounded-xl text-center shadow-inner transition-all",
              isGameOver ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-foreground border border-border/50"
            )}>
              {getGameStatus()}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={undoMove} 
                disabled={moveHistory.length === 0 || isGameOver} 
                className="flex items-center gap-2 h-12 rounded-lg hover:bg-primary/5"
              >
                <ChevronLeft className="size-4" /> Deshacer
              </Button>
              <Button 
                variant="outline" 
                onClick={resetGame} 
                className="flex items-center gap-2 h-12 rounded-lg hover:bg-primary/5"
              >
                <RotateCcw className="size-4" /> Reiniciar
              </Button>
            </div>
            
            <Button 
              variant="destructive" 
              className="w-full h-12 rounded-lg flex items-center gap-2 shadow-sm font-bold" 
              disabled={isGameOver}
              onClick={handleResign}
            >
               <Flag className="size-4" /> Rendirse
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-xl h-[400px] flex flex-col overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <History className="size-5 text-muted-foreground" />
              Movimientos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto p-4 custom-scrollbar">
              {moveHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-10 opacity-40">
                  <Info className="size-10 mb-2" />
                  <p className="text-sm italic font-medium">Esperando primer movimiento...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => (
                    <React.Fragment key={i}>
                      <div className="flex items-center justify-between bg-muted/20 p-2 rounded-l-md border-b border-border/10">
                        <span className="text-[10px] text-muted-foreground font-bold w-4">{i + 1}.</span>
                        <span className="font-mono font-bold text-sm flex-1 text-center">{moveHistory[i * 2]}</span>
                      </div>
                      <div className="flex items-center justify-center bg-muted/40 p-2 rounded-r-md border-b border-border/10">
                        <span className="font-mono font-bold text-sm">{moveHistory[i * 2 + 1] || '...'}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}