"use client";
import Link from "next/link";
import { Icons } from "./icons";
import { Plus } from "lucide-react";
import { SiMastodon } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import { mutualLinks } from "../../mutual_links/links";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { link } from "fs";

export default function Footer() {
  return (
    <div className="mx-auto max-w-screen-md px-4 md:px-8 flex flex-col items-start justify-between gap-6 pb-[100px] sm:flex-row sm:gap-4">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Mutual Links
        </p>
        <TooltipProvider>
          <div className="flex flex-wrap justify-start gap-2">
            {mutualLinks.map((link, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link href={link.url} target="_blank">
                    <div className="bg-white hover:bg-slate-100 rounded w-11 h-11 flex items-center justify-center">
                      {link.image ? (
                        <Image
                          src={link.image}
                          alt={link.name}
                          width={128}
                          height={128}
                          className="w-7 h-7"
                        />
                      ) : (
                        <span className="text-2xl font-medium text-slate-700">
                          {link.name.slice(0, 1)}
                        </span>
                      )}
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  {link.name} | {link.author}
                </TooltipContent>
              </Tooltip>
            ))}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="https://github.com/tokuzou0829/tokuzou/tree/main/mutual_links/"
                  target="_blank"
                >
                  <div className="bg-white hover:bg-slate-100 rounded w-11 h-11 flex items-center justify-center">
                    <Plus />
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                相互になってくれる方はこちらから！
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
      <div className="flex-shrink-0">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Social Links
        </p>
        <div className="flex flex-wrap justify-start gap-y-2 sm:justify-end">
          <Link
            href="https://personal.tokuzou.me"
            target="_blank"
            className="mr-2"
          >
            <div className="bg-white hover:bg-slate-100 rounded w-11 h-11 flex items-center justify-center">
              <Image
                src="/tokuzou-personal.png"
                alt="Tokuzou-personal"
                width={128}
                height={128}
                className="w-7 h-7"
              />
            </div>
          </Link>
          <Link
            href="https://numatter.vercel.app/users/03hBmnhOhlPyN0zOpCX2Ao0V0D3gHdAg"
            target="_blank"
            className="mr-2"
          >
            <div className="bg-white hover:bg-slate-100 rounded w-11 h-11 flex items-center justify-center">
              <span className="text-2xl">N</span>
            </div>
          </Link>
          <Link
            href="https://instagram.com/tokuzou0829"
            target="_blank"
            className="mr-2"
          >
            <div className="bg-white hover:bg-slate-100 rounded w-11 h-11 flex items-center justify-center">
              <Icons.instagram />
            </div>
          </Link>
          <Link
            href="https://twitter.com/tokuchan0829"
            target="_blank"
            className="mr-2"
          >
            <div className="bg-white hover:bg-slate-100 rounded w-11 h-11 flex items-center justify-center">
              <Icons.x />
            </div>
          </Link>
          <Link
            href="https://fedi.yutakobayashi.com/@tkz"
            rel="me"
            target="_blank"
            className="mr-2"
          >
            <div className="bg-white hover:bg-slate-100 rounded w-11 h-11 flex items-center justify-center">
              <SiMastodon />
            </div>
          </Link>
          <Link
            href="https://github.com/tokuzou0829"
            target="_blank"
            className="mr-2"
          >
            <div className="bg-white hover:bg-slate-100 rounded w-11 h-11 flex items-center justify-center">
              <Icons.gitHub />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
