// Product photography lives on the RT backend but is always addressed
// SAME-ORIGIN, so the admin host (biz.salroid.me) never appears in a public
// page. nginx maps /uploads/ to the backend in production; next.config.ts
// rewrites it in development.
import { ENQUIRY_NUMBER, waLink } from "@/lib/site-content";

export const IMAGES_BASE = "";

export interface ImageSlot {
  slot_name: string;
  slot_key: string;
  aspect_ratio: string | null;
  order: number;
}

export interface TemplateField {
  field_name: string;
  field_label: string;
  icon: string | null;
  order: number;
}

export interface CatalogueItem {
  id: number;
  item_name: string;
  item_code: string;
  price: string;
  price_unit: string;
  unit: string;
  avatar_color: string | null;
  avatar_initials: string | null;
  /** Merchandised "Best sellers" order set in the RT admin; null = not featured. */
  featured_rank?: number | null;
  taxonomy: { name: string } | null;
  group: { name: string } | null;
  catalogue_template: {
    image_slots: ImageSlot[];
    fields: TemplateField[];
  } | null;
  field_values: Record<string, { en: string; hi?: string }>;
  /** Every photo on the item, primary first. */
  images?: { id: number; url: string; alt: string | null; is_primary: boolean }[];
  /** slot_key -> resolved photo URL, assigned in the Catalogue Designer. */
  image_slots?: Record<string, string>;
  /** slot_key -> CSS object-position, from how the photo was framed there. */
  image_slot_positions?: Record<string, string>;
}

/**
 * Photos now belong to the item (`ItemImage`) and are placed into template
 * slots in the RT admin, so a slot assignment is the truth. The two fallbacks
 * below exist because that migration is only as complete as the owner has made
 * it: an item with photos but no slot assignment still shows its primary shot,
 * and anything predating the move still resolves from the old per-slot path.
 */
export function imageUrl(item: CatalogueItem, slotKey: string) {
  const assigned = item.image_slots?.[slotKey];
  if (assigned) return `${IMAGES_BASE}${assigned}`;

  const fallback =
    item.images?.find((i) => i.is_primary) ?? item.images?.[0];
  if (fallback) return `${IMAGES_BASE}${fallback.url}`;

  return `${IMAGES_BASE}/uploads/catalogue/${item.id}/${slotKey}.jpg`;
}

/**
 * How the owner framed this slot's photo in the Catalogue Designer. Only
 * meaningful for a slot that actually has an assignment — a fallback photo was
 * never positioned, so it stays centred.
 */
export function imagePosition(item: CatalogueItem, slotKey: string) {
  if (!item.image_slots?.[slotKey]) return "center";
  return item.image_slot_positions?.[slotKey] ?? "center";
}

/** True when the item has any photograph at all, however it is stored. */
export function hasPhoto(item: CatalogueItem) {
  if (item.image_slots && Object.keys(item.image_slots).length) return true;
  if (item.images?.length) return true;
  return (item.catalogue_template?.image_slots?.length ?? 0) > 0;
}

/**
 * Some items are stocked but not rate-carded — seasonal lines, custom work, or
 * anything the owner has not priced yet. They must never show "₹0": the card
 * asks for an enquiry instead of an add-to-order, so the cart total stays
 * honest and the buyer still has a way through.
 */
export function hasPrice(item: { price: string | number | null }) {
  return Number(item.price ?? 0) > 0;
}

export function enquiryLink(item: { item_name: string; item_code: string }) {
  return waLink(
    ENQUIRY_NUMBER,
    `Hello Ramesh Traders — I would like a price for *${item.item_name}* (${item.item_code}).`
  );
}

export function rupees(value: string | number) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

/**
 * "/ kg" suffix, or an empty string when the item has no price unit — plenty of
 * items carry a price with no unit, which otherwise renders a dangling "₹13 /".
 */
export function priceUnitLabel(item: { price_unit?: string | null; unit?: string | null }) {
  const u = (item.price_unit ?? item.unit ?? "").trim();
  return u ? ` / ${u}` : "";
}

export function initials(item: CatalogueItem) {
  return item.avatar_initials ?? item.item_name.slice(0, 2).toUpperCase();
}
