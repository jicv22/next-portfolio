"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import Modal from "../common/Modal";
import SectionHeader from "../common/SectionHeader";
import SkillCard from "./SkillCard";
import type { Dictionary } from "@/types";
import {
  staggerContainerVariant,
  fadeInUpVariant,
} from "@/lib/animations";

const VISIBLE_SKILL_COUNT = 8;

interface SkillsProps {
  dict: Dictionary;
}

export default function Skills({ dict }: SkillsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const { title, show_all, list: skillsList } = dict.skills;
  const visibleSkills = skillsList.slice(0, VISIBLE_SKILL_COUNT);
  const hasMoreSkills = skillsList.length > VISIBLE_SKILL_COUNT;

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title={title} centered className="mb-12" />

        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {visibleSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUpVariant}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-full"
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </motion.div>

        {hasMoreSkills && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={toggleModal}
              className="px-8 py-3 rounded-full glass-button text-sm font-bold cursor-pointer hover:scale-105 transition-transform"
            >
              {show_all}
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={toggleModal}
            title={title}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              {skillsList.map((skill, idx) => (
                <SkillCard key={idx} skill={skill} compact />
              ))}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
