import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { sectionVariants } from "./variants";

export type SectionVariant = keyof typeof sectionVariants;

type SectionProps = ComponentProps<"section"> & {
  variant?: SectionVariant;
};

export function Section({
  variant = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionVariants[variant], className)} {...props}>
      {children}
    </section>
  );
}
