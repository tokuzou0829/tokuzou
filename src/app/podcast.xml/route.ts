import { getAllBlogPosts } from "@/lib/blog";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");

const toRfc822 = (value: string) => {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return new Date().toUTCString();
  }

  return parsed.toUTCString();
};

type BlogListItem = Awaited<ReturnType<typeof getAllBlogPosts>>[number];
type PodcastListItem = BlogListItem & {
  audio: NonNullable<BlogListItem["audio"]>;
};

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const posts = await getAllBlogPosts();
  const podcastPosts = posts.filter(
    (post): post is PodcastListItem => post.audio !== undefined
  );

  const itemsXml = podcastPosts
    .map((post) => {
      const postUrl = `${origin}/blog/${post.slug}`;
      const audioUrl = `${origin}${post.audio.src}`;

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${toRfc822(post.date)}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <enclosure url="${audioUrl}" length="${post.audio.byteLength}" type="${post.audio.mimeType}" />
    </item>`;
    })
    .join("\n");

  const lastBuildDate =
    podcastPosts.length > 0
      ? toRfc822(podcastPosts[0].date)
      : new Date().toUTCString();

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tokuzou Blog Podcast</title>
    <link>${origin}/blog</link>
    <description>Tokuzouブログの記事を音声で聴けるポッドキャストです。</description>
    <language>ja</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${origin}/podcast.xml" rel="self" type="application/rss+xml" />
${itemsXml ? `${itemsXml}\n` : ""}  </channel>
</rss>
`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=900, stale-while-revalidate=86400",
    },
  });
}
