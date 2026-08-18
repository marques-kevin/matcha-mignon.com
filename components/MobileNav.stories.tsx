import type { Decorator, Meta, StoryObj } from "@storybook/nextjs-vite";
import { MobileNav } from "./MobileNav";

const chrome: Decorator = (Story) => (
  <div className="relative min-h-64 border-b border-border/60 bg-canvas/80 backdrop-blur-sm">
    <div className="flex justify-end px-6 py-4">
      <Story />
    </div>
  </div>
);

const meta: Meta<typeof MobileNav> = {
  title: "Chrome/MobileNav",
  component: MobileNav,
  tags: ["autodocs"],
  decorators: [chrome],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    obfuscated: false,
  },
  globals: {
    viewport: { value: "390px-844px" },
  },
};

export default meta;
type Story = StoryObj<typeof MobileNav>;

export const Closed: Story = {
  args: {
    defaultOpen: false,
  },
};

export const Open: Story = {
  args: {
    defaultOpen: true,
  },
};
