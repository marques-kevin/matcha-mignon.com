import { MobileNav } from "@/components/MobileNav";
import { NavLinks } from "@/components/NavLinks";
import { Container, Logo } from "@/components/ui";

type HeaderProps = {
  obfuscated?: boolean;
  defaultMobileNavOpen?: boolean;
};

export function Header({
  obfuscated = true,
  defaultMobileNavOpen = false,
}: HeaderProps) {
  return (
    <header className="relative border-b border-border/60 bg-canvas/80 backdrop-blur-sm">
      <Container className="flex items-center justify-between gap-4 py-4">
        <Logo className="shrink-0 whitespace-nowrap" />
        <NavLinks obfuscated={obfuscated} />
        <MobileNav
          obfuscated={obfuscated}
          defaultOpen={defaultMobileNavOpen}
        />
      </Container>
    </header>
  );
}
