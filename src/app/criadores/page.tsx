import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/store/Footer";
import Header from "@/components/store/Header";
import CreatorAvatar from "@/components/creators/CreatorAvatar";
import { creators, getCreationsByCreator } from "@/data/creators";

export const metadata: Metadata = {
  title: "Criadores | custom.store",
  description: "Conheça os artistas que criam as estampas da custom.store.",
};

export default function CreatorsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Criadores</h1>
        <p className="mt-2 text-zinc-500">Artistas da comunidade com estampas prontas para personalizar.</p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {creators.map((creator) => (
            <Link
              key={creator.slug}
              href={`/criadores/${creator.slug}`}
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:shadow-lg"
            >
              <div className="h-24" style={{ background: creator.banner, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div className="px-4 pb-5">
                <CreatorAvatar creator={creator} className="-mt-6 ring-4 ring-white" />
                <h2 className="mt-2 font-semibold text-zinc-900 group-hover:text-indigo-600">{creator.name}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-zinc-500">{creator.bio}</p>
                <p className="mt-3 text-xs font-medium text-zinc-400">
                  {getCreationsByCreator(creator.slug).length} criações
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
