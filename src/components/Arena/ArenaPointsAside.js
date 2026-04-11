import React from "react";

export default function ArenaPointsAside({ side, buttonVisible, onAddPoints }) {
  return (
    <aside
      className={`flex flex-row sm:flex-col ${buttonVisible ? "justify-between" : "justify-end"} w-full sm:w-24 h-24 sm:h-auto gap-2 mt-2 sm:mt-0 text-zinc-400`}
    >
      {buttonVisible && (
        <>
          <button
            onClick={() => onAddPoints(side, 3)}
            className="flex-1 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl active:bg-green-600 active:scale-95 transition-all flex flex-col items-center justify-center"
          >
            <span className="text-[10px] uppercase font-bold">Truco</span>
            <span className="text-xl font-black text-white">+3</span>
          </button>
          {[6, 9, 12].map((value) => (
            <button
              key={value}
              onClick={() => onAddPoints(side, value)}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl active:bg-green-600 active:scale-95 transition-all font-bold text-lg"
            >
              {value === 12 ? "12" : `+${value}`}
            </button>
          ))}
        </>
      )}
    </aside>
  );
}
