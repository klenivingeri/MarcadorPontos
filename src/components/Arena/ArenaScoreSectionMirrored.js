import React from "react";

export default function ArenaScoreSectionMirrored({
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
    <section className="flex-1 flex flex-col items-stretch justify-center relative min-h-0">
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent" />

      <div
        className="relative z-10 flex-1 flex items-center justify-center text-center px-1"
        onClick={() => onAddOne("left")}
      >
        <div className="rotate-180">
          <span className="block text-[12rem] sm:text-[15rem] font-black leading-none tracking-tighter">
            {String(pointsLeft).padStart(2)}
          </span>
          <span className="text-xs sm:text-sm uppercase tracking-widest tru-muted-text font-bold">
            {teamLeft}
          </span>
        </div>

        <div className="absolute left-0 top-0 w-20 h-20 sm:w-24 sm:h-24 flex gap-2 items-start">
          {showLeastOne && (
            <button
              onClick={(event) => {
                event.stopPropagation();
                onSubtractLeft();
              }}
              className="w-12 h-12 sm:w-14 sm:h-14 border rounded-xl font-bold transition-all tru-danger-soft tru-danger-active"
            >
              -1
            </button>
          )}

          {patoAvailable.left && canLaunchPato("left") && (
            <div className="relative w-12 h-12 sm:w-14 sm:h-14">
              <span className="absolute inset-0 rounded-xl tru-progress-bg opacity-75 animate-ping" />
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
                  backgroundColor:
                    "color-mix(in srgb, var(--tru-progress) 18%, transparent)",
                  borderColor: "var(--tru-progress)",
                }}
                className="relative z-10 w-full h-full rounded-xl font-bold border"
                title="Pato"
              />
            </div>
          )}
        </div>
      </div>

      <div
        className="relative z-10 flex-1 flex items-center justify-center text-center px-1"
        onClick={() => onAddOne("right")}
      >
        <div>
          <span className="block text-[12rem] sm:text-[15rem] font-black leading-none tracking-tighter">
            {String(pointsRight).padStart(2)}
          </span>
          <span className="text-xs sm:text-sm uppercase tracking-widest tru-muted-text font-bold">
            {teamRight}
          </span>
        </div>

        <div className="absolute right-0 bottom-0 w-20 h-20 sm:w-24 sm:h-24 flex gap-2 justify-end items-end">
          {patoAvailable.right && canLaunchPato("right") && (
            <div className="relative w-12 h-12 sm:w-14 sm:h-14">
              <span className="absolute inset-0 rounded-xl tru-progress-bg opacity-75 animate-ping" />
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
                  backgroundColor:
                    "color-mix(in srgb, var(--tru-progress) 18%, transparent)",
                  borderColor: "var(--tru-progress)",
                }}
                className="relative z-10 w-full h-full rounded-xl font-bold border"
                title="Pato"
              />
            </div>
          )}
          {showLeastOne && (
            <button
              onClick={(event) => {
                event.stopPropagation();
                onSubtractRight();
              }}
              className="w-12 h-12 sm:w-14 sm:h-14 border rounded-xl font-bold transition-all tru-danger-soft tru-danger-active"
            >
              -1
            </button>
          )}
        </div>
      </div>

      {(pointsLeft === 14 || pointsRight === 14) && (
        <button
          onClick={onPerdeTudo}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 w-40 py-1.5 border rounded-2xl text-xs font-black uppercase animate-pulse tru-danger-soft"
        >
          Perde Tudo
        </button>
      )}
    </section>
  );
}
