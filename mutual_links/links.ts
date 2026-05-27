export type MutualLink = {
  name: string;
  author: string;
  addedAt: string;
  url: string;
  image?: string;
};

export const mutualLinks: MutualLink[] = [
  {
    name: "nakasyou.how",
    author: "nakasyouさん",
    addedAt: "2026-05-27",
    url: "https://nakasyou.how/",
    image: "/mutual_links/nakasyou.png",
  },
  {
    name: "minagishl.com",
    author: "Minagishl",
    addedAt: "2026-05-27",
    url: "https://minagishl.com/",
    image: "/mutual_links/minagishl.webp",
  },
  {
    name: "aomona.me",
    author: "aomona",
    addedAt: "2026-05-28",
    url: "https://aomona.me/",
    image: "/mutual_links/aomona.png",
  }
];
