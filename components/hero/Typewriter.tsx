"use client";

import { motion } from "framer-motion";
import { useState, useEffect, memo } from "react";

export const Typewriter = memo(({ roles }: { roles: string[] }) => {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const handleTyping = () => {
      if (isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        setTypingSpeed(75);
      }

      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 3000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles, typingSpeed]);

  return (
    <div className="inline-block px-4 py-1.5 rounded-full glass-panel mb-4 text-sm font-medium text-purple-200">
      {displayText}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-purple-400 ml-1"
        style={{ verticalAlign: "middle" }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.75, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
});

Typewriter.displayName = "Typewriter";
