import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Link from "next/link";
import { Card } from "./card";
import { Text } from "./text";
import { Title } from "./title";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "muted", "list"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: "default",
    className: "w-80",
    children: (
      <>
        <Title as="h2" variant="card">
          Préparer le matcha
        </Title>
        <Text variant="small" className="mt-2">
          Les gestes essentiels pour un bol mousseux.
        </Text>
      </>
    ),
  },
};

export const Muted: Story = {
  args: {
    variant: "muted",
    className: "w-80",
    children: (
      <Text variant="body">Carte en fond subtil, pour les blocs calmes.</Text>
    ),
  },
};

export const List: Story = {
  args: {
    variant: "list",
    className: "w-80",
    children: <Text variant="body">Élément de liste compact.</Text>,
  },
};

export const Clickable: Story = {
  render: () => (
    <Card className="group w-80">
      <Link href="/guide/preparer-le-matcha">
        <Title as="h2" variant="card">
          Préparer le matcha
        </Title>
        <Text variant="small" className="mt-2">
          Tabuler jusqu’à la carte pour voir l’anneau :focus-visible.
        </Text>
      </Link>
    </Card>
  ),
};
