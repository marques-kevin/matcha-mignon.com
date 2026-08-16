import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { containerSizes } from "./variants";

export type ContainerSize = keyof typeof containerSizes;

type ContainerProps = ComponentProps<"div"> & {
  size?: ContainerSize;
};

export function Container({
  size = "wide",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-6", containerSizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}

type PageProps = ComponentProps<"main"> & {
  size?: ContainerSize;
};

export function Page({
  size = "narrow",
  className,
  children,
  ...props
}: PageProps) {
  return (
    <main
      className={cn(
        "mx-auto w-full px-6 py-12",
        containerSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}
