export default function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-indigo-600 px-6 py-12 text-white sm:px-12">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-indigo-500" />
        <div className="absolute -bottom-20 right-32 h-48 w-48 rounded-full bg-indigo-700" />
        <div className="relative max-w-xl">
          <p className="text-sm font-semibold tracking-wide text-indigo-200 uppercase">Pedidos corporativos</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Brindes para sua empresa com até 40% off</h2>
          <p className="mt-3 text-indigo-100">
            Camisetas para eventos, kits de boas-vindas e brindes com o seu logo. Descontos progressivos a partir de 20 unidades.
          </p>
          <a href="#contato" className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">
            Solicitar orçamento
          </a>
        </div>
      </div>
    </section>
  );
}
