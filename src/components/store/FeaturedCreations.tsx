import Link from "next/link";
import { creators, getFeaturedCreations } from "@/data/creators";
import CreationGrid from "@/components/creators/CreationGrid";
import CreatorAvatar from "@/components/creators/CreatorAvatar";

export default function FeaturedCreations() {
  const featured = getFeaturedCreations().slice(0, 8);

  return (
    <section id="destaques" className="mx-auto max-w-7xl scroll-mt-28 px-4 pb-16 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Em destaque</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Estampas criadas pela nossa comunidade. Clique em personalizar para usar como ponto de partida.
          </p>
        </div>
        <Link href="/criadores" className="shrink-0 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
          Ver todos os criadores →
        </Link>
      </div>

      <div className="mt-8">
        <CreationGrid creations={featured} />
      </div>

      <div className="mt-8 flex gap-3 overflow-x-auto pb-1">
        {creators.map((creator) => (
          <Link
            key={creator.slug}
            href={`/criadores/${creator.slug}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-zinc-200 py-1.5 pr-4 pl-1.5 text-sm font-medium text-zinc-700 transition hover:border-indigo-300 hover:bg-indigo-50"
          >
            <CreatorAvatar creator={creator} size="sm" className="h-8 w-8 text-base" />
            {creator.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
