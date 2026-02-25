'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, ChevronLeft, Flag, Trophy, History, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const TIME_OPTIONS = [
  { label: 'Sin tiempo', value: 0 },
  { label: '1 min (Bullet)', value: 60 },
  { label: '3 min (Blitz)', value: 180 },
  { label: '5 min (Blitz)', value: 300 },
  { label: '10 min (Rapid)', value: 600 },
];

export function ChessGame() {
  const { toast } = useToast();
  const game = useMemo(() => new Chess(), []);
  
  const [fen, setFen] = useState(game.fen());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [boardWidth, setBoardWidth] = useState(400);
  const boardContainerRef = useRef<HTMLDivElement>(null);
  
  const [selectedTime, setSelectedTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsividad total: Detección de ancho del contenedor
  useEffect(() => {
    const handleResize = () => {
      if (boardContainerRef.current) {
        setBoardWidth(boardContainerRef.current.offsetWidth);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (boardContainerRef.current) {
      resizeObserver.observe(boardContainerRef.current);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  // Lógica del Reloj
  useEffect(() => {
    if (timerActive && !winner && selectedTime > 0) {
      timerRef.current = setInterval(() => {
        if (game.turn() === 'w') {
          setWhiteTime((prev) => {
            if (prev <= 0) {
              setWinner('NEGRAS');
              setTimerActive(false);
              return 0;
            }
            return prev - 1;
          });
        } else {
          setBlackTime((prev) => {
            if (prev <= 0) {
              setWinner('BLANCAS');
              setTimerActive(false);
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive, winner, selectedTime, game]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const makeAMove = useCallback(
    (move: { from: string; to: string; promotion?: string }) => {
      try {
        const result = game.move(move);
        if (result) {
          setFen(game.fen());
          setMoveHistory(game.history());
          
          if (!timerActive && !winner && selectedTime > 0) setTimerActive(true);

          if (game.isCheckmate()) {
            setWinner(game.turn() === 'w' ? 'NEGRAS' : 'BLANCAS');
            setTimerActive(false);
          } else if (game.isDraw() || game.isStalemate()) {
            setWinner('EMPATE');
            setTimerActive(false);
          }
          
          return result;
        }
      } catch (e) {
        return null;
      }
      return null;
    },
    [game, timerActive, winner, selectedTime]
  );

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    if (winner) return false;
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });
    return move !== null;
  }

  const resetGame = () => {
    game.reset();
    setFen(game.fen());
    setMoveHistory([]);
    setWhiteTime(selectedTime);
    setBlackTime(selectedTime);
    setTimerActive(false);
    setWinner(null);
    toast({
      title: "PARTIDA REINICIADA",
      description: selectedTime > 0 ? `Tiempo: ${selectedTime / 60} min.` : "Modo sin tiempo.",
    });
  };

  const handleResign = () => {
    const resigWinner = game.turn() === 'w' ? 'NEGRAS' : 'BLANCAS';
    setWinner(resigWinner);
    setTimerActive(false);
    toast({
      title: "RENDICIÓN",
      description: `Las ${game.turn() === 'w' ? 'Blancas' : 'Negras'} se han rendido.`,
    });
  };

  const getStatusText = () => {
    if (winner) return `VICTORIA: ${winner}`;
    if (game.isCheck()) return '¡JAQUE!';
    return game.turn() === 'w' ? 'TURNO: BLANCAS' : 'TURNO: NEGRAS';
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center pb-20 w-full px-4">
      {/* Columna del Tablero: Totalmente Responsiva */}
      <div className="w-full lg:flex-1 max-w-[600px] flex flex-col items-center mx-auto">
        {/* Reloj Negras (Oculto si no hay tiempo seleccionado) */}
        {selectedTime > 0 && (
          <div className={cn(
            "w-full flex justify-between items-center mb-2 p-4 border transition-all",
            game.turn() === 'b' && !winner ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border"
          )}>
            <div className="flex items-center gap-3">
              <div className="size-8 bg-slate-900 flex items-center justify-center text-white font-bold text-xs">B</div>
              <span className="font-black text-sm uppercase tracking-tighter">Negras</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-3xl font-black">
              {formatTime(blackTime)}
            </div>
          </div>
        )}

        <div 
          ref={boardContainerRef}
          className="w-full aspect-square border-4 border-primary/10 bg-card overflow-hidden"
        >
          <Chessboard 
            position={fen} 
            onPieceDrop={onDrop} 
            boardOrientation="white"
            animationDuration={200}
            boardWidth={boardWidth}
            customDarkSquareStyle={{ backgroundColor: '#769656' }}
            customLightSquareStyle={{ backgroundColor: '#eeeed2' }}
          />
        </div>

        {/* Reloj Blancas (Oculto si no hay tiempo seleccionado) */}
        {selectedTime > 0 && (
          <div className={cn(
            "w-full flex justify-between items-center mt-2 p-4 border transition-all",
            game.turn() === 'w' && !winner ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border"
          )}>
            <div className="flex items-center gap-3">
              <div className="size-8 bg-slate-100 border border-border flex items-center justify-center text-slate-800 font-bold text-xs">W</div>
              <span className="font-black text-sm uppercase tracking-tighter">Blancas</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-3xl font-black">
              {formatTime(whiteTime)}
            </div>
          </div>
        )}
      </div>

      {/* Columna de Controles: Diseño Plano y Minimalista */}
      <div className="w-full lg:w-[350px] space-y-4">
        <Card className="border-border rounded-none shadow-none">
          <CardHeader className="bg-muted border-b border-border py-4">
            <CardTitle className="text-lg flex items-center gap-2 font-black uppercase tracking-tighter">
              <Trophy className={cn("size-5", winner ? "text-primary" : "text-muted-foreground")} />
              Panel de Control
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Estado Principal Plano */}
            <div className={cn(
              "text-xl font-black p-6 text-center border transition-all",
              winner ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground border-border"
            )}>
              {getStatusText()}
            </div>

            {/* Configuración de Tiempo Plana */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <Clock className="size-3" /> Tiempo de Partida
              </label>
              <Select 
                disabled={moveHistory.length > 0 || winner !== null}
                value={selectedTime.toString()}
                onValueChange={(val) => {
                  const t = parseInt(val);
                  setSelectedTime(t);
                  setWhiteTime(t);
                  setBlackTime(t);
                }}
              >
                <SelectTrigger className="h-12 rounded-none border-border font-bold">
                  <SelectValue placeholder="Configurar tiempo" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value.toString()} className="font-bold">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  game.undo();
                  setFen(game.fen());
                  setMoveHistory(game.history());
                }} 
                disabled={moveHistory.length === 0 || !!winner} 
                className="h-12 rounded-none border-border font-bold uppercase text-xs"
              >
                <ChevronLeft className="size-4 mr-1" /> Deshacer
              </Button>
              <Button 
                variant="outline" 
                onClick={resetGame} 
                className="h-12 rounded-none border-border font-bold uppercase text-xs"
              >
                <RotateCcw className="size-4 mr-1" /> Reiniciar
              </Button>
            </div>
            
            <Button 
              variant="destructive" 
              className="w-full h-12 rounded-none font-black uppercase tracking-widest text-xs" 
              disabled={!!winner}
              onClick={handleResign}
            >
               <Flag className="size-4 mr-2" /> Rendirse
            </Button>
          </CardContent>
        </Card>

        {/* Notación Algebraica Plana */}
        <Card className="border-border rounded-none shadow-none h-[250px] flex flex-col overflow-hidden">
          <CardHeader className="bg-muted border-b border-border py-4 shrink-0">
            <CardTitle className="text-lg flex items-center gap-2 font-black uppercase tracking-tighter">
              <History className="size-5 text-muted-foreground" />
              Notación
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto p-4 bg-white dark:bg-slate-950">
              {moveHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-30 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest">Partida en curso</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1">
                  {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => (
                    <React.Fragment key={i}>
                      <div className="flex items-center p-2 bg-muted/50 border border-border">
                        <span className="text-[9px] font-black text-muted-foreground w-6">{i + 1}.</span>
                        <span className="font-mono font-bold text-sm">{moveHistory[i * 2]}</span>
                      </div>
                      <div className="flex items-center p-2 bg-muted/20 border border-border">
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