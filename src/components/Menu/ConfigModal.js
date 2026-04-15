'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  applyAppearance,
  DEFAULT_COLOR_MODE,
  DEFAULT_THEME,
  SETTINGS_KEY,
  loadStoredSettings,
} from "@/app/utils/theme";

const THEME_OPTIONS = [
  { id: "ninja", label: "Ninja", color: "#A54B3A" },
  { id: "wood", label: "Wood", color: "#8B5A2B" },
  { id: "green", label: "Green", color: "#2ECC71" },
  { id: "purple", label: "Purple", color: "#9B59B6" },
  { id: "blue", label: "Blue", color: "#3498DB" },
  { id: "red", label: "Red", color: "#E74C3C" },
  { id: "pink", label: "Pink", color: "#E83E8C" },
  { id: "orange", label: "Orange", color: "#FF9900" },
  { id: "black", label: "Black", color: "#1C1C1C" },
  { id: "white", label: "White", color: "#FFFFFF" },
];

const DEFAULT_CONFIG = {
  groupName: "",
  vibrate: true,
  buttonVisible: true,
  bgUrl: "",
  theme: DEFAULT_THEME,
  colorMode: DEFAULT_COLOR_MODE,
};

const normalizeThemeByColorMode = (settings) => {
  if (settings.colorMode === "dark" && settings.theme === "black") {
    return { ...settings, theme: "white" };
  }

  if (settings.colorMode !== "dark" && settings.theme === "white") {
    return { ...settings, theme: "black" };
  }

  return settings;
};

