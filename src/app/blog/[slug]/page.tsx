import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogPodcastPlayer from "@/components/blog-podcast-player";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: BlogPostPageProps): Promise<Metadata> {
  const params = await props.params;
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Blog | Tokuzou",
    };
  }

  return {
    title: `${post.title} | Blog | Tokuzou`,
    description: post.description,
  };
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const params = await props.params;
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-screen-md px-4 py-16 md:px-8">
        <div className="mb-6">
          <Link
            href="/blog"
            className="text-sm font-medium text-gray-700 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-700"
          >
            前に戻る
          </Link>
        </div>

        <header className="mb-10 text-center">
          {post.coverImage ? (
            <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={post.coverImage}
                alt={post.coverAlt ?? `${post.title} cover image`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          ) : null}
          <time className="text-xs text-slate-500" dateTime={post.date}>
            {post.date}
          </time>
          <h1 className="mt-2 text-4xl font-bold">{post.title}</h1>
          <p className="mt-2 text-gray-600">{post.description}</p>
        </header>

        {post.audio ? (
          <section className="mb-8 flex justify-center">
            <BlogPodcastPlayer
              src={post.audio.src}
              mimeType={post.audio.mimeType}
              title={post.title}
            />
          </section>
        ) : null}

        <article
          className="blog-content text-slate-700"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </main>
  );
}
