import Image from "next/image";
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
    <Card className="group overflow-hidden">
      <Link href={`/produits/${product.slug}`} className="block">
        <div className="relative -mx-6 -mt-6 aspect-square bg-subtle">
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={1200}
            height={1200}
            className="h-full w-full object-cover"
          />
          <Badge className="absolute left-4 top-4">
            {gradeLabels[product.grade]}
          </Badge>
        </div>
        <Title as="h2" variant="card" className="mt-6">
          {product.title}
        </Title>
        <Text variant="small" className="mt-2">
          {product.description}
        </Text>
        <Text variant="price" className="mt-4">
          {product.price}
        </Text>
      </Link>
    </Card>
  );
}
