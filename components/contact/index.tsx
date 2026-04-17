"use client";

import { motion } from "framer-motion";
import SectionHeader from "../common/SectionHeader";
import EmailCopy from "./EmailCopy";
import type { Dictionary } from "@/types";

const CONTACT_EMAIL = "jicv8@outlook.com";

interface ContactProps {
  dict: Dictionary;
}

export default function Contact({ dict }: ContactProps) {
  const { title, description, send_message } = dict.contact;

  return (
    <section id="contact" className="py-24 px-6 mb-20 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto glass-card rounded-3xl p-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-t from-purple-900/20 to-transparent" />
        
        <SectionHeader title={title} centered className="mb-4 relative z-10" />
        
        <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto relative z-10">
          {description}
        </p>

        <div className="flex flex-col items-center gap-6 relative z-10">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-block px-8 py-4 bg-white text-black font-bold rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer"
          >
            {send_message}
          </motion.a>

          <EmailCopy email={CONTACT_EMAIL} />
        </div>
      </motion.div>
    </section>
  );
}
