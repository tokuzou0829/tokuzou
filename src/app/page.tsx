import Image from "next/image";
import ArrowDownBody from "@/components/arrowDownBody";
import About from "./about";
export default function Home() {
  return (
    <main>
      <div className="h-screen flex items-center justify-center px-4">
        <div className="">
          <div>
            <Image
              src="/me.png"
              alt="This is me."
              width={200}
              height={200}
              className="object-cover w-[200px] h-[200px] rounded-full m-auto mb-4"
            />
            <p className="font-bold text-4xl">Tokuzou Tanaka</p>
            <p className="text-gray-600">Japanese Programmer</p>
          </div>
          <ArrowDownBody />
        </div>
      </div>
      <div className="mx-auto max-w-screen-md px-4 md:px-8">
        <About />
      </div>
    </main>
  );
}
