"use client";

import { motion } from "framer-motion";
import { useScrollLock } from "@/hooks/useScrollLock";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useScrollLock(isOpen);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0, y: -500 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0, y: 500 }}
        className="relative w-full max-w-2xl glass-panel rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-500 to-indigo-500" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h3 className="text-3xl md:text-4xl font-bold mb-6 pr-8">{title}</h3>

        <div className="overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
