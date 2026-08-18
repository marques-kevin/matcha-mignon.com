import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Container } from "./container";
import { Section } from "./section";
import { Text } from "./text";
import { Title } from "./title";
import { sectionVariants } from "./variants";

const meta: Meta<typeof Section> = {
  title: "UI/Section",
  component: Section,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(sectionVariants),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Hero: Story = {
  args: {
    variant: "hero",
    children: (
      <Container size="narrow" className="text-center">
        <Text variant="eyebrow">Thé vert japonais</Text>
        <Title as="h1" variant="hero" className="mt-4">
          Découvrez le matcha
        </Title>
        <Text variant="lead" className="mt-6">
          Guides et produits pour comprendre, préparer et savourer le matcha.
        </Text>
      </Container>
    ),
  },
};

export const Content: Story = {
  args: {
    variant: "content",
    children: (
      <Container>
        <Title as="h2" variant="h2">
          Guides
        </Title>
        <Text variant="muted" className="mt-1">
          Tout savoir sur le matcha, de la culture à la tasse.
        </Text>
      </Container>
    ),
  },
};

export const ContentLast: Story = {
  args: {
    variant: "contentLast",
    children: (
      <Container>
        <Title as="h2" variant="h2">
          Nos produits
        </Title>
        <Text variant="muted" className="mt-1">
          Matcha sélectionné directement au Japon.
        </Text>
      </Container>
    ),
  },
};
