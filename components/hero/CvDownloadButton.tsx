"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { downloadCv } from "@/lib/cv-download";
import type { Dictionary } from "@/types";
import type { Locale } from "@/i18n.config";

interface CvDownloadButtonProps {
  label: string;
  dict: Dictionary;
  lang: Locale;
}

export const CvDownloadButton = memo(function CvDownloadButton({
  label,
  dict,
  lang,
}: CvDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = useCallback(async () => {
    if (isDownloading) return;

    setError(null);
    setIsDownloading(true);

    const result = await downloadCv("fullstack", lang);

    setIsDownloading(false);

    if (!result.success) {
      const message =
        result.error === "network"
          ? dict.cvSelection.errors.network
          : dict.cvSelection.errors.notFound;
      setError(message);
      return;
    }

    if (result.usedFallback) {
      setError(dict.cvSelection.errors.usingFallback);
      setTimeout(() => setError(null), 3000);
    }
  }, [dict, isDownloading, lang]);

  return (
    <div className="relative w-full md:w-auto">
      <motion.button
        type="button"
        layout
        onClick={handleDownload}
        disabled={isDownloading}
        aria-label={label}
        aria-busy={isDownloading}
        initial="initial"
        whileHover={isDownloading ? undefined : "hover"}
        whileTap={isDownloading ? undefined : "tap"}
        animate="animate"
        variants={{
          initial: {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "rgba(255, 255, 255, 1)",
            scale: 1,
          },
          hover: {
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            boxShadow: "0 0 15px rgba(168, 85, 247, 0.25)",
          },
          tap: { scale: 0.96 },
          animate: {
            backgroundColor: isDownloading
              ? "rgba(168, 85, 247, 0.2)"
              : "rgba(255, 255, 255, 0.05)",
          },
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group relative flex items-center h-12 rounded-full border border-white/10 backdrop-blur-sm px-4 w-full md:w-auto justify-center md:justify-start overflow-hidden cursor-pointer disabled:cursor-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
      >
        <AnimatePresence>
          {isDownloading && (
            <motion.span
              key="ripple"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-purple-400/40 pointer-events-none"
              aria-hidden
            />
          )}
        </AnimatePresence>

        <div className="shrink-0 flex items-center justify-center relative z-10">
          {isDownloading ? (
            <Loader2 size={18} strokeWidth={2.5} className="animate-spin" />
          ) : (
            <Download size={18} strokeWidth={2.5} />
          )}
        </div>

        <motion.span
          layout
          variants={{
            initial: { width: 0, opacity: 0, marginLeft: 0 },
            hover: { width: "auto", opacity: 1, marginLeft: 10 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden whitespace-nowrap text-sm font-bold pointer-events-none hidden md:block relative z-10"
        >
          {isDownloading ? dict.cvSelection.downloading : label}
        </motion.span>

        <span className="md:hidden ml-3 text-sm font-bold relative z-10">
          {isDownloading ? dict.cvSelection.downloading : label}
        </span>
      </motion.button>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            role="status"
            className="absolute left-0 right-0 top-full mt-2 text-xs text-center text-red-300/90 md:whitespace-nowrap md:left-1/2 md:-translate-x-1/2 md:w-max"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});
