import { products } from "@/data/store";
import ProductCard from "./ProductCard";

const filters = ["Todos", "Camisetas", "Canecas", "Acessórios", "Promoções"];

export default function ProductGrid() {
  return (
    <section id="produtos" className="mx-auto max-w-7xl scroll-mt-28 px-4 pb-16 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Mais vendidos</h2>
          <p className="mt-1 text-sm text-zinc-500">Os favoritos dos nossos clientes, prontos para personalizar.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter, i) => (
            <button
              key={filter}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium ${
                i === 0 ? "bg-zinc-900 text-white" : "border border-zinc-300 text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-100">
          Ver mais produtos
        </button>
      </div>
    </section>
  );
}
