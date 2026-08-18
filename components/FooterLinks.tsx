"use client";

import { ObfuscatableLink } from "@/components/ObfuscatableLink";
import { Title } from "@/components/ui/title";

const footerLinks = {
  guides: [
    {
      path: "/guide/qu-est-ce-que-le-matcha",
      label: "Qu'est-ce que le matcha ?",
    },
    { path: "/guide/preparer-le-matcha", label: "Préparer le matcha" },
    { path: "/guide/bienfaits-matcha", label: "Bienfaits du matcha" },
    {
      path: "/guide/comment-choisir-son-matcha",
      label: "Choisir son matcha",
    },
  ],
};

type FooterLinksProps = {
  obfuscated?: boolean;
};

function FooterColumn({
  title,
  links,
  obfuscated,
}: {
  title: string;
  links: { path: string; label: string }[];
  obfuscated: boolean;
}) {
  return (
    <div>
      <Title as="h2" variant="h6" className="text-on-inverse-muted">
        {title}
      </Title>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <ObfuscatableLink
              path={link.path}
              variant="footer"
              obfuscated={obfuscated}
            >
              {link.label}
            </ObfuscatableLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FooterLinks({ obfuscated = true }: FooterLinksProps) {
  return (
    <FooterColumn
      title="Guides"
      links={footerLinks.guides}
      obfuscated={obfuscated}
    />
  );
}
