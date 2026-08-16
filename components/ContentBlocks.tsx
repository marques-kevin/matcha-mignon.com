import { TextLink } from "@/components/ui";
import type { ContentBlock } from "@/lib/content/types";

type ContentBlocksProps = {
  blocks: ContentBlock[];
};

function blockKey(block: ContentBlock, index: number): string {
  if (block.type === "text") {
    return `text-${index}-${block.value.slice(0, 24)}`;
  }

  return `link-${index}-${block.href}`;
}

export function ContentBlocks({ blocks }: ContentBlocksProps) {
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
