import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./text";
import { Title } from "./title";

type PageHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  className?: string;
  titleVariant?: "h1" | "hero";
};

export function PageHeader({
  title,
  description,
  meta,
  className,
  titleVariant = "h1",
}: PageHeaderProps) {
  return (
    <header className={cn(className)}>
      <Title as="h1" variant={titleVariant}>
        {title}
      </Title>
      {description && (
        <Text variant="lead" className="mt-3 max-w-2xl">
          {description}
        </Text>
      )}
      {meta && (
        <Text variant="caption" className="mt-3">
          {meta}
        </Text>
      )}
    </header>
  );
}
