import Link from "next/link";
import { formatPrice } from "@/data/store";
import { getCreationPrice, getCreator, getCustomizeUrl, type Creation } from "@/data/creators";
import CreationPreview from "./CreationPreview";
import CreatorAvatar from "./CreatorAvatar";

export default function CreationCard({ creation, showCreator = true }: { creation: Creation; showCreator?: boolean }) {
  const creator = getCreator(creation.creatorSlug);
  const customizeUrl = getCustomizeUrl(creation);
  const price = getCreationPrice(creation);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:shadow-lg">
      <div className="relative flex aspect-square items-center justify-center bg-zinc-100 p-8">
        {creation.featured && (
          <span className="absolute top-3 left-3 rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-zinc-900">
            ★ Destaque
          </span>
        )}
        <Link href={customizeUrl} className="h-full w-full" title={`Personalizar ${creation.title}`}>
          <CreationPreview creation={creation} className="h-full w-full transition duration-300 group-hover:scale-105" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-zinc-900">
          <Link href={customizeUrl} className="transition hover:text-indigo-600">
            {creation.title}
          </Link>
        </h3>
        {showCreator && creator && (
          <Link
            href={`/criadores/${creator.slug}`}
            className="mt-1.5 inline-flex items-center gap-1.5 self-start text-sm text-zinc-600 transition hover:text-indigo-600"
          >
            <CreatorAvatar creator={creator} size="sm" />
            <span>
              por <span className="font-medium">{creator.name}</span>
            </span>
          </Link>
        )}

        <p className="mt-3 text-lg font-bold text-zinc-900">{formatPrice(price)}</p>

        <div className="mt-auto pt-4">
          <Link
            href={customizeUrl}
            className="block rounded-full bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Personalizar
          </Link>
        </div>
      </div>
    </article>
  );
}
