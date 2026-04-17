"use client";

import Link from "next/link";
import { memo } from "react";
import { Globe } from "lucide-react";
import type { Locale } from "@/i18n.config";

interface LanguageSwitcherProps {
  currentLang: Locale;
  switchedPath: string;
  variant?: "desktop" | "mobile";
  onClick?: () => void;
  dict?: {
    en: string;
    es: string;
  };
}

const LanguageSwitcher = memo(({ 
  currentLang, 
  switchedPath, 
  variant = "desktop",
  onClick,
  dict
}: LanguageSwitcherProps) => {
  if (variant === "mobile") {
    return (
      <Link
        href={switchedPath}
        onClick={onClick}
        scroll={false}
        replace={true}
        className="flex items-center justify-center gap-3 w-full py-4 rounded-3xl bg-white text-black font-bold text-lg hover:bg-purple-100 transition-colors"
      >
        <Globe size={20} />
        {currentLang === "en" ? dict?.es : dict?.en}
      </Link>
    );
  }

  return (
    <Link
      href={switchedPath}
      scroll={false}
      replace={true}
      className="text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors border border-white/10"
    >
      {currentLang === "en" ? "ES" : "EN"}
    </Link>
  );
});

LanguageSwitcher.displayName = "LanguageSwitcher";

export default LanguageSwitcher;
