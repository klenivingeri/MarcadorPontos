"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toggleFullScreen } from "../utils/toggleFullScreen";
import ConfigModal from "@/components/Menu/ConfigModal";
import MatchConfigModal from "@/components/InitGame/MatchConfigModal";
import Pato from "@/components/pato";
import ArenaScoreSection from "@/components/Arena/ArenaScoreSection";
import ArenaPointsAside from "@/components/Arena/ArenaPointsAside";
import Link from "next/link";
import { useGame } from "@/context/GameContext";

const DEFAULT_MATCH_CONFIG = {
  teamLeft: "Time 1",
  teamRight: "Time 2",
  maxRounds: 1,
};

export default function Arena() {
  const router = useRouter();
  const {
    currentGame,
    startGame: startMatch,
    addPoints,
    subtractPoint,
    finalizeGame,
  } = useGame();
  const [showMaoDeFerro, setShowMaoDeFerro] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [startGame, setStartGame] = useState(
    !currentGame || currentGame.status === "finished",
  );
  const patoTimeoutRef = useRef(null);
  const [showPato, setShowPato] = useState(false);
  const [patoSide, setPatoSide] = useState("right");
  const [patoLosingTeam, setPatoLosingTeam] = useState("");
  const [showLeastOne, setShowLeastOne] = useState(false);
  const [disabledPatoSides, setDisabledPatoSides] = useState({
    left: false,
    right: false,
  });

  const [settings, setSettings] = useState({
    groupName: "TruScore",
    vibrate: false,
    buttonVisible: true,
    bgUrl: "",
  });

  const leftTeam = currentGame?.teams?.[0];
  const rightTeam = currentGame?.teams?.[1];
  const pointsLeft = leftTeam?.score || 0;
  const pointsRight = rightTeam?.score || 0;
  const setsLeft = leftTeam?.setsWon || 0;
  const setsRight = rightTeam?.setsWon || 0;
  const configGame = {
    teamLeft: leftTeam?.name || DEFAULT_MATCH_CONFIG.teamLeft,
    teamRight: rightTeam?.name || DEFAULT_MATCH_CONFIG.teamRight,
    maxRounds: currentGame?.maxRounds || DEFAULT_MATCH_CONFIG.maxRounds,
  };
  const patoAvailable = {
    left:
      !!currentGame &&
      pointsLeft - pointsRight >= 6 &&
      !disabledPatoSides.left,
    right:
      !!currentGame &&
      pointsRight - pointsLeft >= 6 &&
      !disabledPatoSides.right,
  };

  useEffect(() => {
    const loadSettings = () => {
      const saved = localStorage.getItem("truscore_settings");
      if (saved) setSettings(JSON.parse(saved));
    };

    loadSettings();

    // 3. Opcional: Ouve mudanças de outras abas ou do modal
    window.addEventListener("storage", loadSettings);
    return () => window.removeEventListener("storage", loadSettings);
  }, []);

  useEffect(() => {
    return () => {
      if (patoTimeoutRef.current) {
        clearTimeout(patoTimeoutRef.current);
      }
    };
  }, []);

  const canLaunchPato = (side) => {
    if (!currentGame) return false;

    const diff =
      side === "right" ? pointsRight - pointsLeft : pointsLeft - pointsRight;
    return diff >= 6;
  };

  const handleLaunchPato = (side) => {
    if (!canLaunchPato(side)) return;

    if (patoTimeoutRef.current) {
      clearTimeout(patoTimeoutRef.current);
    }

    // Desabilita o pato do lado que foi clicado
    setDisabledPatoSides((prev) => ({
      ...prev,
      [side]: true,
    }));

    const oppositeSide = side === "left" ? "right" : "left";

    // Define o nome do time que está perdendo
    const losingTeamName =
      oppositeSide === "left" ? configGame.teamLeft : configGame.teamRight;
    setPatoLosingTeam(losingTeamName);

    setPatoSide(oppositeSide);
    setShowPato(true);
    patoTimeoutRef.current = setTimeout(() => {
      setShowPato(false);
    }, 5000);
  };

  // 4. Função que você passa para o onClose do Modal
  const updateSettings = () => {
    const saved = localStorage.getItem("truscore_settings");
    if (saved) setSettings(JSON.parse(saved));
  };

  const handleAddPoints = (side, value) => {
    if (!currentGame || currentGame.status !== "playing") return;

    // Retorno tátil opcional ao atribuir pontos
    if (
      settings.vibrate &&
      typeof navigator !== "undefined" &&
      typeof navigator.vibrate === "function"
    ) {
      navigator.vibrate(25);
    }

    // Se estiver no tempo de espera, ignora o clique
    if (isProcessing) return;

    // Bloqueia novos cliques
    if (value > 1) setIsProcessing(true);
    setDisabledPatoSides({ left: false, right: false });
    const nextGame = addPoints(side, value);
    const nextScore = side === "left"
      ? nextGame?.teams?.[0]?.score || 0
      : nextGame?.teams?.[1]?.score || 0;

    if (nextScore >= 15) {
      setTimeout(() => triggerFinishSequence(side), 100);
    }

    // Libera o clique após 500ms
    setTimeout(() => {
      setIsProcessing(false);
    }, 500);
  };

  const triggerFinishSequence = (winner) => {
    if (!currentGame) return;

    // 1. Calculamos o que aconteceria com os sets se esse vencedor ganhar a rodada agora
    const nextSetsValue = winner === "left" ? setsLeft + 1 : setsRight + 1;
    const isFinalVictory = nextSetsValue >= configGame.maxRounds;

    if (isFinalVictory) {
      finalizeGame(winner);
      setShowMaoDeFerro(false);
      router.replace("/arena/champion");
    } else {
      setShowMaoDeFerro(false);
      router.replace(`/arena/round-finish?winner=${winner}`);
    }
  };

  const handlePerdeTudo = (culpable) => {
    if (!currentGame) return;

    if (pointsLeft === 14 && pointsRight === 14) {
      if (!culpable) {
        setShowMaoDeFerro(true);
        return;
      }
      triggerFinishSequence(culpable === "left" ? "right" : "left");
    } else {
      if (pointsLeft === 14) triggerFinishSequence("right");
      else if (pointsRight === 14) triggerFinishSequence("left");
    }
  };

  const handleInitGame = () => {
    if (patoTimeoutRef.current) {
      clearTimeout(patoTimeoutRef.current);
    }
    setShowPato(false);
    setPatoSide("right");
    setPatoLosingTeam("");
    setDisabledPatoSides({ left: false, right: false });
    setShowMaoDeFerro(false);
    setIsProcessing(false);
  };

  const handleSubtractPoint = (side) => {
    setDisabledPatoSides({ left: false, right: false });
    subtractPoint(side);
  };

  return (
    <div
      className="fixed inset-0 flex flex-col sm:flex-row items-stretch tru-page-bg tru-page-text font-sans overflow-hidden p-2 select-none"
      style={{
        backgroundImage: settings.bgUrl ? `url("${settings.bgUrl}")` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed inset-0 flex flex-col sm:flex-row items-stretch tru-overlay-bg tru-page-text font-sans overflow-hidden p-2 select-none">
        {/* MODAL MÃO DE FERRO */}
        {showMaoDeFerro && (
          <div className="absolute inset-0 z-110 tru-overlay-bg backdrop-blur-md flex items-center justify-center p-4 text-center">
            <div className="w-full max-w-lg">
              <h2 className="tru-danger-text font-black text-3xl uppercase mb-2">
                Mão de Ferro
              </h2>
              <p className="text-zinc-400 text-sm mb-8 font-bold">
                Proibido trucar! Quem gritou perde a partida.
              </p>
              <div className="flex flex-col items-center gap-4">
                <div className="flex w-full gap-4 justify-center">
                  <button
                    onClick={() => handlePerdeTudo("left")}
                    className="flex-1 py-8 rounded-2xl transition-colors font-black text-sm sm:text-base tru-danger-soft tru-danger-active"
                  >
                    {configGame?.teamLeft} GRITOU
                  </button>
                  <button
                    onClick={() => handlePerdeTudo("right")}
                    className="flex-1 py-8 rounded-2xl transition-colors font-black text-sm sm:text-base tru-danger-soft tru-danger-active"
                  >
                    {configGame?.teamRight} GRITOU
                  </button>
                </div>
                <button
                  onClick={() => setShowMaoDeFerro(false)}
                  className="mt-4 px-8 py-2 text-[10px] uppercase font-bold transition-colors tru-btn-ghost"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* COLUNA ESQUERDA (Superior no Mobile) */}
        <ArenaPointsAside
          side="left"
          buttonVisible={settings.buttonVisible}
          onAddPoints={handleAddPoints}
        />

        <main className="flex-1 flex flex-col px-4 min-h-0">
          <header className="flex justify-between items-start pt-2">
            <div className="flex gap-1 w-full">
              <Link
                href="/"
                prefetch
                className="p-2 transition-colors tru-btn-icon"
                title="Voltar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Link>
              <button
                onClick={() => {
                  setStartGame(true);
                }}
                className="p-2 transition-colors tru-btn-icon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">
                Rodadas
              </span>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex flex-row-reverse gap-1">
                  {[...Array(configGame.maxRounds)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-4xl sm:text-3xl ${i < setsLeft ? "tru-accent-text" : "text-zinc-800"}`}
                    >
                      ●
                    </span>
                  ))}
                </div>
                <div className="h-4 w-px bg-zinc-800"></div>
                <div className="flex gap-1">
                  {[...Array(configGame.maxRounds)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-4xl sm:text-3xl ${i < setsRight ? "tru-accent-text" : "text-zinc-800"}`}
                    >
                      ●
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-1 w-full justify-end">
              <button
                onClick={() => setShowLeastOne(!showLeastOne)}
                className="p-2 transition-colors active:scale-90 tru-btn-icon"
              >
                -1
              </button>
              <button
                onClick={toggleFullScreen}
                className="p-2 transition-colors active:scale-90 tru-btn-icon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                  <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                  <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
              </button>
              <button
                onClick={() => setShowConfig(true)}
                className="p-2 transition-colors tru-btn-icon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </header>

          <ArenaScoreSection
            pointsLeft={pointsLeft}
            pointsRight={pointsRight}
            teamLeft={configGame?.teamLeft}
            teamRight={configGame?.teamRight}
            showLeastOne={showLeastOne}
            patoAvailable={patoAvailable}
            canLaunchPato={canLaunchPato}
            onAddOne={(side) => handleAddPoints(side, 1)}
            onSubtractLeft={() => handleSubtractPoint("left")}
            onSubtractRight={() => handleSubtractPoint("right")}
            onLaunchPato={handleLaunchPato}
            onPerdeTudo={() => handlePerdeTudo()}
          />
        </main>

        {/* COLUNA DIREITA (Inferior no Mobile) */}
        <ArenaPointsAside
          side="right"
          buttonVisible={settings.buttonVisible}
          onAddPoints={handleAddPoints}
        />

        {showPato && <Pato side={patoSide} losingTeamName={patoLosingTeam} />}
        <ConfigModal
          isOpen={showConfig}
          onClose={() => {
            setShowConfig(false);
            updateSettings(); // Atualiza o estado do App com o que foi salvo
          }}
        />
        <MatchConfigModal
          isOpen={startGame}
          onStart={(matchConfig) => startMatch(matchConfig)}
          handleInitGame={handleInitGame}
          onClose={({ started } = {}) => {
            if (!started && (!currentGame || currentGame.status === "finished")) {
              startMatch(DEFAULT_MATCH_CONFIG);
            }
            setStartGame(false);
          }}
        />
      </div>
    </div>
  );
}
