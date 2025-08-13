import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Prefix a public asset path with the app's base URL (handles GitHub Pages subpath)
export function withBase(p: string) {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : base + "/";
  const normalizedPath = p.startsWith("/") ? p.slice(1) : p;
  return normalizedBase + normalizedPath;
}
