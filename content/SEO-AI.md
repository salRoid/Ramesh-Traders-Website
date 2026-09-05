# Ramesh Traders — discoverability and AI facts

This file covers the machine-readable layer of the site: the files a search
engine or an AI assistant reads to decide what this business is and whether to
name it when someone asks for a thread yarn or fishing net supplier.

Everything here is treated by those readers as **authoritative**. A claim in
`src/lib/seo.ts` or `public/llms.txt` is not marketing copy that a human will
discount — it is a fact an assistant will repeat verbatim to a buyer. So the
rule for this layer is stricter than for the rest of the site: **if it is not
sourced, it does not go in.**

---

## The files

| File | What it does |
|---|---|
| `src/lib/seo.ts` | The single source of structured facts — site URL, founding year, coordinates, opening hours, product lines — and the `siteJsonLd()` builder that turns them into a schema.org `@graph`. |
| `src/app/layout.tsx` | Renders `siteJsonLd()` into a `<script type="application/ld+json">` in `<head>`, and holds `metadataBase`, the default title/description, `openGraph` and `twitter`. |
| `src/app/robots.ts` | `/robots.txt`. Allows every crawler including the named AI crawlers; blocks only `/api/`. Points at the sitemap. |
| `src/app/sitemap.ts` | `/sitemap.xml`. The four public routes: `/`, `/products`, `/about`, `/contact`. |
| `public/llms.txt` | The plain-language brief for an assistant answering a sourcing question — what they sell, where they are, how to buy, how to make contact. Served as a static file. |
| `src/app/{about,contact}/page.tsx` | Page-level `metadata` exports only — title, description, canonical, OG. |

The JSON-LD is server-rendered into the HTML. It never depends on JavaScript,
which is the same rule the visible content follows (see `AGENTS.md`).

---

## Which facts are asserted, and where they came from

| Claim | Source | Asserted in |
|---|---|---|
| Name "Ramesh Traders" | `site-content.ts`, site-wide | JSON-LD, llms.txt, metadata |
| Established 1960, family-run, third generation | Owner, Sept 2026 | `FOUNDING_YEAR` in `seo.ts` → JSON-LD `foundingDate`; llms.txt blockquote |
| Khajekalan, near Janta Market, Patna City, Bihar 800008 | `ADDRESS` in `site-content.ts` | JSON-LD `PostalAddress`, llms.txt, contact metadata |
| 25.6097 N, 85.2017 E | The Google Maps embed already on `/contact` | JSON-LD `geo`, llms.txt |
| Three phone numbers | `PHONES` / `WHATSAPP_NUMBERS` in `site-content.ts` | JSON-LD `contactPoint`, llms.txt |
| Email | `EMAIL` in `site-content.ts` | JSON-LD, llms.txt |
| Mon–Sat 9:00 AM – 6:00 PM IST, closed Sunday | Business hours as given | JSON-LD `openingHoursSpecification`, llms.txt, contact metadata |
| Product lines — thread yarn, fishing nets (trawl/gill/drag/cast), ropes and cordage, hooks/float balls/sinkers, mauli thread, custom orders | `Categories.tsx`, catalogue, about-page copy | JSON-LD `hasOfferCatalog`, llms.txt |
| Mill-direct sourcing; checked before dispatch; stock held through the season; you speak to the family | `STANDARDS` on the about page | llms.txt |
| Quotes within 24 hours | Catalogue page copy | llms.txt, `DESCRIPTION` in `seo.ts` |
| Reach of 30+ cities across eastern India | `FEATURES` in `site-content.ts` | JSON-LD `areaServed` (Bihar + Eastern India), llms.txt |

## What is deliberately left out

These are the ones to be careful about — they exist in the visible copy but are
**not** repeated in the machine-readable layer, on purpose. Do not add them back
without a source.

- **ISO 9001.** `FEATURES` in `site-content.ts` claims it. It is unverified, so
  there is no `hasCertification` in the JSON-LD and no mention in `llms.txt`.
  Structured data asserting a certification the business cannot evidence is a
  much bigger problem than a line of marketing copy doing the same.
