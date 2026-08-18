import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Lire les guides",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Voir les produits",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "En savoir plus",
  },
};

export const AsLink: Story = {
  args: {
    variant: "primary",
    href: "/guide",
    children: "Lire les guides",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">Primaire</Button>
      <Button variant="secondary">Secondaire</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};
