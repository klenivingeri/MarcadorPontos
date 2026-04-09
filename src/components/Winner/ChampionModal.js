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
          
          // Criando o ID no formato solicitado: YYYYMMDD-HHMMSS
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
            score: {
              left: score.left,
              right: score.right,
            },
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

    if (!isOpen) {
      hasSaved.current = false;
    }
  }, [isOpen, winnerName, score, configGame]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-[3rem] shadow-[0_0_50px_-12px_rgba(34,197,94,0.3)] overflow-hidden max-h-[95vh] flex flex-col">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/10 blur-[80px] pointer-events-none" />

        <div className="p-8 text-center overflow-y-auto scrollbar-hide">
          <header className="mb-6">
            <span className="inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              Partida Finalizada
            </span>
            <h2 className="text-zinc-500 font-black text-lg uppercase tracking-widest">
              Grande Campeão
            </h2>
          </header>

          <div className="mb-8">
            <div className="text-6xl font-black text-white uppercase italic leading-tight break-words">
              {winnerName}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-[1px] w-8 bg-zinc-800" />
              <span className="text-zinc-400 font-bold text-sm tracking-tighter">
                PLACAR FINAL:{" "}
                <span className="text-white ml-1">
                  {score.left} — {score.right}
                </span>
              </span>
              <div className="h-[1px] w-8 bg-zinc-800" />
            </div>
          </div>

          <Confetti mode="boom" shapeSize={20} colors={colors_from_image} />
          
          <div className="relative w-24 h-24 mx-auto mb-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
            <div className="relative bg-gradient-to-b from-green-400 to-green-600 w-20 h-20 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onRestart}
              className="w-full bg-green-500 hover:bg-green-400 text-black py-5 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-green-500/20"
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