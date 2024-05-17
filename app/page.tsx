import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="bg-black-100 sm:px-10 relative flex flex-col items-center justify-center px-5 mx-auto overflow-hidden">
      <div className="max-w-7xl w-full">
        <Hero />
      </div>
    </main>
  );
}
