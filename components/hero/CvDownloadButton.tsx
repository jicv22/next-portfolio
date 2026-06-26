"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { CvSelectionPanel } from "@/components/cv/CvSelectionPanel";
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
  const [isOpen, setIsOpen] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  const handleOpen = useCallback(() => {
    if (isActivating || isOpen) return;

    setIsActivating(true);
    requestAnimationFrame(() => {
      setIsOpen(true);
      setTimeout(() => setIsActivating(false), 350);
    });
  }, [isActivating, isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsActivating(false);
  }, []);

  return (
    <>
      <motion.button
        type="button"
        layout
        onClick={handleOpen}
        disabled={isActivating}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={label}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
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
            backgroundColor: isActivating
              ? "rgba(168, 85, 247, 0.2)"
              : "rgba(255, 255, 255, 0.05)",
          },
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group relative flex items-center h-12 rounded-full border border-white/10 backdrop-blur-sm px-4 w-full md:w-auto justify-center md:justify-start overflow-hidden cursor-pointer disabled:cursor-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
      >
        <AnimatePresence>
          {isActivating && (
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
          <Download size={18} strokeWidth={2.5} />
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
          {label}
        </motion.span>

        <span className="md:hidden ml-3 text-sm font-bold relative z-10">
          {label}
        </span>
      </motion.button>

      <CvSelectionPanel
        isOpen={isOpen}
        onClose={handleClose}
        dict={dict}
        lang={lang}
      />
    </>
  );
});
