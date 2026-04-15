'use client';

import React from 'react';

const MatchSummaryModal = ({ game, isOpen, onClose }) => {
  if (!isOpen || !game) return null;

  const leftTeam = game.teams?.[0] || { name: 'Time 1', setsWon: 0, score: 0, clutch: 0, sequential: 0 };
  const rightTeam = game.teams?.[1] || { name: 'Time 2', setsWon: 0, score: 0, clutch: 0, sequential: 0 };

  const winnerTeam = leftTeam.setsWon >= rightTeam.setsWon ? leftTeam : rightTeam;
  const matchDate = game?.endTime ? new Date(game.endTime) : null;
  const matchStartDate = game?.startTime ? new Date(game.startTime) : null;

  // Calcular tempo total da partida
  const totalMilliseconds = (game?.endTime || 0) - (game?.startTime || 0);
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let timeString = '';
  if (hours > 0) {
    timeString = `${hours}h ${remainingMinutes}m`;
  } else {
    timeString = `${minutes}m`;
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-black/90 backdrop-blur-md border border-white/10 shadow-xl rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-black/95 backdrop-blur-md border-b border-white/10 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter tru-accent-text">
            Resumo da Partida
          </h2>
          <button
            onClick={onClose}
            className="text-3xl font-black text-zinc-300 hover:text-white transition-all active:scale-90"
          >
            ×
          </button>
        </div>

        {/* Conteúdo Scrollável */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Info Básica */}
          <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                  Data
                </span>
                <p className="text-sm font-bold text-white">
                  {matchDate?.toLocaleDateString('pt-BR')} {matchDate?.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                  Duração
                </span>
                <p className="text-sm font-bold text-white">{timeString}</p>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                Total de Sets
              </span>
              <p className="text-sm font-bold text-white">{game?.maxRounds} sets configurados</p>
            </div>
          </div>

          {/* Placar Final */}
          <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-4">
              Resultado Final
            </span>

            <div className="flex items-end justify-between mb-6">
              {/* Time Esquerdo */}
              <div className="flex-1 text-center">
                <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${leftTeam.setsWon > rightTeam.setsWon ? 'tru-accent-text' : 'text-zinc-600'}`}>
                  {leftTeam.name}
                </div>
                <div className={`text-6xl font-black italic tracking-tighter ${leftTeam.setsWon > rightTeam.setsWon ? 'tru-accent-text' : 'tru-danger-text'}`}>
                  {leftTeam.setsWon}
                </div>
              </div>

              <div className="px-4">
                <span className="text-2xl font-black text-zinc-800">-</span>
              </div>

              {/* Time Direito */}
              <div className="flex-1 text-center">
                <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${rightTeam.setsWon > leftTeam.setsWon ? 'tru-accent-text' : 'text-zinc-600'}`}>
                  {rightTeam.name}
                </div>
                <div className={`text-6xl font-black italic tracking-tighter ${rightTeam.setsWon > leftTeam.setsWon ? 'tru-accent-text' : 'tru-danger-text'}`}>
                  {rightTeam.setsWon}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block bg-linear-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                🏆 {winnerTeam.name} - CAMPEÃO
              </div>
            </div>
          </div>

          {/* Estatísticas dos Times */}
          <div className="grid grid-cols-2 gap-4">
            {/* Time Esquerdo */}
            <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <h3 className="text-sm font-black uppercase tracking-wider mb-3 text-white">
                {leftTeam.name}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Maior Ponto
                  </span>
                  <span className="text-lg font-black text-white">
                    {leftTeam.clutch || '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Sequência
                  </span>
                  <span className="text-lg font-black text-white">
                    {leftTeam.sequential || '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Pontos Finais
                  </span>
                  <span className="text-lg font-black text-white">
                    {leftTeam.score}
                  </span>
                </div>
              </div>
            </div>

            {/* Time Direito */}
            <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <h3 className="text-sm font-black uppercase tracking-wider mb-3 text-white">
                {rightTeam.name}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Maior Ponto
                  </span>
                  <span className="text-lg font-black text-white">
                    {rightTeam.clutch || '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Sequência
                  </span>
                  <span className="text-lg font-black text-white">
                    {rightTeam.sequential || '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Pontos Finais
                  </span>
                  <span className="text-lg font-black text-white">
                    {rightTeam.score}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Detalhes de Sets */}
          {game?.sets && game.sets.length > 0 && (
            <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-4">
                Detalhes dos Sets
              </span>

              <div className="space-y-2">
                {game.sets.map((set, index) => {
                  const setLeftScore = set.score?.[0] || 0;
                  const setRightScore = set.score?.[1] || 0;
                  const setWinner = setLeftScore > setRightScore ? leftTeam.name : rightTeam.name;

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-black/60 backdrop-blur p-3 rounded-xl border border-white/5"
                    >
                      <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                        Set {index + 1} • {setWinner}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-black ${setLeftScore > setRightScore ? 'tru-accent-text' : 'text-zinc-400'}`}>
                          {setLeftScore}
                        </span>
                        <span className="text-xs font-black text-zinc-600">-</span>
                        <span className={`text-sm font-black ${setRightScore > setLeftScore ? 'tru-accent-text' : 'text-zinc-400'}`}>
                          {setRightScore}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Botão Fechar */}
        </div>

        <div className="flex-shrink-0 border-t border-white/10 p-6 bg-black/90">
          <button
            onClick={onClose}
            className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl py-3 font-bold uppercase tracking-widest text-sm tru-btn-text transition-all active:scale-95"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchSummaryModal;
