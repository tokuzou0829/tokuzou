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
    id: "gen-my-blog-podcast",
    title: "Gen My Blog Podcast",
    description:
      "ブログ記事から自動でポッドキャストを生成します。音声合成にはAivis Speechを使用し自分の声を使用することができるようになっています。",
    tags: ["Python", "Gemini", "TTS"],
    postSlug: "",
    githubUrl: "https://github.com/tokuzou0829/gen-my-blog-podcast",

    period: { kind: "ongoing", from: "2025" },
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
    id: "easy-live-platform",
    title: "Easy Live Platform",
    description:
      "TokulyLiveで使用していた基盤システムを使用し、Dockerを使用して簡単にライブ配信プラットフォームを構築するためのプロジェクト",
    tags: ["Nextjs", "Nginx", "Docker"],
    postSlug: "",
    githubUrl: "https://github.com/tokuzou0829/easy-live-platform",
    period: { kind: "single", year: "2024" },
  },
  {
    id: "slack-spotify-nowplaying",
    title: "Slack Spotify NowPlaying",
    description: "SlackのステータスにSpotifyで再生中の曲を表示します。",
    tags: ["Google Apps Script", "Spotify", "Slack"],
    image: "/projects/slack-nowplaying.jpeg",
    postSlug: "",
    featured: false,
    githubUrl:
      "https://gist.github.com/tokuzou0829/f6c3f1cc600dd0dfcaa66be744c01cad",
    period: { kind: "single", year: "2024" },
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
    id: "ai-character-maker",
    title: "おしゃべりAIキャラクターメーカー",
    description:
      "学校のコンテスト用に作成した、簡単にAIと会話できるアプリケーション。ChatGPT APIを使用して、誰でも簡単におしゃべりAIキャラクターを作成できるサービス",
    tags: ["Python", "Flask"],
    postSlug: "",
    featured: false,
    githubUrl: "https://github.com/tokuzou0829/character-maker",
    period: { kind: "single", year: "2023" },
  },
  {
    id: "lyric-get-api",
    title: "Lyric Get API",
    description:
      "Utatenから歌詞を取得するためのAPIをPython + Flaskで実装しVercelにデプロイしています。CLIから歌詞を取得できるスクリプトも作成しました。",
    tags: ["Python", "Flask"],
    postSlug: "",
    githubUrl: "https://github.com/tokuzou0829/lyric-get-api",
    featured: false,
    period: { kind: "single", year: "2023" },
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
