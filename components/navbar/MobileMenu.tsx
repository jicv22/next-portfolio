"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import NavLinks from "./NavLinks";
import LanguageSwitcher from "./LanguageSwitcher";
import type { NavLink } from "@/types";
import type { Locale } from "@/i18n.config";

interface MobileMenuProps {
  isOpen: boolean;
  links: NavLink[];
  lang: Locale;
  switchedPath: string;
  onClose: () => void;
  langDict: {
    en: string;
    es: string;
  };
}

const MobileMenu = memo(({ 
  isOpen, 
  links, 
  lang, 
  switchedPath, 
  onClose,
  langDict
}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center p-8"
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-xs">
        <div className="flex flex-col items-center gap-8 w-full">
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              onClick={onClose}
              className="text-3xl font-bold text-white hover:text-purple-400 transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full h-px bg-white/20 my-4"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full"
        >
          <LanguageSwitcher 
            currentLang={lang} 
            switchedPath={switchedPath} 
            variant="mobile" 
            onClick={onClose}
            dict={langDict}
          />
        </motion.div>
      </div>

      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
    </motion.div>
  );
});

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;
