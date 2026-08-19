import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GuideCard } from "./GuideCard";
import { guides } from "@/lib/content/guides";

const meta: Meta<typeof GuideCard> = {
  title: "Catalog/GuideCard",
  component: GuideCard,
  tags: ["autodocs"],
  args: {
    guide: guides[0],
  },
};

export default meta;
type Story = StoryObj<typeof GuideCard>;

const cardDecorator: Story["decorators"] = [
  (Story) => (
    <div className="w-80">
      <Story />
    </div>
  ),
];

export const Default: Story = {
  decorators: cardDecorator,
};

export const Culinary: Story = {
  args: {
    guide: guides.find((guide) => guide.slug === "recettes-matcha-cuisine") ?? guides[1],
  },
  decorators: cardDecorator,
};

export const Listing: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide) => (
        <GuideCard key={guide.slug} guide={guide} />
      ))}
    </div>
  ),
};
