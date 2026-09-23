import { formatPrice, type Product } from "@/data/store";
import ProductIllustration from "./ProductIllustration";

export default function ProductCard({ product }: { product: Product }) {
  const installment = product.price / 3;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:shadow-lg">
      <div className="relative flex aspect-square items-center justify-center bg-zinc-100 p-10">
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold text-white">
            {product.badge}
          </span>
        )}
        <button
          className="absolute top-3 right-3 rounded-full bg-white p-2 text-zinc-500 shadow-sm hover:text-rose-500"
          aria-label="Adicionar aos favoritos"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" />
          </svg>
        </button>
        <ProductIllustration kind={product.kind} color={product.color} className="h-full w-full transition duration-300 group-hover:scale-105" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">{product.category}</p>
        <h3 className="mt-1 font-semibold text-zinc-900">{product.name}</h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
          <span className="text-amber-500">★</span>
          <span className="font-medium text-zinc-700">{product.rating.toLocaleString("pt-BR")}</span>
          <span>({product.reviews})</span>
        </div>

        <div className="mt-3">
          {product.oldPrice && (
            <p className="text-xs text-zinc-400 line-through">{formatPrice(product.oldPrice)}</p>
          )}
          <p className="text-lg font-bold text-zinc-900">{formatPrice(product.price)}</p>
          <p className="text-xs text-zinc-500">ou 3x de {formatPrice(installment)} sem juros</p>
        </div>

        <div className="mt-auto flex gap-2 pt-4">
          <button className="flex-1 rounded-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            Personalizar
          </button>
          <button
            className="rounded-full border border-zinc-300 px-3 py-2 text-zinc-700 hover:bg-zinc-100"
            aria-label="Adicionar ao carrinho"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path d="M3 4h2l2.4 11.2a2 2 0 002 1.6h7.7a2 2 0 002-1.5L21 8H6" />
              <circle cx="9.5" cy="20" r="1" />
              <circle cx="17.5" cy="20" r="1" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
