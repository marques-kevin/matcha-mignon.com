import { FooterLinks } from "@/components/FooterLinks";
import { ObfuscatableLink } from "@/components/ObfuscatableLink";
import { Container, Logo, Text } from "@/components/ui";
import { siteConfig } from "@/lib/site";

type FooterProps = {
  obfuscated?: boolean;
};

export function Footer({ obfuscated = true }: FooterProps) {
  return (
    <footer className="border-t border-border/60 bg-inverse text-on-inverse">
      <Container className="grid gap-10 py-12 sm:grid-cols-2">
        <div>
          <Logo linked={false} showMark={false} tone="inverse" />
          <Text variant="muted" className="mt-2 text-on-inverse-muted">
            {siteConfig.tagline}
          </Text>
        </div>
        <FooterLinks obfuscated={obfuscated} />
      </Container>
      <div className="border-t border-inverse-border">
        <Container className="py-4 text-center text-sm text-on-inverse-muted">
          <ObfuscatableLink
            path="/annuaire"
            variant="footer"
            obfuscated={obfuscated}
          >
            Annuaire du site
          </ObfuscatableLink>
          <span className="mx-2">·</span>
          <Text as="span" variant="caption" className="text-on-inverse-muted">
            © {new Date().getFullYear()} {siteConfig.name}. Tous droits
            réservés.
          </Text>
        </Container>
      </div>
    </footer>
  );
}
