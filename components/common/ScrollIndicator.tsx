"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ARROWS = [0, 1, 2];

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      const scrolled = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setVisible(maxScroll > 0 && scrolled < maxScroll - 8);
    };

    checkScrollable();
    window.addEventListener("scroll", checkScrollable, { passive: true });
    window.addEventListener("resize", checkScrollable, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkScrollable);
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  const handleClick = () => {
    window.scrollBy({ top: 300, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-indicator"
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Scroll down"
          className="fixed bottom-8 right-8 z-50 hidden md:flex flex-col items-center justify-center gap-0 cursor-pointer bg-transparent border-none p-2 group"
        >
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex flex-col items-center"
          >
            {ARROWS.map((i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  color: ["#ffffffff", "#ffffff", "#ffffffff"],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (ARROWS.length - 1 - i) * 0.22,
                }}
                className="-mt-2 first:mt-0"
              >
                <ChevronDown
                  size={20}
                  strokeWidth={2.5}
                  className="drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