const ConfigModal = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    const saved = loadStoredSettings();
    const merged = { ...DEFAULT_CONFIG, ...saved };
    const normalized = normalizeThemeByColorMode(merged);
    setConfig(normalized);
    applyAppearance(normalized);
  }, [isOpen]);

  const [pixCopied, setPixCopied] = useState(false);

  const handleClose = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(config));
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
  };

  const handleSelectTheme = (theme) => {
    const updated = normalizeThemeByColorMode({ ...config, theme });
    setConfig(updated);
    applyAppearance(updated);
  };

  const handleColorModeToggle = () => {
    const updated = normalizeThemeByColorMode({
      ...config,
      colorMode: config.colorMode === "light" ? "dark" : "light",
    });

    setConfig(updated);
    applyAppearance(updated);
  };

  const visibleThemeOptions = THEME_OPTIONS.filter((themeOption) => {
    if (config.colorMode === "dark" && themeOption.id === "black") {
      return false;
    }

    if (config.colorMode !== "dark" && themeOption.id === "white") {
      return false;
    }

    return true;
  });

  const getToggleTrackStyle = (isEnabled) => ({
    backgroundColor: isEnabled
      ? "var(--tru-default)"
      : "color-mix(in srgb, var(--surface-border) 78%, var(--surface) 22%)",
    border: `1px solid ${
      isEnabled
        ? "color-mix(in srgb, var(--tru-default) 62%, #000000 38%)"
        : "var(--surface-border)"
    }`,
  });

  const getToggleThumbStyle = (isEnabled) => ({
    backgroundColor: isEnabled ? "var(--tru-on-accent)" : "var(--foreground)",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 tru-overlay-bg backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-3xl tru-surface tru-page-text backdrop-blur-md border rounded-3xl shadow-xl flex flex-col max-h-[95vh] overflow-hidden"
        style={{ backgroundImage: "radial-gradient(circle at top, color-mix(in srgb, var(--tru-default) 16%, transparent), transparent 60%)" }}>
        <header className="px-5 py-3 border-b flex justify-between items-center" style={{ borderColor: "var(--surface-border)" }}>
          <h2 className="text-sm font-black uppercase tracking-widest tru-page-text/80">
            Ajustes
          </h2>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg transition-colors border border-transparent tru-btn-ghost"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">
          <div className="flex-1 p-5 space-y-4 border-b md:border-b-0 md:border-r" style={{ borderColor: "var(--surface-border)" }}>
            <div className="space-y-3">
              {/* Identificador com botão limpar */}
              <div className="space-y-3">
                <div>
                  <div>
                    <label className="text-[9px] uppercase font-black tru-muted-text tracking-wider mb-1 block">
                      Identificador
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        value={config.groupName}
                        onChange={(e) =>
                          setConfig({ ...config, groupName: e.target.value })
                        }
                        className="w-full rounded-xl px-3 py-2 pr-8 text-sm text-foreground placeholder:text-(--text-muted) outline-none transition-all border"
                        style={{
                          backgroundColor: "color-mix(in srgb, var(--surface) 82%, transparent)",
                          borderColor: "var(--surface-border)",
                        }}
                      />
                      {config.groupName && (
                        <button
                          onClick={() => setConfig({ ...config, groupName: "" })}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 transition-colors tru-btn-icon"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="text-[9px] uppercase font-black tru-muted-text tracking-wider mb-1 block">
                      Wallpaper (URL/LINK)
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        value={config.bgUrl}
                        onChange={(e) =>
                          setConfig({ ...config, bgUrl: e.target.value })
                        }
                        className="w-full rounded-xl px-3 py-2 pr-8 text-xs text-foreground placeholder:text-(--text-muted) outline-none transition-all border"
                        style={{
                          backgroundColor: "color-mix(in srgb, var(--surface) 82%, transparent)",
                          borderColor: "var(--surface-border)",
                        }}
                      />
                      {config.bgUrl && (
                        <button
                          onClick={() => setConfig({ ...config, bgUrl: "" })}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 transition-colors tru-btn-icon"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <div
                  className="flex-1 flex items-center justify-between rounded-xl px-3 py-2 border"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--surface) 82%, transparent)",
                    borderColor: "var(--surface-border)",
                  }}
                >
                  <span className="text-xs font-bold tru-page-text">Vibração</span>
                  <button
                    onClick={() => handleToggle("vibrate")}
                    className="w-10 h-5 rounded-full relative transition-all"
                    style={getToggleTrackStyle(config.vibrate)}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 rounded-full transition-all ${config.vibrate ? "left-6" : "left-1"}`}
                      style={getToggleThumbStyle(config.vibrate)}
                    />
                  </button>
                </div>
                <div
                  className="flex-1 flex items-center justify-between rounded-xl px-3 py-2 border"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--surface) 82%, transparent)",
                    borderColor: "var(--surface-border)",
                  }}
                >
                  <span className="text-xs font-bold tru-page-text">Exibir botões</span>
                  <button
                    onClick={() => handleToggle("buttonVisible")}
                    className="w-10 h-5 rounded-full relative transition-all"
                    style={getToggleTrackStyle(config.buttonVisible)}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 rounded-full transition-all ${config.buttonVisible ? "left-6" : "left-1"}`}
                      style={getToggleThumbStyle(config.buttonVisible)}
                    />
                  </button>
                </div>
              </div>

              <div
                className="flex items-center justify-between rounded-xl px-3 py-2 border"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--surface) 82%, transparent)",
                  borderColor: "var(--surface-border)",
                }}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold tru-page-text">Modo Escuro</span>
                  <span className="text-[10px] tru-muted-text">
                    {config.colorMode === "dark" ? "Ativo" : "Desativado"}
                  </span>
                </div>
                <button
                  onClick={handleColorModeToggle}
                  className="w-10 h-5 rounded-full relative transition-all"
                  style={getToggleTrackStyle(config.colorMode === "dark")}
                >
                  <div
                    className={`absolute top-1 w-3 h-3 rounded-full transition-all ${config.colorMode === "dark" ? "left-6" : "left-1"}`}
                    style={getToggleThumbStyle(config.colorMode === "dark")}
                  />
                </button>
              </div>



              <div>
                <label className="text-[9px] uppercase font-black tru-muted-text tracking-wider mb-2 block">
                  Tema
                </label>
                <div className="flex flex-wrap gap-2">
                  {visibleThemeOptions.map((themeOption) => {
                    const isActive = config.theme === themeOption.id;

                    return (
                      <button
                        key={themeOption.id}
                        type="button"
                        onClick={() => handleSelectTheme(themeOption.id)}
                        aria-label={`Tema ${themeOption.label}`}
                        title={themeOption.label}
                        className={`h-7 w-7 rounded-full border transition-all ${isActive
                          ? "scale-110 border-foreground ring-2 ring-foreground/30"
                          : "border-white/20 hover:border-foreground/60"
                          }`}
                        style={{ backgroundColor: themeOption.color }}
                      >
                        <span className="sr-only">{themeOption.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>


            </div>
          </div>

          <div
            className="flex-1 p-5 flex flex-col items-center justify-center text-center space-y-3"
            style={{ backgroundColor: "color-mix(in srgb, var(--surface) 82%, transparent)" }}
          >
            <div className="space-y-1">
              <h3 className="text-xs font-black tru-progress-text uppercase italic tracking-wide">
                Apoie o Projeto
              </h3>
              <p className="text-[10px] tru-muted-text leading-tight">
                Mantenha o app sem anúncios
              </p>
            </div>

            <div className="bg-white p-2 rounded-xl shadow-xl">
              <div className="w-24 h-24 bg-zinc-200 flex items-center justify-center rounded-md overflow-hidden">
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
              className={`w-full py-2 rounded-xl font-black uppercase text-[9px] transition-all border ${pixCopied
                ? "tru-accent-bg tru-accent-border tru-on-accent"
                : "tru-btn-ghost"
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