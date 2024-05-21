import Clients from "@/components/Clients";
import Grid from "@/components/Grid";
import Hero from "@/components/hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";

export default function Home() {
  return (
    <main className="bg-black-100 sm:px-10 relative flex flex-col items-center justify-center px-5 mx-auto overflow-hidden">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} className="max-w-[90vw]" />
        <Hero />
        <Grid />
        <RecentProjects />
        <Clients />
      </div>
    </main>
  );
}
