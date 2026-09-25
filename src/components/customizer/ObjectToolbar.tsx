"use client";

import type { ReactNode } from "react";

export type ToolbarPosition = {
  /** Centro horizontal da toolbar, em coordenadas da viewport */
  x: number;
  /** Borda de ancoragem (inferior ou superior do objeto), em coordenadas da viewport */
  y: number;
  placement: "below" | "above";
};

type Props = {
  position: ToolbarPosition;
  fill: string;
  onFillChange: (color: string) => void;
  onDuplicate: () => void;
  onRemove: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
  onCenterH: () => void;
  onCenterV: () => void;
};

const GAP = 14;

/** Mini menu que acompanha o objeto selecionado no canvas. */
export default function ObjectToolbar({
  position,
  fill,
  onFillChange,
  onDuplicate,
  onRemove,
  onBringForward,
  onSendBackward,
  onCenterH,
  onCenterV,
}: Props) {
  const top = position.placement === "below" ? position.y + GAP : position.y - GAP;

  return (
    <div
      className="fixed z-30 flex items-center gap-0.5 rounded-full border border-zinc-200 bg-white/95 p-1 shadow-lg backdrop-blur"
      style={{
        left: position.x,
        top,
        transform: `translate(-50%, ${position.placement === "below" ? "0" : "-100%"})`,
      }}
    >
      <label
        className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-zinc-100"
        title="Cor do elemento"
      >
        <span
          className="h-5 w-5 rounded-full border border-zinc-300 shadow-inner"
          style={{ backgroundColor: fill }}
        />
        <input
          type="color"
          value={fill}
          onChange={(e) => onFillChange(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </label>

      <Divider />

      <ToolButton title="Centralizar horizontalmente" onClick={onCenterH}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M8 8l4-4 4 4M8 16l4 4 4-4" />
      </ToolButton>
      <ToolButton title="Centralizar verticalmente" onClick={onCenterV}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M8 8l-4 4 4 4M16 8l4 4-4 4" />
      </ToolButton>

      <Divider />

      <ToolButton title="Trazer para frente" onClick={onBringForward}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </ToolButton>
      <ToolButton title="Enviar para trás" onClick={onSendBackward}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </ToolButton>

      <Divider />

      <ToolButton title="Duplicar" onClick={onDuplicate}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </ToolButton>
      <ToolButton title="Excluir" onClick={onRemove} danger>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </ToolButton>
    </div>
  );
}

function Divider() {
  return <div className="mx-0.5 h-5 w-px bg-zinc-200" />;
}

function ToolButton({
  title,
  onClick,
  danger,
  children,
}: {
  title: string;
  onClick: () => void;
  danger?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
        danger ? "text-rose-600 hover:bg-rose-50" : "text-zinc-700 hover:bg-zinc-100"
      }`}
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {children}
      </svg>
    </button>
  );
}
