import FabricCanvas from "@/components/FabricCanvas";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Custom Products Platform</h1>
        <p className="text-zinc-600">Next.js + Tailwind CSS + Fabric.js</p>
      </header>
      <FabricCanvas />
    </main>
  );
}
