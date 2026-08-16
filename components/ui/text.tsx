import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";
import { textVariants } from "./variants";

export type TextVariant = keyof typeof textVariants;

type TextProps<T extends ElementType = "p"> = {
  as?: T;
  variant?: TextVariant;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Text<T extends ElementType = "p">({
  as,
  variant = "body",
  className,
  children,
  ...props
}: TextProps<T>) {
  const Component = (as ?? "p") as ElementType;

  return (
    <Component className={cn(textVariants[variant], className)} {...props}>
      {children}
    </Component>
  );
}
