"use client";

import React, { Suspense, startTransition, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Confetti from "react-confetti-boom";
import { colors_from_image } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

const INIT_GAME_COUNTDOWN = 7;
const DEFAULT_SETTINGS = {
  bgUrl: "",
};

const getWinnerName = (winner, game) => {
  if (!game?.teams?.length) {
    return winner === "left" ? "Time 1" : "Time 2";
  }

  return winner === "left" ? game.teams[0]?.name : game.teams[1]?.name;
};

function RoundFinishContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentGame, completeSet } = useGame();
  const [countdown, setCountdown] = useState(INIT_GAME_COUNTDOWN);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  const winner = searchParams.get("winner");

  useEffect(() => {
    const savedSettings = localStorage.getItem("truscore_settings");

    startTransition(() => {
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }

      setHasLoadedStorage(true);
    });
  }, []);

  const winnerName = useMemo(
    () => getWinnerName(winner, currentGame),
    [currentGame, winner],
  );

  useEffect(() => {
    if (!hasLoadedStorage) {
      return;
    }

    if (!currentGame || currentGame.status !== "playing") {
      router.replace("/arena");
      return;
    }

    if (winner !== "left" && winner !== "right") {
      router.replace("/arena");
    }
  }, [currentGame, hasLoadedStorage, router, winner]);

  useEffect(() => {
    if (!currentGame || currentGame.status !== "playing") {
      return undefined;
    }

    if (winner !== "left" && winner !== "right") {
      return undefined;
    }

    if (countdown <= 0) {
      return undefined;
    }

    const timer = setTimeout(() => {
      if (countdown === 1) {
        completeSet(winner);
        router.replace("/arena");
        return;
      }

      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [completeSet, countdown, currentGame, router, winner]);

  if (!currentGame || currentGame.status !== "playing") {
    return null;
  }

  if (winner !== "left" && winner !== "right") {
    return null;
  }

  const cancelFinish = () => {
    router.replace("/arena");
  };

  const progress = 226 - (226 * countdown) / INIT_GAME_COUNTDOWN;

  return (
    <>
    <div
      className="min-h-screen animate-slow-fade tru-page-bg tru-page-text"
      style={{
        backgroundImage: settings.bgUrl ? `url("${settings.bgUrl}")` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative min-h-screen flex items-center justify-center tru-overlay-bg px-4 py-5 text-center">
        <Link
          href="/"
          className="fixed top-5 left-4 rounded-2xl tru-surface backdrop-blur-md border shadow-xl px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-(--text-muted) transition-colors hover:text-foreground z-10"
        >
          Início
        </Link>
        <Link
          href="/arena"
          className="fixed top-5 right-4 rounded-2xl tru-surface backdrop-blur-md border shadow-xl px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-(--text-muted) transition-colors hover:text-foreground z-10"
        >
          Arena
        </Link>

        <div className="w-[84vw] max-w-xs sm:max-w-sm md:w-[52vw] lg:w-[40vw] xl:w-[34vw] animate-slow-fade rounded-4xl tru-surface tru-page-text backdrop-blur-md border shadow-xl overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" />
          

          <div className="relative p-5 sm:p-6">
            <h2 className="tru-muted-text font-black text-xs uppercase mb-2 tracking-[0.35em]">
              Fim da Rodada
            </h2>

            <div className="text-3xl sm:text-4xl font-black tru-accent-text mb-5 uppercase italic leading-tight wrap-break-word">
              Vitória {winnerName}!
            </div>

            <div className="relative h-16 w-16 mx-auto mb-5 flex items-center justify-center">
              <span className="text-2xl font-black tru-page-text">{countdown}</span>
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 80 80"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-(--surface-border)"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="tru-accent-text"
                  strokeDasharray="226"
                  strokeDashoffset={progress}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
            </div>

            <div
              className="py-3 px-4 rounded-xl mb-3 shadow-inner border"
              style={{
                backgroundColor: "color-mix(in srgb, var(--surface) 92%, transparent)",
                borderColor: "var(--surface-border)",
              }}
            >
              <p className="tru-muted-text text-[11px] font-mono uppercase tracking-tight flex items-center justify-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full tru-progress-bg opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 tru-accent-bg"></span>
                </span>
                Iniciando novo jogo automaticamente...
              </p>
            </div>

            <button
              onClick={cancelFinish}
              className="text-[11px] font-bold uppercase tracking-widest py-1 px-3 rounded-xl transition-colors tru-btn-ghost"
            >
              Cancelar (Corrigir Pontos)
            </button>
          </div>
        </div>
      </div>
    </div>
    <Confetti mode="boom" shapeSize={15} colors={colors_from_image} />
    </>
  );
}

export default function RoundFinishPage() {
  return (
    <Suspense fallback={null}>
      <RoundFinishContent />
    </Suspense>
  );
}