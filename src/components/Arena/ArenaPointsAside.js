import React from "react";

export default function ArenaPointsAside({
  side,
  buttonVisible,
  onAddPoints,
  invertAxis = false,
}) {
  return (
    <aside
      className={`flex flex-row sm:flex-col ${buttonVisible ? "justify-between" : "justify-end"} w-full sm:w-24 h-24 sm:h-auto gap-2 mt-2 sm:mt-0 text-zinc-400 ${invertAxis ? "rotate-180" : ""}`}
    >
      {buttonVisible && (
        <>
          <button
            onClick={() => onAddPoints(side, 3)}
            className="flex-1 py-4 rounded-2xl active:scale-95 transition-all flex flex-col items-center justify-center tru-btn-ghost"
          >
            <span className="text-[10px] uppercase font-bold">Truco</span>
            <span className="text-xl font-black tru-page-text">+3</span>
          </button>
          {[6, 9, 12].map((value) => (
            <button
              key={value}
              onClick={() => onAddPoints(side, value)}
              className="flex-1 rounded-2xl active:scale-95 transition-all font-bold text-lg tru-btn-ghost"
            >
              {value === 12 ? "12" : `+${value}`}
            </button>
          ))}
        </>
      )}
    </aside>
  );
}
