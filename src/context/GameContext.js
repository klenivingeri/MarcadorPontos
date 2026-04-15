"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import {
  getPointXpReward,
  getSetXpReward,
  XP_LEVEL_BASE,
  XP_LEVEL_EXPONENT,
  XP_MATCH_WIN_BONUS,
  XP_POINT_REWARDS,
} from "@/constants/xp";

const GAME_HISTORY_STORAGE_KEY = "game_history";
export const XP_PROFILE_STORAGE_KEY = "truscore_xp_profile";
const SETTINGS_STORAGE_KEY = "truscore_settings";
export const LAST_FINISHED_GAME_STORAGE_KEY = "last_finished_game";

const DEFAULT_XP_PROFILE = {
  totalXp: 0,
  updatedAt: null,
  lastAward: null,
};

export const getRequiredSetsToWin = (maxRounds = 1) =>
  Math.max(1, Math.ceil(maxRounds / 2));

export const getXpRequiredForLevel = (level = 1) =>
  Math.max(XP_LEVEL_BASE, Math.round(XP_LEVEL_BASE * Math.pow(level, XP_LEVEL_EXPONENT)));

export const getXpProgression = (totalXp = 0) => {
  const safeTotalXp = Math.max(0, Number(totalXp) || 0);
  let level = 1;
  let remainingXp = safeTotalXp;
  let nextLevelXp = getXpRequiredForLevel(level);

  while (remainingXp >= nextLevelXp) {
    remainingXp -= nextLevelXp;
    level += 1;
    nextLevelXp = getXpRequiredForLevel(level);
  }

  const progressPercent = Math.min(
    100,
    Math.round((remainingXp / nextLevelXp) * 100),
  );

  return {
    level,
    currentLevelXp: remainingXp,
    nextLevelXp,
    progressPercent,
  };
};

const parseJSONSafely = (rawValue, fallbackValue) => {
  try {
    return rawValue ? JSON.parse(rawValue) : fallbackValue;
  } catch {
    return fallbackValue;
  }
};

const normalizeIdentifier = (value) => (value || "").trim().toLowerCase();

const getStoredIdentifier = () => {
  if (typeof window === "undefined") {
    return "";
  }

  const settings = parseJSONSafely(localStorage.getItem(SETTINGS_STORAGE_KEY), {});
  return normalizeIdentifier(settings?.groupName);
};

const doesTeamMatchIdentifier = (teamName, identifier) => {
  const normalizedTeamName = normalizeIdentifier(teamName);

  if (!identifier || !normalizedTeamName) {
    return false;
  }

  return normalizedTeamName.includes(identifier);
};

const shouldRewardSide = (game, side) => {
  const identifier = getStoredIdentifier();

  if (!identifier || !game?.teams?.length) {
    return false;
  }

  const sideIndex = side === "left" ? 0 : 1;
  const sideTeamName = game.teams[sideIndex]?.name;
  return doesTeamMatchIdentifier(sideTeamName, identifier);
};

export const readXpProfile = () => {
  if (typeof window === "undefined") {
    return DEFAULT_XP_PROFILE;
  }

  const savedProfile = parseJSONSafely(
    localStorage.getItem(XP_PROFILE_STORAGE_KEY),
    DEFAULT_XP_PROFILE,
  );

  return {
    ...DEFAULT_XP_PROFILE,
    ...savedProfile,
    totalXp: Math.max(0, Number(savedProfile?.totalXp) || 0),
  };
};

const saveXpProfile = (profile) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(XP_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event("storage"));
};

const awardXp = (amount, reason) => {
  const safeAmount = Number(amount) || 0;

  if (safeAmount === 0) {
    return readXpProfile();
  }

  const currentProfile = readXpProfile();
  const nextProfile = {
    ...currentProfile,
    totalXp: Math.max(0, currentProfile.totalXp + safeAmount),
    updatedAt: Date.now(),
    lastAward: {
      reason,
      amount: safeAmount,
      at: Date.now(),
    },
  };

  saveXpProfile(nextProfile);
  return nextProfile;
};

const getStreakXpBonus = (streak) => {
  if (streak < 3) {
    return 0;
  }

  return Math.min(20, Math.floor(streak / 2));
};

const GameContext = createContext(null);

const createId = (prefix) => {
  const randomId =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return `${prefix}-${randomId}`;
};

const createTeam = (name, sequential) => ({
  id: createId(`team-${sequential}`),
  name,
  score: 0,
  setsWon: 0,
  sequential: 0,
  clutch: null,
});

const createGame = ({ teamLeft, teamRight, maxRounds }) => ({
  id: createId("game"),
  teams: [createTeam(teamLeft, 1), createTeam(teamRight, 2)],
  sets: [],
  currentSet: 1,
  maxRounds,
  status: "playing",
  startTime: Date.now(),
  endTime: null,
});

const saveFinishedGame = (game) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const savedHistory = JSON.parse(
      localStorage.getItem(GAME_HISTORY_STORAGE_KEY) || "[]",
    );
    const updatedHistory = [game, ...savedHistory.filter((entry) => entry.id !== game.id)];
    localStorage.setItem(GAME_HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
    localStorage.setItem(LAST_FINISHED_GAME_STORAGE_KEY, JSON.stringify(game));
  } catch (error) {
    console.error("Erro ao salvar histórico da partida:", error);
  }
};

