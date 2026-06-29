import { en } from "./en";
import { tr, type Dictionary } from "./tr";

export type { Dictionary };

export type Locale = "tr" | "en";

export const defaultLocale: Locale = "tr";

export const locales: Locale[] = ["tr", "en"];

const dictionaries: Record<Locale, Dictionary> = { tr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? tr;
}

type NestedKeyOf<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? NestedKeyOf<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`;
    }[keyof T & string]
  : never;

export type TranslationKey = NestedKeyOf<Dictionary>;

export function translate(
  dict: Dictionary,
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  const keys = key.split(".");
  let value: unknown = dict;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  if (typeof value !== "string") {
    return key;
  }

  if (!params) {
    return value;
  }

  return Object.entries(params).reduce(
    (text, [paramKey, paramValue]) =>
      text.replace(`{${paramKey}}`, String(paramValue)),
    value
  );
}

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "tr" || value === "en";
}
