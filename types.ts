import type { getDictionary } from "./get-dictionary";

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export type Project = Dictionary["projects"]["list"][number];

export type ExperienceEntry = Dictionary["experience"]["list"][number];

export type Skill = Dictionary["skills"]["list"][number];

export interface NavLink {
  href: string;
  label: string;
}
