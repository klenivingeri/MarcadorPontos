"use client";
import React, { useEffect, useState, useMemo } from "react";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [userSettings, setUserSettings] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("game_history") || "[]");
    const savedSettings = JSON.parse(localStorage.getItem("truscore_settings") || "{}");
    setHistory(savedHistory);
    setUserSettings(savedSettings);
  }, []);

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
    if (!searchTerm) return history;
    const term = searchTerm.toLowerCase();
    return history.filter((game) =>
      game.teams.left.toLowerCase().includes(term) ||
      game.teams.right.toLowerCase().includes(term) ||
      game.winner.toLowerCase().includes(term)
    );
  }, [history, searchTerm]);

  // 2. Estatísticas Dinâmicas (Win Streak e Losses)
const stats = useMemo(() => {
  const target = activeTarget.toLowerCase();
  if (!target) return { streak: 0, wins: 0, losses: 0, winRate: 0 };

  let streak = 0;
  let wins = 0;
  let losses = 0;
  let isStreakActive = true;

  // Iteramos do mais recente para o mais antigo
  for (let i = history.length - 1; i >= 0; i--) {
    const game = history[i];
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
}, [history, activeTarget]);


  const deleteEntry = (id) => {
    if (confirm("Excluir esta partida?")) {
      const updated = history.filter((item) => item.id !== id);
      localStorage.setItem("game_history", JSON.stringify(updated));
      setHistory(updated);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 p-6 pb-24 font-sans">
      <header className="max-w-4xl mx-auto mb-10">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-black italic tracking-tighter text-green-500 uppercase">
            Overview
          </h1>
          <button 
            onClick={() => confirm("Limpar histórico?") && setHistory([])} 
            className="text-[10px] font-bold text-zinc-700 hover:text-red-500 uppercase tracking-widest transition-all"
          >
            Limpar Tudo
          </button>
        </div>

        {/* Campo de Busca */}
        <div className="mb-8">
          <label className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em] mb-3 block">
            Pesquisar Jogador ou Time
          </label>
          <input
            type="text"
            placeholder="EX: ERICK..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#141414] border border-zinc-800 rounded-2xl px-5 py-5 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-green-500 outline-none text-green-400 placeholder:text-zinc-800 transition-all"
          />
        </div>

        {/* Dashboard de Stats - Abaixo da Busca */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="bg-[#141414] p-8 rounded-[2rem] border-l-4 border-green-500 shadow-2xl relative overflow-hidden">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
              Win Streak {activeTarget && `• ${activeTarget}`}
            </span>
            <div className="text-6xl font-black italic text-white tracking-tighter">
              {console.log(stats.streak)}
              {String(stats.wins).padStart(2, '0')}
            </div>
            <div className="absolute -right-4 -bottom-4 text-green-500/5 text-8xl font-black italic uppercase">Win</div>
          </div>
          
          <div className="bg-[#141414] p-8 rounded-[2rem] border-l-4 border-red-600 shadow-2xl relative overflow-hidden">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
              Total Losses {activeTarget && `• ${activeTarget}`}
            </span>
            <div className="text-6xl font-black italic text-white tracking-tighter">
              {String(stats.losses).padStart(2, '0')}
            </div>
            <div className="absolute -right-4 -bottom-4 text-red-600/5 text-8xl font-black italic uppercase">Loss</div>
          </div>
        </div>

        <h2 className="text-zinc-500 font-black text-xs uppercase tracking-[0.4em] mb-6">
          {searchTerm ? `Results for "${searchTerm}"` : "Recent Matches"}
        </h2>
      </header>

      <main className="max-w-4xl mx-auto space-y-4">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-zinc-900 rounded-[3rem]">
            <p className="text-zinc-800 font-bold uppercase tracking-widest text-xs">Nenhuma partida encontrada</p>
          </div>
        ) : (
          filteredHistory.map((game) => {
            const target = activeTarget.toLowerCase();
            const teamLeft = game.teams.left.toLowerCase();
            const teamRight = game.teams.right.toLowerCase();
            const winnerName = game.winner.toLowerCase();

            // Identificação para Borda e Label
            const isTargetInMatch = target && (teamLeft.includes(target) || teamRight.includes(target));
            const isTargetWinner = target && winnerName.includes(target);

            let borderColor = "border-zinc-900";
            let labelColor = "bg-zinc-800 text-zinc-500";
            let statusLabel = "MATCH";

            if (isTargetInMatch) {
              if (isTargetWinner) {
                borderColor = "border-green-500";
                labelColor = "bg-green-500 text-black";
                statusLabel = "WINNER";
              } else {
                borderColor = "border-red-600";
                labelColor = "bg-red-600 text-white";
                statusLabel = "DEFEAT";
              }
            }

            return (
              <div key={game.id} className={`relative bg-[#111111] border-l-[6px] ${borderColor} rounded-[2.5rem] p-8 transition-all hover:bg-[#141414] group`}>
                <button 
                  onClick={() => deleteEntry(game.id)} 
                  className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 text-zinc-800 hover:text-red-500 font-bold text-2xl transition-all"
                >
                  ×
                </button>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded ${labelColor}`}>{statusLabel}</span>
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{game.date} • {game.time}</span>
                    </div>
                    
                    <div className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
                      {game.winner}
                    </div>
                    
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-700 mt-2">
                      VS {winnerName.includes(teamLeft) ? game.teams.right : game.teams.left}
                    </div>
                  </div>

                  <div className="text-right pr-4">
                    <div className="flex items-baseline gap-3">
                      {/* Placar Esquerdo */}
                      <span className={`text-6xl font-black italic ${
                        Number(game.score.left) > Number(game.score.right) ? "text-green-500" : "text-red-600"
                      }`}>
                        {game.score.left}
                      </span>
                      
                      <span className="text-2xl font-black text-zinc-900">-</span>
                      
                      {/* Placar Direito */}
                      <span className={`text-6xl font-black italic ${
                        Number(game.score.right) > Number(game.score.left) ? "text-green-500" : "text-red-600"
                      }`}>
                        {game.score.right}
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-zinc-800 uppercase tracking-[0.2em] mt-1">Sets Won</div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div className="py-12 flex flex-col items-center gap-4 opacity-10">
          <div className="w-10 h-10 rounded-full border-2 border-zinc-500 flex items-center justify-center font-bold">!</div>
          <p className="text-[9px] font-black uppercase tracking-[0.5em]">End of History</p>
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;