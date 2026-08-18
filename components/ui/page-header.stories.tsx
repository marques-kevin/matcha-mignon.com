import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageHeader } from "./page-header";

const meta: Meta<typeof PageHeader> = {
  title: "UI/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: "Guides du matcha",
    description:
      "Tout savoir sur le matcha, de la culture à la tasse : préparation, bienfaits et choix.",
  },
};

export const Hero: Story = {
  args: {
    title: "Découvrez le matcha",
    description: "Guides et produits pour comprendre, préparer et savourer le matcha.",
    titleVariant: "hero",
  },
};

export const WithMeta: Story = {
  args: {
    title: "Préparer le matcha",
    description: "Les gestes essentiels pour un bol mousseux, du tamis au chasen.",
    meta: "5 min de lecture",
  },
};
