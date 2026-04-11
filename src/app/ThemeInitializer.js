"use client";

import { useEffect } from "react";
import { applyAppearance, loadStoredSettings } from "@/app/utils/theme";

export default function ThemeInitializer() {
  useEffect(() => {
    const loadThemeFromStorage = () => {
      applyAppearance(loadStoredSettings());
    };

    loadThemeFromStorage();
    window.addEventListener("storage", loadThemeFromStorage);

    return () => {
      window.removeEventListener("storage", loadThemeFromStorage);
    };
  }, []);

  return null;
}
