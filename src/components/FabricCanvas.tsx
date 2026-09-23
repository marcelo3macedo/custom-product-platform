"use client";

import { useEffect, useRef } from "react";
import { Canvas, Circle, Rect, Textbox } from "fabric";

type FabricCanvasProps = {
  width?: number;
  height?: number;
};

export default function FabricCanvas({ width = 600, height = 400 }: FabricCanvasProps) {
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<Canvas | null>(null);

  useEffect(() => {
    if (!canvasElRef.current) return;

    const canvas = new Canvas(canvasElRef.current, {
      width,
      height,
      backgroundColor: "#f4f4f5",
    });
    canvasRef.current = canvas;

    canvas.add(
      new Rect({ left: 60, top: 60, width: 140, height: 100, fill: "#3b82f6", rx: 8, ry: 8 }),
      new Circle({ left: 280, top: 90, radius: 55, fill: "#f97316" }),
      new Textbox("Arraste-me", { left: 60, top: 240, width: 240, fontSize: 28, fill: "#18181b" }),
    );

    return () => {
      canvasRef.current = null;
      canvas.dispose();
    };
  }, [width, height]);

  const addRect = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = new Rect({
      left: Math.random() * (width - 80),
      top: Math.random() * (height - 80),
      width: 80,
      height: 80,
      fill: `hsl(${Math.floor(Math.random() * 360)} 70% 55%)`,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
  };

  const removeSelected = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getActiveObjects().forEach((obj) => canvas.remove(obj));
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          onClick={addRect}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Adicionar retângulo
        </button>
        <button
          onClick={removeSelected}
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
        >
          Remover selecionado
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-zinc-200 shadow-sm">
        <canvas ref={canvasElRef} />
      </div>
    </div>
  );
}
