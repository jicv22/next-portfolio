export const locales = ["en", "es"] as const;
export const defaultLocale: Locale = "es";

export type Locale = (typeof locales)[number];

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
