"use client";

import { ObfuscatableLink } from "@/components/ObfuscatableLink";
import { Title } from "@/components/ui/title";
import { siteConfig } from "@/lib/site";

const footerLinks = {
  guides: [
    {
      path: "/guide/qu-est-ce-que-le-matcha",
      label: "Qu'est-ce que le matcha ?",
    },
    { path: "/guide/preparer-le-matcha", label: "Préparer le matcha" },
    { path: "/guide/bienfaits-matcha", label: "Bienfaits du matcha" },
  ],
  produits: [
    { path: "/produits/matcha-ceremonie", label: "Matcha Cérémonie" },
    { path: "/produits/matcha-culinaire", label: "Matcha Culinaire" },
    { path: "/produits/matcha-latte", label: "Matcha Latte" },
  ],
};

type FooterLinksProps = {
  obfuscated?: boolean;
};

export function FooterLinks({ obfuscated = true }: FooterLinksProps) {
  return (
    <footer className="border-t border-matcha-200/60 bg-matcha-900 text-matcha-100">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-white">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-matcha-200">{siteConfig.tagline}</p>
        </div>
        <div>
          <Title
            as="h2"
            className="text-sm font-semibold uppercase tracking-wider text-matcha-200"
          >
            Guides
          </Title>
          <ul className="mt-3 space-y-2">
            {footerLinks.guides.map((link) => (
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
        <div>
          <Title
            as="h2"
            className="text-sm font-semibold uppercase tracking-wider text-matcha-200"
          >
            Produits
          </Title>
          <ul className="mt-3 space-y-2">
            {footerLinks.produits.map((link) => (
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
      </div>
      <div className="border-t border-matcha-800 px-6 py-4 text-center text-sm text-matcha-200">
        <ObfuscatableLink
          path="/annuaire"
          variant="footer"
          obfuscated={obfuscated}
        >
          Annuaire du site
        </ObfuscatableLink>
        <span className="mx-2">·</span>
        <span className="text-xs text-matcha-200">
          © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
        </span>
      </div>
    </footer>
  );
}
