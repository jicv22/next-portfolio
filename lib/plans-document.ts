import type { Locale } from "@/i18n.config";
import {
  getFilenameFromUrl,
  triggerFileDownload,
  verifyFileExists,
} from "@/lib/file-download";

/** Fallback when requested locale has no plans PDF */
export const PLANS_DOCUMENT_FALLBACK_LOCALE: Locale = "es";

/**
 * Centralized plans PDF registry.
 * Add `en: "/documents/Freelancing_Plans_EN.pdf"` when the English file is ready.
 */
export const plansDocumentRegistry: Partial<Record<Locale, string>> = {
  es: "/documents/Freelancing_Plans_ES.pdf",
};

export interface PlansDocumentResolveResult {
  url: string | null;
  resolvedLocale: Locale | null;
  usedFallback: boolean;
  requestedLocale: Locale;
}

export function resolvePlansDocumentUrl(
  locale: Locale
): PlansDocumentResolveResult {
  const requested = plansDocumentRegistry[locale];

  if (requested) {
    return {
      url: requested,
      resolvedLocale: locale,
      usedFallback: false,
      requestedLocale: locale,
    };
  }

  const fallback = plansDocumentRegistry[PLANS_DOCUMENT_FALLBACK_LOCALE];
  if (fallback) {
    return {
      url: fallback,
      resolvedLocale: PLANS_DOCUMENT_FALLBACK_LOCALE,
      usedFallback: locale !== PLANS_DOCUMENT_FALLBACK_LOCALE,
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

export type PlansDocumentDownloadError = "not_found" | "network";

export interface PlansDocumentDownloadResult {
  success: boolean;
  error?: PlansDocumentDownloadError;
  usedFallback?: boolean;
  filename?: string;
}

export async function downloadPlansDocument(
  locale: Locale
): Promise<PlansDocumentDownloadResult> {
  const resolved = resolvePlansDocumentUrl(locale);

  if (!resolved.url) {
    return { success: false, error: "not_found" };
  }

  const exists = await verifyFileExists(resolved.url);
  if (!exists) {
    return { success: false, error: "not_found" };
  }

  const filename = getFilenameFromUrl(resolved.url);

  try {
    triggerFileDownload(resolved.url, filename);
    return {
      success: true,
      usedFallback: resolved.usedFallback,
      filename,
    };
  } catch {
    return { success: false, error: "network" };
  }
}
