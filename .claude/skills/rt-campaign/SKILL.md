---
name: rt-campaign
description: Plan, write, review and ship a Ramesh Traders campaign — a seasonal offer, new arrival, festive push or bulk-pricing drive — across the site hero, the campaign banner, WhatsApp and the catalogue. Use when the user says campaign, offer, promotion, sale, "new arrival", festive, monsoon stock, or wants to change what the homepage is leading with.
---

# Ramesh Traders — campaigns

A campaign is one offer expressed in several places at once. This skill keeps
those places consistent and gives you a written record of each one.

## Where a campaign shows up

| Surface | Source of truth | Who changes it |
|---|---|---|
| Home + catalogue **campaign card** | `GET /api/public/campaigns` on the RT admin | Admin UI (no deploy) |
| Home **hero slides** | `GET /api/public/hero-slides`, falling back to the built-in slides in `src/components/home/HeroSection.tsx` | Admin UI, else a code change |
| **WhatsApp** broadcast copy | `content/campaigns/<slug>.md` | This skill |
| **Catalogue** pricing / stock | RT admin catalogue | Admin UI |

The website reads the first two at runtime with a 60–300s revalidate, so an
admin change is live within minutes and needs no deploy. Both endpoints fail
soft: if the backend is unreachable the site falls back to its built-in
content rather than rendering an empty hero.

## Running a campaign

### 1. Write the brief

Copy `content/campaigns/_template.md` to `content/campaigns/<slug>.md` and fill
it in. The slug is kebab-case and dated, e.g. `2026-09-monsoon-trawl-netting`.
Everything the campaign needs — the offer, the dates, the copy for each
surface, the image brief — lives in that one file so it can be reviewed before
anything goes live.

### 2. Get the imagery

The brief has an **Imagery** section. If a new photograph is needed, hand the
user the generation prompt from there, then use the **`rt-media`** skill to
crop, compress and place the result. Campaign images land in
`public/img/campaign/<slug>.jpg` when they are shipped with the site, or are
uploaded through the RT admin when the campaign card is admin-driven.

### 3. Publish

- **Campaign card and hero slides:** paste the copy from the brief into the RT
  admin. Do not hand-edit the site for these — that is what the admin is for.
- **Built-in hero fallback:** only edit `HeroSection.tsx` when the campaign
  should survive the backend being down, or when there is no admin record yet.
- **WhatsApp:** the brief's WhatsApp block is ready to send as-is.

### 4. Record the outcome

When the campaign ends, fill in the **Result** section of the brief. Over a few
seasons this becomes the only honest record of what actually worked.

## Writing rules

The voice is a 45-year-old family trading house, not a startup.

- **Concrete over clever.** "8% off on 100 kg+ trawl netting through September"
  beats "Unbeatable monsoon savings!"
- **Always name the terms.** Quantity threshold, dates, whether it is collection
  or dispatch, which mesh sizes. A vague offer generates phone calls, not orders.
- **No fake urgency.** No countdown timers, no "only 3 left", no invented
  scarcity. If stock genuinely runs out, say so plainly.
- **No invented claims.** Do not add certifications, awards, client names or
  export markets that are not already true on the site. If a claim is not in
  `content/media-manifest.json`, the About page or the catalogue, ask before
  using it.
- **Rupees, Indian formatting.** `₹1,450` — not `Rs. 1450` or `INR 1450`.
- **Headline ≤ 60 characters** so it does not wrap awkwardly in the hero.
- **Body 25–45 words.** The campaign card and hero both clamp around there.

## Checklist before shipping

- [ ] Offer terms are unambiguous — quantity, dates, products, collection/dispatch
- [ ] Prices match the live catalogue
- [ ] Headline fits in 60 characters
- [ ] CTA points somewhere that actually exists (`/products`, `/#contact`, a `wa.me` link)
- [ ] Image is placed and within the 300 KB budget (`rt-media`)
- [ ] WhatsApp copy reads correctly on a phone — short lines, no markdown tables
- [ ] Brief committed to `content/campaigns/`
