const SETTINGS_KEY = "truscore_settings";
const DEFAULT_THEME = "ninja";
const DEFAULT_COLOR_MODE = "dark";

const normalizeColorMode = (mode) => {
  return mode === "light" ? "light" : "dark";
};

export const getAppearanceFromSettings = (settings = {}) => {
  return {
    theme: settings?.theme || DEFAULT_THEME,
    colorMode: normalizeColorMode(settings?.colorMode),
  };
};

export const applyAppearance = (settings = {}) => {
  if (typeof document === "undefined") {
    return;
  }

  const { theme, colorMode } = getAppearanceFromSettings(settings);
  const root = document.documentElement;

  root.setAttribute("data-theme", theme);
  root.setAttribute("data-color-mode", colorMode);
};

export const loadStoredSettings = () => {
  if (typeof window === "undefined") {
    return {
      theme: DEFAULT_THEME,
      colorMode: DEFAULT_COLOR_MODE,
    };
  }

  try {
    const savedRaw = localStorage.getItem(SETTINGS_KEY);
    const parsed = savedRaw ? JSON.parse(savedRaw) : {};

    return {
      ...parsed,
      ...getAppearanceFromSettings(parsed),
    };
  } catch {
    return {
      theme: DEFAULT_THEME,
      colorMode: DEFAULT_COLOR_MODE,
    };
  }
};

export { DEFAULT_COLOR_MODE, DEFAULT_THEME, SETTINGS_KEY };
