import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const markClasses =
  "flex h-8 w-8 items-center justify-center rounded-pill bg-brand-hover text-sm font-bold text-on-brand";

const wordmarkClasses = {
  default: "text-lg font-semibold tracking-tight text-fg group-hover:text-brand",
  inverse: "text-lg font-semibold tracking-tight text-on-brand",
} as const;

export type LogoTone = keyof typeof wordmarkClasses;

type LogoProps = {
  className?: string;
  href?: string;
  linked?: boolean;
  showMark?: boolean;
  showWordmark?: boolean;
  tone?: LogoTone;
};

export function Logo({
  className,
  href = "/",
  linked = true,
  showMark = true,
  showWordmark = true,
  tone = "default",
}: LogoProps) {
  const content = (
    <>
      {showMark ? (
        <span className={markClasses} aria-hidden="true">
          抹
        </span>
      ) : null}
      {showWordmark ? (
        <span className={wordmarkClasses[tone]}>{siteConfig.name}</span>
      ) : null}
    </>
  );

  const classes = cn("group flex items-center gap-2", className);
  const label = showWordmark ? undefined : siteConfig.name;

  if (!linked) {
    return (
      <span className={classes} aria-label={label}>
        {content}
      </span>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={label}>
      {content}
    </Link>
  );
}
