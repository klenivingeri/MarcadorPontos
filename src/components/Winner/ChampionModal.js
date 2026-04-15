"use client";
import { colors_from_image } from "@/constants/colors";
import Link from "next/link";
import React from "react";
import Confetti from "react-confetti-boom";

const ChampionModal = ({ winnerName, score, onRestart, configGame, durationLabel }) => {
  const totalSets = configGame?.maxRounds || 1;

  return (
    <>
    <div className="relative w-full max-w-sm landscape:max-w-xl animate-slow-fade overflow-hidden rounded-4xl tru-surface tru-page-text backdrop-blur-md border shadow-xl"
      style={{ backgroundImage: "radial-gradient(circle at top, color-mix(in srgb, var(--tru-default) 28%, transparent), transparent 70%)" }}>
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none" />
      <div className="relative p-4 overflow-hidden">
        <div className="landscape:flex landscape:gap-5 landscape:items-center">

          <div className="landscape:flex-1 text-center">
            <header className="mb-2 landscape:mb-3">
              <span className="inline-block px-3 py-1 border rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-2 tru-accent-badge">
                Partida Finalizada
              </span>
              <h2 className="tru-muted-text font-black text-xs uppercase tracking-[0.35em]">
                Grande Campeão
              </h2>
            </header>

            <div className="mb-3">
              <div className="text-3xl landscape:text-4xl font-black tru-page-text uppercase italic leading-tight wrap-break-word">
                {winnerName}
              </div>
              <div className="flex items-center justify-center gap-3 mt-2">
                <div className="h-px w-8" style={{ backgroundColor: "var(--surface-border)" }} />
                <span className="tru-muted-text font-bold text-xs tracking-[0.2em] uppercase">
                  Sets <span className="tru-page-text">{score.left} - {score.right}</span>
                </span>
                <div className="h-px w-8" style={{ backgroundColor: "var(--surface-border)" }} />
              </div>
            </div>

            <div className="relative w-12 h-12 mx-auto mb-3 landscape:mb-0 flex items-center justify-center">
              <div className="absolute inset-0 tru-progress-bg rounded-full animate-ping opacity-10" />
              <div className="relative tru-accent-bg w-11 h-11 rounded-full flex items-center justify-center tru-accent-shadow">
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
              <div
                className="rounded-2xl backdrop-blur-md border p-3 shadow-xl"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--surface) 90%, transparent)",
                  borderColor: "var(--surface-border)",
                }}
              >
                <span className="block text-[10px] font-black uppercase tracking-[0.25em] tru-muted-text mb-1">
                  Formato
                </span>
                <span className="block text-base font-black tru-page-text uppercase">
                  Melhor de {totalSets}
                </span>
              </div>
              <div
                className="rounded-2xl backdrop-blur-md border p-3 shadow-xl"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--surface) 90%, transparent)",
                  borderColor: "var(--surface-border)",
                }}
              >
                <span className="block text-[10px] font-black uppercase tracking-[0.25em] tru-muted-text mb-1">
                  Tempo
                </span>
                <span className="block text-base font-black tru-page-text uppercase">
                  {durationLabel}
                </span>
              </div>
            </div>

            <Link
              href="/"
              onClick={onRestart}
              className="block w-full tru-accent-bg tru-accent-bg-hover tru-on-accent py-3 rounded-xl font-black uppercase tracking-widest active:scale-95 transition-all tru-accent-shadow text-center"
            >
              Nova Partida
            </Link>
          </div>

        </div>
      </div>
    </div>
    <Confetti mode="boom" shapeSize={15} colors={colors_from_image} />
    </>
  );
};

export default ChampionModal;
