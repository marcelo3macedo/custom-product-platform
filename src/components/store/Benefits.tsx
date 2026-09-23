import { benefits } from "@/data/store";

const icons = [
  <path key="truck" d="M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />,
  <path key="brush" d="M4 20l6-6M14 4l6 6-8 8-6-6z" />,
  <path key="lock" d="M6 11h12v9H6zM8 11V8a4 4 0 118 0v3" />,
  <path key="refresh" d="M4 12a8 8 0 0114-5.3L20 9M20 4v5h-5M20 12a8 8 0 01-14 5.3L4 15M4 20v-5h5" />,
];

export default function Benefits() {
  return (
    <section className="border-y border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4">
        {benefits.map((benefit, i) => (
          <div key={benefit.title} className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round">
                {icons[i]}
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">{benefit.title}</p>
              <p className="text-xs text-zinc-500">{benefit.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
