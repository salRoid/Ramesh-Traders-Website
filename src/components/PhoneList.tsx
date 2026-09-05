import WhatsAppIcon from "@/components/WhatsAppIcon";
import { PHONES, waLink } from "@/lib/site-content";

const toWa = (display: string) => `91${display.replace(/\D/g, "").slice(-10)}`;

/**
 * Phone numbers, with WhatsApp gathered into one compact row of icons beneath
 * rather than a glyph repeated on every line — three numbers with three
 * matching icons stacked beside them read as clutter.
 */
export default function PhoneList({
  size = 14,
  className,
  iconsOnly = false,
}: {
  size?: number;
  className?: string;
  /** Footer and other tight spots: show just the WhatsApp icons. */
  iconsOnly?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      {!iconsOnly && (
        <div className="flex flex-col gap-0.5">
          {PHONES.map((p) => (
            <a key={p} href={`tel:${p.replace(/\s/g, "")}`} style={{ fontSize: size }}>
              {p}
            </a>
          ))}
        </div>
      )}

      <div className="flex items-center gap-1.5">
        {PHONES.map((p) => (
          <a
            key={p}
            href={waLink(toWa(p))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${p}`}
            title={`WhatsApp ${p}`}
            className="flex items-center justify-center flex-none"
            style={{
              width: 26,
              height: 26,
              borderRadius: 999,
              background: "var(--ap-soft)",
              color: "var(--ap)",
            }}
          >
            <WhatsAppIcon className="w-[15px] h-[15px]" />
          </a>
        ))}
      </div>
    </div>
  );
}
