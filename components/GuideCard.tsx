import Image from "next/image";
import Link from "next/link";
import { Card, Text, Title } from "@/components/ui";
import type { Guide } from "@/lib/content/guides";

type GuideCardProps = {
  guide: Guide;
};

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Card className="group overflow-hidden">
      <Link href={`/guide/${guide.slug}`} className="block">
        <div className="relative -mx-6 -mt-6 aspect-[3/2] bg-subtle">
          <Image
            src={guide.cover.src}
            alt={guide.cover.alt}
            width={guide.cover.width}
            height={guide.cover.height}
            className="h-full w-full object-cover"
          />
        </div>
        <Title as="h2" variant="card" className="mt-6">
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
