"use client";

import { memo } from "react";

interface ProjectLabelsProps {
  labels: string[];
}

const ProjectLabels = memo(({ labels }: ProjectLabelsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {labels.map((label, idx) => (
        <span
          key={idx}
          className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/70"
        >
          {label}
        </span>
      ))}
    </div>
  );
});

ProjectLabels.displayName = "ProjectLabels";

export default ProjectLabels;
