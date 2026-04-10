"use client";
import React, { useState, useEffect, useRef } from "react";
import { toggleFullScreen } from "../utils/toggleFullScreen";
import ConfigModal from "@/components/Menu/ConfigModal";
import MatchConfigModal from "@/components/InitGame/MatchConfigModal";
import Confetti from "react-confetti-boom";
import { colors_from_image } from "@/constants/colors";
import ChampionModal from "@/components/Winner/ChampionModal";
import Pato from "@/components/pato";
import Link from "next/link";

export default function Arena() {
  const [pointsLeft, setPointsLeft] = useState(0);
  const [pointsRight, setPointsRight] = useState(0);
  const [setsLeft, setSetsLeft] = useState(0);
  const [setsRight, setSetsRight] = useState(0);
  const [showMaoDeFerro, setShowMaoDeFerro] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const initGame = 7;
  const [showConfig, setShowConfig] = useState(false);
  const [startGame, setStartGame] = useState(true);
  const [configGame, setConfigGame] = useState({
    teamLeft: "Time 1",
    teamRight: "Time 2",
    maxRounds: 1,
  });

  // Estados para o novo Modal de Finalização
  const [finishModal, setFinishModal] = useState({
    visible: false,
    winner: null,
    countdown: 10,
  });
  const timerRef = useRef(null);
  const patoTimeoutRef = useRef(null);
  const [showPato, setShowPato] = useState(false);
  const [patoSide, setPatoSide] = useState("right");
  const [patoLosingTeam, setPatoLosingTeam] = useState("");
  const [patoAvailable, setPatoAvailable] = useState({
    left: false,
    right: false,
  });

  const [settings, setSettings] = useState({
    groupName: "TruScore",
    vibrate: false,
    buttonVisible: true,
    bgUrl: "",
  });

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
    setPatoAvailable((prev) => ({
      ...prev,
      [side]: false,
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

  // Lógica do Cronômetro do Modal de Finalização
  useEffect(() => {
    if (finishModal.visible && finishModal.countdown > 0) {
      timerRef.current = setTimeout(() => {
        setFinishModal((prev) => ({ ...prev, countdown: prev.countdown - 1 }));
      }, 1000);
    } else if (finishModal.visible && finishModal.countdown === 0) {
      executeFinishSet(finishModal.winner);
    }
    return () => clearTimeout(timerRef.current);
  }, [finishModal]);

  const handleAddPoints = (side, value) => {
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

    // Atualiza os pontos e verifica disponibilidade do pato para each lado
    const updatePoints = (currentPoints) => {
      const newTotal = currentPoints + value;
      const oppositePoints = side === "left" ? pointsRight : pointsLeft;
      const diff = Math.abs(newTotal - oppositePoints);

      // Habilita o pato se a diferença é >= 6, desabilita caso contrário
      setPatoAvailable((prev) => ({
        ...prev,
        [side]: diff >= 6,
      }));

      return newTotal;
    };

    if (side === "left") {
      const newTotal = updatePoints(pointsLeft);
      setPointsLeft(newTotal);
      if (newTotal >= 15) setTimeout(() => triggerFinishSequence("left"), 100);
    } else {
      const newTotal = updatePoints(pointsRight);
      setPointsRight(newTotal);
      if (newTotal >= 15) setTimeout(() => triggerFinishSequence("right"), 100);
    }

    // Libera o clique após 500ms
    setTimeout(() => {
      setIsProcessing(false);
    }, 500);
  };

  const triggerFinishSequence = (winner) => {
    // 1. Calculamos o que aconteceria com os sets se esse vencedor ganhar a rodada agora
    const nextSetsValue = winner === "left" ? setsLeft + 1 : setsRight + 1;
    const isFinalVictory = nextSetsValue >= configGame.maxRounds;

    if (isFinalVictory) {
      // 2. Se for a vitória final, pulamos o timer e vamos direto para o Campeão
      // Atualizamos o placar de sets para o modal ler o valor correto
      if (winner === "left") setSetsLeft(nextSetsValue);
      else setSetsRight(nextSetsValue);

      setFinishModal({
        visible: false,
        winner: winner,
        countdown: 0,
        championVisible: true, // Abre direto o troféu
      });
    } else {
      // 3. Se não for a final, mostramos o timer de "Fim da Rodada" normalmente
      setFinishModal({
        visible: true,
        winner,
        countdown: initGame,
        championVisible: false,
      });
    }
  };

  const cancelFinish = () => {
    clearTimeout(timerRef.current);
    setFinishModal({ visible: false, winner: null, countdown: initGame });
  };

  const executeFinishSet = (winner) => {
    if (winner === "left") setSetsLeft((s) => s + 1);
    else setSetsRight((s) => s + 1);
    setPointsLeft(0);
    setPointsRight(0);
    setShowMaoDeFerro(false);
    setFinishModal({ visible: false, winner: null, countdown: initGame });
  };

  const handlePerdeTudo = (culpable) => {
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
    setPointsLeft(0);
    setPointsRight(0);
    setSetsLeft(0);
    setSetsRight(0);
  };

  const handleResetFullGame = () => {
    setPointsLeft(0);
    setPointsRight(0);
    setSetsLeft(0);
    setSetsRight(0);
    setShowMaoDeFerro(false);
    setIsProcessing(false);
    setPatoAvailable({
      left: false,
      right: false,
    });
    setPatoLosingTeam("");
    setFinishModal({
      visible: false,
      winner: null,
      countdown: initGame,
      championVisible: false,
    });
    setStartGame(true);
  };

  return (
    <div
      className="fixed inset-0 flex flex-col sm:flex-row items-stretch bg-black text-white font-sans overflow-hidden p-2 select-none"
      style={{
        backgroundImage: settings.bgUrl ? `url(${settings.bgUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed inset-0 flex flex-col sm:flex-row items-stretch bg-black/90 text-white font-sans overflow-hidden p-2 select-none">
        {/* MODAL DE FINALIZAÇÃO */}
        {finishModal.championVisible && (
          <ChampionModal
            isOpen={finishModal.championVisible}
            winnerName={
              finishModal.winner === "left"
                ? configGame.teamLeft
                : configGame.teamRight
            }
            score={{ left: setsLeft, right: setsRight }}
            configGame={configGame}
            onRestart={handleResetFullGame} // <--- Este nome deve bater com a const acima
            onClose={() =>
              setFinishModal((p) => ({ ...p, championVisible: false }))
            }
          />
        )}
        {finishModal.visible && (
          <div className="animate-slow-fade absolute inset-0 z-[120] bg-black/70 backdrop-blur-xl flex items-center justify-center p-2 text-center">
            <div className="max-w-sm w-full bg-zinc-900 border border-zinc-800 p-5 rounded-[2rem] shadow-2xl overflow-y-auto max-h-[98vh] scrollbar-hide">
              {/* Título menor e com menos margem */}
              <h2 className="text-zinc-600 font-black text-xs uppercase mb-1 tracking-widest">
                Fim da Rodada
              </h2>

              {/* Texto de vitória em linha única e fonte menor */}
              <div className="text-3xl font-black text-green-500 mb-4 uppercase italic leading-tight break-words">
                Vitória{" "}
                {finishModal.winner === "left"
                  ? configGame?.teamLeft
                  : configGame?.teamRight}
                !
              </div>

              {/* Contador circular reduzido (h-20 -> h-16) */}
              <div className="relative h-16 w-16 mx-auto mb-5 flex items-center justify-center">
                <span className="text-2xl font-black text-white">
                  {finishModal.countdown}
                </span>
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
                    className="text-zinc-800"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-green-500"
                    strokeDasharray="226"
                    strokeDashoffset={
                      226 - (226 * finishModal.countdown) / initGame
                    }
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
              </div>

              <Confetti mode="boom" shapeSize={15} colors={colors_from_image} />

              {/* --- NOVA ALTERNATIVA 1: Estilo Tecnológico --- */}
              <div className="bg-zinc-950 border border-zinc-800 py-2.5 px-4 rounded-xl mb-2.5 shadow-inner">
                <p className="text-zinc-400 text-[11px] font-mono uppercase tracking-tight flex items-center justify-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Iniciando novo jogo automaticamente...
                </p>
              </div>

              {/* Botão de cancelar com menos padding vertical */}
              <button
                onClick={cancelFinish}
                className="text-zinc-600 hover:text-zinc-400 text-[11px] font-bold uppercase tracking-widest py-1 transition-colors"
              >
                Cancelar (Corrigir Pontos)
              </button>
            </div>
          </div>
        )}

        {/* MODAL MÃO DE FERRO */}
        {showMaoDeFerro && (
          <div className="absolute inset-0 z-[110] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 text-center">
            <div className="w-full max-w-lg">
              <h2 className="text-red-600 font-black text-3xl uppercase mb-2">
                Mão de Ferro
              </h2>
              <p className="text-zinc-400 text-sm mb-8 font-bold">
                Proibido trucar! Quem gritou perde a partida.
              </p>
              <div className="flex flex-col items-center gap-4">
                <div className="flex w-full gap-4 justify-center">
                  <button
                    onClick={() => handlePerdeTudo("left")}
                    className="flex-1 bg-zinc-900 border border-zinc-800 py-8 rounded-2xl active:bg-red-600 transition-colors font-black text-sm sm:text-base"
                  >
                    {configGame?.teamLeft} GRITOU
                  </button>
                  <button
                    onClick={() => handlePerdeTudo("right")}
                    className="flex-1 bg-zinc-900 border border-zinc-800 py-8 rounded-2xl active:bg-red-600 transition-colors font-black text-sm sm:text-base"
                  >
                    {configGame?.teamRight} GRITOU
                  </button>
                </div>
                <button
                  onClick={() => setShowMaoDeFerro(false)}
                  className="mt-4 px-8 py-2 text-[10px] text-zinc-600 uppercase font-bold hover:text-zinc-400 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* COLUNA ESQUERDA (Superior no Mobile) */}

        <aside
          className={`flex flex-row sm:flex-col ${settings.buttonVisible ? "justify-between" : "justify-end"} w-full sm:w-24 h-24 sm:h-auto gap-2 mt-2 sm:mt-0 text-zinc-400`}
        >
          {settings.buttonVisible && (
            <>
              <button
                onClick={() => handleAddPoints("left", 3)}
                className="flex-1 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl active:bg-green-600 active:scale-95 transition-all flex flex-col items-center justify-center"
              >
                <span className="text-[10px] uppercase font-bold">Truco</span>
                <span className="text-xl font-black text-white">+3</span>
              </button>
              {[6, 9, 12].map((v) => (
                <button
                  key={v}
                  onClick={() => handleAddPoints("left", v)}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl active:bg-green-600 active:scale-95 transition-all font-bold text-lg"
                >
                  {v === 12 ? "12" : `+${v}`}
                </button>
              ))}
            </>
          )}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setPointsLeft(Math.max(0, pointsLeft - 1))}
              className="w-14 sm:w-full h-full sm:h-14 bg-red-900/20 border border-red-900/50 rounded-xl text-red-500 font-bold active:bg-red-600 active:text-white transition-all"
            >
              -1
            </button>

            {patoAvailable.left && canLaunchPato("left") && (
              /* Wrapper relativo para o efeito não quebrar o flex */
              <div className="relative w-14 sm:w-full h-14">
                {/* O Ping: Fica exatamente atrás do botão */}
                <span className="absolute inset-0 rounded-xl bg-purple-500 opacity-75 animate-ping"></span>
                <button
                  type="button"
                  onClick={() => handleLaunchPato("left")}
                  style={{
                    backgroundImage: "url(/pato.gif)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  /* relative e z-10 para ficar na frente do ping */
                  className="relative z-10 w-full h-full bg-cyan-900/20 border border-cyan-500 rounded-xl text-cyan-200 font-bold hover:bg-cyan-800/40"
                ></button>
              </div>
            )}
          </div>
        </aside>

        {/* CENTRO */}
        <main className="flex-1 flex flex-col px-4 min-h-0">
          <header className="flex justify-between items-start pt-2">
            <div className="flex gap-1 w-12 sm:w-24">
              <Link
                href="/"
                prefetch
                className="p-2 text-zinc-500 hover:text-white transition-colors"
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
                className="p-2 text-zinc-500 hover:text-white"
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
                      className={`text-4xl sm:text-3xl ${i < setsLeft ? "text-green-500" : "text-zinc-800"}`}
                    >
                      ●
                    </span>
                  ))}
                </div>
                <div className="h-4 w-[1px] bg-zinc-800"></div>
                <div className="flex gap-1">
                  {[...Array(configGame.maxRounds)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-4xl sm:text-3xl ${i < setsRight ? "text-green-500" : "text-zinc-800"}`}
                    >
                      ●
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-1 w-12 sm:w-24 justify-end">
              <button
                onClick={toggleFullScreen}
                className="p-2 text-zinc-500 hover:text-white transition-colors active:scale-90"
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
                className="p-2 text-zinc-500 hover:text-white transition-colors"
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

          <section className="flex-1 flex flex-col sm:flex-row items-center justify-around relative">
            <div
              className="
                absolute left-0 right-0 top-1/2 -translate-y-1/2 
                h-[1px] w-full 
                bg-gradient-to-r from-transparent via-zinc-800 to-transparent
                sm:left-1/2 sm:right-auto sm:top-0 sm:bottom-0 sm:translate-y-0
                sm:w-[2px] sm:h-full 
                sm:bg-gradient-to-b
              "
            ></div>
            <div
              className="text-center z-10 py-4 sm:py-0 pr-6 w-full"
              onClick={() => handleAddPoints("left", 1)}
            >
              <span className="block text-[12rem] sm:text-[15rem] font-black leading-none tracking-tighter">
                {String(pointsLeft).padStart(2, "0")}
              </span>
              <span className="text-md uppercase tracking-widest text-zinc-200 font-bold">
                {configGame?.teamLeft}
              </span>
            </div>

            <div
              className="text-center z-10 py-4 sm:py-0 w-full"
              onClick={() => handleAddPoints("right", 1)}
            >
              <span className="block text-[12rem] sm:text-[15rem] font-black leading-none tracking-tighter text-zinc-400">
                {String(pointsRight).padStart(2, "0")}
              </span>
              <span className="text-md uppercase tracking-widest text-zinc-200 font-bold">
                {configGame?.teamRight}
              </span>
            </div>
          </section>

          <footer className="flex flex-col items-center justify-center">
            {(pointsLeft === 14 || pointsRight === 14) && (
              <button
                onClick={() => handlePerdeTudo()}
                className="fixed bottom-24 sm:bottom-0 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-4rem)] md:w-auto md:px-6 py-2 bg-red-900/20 border border-red-900/50 rounded-2xl text-white text-sm font-black uppercase animate-pulse"
              >
                Perde Tudo
              </button>
            )}
          </footer>
        </main>

        {/* COLUNA DIREITA (Inferior no Mobile) */}

        <aside
          className={`flex flex-row sm:flex-col ${settings.buttonVisible ? "justify-between" : "justify-end"} w-full sm:w-24 h-24 sm:h-auto gap-2 mt-2 sm:mt-0 text-zinc-400`}
        >
          {settings.buttonVisible && (
            <>
              <button
                onClick={() => handleAddPoints("right", 3)}
                className="flex-1 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl active:bg-green-600 active:scale-95 transition-all flex flex-col items-center justify-center"
              >
                <span className="text-[10px] uppercase font-bold">Truco</span>
                <span className="text-xl font-black text-white">+3</span>
              </button>
              {[6, 9, 12].map((v) => (
                <button
                  key={v}
                  onClick={() => handleAddPoints("right", v)}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl active:bg-green-600 active:scale-95 transition-all font-bold text-lg"
                >
                  {v === 12 ? "12" : `+${v}`}
                </button>
              ))}
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            {patoAvailable.right && canLaunchPato("right") && (
              /* Wrapper relativo para o efeito não quebrar o flex */
              <div className="relative w-14 sm:w-full h-14">
                {/* O Ping: Fica exatamente atrás do botão */}
                <span className="absolute inset-0 rounded-xl bg-purple-500 opacity-75 animate-ping"></span>
                <button
                  type="button"
                  onClick={() => handleLaunchPato("right")}
                  style={{
                    backgroundImage: "url(/pato.gif)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: "scaleX(-1)",
                  }}
                  /* relative e z-10 para ficar na frente do ping */
                  className="relative z-10 w-full h-full bg-cyan-900/20 border border-cyan-500 rounded-xl text-cyan-200 font-bold hover:bg-cyan-800/40"
                ></button>
              </div>
            )}
            <button
              onClick={() => setPointsRight(Math.max(0, pointsRight - 1))}
              className="w-14 sm:w-full h-full sm:h-14 bg-red-900/20 border border-red-900/50 rounded-xl text-red-500 font-bold active:bg-red-600 active:text-white transition-all"
            >
              -1
            </button>
          </div>
        </aside>

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
          onStart={setConfigGame}
          handleInitGame={handleInitGame}
          onClose={() => {
            setStartGame(false);
          }}
        />
      </div>
    </div>
  );
}