const clearFinishedGameSnapshot = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(LAST_FINISHED_GAME_STORAGE_KEY);
};

const applySetResult = (game, winnerSide, options = {}) => {
  if (!game) {
    return null;
  }

  const { isFinal = false } = options;
  const winnerIndex = winnerSide === "left" ? 0 : 1;
  const winnerTeamId = game.teams[winnerIndex]?.id;

  if (!winnerTeamId) {
    return game;
  }

  return {
    ...game,
    teams: game.teams.map((team, index) => ({
      ...team,
      score: isFinal ? team.score : 0,
      setsWon: team.setsWon + (index === winnerIndex ? 1 : 0),
      sequential: team.sequential,
    })),
    sets: [
      ...game.sets,
      {
        id: createId(`set-${game.currentSet}`),
        winnerTeamId,
        score: game.teams.map((team) => team.score),
      },
    ],
    currentSet: isFinal ? game.currentSet : game.currentSet + 1,
  };
};

export function GameProvider({ children }) {
  const [currentGame, setCurrentGame] = useState(null);
  const currentGameRef = useRef(null);
  const currentSequenceRef = useRef({ left: 0, right: 0 });

  const commitGame = (nextGame) => {
    currentGameRef.current = nextGame;
    setCurrentGame(nextGame);
    return nextGame;
  };

  const startGame = (config) => {
    currentSequenceRef.current = { left: 0, right: 0 };
    clearFinishedGameSnapshot();
    const nextGame = createGame(config);
    return commitGame(nextGame);
  };

  const addPoints = (side, value) => {
    const game = currentGameRef.current;

    if (!game || game.status !== "playing") {
      return game;
    }

    const scoringIndex = side === "left" ? 0 : 1;
    const defendingIndex = side === "left" ? 1 : 0;
    const scoringSide = side === "left" ? "left" : "right";
    const defendingSide = side === "left" ? "right" : "left";

    currentSequenceRef.current = {
      ...currentSequenceRef.current,
      [scoringSide]: currentSequenceRef.current[scoringSide] + 1,
      [defendingSide]: 0,
    };

    if (shouldRewardSide(game, side)) {
      const pointReward = getPointXpReward(value);
      const streakBonus = getStreakXpBonus(currentSequenceRef.current[scoringSide]);
      awardXp(pointReward + streakBonus, "point");
    }

    const nextGame = {
      ...game,
      teams: game.teams.map((team, index) => {
        if (index === scoringIndex) {
          return {
            ...team,
            score: team.score + value,
            sequential: Math.max(
              team.sequential,
              currentSequenceRef.current[scoringSide],
            ),
            clutch:
              value >= 3
                ? Math.max(team.clutch || 0, value)
                : team.clutch,
          };
        }

        if (index === defendingIndex) {
          return team;
        }

        return team;
      }),
    };

    return commitGame(nextGame);
  };

  const subtractPoint = (side) => {
    const game = currentGameRef.current;

    if (!game || game.status !== "playing") {
      return game;
    }

    currentSequenceRef.current = { left: 0, right: 0 };

    if (shouldRewardSide(game, side)) {
      awardXp(-XP_POINT_REWARDS[1], "point_revert");
    }

    const targetIndex = side === "left" ? 0 : 1;
    const nextGame = {
      ...game,
      teams: game.teams.map((team, index) => {
        if (index !== targetIndex) {
          return team;
        }

        return {
          ...team,
          score: Math.max(0, team.score - 1),
          sequential: team.sequential,
        };
      }),
    };

    return commitGame(nextGame);
  };

  const completeSet = (winnerSide) => {
    const game = currentGameRef.current;
    currentSequenceRef.current = { left: 0, right: 0 };

    if (shouldRewardSide(game, winnerSide)) {
      awardXp(getSetXpReward(game?.maxRounds), "set_win");
    }

    const nextGame = applySetResult(game, winnerSide);

    if (!nextGame) {
      return game;
    }

    return commitGame(nextGame);
  };

  const finalizeGame = (winnerSide) => {
    const game = currentGameRef.current;
    currentSequenceRef.current = { left: 0, right: 0 };

    if (shouldRewardSide(game, winnerSide)) {
      const setReward = getSetXpReward(game?.maxRounds);
      awardXp(setReward + XP_MATCH_WIN_BONUS, "match_win");
    }

    const completedGame = applySetResult(game, winnerSide, { isFinal: true });

    if (!completedGame) {
      return game;
    }

    const finishedGame = {
      ...completedGame,
      status: "finished",
      endTime: Date.now(),
    };

    saveFinishedGame(finishedGame);
    return commitGame(finishedGame);
  };

  const clearCurrentGame = () => {
    currentSequenceRef.current = { left: 0, right: 0 };
    clearFinishedGameSnapshot();
    return commitGame(null);
  };

  return (
    <GameContext.Provider
      value={{
        currentGame,
        startGame,
        addPoints,
        subtractPoint,
        completeSet,
        finalizeGame,
        clearCurrentGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame precisa ser usado dentro de GameProvider");
  }

  return context;
}