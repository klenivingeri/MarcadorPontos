"use client";
import React, { useState, useEffect, useRef } from "react";
import { toggleFullScreen } from "../utils/toggleFullScreen";
import ConfigModal from "@/components/Menu/ConfigModal";
import MatchConfigModal from "@/components/InitGame/MatchConfigModal";
import Confetti from "react-confetti-boom";
import { colors_from_image } from "@/constants/colors";
import ChampionModal from "@/components/Winner/ChampionModal";

export default function Arena() {
  const [pointsLeft, setPointsLeft] = useState(0);
  const [pointsRight, setPointsRight] = useState(0);
  const [setsLeft, setSetsLeft] = useState(0);
  const [setsRight, setSetsRight] = useState(0);
  const [showMaoDeFerro, setShowMaoDeFerro] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const initGame = 10;
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

  const [settings, setSettings] = useState({
    groupName: "TruScore",
    vibrate: true,
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
    // Se estiver no tempo de espera, ignora o clique
    if (isProcessing) return;

    // Bloqueia novos cliques
    if (value > 1) setIsProcessing(true);

    if (side === "left") {
      const newTotal = pointsLeft + value;
      if (newTotal >= 15) triggerFinishSequence("left");
      else setPointsLeft(newTotal);
    } else {
      const newTotal = pointsRight + value;
      if (newTotal >= 15) triggerFinishSequence("right");
      else setPointsRight(newTotal);
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
          <div className="absolute inset-0 z-[120] bg-black/60 backdrop-blur-xl flex items-center justify-center p-6 text-center">
            <div className="max-w-sm w-full bg-zinc-900/80 border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl">
              <h2 className="text-zinc-500 font-black text-xl uppercase mb-1">
                Fim da Rodada
              </h2>
              <div className="text-5xl font-black text-green-500 mb-4 uppercase italic">
                Vitória <br />{" "}
                {finishModal.winner === "left"
                  ? configGame?.teamLeft
                  : configGame?.teamRight}
                !
              </div>
              <div className="relative h-20 w-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl font-black">
                  {finishModal.countdown}
                </span>
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-zinc-800"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-green-500"
                    strokeDasharray="226"
                    strokeDashoffset={
                      226 - (226 * finishModal.countdown) / initGame
                    }
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
              </div>
              <Confetti mode="boom" shapeSize={20} colors={colors_from_image} />
              <p className="text-zinc-400 text-sm mb-6">
                Iniciando novo jogo automaticamente...
              </p>
              <button
                onClick={cancelFinish}
                className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase active:scale-95 transition-transform"
              >
                Corrigir Pontos (Cancelar)
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
        <aside className="flex flex-row sm:flex-col justify-between w-full sm:w-24 h-24 sm:h-auto gap-2 mb-2 sm:mb-0">
          <button
            onClick={() => handleAddPoints("left", 3)}
            className="flex-1 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl active:bg-green-600 active:scale-95 transition-all flex flex-col items-center justify-center"
          >
            <span className="text-[10px] text-zinc-400 uppercase font-bold">
              Truco
            </span>
            <span className="text-xl font-black">+3</span>
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
          <button
            onClick={() => setPointsLeft(Math.max(0, pointsLeft - 1))}
            className="w-14 sm:w-full h-full sm:h-14 bg-red-900/20 border border-red-900/50 rounded-xl text-red-500 font-bold active:bg-red-600 active:text-white transition-all"
          >
            -1
          </button>
        </aside>

        {/* CENTRO */}
        <main className="flex-1 flex flex-col px-4 min-h-0">
          <header className="flex justify-between items-start pt-2">
            <div className="flex gap-1 w-12 sm:w-24">
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
                      className={`text-lg sm:text-xl ${i < setsLeft ? "text-green-500" : "text-zinc-800"}`}
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
                      className={`text-lg sm:text-xl ${i < setsRight ? "text-green-500" : "text-zinc-800"}`}
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
                sm:w-[1px] sm:h-full 
                sm:bg-gradient-to-b
              "
            ></div>
            <div
              className="text-center z-10 py-4 sm:py-0 pr-4"
              onClick={() => handleAddPoints("left", 1)}
            >
              <span className="block text-[8rem] sm:text-[15rem] font-black leading-none tracking-tighter">
                {String(pointsLeft).padStart(2, "0")}
              </span>
              <span className="text-xs uppercase tracking-widest text-zinc-200 font-bold">
                {configGame?.teamLeft}
              </span>
            </div>

            <div
              className="text-center z-10 py-4 sm:py-0 pr-4"
              onClick={() => handleAddPoints("right", 1)}
            >
              <span className="block text-[8rem] sm:text-[15rem] font-black leading-none tracking-tighter text-zinc-400">
                {String(pointsRight).padStart(2, "0")}
              </span>
              <span className="text-xs uppercase tracking-widest text-zinc-200 font-bold">
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
        <aside className="flex flex-row sm:flex-col justify-between w-full sm:w-24 h-24 sm:h-auto gap-2 mt-2 sm:mt-0 text-zinc-400">
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
          <button
            onClick={() => setPointsRight(Math.max(0, pointsRight - 1))}
            className="w-14 sm:w-full h-full sm:h-14 bg-red-900/20 border border-red-900/50 rounded-xl text-red-500 font-bold active:bg-red-600 active:text-white transition-all"
          >
            -1
          </button>
        </aside>
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
