This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Blog System

This project uses file-based Markdown blog posts.

- Posts directory: `content/blog`
- List page: `/blog`
- Detail page: `/blog/[slug]`

Each post file must include frontmatter (`coverImage` and `coverAlt` are optional):

```md
---
title: "Post title"
description: "Short summary"
date: "2026-03-03"
projectId: "tokuly"
coverImage: "/korankei.jpg"
coverAlt: "Cover image description"
---

Markdown content starts here.
```

To connect a project to a post, set `postSlug` in `src/lib/projects.ts`.

## Podcast Feed

This blog supports podcast-style listening.

- Audio file directory: `public/podcast`
- Naming rule: `public/podcast/{slug}.mp3` (example: `public/podcast/tokuly.mp3`)
- In-post player: shown automatically on `/blog/[slug]` when the matching MP3 exists
- RSS feed: `/podcast.xml` (includes only posts with matching MP3 files)
