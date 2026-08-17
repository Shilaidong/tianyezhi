"use client";

import { IconMoon, IconSun } from "./icons";

const STORAGE_KEY = "tianyezhi-theme";

export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const nextDark = !root.classList.contains("dark");
    root.classList.toggle("dark", nextDark);
    try {
      localStorage.setItem(STORAGE_KEY, nextDark ? "dark" : "light");
    } catch {
      /* private mode */
    }
  }

  return (
    <button
      type="button"
      className="oa-theme-toggle"
      onClick={toggle}
      aria-label="切换深色外观"
      title="切换深色外观"
    >
      <IconSun className="oa-theme-sun h-4 w-4" />
      <IconMoon className="oa-theme-moon h-4 w-4" />
    </button>
  );
}
