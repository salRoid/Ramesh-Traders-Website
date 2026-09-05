import fs from "node:fs";
import path from "node:path";

/**
 * Returns the public URL for an asset if it actually exists on disk, else null.
 *
 * Lets the site ship with designed placeholders and light up automatically the
 * moment a real photograph is dropped into `public/` — no code change needed.
 * Server-side only (used from Server Components, evaluated at build time for
 * static routes).
 */
export function media(publicPath: string): string | null {
  const rel = publicPath.replace(/^\/+/, "");
  try {
    return fs.existsSync(path.join(process.cwd(), "public", rel))
      ? `/${rel}`
      : null;
  } catch {
    return null;
  }
}

/** First existing path from the list, else null. */
export function firstMedia(...publicPaths: string[]): string | null {
  for (const p of publicPaths) {
    const found = media(p);
    if (found) return found;
  }
  return null;
}
