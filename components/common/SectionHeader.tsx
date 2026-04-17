"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface SectionHeaderProps {
  title: string;
  className?: string;
  centered?: boolean;
}

const SectionHeader = memo(({ title, className = "", centered = false }: SectionHeaderProps) => {
  return (
    <motion.h2
      initial={{ opacity: 0, x: centered ? 0 : -20, y: centered ? 20 : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl font-bold ${centered ? "text-center" : ""} ${className}`}
    >
      {title}
    </motion.h2>
  );
});

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
