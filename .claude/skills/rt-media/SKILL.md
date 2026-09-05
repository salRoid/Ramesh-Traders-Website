---
name: rt-media
description: Audit, place and process images for the Ramesh Traders website. Use when the user asks what images are missing, has generated or downloaded images to add, wants a slot filled, or mentions logos, photos, hero images, category images, OG images, or "put this in the right folder".
---

# Ramesh Traders — site imagery

Every image on this site is a **slot** declared in `content/media-manifest.json`.
A slot lights up the moment its file exists on disk — `src/lib/media.ts` checks
for it at render time and falls back to designed artwork otherwise. So adding
an image is: **process it, drop it at the declared path, rebuild.** No code
edit is needed for a declared slot.

## Report what is missing

Read `content/media-manifest.json` and check each `slots[].path`:

```bash
cd <repo root>
python3 - <<'PY'
import json, os
m = json.load(open("content/media-manifest.json"))
for s in m["slots"]:
    have = os.path.exists(s["path"])
    print(("[x]" if have else "[ ]"), s["priority"].ljust(6), s["id"].ljust(24), s["size"].ljust(10), s["path"])
PY
```

Report the missing ones grouped by priority, and for each give the `prompt`
field verbatim so it can be pasted straight into ChatGPT or Gemini. Do not
paraphrase the prompts — they are tuned to keep the photography consistent.

## Place a supplied image

The user will hand you a file (a download, a generated image, a phone photo).

1. **Identify the slot.** Match against `slots[].id` / `usedBy`. If it is
   ambiguous, ask which slot rather than guessing — a wrong crop is worse than
   a question.
2. **Crop to the declared aspect, then resize to the declared size.** Only
   `sips` is available (no ImageMagick). Centre-crop to the target ratio first,
   then scale:

```bash
# landscape 16:9 at 800x450, from any source
W=$(sips -g pixelWidth  "$SRC" | awk 'NR==2{print $2}')
H=$(sips -g pixelHeight "$SRC" | awk 'NR==2{print $2}')
# target ratio as a fraction, e.g. 16/9
CROP_H=$(python3 -c "print(min($H, int($W*9/16)))")
CROP_W=$(python3 -c "print(min($W, int($H*16/9)))")
sips --cropToHeightWidth "$CROP_H" "$CROP_W" "$SRC" --out /tmp/rt-crop.jpg >/dev/null
sips -Z 800 -s format jpeg -s formatOptions 82 /tmp/rt-crop.jpg --out "<slot path>" >/dev/null
```

   `sips --cropToHeightWidth H W` crops from the centre. If the subject is not
   centred, say so and offer to crop off-centre instead of silently clipping it.

3. **Check the weight.** `conventions.maxBytes` is 300 KB. If it is over, drop
   `formatOptions` to 75 and re-check. Never ship a multi-megabyte JPEG.
4. **Verify** with `ls -la` on the path and confirm dimensions with
   `sips -g pixelWidth -g pixelHeight`.
5. **Rebuild** (`npm run build`) so the static pages pick the new file up, and
   tell the user which slot now renders a photo instead of the fallback.

## Adding a brand-new slot

1. Add an entry to `content/media-manifest.json` — `id`, `path`, `usedBy`,
   `aspect`, `size`, `priority`, `prompt`.
2. In the component, resolve it with `media("/img/...")` from `@/lib/media` and
   render a sensible fallback (usually `<NetWeave />`) when it returns `null`.
   Follow `src/components/home/Categories.tsx` as the reference pattern.

## Rules

- **Never** overwrite an existing image without showing the user what is there
  now and getting a yes.
- Keep originals. Full-resolution sources live in `brand-source/`, which is not
  served; only processed derivatives go under `public/`.
- Filenames are lowercase-kebab-case. No spaces, no `Copy`, no version suffixes.
- Product photography comes from the catalogue API (`biz.salroid.me`), **not**
  from this repo. Do not add product shots here.
