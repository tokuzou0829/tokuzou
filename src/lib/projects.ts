export type ProjectPeriod =
  | {
      kind: "ongoing";
      from: string;
    }
  | {
      kind: "completed";
      from: string;
      to: string;
    }
  | {
      kind: "single";
      year: string;
    };

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  postSlug: string;
  githubUrl?: string;
  siteUrl?: string;
  featured?: boolean;
  period?: ProjectPeriod;
};

export const projects: Project[] = [
  {
    id: "tokuly",
    title: "Tokuly",
    description:
      "Zenlyの代わりとなる位置情報共有アプリ。最終的にZenly(位置情報) + Twitter(文字投稿) + Youtube(動画+配信) + Line(チャット + 通話)がくっついた夢のようなアプリになったが、現在は動画配信機能のみをメンテナンス中",
    tags: [
      "Full Stack",
      "React Native",
      "PHP - Laravel",
      "Nextjs",
      "TypeScript",
      "Go",
    ],
    image: "/projects/tokuly.jpeg",
    postSlug: "",
    featured: true,
    period: { kind: "ongoing", from: "2023" },
  },
  {
    id: "mootio",
    title: "Mootio",
    description:
      "降ってつながる。友達と運動する。学校内で開催されたハッカソンで作成しました。",
    tags: ["Nextjs", "Hono", "PWA"],
    image: "/projects/mootio.jpeg",
    postSlug: "",
    siteUrl: "https://mootio.app",
    githubUrl: "https://github.com/tokuzou0829/mootio",
    featured: true,
    period: { kind: "single", year: "2026" },
  },
  {
    id: "numatter",
    title: "Numatter",
    description: "Twitterのクローンアプリ。学校の審査会用に作成しました。",
    tags: ["Nextjs", "Hono", "PWA"],
    image: "/projects/numatter.jpeg",
    postSlug: "",
    siteUrl: "https://numatter.vercel.app",
    githubUrl: "https://github.com/tokuzou0829/twitter-clone",
    period: { kind: "single", year: "2026" },
  },
  {
    id: "tokuly-live-rtmp-live",
    title: "Tokuly Live RTMP Server",
    description:
      "TokulyLiveのRTMP配信サーバーをGoで実装し、今までNginx-rtmp-moduleに頼っていた配信基盤を自前で構築しました。",
    tags: ["Go", "RTMP"],
    postSlug: "",
    githubUrl: "https://github.com/tokuzou0829/tokuly-rtmp",
    period: { kind: "single", year: "2025" },
  },
  {
    id: "next-tokuzou-kit",
    title: "Next Tokuzou Kit",
    description:
      "自分用のNextjs + Honoによるフルスタックアプリケーション開発キット。これをベースにすることでアイデアを形にする速度を爆速にします。",
    tags: ["Next.js", "Hono", "TypeScript"],
    postSlug: "",
    githubUrl: "https://github.com/tokuzou0829/next-tokuzou-kit",

    period: { kind: "single", year: "2026" },
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description:
      "このポートフォリオサイト。自己紹介、活動内容、SNSをまとめて見られるように構成しています。",
    tags: ["Next.js", "Tailwind CSS", "Personal Site"],
    postSlug: "",
    featured: false,
    githubUrl: "https://github.com/tokuzou0829/tokuzou",
    siteUrl: "https://tokuzou.me",
    period: { kind: "ongoing", from: "2024" },
  },
  {
    id: "image-server",
    title: "TokuzouServerIMG",
    description: "画像を簡単にリンク化して共有するためのサービス",
    tags: ["Javascript", "OCR"],
    postSlug: "",
    featured: false,
    siteUrl: "https://img.tokuzou.moe",
    period: { kind: "ongoing", from: "2021" },
  },
];

export const featuredProjects = projects
  .filter((project) => project.featured)
  .slice(0, 3);
