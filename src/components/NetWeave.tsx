/**
 * Decorative woven-net panel used where the mockup called for a photograph.
 * Renders a diamond mesh with a soft accent wash and a couple of drifting
 * floats. Deliberately server-rendered and CSS-animated — this is the largest
 * element in the hero, so it must paint without waiting on hydration.
 */
export default function NetWeave({
  className,
  style,
  density = 7,
  floats = true,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  density?: number;
  floats?: boolean;
  children?: React.ReactNode;
}) {
  const step = 100 / density;
  const strands = Array.from({ length: density * 2 + 1 }, (_, i) => i * step);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(140deg, var(--ap-soft), transparent 55%), var(--panel-2)",
        ...style,
      }}
    >
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="netweave-fade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--ap)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--ap)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <g
          stroke="url(#netweave-fade)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          fill="none"
        >
          {strands.map((offset) => (
            <path key={`a${offset}`} d={`M ${offset - 100} 0 L ${offset} 100`} />
          ))}
          {strands.map((offset) => (
            <path key={`b${offset}`} d={`M ${offset} 0 L ${offset - 100} 100`} />
          ))}
        </g>
      </svg>

      {floats && (
        <>
          <span
            aria-hidden
            className="f-float"
            style={{ ...floatBase, width: 74, height: 74, top: "18%", left: "16%" }}
          />
          <span
            aria-hidden
            className="f-float"
            style={{
              ...floatBase,
              width: 42,
              height: 42,
              bottom: "20%",
              right: "22%",
              animationDelay: "-2.6s",
              animationDuration: "5.5s",
            }}
          />
        </>
      )}

      {children}
    </div>
  );
}

const floatBase: React.CSSProperties = {
  position: "absolute",
  borderRadius: "999px",
  background:
    "radial-gradient(circle at 32% 30%, var(--panel), var(--ap-soft) 70%)",
  boxShadow: "var(--shadow)",
  display: "block",
};
