import {
  getCvFilename,
  resolveCvUrl,
  type CvType,
} from "@/lib/cv-config";
import type { Locale } from "@/i18n.config";

export type CvDownloadError = "not_found" | "network" | "unavailable";

export interface CvDownloadResult {
  success: boolean;
  error?: CvDownloadError;
  usedFallback?: boolean;
  filename?: string;
}

async function verifyCvExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD", cache: "no-store" });
    return response.ok;
  } catch {
    return false;
  }
}

function triggerBrowserDownload(url: string, filename: string): void {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

/**
 * Resolve URL, verify file exists, trigger download.
 * Falls back to Spanish if requested locale is missing.
 */
export async function downloadCv(
  type: CvType,
  locale: Locale
): Promise<CvDownloadResult> {
  const resolved = resolveCvUrl(type, locale);

  if (!resolved.url) {
    return { success: false, error: "not_found" };
  }

  const exists = await verifyCvExists(resolved.url);
  if (!exists) {
    return { success: false, error: "not_found" };
  }

  const filename = getCvFilename(resolved.url);

  try {
    triggerBrowserDownload(resolved.url, filename);
    return {
      success: true,
      usedFallback: resolved.usedFallback,
      filename,
    };
  } catch {
    return { success: false, error: "network" };
  }
}
