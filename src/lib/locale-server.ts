import { cookies } from "next/headers";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  translate,
  type Dictionary,
  type Locale,
  type TranslationKey,
} from "@/i18n";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get("qybit-locale")?.value;
  return isLocale(value) ? value : defaultLocale;
}

export async function getServerTranslations(): Promise<{
  locale: Locale;
  dictionary: Dictionary;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return {
    locale,
    dictionary,
    t: (key, params) => translate(dictionary, key, params),
  };
}