- **Testimonials.** `QUOTES` in `site-content.ts` is explicitly marked
  placeholder — the people are invented. So there is no `Review` and no
  `aggregateRating` anywhere. Adding either while the quotes are fictional would
  put fabricated endorsements into Google's rich results.
- **Nepal and Jharkhand.** Sometimes mentioned as a catchment. The sourced reach
  is "30+ cities across eastern India", so `areaServed` says Bihar and eastern
  India and nothing more.
- **Any derived duration** ("45 years in the trade"). State the founding year
  and let the reader do the arithmetic; a hardcoded duration goes stale and,
  while the founding year is unsettled, would compound the error.
- **Prices.** Not published anywhere; `llms.txt` tells assistants to route price
  questions to the enquiry form rather than guess.

## The founding year

`FOUNDING_YEAR` in `src/lib/seo.ts` is **1960**, on the owner's word (Sept
2026). It was briefly recorded as 1890, which sat badly with the rest of the
material — the founders **Ramesh Prasad and Kusum Devi** are still part of the
business and the story is a three-generation one. 1960 reconciles those.

If it ever changes again, change it in `FOUNDING_YEAR` — every structured-data
surface reads from there — and then fix the prose where the year is written out
by hand: `public/llms.txt` (the blockquote), the about-page metadata
description, the about hero chip and opening paragraph, the timeline's first
entry, the footer, and the home hero chip. The "years supplying" stat on the
about page and the home hero carousel is a derived figure — update it too.

## The RT admin host is excluded on purpose

**`https://store.salroid.me` is the only public host for this business.** The RT
admin at the `RT_BASE` host is internal and must never be surfaced: it does not
appear in `robots.ts`, `sitemap.ts`, `llms.txt`, the JSON-LD, or any canonical
or OG URL, and it must stay that way. If you add structured data, check that no
field embeds an admin-host URL — `IMAGES_BASE` in
`src/components/catalogue/types.ts` points at the admin, so any product `image`
field built from catalogue data would leak it. Omit the field instead.

---

## When the business details change

Work outward from `src/lib/seo.ts`:

1. **Phone, email, address** live in `src/lib/site-content.ts` and `seo.ts`
   imports them — change them once, there. The address is also spelled out in
   `llms.txt` and in the contact-page metadata description; update both.
2. **Coordinates** are in `GEO` in `seo.ts` and repeated in `llms.txt`. They
   must keep matching the map embed on `/contact`.
3. **Opening hours** are in `OPENING_HOURS` in `seo.ts`, and written out in
   `llms.txt` and the contact metadata.
4. **Product lines** are in `PRODUCT_LINES` in `seo.ts` (which drives the
   `OfferCatalog`) and listed in `llms.txt`. Keep them in step with
   `CATEGORIES` in `src/components/home/Categories.tsx`.
5. **A new route** needs an entry in `src/app/sitemap.ts`, a line under
   "Pages" in `llms.txt`, and its own `metadata` export with a canonical.
6. **A new claim of any kind** — certification, award, customer count, a
   territory — goes in the table above with its source, or it does not go in.

## Still to do

- **A proper OG image.** `public/img/og/` is empty, so the OG and Twitter cards
  currently reuse `/img/hero/shopfront.jpg` and `/img/hero/godown.jpg`. Those
  are real photographs and they work, but they are 1200 × 1600 portrait, and
  social cards want **1200 × 630** landscape — they will be centre-cropped. Use
  the **`rt-media`** skill to generate `public/img/og/default.jpg` at 1200 × 630,
  then point the `openGraph.images` and `twitter.images` entries in
  `src/app/layout.tsx` at it.
- **Google Business Profile.** Structured data helps, but for a local trade
  supplier a verified profile with the same name, address, phone and hours does
  more. Keep it byte-identical to the facts above.
- **`sameAs`.** The JSON-LD has no `sameAs` because there are no confirmed
  social or directory profiles. Once there are — a Business Profile, IndiaMART,
  a Facebook page — add them to the business node in `seo.ts`; they are how a
  search engine corroborates the record.
