"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "truco_cookie_consent";
const readConsent = () => {
  if (typeof window === "undefined") {
    return "unknown";
  }

  return window.localStorage.getItem(CONSENT_KEY) || "unknown";
};

export default function CookieConsentManager() {
  const [consent, setConsent] = useState(readConsent);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === CONSENT_KEY) {
        setConsent(event.newValue || "unknown");
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const persistConsent = (value) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };
  const showBanner = consent === "unknown";

  return (
    <>
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-black/85 px-4 py-4 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/45">
                Cookies e anuncios
              </p>
              <p className="max-w-3xl text-sm leading-6 text-white/75">
                Usamos armazenamento local para salvar partidas, configuracoes e sua
                escolha de privacidade. Se voce aceitar, o site pode carregar anuncios
                do AdSense quando eles estiverem ativos.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:min-w-56">
              <button
                type="button"
                onClick={() => persistConsent("accepted")}
                className="rounded-2xl bg-white px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-black transition-transform active:scale-95"
              >
                Aceitar
              </button>
              <button
                type="button"
                onClick={() => persistConsent("essential")}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-white"
              >
                Apenas essenciais
              </button>
              <Link
                href="/privacy"
                className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-white"
              >
                Ler politica
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
