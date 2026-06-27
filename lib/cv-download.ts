import {
  getFilenameFromUrl,
  triggerFileDownload,
  verifyFileExists,
} from "@/lib/file-download";
import {
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
