import Image from "next/image";
import Tooltip from "@/components/text-tooltip";
export default function About() {
  return (
    <>
      <div className="mb-5">
        <h2 className="text-3xl font-bold mb-3">About Me</h2>
        <div className="text-gray-700 mb-3">
          <span>僕はWeb・アプリ開発を行っている日本のプログラマーです。</span>
          <br />
          <span>
            <Tooltip
              title="Tokuly"
              description="僕の作っている神アプリ！絶対使って！"
              iamge="https://tokuly.com/storage/tokuly.png"
            />
            の開発をフルスタックで行なっています。
          </span>
          <br />
          <span>
            Webデザイン、セキュリティ、AIについてのを勉強をしています。
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
      <div className="mb-5">
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
