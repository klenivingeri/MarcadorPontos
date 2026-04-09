'use client'
import React, { useState, useEffect } from "react";

const MatchConfigModal = ({ isOpen, onClose, onStart }) => {
  const [teamLeft, setTeamLeft] = useState("");
  const [teamRight, setTeamRight] = useState("");
  const [rounds, setRounds] = useState(3);
  const [history, setHistory] = useState([]);
  const [showSuggest, setShowSuggest] = useState({ field: null, list: [] });

  // Carrega histórico de nomes do LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("truscore_player_history");
    if (saved) setHistory(JSON.parse(saved));
  }, [isOpen]);

  const handleInput = (value, teamNum) => {
    if (teamNum === 1) setTeamLeft(value);
    else setTeamRight(value);

    if (value.length > 0) {
      const filtered = history.filter(name => 
        name.toLowerCase().includes(value.toLowerCase()) && 
        name.toLowerCase() !== value.toLowerCase()
      );
      setShowSuggest({ field: teamNum, list: filtered.slice(0, 5) });
    } else {
      setShowSuggest({ field: null, list: [] });
    }
  };

  const selectSuggest = (name, teamNum) => {
    if (teamNum === 1) setTeamLeft(name);
    else setTeamRight(name);
    setShowSuggest({ field: null, list: [] });
  };

  const startMatch = (isQuickStart = false) => {
    const finalConfig = isQuickStart ? {
      teamLeft: "Time 1",
      teamRight: "Time 2",
      maxRounds: 1
    } : {
      teamLeft: teamLeft.trim() || "Time 1",
      teamRight: teamRight.trim() || "Time 2",
      maxRounds: rounds
    };

    // Salva os nomes usados no histórico para o próximo autocomplete
    const namesToSave = [teamLeft, teamRight].filter(n => n.trim().length > 0);
    if (namesToSave.length > 0) {
      const newHistory = Array.from(new Set([...history, ...namesToSave]));
      localStorage.setItem("truscore_player_history", JSON.stringify(newHistory));
    }
    
    onStart(finalConfig);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        <header className="px-6 py-4 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-sm font-black uppercase tracking-widest text-white/50">Nova Partida</h2>
          <button onClick={onClose} className="p-1 hover:bg-zinc-800 rounded-lg transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </header>

        <div className="p-6 space-y-6">
          
          {/* Inputs Simples com Autocomplete */}
          <div className="space-y-4">
            {[1, 2].map((num) => (
              <div key={num} className="space-y-1.5 relative">
                <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Time {num === 1 ? 'Esquerdo' : 'Direito'}</label>
                <div className="relative">
                  <input 
                    type="text"
                    value={num === 1 ? teamLeft : teamRight}
                    onChange={(e) => handleInput(e.target.value, num)}
                    placeholder={`Nome do Time ${num}...`}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-white focus:border-green-500 outline-none transition-all pr-10"
                  />
                  {(num === 1 ? teamLeft : teamRight) && (
                    <button 
                      onClick={() => num === 1 ? setTeamLeft("") : setTeamRight("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  )}
                </div>

                {/* Dropdown de Sugestões */}
                {showSuggest.field === num && showSuggest.list.length > 0 && (
                  <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-zinc-800 border border-zinc-700 rounded-xl z-20 shadow-2xl overflow-hidden">
                    {showSuggest.list.map(name => (
                      <button 
                        key={name}
                        onClick={() => selectSuggest(name, num)}
                        className="w-full text-left px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors border-b border-zinc-700/50 last:border-none"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Seletor de Rodadas */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Rodadas (Melhor de)</label>
            <div className="flex gap-2">
              {[3, 5, 7].map(n => (
                <button
                  key={n}
                  onClick={() => setRounds(n)}
                  className={`flex-1 py-3 rounded-xl font-black transition-all border-2 ${rounds === n ? 'bg-green-500 border-green-500 text-black' : 'bg-zinc-950 border-zinc-800 text-zinc-500'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Ações Finais */}
          <div className="pt-2 space-y-3">
            <button 
              onClick={() => startMatch()}
              className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-white/5"
            >
              Iniciar Partida
            </button>
            <button 
              onClick={() => startMatch(true)}
              className="w-full text-zinc-500 py-2 font-bold text-[10px] uppercase tracking-wider hover:text-zinc-300 transition-all text-center"
            >
              Ignorar e começar rápido (1 rodada)
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MatchConfigModal;