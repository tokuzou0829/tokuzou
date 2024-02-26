import Image from "next/image";

export default function About() {
  return (
    <>
      <div className="mb-5">
        <h2 className="text-3xl font-bold mb-3">About Me</h2>
        <p className="text-gray-700 mb-3">
          僕はWeb・アプリ開発を行っている日本のプログラマーです。
          <br />
          Tokulyの開発をフルスタックで行なっています。
          <br />
          Webデザイン、セキュリティ、AIについてのを勉強をしています。
        </p>
        <Image
          src="/korankei.jpg"
          width={1080}
          height={719}
          className="w-full object-cover rounded h-[200px]"
          alt="香嵐渓"
        />
      </div>
      <div className="mb-5">
        <h2 className="text-3xl font-bold mb-3">Anime & illustration</h2>
      </div>
    </>
  );
}
