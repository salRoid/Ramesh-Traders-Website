"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ItemImage } from "@/components/catalogue/ProductCard";
import {
  priceUnitLabel,
  rupees,
  hasPrice,
  enquiryLink,
  type CatalogueItem,
} from "@/components/catalogue/types";

export default function ProductDetail({
  item,
  onClose,
}: {
  item: CatalogueItem;
  onClose: () => void;
}) {
  const { add, items } = useCart();
  const inCart = items.find((i) => i.id === item.id);
  const slots = item.catalogue_template?.image_slots ?? [];
  const fields = item.catalogue_template?.fields ?? [];
  const [activeSlot, setActiveSlot] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prefer the template's declared field order, falling back to whatever the
  // API returned when an item has no template attached.
  const rows = fields.length
    ? fields
        .filter((f) => item.field_values?.[f.field_name]?.en)
        .map((f) => ({
          label: f.field_label,
          icon: f.icon,
          value: item.field_values[f.field_name].en,
        }))
    : Object.entries(item.field_values ?? {})
        .filter(([, v]) => v?.en)
        .map(([key, v]) => ({
          label: key.replace(/_/g, " "),
          icon: null,
          value: v.en,
        }));

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[80]"
        style={{
          background: "rgba(22,26,25,.45)",
          backdropFilter: "blur(3px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          layoutId={`card-${item.id}`}
          role="dialog"
          aria-modal="true"
          aria-label={item.item_name}
          className="f-sheet pointer-events-auto w-full"
          style={{ padding: 0, maxWidth: 760, maxHeight: "88vh", overflowY: "auto" }}
        >
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}
          >
            <div className="flex flex-col" style={{ padding: 20, gap: 10 }}>
              <motion.div
                layoutId={`img-${item.id}`}
                style={{
                  aspectRatio: "1/1",
                  borderRadius: "var(--r-lg)",
                  overflow: "hidden",
                }}
              >
                <ItemImage
                  item={item}
                  slotKey={slots[activeSlot]?.slot_key}
                  style={{ width: "100%", height: "100%" }}
                />
              </motion.div>

              {slots.length > 1 && (
                <div className="flex gap-2">
                  {slots.map((slot, idx) => (
                    <button
                      key={slot.slot_key}
                      onClick={() => setActiveSlot(idx)}
                      aria-label={slot.slot_name}
                      style={{
                        flex: 1,
                        aspectRatio: "1/1",
                        borderRadius: "var(--r-sm)",
                        overflow: "hidden",
                        cursor: "pointer",
                        padding: 0,
                        background: "none",
                        border:
                          activeSlot === idx
                            ? "2px solid var(--ap)"
                            : "2px solid transparent",
                      }}
                    >
                      <ItemImage
                        item={item}
                        slotKey={slot.slot_key}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col" style={{ padding: "20px 24px 24px" }}>
              <div className="flex items-start justify-between gap-3" style={{ marginBottom: 12 }}>
                {item.taxonomy ? (
                  <span className="f-chip accent">{item.taxonomy.name}</span>
                ) : (
                  <span />
                )}
                <button
                  onClick={onClose}
                  className="f-btn ghost f-icon-btn"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h2 className="f-h1" style={{ fontSize: 24, marginBottom: 6 }}>
                {item.item_name}
              </h2>
              <p className="f-meta" style={{ marginBottom: 18 }}>
                {item.item_code}
              </p>

              {rows.length > 0 && (
                <div
                  className="f-tile grid"
                  style={{
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px 18px",
                    marginBottom: 20,
                  }}
                >
                  {rows.map((row) => (
                    <div key={row.label}>
                      <p className="f-eyebrow" style={{ marginBottom: 2 }}>
                        {row.icon ? `${row.icon} ` : ""}
                        {row.label}
                      </p>
                      <p className="f-num" style={{ fontSize: 14, margin: 0 }}>
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 18,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <p className="f-eyebrow" style={{ marginBottom: 2 }}>
                  Price
                </p>
                {hasPrice(item) ? (
                  <p className="f-num" style={{ fontSize: 30, margin: "0 0 16px" }}>
                    {rupees(item.price)}
                    <span
                      style={{
                        fontFamily: "var(--sans)",
                        fontWeight: 500,
                        fontSize: 14,
                        color: "var(--sub)",
                      }}
                    >
                      {priceUnitLabel(item)}
                    </span>
                  </p>
                ) : (
                  <p
                    className="f-num"
                    style={{ fontSize: 20, margin: "0 0 6px", color: "var(--sub)" }}
                  >
                    On enquiry
                  </p>
                )}
                {!hasPrice(item) && (
                  <p className="f-small" style={{ margin: "0 0 16px", maxWidth: "34ch" }}>
                    This line is not rate-carded. Send us the quantity you need
                    and we will quote within 24 hours.
                  </p>
                )}
                <div className="flex flex-col gap-2">
                  {hasPrice(item) && (
                  <button
                    onClick={() => {
                      add({
                        id: item.id,
                        item_name: item.item_name,
                        price: item.price,
                        price_unit: item.price_unit,
                        avatar_color: item.avatar_color,
                        avatar_initials: item.avatar_initials,
                      });
                      // add() opens the order drawer — step out of its way.
                      onClose();
                    }}
                    className="f-btn primary"
                  >
                    {inCart ? `Added to order · ${inCart.quantity}` : "Add to order"}
                  </button>
                  )}
                  <a
                    href={enquiryLink(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`f-btn ${hasPrice(item) ? "soft" : "primary"}`}
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
