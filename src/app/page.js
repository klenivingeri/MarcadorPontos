"use client";
import ConfigModal from "@/components/Menu/ConfigModal";
import Link from "next/link";
import React, { useState } from "react"; // Importando a função que você já tem

export default function Home() {
  const [showConfig, setShowConfig] = useState(false);
  // 4. Função que você passa para o onClose do Modal

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/30">
      {/* SEÇÃO PRINCIPAL (FULL SCREEN) */}
      <section className="h-screen w-full flex flex-col items-center justify-between p-6 relative overflow-hidden">
        {/* HEADER SUPERIOR */}
        <header className="w-full max-w-5xl flex justify-between items-center z-10">
          <Link
            href="/history"
            className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all active:scale-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3v18h18" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
          </Link>

          <button
            onClick={() => setShowConfig(true)}
            className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all active:scale-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </header>

        {/* CONTEÚDO CENTRAL */}
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 px-8">
          {/* Logo Section */}
          <div className="relative">
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-none">
              Tru
              <span className="text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                Kando
              </span>
            </h1>
            <div className="absolute -top-4 -right-4 bg-white text-black text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-widest rotate-12 border-2 border-black">
              Pro Edition
            </div>
          </div>

          {/* A Breve Descrição */}
          <p className="max-w-[280px] md:max-w-md text-zinc-400 text-sm md:text-base font-medium leading-relaxed uppercase tracking-tight">
            O marcador definitivo para quem busca{" "}
            <span className="text-zinc-200">performance</span> e{" "}
            <span className="text-zinc-200">imersão</span> total em cada rodada.
          </p>

          {/* Action Section */}
          <Link
            href="/arena"
            className="group relative px-12 py-6 bg-white text-black rounded-[2rem] font-black text-2xl uppercase italic hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(34,197,94,0.2)]"
          >
            <span className="relative z-10">Iniciar Partida</span>
            <div className="absolute inset-0 bg-green-500 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </Link>
        </div>

        {/* INDICADOR DE SCROLL (TUTORIAL) */}
        <div className="animate-slide-down">
          <div className="flex flex-col items-center gap-2 animate-bounce opacity-40 mb-12">
            {/* Aumente ou diminua o mb-12 conforme precisar subir mais */}
            <span className="text-[10px] uppercase font-bold tracking-[0.3em]">
              Tutorial
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m7 13 5 5 5-5" />
              <path d="m7 6 5 5 5-5" />
            </svg>
          </div>
        </div>

        {/* FUNDO DECORATIVO */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent"></div>
        </div>
      </section>

      {/* SEÇÃO DE TUTORIAL (APARECE NO SCROLL) */}
      <section className="min-h-screen w-full max-w-4xl mx-auto px-6 py-24 border-t border-zinc-900">
        <h2 className="text-4xl font-black uppercase italic mb-12">
          Como Usar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem]">
            <div className="text-green-500 text-3xl font-black mb-4">01</div>
            <h3 className="text-xl font-bold mb-2 uppercase">
              Pontuação Rápida
            </h3>
            <p className="text-zinc-500 leading-relaxed">
              Toque nos números grandes para somar{" "}
              <strong className="text-zinc-300">1 ponto</strong>. Use as colunas
              laterais para aplicar{" "}
              <strong className="text-zinc-300">Truco (+3), 6, 9 ou 12</strong>{" "}
              instantaneamente. Quando chegar a 15 ponto, ganha o set e uma
              rodada é iniciada automaticamente.
            </p>
          </div>

          <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem]">
            <div className="text-green-500 text-3xl font-black mb-4">02</div>
            <h3 className="text-xl font-bold mb-2 uppercase text-zinc-100">
              Sets e Vitória
            </h3>
            <p className="text-zinc-500 leading-relaxed">
              Cada rodada vai até{" "}
              <strong className="text-zinc-200">15 pontos</strong>. Ao atingir o
              limite, um novo Set começa automaticamente. Defina nas
              configurações partidas de{" "}
              <strong className="text-zinc-300">3, 5 ou 7 Sets</strong> para
              decidir quem realmente domina a jogo.
            </p>
          </div>

          <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem]">
            <div className="text-green-500 text-3xl font-black mb-4">03</div>
            <h3 className="text-xl font-bold mb-2 uppercase">Mão de Ferro</h3>
            <p className="text-zinc-500 leading-relaxed">
              Ao atingir <strong className="text-zinc-300">14 pontos</strong>, o
              botão <strong className="text-red-500">"Perde Tudo"</strong> é
              ativado. Se houver Truco nesta fase, use-o para encerrar a rodada.
              Caso ambos os times cheguem a{" "}
              <strong className="text-zinc-300">14x14</strong>, uma tela
              especial de{" "}
              <strong className="text-green-500">"Mão de Ferro"</strong> surgirá
              quando botão for apertado para definir o perdedor imediatamente.
            </p>
          </div>

          <div className="p-5 bg-zinc-900/40 border border-zinc-800 rounded-[2rem] max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-green-500 text-2xl font-black">04</div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-zinc-200">
                Instalação & Full Screen
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-snug">
              {/* Coluna Android */}
              <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                <span className="text-green-500 font-bold block mb-1 uppercase text-[10px]">
                  Android (Chrome)
                </span>
                <p className="text-zinc-400">
                  Toque nos{" "}
                  <strong className="text-zinc-200">três pontos (⋮)</strong> e
                  selecione{" "}
                  <strong className="text-green-500">
                    "Instalar aplicativo"
                  </strong>{" "}
                  ou "Adicionar à tela inicial".
                </p>
              </div>

              {/* Coluna iPhone */}
              <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                <span className="text-blue-400 font-bold block mb-1 uppercase text-[10px]">
                  iPhone (Safari)
                </span>
                <p className="text-zinc-400">
                  Toque no ícone de{" "}
                  <strong className="text-zinc-200">Compartilhar (↑)</strong> e
                  escolha{" "}
                  <strong className="text-green-500">
                    "Adicionar à Tela de Início"
                  </strong>
                  .
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800">
              <div className="text-center px-2">
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  Para uma melhor experiência{" "}
                  <strong className="text-green-500 uppercase italic text-[11px]">
                    gire a aparelho
                  </strong>{" "}
                  na tela de pontos. No navegador? Use o{" "}
                  <strong className="text-zinc-300 uppercase italic inline-flex items-center gap-1">
                    ícone
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-zinc-800/50 rounded-md animate-pulse text-green-500 align-middle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                        <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                        <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                        <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                      </svg>
                    </span>
                  </strong>{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem]">
            <div className="text-green-500 text-3xl font-black mb-4">05</div>
            <h3 className="text-xl font-bold mb-2 uppercase">Histórico</h3>
            <p className="text-zinc-500 leading-relaxed">
              Acesse o registro completo de todas as rodadas para conferir{" "}
              <strong className="text-green-500">vitórias, derrotas</strong> e
              as <strong className="text-zinc-300">datas exatas</strong> de cada
              confronto. Utilize os{" "}
              <strong className="text-zinc-300">filtros inteligentes</strong>{" "}
              para localizar partidas específicas e auditar o desempenho dos
              times, garantindo que nenhum resultado caia no esquecimento.
            </p>
          </div>

          <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem]">
            <div className="text-green-500 text-3xl font-black mb-4">06</div>
            <h3 className="text-xl font-bold mb-2 uppercase">Identificador</h3>
            <p className="text-zinc-500 leading-relaxed">
              Nas <strong className="text-zinc-300">Configurações</strong>, você
              pode definir o nome ou apelido que usará nas partidas. Ao fazer
              isso, partidas com seu nome ganham{" "}
              <strong className="text-green-500">
                destaque visual no histórico
              </strong>
              , transformando vitórias comuns em marcos da sua{" "}
              <strong className="text-zinc-300">carreira na jogo</strong>.
            </p>
          </div>
        </div>

        <footer className="mt-24 text-center text-zinc-700 font-bold uppercase text-xs tracking-widest">
          Truco Arena © 2026 • Desenvolvido para campeões
        </footer>
      </section>

      <ConfigModal
        isOpen={showConfig}
        onClose={() => {
          setShowConfig(false);
        }}
      />
    </div>
  );
}
