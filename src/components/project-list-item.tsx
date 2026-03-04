import Image from "next/image";
import Link from "next/link";
import { Github, Globe } from "lucide-react";
import type { Project } from "@/lib/projects";

type ProjectListItemProps = {
  project: Project;
  detailHref?: string;
};

const detailLinkClassName =
  "font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700";

const externalIconLinkClassName =
  "inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:text-slate-900";

const formatPeriod = (period?: Project["period"]) => {
  if (!period) {
    return null;
  }

  if (period.kind === "ongoing") {
    return `${period.from}~`;
  }

  if (period.kind === "completed") {
    return `${period.from}-${period.to}`;
  }

  return period.year;
};

export default function ProjectListItem({
  project,
  detailHref,
}: ProjectListItemProps) {
  const periodLabel = formatPeriod(project.period);
  const hasActionLink = Boolean(detailHref || project.githubUrl || project.siteUrl);
  const layoutClass = project.image
    ? "md:flex-row-reverse md:justify-between"
    : "md:flex-row";

  return (
    <li className="py-5">
      <div className={`flex flex-col gap-4 md:items-start ${layoutClass}`}>
        {project.image ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-slate-200 bg-slate-100 md:w-44 md:flex-none">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 176px"
            />
          </div>
        ) : null}

        <div className="min-w-0 md:flex-1">
          <h3 className="break-words text-xl font-semibold text-slate-900">
            {project.title}
          </h3>
          <p className="mt-1 break-words text-sm leading-6 text-slate-600">
            {project.description}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
            <span>{project.tags.join(" / ")}</span>
            {periodLabel ? (
              <>
                <span className="text-slate-300">|</span>
                <span>{periodLabel}</span>
              </>
            ) : null}
          </div>

          {hasActionLink ? (
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={externalIconLinkClassName}
                  aria-label="GitHubを開く"
                  title="GitHub"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
              {project.siteUrl ? (
                <a
                  href={project.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={externalIconLinkClassName}
                  aria-label="サイトを開く"
                  title="サイト"
                >
                  <Globe className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
              {detailHref ? (
                <Link href={detailHref} className={detailLinkClassName}>
                  詳細ブログを読む
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}
