"use client";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import MatchSummaryModal from "@/components/History/MatchSummaryModal";

const mapGameToHistoryView = (game) => {
  const leftTeam = game?.teams?.[0] || {
    id: "left",
    name: "Time 1",
    setsWon: 0,
  };
  const rightTeam = game?.teams?.[1] || {
    id: "right",
    name: "Time 2",
    setsWon: 0,
  };
  const winnerTeam =
    leftTeam.setsWon >= rightTeam.setsWon ? leftTeam : rightTeam;
  const matchDate = game?.endTime ? new Date(game.endTime) : null;

  return {
    id: game?.id,
    teams: {
      left: leftTeam.name,
      right: rightTeam.name,
    },
    winner: winnerTeam.name,
    score: {
      left: leftTeam.setsWon || 0,
      right: rightTeam.setsWon || 0,
    },
    date: matchDate ? matchDate.toLocaleDateString("pt-BR") : "Sem data",
    time: matchDate
      ? matchDate.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--:--",
    raw: game,
  };
};

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [userSettings, setUserSettings] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("game_history") || "[]",
    );
    const savedSettings = JSON.parse(
      localStorage.getItem("truscore_settings") || "{}",
    );
    setHistory(savedHistory);
    setUserSettings(savedSettings);
  }, []);

  const mappedHistory = useMemo(
    () => history.map((game) => mapGameToHistoryView(game)),
    [history],
  );

  // Define o alvo da análise (Prioriza a busca, depois o ID salvo)
  const activeTarget = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const savedId = userSettings?.groupName?.toLowerCase();
    if (term) return term;
    if (savedId && savedId !== "não definido") return savedId;
    return "";
  }, [searchTerm, userSettings]);

  // 1. Filtro da Lista
  const filteredHistory = useMemo(() => {
    if (!searchTerm) return mappedHistory;
    const term = searchTerm.toLowerCase();
    return mappedHistory.filter(
      (game) =>
        game.teams.left.toLowerCase().includes(term) ||
        game.teams.right.toLowerCase().includes(term) ||
        game.winner.toLowerCase().includes(term),
    );
  }, [mappedHistory, searchTerm]);

  // 2. Estatísticas Dinâmicas (Win Streak e Losses)
  const stats = useMemo(() => {
    const target = activeTarget.toLowerCase();
    if (!target) return { streak: 0, wins: 0, losses: 0, winRate: 0 };

    let streak = 0;
    let wins = 0;
    let losses = 0;
    let isStreakActive = true;

    // Iteramos do mais recente para o mais antigo
    for (let i = mappedHistory.length - 1; i >= 0; i--) {
      const game = mappedHistory[i];
      const teamLeft = game.teams.left.toLowerCase();
      const teamRight = game.teams.right.toLowerCase();
      const winner = game.winner.toLowerCase();

      const isInMatch = teamLeft.includes(target) || teamRight.includes(target);
      if (!isInMatch) continue;

      const isWinner = winner.includes(target);

      if (isWinner) {
        wins++;
        if (isStreakActive) streak++;
      } else {
        losses++;
        isStreakActive = false; // Acabou a sequência de vitórias atual
      }
    }

    const totalGames = wins + losses;
    const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;

    return { streak, wins, losses, winRate };
  }, [mappedHistory, activeTarget]);

  const deleteEntry = (id) => {
    if (confirm("Excluir esta partida?")) {
      const updated = history.filter((item) => item.id !== id);
      localStorage.setItem("game_history", JSON.stringify(updated));
      setHistory(updated);
    }
  };

  const openMatchSummary = (game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen tru-page-bg tru-page-text p-6 pb-24 font-sans">
      <header className="max-w-4xl mx-auto mb-10">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/"
            className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all active:scale-90"
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

          <h1 className="text-4xl font-black italic tracking-tighter tru-accent-text uppercase">
            Historico
          </h1>
          <button
            onClick={() => {
              if (!confirm("Limpar histórico?")) {
                return;
              }

              localStorage.setItem("game_history", JSON.stringify([]));
              setHistory([]);
            }}
            className="text-[10px] font-bold uppercase tracking-widest transition-all tru-btn-ghost px-3 py-2 rounded-xl"
          >
            Limpar Tudo
          </button>
        </div>

        {/* Campo de Busca */}
        <div className="mb-8">
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-3 block">
            Pesquisar Jogador ou Time
          </label>
          <input
            type="text"
            placeholder="EX: ERICK..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-5 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-(--tru-focus) outline-none tru-progress-text placeholder:text-zinc-800 transition-all"
          />
        </div>

        {/* Dashboard de Stats - Abaixo da Busca */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-zinc-900 p-4 rounded-4xl border-l-4 tru-accent-border shadow-2xl relative overflow-hidden">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
              Win Streak {activeTarget && `• ${activeTarget}`}
            </span>
            <div className="text-6xl font-black italic text-white tracking-tighter">
              {String(stats.wins).padStart(2, "0")}
            </div>
            <div className="absolute -right-4 -bottom-4 tru-accent-text text-8xl font-black italic uppercase opacity-5">
              Win
            </div>
          </div>

          <div className="bg-zinc-900 p-4 rounded-4xl border-l-4 border-(--tru-danger) shadow-2xl relative overflow-hidden">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
              Total Losses {activeTarget && `• ${activeTarget}`}
            </span>
            <div className="text-6xl font-black italic text-white tracking-tighter">
              {String(stats.losses).padStart(2, "0")}
            </div>
            <div className="absolute -right-4 -bottom-4 tru-danger-text text-8xl font-black italic uppercase opacity-5">
              Loss
            </div>
          </div>
        </div>

        <h2 className="text-zinc-500 font-black text-xs uppercase tracking-[0.4em] mb-6">
          {searchTerm ? `Results for "${searchTerm}"` : "Recent Matches"}
        </h2>
      </header>

      <main className="max-w-4xl mx-auto space-y-4">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-zinc-900 rounded-[3rem]">
            <p className="text-zinc-800 font-bold uppercase tracking-widest text-xs">
              Nenhuma partida encontrada
            </p>
          </div>
        ) : (
          filteredHistory.map((game) => {
            const target = activeTarget.toLowerCase();
            const teamLeft = game.teams.left.toLowerCase();
            const teamRight = game.teams.right.toLowerCase();
            const winnerName = game.winner.toLowerCase();

            // Identificação para Borda e Label
            const isTargetInMatch =
              target &&
              (teamLeft.includes(target) || teamRight.includes(target));
            const isTargetWinner = target && winnerName.includes(target);

            let borderColor = "border-zinc-900";
            let labelColor = "bg-zinc-800 text-zinc-500";
            let statusLabel = "MATCH";

            if (isTargetInMatch) {
              if (isTargetWinner) {
                borderColor = "tru-accent-border";
                labelColor = "tru-accent-bg tru-on-accent";
                statusLabel = "WINNER";
              } else {
                borderColor = "border-[var(--tru-danger)]";
                labelColor = "bg-[var(--tru-danger)] text-white";
                statusLabel = "DEFEAT";
              }
            }

            return (
              <div
                key={game.id}
                onClick={() => openMatchSummary(game.raw)}
                className={`relative bg-zinc-950 border-l-[6px] ${borderColor} rounded-[2.5rem] p-6 transition-all hover:bg-zinc-900 group cursor-pointer`}
              >
                <button
                  onClick={() => deleteEntry(game.id)}
                  className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 font-bold text-2xl transition-all tru-btn-icon"
                >
                  ×
                </button>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded ${labelColor}`}
                      >
                        {statusLabel}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                        {game.date} • {game.time}
                      </span>
                    </div>

                    <div className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
                      {game.winner}
                    </div>

                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-2">
                      VS{" "}
                      {winnerName.includes(teamLeft)
                        ? game.teams.right
                        : game.teams.left}
                    </div>
                  </div>

                  <div className="text-right pr-4">
                    <div className="flex items-baseline gap-3">
                      {/* Placar Esquerdo */}
                      <span
                        className={`text-6xl font-black italic ${
                          Number(game.score.left) > Number(game.score.right)
                            ? "tru-accent-text"
                            : "tru-danger-text"
                        }`}
                      >
                        {game.score.left}
                      </span>

                      <span className="text-2xl font-black text-zinc-900">
                        -
                      </span>

                      {/* Placar Direito */}
                      <span
                        className={`text-6xl font-black italic ${
                          Number(game.score.right) > Number(game.score.left)
                            ? "tru-accent-text"
                            : "tru-danger-text"
                        }`}
                      >
                        {game.score.right}
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-zinc-800 uppercase tracking-[0.2em] mt-1">
                      Sets Won
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div className="py-12 flex flex-col items-center gap-4 opacity-10">
          <div className="w-10 h-10 rounded-full border-2 border-zinc-500 flex items-center justify-center font-bold">
            !
          </div>
          <p className="text-[9px] font-black uppercase tracking-[0.5em]">
            End of History
          </p>
        </div>
      </main>

      <MatchSummaryModal
        game={selectedGame}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HistoryPage;
