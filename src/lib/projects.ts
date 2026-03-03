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
      "降ってつながる。友達と運動する。 学校内で開催されたハッカソンで作成しました。 https://mootio.app",
    tags: ["Nextjs", "Hono", "PWA"],
    image: "/projects/mootio.jpeg",
    postSlug: "",
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
    period: { kind: "single", year: "2026" },
  },
  {
    id: "tokuly-live-rtmp-live",
    title: "Tokuly Live RTMP Server",
    description:
      "TokulyLiveのRTMP配信サーバーをGoで実装し、今までNginx-rtmp-moduleに頼っていた配信基盤を自前で構築しました。",
    tags: ["Go", "RTMP"],
    postSlug: "",
    period: { kind: "single", year: "2025" },
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description:
      "このポートフォリオサイト。自己紹介、活動内容、SNSをまとめて見られるように構成しています。",
    tags: ["Next.js", "Tailwind CSS", "Personal Site"],
    postSlug: "",
    featured: false,
    period: { kind: "ongoing", from: "2024" },
  },
];

export const featuredProjects = projects
  .filter((project) => project.featured)
  .slice(0, 3);
