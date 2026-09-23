"use client";

import { useState } from "react";
import { navLinks } from "@/data/store";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="bg-zinc-900 px-4 py-2 text-center text-xs font-medium text-white">
        Frete grátis acima de R$ 199 · Use o cupom <span className="font-bold">BEMVINDO10</span> na primeira compra
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-zinc-700 hover:bg-zinc-100 lg:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>

        <a href="#" className="text-xl font-black tracking-tight text-zinc-900">
          custom<span className="text-indigo-600">.</span>store
        </a>

        <nav className="ml-8 hidden gap-6 lg:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <div className="relative mr-2 hidden md:block">
            <input
              type="search"
              placeholder="Buscar produtos..."
              className="w-56 rounded-full border border-zinc-300 bg-zinc-50 py-2 pr-4 pl-10 text-sm outline-none focus:border-indigo-500 focus:bg-white"
            />
            <svg className="absolute top-2.5 left-3.5 h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </div>
          <button className="rounded-full p-2 text-zinc-700 hover:bg-zinc-100" aria-label="Minha conta">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </button>
          <button className="rounded-full p-2 text-zinc-700 hover:bg-zinc-100" aria-label="Favoritos">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" />
            </svg>
          </button>
          <button className="relative rounded-full p-2 text-zinc-700 hover:bg-zinc-100" aria-label="Carrinho">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path d="M3 4h2l2.4 11.2a2 2 0 002 1.6h7.7a2 2 0 002-1.5L21 8H6" />
              <circle cx="9.5" cy="20" r="1" />
              <circle cx="17.5" cy="20" r="1" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
              3
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-zinc-200 px-4 py-3 lg:hidden">
          <input
            type="search"
            placeholder="Buscar produtos..."
            className="mb-3 w-full rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm outline-none focus:border-indigo-500 md:hidden"
          />
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
