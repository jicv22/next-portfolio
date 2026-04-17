"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import type { Project } from "@/types";

interface ProjectImageProps {
  project: Project;
}

const ProjectImage = memo(({ project }: ProjectImageProps) => {
  if (project.image) {
    return (
      <motion.img
        src={project.image}
        loading="lazy"
        alt={project.title}
        className="w-full h-full object-cover relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    );
  }

  if (project.logo) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-32 h-32 flex items-center justify-center p-4"
      >
        <motion.img
          src={project.logo}
          loading="lazy"
          alt={`${project.title} logo`}
          className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          whileHover={{ scale: 1.1, rotate: 2 }}
        />
      </motion.div>
    );
  }

  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-white/20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mb-2 opacity-50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span className="text-[10px] uppercase tracking-widest font-bold">
        No Image Available
      </span>
    </div>
  );
});

ProjectImage.displayName = "ProjectImage";

export default ProjectImage;
