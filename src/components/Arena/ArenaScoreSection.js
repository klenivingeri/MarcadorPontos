import React from "react";

export default function ArenaScoreSection({
  pointsLeft,
  pointsRight,
  teamLeft,
  teamRight,
  showLeastOne,
  patoAvailable,
  canLaunchPato,
  onAddOne,
  onSubtractLeft,
  onSubtractRight,
  onLaunchPato,
  onPerdeTudo,
}) {
  return (
    <section className="flex-1 flex flex-col sm:flex-row items-center justify-around relative">
      <div
        className="
          absolute left-0 right-0 top-1/2 -translate-y-1/2
          h-[1px] w-full
          bg-gradient-to-r from-transparent via-zinc-800 to-transparent
          sm:left-1/2 sm:right-auto sm:top-0 sm:bottom-0 sm:translate-y-0
          sm:w-[2px] sm:h-full
          sm:bg-gradient-to-b
        "
      ></div>
      <div
        className="relative text-center z-10 py-4 sm:py-0 w-full h-full flex flex-col items-center justify-center"
        onClick={() => onAddOne("left")}
      >
        <div>
          <span className="block text-[12rem] sm:text-[15rem] font-black leading-none tracking-tighter">
            {String(pointsLeft).padStart(2)}
          </span>
          <span className="text-md uppercase tracking-widest text-zinc-200 font-bold">
            {teamLeft}
          </span>
        </div>
        <div className="absolute left-0 bottom-0 sm:w-24 h-24 w-14 sm:h-14 flex flex-col sm:flex-row gap-2">
          {showLeastOne && (
            <button
              onClick={(event) => {
                event.stopPropagation();
                onSubtractLeft();
              }}
              className="w-14 sm:w-full h-full sm:h-14 bg-red-900/20 border border-red-900/50 rounded-xl text-red-500 font-bold active:bg-red-600 active:text-white transition-all"
            >
              -1
            </button>
          )}

          {patoAvailable.left && canLaunchPato("left") && (
            <div className="relative w-14 sm:w-full h-14">
              <span className="absolute inset-0 rounded-xl bg-purple-500 opacity-75 animate-ping"></span>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onLaunchPato("left");
                }}
                style={{
                  backgroundImage: "url(/pato.gif)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="relative z-10 w-full h-full bg-cyan-900/20 border border-cyan-500 rounded-xl text-cyan-200 font-bold hover:bg-cyan-800/40"
              ></button>
            </div>
          )}
        </div>
      </div>

      <div
        className="relative text-center z-10 py-4 sm:py-0 w-full h-full flex flex-col items-center justify-center"
        onClick={() => onAddOne("right")}
      >
        <div>
          <span className="block text-[12rem] sm:text-[15rem] font-black leading-none tracking-tighter text-zinc-400">
            {String(pointsRight).padStart(2)}
          </span>
          <span className="text-md uppercase tracking-widest text-zinc-200 font-bold">
            {teamRight}
          </span>
        </div>

        <div className="absolute right-0 bottom-0 sm:w-24 h-24 w-14 sm:h-14 flex flex-col sm:flex-row gap-2">
          {patoAvailable.right && canLaunchPato("right") && (
            <div className="relative w-14 sm:w-full h-14">
              <span className="absolute inset-0 rounded-xl bg-purple-500 opacity-75 animate-ping"></span>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onLaunchPato("right");
                }}
                style={{
                  backgroundImage: "url(/pato.gif)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: "scaleX(-1)",
                }}
                className="relative z-10 w-full h-full bg-cyan-900/20 border border-cyan-500 rounded-xl text-cyan-200 font-bold hover:bg-cyan-800/40"
              ></button>
            </div>
          )}
          {showLeastOne && (
            <button
              onClick={(event) => {
                event.stopPropagation();
                onSubtractRight();
              }}
              className="w-14 sm:w-full h-full sm:h-14 bg-red-900/20 border border-red-900/50 rounded-xl text-red-500 font-bold active:bg-red-600 active:text-white transition-all"
            >
              -1
            </button>
          )}
        </div>
      </div>

      {(pointsLeft === 14 || pointsRight === 14) && (
        <button
          onClick={onPerdeTudo}
          className="fixed bottom-24 sm:bottom-2 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-4rem)] md:w-auto md:px-6 py-2 bg-red-900/20 border border-red-900/50 rounded-2xl text-white text-sm font-black uppercase animate-pulse"
        >
          Perde Tudo
        </button>
      )}
    </section>
  );
}
