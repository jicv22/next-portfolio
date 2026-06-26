"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Code2,
  Gamepad2,
  Layers,
  Loader2,
  Monitor,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { downloadCv, type CvDownloadError } from "@/lib/cv-download";
import { CV_TYPES, isCvLocaleAvailable, type CvType } from "@/lib/cv-config";
import { staggerContainerVariant, fadeInUpVariant } from "@/lib/animations";
import type { Dictionary } from "@/types";
import type { Locale } from "@/i18n.config";

const CV_ICONS: Record<
  CvType,
  typeof Layers
> = {
  fullstack: Layers,
  frontend: Monitor,
  gamedev: Gamepad2,
};

const CV_ACCENT: Record<CvType, string> = {
  fullstack: "from-violet-500/20 to-indigo-500/10 group-hover:from-violet-500/30",
  frontend: "from-purple-500/20 to-fuchsia-500/10 group-hover:from-purple-500/30",
  gamedev: "from-emerald-500/20 to-teal-500/10 group-hover:from-emerald-500/30",
};

interface CvSelectionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  dict: Dictionary;
  lang: Locale;
}

export function CvSelectionPanel({
  isOpen,
  onClose,
  dict,
  lang,
}: CvSelectionPanelProps) {
  const t = dict.cvSelection;
  const isMobile = useIsMobile();
  const panelRef = useRef<HTMLDivElement>(null);
  const [downloadingType, setDownloadingType] = useState<CvType | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "info" | "error";
    message: string;
  } | null>(null);

  useScrollLock(isOpen);

  const handleClose = useCallback(() => {
    if (downloadingType) return;
    setFeedback(null);
    onClose();
  }, [downloadingType, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (isOpen) {
      setFeedback(null);
      setDownloadingType(null);
      requestAnimationFrame(() => {
        panelRef.current?.focus();
      });
    }
  }, [isOpen]);

  const getErrorMessage = (error: CvDownloadError): string => {
    if (error === "network") return t.errors.network;
    return t.errors.notFound;
  };

  const handleSelect = async (type: CvType) => {
    if (downloadingType) return;

    setFeedback(null);
    setDownloadingType(type);

    const result = await downloadCv(type, lang);

    setDownloadingType(null);

    if (!result.success) {
      setFeedback({
        type: "error",
        message: getErrorMessage(result.error ?? "not_found"),
      });
      return;
    }

    if (result.usedFallback) {
      setFeedback({ type: "info", message: t.errors.usingFallback });
      setTimeout(handleClose, 1200);
      return;
    }

    handleClose();
  };

  const showLocaleNotice = !isCvLocaleAvailable(lang);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-end md:items-center justify-center md:p-6"
          role="presentation"
        >
          <motion.button
            type="button"
            aria-label={t.close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-selection-title"
            tabIndex={-1}
            initial={
              isMobile
                ? { opacity: 0, y: "100%" }
                : { opacity: 0, scale: 0.92, y: 16 }
            }
            animate={
              isMobile
                ? { opacity: 1, y: 0 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              isMobile
                ? { opacity: 0, y: "100%" }
                : { opacity: 0, scale: 0.95, y: 8 }
            }
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 320,
              mass: 0.8,
            }}
            className="relative w-full md:max-w-lg glass-panel rounded-t-3xl md:rounded-3xl p-6 md:p-8 shadow-2xl outline-none max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-500 to-indigo-500" />

            {isMobile && (
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" aria-hidden />
            )}

            <button
              type="button"
              onClick={handleClose}
              disabled={!!downloadingType}
              className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed z-10"
              aria-label={t.close}
            >
              <X size={22} />
            </button>

            <header className="pr-10 mb-5">
              <div className="flex items-center gap-2 mb-1">
                <Code2 size={18} className="text-purple-400" aria-hidden />
                <h2
                  id="cv-selection-title"
                  className="text-xl md:text-2xl font-bold"
                >
                  {t.title}
                </h2>
              </div>
              <p className="text-sm text-white/50">{t.subtitle}</p>
            </header>

            {showLocaleNotice && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2"
              >
                {t.onlySpanish}
              </motion.p>
            )}

            <AnimatePresence mode="wait">
              {feedback && (
                <motion.p
                  key={feedback.message}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mb-4 text-xs rounded-xl px-3 py-2 border ${
                    feedback.type === "error"
                      ? "text-red-300/90 bg-red-500/10 border-red-500/20"
                      : "text-emerald-300/90 bg-emerald-500/10 border-emerald-500/20"
                  }`}
                  role="status"
                >
                  {feedback.message}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.ul
              variants={staggerContainerVariant}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-1"
            >
              {CV_TYPES.map((type) => {
                const Icon = CV_ICONS[type];
                const option = t.options[type];
                const isLoading = downloadingType === type;

                return (
                  <motion.li key={type} variants={fadeInUpVariant}>
                    <button
                      type="button"
                      disabled={!!downloadingType}
                      onClick={() => handleSelect(type)}
                      className="group w-full text-left glass-card rounded-2xl p-4 flex items-center gap-4 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] transition-transform active:scale-[0.98]"
                    >
                      <div
                        className={`shrink-0 w-12 h-12 rounded-xl bg-linear-to-br ${CV_ACCENT[type]} border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-white/20`}
                      >
                        {isLoading ? (
                          <Loader2
                            size={22}
                            className="text-purple-300 animate-spin"
                            aria-hidden
                          />
                        ) : (
                          <Icon
                            size={22}
                            className="text-white/80 group-hover:text-white transition-colors"
                            aria-hidden
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="block font-semibold text-white group-hover:text-purple-100 transition-colors">
                          {option.title}
                        </span>
                        <span className="block text-xs text-white/45 mt-0.5 line-clamp-2">
                          {option.description}
                        </span>
                      </div>

                      <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-white/30 group-hover:text-purple-300 transition-colors">
                        {isLoading ? t.downloading : "PDF"}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
