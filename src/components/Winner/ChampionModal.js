"use client";
import { colors_from_image } from "@/constants/colors";
import React, { useEffect, useRef } from "react";
import Confetti from "react-confetti-boom";

const ChampionModal = ({ isOpen, winnerName, score, onRestart, configGame }) => {
  const hasSaved = useRef(false);

  useEffect(() => {
    if (isOpen && !hasSaved.current) {
      const saveToHistory = () => {
        try {
          const now = new Date();
          const timestampId = now.getFullYear().toString() +
            (now.getMonth() + 1).toString().padStart(2, '0') +
            now.getDate().toString().padStart(2, '0') + "-" +
            now.getHours().toString().padStart(2, '0') +
            now.getMinutes().toString().padStart(2, '0') +
            now.getSeconds().toString().padStart(2, '0');

          const gameData = {
            id: timestampId, 
            date: now.toLocaleDateString("pt-BR"),
            time: now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
            winner: winnerName,
            score: { left: score.left, right: score.right },
            teams: {
              left: configGame?.teamLeft || "Time A",
              right: configGame?.teamRight || "Time B",
            },
          };

          const localHistory = JSON.parse(localStorage.getItem("game_history") || "[]");
          const updatedHistory = [gameData, ...localHistory];
          localStorage.setItem("game_history", JSON.stringify(updatedHistory));
          hasSaved.current = true; 
        } catch (error) {
          console.error("Erro ao salvar histórico:", error);
        }
      };
      saveToHistory();
    }
    if (!isOpen) hasSaved.current = false;
  }, [isOpen, winnerName, score, configGame]);

  if (!isOpen) return null;

  return (
    <div className="fixed animate-slow-fade inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      {/* Reduzido max-w para sm e adicionado flex-row em telas muito largas se necessário, 
          mas aqui focamos em encolher o conteúdo vertical */}
      <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-[2rem] shadow-[0_0_50px_-12px_rgba(34,197,94,0.3)] overflow-hidden max-h-[98vh] flex flex-col">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-green-500/10 blur-[60px] pointer-events-none" />

        {/* Padding reduzido de p-8 para p-5 */}
        <div className="p-5 text-center overflow-y-auto scrollbar-hide">
          <header className="mb-3">
            <span className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-[9px] font-black uppercase tracking-[0.2em] mb-2">
              Partida Finalizada
            </span>
            <h2 className="text-zinc-500 font-black text-xs uppercase tracking-widest">
              Grande Campeão
            </h2>
          </header>

          <div className="mb-4">
            {/* Fonte reduzida de 6xl para 4xl/5xl para não quebrar tantas linhas */}
            <div className="text-4xl sm:text-5xl font-black text-white uppercase italic leading-tight break-words">
              {winnerName}
            </div>
            
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="h-[1px] w-6 bg-zinc-800" />
              <span className="text-zinc-400 font-bold text-xs tracking-tighter">
                PLACAR: <span className="text-white">{score.left} — {score.right}</span>
              </span>
              <div className="h-[1px] w-6 bg-zinc-800" />
            </div>
          </div>

          <Confetti mode="boom" shapeSize={15} colors={colors_from_image} />
          
          {/* Troféu reduzido de w-24 para w-16 */}
          <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-10" />
            <div className="relative bg-gradient-to-b from-green-400 to-green-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </div>
          </div>

          <div className="mt-auto">
            <button
              onClick={onRestart}
              className="w-full bg-green-500 hover:bg-green-400 text-black py-4 rounded-xl font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg"
            >
              Nova Partida
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionModal;