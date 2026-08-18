import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Chrome/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    obfuscated: false,
  },
  globals: {
    backgrounds: { value: "inverse" },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
