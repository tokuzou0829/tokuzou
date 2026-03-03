import Image from "next/image";
import Link from "next/link";
import ProjectListItem from "@/components/project-list-item";
import { getAllBlogPosts } from "@/lib/blog";
import { featuredProjects } from "@/lib/projects";
import Tooltip from "@/components/text-tooltip";

export default async function About() {
  const posts = await getAllBlogPosts();
  const availablePostSlugs = new Set(posts.map((post) => post.slug));

  return (
    <>
      <div className="my-20 md:my-24">
        <h2 className="text-3xl font-bold mb-3">About Me</h2>
        <div className="text-gray-700 mb-3">
          <span>2008年8月29日生まれ、愛知県出身です。</span>
          <br />
          <span>Web・アプリ開発を行っている日本のプログラマーです。</span>
          <br />
          <span>趣味のアプリ開発をフルスタックで行なっています。</span>
          <br />
          <span>
            最近はWebデザイン、セキュリティ、AI分野についてのを勉強をしています。
          </span>
        </div>
        <Image
          src="/korankei.jpg"
          width={1080}
          height={719}
          className="w-full object-cover rounded h-[200px]"
          alt="香嵐渓"
        />
      </div>
      <section className="my-20 md:my-24">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Projects</h2>
          </div>
          <Link
            href="/projects"
            className="text-sm font-medium text-gray-700 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-700"
          >
            すべて見る
          </Link>
        </div>
        <ul className="divide-y divide-slate-200">
          {featuredProjects.map((project) => (
            <ProjectListItem
              key={project.id}
              project={project}
              detailHref={
                availablePostSlugs.has(project.postSlug)
                  ? `/blog/${project.postSlug}`
                  : undefined
              }
            />
          ))}
        </ul>
      </section>
      <section className="my-20 md:my-24">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Blog</h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-gray-700 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-700"
          >
            すべて見る
          </Link>
        </div>
        {posts.length > 0 ? (
          <ul className="divide-y divide-slate-200">
            {posts.map((post) => (
              <li key={post.slug} className="py-5">
                <article>
                  <time className="text-xs text-slate-500" dateTime={post.date}>
                    {post.date}
                  </time>
                  <h3 className="mt-1 text-2xl font-semibold text-slate-900">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {post.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">ブログ記事はまだありません。</p>
        )}
      </section>
      <div className="my-20 md:my-24">
        <h2 className="text-3xl font-bold mb-3">Anime & Game</h2>
        <div className="text-gray-700 mb-3">
          <span>
            <Tooltip
              title="五等分の花嫁"
              description="５つ子が可愛すぎる！僕は三玖推しです！全人類が観るべき！"
              iamge="https://www.tbs.co.jp/anime/5hanayome/img/topvisual_02@2x.jpg"
            />
            、
            <Tooltip
              title="僕の心のヤバいやつ"
              description="山田が可愛すぎるし、憧れる！！！絶対観て！"
              iamge="https://bokuyaba-anime.com/assets/img/top/kv03.jpg"
            />
            、
            <Tooltip
              title="甲鉄城のカバネリ"
              description="
            めっちゃ面白かった！一回見るべき。
            「死んでも生きろ」「貫け、鋼の心を」"
              iamge="https://kabaneri.com/assets/img/common/kv.jpg"
            />
            が大好きです。
          </span>
          <br />
          <span>
            <Tooltip
              title="ブルーアーカイブ"
              description="カジュアルに銃火が飛び交う超巨大学園都市で繰り広げられる、「先生」と「生徒」たちの奇跡を巡る物語。 (Pixiv大百科)"
              iamge="https://images.igdb.com/igdb/image/upload/t_cover_big/co2z1g.png"
            />
            、
            <Tooltip
              title="osu!"
              description="通称peppyが開発した無料プレイのリズムゲーム (ウィキペディア)"
              iamge="https://images.igdb.com/igdb/image/upload/t_cover_big/co7p0w.png"
            />
            、
            <Tooltip
              title="VALORANT"
              description="キャラクターベースの 5v5 タクティカルシューター (公式サイト)"
              iamge="https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.png"
            />
            などのゲームをプレイしています
          </span>
        </div>
      </div>
    </>
  );
}
