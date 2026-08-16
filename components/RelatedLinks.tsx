import { Card, TextLink, Title } from "@/components/ui";
import { List } from "@/components/ui/list";

type RelatedLinksProps = {
  title: string;
  links: { href: string; label: string }[];
};

export function RelatedLinks({ title, links }: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <Card as="aside" variant="muted">
      <Title as="h2" variant="h6">
        {title}
      </Title>
      <List className="mt-3">
        {links.map((link) => (
          <li key={link.href}>
            <TextLink href={link.href} variant="related">
              → {link.label}
            </TextLink>
          </li>
        ))}
      </List>
    </Card>
  );
}
