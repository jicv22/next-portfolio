"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { Eye } from "lucide-react";
import ProjectImage from "./ProjectImage";
import ProjectLabels from "./ProjectLabels";
import type { Project, Dictionary } from "@/types";
import { fadeInUpLargeVariant } from "@/lib/animations";

interface ProjectCardProps {
  project: Project;
  dict: Dictionary;
  onDetailsClick: (project: Project) => void;
}

const ProjectCard = memo(({ project, dict, onDetailsClick }: ProjectCardProps) => {
  return (
    <motion.div
      variants={fadeInUpLargeVariant}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="glass-card rounded-3xl overflow-hidden group relative flex flex-col h-full"
    >
      <div className="h-48 bg-white/5 relative overflow-hidden flex items-center justify-center shrink-0">
        <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 to-indigo-500/20 group-hover:scale-110 transition-transform duration-500 z-0" />

        <ProjectImage project={project} />

        {project.image && project.logo && (
          <div className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/40 backdrop-blur-md rounded-xl p-2 border border-white/10 shadow-xl group-hover:scale-110 transition-transform">
            <img
              src={project.logo}
              loading="lazy"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {project.description && (
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute cursor-pointer z-30 opacity-0 translate-y-24 group-hover:opacity-100 group-hover:translate-y-16 transition-all duration-300 px-6 py-2.5 bg-white text-black font-bold text-xs rounded-full shadow-[0_0_25px_rgba(168,85,247,0.5)] border border-purple-500/20"
            onClick={() => onDetailsClick(project)}
          >
            {dict.projects.details}
          </motion.button>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <div className="mb-6">
          <ProjectLabels labels={project.labels ?? []} />
        </div>
        
        <div className="flex flex-col-reverse gap-3 mt-auto">
          <button
            onClick={() => onDetailsClick(project)}
            className="cursor-pointer md:hidden flex items-center justify-center py-2 glass-button rounded-xl transition-all"
          >
            <Eye size={18} />
          </button>

          {project.links?.code && project.links.code !== "#" && (
            <a
              href={project.links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-2 text-sm font-medium glass-button rounded-xl transition-all"
            >
              {dict.projects.view_code}
            </a>
          )}
          {project.links?.live && project.links.live !== "#" && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-2 text-sm font-medium bg-white text-black hover:bg-white/90 transition-colors rounded-xl"
            >
              {dict.projects.view_live}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
