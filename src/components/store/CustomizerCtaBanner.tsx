import Link from "next/link";
import ProductIllustration from "./ProductIllustration";

export default function CustomizerCtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-indigo-950 to-zinc-900 p-8 text-white shadow-xl sm:p-12">
        {/* Glow decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 ring-1 ring-indigo-400/30">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-ping" />
              Editor Interativo em Tempo Real
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl text-white">
              Crie produtos únicos com nosso estúdio Fabric.js
            </h2>
            <p className="mt-3 text-base text-zinc-300 max-w-xl">
              Solte a criatividade: insira suas próprias fotos e ilustrações, adicione textos personalizados com diversas fontes, combine formas geométricas e veja a prévia real na camiseta, caneca ou boné antes de finalizar o pedido.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/customizar"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 hover:shadow-indigo-500/50 active:scale-95"
              >
                <span>🎨 Abrir Estúdio de Criação</span>
                <span>→</span>
              </Link>
              <Link
                href="/customizar?produto=mug"
                className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800/80 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-700"
              >
                Testar Caneca
              </Link>
              <Link
                href="/customizar?produto=tshirt"
                className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800/80 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-700"
              >
                Testar Camiseta
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:col-span-5">
            {/* Visual Editor Mockup Card */}
            <div className="relative w-full max-w-sm rounded-2xl border border-zinc-700/80 bg-zinc-800/90 p-4 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-zinc-700 pb-2.5 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-indigo-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  canvas:fabric.js
                </span>
                <span>Prévia ao vivo</span>
              </div>

              <div className="mt-4 flex aspect-square items-center justify-center rounded-xl bg-zinc-900/90 p-6 relative overflow-hidden border border-zinc-800">
                <ProductIllustration kind="tshirt" color="#3b82f6" className="h-full w-full opacity-90" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-lg border border-dashed border-indigo-400/80 bg-indigo-950/40 px-4 py-3 text-center backdrop-blur-xs">
                    <p className="font-mono text-[10px] text-indigo-300 uppercase tracking-widest">★ FABRIC JS ★</p>
                    <p className="text-xs font-black text-white">SUA ARTE AQUI</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400">
                <span>Camiseta Básica · Azul Royal</span>
                <span className="font-bold text-white">R$ 59,90</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
