"use client";

import { motion } from "framer-motion";
import { Clock, FileText, Users } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import PlanCard from "./PlanCard";
import { PlansPdfDownloadButton } from "./PlansPdfDownloadButton";
import { staggerContainerVariant } from "@/lib/animations";
import type { Dictionary } from "@/types";
import type { Locale } from "@/i18n.config";

const PLAN_ICONS = {
  fixed: FileText,
  hours: Clock,
  dedicated: Users,
} as const;

interface PlansProps {
  dict: Dictionary;
  lang: Locale;
}

export default function Plans({ dict, lang }: PlansProps) {
  const t = dict.plans;

  return (
    <section id="plans" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title={t.title} centered className="mb-4" />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-white/55 text-lg max-w-xl mx-auto mb-16"
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {t.list.map((plan) => {
            const Icon = PLAN_ICONS[plan.id as keyof typeof PLAN_ICONS];
            return (
              <PlanCard
                key={plan.id}
                plan={plan}
                cta={t.cta}
                icon={Icon}
              />
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <PlansPdfDownloadButton
            label={t.download_pdf}
            downloadingLabel={t.downloading_pdf}
            errorMessage={t.download_pdf_error}
            fallbackMessage={t.download_pdf_fallback}
            lang={lang}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-start gap-3 glass-card rounded-2xl px-5 py-4">
            <span className="text-green-400 mt-0.5 shrink-0" aria-hidden>✓</span>
            <p className="text-sm text-white/55">{t.new_client_note}</p>
          </div>
          <div className="flex items-start gap-3 glass-card rounded-2xl px-5 py-4">
            <span className="text-purple-400 mt-0.5 shrink-0" aria-hidden>✓</span>
            <p className="text-sm text-white/55">{t.recurring_note}</p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-xs text-white/30"
        >
          {t.availability} &middot; {t.overtime_note}
        </motion.p>
      </div>
    </section>
  );
}
