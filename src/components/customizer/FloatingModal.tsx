"use client";

import { useEffect, type ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Modal flutuante ancorado ao lado do menu direito (desktop) ou como
 * bottom-sheet (mobile), deixando o canvas visível ao fundo.
 */
export default function FloatingModal({ title, subtitle, onClose, children }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-zinc-900/15 backdrop-blur-[1px]" onClick={onClose} />

      <div className="absolute inset-x-3 bottom-24 flex max-h-[70dvh] flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl sm:inset-x-auto sm:top-1/2 sm:right-32 sm:bottom-auto sm:max-h-[80dvh] sm:w-96 sm:-translate-y-1/2">
        <div className="flex items-start justify-between gap-3 border-b border-zinc-100 px-5 py-4">
          <div>
            <h2 className="text-sm font-bold text-zinc-900">{title}</h2>
            {subtitle && <p className="mt-0.5 text-xs text-zinc-500">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
            aria-label="Fechar"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}
