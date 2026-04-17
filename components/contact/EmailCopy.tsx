"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, memo } from "react";
import { Copy, Check } from "lucide-react";

interface EmailCopyProps {
  email: string;
}

const EmailCopy = memo(({ email }: EmailCopyProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }, [email]);

  return (
    <div className="relative group">
      <button
        onClick={copyToClipboard}
        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium py-2 px-4 rounded-xl hover:bg-white/5 cursor-pointer"
      >
        <span>{email}</span>
        {copied ? (
          <Check size={14} className="text-green-400" />
        ) : (
          <Copy size={14} className="group-hover:scale-110 transition-transform" />
        )}
      </button>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[10px] font-bold py-1 px-2 rounded flex items-center gap-1 shadow-lg pointer-events-none"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
});

EmailCopy.displayName = "EmailCopy";

export default EmailCopy;
