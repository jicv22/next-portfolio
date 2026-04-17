"use client";

import { memo, useMemo, type ReactNode } from "react";

interface HighlightedTextProps {
  text: string;
  phrases: string[];
  highlightClass?: string;
}

const HighlightedText = memo(({ 
  text, 
  phrases, 
  highlightClass = "text-purple-400 font-semibold" 
}: HighlightedTextProps) => {
  const parts = useMemo(() => {
    if (!phrases.length) return [text];
    
    const result: ReactNode[] = [];
    let remaining = text;

    while (remaining.length > 0) {
      let earliestMatch: { index: number; phrase: string; length: number } | null = null;

      for (const phrase of phrases) {
        const index = remaining.toLowerCase().indexOf(phrase.toLowerCase());
        if (index !== -1 && (earliestMatch === null || index < earliestMatch.index)) {
          earliestMatch = { index, phrase, length: phrase.length };
        }
      }

      if (earliestMatch === null) {
        result.push(remaining);
        break;
      }

      if (earliestMatch.index > 0) {
        result.push(remaining.substring(0, earliestMatch.index));
      }

      result.push(
        <span key={result.length} className={highlightClass}>
          {remaining.substring(earliestMatch.index, earliestMatch.index + earliestMatch.length)}
        </span>
      );

      remaining = remaining.substring(earliestMatch.index + earliestMatch.length);
    }
    
    return result;
  }, [text, phrases, highlightClass]);

  return <>{parts}</>;
});

HighlightedText.displayName = "HighlightedText";

export default HighlightedText;
