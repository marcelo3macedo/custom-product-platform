import { categories } from "@/data/store";
import ProductIllustration from "./ProductIllustration";

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Compre por categoria</h2>
        <a href="#produtos" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          Ver todas →
        </a>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((category) => (
          <a
            key={category.name}
            href="#produtos"
            className={`group flex flex-col items-center rounded-2xl ${category.bg} p-6 transition hover:-translate-y-1 hover:shadow-md`}
          >
            <ProductIllustration kind={category.kind} color="#27272a" className="h-20 w-20 transition group-hover:scale-110" />
            <p className="mt-4 font-semibold text-zinc-900">{category.name}</p>
            <p className="text-xs text-zinc-600">{category.count} produtos</p>
          </a>
        ))}
      </div>
    </section>
  );
}
