"use client";

import { motion } from "framer-motion";
import { LayoutList } from "lucide-react";
import { memo } from "react";

interface PlansWorkButtonProps {
  label: string;
  href?: string;
}

export const PlansWorkButton = memo(function PlansWorkButton({
  label,
  href = "#plans",
}: PlansWorkButtonProps) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(168, 85, 247, 0.45)" }}
      whileTap={{ scale: 0.98 }}
      className="group flex items-center justify-center gap-2.5 h-12 px-8 w-full md:w-auto rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-100 font-bold text-sm backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:bg-purple-500/25 hover:border-purple-400/60 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
    >
      <LayoutList
        size={18}
        strokeWidth={2.5}
        className="text-purple-300 group-hover:text-purple-200 transition-colors"
      />
      {label}
    </motion.a>
  );
});

PlansWorkButton.displayName = "PlansWorkButton";
