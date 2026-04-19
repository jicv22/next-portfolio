"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";
import type { Dictionary, NavLink } from "@/types";
import type { Locale } from "@/i18n.config";
import NavLinks from "./NavLinks";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  dict: Dictionary;
  lang: Locale;
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useScrollLock(isMenuOpen);

  const switchedLangPath = useMemo(() => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = lang === "en" ? "es" : "en";
    return segments.join("/");
  }, [pathname, lang]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenu();
  }, [closeMenu]);

  const navLinks: NavLink[] = useMemo(() => [
    { href: "#projects", label: dict.navigation.projects },
    { href: "#skills", label: dict.navigation.skills },
    { href: "#experience", label: dict.navigation.experience },
    { href: "#contact", label: dict.navigation.contact },
  ], [dict.navigation]);

  const langDict = useMemo(() => ({
    en: "Cambiar a Inglés",
    es: "Switch to Spanish"
  }), []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 mt-2"
      >
        <div className="glass-panel flex items-center justify-between px-6 py-3 rounded-full w-full max-w-4xl relative z-50">
          <Link
            href={`/${lang}`}
            onClick={scrollToTop}
            className="text-xl font-bold tracking-tighter hover:scale-105 transition-transform"
          >
            JI<span className="text-purple-400">CV</span>
          </Link>

          <NavLinks 
            links={navLinks} 
            className="hidden md:flex items-center gap-6 text-sm font-medium text-white/80" 
          />

          <div className="flex items-center gap-3">
            <LanguageSwitcher 
              currentLang={lang} 
              switchedPath={switchedLangPath} 
            />

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu 
            links={navLinks} 
            lang={lang} 
            switchedPath={switchedLangPath} 
            onClose={closeMenu}
            langDict={langDict}
          />
        )}
      </AnimatePresence>
    </>
  );
}
