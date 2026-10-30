import About from "@/components/home/About";
import BootScreen from "@/components/home/BootScreen";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import Path from "@/components/home/Path";
import SiteEffects from "@/components/home/SiteEffects";
import SiteFooter from "@/components/home/SiteFooter";
import SiteHeader from "@/components/home/SiteHeader";
import Stack from "@/components/home/Stack";
import Words from "@/components/home/Words";
import Work from "@/components/home/Work";

export default function LocalizedHome() {
  return (
    <>
      <BootScreen />
      <SiteEffects waitForBoot />
      <SiteHeader />
      <main className="relative w-full overflow-clip bg-ink text-paper">
        <Hero />
        <Manifesto />
        <About />
        <Stack />
        <Work />
        <Path />
        <Words />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
