"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { memo, type ComponentType } from "react";
import { fadeInUpVariant } from "@/lib/animations";
import type { Plan } from "@/types";

interface PlanCardProps {
  plan: Plan;
  cta: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

const PlanCard = memo(({ plan, cta, icon: Icon }: PlanCardProps) => {
  const { title, tagline, price_label, price_unit, highlight, badge, payment, features } = plan;

  return (
    <motion.div
      variants={fadeInUpVariant}
      className={`relative flex flex-col rounded-3xl p-7 md:p-8 border transition-colors duration-300 ${
        highlight
          ? "bg-white/6 border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.12)]"
          : "glass-card border-white/8"
      }`}
    >
      {highlight && (
        <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-purple-500/8 to-transparent pointer-events-none" />
      )}
      {highlight && (
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-3xl bg-linear-to-r from-transparent via-purple-400/60 to-transparent" />
      )}

      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${highlight ? "bg-purple-500/20 border-purple-500/30" : "bg-white/6 border-white/10"}`}>
          <Icon size={18} strokeWidth={2} className={highlight ? "text-purple-300" : "text-white/60"} />
        </div>
        {badge ? (
          <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {badge}
          </span>
        ) : null}
      </div>

      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-sm text-white/50 mb-6">{tagline}</p>

      <div className="mb-6">
        <span className={`text-4xl font-bold ${highlight ? "text-purple-300" : "text-white"}`}>
          {price_label}
        </span>
        {price_unit && (
          <span className="ml-1 text-sm text-white/40">{price_unit}</span>
        )}
        <p className="mt-2 text-xs text-white/40">{payment}</p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-white/70">
            <Check
              size={15}
              strokeWidth={2.5}
              className={`shrink-0 mt-0.5 ${highlight ? "text-purple-400" : "text-white/40"}`}
            />
            {feature}
          </li>
        ))}
      </ul>

      <motion.a
        href="#contact"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
        className={`w-full text-center py-3 px-6 rounded-full text-sm font-bold transition-colors duration-200 cursor-pointer ${
          highlight
            ? "bg-purple-500 hover:bg-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            : "bg-white/8 hover:bg-white/15 text-white border border-white/10"
        }`}
      >
        {cta}
      </motion.a>
    </motion.div>
  );
});

PlanCard.displayName = "PlanCard";

export default PlanCard;
