"use client";
import { colors_from_image } from "@/constants/colors";
import React from "react";
import Confetti from "react-confetti-boom";

const ChampionModal = ({ winnerName, score, onRestart, configGame, durationLabel }) => {
  const totalSets = configGame?.maxRounds || 1;

  return (
    <>
    <div className="relative w-full max-w-sm bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.28),transparent_70%)] pointer-events-none landscape:max-w-xl animate-slow-fade overflow-hidden rounded-4xl bg-black/20 backdrop-blur-md border border-white/10 shadow-xl">
      
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none" />

      

      <div className="relative p-4 overflow-hidden">
        <div className="landscape:flex landscape:gap-5 landscape:items-center">

          <div className="landscape:flex-1 text-center">
            <header className="mb-2 landscape:mb-3">
              <span className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-[9px] font-black uppercase tracking-[0.2em] mb-2">
                Partida Finalizada
              </span>
              <h2 className="text-zinc-400 font-black text-xs uppercase tracking-[0.35em]">
                Grande Campeão
              </h2>
            </header>

            <div className="mb-3">
              <div className="text-3xl landscape:text-4xl font-black text-white uppercase italic leading-tight wrap-break-word">
                {winnerName}
              </div>
              <div className="flex items-center justify-center gap-3 mt-2">
                <div className="h-px w-8 bg-white/10" />
                <span className="text-zinc-300 font-bold text-xs tracking-[0.2em] uppercase">
                  Sets <span className="text-white">{score.left} - {score.right}</span>
                </span>
                <div className="h-px w-8 bg-white/10" />
              </div>
            </div>

            <div className="relative w-12 h-12 mx-auto mb-3 landscape:mb-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-10" />
              <div className="relative bg-linear-to-b from-green-400 to-green-600 w-11 h-11 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="landscape:flex-1 landscape:flex landscape:flex-col landscape:gap-3">
            <div className="grid grid-cols-2 gap-2 text-left mb-3 landscape:mb-0">
              <div className="rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 p-3 shadow-xl">
                <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 mb-1">
                  Formato
                </span>
                <span className="block text-base font-black text-white uppercase">
                  Melhor de {totalSets}
                </span>
              </div>
              <div className="rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 p-3 shadow-xl">
                <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 mb-1">
                  Tempo
                </span>
                <span className="block text-base font-black text-white uppercase">
                  {durationLabel}
                </span>
              </div>
            </div>

            <button
              onClick={onRestart}
              className="w-full bg-green-500 hover:bg-green-400 text-black py-3 rounded-xl font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg"
            >
              Nova Partida
            </button>
          </div>

        </div>
      </div>
    </div>
    <Confetti mode="boom" shapeSize={15} colors={colors_from_image} />
    </>
  );
};

export default ChampionModal;
