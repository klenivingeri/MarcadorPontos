'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ConfigModal = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState({ 
    groupName: "", 
    vibrate: true,
    buttonVisible: true,
    bgUrl: "" 
  });

  useEffect(() => {
    const saved = localStorage.getItem("truscore_settings");
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  }, [isOpen]);

  const [pixCopied, setPixCopied] = useState(false);

  const handleSave = () => {
    localStorage.setItem("truscore_settings", JSON.stringify(config));
    window.dispatchEvent(new Event("storage")); 
    onClose();
  };

  const copyPix = () => {
    navigator.clipboard.writeText("8728a6b0-141d-445a-88cb-18cb91149ee6");
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  const handleToggle = (key) => {
    const updated = { ...config, [key]: !config[key] };
    setConfig(updated);
    localStorage.setItem("truscore_settings", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
        <header className="px-5 py-3 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-sm font-black uppercase tracking-widest text-white/50">
            Ajustes
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">
          <div className="flex-1 p-5 space-y-4 border-b md:border-b-0 md:border-r border-zinc-800">
            <div className="space-y-3">
              {/* Identificador com botão limpar */}
              <div>
                <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider mb-1 block">
                  Identificador
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={config.groupName}
                    onChange={(e) =>
                      setConfig({ ...config, groupName: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 pr-8 text-sm text-white focus:border-green-500 outline-none"
                  />
                  {config.groupName && (
                    <button 
                      onClick={() => setConfig({ ...config, groupName: "" })}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white p-1"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-1 flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2">
                  <span className="text-xs font-bold text-white">Vibração</span>
                  <button
                    onClick={() => handleToggle("vibrate")}
                    className={`w-10 h-5 rounded-full relative transition-colors ${config.vibrate ? "bg-green-500" : "bg-zinc-700"}`}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.vibrate ? "left-6" : "left-1"}`}
                    />
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2">
                  <span className="text-xs font-bold text-white">Exibir botões</span>
                  <button
                    onClick={() => handleToggle("buttonVisible")}
                    className={`w-10 h-5 rounded-full relative transition-colors ${config.buttonVisible ? "bg-green-500" : "bg-zinc-700"}`}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.buttonVisible ? "left-6" : "left-1"}`}
                    />
                  </button>
                </div>
              </div>

              {/* Wallpaper com botão limpar */}
              <div>
                <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider mb-1 block">
                  Wallpaper (URL/LINK)
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={config.bgUrl}
                    onChange={(e) =>
                      setConfig({ ...config, bgUrl: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 pr-8 text-xs text-white outline-none focus:border-green-500 transition-colors"
                  />
                  {config.bgUrl && (
                    <button 
                      onClick={() => setConfig({ ...config, bgUrl: "" })}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white p-1"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-green-500 text-black py-3 rounded-xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
              >
                Salvar
              </button>
            </div>
          </div>

          <div className="flex-1 p-5 bg-black/20 flex flex-col items-center justify-center text-center space-y-3">
            <div className="space-y-1">
              <h3 className="text-xs font-black text-green-500 uppercase italic">
                Apoie o Projeto
              </h3>
              <p className="text-[10px] text-zinc-500 leading-tight">
                Mantenha o app sem anúncios
              </p>
            </div>

            <div className="bg-white p-2 rounded-xl">
              <div className="w-24 h-24 bg-zinc-200 flex items-center justify-center">
                <Image
                  src="/icons/Qrcode.png"
                  alt="QR Code Pix"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
            </div>

            <button
              onClick={copyPix}
              className={`w-full py-2 rounded-xl font-black uppercase text-[9px] transition-all border ${
                pixCopied
                  ? "bg-green-500 border-green-500 text-black"
                  : "bg-transparent border-zinc-800 text-zinc-400"
              }`}
            >
              {pixCopied ? "Copiado!" : "Copiar Pix"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;