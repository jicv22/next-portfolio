"use client";

import type { Dictionary } from "@/types";
import SectionHeader from "../common/SectionHeader";
import TimelineEntry from "./TimelineEntry";

interface ExperienceProps {
  dict: Dictionary;
}

export default function Experience({ dict }: ExperienceProps) {
  const { title, list: experienceList } = dict.experience;

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title={title} centered className="mb-16" />

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-white/20 before:to-transparent">
          {experienceList.map((entry, idx) => (
            <TimelineEntry key={idx} entry={entry} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
