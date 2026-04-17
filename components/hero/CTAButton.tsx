"use client";

import { motion } from "framer-motion";
import { memo, type ComponentType } from "react";

interface CTAButtonProps {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  href: string;
  primary?: boolean;
  external?: boolean;
  download?: boolean;
}

export const CTAButton = memo(
  ({
    icon: Icon,
    label,
    href,
    primary = false,
    external = false,
    download = false,
  }: CTAButtonProps) => (
    <motion.a
      layout
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download}
      initial="initial"
      whileHover="hover"
      animate="animate"
      variants={{
        initial: {
          backgroundColor: primary
            ? "rgba(255, 255, 255, 1)"
            : "rgba(255, 255, 255, 0.05)",
          color: primary
            ? "rgba(0, 0, 0, 1)"
            : "rgba(255, 255, 255, 1)",
          boxShadow: primary
            ? "0 0 20px rgba(255,255,255,0.3)"
            : "none",
        },
        hover: {
          backgroundColor: primary
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(255, 255, 255, 0.15)",
          boxShadow: primary
            ? "0 0 30px rgba(255,255,255,0.5)"
            : "0 0 15px rgba(255,255,255,0.1)",
        },
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative flex items-center h-12 rounded-full border border-white/10 backdrop-blur-sm px-4 w-full md:w-auto justify-center md:justify-start"
    >
      <div className="shrink-0 flex items-center justify-center">
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <motion.span
        layout
        variants={{
          initial: { width: 0, opacity: 0, marginLeft: 0 },
          hover: { width: "auto", opacity: 1, marginLeft: 10 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden whitespace-nowrap text-sm font-bold pointer-events-none hidden md:block"
      >
        {label}
      </motion.span>
      <span className="md:hidden ml-3 text-sm font-bold">{label}</span>
    </motion.a>
  )
);

CTAButton.displayName = "CTAButton";
