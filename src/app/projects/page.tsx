import type { Metadata } from "next";
import Link from "next/link";
import ProjectListItem from "@/components/project-list-item";
import { getAllBlogPosts } from "@/lib/blog";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Tokuzou",
  description: "Tokuzouが取り組んでいるプロジェクト一覧ページです。",
};

export default async function ProjectsPage() {
  const posts = await getAllBlogPosts();
  const availablePostSlugs = new Set(posts.map((post) => post.slug));

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-screen-md px-4 py-16 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="mb-2 text-4xl font-bold">Projects</h1>
            <p className="text-gray-600">
              私はこれまでこのようなプロジェクトを行なってきました。
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-700"
          >
            トップへ戻る
          </Link>
        </div>

        <p className="mb-5 text-sm text-gray-500">全{projects.length}件</p>

        <ul className="divide-y divide-slate-200">
          {projects.map((project) => (
            <ProjectListItem
              key={project.id}
              project={project}
              detailHref={
                availablePostSlugs.has(project.postSlug)
                  ? `/blog/${project.postSlug}`
                  : undefined
              }
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
