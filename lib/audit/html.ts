export function decodeHtml(text: string): string {
  return text
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function getMetaContent(
  html: string,
  options: { name?: string; property?: string }
): string | null {
  const attr = options.name
    ? `name=["']${options.name}["']`
    : `property=["']${options.property}["']`;

  const patterns = [
    new RegExp(`<meta[^>]*${attr}[^>]*content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*${attr}`, "i"),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decodeHtml(match[1]);
  }

  return null;
}

export function getLinkHref(html: string, rel: string): string | null {
  const patterns = [
    new RegExp(`<link[^>]*rel=["']${rel}["'][^>]*href=["']([^"']*)["']`, "i"),
    new RegExp(`<link[^>]*href=["']([^"']*)["'][^>]*rel=["']${rel}["']`, "i"),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return match[1];
  }

  return null;
}

export function getTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? decodeHtml(match[1].trim()) : null;
}

export function getHtmlLang(html: string): string | null {
  const match = html.match(/<html[^>]*\blang=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

export function countTags(html: string, tag: string): number {
  return (html.match(new RegExp(`<${tag}[\\s>]`, "gi")) ?? []).length;
}

export function extractJsonLd(html: string): Record<string, unknown>[] {
  const scripts = [
    ...html.matchAll(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ),
  ];

  return scripts.map((match) => {
    try {
      return JSON.parse(match[1]) as Record<string, unknown>;
    } catch {
      return { parseError: true, raw: match[1].slice(0, 100) };
    }
  });
}

export function fileToRoute(filePath: string, outDir: string): string {
  const relative = filePath
    .replace(outDir, "")
    .replace(/^[/\\]/, "")
    .replace(/\\/g, "/");

  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) {
    return `/${relative.slice(0, -"/index.html".length)}`;
  }
  if (relative.endsWith(".html")) {
    return `/${relative.slice(0, -".html".length)}`;
  }

  return `/${relative}`;
}
