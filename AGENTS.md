<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Ramesh Traders site

## Design system

All styling comes from the Lumen token set in `src/app/globals.css` — the
`--ap*` accent, `--panel/--ink/--sub` surfaces, the `--r-*` radii and the
`.f-*` utility classes (`.f-card`, `.f-btn primary|soft|ghost|danger`,
`.f-panel`, `.f-chip`, `.f-input`, `.f-h1/.f-sub/.f-meta/.f-eyebrow`). Compose
those rather than inventing new colours or shadows. Dark mode is driven by
`data-theme="dark"` on `<html>`; every token has a dark counterpart, so if you
only use tokens, dark mode works for free.

## Animation rules

Content must never depend on JavaScript to become visible.

- Entrances use the CSS classes `.f-rise` (plays on load) and `.f-reveal`
  (scroll-driven via `animation-timeline: view()`, degrades to plain visible
  content where unsupported). Stagger with inline `animationDelay`.
- `.f-swipe` turns a row into a scroll-snap carousel below 760px.
- Framer Motion is reserved for genuine interaction: the cart drawer, the
  product detail sheet, the hero and campaign crossfades, the segmented-control
  pill, the stat count-up and hover lifts. Do not use `whileInView` for
  entrances — it leaves content at `opacity: 0` until hydration.
- Everything is wrapped by a `prefers-reduced-motion` guard.

## Images

Image slots are declared in `content/media-manifest.json` and resolved at
render time by `media()` in `src/lib/media.ts`: a slot renders its photograph
if the file exists and a designed `<NetWeave />` fallback otherwise. To add or
fill one, use the **`rt-media`** skill (`.claude/skills/rt-media/`). Brand
originals live in `brand-source/` (not served); processed derivatives go in
`public/brand/`. Product photography comes from the catalogue API, not this
repo.

## Content that changes without a deploy

Hero slides (`/api/public/hero-slides`), campaigns (`/api/public/campaigns`)
and the catalogue (`/api/public/catalogue`) are fetched from the RT admin at
`RT_BASE` with a short revalidate. Every one of them fails soft — if the
backend is unreachable the site falls back to built-in content. Keep it that
way. To plan or ship an offer, use the **`rt-campaign`** skill; briefs live in
`content/campaigns/`.

## Routes

`/` (hero, campaign, categories, best sellers, why-us, testimonials, contact
band + enquiry form + map), `/products` (catalogue + order drawer), `/about`
(story, journey, why-us, testimonials, leadership), `/contact` (enquiry form,
contact cards, map). No redirects.

## Phone and WhatsApp routing

All numbers live in `src/lib/site-content.ts` — never hardcode a `wa.me` link.
`WHATSAPP` (9308570270) is every general "WhatsApp us" button; `ENQUIRY_NUMBER`
and `ORDER_NUMBER` (both 9334117166) are where the enquiry form and the cart
deliver. `PhoneList` renders each number with its own WhatsApp glyph.

## Image and content briefs

`content/IMAGE-BRIEF.md` is the handoff spec for product photos, campaign media
and hero images. `content/hero-slides.md` plans the hero rotation.
`content/campaigns/` holds campaign briefs.
