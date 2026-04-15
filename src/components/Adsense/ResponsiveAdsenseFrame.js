"use client";

import { useEffect, useSyncExternalStore } from "react";

const DEFAULT_CLIENT_ID = "ca-pub-5974398786569434";

function useIsPortrait() {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
        return () => {};
      }

      const mediaQuery = window.matchMedia("(orientation: portrait)");
      const applyOrientation = () => callback();

      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", applyOrientation);
        return () => mediaQuery.removeEventListener("change", applyOrientation);
      }

      mediaQuery.addListener(applyOrientation);
      return () => mediaQuery.removeListener(applyOrientation);
    },
    () => {
      if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
        return false;
      }

      return window.matchMedia("(orientation: portrait)").matches;
    },
    () => false,
  );
}

function AdSenseSlot({
  clientId,
  slotId,
  label,
  className = "",
  minHeight = "90px",
}) {
  useEffect(() => {
    if (!clientId || !slotId || typeof window === "undefined") {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // The AdSense script may be blocked or not ready yet.
    }
  }, [clientId, slotId]);

  if (!clientId || !slotId) {
    if (process.env.NODE_ENV === "production") {
      return null;
    }

    return (
      <div
        className={`flex items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/35 ${className}`}
        style={{ minHeight }}
      >
        Espaço AdSense
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: "block", minHeight }}
      data-ad-client={clientId}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
      aria-label={label}
    />
  );
}

export default function ResponsiveAdsenseFrame({
  children,
  clientId = DEFAULT_CLIENT_ID,
  portrait = {},
  landscape = {},
  className = "",
}) {
  const isPortrait = useIsPortrait();

  if (isPortrait) {
    return (
      <div className={`relative h-screen w-full overflow-hidden ${className}`}>
        <div className="flex h-screen flex-col overflow-hidden">
          <div className="px-3 pt-3 sm:px-4">
            <AdSenseSlot
              clientId={clientId}
              slotId={portrait.top}
              label="Anúncio superior"
              className="mx-auto w-full max-w-4xl"
            />
          </div>

          <div className="flex-1 min-h-0 overflow-hidden">{children}</div>

          <div className="px-3 pb-3 sm:px-4">
            <AdSenseSlot
              clientId={clientId}
              slotId={portrait.bottom}
              label="Anúncio inferior"
              className="mx-auto w-full max-w-4xl"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen w-full ${className}`}>
      <div className="flex min-h-screen flex-row items-stretch">
        <div className="hidden sm:flex w-[clamp(110px,12vw,180px)] px-3 py-3">
          <AdSenseSlot
            clientId={clientId}
            slotId={landscape.left}
            label="Anúncio lateral esquerdo"
            className="w-full self-stretch"
            minHeight="100%"
          />
        </div>

        <div className="flex-1 min-w-0">{children}</div>

        <div className="hidden sm:flex w-[clamp(110px,12vw,180px)] px-3 py-3">
          <AdSenseSlot
            clientId={clientId}
            slotId={landscape.right}
            label="Anúncio lateral direito"
            className="w-full self-stretch"
            minHeight="100%"
          />
        </div>
      </div>
    </div>
  );
}
