import { footerColumns } from "@/data/store";

export default function Footer() {
  return (
    <footer id="contato" className="bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-xl font-black tracking-tight text-white">
              custom<span className="text-indigo-400">.</span>store
            </p>
            <p className="mt-3 max-w-sm text-sm">
              Produtos personalizados com qualidade e entrega para todo o Brasil. Crie, visualize e receba em casa.
            </p>
            <form className="mt-6 flex max-w-sm gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="min-w-0 flex-1 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-indigo-400"
              />
              <button type="button" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
                Assinar
              </button>
            </form>
            <p className="mt-2 text-xs text-zinc-500">Receba novidades e cupons exclusivos.</p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-white">{column.title}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 border-t border-zinc-800 pt-8 text-sm sm:grid-cols-3">
          <div>
            <p className="font-semibold text-white">Atendimento</p>
            <p className="mt-2">contato@custom.store</p>
            <p>(11) 4000-0000 · Seg a sex, 9h às 18h</p>
          </div>
          <div>
            <p className="font-semibold text-white">Formas de pagamento</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Pix", "Visa", "Master", "Elo", "Boleto"].map((method) => (
                <span key={method} className="rounded border border-zinc-700 px-2 py-0.5 text-xs text-zinc-300">
                  {method}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-white">Redes sociais</p>
            <div className="mt-2 flex gap-4">
              {["Instagram", "TikTok", "Facebook"].map((social) => (
                <a key={social} href="#" className="hover:text-white">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-800 pt-6 text-xs text-zinc-500 sm:flex-row sm:justify-between">
          <p>© 2026 custom.store · CNPJ 00.000.000/0001-00 · Todos os direitos reservados.</p>
          <p>Loja demonstrativa: produtos e preços fictícios.</p>
        </div>
      </div>
    </footer>
  );
}
