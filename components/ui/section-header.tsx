import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TextLink } from "./text-link";
import { Text } from "./text";
import { Title } from "./title";

type SectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  href?: string;
  linkLabel?: string;
  className?: string;
  titleAs?: "h2" | "h3";
  titleVariant?: "h2" | "h3";
};

export function SectionHeader({
  title,
  description,
  href,
  linkLabel = "Voir tout →",
  className,
  titleAs = "h2",
  titleVariant = "h2",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4",
        className,
      )}
    >
      <div>
        <Title as={titleAs} variant={titleVariant}>
          {href ? <TextLink href={href}>{title}</TextLink> : title}
        </Title>
        {description && (
          <Text variant="muted" className="mt-1">
            {description}
          </Text>
        )}
      </div>
      {href && (
        <TextLink href={href} variant="action" className="shrink-0">
          {linkLabel}
        </TextLink>
      )}
    </div>
  );
}
