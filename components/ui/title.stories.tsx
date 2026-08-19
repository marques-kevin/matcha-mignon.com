import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Title } from "./title";
import { titleVariants } from "./variants";

const meta: Meta<typeof Title> = {
  title: "UI/Title",
  component: Title,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "hero, h1–h5 and card use font-display (Shippori Mincho). h6 stays font-sans (Figtree).",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(titleVariants),
    },
  },
  args: {
    children: "Découvrez le matcha",
  },
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Hero: Story = {
  args: { as: "h1", variant: "hero" },
};

export const H1: Story = {
  args: { as: "h1", variant: "h1" },
};

export const H2: Story = {
  args: { as: "h2", variant: "h2" },
};

export const H3: Story = {
  args: { as: "h3", variant: "h3" },
};

export const Card: Story = {
  args: { as: "h2", variant: "card" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-4 text-left">
      <Title as="h1" variant="hero">
        Hero
      </Title>
      <Title as="h1" variant="h1">
        Titre h1
      </Title>
      <Title as="h2" variant="h2">
        Titre h2
      </Title>
      <Title as="h3" variant="h3">
        Titre h3
      </Title>
      <Title as="h4" variant="h4">
        Titre h4
      </Title>
      <Title as="h5" variant="h5">
        Titre h5
      </Title>
      <Title as="h6" variant="h6">
        Titre h6
      </Title>
      <Title as="h2" variant="card">
        Titre de carte
      </Title>
    </div>
  ),
};
