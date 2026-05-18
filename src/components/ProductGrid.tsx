"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const IMAGES_BASE = "https://biz.salroid.me";

interface ImageSlot {
  slot_name: string;
  slot_key: string;
  aspect_ratio: string | null;
  order: number;
}

interface TemplateField {
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
  taxonomy: { name: string } | null;
  group: { name: string } | null;
  catalogue_template: {
    image_slots: ImageSlot[];
    fields: TemplateField[];
  } | null;
  field_values: Record<string, { en: string; hi?: string }>;
}

function imageUrl(item: CatalogueItem, slotKey: string) {
  return `${IMAGES_BASE}/uploads/catalogue/${item.id}/${slotKey}.jpg`;
}

function Avatar({ item }: { item: CatalogueItem }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center text-4xl font-bold text-white select-none"
      style={{ backgroundColor: item.avatar_color ?? "#0d3b66" }}
    >
      {item.avatar_initials ?? item.item_name.slice(0, 2).toUpperCase()}
    </div>
  );
}

// ── Product Card ─────────────────────────────────────────────
function ProductCard({ item, onClick }: { item: CatalogueItem; onClick: () => void }) {
  const slots = item.catalogue_template?.image_slots ?? [];
  const spoolSlot = slots.find((s) => s.slot_key === "spool") ?? slots[slots.length - 1];
  const [imgError, setImgError] = useState(false);
  const { add, items } = useCart();
  const inCart = items.some((i) => i.id === item.id);

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    add({ id: item.id, item_name: item.item_name, price: item.price, price_unit: item.price_unit, avatar_color: item.avatar_color, avatar_initials: item.avatar_initials });
  }

  return (
    <motion.div
      layoutId={`card-${item.id}`}
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      {/* Thumbnail — spool image */}
      <motion.div layoutId={`img-${item.id}`} className="relative aspect-square bg-gray-50 overflow-hidden">
        {spoolSlot && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl(item, spoolSlot.slot_key)}
            alt={item.item_name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <Avatar item={item} />
        )}
        {item.taxonomy && (
          <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-[#0d3b66] shadow-sm">
            {item.taxonomy.name}
          </span>
        )}
      </motion.div>

      {/* Info */}
      <motion.div layoutId={`info-${item.id}`} className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-[#0d3b66] text-base leading-tight mb-3">{item.item_name}</h3>
        <div className="mt-auto space-y-2">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Price</p>
            <p className="text-lg font-bold text-[#0d3b66]">
              ₹{Number(item.price).toLocaleString("en-IN")}
              <span className="text-xs font-normal text-gray-500 ml-1">/ {item.price_unit}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                inCart
                  ? "bg-green-100 text-green-700"
                  : "bg-[#0d3b66] text-white hover:bg-[#1b6ca8]"
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {inCart ? "Added" : "Add to Order"}
            </button>
            <span className="flex items-center text-xs text-[#0d3b66]/50 font-medium border border-[#0d3b66]/15 px-2.5 rounded-xl">
              View →
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Expanded Detail ──────────────────────────────────────────
function ProductDetail({ item, onClose }: { item: CatalogueItem; onClose: () => void }) {
  const { add, items } = useCart();
  const inCart = items.some((i) => i.id === item.id);
  const slots = item.catalogue_template?.image_slots ?? [];
  const fields = item.catalogue_template?.fields ?? [];
  const [activeSlot, setActiveSlot] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const markError = (key: string) => setImgErrors((e) => ({ ...e, [key]: true }));

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          layoutId={`card-${item.id}`}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto pointer-events-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Images column */}
            <div className="p-6 flex flex-col gap-3">
              {/* Main image */}
              <motion.div layoutId={`img-${item.id}`} className="relative aspect-square rounded-2xl bg-gray-100 overflow-hidden">
                {slots.length > 0 && !imgErrors[slots[activeSlot]?.slot_key] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl(item, slots[activeSlot].slot_key)}
                    alt={slots[activeSlot].slot_name}
                    className="w-full h-full object-cover"
                    onError={() => markError(slots[activeSlot].slot_key)}
                  />
                ) : (
                  <Avatar item={item} />
                )}
              </motion.div>

              {/* Thumbnails row */}
              {slots.length > 1 && (
                <div className="flex gap-2">
                  {slots.map((slot, idx) => (
                    <button
                      key={slot.slot_key}
                      onClick={() => setActiveSlot(idx)}
                      className={`relative flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                        activeSlot === idx ? "border-[#0d3b66]" : "border-transparent"
                      }`}
                    >
                      {!imgErrors[slot.slot_key] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imageUrl(item, slot.slot_key)}
                          alt={slot.slot_name}
                          className="w-full h-full object-cover"
                          onError={() => markError(slot.slot_key)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                          {slot.slot_name[0]}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details column */}
            <motion.div layoutId={`info-${item.id}`} className="p-6 flex flex-col">
              {item.taxonomy && (
                <span className="self-start text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0d3b66]/10 text-[#0d3b66] mb-3">
                  {item.taxonomy.name}
                </span>
              )}
              <h2 className="text-2xl font-bold text-[#0d3b66] leading-tight mb-5">{item.item_name}</h2>

              {/* Field values */}
              {fields.length > 0 && (
                <div className="space-y-2.5 mb-6">
                  {fields.map((field) => {
                    const val = item.field_values[field.field_name];
                    if (!val?.en) return null;
                    return (
                      <div key={field.field_name} className="flex items-start gap-2.5 text-sm">
                        {field.icon && <span className="text-lg leading-none shrink-0 mt-0.5">{field.icon}</span>}
                        <span className="text-gray-500 shrink-0 w-24">{field.field_label}</span>
                        <span className="text-[#0d3b66] font-semibold">{val.en}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Price */}
              <div className="mt-auto pt-5 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Price</p>
                <p className="text-3xl font-bold text-[#0d3b66]">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                  <span className="text-base font-normal text-gray-500 ml-2">/ {item.price_unit}</span>
                </p>
                <button
                  onClick={() => {
                    add({ id: item.id, item_name: item.item_name, price: item.price, price_unit: item.price_unit, avatar_color: item.avatar_color, avatar_initials: item.avatar_initials });
                    onClose();
                  }}
                  className={`mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                    inCart ? "bg-green-600 text-white hover:bg-green-700" : "bg-[#0d3b66] text-white hover:bg-[#1b6ca8]"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {inCart ? "Added to Order" : "Add to Order"}
                </button>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#0d3b66]/20 text-[#0d3b66] font-semibold hover:bg-[#0d3b66]/5 transition-colors"
                >
                  Enquire Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

// ── Product Grid (exported) ──────────────────────────────────
export default function ProductGrid({ items }: { items: CatalogueItem[] }) {
  const [selected, setSelected] = useState<CatalogueItem | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <ProductCard key={item.id} item={item} onClick={() => setSelected(item)} />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ProductDetail item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
