"use client";

import { useTheme } from "@/context/ThemeProvider";
import { useTranslations } from "@/context/LocaleProvider";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const { t } = useTranslations();

  if (!mounted) {
    return (
      <button
        type="button"
        className="h-9 w-9 rounded-lg border border-zinc-200 dark:border-zinc-700"
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
      aria-label={theme === "dark" ? t("theme.light") : t("theme.dark")}
      title={theme === "dark" ? t("theme.light") : t("theme.dark")}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
