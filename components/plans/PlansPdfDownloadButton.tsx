"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { downloadPlansDocument } from "@/lib/plans-document";
import type { Locale } from "@/i18n.config";

interface PlansPdfDownloadButtonProps {
  label: string;
  downloadingLabel: string;
  errorMessage: string;
  fallbackMessage: string;
  lang: Locale;
}

export const PlansPdfDownloadButton = memo(function PlansPdfDownloadButton({
  label,
  downloadingLabel,
  errorMessage,
  fallbackMessage,
  lang,
}: PlansPdfDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleDownload = useCallback(async () => {
    if (isDownloading) return;

    setFeedback(null);
    setIsDownloading(true);

    const result = await downloadPlansDocument(lang);

    setIsDownloading(false);

    if (!result.success) {
      setFeedback(errorMessage);
      return;
    }

    if (result.usedFallback) {
      setFeedback(fallbackMessage);
      setTimeout(() => setFeedback(null), 3000);
    }
  }, [downloadingLabel, errorMessage, fallbackMessage, isDownloading, lang]);

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        aria-busy={isDownloading}
        whileHover={isDownloading ? undefined : { scale: 1.02, boxShadow: "0 0 28px rgba(168, 85, 247, 0.45)" }}
        whileTap={isDownloading ? undefined : { scale: 0.98 }}
        className="group flex items-center justify-center gap-2.5 h-12 px-8 w-full sm:w-auto rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-100 font-bold text-sm backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:bg-purple-500/25 hover:border-purple-400/60 disabled:opacity-70 disabled:cursor-wait transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
      >
        {isDownloading ? (
          <Loader2 size={18} strokeWidth={2.5} className="animate-spin text-purple-300" />
        ) : (
          <Download
            size={18}
            strokeWidth={2.5}
            className="text-purple-300 group-hover:text-purple-200 transition-colors"
          />
        )}
        {isDownloading ? downloadingLabel : label}
      </motion.button>

      <AnimatePresence>
        {feedback && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            role="status"
            className="text-xs text-center text-white/50 max-w-sm px-4"
          >
            {feedback}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

PlansPdfDownloadButton.displayName = "PlansPdfDownloadButton";
