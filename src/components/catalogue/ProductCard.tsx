"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  imageUrl,
  initials,
  priceUnitLabel,
  rupees,
  hasPrice,
  hasPhoto,
  imagePosition,
  enquiryLink,
  type CatalogueItem,
} from "@/components/catalogue/types";

export function ItemImage({
  item,
  slotKey,
  className,
  style,
}: {
  item: CatalogueItem;
  slotKey?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  const slots = item.catalogue_template?.image_slots ?? [];
  // An item can now carry photos without having a catalogue template at all,
  // so fall through to a nominal slot key — imageUrl() resolves it to the
  // item's primary photograph when nothing is assigned to that slot.
  const key =
    slotKey ??
    (slots.find((s) => s.slot_key === "spool") ?? slots[slots.length - 1])
      ?.slot_key ??
    (hasPhoto(item) ? "spool" : undefined);

  if (!key || failed) {
    return (
      <div
        className={`f-slot ${className ?? ""}`}
        style={style}
        aria-label={item.item_name}
      >
        <span
          style={{
            fontFamily: "var(--display)",
            fontWeight: 800,
            fontSize: 30,
            color: item.avatar_color ?? "var(--ap)",
          }}
        >
          {initials(item)}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageUrl(item, key)}
      alt={item.item_name}
      className={`object-cover ${className ?? ""}`}
      style={{ objectPosition: imagePosition(item, key), ...style }}
      onError={() => setFailed(true)}
    />
  );
}

export default function ProductCard({
  item,
  onOpen,
  showDetails = true,
}: {
  item: CatalogueItem;
  onOpen?: () => void;
  showDetails?: boolean;
}) {
  const { add, items } = useCart();
  const inCart = items.find((i) => i.id === item.id);
  const priced = hasPrice(item);

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    add({
      id: item.id,
      item_name: item.item_name,
      price: item.price,
      price_unit: item.price_unit,
      avatar_color: item.avatar_color,
      avatar_initials: item.avatar_initials,
    });
  }

  return (
    <motion.div
      layoutId={`card-${item.id}`}
      className="f-card flex flex-col h-full"
      style={{ padding: 0, overflow: "hidden" }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        layoutId={`img-${item.id}`}
        onClick={onOpen}
        style={{
          aspectRatio: "1/1",
          position: "relative",
          cursor: onOpen ? "pointer" : undefined,
          overflow: "hidden",
        }}
      >
        <ItemImage
          item={item}
          className="w-full h-full"
          style={{ width: "100%", height: "100%" }}
        />
        {item.taxonomy && (
          <span
            className="f-chip"
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "var(--panel)",
              boxShadow: "var(--shadow)",
            }}
          >
            {item.taxonomy.name}
          </span>
        )}
      </motion.div>

      <div className="flex flex-col flex-1" style={{ padding: 16, gap: 4 }}>
        <p className="f-h3" style={{ lineHeight: 1.25 }}>
          {item.item_name}
        </p>
        <p className="f-meta">
          {item.item_code}
          {item.field_values?.type?.en ? ` · ${item.field_values.type.en}` : ""}
        </p>

        <div style={{ marginTop: "auto", paddingTop: 14 }}>
          <p className="f-eyebrow" style={{ marginBottom: 2 }}>
            Price
          </p>
          {priced ? (
            <p className="f-num" style={{ fontSize: 19, margin: "0 0 12px" }}>
              {rupees(item.price)}
              <span
                style={{
                  fontFamily: "var(--sans)",
                  fontWeight: 500,
                  fontSize: 12,
                  color: "var(--sub)",
                }}
              >
                {priceUnitLabel(item)}
              </span>
            </p>
          ) : (
            <p
              className="f-num"
              style={{ fontSize: 15, margin: "0 0 12px", color: "var(--sub)" }}
            >
              On enquiry
            </p>
          )}
          <div className="flex gap-2">
            {priced ? (
            <button
              onClick={handleAdd}
              className={`f-btn ${inCart ? "soft" : "primary"}`}
              style={{ flex: 1 }}
            >
              {inCart ? `Added · ${inCart.quantity}` : "Add to order"}
            </button>
            ) : (
              <a
                href={enquiryLink(item)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="f-btn primary"
                style={{ flex: 1 }}
              >
                Enquire
              </a>
            )}
            {showDetails && onOpen && (
              <button onClick={onOpen} className="f-btn ghost">
                Details
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
