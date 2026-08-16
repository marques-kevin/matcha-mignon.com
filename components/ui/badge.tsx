import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";
import { badgeVariants } from "./variants";

type BadgeProps<T extends ElementType = "span"> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentProps<T>, "as" | "children" | "className">;

export function Badge<T extends ElementType = "span">({
  as,
  className,
  children,
  ...props
}: BadgeProps<T>) {
  const Component = (as ?? "span") as ElementType;

  return (
    <Component className={cn(badgeVariants.default, className)} {...props}>
      {children}
    </Component>
  );
}
