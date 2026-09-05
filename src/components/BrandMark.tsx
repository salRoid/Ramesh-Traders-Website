import Image from "next/image";

/**
 * The brass medallion. The PNGs are already circular with a transparent
 * surround (the source photo's cream paper is masked out at build time), so
 * this drops onto any background. Served at the nearest generated size.
 */
export default function BrandMark({
  size = 96,
  className,
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  const src =
    size <= 96
      ? "/brand/logo-medallion-96.png"
      : size <= 256
        ? "/brand/logo-medallion-256.png"
        : "/brand/logo-medallion-512.png";

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        flex: "none",
        lineHeight: 0,
        filter: "drop-shadow(0 10px 24px rgba(22,26,25,.18))",
      }}
    >
      <Image
        src={src}
        alt="Ramesh Traders — cotton yarn & fishing nets, est. 1960"
        width={size}
        height={size}
        priority={priority}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </span>
  );
}
