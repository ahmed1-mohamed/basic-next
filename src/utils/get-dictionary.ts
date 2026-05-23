import type { Locale } from "@/lib/i18n";

const dictionaries = {
  en: () => import("@/assets/lang/en.json").then((module) => module.default),
  ar: () => import("@/assets/lang/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
