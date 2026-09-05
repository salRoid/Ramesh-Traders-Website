"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { ENQUIRY_NUMBER } from "@/lib/site-content";

export default function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    product: "",
    message: "",
  });

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const lines = ["🙏 *New Enquiry — Ramesh Traders*", "─────────────────────"];
    lines.push(`👤 *Name:* ${form.name}`);
    if (form.company) lines.push(`🏢 *Company:* ${form.company}`);
    if (form.email) lines.push(`📧 *Email:* ${form.email}`);
    if (form.product) lines.push(`📦 *Product interest:* _${form.product}_`);
    if (form.message) {
      lines.push("─────────────────────");
      lines.push(`💬 *Message:*\n${form.message}`);
    }
    lines.push("─────────────────────");
    lines.push("_Sent via store.salroid.me_");

    window.open(
      `https://wa.me/${ENQUIRY_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank"
    );
    setSent(true);
  }

  if (sent) {
    return (
      <div className="f-empty">
        <CheckCircle2 className="w-10 h-10" style={{ color: "var(--ap)" }} />
        <h3 className="f-h2">WhatsApp opened</h3>
        <p className="f-sub" style={{ maxWidth: "36ch" }}>
          Your enquiry has been pre-filled in WhatsApp — just hit send.
        </p>
        <button
          className="f-btn soft"
          onClick={() => {
            setSent(false);
            setForm({ name: "", email: "", company: "", product: "", message: "" });
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <>
      <p className="f-eyebrow" style={{ marginBottom: 10 }}>
        Enquiry
      </p>
      <h2 className="f-h1" style={{ fontSize: 24, marginBottom: 18 }}>
        Send us a message
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}
        >
          <input
            className="f-input"
            placeholder="Your name *"
            required
            value={form.name}
            onChange={update("name")}
            aria-label="Your name"
          />
          <input
            className="f-input"
            type="email"
            placeholder="your@email.com *"
            required
            value={form.email}
            onChange={update("email")}
            aria-label="Your email"
          />
        </div>
        <input
          className="f-input"
          placeholder="Company (optional)"
          value={form.company}
          onChange={update("company")}
          aria-label="Company"
        />
        <select
          className="f-select"
          value={form.product}
          onChange={update("product")}
          aria-label="Product interest"
        >
          <option value="">Product interest</option>
          <option>Thread Yarn</option>
          <option>Fishing Nets</option>
          <option>Marine Equipment</option>
          <option>Custom Order</option>
          <option>Other</option>
        </select>
        <textarea
          className="f-textarea"
          rows={5}
          required
          placeholder="Tell us about your requirements, quantities, or any questions…"
          value={form.message}
          onChange={update("message")}
          aria-label="Message"
        />
        <button type="submit" className="f-btn primary self-start">
          <Send className="w-4 h-4" /> Send message
        </button>
      </form>
    </>
  );
}
