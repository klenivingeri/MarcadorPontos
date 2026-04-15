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
    <div className="fixed inset-0 z-200 tru-overlay-bg backdrop-blur-sm flex items-start justify-center p-4 pt-8 ">
      <div
        className="w-full max-w-sm tru-surface tru-page-text backdrop-blur-md border shadow-xl rounded-3xl overflow-hidden"
        style={{ backgroundImage: "radial-gradient(ellipse at top, color-mix(in srgb, var(--tru-default) 15%, transparent), transparent 65%)" }}
      >

        {/* HEADER */}
        <header className="px-6 pt-6 pb-4 flex justify-between items-start">
          <div>
            <span className="inline-block px-3 py-1 border rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-2 tru-accent-badge">
              Nova Partida
            </span>
            <h2 className="text-xl font-black tru-page-text uppercase italic leading-tight">
              Configurar
            </h2>
          </div>
          <button
            onClick={() => onClose({ started: false })}
            className="p-2 rounded-xl transition-colors mt-1 tru-btn-ghost"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="px-6 pb-6 space-y-5">

          {/* TIMES COM "VS" */}
          <div className="relative grid grid-cols-2 gap-2">
            {/* VS badge central */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <span className="tru-surface backdrop-blur-md border rounded-full px-2 py-0.5 text-[9px] font-black tru-muted-text uppercase tracking-widest shadow-xl">
                VS
              </span>
            </div>

            {[
              { label: "Time Esq.", value: teamLeft, setter: setTeamLeft, placeholder: "Time 1" },
              { label: "Time Dir.", value: teamRight, setter: setTeamRight, placeholder: "Time 2" },
            ].map(({ label, value, setter, placeholder }) => (
              <div key={label} className="space-y-1.5">
                <label className="text-[9px] uppercase font-black tracking-widest tru-muted-text ml-1 block">
                  {label}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded-2xl px-3 py-3 pr-10 text-xs font-bold tru-page-text placeholder:text-(--text-muted) outline-none transition-all"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--surface) 82%, transparent)",
                      border: "1px solid var(--surface-border)",
                    }}
                  />
                  {value && (
                    <button
                      type="button"
                      onClick={() => setter("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full tru-btn-ghost"
                      aria-label={`Limpar ${label}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ROUNDS */}
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-black tracking-widest tru-muted-text ml-1 block">
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
            <p className="text-[9px] tru-muted-text text-center">
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