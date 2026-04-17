"use client";

import { memo } from "react";
import type { Skill } from "@/types";

interface SkillCardProps {
  skill: Skill;
  compact?: boolean;
}

const SkillCard = memo(({ skill, compact = false }: SkillCardProps) => {
  const iconSize = compact ? "w-6 h-6" : "w-7 h-7";
  const containerSize = compact ? "w-14 h-14 mb-3" : "w-16 h-16 mb-4";

  return (
    <div className="glass-card flex flex-col items-center justify-center p-6 rounded-2xl group h-full">
      <div
        className={`${containerSize} bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0`}
      >
        <img
          src={`https://cdn.simpleicons.org/${skill.slug}/white`}
          alt={skill.name}
          className={`${iconSize} object-contain opacity-80 group-hover:opacity-100 transition-opacity`}
          loading="lazy"
        />
      </div>
      <h3 className={`font-semibold text-white/90 ${compact ? "text-center" : ""} text-sm md:text-base`}>
        {skill.name}
      </h3>
      <p className={`${compact ? "text-[10px]" : "text-xs"} text-purple-300 mt-1`}>
        {skill.category}
      </p>
    </div>
  );
});

SkillCard.displayName = "SkillCard";

export default SkillCard;
