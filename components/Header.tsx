import { NavLinks } from "@/components/NavLinks";
import { Container, Logo } from "@/components/ui";

type HeaderProps = {
  obfuscated?: boolean;
};

export function Header({ obfuscated = true }: HeaderProps) {
  return (
    <header className="border-b border-border/60 bg-canvas/80 backdrop-blur-sm">
      <Container className="flex items-center justify-between py-4">
        <Logo />
        <NavLinks obfuscated={obfuscated} />
      </Container>
    </header>
  );
}
