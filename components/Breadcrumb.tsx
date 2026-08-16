import { TextLink } from "@/components/ui";
import type { BreadcrumbItem } from "@/lib/site";

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <TextLink href="/" variant="breadcrumb">
            Accueil
          </TextLink>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span className="text-sm text-matcha-600" aria-hidden="true">
              /
            </span>
            {item.href ? (
              <TextLink href={item.href} variant="breadcrumb">
                {item.label}
              </TextLink>
            ) : (
              <span
                className="text-sm font-medium text-matcha-900"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
