import Link from "next/link";
import { Card, Text, Title } from "@/components/ui";
import type { Guide } from "@/lib/content/guides";

type GuideCardProps = {
  guide: Guide;
};

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Card className="group">
      <Link href={`/guide/${guide.slug}`}>
        <Title as="h2" variant="card">
          {guide.title}
        </Title>
        <Text variant="small" className="mt-2">
          {guide.description}
        </Text>
        <Text variant="caption" className="mt-4">
          {guide.readingTime} de lecture
        </Text>
      </Link>
    </Card>
  );
}
