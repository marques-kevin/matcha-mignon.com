import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Chrome/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    obfuscated: false,
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};
