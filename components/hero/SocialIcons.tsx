"use client";

import { memo } from "react";

export const GithubIcon = memo(({ size = 18 }: { size?: number }) => (
  <img
    src="https://cdn.simpleicons.org/github/white"
    alt="GitHub"
    style={{ width: size, height: size }}
    className="opacity-90 group-hover:opacity-100 transition-opacity"
  />
));

GithubIcon.displayName = "GithubIcon";

export const LinkedinIcon = memo(({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
));

LinkedinIcon.displayName = "LinkedinIcon";
