import { TextLink } from "@/components/ui";
import { isImageBlock } from "@/lib/content/blocks";
import type { ContentBlock, ImageBlock } from "@/lib/content/types";

type ContentBlocksProps = {
  blocks: ContentBlock[];
};

type InlineBlock = Exclude<ContentBlock, ImageBlock>;

type BlockGroup =
  | { type: "paragraph"; blocks: InlineBlock[] }
  | { type: "image"; block: ImageBlock };

function blockKey(block: ContentBlock, index: number): string {
  if (block.type === "text") {
    return `text-${index}-${block.value.slice(0, 24)}`;
  }

  if (block.type === "link") {
    return `link-${index}-${block.href}`;
  }

  return `image-${index}-${block.src}`;
}

function groupBlocks(blocks: ContentBlock[]): BlockGroup[] {
  const groups: BlockGroup[] = [];

  for (const block of blocks) {
    if (isImageBlock(block)) {
      groups.push({ type: "image", block });
      continue;
    }

    const last = groups.at(-1);
    if (last?.type === "paragraph") {
      last.blocks.push(block);
    } else {
      groups.push({ type: "paragraph", blocks: [block] });
    }
  }

  return groups;
}

function InlineBlocks({ blocks }: { blocks: InlineBlock[] }) {
  return (
    <>
      {blocks.map((block, index) =>
        block.type === "text" ? (
          <span key={blockKey(block, index)}>{block.value}</span>
        ) : (
          <TextLink key={blockKey(block, index)} href={block.href}>
            {block.label}
          </TextLink>
        )
      )}
    </>
  );
}

type GuideFigureImage = Pick<
  ImageBlock,
  "src" | "alt" | "width" | "height" | "caption"
>;

type GuideFigureProps = {
  image: GuideFigureImage;
  loading?: "eager" | "lazy";
};

export function GuideFigure({ image, loading = "lazy" }: GuideFigureProps) {
  return (
    <figure>
      {/* Static export: native img, not optimized next/image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={loading}
        decoding="async"
        className="h-auto w-full rounded-lg"
      />
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
}

export function ContentBlocks({ blocks }: ContentBlocksProps) {
  return (
    <>
      {groupBlocks(blocks).map((group, index) =>
        group.type === "image" ? (
          <GuideFigure key={blockKey(group.block, index)} image={group.block} />
        ) : (
          <p key={`paragraph-${index}`}>
            <InlineBlocks blocks={group.blocks} />
          </p>
        )
      )}
    </>
  );
}
