"use client";
import Link from "next/link";
import { Icons } from "./icons";
import { SiMastodon } from "@icons-pack/react-simple-icons";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="mx-auto max-w-screen-md px-4 md:px-8 flex flex-col items-start justify-between gap-6 pb-[100px] sm:flex-row sm:items-center sm:gap-4">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Mutual Links
        </p>
        <Link href="https://nakasyou.how" target="_blank">
          <div className="bg-white hover:bg-slate-100 rounded w-11 h-11 flex items-center justify-center">
            <Image
              src="/mutual_links/nakasyou.png"
              alt="Nakasyou"
              width={128}
              height={128}
              className="w-7 h-7"
            />
          </div>
        </Link>
      </div>
      <div>
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
