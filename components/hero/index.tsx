"use client";

import { motion } from "framer-motion";
import { Download, Send, Briefcase } from "lucide-react";
import { isValidLocale, type Locale } from "@/i18n.config";
import type { Dictionary } from "@/types";
import { Typewriter } from "./Typewriter";
import { CTAButton } from "./CTAButton";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

interface HeroProps {
  dict: Dictionary;
  lang: Locale;
}

export default function Hero({ dict, lang }: HeroProps) {
  const safeLang = isValidLocale(lang) ? lang : "en";
  const roles = dict.hero.roles;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <Typewriter roles={roles} />

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-6"
          >
            {dict.hero.experience_label}
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-b from-white to-white/60 leading-tight"
        >
          <span className="flex flex-col md:flex-row items-center justify-center md:gap-x-4">
            <span>{dict.hero.heading_1}</span>
            <span>{dict.hero.heading_2}</span>
          </span>
          <span className="text-purple-400 block">
            {dict.hero.heading_3}
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed"
        >
          {dict.hero.value_proposition}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 w-full max-w-sm md:max-w-none mx-auto"
        >
          <CTAButton
            icon={GithubIcon}
            label={dict.hero.github}
            href="https://github.com/jicv22"
            external
          />
          <CTAButton
            icon={LinkedinIcon}
            label={dict.hero.linkedin}
            href="https://www.linkedin.com/in/jicv22"
            external
          />
          <CTAButton
            icon={Send}
            label={dict.hero.contact_me}
            href="#contact"
            primary
          />
          <CTAButton
            icon={Download}
            label={dict.hero.cv}
            href={`/cv/CV_Jose_Cambronero_Frontend_${safeLang.toUpperCase()}.pdf`}
            download
          />
          <CTAButton
            icon={Briefcase}
            label={dict.hero.view_projects}
            href="#projects"
          />
        </motion.div>
      </div>
    </section>
  );
}
