"use client";
import Link from "next/link";
import { Icons } from "./icons";
import { SiMastodon } from "@icons-pack/react-simple-icons";

export default function Footer() {
  return (
    <div className="mx-auto max-w-screen-md px-4 md:px-8 flex justify-end pb-[100px]">
      <Link href="https://twitter.com/tokuchan0829" target="_blank">
        <div className="bg-white hover:bg-slate-100 rounded p-[10px] mr-[10px]">
          <Icons.x />
        </div>
      </Link>
      <Link href="https://instagram.com/tokuzou0829" target="_blank">
        <div className="bg-white hover:bg-slate-100 rounded p-[10px] mr-[10px]">
          <Icons.instagram />
        </div>
      </Link>
      <Link href="https://fedi.yutakobayashi.com/@tkz" rel="me" target="_blank">
        <div className="bg-white hover:bg-slate-100 rounded p-[10px] mr-[10px]">
          <SiMastodon />
        </div>
      </Link>
      <Link href="https://github.com/tokuzou0829" target="_blank">
        <div className="bg-white hover:bg-slate-100 rounded p-[10px]">
          <Icons.gitHub />
        </div>
      </Link>
    </div>
  );
}
