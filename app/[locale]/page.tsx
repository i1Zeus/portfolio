import dynamic from "next/dynamic";
import Approach from "@/components/Approach";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/hero";
import RecentProjects from "@/components/RecentProjects";

const LocalizedFloatingNav = dynamic(
  () => import("@/components/LocalizedFloatingNav"),
  {
    ssr: false,
  }
);

const Grid = dynamic(() => import("@/components/Grid"), {
  ssr: false,
});

export default function LocalizedHome() {
  return (
    <main className="bg-black-100 sm:px-10 overflow-clip relative flex flex-col items-center justify-center px-5 mx-auto">
      <div className="max-w-7xl w-full">
        <LocalizedFloatingNav className="max-w-[90vw]" />
        <Hero />
        <Grid />
        <RecentProjects />
        <Clients />
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
}
