"use client";

import type { Dictionary } from "@/types";
import AboutCard from "./AboutCard";
import SectionHeader from "../common/SectionHeader";
import HighlightedText from "./HighlightedText";

interface AboutMeProps {
  dict: Dictionary;
}

export default function AboutMe({ dict }: AboutMeProps) {
  const { title, p1, p2, highlights } = dict.about;

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <AboutCard>
          <SectionHeader title={title} className="mb-8" />

          <div className="space-y-6 text-lg text-white/80 leading-relaxed text-pretty">
            <p>
              <HighlightedText text={p1} phrases={highlights} />
            </p>
            <p>
              <HighlightedText text={p2} phrases={highlights} />
            </p>
          </div>
        </AboutCard>
      </div>
    </section>
  );
}
