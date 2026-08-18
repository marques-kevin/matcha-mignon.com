import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductCard } from "./ProductCard";
import { products } from "@/lib/content/products";

const meta: Meta<typeof ProductCard> = {
  title: "Catalog/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  args: {
    product: products[0],
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Ceremonie: Story = {
  args: {
    product: products[0],
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const Culinaire: Story = {
  args: {
    product: products[1],
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const Latte: Story = {
  args: {
    product: products[2],
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const Listing: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  ),
};
