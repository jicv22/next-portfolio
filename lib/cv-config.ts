import type { Locale } from "@/i18n.config";
import { getFilenameFromUrl } from "@/lib/file-download";

/** CV role identifiers. Add new types here when needed */
export const CV_TYPES = ["fullstack", "frontend", "gamedev"] as const;
export type CvType = (typeof CV_TYPES)[number];

/**
 * Locales with available CV files.
 * Add "en" when English PDFs are uploaded to public/cv/.
 */
export const CV_AVAILABLE_LOCALES = ["es"] as const satisfies readonly Locale[];

/** Fallback when requested locale has no file */
export const CV_FALLBACK_LOCALE: Locale = "es";

/**
 * Centralized CV file registry.
 * Keys: CV type → locale → public URL path.
 *
 * To add English: add `en: "/cv/CV_Jose_Cambronero_FullStack_EN.pdf"` etc.
 */
export const cvRegistry: Record<
  CvType,
  Partial<Record<Locale, string>>
> = {
  fullstack: {
    es: "/cv/CV_Jose_Cambronero_FullStack_ES.pdf",
    // en: "/cv/CV_Jose_Cambronero_FullStack_EN.pdf",
  },
  frontend: {
    es: "/cv/CV_Jose_Cambronero_Frontend_ES.pdf",
    // en: "/cv/CV_Jose_Cambronero_Frontend_EN.pdf",
  },
  gamedev: {
    es: "/cv/CV_Jose_Cambronero_GameDev_ES.pdf",
    // en: "/cv/CV_Jose_Cambronero_GameDev_EN.pdf",
  },
};

export interface CvResolveResult {
  url: string | null;
  resolvedLocale: Locale | null;
  usedFallback: boolean;
  requestedLocale: Locale;
}

/** Resolve CV URL with locale fallback (es) */
export function resolveCvUrl(type: CvType, locale: Locale): CvResolveResult {
  const files = cvRegistry[type];
  const requested = files?.[locale];

  if (requested) {
    return {
      url: requested,
      resolvedLocale: locale,
      usedFallback: false,
      requestedLocale: locale,
    };
  }

  const fallback = files?.[CV_FALLBACK_LOCALE];
  if (fallback) {
    return {
      url: fallback,
      resolvedLocale: CV_FALLBACK_LOCALE,
      usedFallback: locale !== CV_FALLBACK_LOCALE,
      requestedLocale: locale,
    };
  }

  return {
    url: null,
    resolvedLocale: null,
    usedFallback: false,
    requestedLocale: locale,
  };
}

export function isCvLocaleAvailable(locale: Locale): boolean {
  return (CV_AVAILABLE_LOCALES as readonly string[]).includes(locale);
}

export function getCvFilename(url: string): string {
  return getFilenameFromUrl(url);
}
