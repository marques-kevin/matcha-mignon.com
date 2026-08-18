import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Text } from "./text";
import { textVariants } from "./variants";

const meta: Meta<typeof Text> = {
  title: "UI/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(textVariants),
    },
  },
  args: {
    children:
      "Guides et produits pour comprendre, préparer et savourer le matcha.",
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Body: Story = {
  args: { variant: "body" },
};

export const Lead: Story = {
  args: { variant: "lead" },
};

export const Muted: Story = {
  args: { variant: "muted" },
};

export const Eyebrow: Story = {
  args: { variant: "eyebrow", children: "Thé vert japonais" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-3 text-left">
      <Text variant="eyebrow">Eyebrow</Text>
      <Text variant="lead">Lead — introduction d’une page.</Text>
      <Text variant="body">Body — paragraphe courant.</Text>
      <Text variant="small">Small — description secondaire.</Text>
      <Text variant="muted">Muted — texte d’accompagnement.</Text>
      <Text variant="caption">Caption — méta courte.</Text>
      <Text variant="label">Label</Text>
      <Text variant="price">24 €</Text>
    </div>
  ),
};
