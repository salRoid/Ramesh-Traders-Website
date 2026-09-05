import Link from "next/link";

export default function SectionHead({
  title,
  linkText,
  linkHref,
}: {
  title: string;
  linkText?: string;
  linkHref?: string;
}) {
  return (
    <div className="f-section-head">
      <h2 className="f-section-head-title">{title}</h2>
      {linkText && linkHref && (
        <Link href={linkHref} className="f-section-head-link">
          {linkText}
        </Link>
      )}
    </div>
  );
}
