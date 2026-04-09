'use client'
import React, { useState } from "react";

const MatchConfigModal = ({ isOpen, onClose, onStart, handleInitGame }) => {
  const [teamLeft, setTeamLeft] = useState("");
  const [teamRight, setTeamRight] = useState("");
  const [rounds, setRounds] = useState(3);

  const startMatch = (isQuickStart = false) => {
    if (isQuickStart) {
      handleInitGame();
      onStart({
        teamLeft: teamLeft.trim() || "Time 1",
        teamRight: teamRight.trim() || "Time 2",
        maxRounds: rounds,
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-start justify-center p-2 pt-4 md:items-center">
      
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh] sm:max-h-[80vh]">
        
        <header className="sticky top-0 z-10 bg-zinc-900 px-6 py-4 border-b border-zinc-800 flex justify-between items-center shrink-0">
          <h2 className="text-sm font-black uppercase tracking-widest text-white/50">Nova Partida</h2>
          <button onClick={onClose} className="p-1 hover:bg-zinc-800 rounded-lg transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="p-6 space-y-6 overflow-y-auto scrollbar-hide">
          
          {/* INPUTS LADO A LADO */}
          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map((num) => (
              <div key={num} className="space-y-1.5 relative">
                <label className="text-[9px] uppercase font-bold text-zinc-500 ml-1">
                  Time {num === 1 ? 'Esq.' : 'Dir.'}
                </label>
                <div className="relative">
                  <input 
                    type="text"
                    value={num === 1 ? teamLeft : teamRight}
                    onChange={(e) => num === 1 ? setTeamLeft(e.target.value) : setTeamRight(e.target.value)}
                    placeholder={`Time ${num}`}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-3 text-xs text-white focus:border-green-500 outline-none transition-all"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Rodadas (Melhor de)</label>
            <div className="flex gap-2">
              {[1, 3, 5, 7].map(n => (
                <button
                  key={n}
                  onClick={() => setRounds(n)}
                  className={`flex-1 py-3 rounded-xl font-black transition-all border-2 ${
                    rounds === n 
                      ? 'bg-green-500 border-green-500 text-black' 
                      : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 space-y-3 pb-2">
            <button 
              onClick={() => startMatch(true)}
              className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all"
            >
              Iniciar Partida
            </button>
            <button 
              onClick={onClose}
              className="w-full text-zinc-500 py-2 font-bold text-[10px] uppercase tracking-wider text-center"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchConfigModal;