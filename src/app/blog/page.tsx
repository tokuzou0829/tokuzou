import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Tokuzou",
  description: "プロジェクトの詳細や開発記録をまとめたブログ一覧です。",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-screen-md px-4 py-16 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-3">
          <div>
            <h1 className="mb-2 text-4xl font-bold">Blog</h1>
            <p className="text-gray-600">雑に書きたいことを書いてます〜</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/podcast.xml"
              className="text-sm font-medium text-gray-700 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-700"
            >
              Podcast RSS
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-700"
            >
              ホームに戻る
            </Link>
          </div>
        </div>

        <ul className="divide-y divide-slate-200">
          {posts.map((post) => (
            <li key={post.slug} className="py-5">
              <article>
                <time className="text-xs text-slate-500" dateTime={post.date}>
                  {post.date}
                </time>
                <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {post.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
