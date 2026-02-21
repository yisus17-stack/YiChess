'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, ChevronLeft, Flag, Trophy, History, Timer, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const TIME_OPTIONS = [
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
  const [boardWidth, setBoardWidth] = useState(600);
  
  // Lógica de Tiempo
  const [selectedTime, setSelectedTime] = useState(300); // 5 min por defecto
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsividad del tablero
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setBoardWidth(width - 32);
      else if (width < 1024) setBoardWidth(480);
      else setBoardWidth(600);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lógica del Reloj
  useEffect(() => {
    if (timerActive && !winner) {
      timerRef.current = setInterval(() => {
        if (game.turn() === 'w') {
          setWhiteTime((prev) => {
            if (prev <= 0) {
              setWinner('Negras');
              setTimerActive(false);
              return 0;
            }
            return prev - 1;
          });
        } else {
          setBlackTime((prev) => {
            if (prev <= 0) {
              setWinner('Blancas');
              setTimerActive(false);
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive, winner, game]);

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
          
          // Iniciar timer en el primer movimiento
          if (!timerActive && !winner) setTimerActive(true);

          // Verificar fin de partida
          if (game.isCheckmate()) {
            setWinner(game.turn() === 'w' ? 'Negras' : 'Blancas');
            setTimerActive(false);
          } else if (game.isDraw() || game.isStalemate()) {
            setWinner('Empate');
            setTimerActive(false);
          }
          
          return result;
        }
      } catch (e) {
        return null;
      }
      return null;
    },
    [game, timerActive, winner]
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
      title: "Partida Reiniciada",
      description: `Tiempo configurado a ${selectedTime / 60} minutos.`,
    });
  };

  const handleResign = () => {
    const resigWinner = game.turn() === 'w' ? 'Negras' : 'Blancas';
    setWinner(resigWinner);
    setTimerActive(false);
    toast({
      title: "Partida Finalizada",
      description: `Las ${game.turn() === 'w' ? 'Blancas' : 'Negras'} se han rendido.`,
    });
  };

  const getStatusText = () => {
    if (winner === 'Empate') return '¡Tablas!';
    if (winner) return `¡Victoria de las ${winner}!`;
    if (game.isCheck()) return '¡Jaque!';
    return game.turn() === 'w' ? 'Turno: Blancas' : 'Turno: Negras';
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center pb-20">
      {/* Columna del Tablero */}
      <div className="flex-1 flex flex-col items-center">
        {/* Reloj Negras */}
        <div className={cn(
          "w-full max-w-[500px] lg:max-w-none flex justify-between items-center mb-4 p-3 rounded-lg border transition-all",
          game.turn() === 'b' && !winner ? "bg-primary/20 border-primary ring-2 ring-primary/50" : "bg-muted/30 border-border"
        )}>
          <div className="flex items-center gap-2">
            <div className="size-8 bg-slate-800 rounded flex items-center justify-center text-white font-bold text-xs">B</div>
            <span className="font-bold">Negras</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-2xl font-black">
            <Timer className="size-5" />
            {formatTime(blackTime)}
          </div>
        </div>

        <div 
          className="bg-card border-4 border-primary/20 rounded-xl overflow-hidden shadow-2xl transition-all"
          style={{ width: boardWidth, height: boardWidth }}
        >
          <Chessboard 
            position={fen} 
            onPieceDrop={onDrop} 
            boardOrientation="white"
            animationDuration={200}
            customDarkSquareStyle={{ backgroundColor: 'hsl(var(--primary) / 0.35)' }}
            customLightSquareStyle={{ backgroundColor: 'hsl(var(--background))' }}
            customBoardStyle={{ borderRadius: '4px' }}
          />
        </div>

        {/* Reloj Blancas */}
        <div className={cn(
          "w-full max-w-[500px] lg:max-w-none flex justify-between items-center mt-4 p-3 rounded-lg border transition-all",
          game.turn() === 'w' && !winner ? "bg-primary/20 border-primary ring-2 ring-primary/50" : "bg-muted/30 border-border"
        )}>
          <div className="flex items-center gap-2">
            <div className="size-8 bg-slate-100 border border-border rounded flex items-center justify-center text-slate-800 font-bold text-xs">W</div>
            <span className="font-bold">Blancas</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-2xl font-black">
            <Timer className="size-5" />
            {formatTime(whiteTime)}
          </div>
        </div>
      </div>

      {/* Columna de Controles */}
      <div className="w-full lg:w-[380px] space-y-6">
        <Card className="border-border/50 shadow-xl">
          <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className={cn("size-5", winner ? "text-primary animate-bounce" : "text-muted-foreground")} />
              Partida Local
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-5">
            {/* Estado Principal */}
            <div className={cn(
              "text-xl font-black p-5 rounded-xl text-center shadow-inner border transition-all",
              winner ? "bg-primary text-primary-foreground scale-105" : "bg-secondary/50 text-foreground border-border/50"
            )}>
              {getStatusText()}
            </div>

            {/* Configuración de Tiempo (Solo antes de empezar) */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Clock className="size-3" /> Tiempo Inicial
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
                <SelectTrigger className="h-12 rounded-lg">
                  <SelectValue placeholder="Selecciona tiempo" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  game.undo();
                  setFen(game.fen());
                  setMoveHistory(game.history());
                }} 
                disabled={moveHistory.length === 0 || !!winner} 
                className="h-12 rounded-lg"
              >
                <ChevronLeft className="size-4" /> Deshacer
              </Button>
              <Button 
                variant="outline" 
                onClick={resetGame} 
                className="h-12 rounded-lg"
              >
                <RotateCcw className="size-4" /> Reiniciar
              </Button>
            </div>
            
            <Button 
              variant="destructive" 
              className="w-full h-12 rounded-lg flex items-center gap-2 shadow-sm font-bold" 
              disabled={!!winner}
              onClick={handleResign}
            >
               <Flag className="size-4" /> Rendirse
            </Button>
          </CardContent>
        </Card>

        {/* Historial de Movimientos */}
        <Card className="border-border/50 shadow-xl h-[350px] flex flex-col overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/50 py-4 shrink-0">
            <CardTitle className="text-lg flex items-center gap-2 font-bold">
              <History className="size-5 text-muted-foreground" />
              Notación
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto p-4 custom-scrollbar bg-slate-50 dark:bg-slate-900/20">
              {moveHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-10 opacity-30">
                  <p className="text-sm italic font-medium">Mueve una pieza para empezar</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => (
                    <React.Fragment key={i}>
                      <div className="flex items-center justify-between bg-white dark:bg-slate-950 p-2 rounded border border-border/40">
                        <span className="text-[10px] text-muted-foreground font-black pr-2 border-r mr-2">{i + 1}.</span>
                        <span className="font-mono font-bold text-sm flex-1 text-center">{moveHistory[i * 2]}</span>
                      </div>
                      <div className="flex items-center justify-center bg-white/60 dark:bg-slate-950/60 p-2 rounded border border-border/40">
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
