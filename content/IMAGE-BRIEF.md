# Ramesh Traders — image brief

Hand this file to whoever (or whatever) is generating images. It covers the
three kinds the site uses. Specs are not suggestions: the site crops with
`object-fit: cover`, so anything off-ratio loses its edges.

---

## House style — applies to all three

Real working shots, not stock gloss. Warm late-afternoon light, shallow depth
of field, honest textures — jute sacks, brass weighing scales, coiled rope,
cotton dust hanging in the light. A 45-year-old family trading house in Patna
City, Bihar, not a glossy catalogue.

**Always:**
- Warm, directional natural light
- Real materials with visible texture and wear
- Shallow depth of field on close work

**Never:**
- Text, logos, watermarks or signage baked into the image
- Recognisable faces
- Studio-white backgrounds, floating products, lens flare, HDR
- Anything implying a certification or award we do not hold

**Colours to stay near:** brass `#D8B978`, deep brass `#8A6A34`, navy `#1B3A5C`,
warm cream paper `#EFF1F0`. Site accent is deep teal `#127A63`.

**Every file:** JPEG, quality 82, **max 300 KB**, lowercase-kebab-case names.

---

## 1. Product photos

Per-item shots of actual stock. These are the only images that are **not**
generated — they should be real photographs of the real product, because a
customer is buying that exact packet.

| | |
|---|---|
| **Where they go** | RT admin → **Utilities → Catalogue Designer** → open the item → upload per slot |
| **Stored at** | `/uploads/catalogue/{itemId}/{slotKey}.jpg` on the backend |
| **Never** | in the website repo |

**Slots** (defined by the item's catalogue template):

| Slot key | Name | Aspect | Pixel size |
|---|---|---|---|
| `front` | Front of packet | **16:9** | 1600 × 900 |
| `back` | Back of packet | **16:9** | 1600 × 900 |
| `spool` | Single spool | **1:1** | 1200 × 1200 |

`spool` is the one the website shows on cards and in the order drawer, so if
only one shot exists, make it that one.

**Before uploading:** the item needs a catalogue template assigned **and
saved** — the image slots only appear after saving. An item with no template
cannot accept an upload.

**If you must generate a placeholder** (not for real SKUs):
```
Product photograph of a cone of {colour} cotton tying thread standing on a
dark wooden turntable, warm rim light from behind, deep shadow background,
label facing camera but unreadable. Square 1:1, no text, no hands.
```

---

## 2. Campaign media

One image or video per promotion — monsoon offers, new arrivals, festive
pushes.

| | |
|---|---|
| **Where it goes** | RT admin → **Utilities → Store → Campaigns** → new/edit campaign → upload |
| **Stored at** | `/uploads/campaigns/` on the backend |
| **Aspect / size** | **16:9** · 1200 × 675 |
| **Video** | MP4, muted autoplay loop, keep under ~8 MB |
| **Never** | in the website repo |

The campaign card is a split layout: copy on the left, this media filling the
right half. **Keep the subject off-centre-right and leave the left third
quiet** — it sits behind nothing, but a busy left edge fights the text block
next to it.

Colour: the admin lets you set an accent per campaign. Any hex is safe — the
site now computes a readable text colour against it automatically.

**Prompt template:**
```
Documentary photograph of {subject} in an Indian wholesale godown / shop in
Patna City. {Season or occasion detail.} Warm working light, honest textures,
shallow depth of field. Landscape 16:9, no text, no faces.
```

**Worked example — monsoon netting** (see `content/campaigns/2026-06-monsoon-nets.md`):
```
Documentary photograph of rolled fishing netting stacked in an Indian
wholesale godown during the monsoon — green and cream nylon mesh on wooden
pallets, daylight through a high window, wet street visible through an open
shutter. Warm working light, honest textures, shallow depth of field.
Landscape 16:9, no text, no faces.
```

---

## 3. Hero images

The rotating panel at the top of the home page. One per slide.

| | |
|---|---|
| **Where they go** | RT admin → **Utilities → Store → Content** → per hero slide → upload |
| **Stored at** | `/uploads/hero/` on the backend |
| **Aspect / size** | **3:4 portrait** · 1200 × 1600 |
| **Repo fallback** | `public/img/hero/{shopfront,godown,nets}.jpg` — used **only** when the admin has no active slides |

**Composition matters here more than anywhere else.** A caption and eyebrow are
overlaid across the bottom on a dark gradient, so:
- Keep the **bottom third simple and darker** — no critical detail there
- Put the subject in the **upper two-thirds**
- Portrait, not landscape — it sits in a tall column beside the headline

**Prompt template:**
```
Photograph of {subject}, Patna City, Bihar, India. {Detail.} Warm
late-afternoon light, shallow depth of field, documentary style. Portrait 3:4,
darker and simpler in the lower third, no text, no faces.
```

**Three worked examples:**

*Shopfront*
```
Photograph of a long-established thread and fishing-net wholesale shop front
in Patna City, Bihar. Rolls of fishing net and stacked cotton yarn cones
visible through the open shutter, hand-painted signboard, weathered concrete
and brass. Warm late-afternoon sunlight, shallow depth of field, documentary
style. Portrait 3:4, darker and simpler in the lower third, no readable text,
no faces.
```

*Godown*
```
Interior of a well-kept Indian wholesale godown stacked floor to ceiling with
cartons of cotton thread cones and rolled fishing netting. Shafts of daylight
through a high window, dust in the air, jute sacks, a brass weighing scale in
the foreground. Warm documentary photography. Portrait 3:4, darker and simpler
in the lower third, no text, no faces.
```

*Nets*
```
Close documentary photograph of hands hand-tying a fishing net, knots and mesh
filling the frame, natural nylon twine in cream and blue, warm side light,
shallow depth of field. Craft and precision. Portrait 3:4, darker and simpler
in the lower third, no faces, no text.
```

---

## 4. Repo images (the ones that are NOT admin-managed)

These live in the website repo and are the only ones to generate as files.
Full prompts are in `content/media-manifest.json`.

| Path | Aspect | Size | Priority |
|---|---|---|---|
| `public/img/category/thread-yarn.jpg` | 16:9 | 800 × 450 | high |
| `public/img/category/fishing-nets.jpg` | 16:9 | 800 × 450 | high |
| `public/img/category/ropes-cordage.jpg` | 16:9 | 800 × 450 | high |
| `public/img/category/hooks-balls.jpg` | 16:9 | 800 × 450 | medium |
| `public/img/category/custom-orders.jpg` | 16:9 | 800 × 450 | medium |
| `public/img/og/default.jpg` | 1.91:1 | 1200 × 630 | high |
| `public/img/about/workshop.jpg` | 4:3 | 1400 × 1050 | low |

**OG image** is the WhatsApp / Facebook link preview — right now links to the
site show no image at all. Leave the **left third empty** for a logo and title
overlay.

**After dropping files in:** run the **`rt-media`** skill. It crops to the exact
aspect, resizes, compresses to the budget, and reports what is still missing.
Each slot lights up on the site automatically once the file exists — no code
change needed.

---

## Checklist before handing images back

- [ ] Exact aspect ratio (the site crops, it does not letterbox)
- [ ] Under 300 KB, JPEG quality 82
- [ ] lowercase-kebab-case filename, no spaces, no `Copy`, no version suffix
- [ ] No text, logos, watermarks or faces in the image
- [ ] Hero only: bottom third quiet and darker
- [ ] Campaign only: left third quiet
- [ ] Product photos are real stock, not generated
