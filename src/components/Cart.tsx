"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ORDER_NUMBER } from "@/lib/site-content";

const EASE = [0.4, 0, 0.2, 1] as const;

const rupees = (n: number | string) => `₹${Number(n).toLocaleString("en-IN")}`;
const unitLabel = (u?: string | null) => (u && u.trim() ? ` / ${u.trim()}` : "");

export function CartButton() {
  const { items, openCart, isOpen } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          onClick={openCart}
          className="fixed z-[70] flex items-center justify-center"
          style={{
            bottom: 24,
            right: 24,
            width: 56,
            height: 56,
            border: "none",
            cursor: "pointer",
            borderRadius: "var(--r-pill)",
            background: "linear-gradient(180deg,var(--ap),var(--ap-2))",
            color: "var(--ap-ink)",
            boxShadow: "var(--shadow-h)",
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2, ease: EASE }}
          aria-label="Open your order"
        >
          <ShoppingCart className="w-[22px] h-[22px]" />
          {count > 0 && (
            <span
              className="absolute flex items-center justify-center f-num"
              style={{
                top: -2,
                right: -2,
                minWidth: 22,
                height: 22,
                padding: "0 5px",
                borderRadius: "var(--r-pill)",
                background: "var(--panel)",
                color: "var(--ap)",
                boxShadow: "var(--shadow)",
                fontSize: 12,
              }}
            >
              {count}
            </span>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function CartDrawer() {
  const { items, remove, setQty, clear, isOpen, closeCart, total } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    transport: "",
    note: "",
  });

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const canSubmit = items.length > 0 && form.name.trim() && form.phone.trim();

  function handleSubmit() {
    if (!canSubmit) return;

    const now = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const lines: string[] = [];
    lines.push("🛒 *New Order — Ramesh Traders*");
    lines.push(`_${now}_`);
    lines.push("━━━━━━━━━━━━━━━━━━━━");
    lines.push("");
    lines.push("👤 *Customer Details*");
    lines.push(`• *Name:* ${form.name}`);
    if (form.phone) lines.push(`• *Mobile:* ${form.phone}`);
    if (form.address) lines.push(`• *Address:* ${form.address}`);
    if (form.transport) lines.push(`• *Transport:* _${form.transport}_`);
    if (form.note) lines.push(`• *Note:* _${form.note}_`);
    lines.push("");
    lines.push(
      `📦 *Order Items* _(${items.length} ${items.length === 1 ? "item" : "items"})_`
    );
    lines.push("─────────────────────");
    items.forEach((item, idx) => {
      const subtotal = Number(item.price) * item.quantity;
      lines.push(`*${idx + 1}. ${item.item_name}*`);
      lines.push(
        `   ${item.quantity} × ${rupees(item.price)}${unitLabel(item.price_unit)} = _${rupees(subtotal)}_`
      );
    });
    lines.push("─────────────────────");
    lines.push(`💰 *Total: ${rupees(total)}*`);
    lines.push("");
    lines.push("_Sent via store.salroid.me_");

    window.open(
      `https://wa.me/${ORDER_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank"
    );
    clear();
    setForm({ name: "", phone: "", address: "", transport: "", note: "" });
    closeCart();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[100]"
            style={{ background: "rgba(22,26,25,.45)", backdropFilter: "blur(3px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-[110] flex flex-col"
            style={{
              width: "min(400px,100%)",
              background: "var(--panel)",
              boxShadow: "var(--shadow-h)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
          >
            <div
              className="flex items-center justify-between gap-3"
              style={{ padding: "20px 22px", borderBottom: "1px solid var(--border)" }}
            >
              <div>
                <p className="f-h2">Your order</p>
                <p className="f-meta">
                  {count} item{count === 1 ? "" : "s"} · quote within 24 hrs
                </p>
              </div>
              <button
                onClick={closeCart}
                className="f-btn ghost f-icon-btn"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto flex flex-col gap-3"
              style={{ padding: "16px 22px" }}
            >
              {items.length === 0 ? (
                <div className="f-empty">
                  <ShoppingCart className="w-9 h-9" style={{ color: "var(--faint)" }} />
                  <p className="f-sub">
                    Nothing added yet. Browse the catalogue and add what you need.
                  </p>
                  <button className="f-btn soft" onClick={closeCart}>
                    Browse catalogue
                  </button>
                </div>
              ) : (
                <>
                  <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="f-tile flex items-center gap-2.5"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    >
                      <span
                        className="flex items-center justify-center flex-none f-num"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "var(--r-sm)",
                          background: item.avatar_color ?? "var(--ap-soft)",
                          color: item.avatar_color ? "#fff" : "var(--ap)",
                          fontSize: 13,
                        }}
                      >
                        {item.avatar_initials ??
                          item.item_name.slice(0, 2).toUpperCase()}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className="f-num truncate"
                          style={{ fontSize: 13.5, margin: "0 0 2px" }}
                        >
                          {item.item_name}
                        </p>
                        <p className="f-meta">
                          {rupees(item.price)}
                          {unitLabel(item.price_unit)}
                        </p>
                      </div>
                      <div className="flex items-center flex-none">
                        <button
                          onClick={() => setQty(item.id, item.quantity - 1)}
                          className="f-btn ghost f-icon-btn"
                          style={{ width: 30, height: 30, minHeight: 30 }}
                          aria-label={`Decrease ${item.item_name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span
                          className="f-num text-center"
                          style={{ fontSize: 13.5, minWidth: 20 }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setQty(item.id, item.quantity + 1)}
                          className="f-btn ghost f-icon-btn"
                          style={{ width: 30, height: 30, minHeight: 30 }}
                          aria-label={`Increase ${item.item_name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => remove(item.id)}
                          className="f-btn danger f-icon-btn"
                          style={{ width: 30, height: 30, minHeight: 30 }}
                          aria-label={`Remove ${item.item_name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  </AnimatePresence>

                  <div className="flex flex-col gap-2.5" style={{ marginTop: 6 }}>
                    <p className="f-eyebrow">Your details</p>
                    <input
                      className="f-input"
                      placeholder="Your name *"
                      value={form.name}
                      onChange={update("name")}
                      aria-label="Your name"
                    />
                    <input
                      className="f-input"
                      type="tel"
                      placeholder="Mobile number *"
                      value={form.phone}
                      onChange={update("phone")}
                      aria-label="Mobile number"
                    />
                    <textarea
                      className="f-textarea"
                      rows={2}
                      placeholder="Delivery address"
                      value={form.address}
                      onChange={update("address")}
                      aria-label="Delivery address"
                    />
                    <input
                      className="f-input"
                      placeholder="Transport preference (e.g. bus, train, courier)"
                      value={form.transport}
                      onChange={update("transport")}
                      aria-label="Transport preference"
                    />
                    <textarea
                      className="f-textarea"
                      rows={2}
                      placeholder="Additional notes (optional)"
                      value={form.note}
                      onChange={update("note")}
                      aria-label="Additional notes"
                    />
                  </div>
                </>
              )}
            </div>

            {items.length > 0 && (
              <div
                className="flex flex-col gap-3"
                style={{ padding: "18px 22px", borderTop: "1px solid var(--border)" }}
              >
                <div className="flex justify-between items-baseline">
                  <p className="f-small">Estimated total</p>
                  <p className="f-num" style={{ fontSize: 22, margin: 0 }}>
                    {rupees(total)}
                  </p>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="f-btn primary"
                >
                  Send via WhatsApp
                </button>
                <p className="f-meta text-center">
                  Name and mobile number are required. Final pricing is confirmed
                  by our team before dispatch.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
