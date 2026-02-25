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

  // Responsividad: Ajuste dinámico del tablero
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
  }, [timerActive, winner, selectedTime]);

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

  const undoMove = () => {
    game.undo();
    setFen(game.fen());
    setMoveHistory(game.history());
  };

  const handleResign = () => {
    const resignWinner = game.turn() === 'w' ? 'NEGRAS' : 'BLANCAS';
    setWinner(resignWinner);
    setTimerActive(false);
    toast({
      title: "RENDICIÓN",
      description: `Las ${game.turn() === 'w' ? 'Blancas' : 'Negras'} se han rendido.`,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center pb-20 w-full">
      {/* Tablero y Relojes */}
      <div className="w-full lg:flex-1 max-w-[600px] space-y-4">
        {/* Barra Negras */}
        <div className={cn(
          "flex justify-between items-center p-3 border rounded-md transition-colors",
          game.turn() === 'b' && !winner ? "bg-[#f4f4f4] border-gray-300" : "bg-white border-transparent"
        )}>
          <div className="flex items-center gap-3">
            <div className="size-8 bg-slate-900 flex items-center justify-center text-white font-bold text-xs rounded-sm">B</div>
            <span className="font-bold text-sm">Negras</span>
          </div>
          {selectedTime > 0 && (
            <div className="flex items-center gap-2 font-mono text-xl font-bold">
              <Clock className="size-4 text-gray-500" />
              {formatTime(blackTime)}
            </div>
          )}
        </div>

        <div 
          ref={boardContainerRef}
          className="w-full aspect-square bg-card overflow-hidden shadow-sm border border-gray-100"
        >
          <Chessboard 
            position={fen} 
            onPieceDrop={onDrop} 
            boardOrientation="white"
            animationDuration={200}
            boardWidth={boardWidth}
            customDarkSquareStyle={{ backgroundColor: '#d1d5db' }}
            customLightSquareStyle={{ backgroundColor: '#f3f4f6' }}
          />
        </div>

        {/* Barra Blancas */}
        <div className={cn(
          "flex justify-between items-center p-3 border rounded-md transition-colors",
          game.turn() === 'w' && !winner ? "bg-[#e8f0d1] border-[#c5d3a2]" : "bg-white border-transparent"
        )}>
          <div className="flex items-center gap-3">
            <div className="size-8 bg-white border border-gray-300 flex items-center justify-center text-slate-800 font-bold text-xs rounded-sm">W</div>
            <span className="font-bold text-sm">Blancas</span>
          </div>
          {selectedTime > 0 && (
            <div className="flex items-center gap-2 font-mono text-xl font-bold">
              <Clock className="size-4 text-gray-500" />
              {formatTime(whiteTime)}
            </div>
          )}
        </div>
      </div>

      {/* Panel Lateral de Controles */}
      <div className="w-full lg:w-[350px] space-y-4">
        <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden">
          <CardHeader className="py-4 border-b border-gray-50 bg-white">
            <CardTitle className="text-base flex items-center gap-2 font-bold">
              <Trophy className="size-5 text-gray-400" />
              Partida Local
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="bg-gray-50 rounded-md p-4 text-center border border-gray-100">
              <span className="text-lg font-extrabold uppercase tracking-tight">
                {winner ? `Ganador: ${winner}` : `Turno: ${game.turn() === 'w' ? 'Blancas' : 'Negras'}`}
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 px-1">
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
                <SelectTrigger className="h-11 rounded-md border-gray-200 shadow-none">
                  <SelectValue placeholder="Elegir tiempo" />
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

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={undoMove} 
                disabled={moveHistory.length === 0 || !!winner} 
                className="h-11 rounded-md border-gray-200 text-gray-600 font-bold"
              >
                <ChevronLeft className="size-4 mr-2" /> Deshacer
              </Button>
              <Button 
                variant="outline" 
                onClick={resetGame} 
                className="h-11 rounded-md border-gray-200 text-gray-600 font-bold"
              >
                <RotateCcw className="size-4 mr-2" /> Reiniciar
              </Button>
            </div>
            
            <Button 
              variant="destructive" 
              className="w-full h-11 rounded-md font-bold bg-[#ef4444] hover:bg-[#dc2626]" 
              disabled={!!winner}
              onClick={handleResign}
            >
               <Flag className="size-4 mr-2" /> Rendirse
            </Button>
          </CardContent>
        </Card>

        {/* Notación Algebraica */}
        <Card className="shadow-sm border-gray-100 rounded-lg h-[300px] flex flex-col overflow-hidden">
          <CardHeader className="py-4 border-b border-gray-50 bg-white">
            <CardTitle className="text-base flex items-center gap-2 font-bold">
              <History className="size-5 text-gray-400" />
              Notación
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-auto bg-[#fafafa]">
            {moveHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full italic text-gray-400 text-sm p-10 text-center">
                Mueve una pieza para empezar
              </div>
            ) : (
              <div className="p-4 grid grid-cols-2 gap-x-4 gap-y-1">
                {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="text-sm font-medium py-1 px-2 flex justify-between">
                      <span className="text-gray-300 mr-2">{i + 1}.</span>
                      <span className="font-bold">{moveHistory[i * 2]}</span>
                    </div>
                    <div className="text-sm font-bold py-1 px-2">
                      {moveHistory[i * 2 + 1] || ''}
                    </div>
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
