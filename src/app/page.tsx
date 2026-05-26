import ArrowDownBody from "@/components/arrowDownBody";
import ProfileHero from "@/components/profile-hero";
import About from "./about";

export default function Home() {
  return (
    <main>
      <div className="h-screen flex items-center justify-center px-4">
        <div className="">
          <ProfileHero />
          <ArrowDownBody />
        </div>
      </div>
      <div className="mx-auto max-w-screen-md px-4 md:px-8">
        <About />
      </div>
    </main>
  );
}
