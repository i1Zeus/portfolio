import dynamic from "next/dynamic";
import Approach from "@/components/Approach";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/hero";
import RecentProjects from "@/components/RecentProjects";
import { navItems } from "@/data";

const FloatingNav = dynamic(() => import("@/components/ui/FloatingNav").then((m) => m.FloatingNav), {
  ssr: false,
});

const Grid = dynamic(() => import("@/components/Grid"), {
  ssr: false,
});

// Main App Page
export default function Home() {
  return (
    <main className="bg-black-100 sm:px-10 overflow-clip relative flex flex-col items-center justify-center px-5 mx-auto">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} className="max-w-[90vw]" />
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
