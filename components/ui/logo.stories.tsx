import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./logo";

const meta: Meta<typeof Logo> = {
  title: "UI/Logo",
  component: Logo,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {};

export const MarkOnly: Story = {
  args: {
    showWordmark: false,
  },
};

export const WordmarkOnly: Story = {
  args: {
    showMark: false,
  },
};

export const Inverse: Story = {
  args: {
    showMark: false,
    linked: false,
    tone: "inverse",
  },
  globals: {
    backgrounds: { value: "inverse" },
  },
};
