import { promises as fs } from "node:fs";
import path from "node:path";
import rehypeShiki from "@shikijs/rehype";
import matter from "gray-matter";
import { remark } from "remark";
import directive from "remark-directive";
import gfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

const blogDirectory = path.join(process.cwd(), "content", "blog");
const podcastDirectory = path.join(process.cwd(), "public", "podcast");
const podcastMimeType = "audio/mpeg";
const shikiThemes = {
  light: "light-plus",
  dark: "dark-plus",
};

type DirectiveData = {
  hName?: string;
  hProperties?: Record<string, unknown>;
};

type ContainerDirectiveNode = {
  type: string;
  name?: string;
  data?: DirectiveData;
};

type MarkdownTree = {
  type: string;
  children?: unknown[];
};

const remarkNoteDirective = () => {
  return (tree: unknown) => {
    visit(tree as MarkdownTree, (node: unknown) => {
      const directiveNode = node as ContainerDirectiveNode;

      if (
        directiveNode.type !== "containerDirective" ||
        directiveNode.name !== "note"
      ) {
        return;
      }

      directiveNode.data = {
        ...(directiveNode.data ?? {}),
        hName: "aside",
        hProperties: {
          ...(directiveNode.data?.hProperties ?? {}),
          className: ["blog-note"],
          role: "note",
        },
      };
    });
  };
};

type Frontmatter = {
  title?: string;
  description?: string;
  date?: string;
  projectId?: string;
  coverImage?: string;
  coverAlt?: string;
};

export type BlogPostAudio = {
  src: string;
  mimeType: string;
  byteLength: number;
};

export type BlogPostSummary = {
  slug: string;
  title: string;
  description: string;
  date: string;
  projectId?: string;
  coverImage?: string;
  coverAlt?: string;
  audio?: BlogPostAudio;
};

export type BlogPost = BlogPostSummary & {
  contentHtml: string;
};

const isValidSlug = (slug: string) => /^[a-z0-9-]+$/i.test(slug);

const buildSummary = (slug: string, data: Frontmatter): BlogPostSummary | null => {
  if (!data.title || !data.description || !data.date) {
    return null;
  }

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    ...(data.projectId ? { projectId: data.projectId } : {}),
    ...(data.coverImage ? { coverImage: data.coverImage } : {}),
    ...(data.coverAlt ? { coverAlt: data.coverAlt } : {}),
  };
};

const getMarkdownFilePath = (slug: string) =>
  path.join(blogDirectory, `${slug}.md`);

const getPodcastFilePath = (slug: string) =>
  path.join(podcastDirectory, `${slug}.mp3`);

const getPodcastAudioBySlug = async (
  slug: string
): Promise<BlogPostAudio | undefined> => {
  try {
    const fileStat = await fs.stat(getPodcastFilePath(slug));

    if (!fileStat.isFile()) {
      return undefined;
    }

    return {
      src: `/podcast/${slug}.mp3`,
      mimeType: podcastMimeType,
      byteLength: fileStat.size,
    };
  } catch {
    return undefined;
  }
};

export async function getAllBlogPosts(): Promise<BlogPostSummary[]> {
  let entries: string[] = [];

  try {
    entries = await fs.readdir(blogDirectory);
  } catch {
    return [];
  }

  const posts = await Promise.all(
    entries
      .filter((entry) => entry.endsWith(".md"))
      .map(async (entry): Promise<BlogPostSummary | null> => {
        const slug = entry.replace(/\.md$/, "");
        const post = await getBlogPostBySlug(slug);

        if (!post) {
          return null;
        }

        return {
          slug: post.slug,
          title: post.title,
          description: post.description,
          date: post.date,
          ...(post.projectId ? { projectId: post.projectId } : {}),
          ...(post.coverImage ? { coverImage: post.coverImage } : {}),
          ...(post.coverAlt ? { coverAlt: post.coverAlt } : {}),
          ...(post.audio ? { audio: post.audio } : {}),
        };
      })
  );

  return posts
    .filter((post): post is BlogPostSummary => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isValidSlug(slug)) {
    return null;
  }

  let rawMarkdown = "";

  try {
    rawMarkdown = await fs.readFile(getMarkdownFilePath(slug), "utf8");
  } catch {
    return null;
  }

  const { data, content } = matter(rawMarkdown);
  const summary = buildSummary(slug, data as Frontmatter);

  if (!summary) {
    return null;
  }

  const [processedContent, audio] = await Promise.all([
    remark()
      .use(gfm)
      .use(directive)
      .use(remarkNoteDirective)
      .use(remarkRehype)
      .use(rehypeShiki, { themes: shikiThemes })
      .use(rehypeStringify)
      .process(content),
    getPodcastAudioBySlug(slug),
  ]);

  return {
    ...summary,
    ...(audio ? { audio } : {}),
    contentHtml: processedContent.toString(),
  };
}
