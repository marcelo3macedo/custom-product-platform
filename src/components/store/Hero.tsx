import ProductIllustration from "./ProductIllustration";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-amber-50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            Nova coleção 2026
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Produtos com a <span className="text-indigo-600">sua cara</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-zinc-600">
            Personalize camisetas, canecas, bonés e muito mais com nosso editor online. Veja o resultado antes de comprar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#produtos" className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
              Comprar agora
            </a>
            <a href="#produtos" className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50">
              Começar a personalizar
            </a>
          </div>
          <dl className="mt-10 flex gap-8">
            {[
              ["+12 mil", "clientes"],
              ["4,9/5", "avaliação média"],
              ["48h", "para produção"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-2xl font-bold text-zinc-900">{value}</dt>
                <dd className="text-sm text-zinc-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4">
          <div className="flex aspect-square items-center justify-center rounded-3xl bg-sky-200 p-6 shadow-sm">
            <ProductIllustration kind="tshirt" color="#1d4ed8" className="h-full w-full" />
          </div>
          <div className="mt-10 flex aspect-square items-center justify-center rounded-3xl bg-amber-200 p-6 shadow-sm">
            <ProductIllustration kind="mug" color="#b45309" className="h-full w-full" />
          </div>
          <div className="-mt-10 flex aspect-square items-center justify-center rounded-3xl bg-rose-200 p-6 shadow-sm">
            <ProductIllustration kind="cap" color="#be123c" className="h-full w-full" />
          </div>
          <div className="flex aspect-square items-center justify-center rounded-3xl bg-emerald-200 p-6 shadow-sm">
            <ProductIllustration kind="bag" color="#047857" className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
