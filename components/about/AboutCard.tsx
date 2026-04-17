"use client";

import { motion } from "framer-motion";
import { memo, type ReactNode } from "react";
import { fadeInUpLargeVariant } from "@/lib/animations";

interface AboutCardProps {
  children: ReactNode;
  className?: string;
}

const AboutCard = memo(({ children, className = "" }: AboutCardProps) => {
  return (
    <motion.div
      variants={fadeInUpLargeVariant}
      initial="hidden"
      whileInView="show"
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-500 to-indigo-500" />
      {children}
    </motion.div>
  );
});

AboutCard.displayName = "AboutCard";

export default AboutCard;
