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
    <div className="fixed inset-0 z-200S bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 pt-8 ">
      <div
        className="w-full max-w-sm bg-black/20 backdrop-blur-md border border-white/10 shadow-xl rounded-3xl overflow-hidden"
        style={{ backgroundImage: "radial-gradient(ellipse at top, color-mix(in srgb, var(--tru-default) 15%, transparent), transparent 65%)" }}
      >

        {/* HEADER */}
        <header className="px-6 pt-6 pb-4 flex justify-between items-start">
          <div>
            <span className="inline-block px-3 py-1 border rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-2 tru-accent-badge">
              Nova Partida
            </span>
            <h2 className="text-xl font-black text-white uppercase italic leading-tight">
              Configurar
            </h2>
          </div>
          <button
            onClick={() => onClose({ started: false })}
            className="p-2 rounded-xl transition-colors mt-1 tru-btn-ghost"
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
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-3 text-xs font-bold text-white placeholder:text-zinc-600 outline-none transition-all"
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
                      ? "tru-btn-solid tru-accent-shadow"
                      : "tru-btn-ghost"
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
              className="w-full tru-btn-solid py-4 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all tru-accent-shadow"
            >
              Iniciar Partida
            </button>
            <button
              onClick={() => onClose({ started: false })}
              className="w-full py-2 font-bold text-[10px] uppercase tracking-widest text-center transition-colors rounded-xl tru-btn-ghost"
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