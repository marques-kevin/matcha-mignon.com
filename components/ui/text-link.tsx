import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { linkVariants } from "./variants";

export type LinkVariant = keyof typeof linkVariants;

type TextLinkProps = ComponentProps<typeof Link> & {
  variant?: LinkVariant;
};

export function TextLink({
  variant = "default",
  className,
  children,
  ...props
}: TextLinkProps) {
  return (
    <Link className={cn(linkVariants[variant], className)} {...props}>
      {children}
    </Link>
  );
}
