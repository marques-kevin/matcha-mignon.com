import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";
import { cardVariants } from "./variants";

export type CardVariant = keyof typeof cardVariants;

type CardProps<T extends ElementType = "article"> = {
  as?: T;
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentProps<T>, "as" | "children" | "className">;

export function Card<T extends ElementType = "article">({
  as,
  variant = "default",
  className,
  children,
  ...props
}: CardProps<T>) {
  const Component = (as ?? "article") as ElementType;

  return (
    <Component className={cn(cardVariants[variant], className)} {...props}>
      {children}
    </Component>
  );
}
