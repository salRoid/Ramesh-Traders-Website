"use client";

import { WHATSAPP } from "@/lib/site-content";
import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { PackageSearch, Search } from "lucide-react";
import ProductCard from "@/components/catalogue/ProductCard";
import ProductDetail from "@/components/catalogue/ProductDetail";
import type { CatalogueItem } from "@/components/catalogue/types";

export default function CatalogueBrowser({ items }: { items: CatalogueItem[] }) {
  const [category, setCategory] = useState("All");
  const [subtype, setSubtype] = useState("All");
  const [query, setQuery] = useState("");
  const [detailId, setDetailId] = useState<number | null>(null);

  const categories = useMemo(() => {
    const names = new Set<string>();
    items.forEach((i) => i.taxonomy?.name && names.add(i.taxonomy.name));
    return ["All", ...Array.from(names)];
  }, [items]);

  // Subtypes are scoped to the chosen category, so the dropdown only ever
  // offers combinations that actually return something.
  const subtypes = useMemo(() => {
    const names = new Set<string>();
    items.forEach((i) => {
      if (category !== "All" && i.taxonomy?.name !== category) return;
      if (i.group?.name) names.add(i.group.name);
    });
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }, [items, category]);

  // A subtype that the new category does not have would filter everything out.
  const activeSubtype = subtypes.includes(subtype) ? subtype : "All";

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (category !== "All" && it.taxonomy?.name !== category) return false;
      if (activeSubtype !== "All" && it.group?.name !== activeSubtype) return false;
      if (!q) return true;
      const type = it.field_values?.type?.en ?? "";
      return (
        it.item_name.toLowerCase().includes(q) ||
        it.item_code.toLowerCase().includes(q) ||
        type.toLowerCase().includes(q)
      );
    });
  }, [items, category, activeSubtype, query]);

  const detail = visible.find((i) => i.id === detailId) ?? null;

  return (
    <LayoutGroup>
      {items.length > 0 && (
      <div
        id="catalogue"
        className="f-glass f-filterbar flex flex-wrap items-center justify-between gap-3"
      >
        <div className="f-seg overflow-x-auto max-w-full">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCategory(c);
                setSubtype("All");
              }}
              className={`f-seg-item relative ${category === c ? "active" : ""}`}
            >
              {category === c && (
                <motion.span
                  layoutId="seg-pill"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--panel)",
                    borderRadius: "var(--r-sm)",
                    boxShadow: "var(--shadow)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span style={{ position: "relative" }}>{c}</span>
            </button>
          ))}
        </div>

        {subtypes.length > 1 && (
          <select
            className="f-select"
            value={activeSubtype}
            onChange={(e) => setSubtype(e.target.value)}
            aria-label="Filter by subtype"
            style={{ width: "auto", minWidth: 150 }}
          >
            <option value="All">All subtypes</option>
            {subtypes.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        )}

        <div
          className="flex items-center gap-2 flex-1"
          style={{ minWidth: 220, maxWidth: 380, position: "relative" }}
        >
          <Search
            className="w-4 h-4 absolute left-3.5 pointer-events-none"
            style={{ color: "var(--faint)" }}
          />
          <input
            className="f-input"
            style={{ paddingLeft: 38 }}
            placeholder="Search items or codes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search the catalogue"
          />
        </div>
      </div>
      )}

      {visible.length > 0 ? (
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill,minmax(clamp(232px,17vw,300px),1fr))",
            gap: "clamp(14px,2vw,20px)",
            marginTop: "clamp(20px,3vw,32px)",
          }}
        >
          {visible.map((item, i) => (
            <div
              key={item.id}
              className="f-rise"
              style={{ animationDelay: `${Math.min(i, 11) * 40}ms` }}
            >
              <ProductCard item={item} onOpen={() => setDetailId(item.id)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="f-card" style={{ marginTop: "clamp(20px,3vw,32px)" }}>
          <div className="f-empty">
            <PackageSearch className="w-9 h-9" style={{ color: "var(--faint)" }} />
            {items.length === 0 ? (
              <>
                <p className="f-h2">Catalogue coming soon</p>
                <p className="f-sub" style={{ maxWidth: "40ch" }}>
                  Our product listing is being updated. Contact us for the
                  latest offerings and current pricing.
                </p>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="f-btn primary"
                >
                  WhatsApp us
                </a>
              </>
            ) : (
              <>
                <p className="f-sub">
                  No items match that search. Contact us for the latest
                  offerings.
                </p>
                <button
                  className="f-btn soft"
                  onClick={() => {
                    setCategory("All");
                    setQuery("");
                  }}
                >
                  Clear filters
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <AnimatePresence>
        {detail && (
          <ProductDetail item={detail} onClose={() => setDetailId(null)} />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
