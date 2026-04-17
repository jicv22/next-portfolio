"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import type { ExperienceEntry } from "@/types";

interface TimelineEntryProps {
  entry: ExperienceEntry;
  index: number;
}

const TimelineEntry = memo(({ entry, index }: TimelineEntryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
        <div className="w-3 h-3 bg-purple-500 rounded-full" />
      </div>
      <div className="glass-card w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-xl">{entry.role}</h3>
          <time className="text-sm font-medium text-purple-300">
            {entry.year}
          </time>
        </div>
        <div className="text-white/60">{entry.company}</div>
      </div>
    </motion.div>
  );
});

TimelineEntry.displayName = "TimelineEntry";

export default TimelineEntry;
