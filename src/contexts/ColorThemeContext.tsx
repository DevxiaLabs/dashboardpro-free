"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTheme } from "./ThemeContext";

export type ColorTheme =
  | "ocean"
  | "sunset"
  | "forest"
  | "lavender"
  | "slate"
  | "ocean-dark"
  | "sunset-dark"
  | "forest-dark"
  | "lavender-dark"
  | "slate-dark";

/** Base theme name without -dark suffix */
export type BaseColorTheme = "ocean" | "sunset" | "forest" | "lavender" | "slate";

interface ColorThemeContextType {
  /** The actual applied theme (may include -dark) */
  colorTheme: ColorTheme;
  /** The base theme selected by the user (without -dark) */
  baseColorTheme: BaseColorTheme;
  /** Set the base theme — dark variant is auto-applied based on dark/light mode */
  setColorTheme: (theme: BaseColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

const THEME_CLASS_PREFIX = "theme-";
const ALL_THEME_CLASSES = [
  "ocean",
  "sunset",
  "forest",
  "lavender",
  "slate",
  "ocean-dark",
  "sunset-dark",
  "forest-dark",
  "lavender-dark",
  "slate-dark",
].map((t) => `${THEME_CLASS_PREFIX}${t}`);

function getBaseTheme(theme: string): BaseColorTheme {
  return theme.replace(/-dark$/, "") as BaseColorTheme;
}

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [baseTheme, setBaseTheme] = useState<BaseColorTheme>("ocean");

  // Load initial
  useEffect(() => {
    const stored = localStorage.getItem("colorTheme");
    if (stored) {
      setBaseTheme(getBaseTheme(stored));
    }
  }, []);

  // Compute the actual applied theme
  const colorTheme: ColorTheme = isDark ? (`${baseTheme}-dark` as ColorTheme) : baseTheme;

  // Apply class
  useEffect(() => {
    const root = document.documentElement;
    ALL_THEME_CLASSES.forEach((cls) => root.classList.remove(cls));
    root.classList.add(`${THEME_CLASS_PREFIX}${colorTheme}`);
  }, [colorTheme]);

  const setColorTheme = (t: BaseColorTheme) => {
    setBaseTheme(t);
    localStorage.setItem("colorTheme", t);
  };

  const value = useMemo(
    () => ({ colorTheme, baseColorTheme: baseTheme, setColorTheme }),
    [colorTheme, baseTheme]
  );

  return (
    <ColorThemeContext.Provider value={value}>{children}</ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  const ctx = useContext(ColorThemeContext);
  if (!ctx) throw new Error("useColorTheme must be used within a ColorThemeProvider");
  return ctx;
}
