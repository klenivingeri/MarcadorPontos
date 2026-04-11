"use client";

import React, { startTransition, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ChampionModal from "@/components/Winner/ChampionModal";
import {
  LAST_FINISHED_GAME_STORAGE_KEY,
  useGame,
} from "@/context/GameContext";

const DEFAULT_SETTINGS = {
  bgUrl: "",
};

const getWinnerTeam = (game) => {
  if (!game?.teams?.length) {
    return null;
  }

  const winnerFromLastSet = game.teams.find(
    (team) => team.id === game.sets?.at(-1)?.winnerTeamId,
  );

  if (winnerFromLastSet) {
    return winnerFromLastSet;
  }

  return [...game.teams].sort((teamA, teamB) => teamB.setsWon - teamA.setsWon)[0];
};

const formatDuration = (startTime, endTime) => {
  if (!startTime || !endTime) {
    return "--:--";
  }

  const totalSeconds = Math.max(0, Math.floor((endTime - startTime) / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export default function ChampionPage() {
  const router = useRouter();
  const { currentGame, clearCurrentGame } = useGame();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [storedFinishedGame, setStoredFinishedGame] = useState(null);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem("truscore_settings");
    const savedFinishedGame = localStorage.getItem(LAST_FINISHED_GAME_STORAGE_KEY);

    startTransition(() => {
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }

      if (savedFinishedGame) {
        setStoredFinishedGame(JSON.parse(savedFinishedGame));
      }

      setHasLoadedStorage(true);
    });
  }, []);

  const finishedGame = useMemo(() => {
    if (currentGame?.status === "finished") {
      return currentGame;
    }

    if (storedFinishedGame?.status === "finished") {
      return storedFinishedGame;
    }

    return null;
  }, [currentGame, storedFinishedGame]);

  useEffect(() => {
    if (!finishedGame && hasLoadedStorage) {
      router.replace("/arena");
    }
  }, [finishedGame, hasLoadedStorage, router]);

  const winnerTeam = useMemo(() => getWinnerTeam(finishedGame), [finishedGame]);

  if (!finishedGame || !winnerTeam) {
    return null;
  }

  const score = {
    left: finishedGame.teams?.[0]?.setsWon || 0,
    right: finishedGame.teams?.[1]?.setsWon || 0,
  };

  const handleRestart = () => {
    clearCurrentGame();
    router.replace("/arena");
  };

  return (
    <div
      className="min-h-screen animate-slow-fade bg-black text-white"
      style={{
        backgroundImage: settings.bgUrl ? `url(${settings.bgUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative min-h-screen flex items-center justify-center bg-black/85 px-4 py-5">
        <Link
          href="/"
          className="fixed top-5 left-4 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 shadow-xl px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 transition-colors hover:text-white z-10"
        >
          Início
        </Link>
        <Link
          href="/history"
          className="fixed top-5 right-4 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 shadow-xl px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 transition-colors hover:text-white z-10"
        >
          Histórico
        </Link>

        <ChampionModal
          winnerName={winnerTeam.name}
          score={score}
          configGame={{ maxRounds: finishedGame.maxRounds }}
          durationLabel={formatDuration(finishedGame.startTime, finishedGame.endTime)}
          onRestart={handleRestart}
        />
      </div>
    </div>
  );
}