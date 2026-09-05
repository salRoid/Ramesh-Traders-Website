/**
 * WCAG contrast utilities for admin-supplied colours.
 *
 * Anything the RT admin can type into a colour field (campaign `accent_color`,
 * and any future branded colour we surface) is untrusted for *legibility*: a
 * pale cream reads as invisible on the white `--panel`, a near-black reads as
 * invisible on the dark one. These helpers let a component decide, at render
 * time and without touching the DOM, whether a colour is safe to paint text in
 * — and, when it is not, what foreground to pair it with instead.
 *
 * Everything here is pure, synchronous and SSR-safe (no `window`, no theme
 * lookup), so it produces identical markup on the server and the client.
 *
 * All maths follows WCAG 2.1: sRGB → relative luminance → contrast ratio.
 */

/** `--panel` in light mode. The card the campaign chip sits on. */
export const PANEL_LIGHT = "#ffffff";
/** `--panel` in dark mode (`[data-theme="dark"]`). */
export const PANEL_DARK = "#141817";
/** `--ink` in light mode — the darkest text colour the token set allows. */
export const INK_LIGHT = "#161a19";

/** WCAG AA for normal-size text. */
export const AA_CONTRAST = 4.5;

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/**
 * Parse a hex colour into 0–255 channels.
 *
 * Tolerates a missing `#`, surrounding whitespace, any case, and the 3- and
 * 4-digit shorthands (`#abc`, `#abcf`); the alpha of an 8/4-digit value is
 * ignored, since we only reason about the opaque colour. Returns `null` for
 * anything else — empty strings, `rgb()`/`hsl()`/named colours, garbage — so
 * callers get a single "not usable" signal instead of an exception.
 */
export function parseHex(value: string | null | undefined): Rgb | null {
  if (typeof value !== "string") return null;
  const hex = value.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]+$/.test(hex)) return null;

  let full: string;
  if (hex.length === 3 || hex.length === 4) {
    full = hex
      .slice(0, 3)
      .split("")
      .map((c) => c + c)
      .join("");
  } else if (hex.length === 6 || hex.length === 8) {
    full = hex.slice(0, 6);
  } else {
    return null;
  }

  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

/** WCAG relative luminance (0 = black, 1 = white). */
export function relativeLuminance({ r, g, b }: Rgb): number {
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return (
    0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
  );
}

/**
 * WCAG contrast ratio between two colours, 1–21.
 *
 * Returns `0` when either colour cannot be parsed, so an unparseable colour is
 * never mistaken for a passing one.
 */
export function contrastRatio(
  a: string | null | undefined,
  b: string | null | undefined
): number {
  const ca = parseHex(a);
  const cb = parseHex(b);
  if (!ca || !cb) return 0;
  const la = relativeLuminance(ca);
  const lb = relativeLuminance(cb);
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** True when `fg` clears `threshold` against every background given. */
export function meetsContrast(
  fg: string | null | undefined,
  backgrounds: readonly string[],
  threshold: number = AA_CONTRAST
): boolean {
  if (backgrounds.length === 0) return false;
  return backgrounds.every((bg) => contrastRatio(fg, bg) >= threshold);
}

/**
 * True when `fg` is legible on the card surface in *both* themes.
 *
 * Note this is deliberately near-impossible to satisfy: no single colour clears
 * 4.5:1 against both `#ffffff` and `#141817`. That is the point — it is the
 * honest test for "can I paint this colour as text straight onto the panel and
 * forget about the theme?", and the answer is essentially always no. Components
 * should therefore give an admin colour its *own* opaque background (see
 * `readableForeground`) rather than letting the panel show through.
 */
export function isReadableOnPanel(
  fg: string | null | undefined,
  threshold: number = AA_CONTRAST
): boolean {
  return meetsContrast(fg, [PANEL_LIGHT, PANEL_DARK], threshold);
}

/**
 * Pick the foreground to sit on an opaque `background`.
 *
 * Chooses whichever of white / `--ink` contrasts more. Because the extremes are
 * white and near-black, the winner always clears ~4.58:1 for any input, so the
 * result is AA-legible whatever the admin picks — and because `background` is
 * opaque, the answer does not depend on the active theme. Returns `null` if the
 * background cannot be parsed.
 */
export function readableForeground(
  background: string | null | undefined
): string | null {
  if (!parseHex(background)) return null;
  const onWhite = contrastRatio("#ffffff", background);
  const onInk = contrastRatio(INK_LIGHT, background);
  return onWhite >= onInk ? "#ffffff" : INK_LIGHT;
}
