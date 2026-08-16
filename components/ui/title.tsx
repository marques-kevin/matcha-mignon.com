import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";
import { titleVariants } from "./variants";

export type TitleLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TitleVariant = keyof typeof titleVariants;

type TitleProps<T extends ElementType = TitleLevel> = {
  as?: T;
  variant?: TitleVariant;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Title<T extends ElementType = TitleLevel>({
  as,
  variant,
  className,
  children,
  ...props
}: TitleProps<T>) {
  const Component = (as ?? "h2") as ElementType;
  const resolvedVariant = variant ?? as ?? "h2";

  return (
    <Component
      className={cn(titleVariants[resolvedVariant as TitleVariant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
