import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Cérémonie",
  },
};

export const Grades: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Cérémonie</Badge>
      <Badge>Culinaire</Badge>
      <Badge>Latte</Badge>
    </div>
  ),
};
