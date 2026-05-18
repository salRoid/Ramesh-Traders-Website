"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartButton() {
  const { items, openCart } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <button
      onClick={openCart}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#0d3b66] text-white shadow-xl flex items-center justify-center hover:bg-[#1b6ca8] transition-colors"
    >
      <ShoppingCart className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-[#0d3b66] text-xs font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

export function CartDrawer() {
  const { items, remove, setQty, clear, isOpen, closeCart, total } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [transport, setTransport] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit() {
    if (!name.trim() || items.length === 0) return;

    const lines = [
      `🛒 *New Order — Ramesh Traders*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `👤 *Customer Details*`,
      `*Name:* ${name}`,
      `*Mobile:* ${phone}`,
      ...(address ? [`*Address:* ${address}`] : []),
      ...(transport ? [`*Transport:* ${transport}`] : []),
      ...(note ? [`*Note:* ${note}`] : []),
      ``,
      `📦 *Order Items*`,
      `─────────────────────`,
      ...items.map(
        (i, idx) => `${idx + 1}. *${i.item_name}*\n   Qty: ${i.quantity} × ₹${Number(i.price).toLocaleString("en-IN")} / ${i.price_unit}`
      ),
      `─────────────────────`,
      `💰 *Estimated Total: ₹${total.toLocaleString("en-IN")}*`,
      ``,
      `_Sent via Ramesh Traders website_`,
    ];

    window.open(`https://wa.me/918092771093?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
    clear();
    setName(""); setPhone(""); setAddress(""); setTransport(""); setNote("");
    closeCart();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#0d3b66]" />
                <h2 className="font-bold text-[#0d3b66] text-lg">Your Order</h2>
                {items.length > 0 && (
                  <span className="text-xs bg-[#0d3b66] text-white px-2 py-0.5 rounded-full font-semibold">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button onClick={closeCart} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center gap-3">
                  <ShoppingCart className="w-10 h-10 text-gray-200" />
                  <p className="text-gray-400 text-sm">No items yet — browse our products and add to order</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ backgroundColor: item.avatar_color ?? "#0d3b66" }}
                    >
                      {item.avatar_initials ?? item.item_name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#0d3b66] text-sm truncate">{item.item_name}</p>
                      <p className="text-xs text-gray-400">₹{Number(item.price).toLocaleString("en-IN")} / {item.price_unit}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => setQty(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold text-[#0d3b66]">{item.quantity}</span>
                      <button onClick={() => setQty(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button onClick={() => remove(item.id)} className="ml-1 text-gray-300 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 pb-6 pt-4 border-t border-gray-100 space-y-3 shrink-0">
                <div className="flex justify-between text-sm font-semibold text-[#0d3b66]">
                  <span>Estimated Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <input
                  placeholder="Your name *"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30 focus:border-[#0d3b66]"
                />
                <input
                  placeholder="Mobile number *"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30 focus:border-[#0d3b66]"
                />
                <textarea
                  placeholder="Delivery address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30 focus:border-[#0d3b66] resize-none"
                />
                <input
                  placeholder="Transport preference (e.g. bus, train, courier)"
                  value={transport}
                  onChange={e => setTransport(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30 focus:border-[#0d3b66]"
                />
                <textarea
                  placeholder="Additional notes (optional)"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30 focus:border-[#0d3b66] resize-none"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!name.trim() || !phone.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm disabled:opacity-50 hover:bg-[#1ebe57] transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
