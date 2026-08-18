import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Header } from "./Header";

const mobileViewport = {
  viewport: { value: "390px-844px" },
};

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

export const MobileClosed: Story = {
  name: "Mobile (closed)",
  globals: mobileViewport,
};

export const MobileOpen: Story = {
  name: "Mobile (open)",
  args: {
    defaultMobileNavOpen: true,
  },
  globals: mobileViewport,
};
