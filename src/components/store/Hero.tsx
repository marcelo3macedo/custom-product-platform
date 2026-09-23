import Link from "next/link";
import ProductIllustration from "./ProductIllustration";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-amber-50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <Link
            href="/customizar"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3.5 py-1 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-200"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            <span>✨ Editor Visual Fabric.js</span>
            <span className="font-bold">· Crie em tempo real</span>
          </Link>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Produtos com a <span className="text-indigo-600">sua cara</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-zinc-600">
            Personalize camisetas, canecas, bonés e muito mais com nosso editor online. Adicione textos, imagens, formas e veja o resultado antes de comprar.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/customizar"
              className="group inline-flex items-center gap-2.5 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>Começar a personalizar</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href="#produtos"
              className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
            >
              Ver catálogo
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
          <Link
            href="/customizar?produto=tshirt"
            className="group relative flex aspect-square items-center justify-center rounded-3xl bg-sky-200 p-6 shadow-sm transition hover:scale-105 hover:shadow-md"
            title="Personalizar Camiseta no Estúdio"
          >
            <ProductIllustration kind="tshirt" color="#1d4ed8" className="h-full w-full transition group-hover:scale-110" />
            <span className="absolute bottom-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-zinc-900 shadow-xs backdrop-blur-xs group-hover:bg-indigo-600 group-hover:text-white transition">
              Camiseta 🎨
            </span>
          </Link>

          <Link
            href="/customizar?produto=mug"
            className="group relative mt-10 flex aspect-square items-center justify-center rounded-3xl bg-amber-200 p-6 shadow-sm transition hover:scale-105 hover:shadow-md"
            title="Personalizar Caneca no Estúdio"
          >
            <ProductIllustration kind="mug" color="#b45309" className="h-full w-full transition group-hover:scale-110" />
            <span className="absolute bottom-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-zinc-900 shadow-xs backdrop-blur-xs group-hover:bg-indigo-600 group-hover:text-white transition">
              Caneca 🎨
            </span>
          </Link>

          <Link
            href="/customizar?produto=cap"
            className="group relative -mt-10 flex aspect-square items-center justify-center rounded-3xl bg-rose-200 p-6 shadow-sm transition hover:scale-105 hover:shadow-md"
            title="Personalizar Boné no Estúdio"
          >
            <ProductIllustration kind="cap" color="#be123c" className="h-full w-full transition group-hover:scale-110" />
            <span className="absolute bottom-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-zinc-900 shadow-xs backdrop-blur-xs group-hover:bg-indigo-600 group-hover:text-white transition">
              Boné 🎨
            </span>
          </Link>

          <Link
            href="/customizar?produto=bag"
            className="group relative flex aspect-square items-center justify-center rounded-3xl bg-emerald-200 p-6 shadow-sm transition hover:scale-105 hover:shadow-md"
            title="Personalizar Ecobag no Estúdio"
          >
            <ProductIllustration kind="bag" color="#047857" className="h-full w-full transition group-hover:scale-110" />
            <span className="absolute bottom-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-zinc-900 shadow-xs backdrop-blur-xs group-hover:bg-indigo-600 group-hover:text-white transition">
              Ecobag 🎨
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
