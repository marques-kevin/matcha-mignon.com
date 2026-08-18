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

function GuideImage({ block }: { block: ImageBlock }) {
  return (
    <figure>
      {/* Static export: native img, not optimized next/image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={block.src}
        alt={block.alt}
        width={block.width}
        height={block.height}
        loading="lazy"
        decoding="async"
        className="h-auto w-full rounded-lg"
      />
      {block.caption ? <figcaption>{block.caption}</figcaption> : null}
    </figure>
  );
}

export function ContentBlocks({ blocks }: ContentBlocksProps) {
  return (
    <>
      {groupBlocks(blocks).map((group, index) =>
        group.type === "image" ? (
          <GuideImage key={blockKey(group.block, index)} block={group.block} />
        ) : (
          <p key={`paragraph-${index}`}>
            <InlineBlocks blocks={group.blocks} />
          </p>
        )
      )}
    </>
  );
}
