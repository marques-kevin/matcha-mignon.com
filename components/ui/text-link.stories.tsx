import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextLink } from "./text-link";
import { linkVariants } from "./variants";

const meta: Meta<typeof TextLink> = {
  title: "UI/TextLink",
  component: TextLink,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(linkVariants),
    },
  },
  args: {
    href: "/guide",
    children: "Tous les guides",
  },
};

export default meta;
type Story = StoryObj<typeof TextLink>;

export const Default: Story = {
  args: { variant: "default" },
};

export const Nav: Story = {
  args: { variant: "nav", children: "Guides" },
};

export const Action: Story = {
  args: { variant: "action", children: "Voir tout →" },
};

export const Footer: Story = {
  args: { variant: "footer", children: "Qu'est-ce que le matcha ?" },
  globals: {
    backgrounds: { value: "inverse" },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <TextLink href="/guide" variant="default">
        Default
      </TextLink>
      <TextLink href="/guide" variant="muted">
        Muted
      </TextLink>
      <TextLink href="/guide" variant="nav">
        Nav
      </TextLink>
      <TextLink href="/guide" variant="breadcrumb">
        Breadcrumb
      </TextLink>
      <TextLink href="/guide" variant="related">
        Related
      </TextLink>
      <TextLink href="/guide" variant="action">
        Action →
      </TextLink>
    </div>
  ),
};
