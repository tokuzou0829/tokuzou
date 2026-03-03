import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

type ProjectListItemProps = {
  project: Project;
  detailHref?: string;
};

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

          {detailHref ? (
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <Link
                href={detailHref}
                className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700"
              >
                詳細ブログを読む
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}
