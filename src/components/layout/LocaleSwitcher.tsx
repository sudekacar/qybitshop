"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "@/context/LocaleProvider";
import type { Locale } from "@/i18n";

export function LocaleSwitcher() {
  const router = useRouter();
  const { locale, setLocale, t, mounted } = useTranslations();

  if (!mounted) {
    return (
      <div className="h-9 w-20 rounded-lg border border-zinc-200 dark:border-zinc-700" />
    );
  }

  const options: { value: Locale; label: string }[] = [
    { value: "tr", label: t("locale.tr") },
    { value: "en", label: t("locale.en") },
  ];

  return (
    <select
      value={locale}
      onChange={(e) => {
        setLocale(e.target.value as Locale);
        router.refresh();
      }}
      className="h-9 rounded-lg border border-zinc-200 bg-white px-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
      aria-label="Language"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
