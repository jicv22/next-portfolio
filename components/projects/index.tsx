"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import Modal from "../common/Modal";
import SectionHeader from "../common/SectionHeader";
import ProjectCard from "./ProjectCard";
import ProjectLabels from "./ProjectLabels";
import type { Dictionary, Project } from "@/types";
import { staggerContainerSlowVariant } from "@/lib/animations";

interface ProjectsProps {
  dict: Dictionary;
}

export default function Projects({ dict }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const handleDetailsClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const { title, list: projectsList, details, view_code, view_live, close } = dict.projects;

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={title} className="mb-12" />

        <motion.div
          variants={staggerContainerSlowVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectsList.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              dict={dict} 
              onDetailsClick={handleDetailsClick} 
            />
          ))}
        </motion.div>
      </div>

      <Modal
        isOpen={!!selectedProject}
        onClose={closeModal}
        title={selectedProject?.title ?? ""}
      >
        {selectedProject && (
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <ProjectLabels labels={selectedProject.labels ?? []} />
            </div>

            <div className="prose prose-invert max-w-none flex-1">
              <p className="text-lg text-white/80 leading-relaxed italic border-l-4 border-purple-500/50 pl-6 py-2">
                {selectedProject.description}
              </p>
            </div>

            <div className="mt-10 flex justify-end">
              <button
                onClick={closeModal}
                className="px-8 py-3 rounded-full glass-button text-sm font-bold cursor-pointer hover:scale-105 transition-transform"
              >
                {close}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
