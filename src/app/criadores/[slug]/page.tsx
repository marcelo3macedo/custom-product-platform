import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/store/Footer";
import Header from "@/components/store/Header";
import CreationGrid from "@/components/creators/CreationGrid";
import CreatorAvatar from "@/components/creators/CreatorAvatar";
import { creators, getCreationsByCreator, getCreator, sortByNewest } from "@/data/creators";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return creators.map((creator) => ({ slug: creator.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const creator = getCreator((await params).slug);
  if (!creator) return {};
  return {
    title: `${creator.name} · Criações | custom.store`,
    description: creator.bio,
  };
}

export default async function CreatorPage({ params }: PageProps) {
  const creator = getCreator((await params).slug);
  if (!creator) notFound();

  const all = getCreationsByCreator(creator.slug);
  const featured = all.filter((c) => c.featured);
  const latest = sortByNewest(all);

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        {/* Capa */}
        <div
          className="h-48 w-full sm:h-64"
          style={{ background: creator.banner, backgroundSize: "cover", backgroundPosition: "center" }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <CreatorAvatar creator={creator} size="lg" className="-mt-12 shadow-lg ring-4 ring-white sm:-mt-16" />
            <div className="sm:pt-4">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{creator.name}</h1>
              <p className="mt-1 max-w-2xl text-zinc-600">{creator.bio}</p>
              <p className="mt-2 text-xs font-medium text-zinc-400">{all.length} criações</p>
            </div>
          </div>

          {featured.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Em destaque</h2>
              <div className="mt-6">
                <CreationGrid creations={featured} showCreator={false} />
              </div>
            </section>
          )}

          <section className="mt-14 pb-16">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Últimas criações</h2>
            <div className="mt-6">
              {latest.length > 0 ? (
                <CreationGrid creations={latest} showCreator={false} />
              ) : (
                <p className="text-sm text-zinc-500">Este criador ainda não publicou nenhuma criação.</p>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
