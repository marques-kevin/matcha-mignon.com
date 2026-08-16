import Link from "next/link";
import { Badge, Card, Text, Title } from "@/components/ui";
import type { Product } from "@/lib/content/products";

const gradeLabels: Record<Product["grade"], string> = {
  cérémonie: "Cérémonie",
  culinaire: "Culinaire",
  latte: "Latte",
};

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group">
      <Link href={`/produits/${product.slug}`}>
        <Badge>{gradeLabels[product.grade]}</Badge>
        <Title as="h2" variant="card" className="mt-3">
          {product.title}
        </Title>
        <Text variant="small" className="mt-2">
          {product.description}
        </Text>
        <Text variant="label" className="mt-4 font-semibold text-matcha-800">
          {product.price}
        </Text>
      </Link>
    </Card>
  );
}
