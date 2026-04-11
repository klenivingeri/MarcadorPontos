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
    onClose({ started: isQuickStart });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 pt-8 ">
      <div className="w-full max-w-sm bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.15),transparent_65%)] bg-black/20 backdrop-blur-md border border-white/10 shadow-xl rounded-3xl overflow-hidden">

        {/* HEADER */}
        <header className="px-6 pt-6 pb-4 flex justify-between items-start">
          <div>
            <span className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-[9px] font-black uppercase tracking-[0.2em] mb-2">
              Nova Partida
            </span>
            <h2 className="text-xl font-black text-white uppercase italic leading-tight">
              Configurar
            </h2>
          </div>
          <button
            onClick={() => onClose({ started: false })}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors mt-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="px-6 pb-6 space-y-5">

          {/* TIMES COM "VS" */}
          <div className="relative grid grid-cols-2 gap-2">
            {/* VS badge central */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <span className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-2 py-0.5 text-[9px] font-black text-zinc-400 uppercase tracking-widest shadow-xl">
                VS
              </span>
            </div>

            {[
              { label: "Time Esq.", value: teamLeft, setter: setTeamLeft, placeholder: "Time 1" },
              { label: "Time Dir.", value: teamRight, setter: setTeamRight, placeholder: "Time 2" },
            ].map(({ label, value, setter, placeholder }) => (
              <div key={label} className="space-y-1.5">
                <label className="text-[9px] uppercase font-black tracking-widest text-zinc-500 ml-1 block">
                  {label}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-3 text-xs font-bold text-white placeholder:text-zinc-600 focus:border-green-500/60 focus:bg-green-500/5 outline-none transition-all"
                />
              </div>
            ))}
          </div>

          {/* ROUNDS */}
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black tracking-widest text-zinc-500 ml-1 block">
              Melhor de
            </label>
            <div className="flex gap-2">
              {[1, 3, 5, 7].map((n) => (
                <button
                  key={n}
                  onClick={() => setRounds(n)}
                  className={`flex-1 py-3 rounded-2xl font-black text-sm transition-all border ${
                    rounds === n
                      ? "bg-green-500 border-green-400 text-black shadow-lg shadow-green-500/30"
                      : "bg-white/5 border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-[9px] text-zinc-600 text-center">
              {rounds === 1 ? "1 set único" : `Melhor de ${rounds} sets`}
            </p>
          </div>

          {/* SEPARATOR */}
          <div className="h-px bg-white/5" />

          {/* ACTIONS */}
          <div className="space-y-2">
            <button
              onClick={() => startMatch(true)}
              className="w-full bg-linear-to-r from-green-500 to-green-400 text-black py-4 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
            >
              Iniciar Partida
            </button>
            <button
              onClick={() => onClose({ started: false })}
              className="w-full py-2 text-zinc-600 hover:text-zinc-400 font-bold text-[10px] uppercase tracking-widest text-center transition-colors"
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