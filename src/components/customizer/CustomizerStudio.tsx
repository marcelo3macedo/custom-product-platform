"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { Canvas, Circle, FabricImage, FabricObject, Path, Rect, Textbox, Triangle } from "fabric";
import type { ProductKind } from "@/data/store";
import { formatPrice } from "@/data/store";
import {
  CLIPARTS_PRESETS,
  CUSTOMIZER_PRODUCTS,
  FONT_FAMILIES,
  PRODUCT_COLORS,
  SAMPLE_LOGOS,
} from "@/data/customizer";
import ProductMockupFrame from "./ProductMockupFrame";
import FloatingModal from "./FloatingModal";
import ObjectToolbar, { type ToolbarPosition } from "./ObjectToolbar";

type StudioProps = {
  initialKind?: ProductKind;
  initialColor?: string;
};

type PanelId = "product" | "text" | "shapes" | "upload" | "stickers" | "layers";

const PANELS: { id: PanelId; label: string; title: string; subtitle: string; icon: ReactNode }[] = [
  {
    id: "product",
    label: "Produto",
    title: "Produto e cor",
    subtitle: "Escolha a peça base e a cor",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 3l-5 3 2 5 3-1.5V21h8V9.5l3 1.5 2-5-5-3c-.5 1.5-2 2.5-4 2.5S8.5 4.5 8 3z"
      />
    ),
  },
  {
    id: "text",
    label: "Texto",
    title: "Adicionar texto",
    subtitle: "Dica: dê dois cliques no texto do canvas para editá-lo",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5 6V4h14v2M12 4v16m-3 0h6" />,
  },
  {
    id: "shapes",
    label: "Formas",
    title: "Formas",
    subtitle: "Escolha a cor e clique na forma",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 14h6v6H4zM17 7a3 3 0 11-6 0 3 3 0 016 0zM14 20l3.5-6 3.5 6z"
      />
    ),
  },
  {
    id: "upload",
    label: "Imagem",
    title: "Enviar imagem",
    subtitle: "Use sua logo ou uma arte pronta",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
  },
  {
    id: "stickers",
    label: "Stickers",
    title: "Stickers",
    subtitle: "Ícones prontos para sua arte",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    id: "layers",
    label: "Camadas",
    title: "Camadas",
    subtitle: "Selecione ou reordene os elementos",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4l8 4-8 4-8-4 8-4zM4 12l8 4 8-4M4 16l8 4 8-4"
      />
    ),
  },
];

const SHAPE_SWATCHES = ["#f59e0b", "#ef4444", "#3b82f6", "#10b981", "#8b5cf6", "#18181b", "#ffffff"];

// Espaço mínimo (px) entre a toolbar do objeto e a borda da viewport
const VIEWPORT_MARGIN = 72;

function describeObject(obj: FabricObject) {
  if (obj instanceof Textbox) return { icon: "T", label: obj.text || "Texto" };
  if (obj instanceof FabricImage) return { icon: "🖼", label: "Imagem" };
  if (obj instanceof Rect) return { icon: "■", label: "Retângulo" };
  if (obj instanceof Circle) return { icon: "●", label: "Círculo" };
  if (obj instanceof Triangle) return { icon: "▲", label: "Triângulo" };
  return { icon: "★", label: "Forma" };
}

export default function CustomizerStudio({
  initialKind = "tshirt",
  initialColor,
}: StudioProps) {
  // Product state
  const [selectedKind, setSelectedKind] = useState<ProductKind>(initialKind);
  const currentProduct =
    CUSTOMIZER_PRODUCTS.find((p) => p.kind === selectedKind) ?? CUSTOMIZER_PRODUCTS[0];

  const [selectedColor, setSelectedColor] = useState<string>(
    initialColor || currentProduct.defaultColor,
  );

  // Studio UI state
  const [openPanel, setOpenPanel] = useState<PanelId | null>(null);
  const [showGuides, setShowGuides] = useState(true);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [exportPreviewUrl, setExportPreviewUrl] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Canvas refs
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Selection state
  const [activeObject, setActiveObject] = useState<FabricObject | null>(null);
  const [activeFill, setActiveFill] = useState("#000000");
  const [layers, setLayers] = useState<FabricObject[]>([]);
  const [toolbarPos, setToolbarPos] = useState<ToolbarPosition | null>(null);

  // Text Tool form state
  const [textInput, setTextInput] = useState("SEU DESIGN");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [fontSize, setFontSize] = useState(32);
  const [isBold, setIsBold] = useState(true);
  const [isItalic, setIsItalic] = useState(false);

  // Shape Tool form state
  const [shapeColor, setShapeColor] = useState("#f59e0b");

  const closePanel = useCallback(() => setOpenPanel(null), []);

  const handleSelectProduct = (kind: ProductKind) => {
    setSelectedKind(kind);
    const prod = CUSTOMIZER_PRODUCTS.find((p) => p.kind === kind);
    if (prod) {
      setSelectedColor(prod.defaultColor);
    }
  };

  /** Recalcula a posição da toolbar flutuante logo abaixo do objeto ativo. */
  const updateToolbar = useCallback(() => {
    const canvas = canvasRef.current;
    const active = canvas?.getActiveObject();
    if (!canvas || !active) {
      setToolbarPos(null);
      return;
    }

    const canvasRect = canvas.upperCanvasEl.getBoundingClientRect();
    const box = active.getBoundingRect();
    const x = canvasRect.left + box.left + box.width / 2;
    const bottom = canvasRect.top + box.top + box.height;
    const top = canvasRect.top + box.top;

    const fitsBelow = bottom + VIEWPORT_MARGIN < window.innerHeight;
    setToolbarPos({
      x: Math.min(Math.max(x, 150), window.innerWidth - 150),
      y: fitsBelow ? bottom : top,
      placement: fitsBelow ? "below" : "above",
    });
  }, []);

  // Initialize Fabric.js Canvas
  useEffect(() => {
    if (!canvasElRef.current) return;

    const canvas = new Canvas(canvasElRef.current, {
      width: 280,
      height: 320,
      backgroundColor: "transparent",
      selection: true,
      preserveObjectStacking: true,
    });
    canvasRef.current = canvas;

    // Arte inicial (no Fabric v7 a origem padrão dos objetos é o centro)
    const initialText = new Textbox("SEU DESIGN", {
      left: 140,
      top: 128,
      width: 210,
      fontSize: 28,
      fontFamily: "Impact, sans-serif",
      fontWeight: "bold",
      fill: "#ffffff",
      textAlign: "center",
    });

    const initialStar = new Path(
      "M 50 0 L 63 35 L 100 35 L 70 57 L 82 92 L 50 70 L 18 92 L 30 57 L 0 35 L 37 35 Z",
      {
        left: 140,
        top: 70,
        scaleX: 0.6,
        scaleY: 0.6,
        fill: "#f59e0b",
      },
    );

    const initialBadgeText = new Textbox("★ EDIÇÃO EXCLUSIVA ★", {
      left: 140,
      top: 168,
      width: 200,
      fontSize: 12,
      fontFamily: "sans-serif",
      fontWeight: "bold",
      fill: "#e0e7ff",
      textAlign: "center",
    });

    canvas.add(initialStar, initialText, initialBadgeText);
    canvas.requestRenderAll();

    const refreshLayers = () => setLayers([...canvas.getObjects()]);

    const syncSelection = () => {
      const active = canvas.getActiveObject() || null;
      setActiveObject(active);
      setActiveFill(typeof active?.fill === "string" ? active.fill : "#000000");
      updateToolbar();
    };

    // Esconde a toolbar enquanto o objeto é arrastado/transformado
    const hideToolbar = () => setToolbarPos(null);

    canvas.on("selection:created", syncSelection);
    canvas.on("selection:updated", syncSelection);
    canvas.on("selection:cleared", syncSelection);
    canvas.on("object:moving", hideToolbar);
    canvas.on("object:scaling", hideToolbar);
    canvas.on("object:rotating", hideToolbar);
    canvas.on("object:modified", updateToolbar);
    canvas.on("mouse:up", updateToolbar);
    canvas.on("text:changed", () => {
      updateToolbar();
      refreshLayers();
    });
    canvas.on("object:added", refreshLayers);
    canvas.on("object:removed", refreshLayers);

    refreshLayers();

    window.addEventListener("resize", updateToolbar);
    window.addEventListener("scroll", updateToolbar, true);

    return () => {
      window.removeEventListener("resize", updateToolbar);
      window.removeEventListener("scroll", updateToolbar, true);
      canvasRef.current = null;
      canvas.dispose();
    };
  }, [updateToolbar]);

  // O mockup muda de tamanho/posição ao trocar de produto ou gabarito
  useEffect(() => {
    const id = requestAnimationFrame(updateToolbar);
    return () => cancelAnimationFrame(id);
  }, [selectedKind, showGuides, updateToolbar]);

  // --- Canvas Actions ---

  const insertObject = (obj: FabricObject) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.add(obj);
    canvas.centerObject(obj);
    canvas.setActiveObject(obj);
    canvas.requestRenderAll();
    setOpenPanel(null);
  };

  const addText = () => {
    insertObject(
      new Textbox(textInput.trim() || "Novo Texto", {
        width: 200,
        fontSize,
        fontFamily,
        fill: textColor,
        fontWeight: isBold ? "bold" : "normal",
        fontStyle: isItalic ? "italic" : "normal",
        textAlign: "center",
      }),
    );
  };

  const addShape = (type: "rect" | "circle" | "triangle" | "star" | "heart") => {
    let shapeObj: FabricObject;

    if (type === "rect") {
      shapeObj = new Rect({ width: 100, height: 100, fill: shapeColor, rx: 10, ry: 10 });
    } else if (type === "circle") {
      shapeObj = new Circle({ radius: 50, fill: shapeColor });
    } else if (type === "triangle") {
      shapeObj = new Triangle({ width: 100, height: 90, fill: shapeColor });
    } else if (type === "star") {
      shapeObj = new Path(
        "M 50 0 L 63 35 L 100 35 L 70 57 L 82 92 L 50 70 L 18 92 L 30 57 L 0 35 L 37 35 Z",
        { scaleX: 0.9, scaleY: 0.9, fill: shapeColor },
      );
    } else {
      shapeObj = new Path(
        "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z",
        { scaleX: 1.1, scaleY: 1.1, fill: shapeColor },
      );
    }

    insertObject(shapeObj);
  };

  const addEmojiClipart = (emoji: string) => {
    insertObject(new Textbox(emoji, { fontSize: 54 }));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvasRef.current) return;

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      if (!dataUrl || !canvasRef.current) return;

      try {
        const img = await FabricImage.fromURL(dataUrl);
        if (img.width && img.width > 200) {
          img.scaleToWidth(180);
        }
        insertObject(img);
      } catch (err) {
        console.error("Erro ao carregar imagem no Fabric:", err);
      }
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const addSampleBadge = (sample: (typeof SAMPLE_LOGOS)[0]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const badgeBg = new Rect({
      width: 180,
      height: 90,
      fill: sample.bg,
      rx: 16,
      ry: 16,
      stroke: "#ffffff",
      strokeWidth: 2,
    });

    const titleText = new Textbox(sample.title, {
      width: 170,
      fontSize: 16,
      fontWeight: "bold",
      fontFamily: "Impact, sans-serif",
      fill: sample.color,
      textAlign: "center",
    });

    const subText = new Textbox(sample.subtitle, {
      width: 170,
      fontSize: 9,
      fontFamily: "sans-serif",
      fontWeight: "bold",
      fill: sample.color,
      textAlign: "center",
      opacity: 0.85,
    });

    canvas.add(badgeBg, titleText, subText);
    canvas.centerObject(badgeBg);
    canvas.centerObject(titleText);
    canvas.centerObject(subText);
    titleText.set({ top: badgeBg.top - 12 });
    subText.set({ top: badgeBg.top + 16 });
    canvas.setActiveObject(badgeBg);
    canvas.requestRenderAll();
    setOpenPanel(null);
  };

  // Manipulation tools (usadas pela toolbar flutuante)
  const withActive = (fn: (canvas: Canvas, active: FabricObject) => void) => {
    const canvas = canvasRef.current;
    const active = canvas?.getActiveObject();
    if (!canvas || !active) return;
    fn(canvas, active);
    canvas.requestRenderAll();
    setLayers([...canvas.getObjects()]);
    updateToolbar();
  };

  const duplicateSelected = async () => {
    const canvas = canvasRef.current;
    const active = canvas?.getActiveObject();
    if (!canvas || !active) return;

    try {
      const cloned = await active.clone();
      cloned.set({
        left: (active.left ?? 0) + 16,
        top: (active.top ?? 0) + 16,
      });
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.requestRenderAll();
    } catch (err) {
      console.error("Erro ao clonar objeto:", err);
    }
  };

  const removeSelected = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getActiveObjects().forEach((obj) => canvas.remove(obj));
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  const changeFill = (color: string) => {
    setActiveFill(color);
    withActive((_, active) => active.set("fill", color));
  };

  const selectLayer = (obj: FabricObject) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setActiveObject(obj);
    canvas.requestRenderAll();
    setOpenPanel(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (confirm("Deseja realmente limpar toda a arte da tela?")) {
      canvas.discardActiveObject();
      canvas.clear();
      canvas.requestRenderAll();
    }
  };

  const downloadArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL({
      format: "png",
      multiplier: 3,
    });

    const link = document.createElement("a");
    link.download = `estampa-${selectedKind}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const openCartModal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL({
      format: "png",
      multiplier: 2,
    });
    setExportPreviewUrl(dataUrl);
    setOpenPanel(null);
    setCartModalOpen(true);
  };

  // Calculate pricing
  const layersCount = layers.length;
  const customFee = layersCount > 0 ? 15.0 : 0;
  const unitPrice = currentProduct.basePrice + customFee;
  const totalPrice = unitPrice * quantity;

  const panel = PANELS.find((p) => p.id === openPanel);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-zinc-100">
      {/* Canvas / mockup ocupando toda a tela */}
      <div className="absolute inset-0 flex items-center justify-center px-4 pt-16 pb-24 sm:pr-32 sm:pb-8 sm:pl-8">
        <div style={{ width: "min(540px, calc((100dvh - 7rem) * 0.8), 100%)" }}>
          <ProductMockupFrame
            kind={selectedKind}
            color={selectedColor}
            showGuides={showGuides}
            printAreaLabel={currentProduct.printAreaLabel}
          >
            <canvas ref={canvasElRef} />
          </ProductMockupFrame>
        </div>
      </div>

      {/* Topo esquerdo: voltar + produto */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 p-1.5 sm:pr-4 shadow-sm backdrop-blur">
        <Link
          href="/"
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100"
          title="Voltar para a loja"
          aria-label="Voltar para a loja"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div className="hidden leading-tight sm:block">
          <p className="text-xs font-bold text-zinc-900">{currentProduct.name}</p>
          <p className="text-[11px] text-zinc-500">{currentProduct.printAreaLabel}</p>
        </div>
      </div>

      {/* Topo direito: ações globais */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/90 p-1.5 shadow-sm backdrop-blur">
        <button
          onClick={() => setShowGuides(!showGuides)}
          className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition ${
            showGuides ? "bg-indigo-50 text-indigo-700" : "text-zinc-700 hover:bg-zinc-100"
          }`}
          title="Alternar visibilidade da área de impressão"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V5a1 1 0 011-1h3m8 0h3a1 1 0 011 1v3m0 8v3a1 1 0 01-1 1h-3m-8 0H5a1 1 0 01-1-1v-3" />
          </svg>
          <span className="hidden sm:inline">Gabarito</span>
        </button>
        <button
          onClick={downloadArtwork}
          className="flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
          title="Baixar arte em PNG transparente"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span className="hidden sm:inline">Baixar</span>
        </button>
        <button
          onClick={openCartModal}
          className="flex h-8 items-center gap-1.5 rounded-full bg-indigo-600 px-4 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-700"
        >
          Finalizar · {formatPrice(unitPrice)}
        </button>
      </div>

      {/* Menu direito (desktop) / inferior (mobile) com ícones e nomes */}
      <nav className="absolute inset-x-3 bottom-3 z-20 flex justify-between gap-1 rounded-2xl border border-zinc-200 bg-white/95 p-1.5 shadow-lg backdrop-blur sm:inset-x-auto sm:top-1/2 sm:right-4 sm:bottom-auto sm:flex-col sm:-translate-y-1/2">
        {PANELS.map((p) => (
          <button
            key={p.id}
            onClick={() => setOpenPanel(openPanel === p.id ? null : p.id)}
            className={`relative flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium transition sm:w-20 sm:flex-none sm:py-2.5 ${
              openPanel === p.id
                ? "bg-indigo-600 text-white"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              {p.icon}
            </svg>
            {p.label}
            {p.id === "layers" && layersCount > 0 && (
              <span
                className={`absolute top-1 right-1.5 rounded-full px-1.5 text-[9px] font-bold ${
                  openPanel === p.id ? "bg-white text-indigo-600" : "bg-indigo-100 text-indigo-700"
                }`}
              >
                {layersCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Menu que acompanha o objeto selecionado */}
      {activeObject && toolbarPos && !openPanel && !cartModalOpen && (
        <ObjectToolbar
          position={toolbarPos}
          fill={activeFill}
          onFillChange={changeFill}
          onDuplicate={duplicateSelected}
          onRemove={removeSelected}
          onBringForward={() => withActive((c, a) => c.bringObjectForward(a))}
          onSendBackward={() => withActive((c, a) => c.sendObjectBackwards(a))}
          onCenterH={() => withActive((c, a) => c.centerObjectH(a))}
          onCenterV={() => withActive((c, a) => c.centerObjectV(a))}
        />
      )}

      <input
        type="file"
        ref={fileInputRef}
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        onChange={handleImageFileChange}
        className="hidden"
      />

      {/* Modais de ferramentas */}
      {panel && (
        <FloatingModal title={panel.title} subtitle={panel.subtitle} onClose={closePanel}>
          {panel.id === "product" && (
            <div className="space-y-6">
              <div>
                <SectionLabel>Produto base</SectionLabel>
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  {CUSTOMIZER_PRODUCTS.map((prod) => (
                    <button
                      key={prod.kind}
                      onClick={() => handleSelectProduct(prod.kind)}
                      className={`flex flex-col items-start rounded-xl border p-3 text-left text-xs transition ${
                        selectedKind === prod.kind
                          ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
                          : "border-zinc-200 bg-white hover:border-zinc-300"
                      }`}
                    >
                      <span className="font-semibold text-zinc-900">{prod.name}</span>
                      <span className="mt-1 font-bold text-indigo-600">{formatPrice(prod.basePrice)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>Cor do produto</SectionLabel>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {PRODUCT_COLORS.map((col) => (
                    <button
                      key={col.hex}
                      onClick={() => setSelectedColor(col.hex)}
                      className={`flex flex-col items-center gap-1 rounded-xl p-1.5 transition ${
                        selectedColor.toLowerCase() === col.hex.toLowerCase()
                          ? "ring-2 ring-indigo-600 ring-offset-2"
                          : "hover:bg-zinc-100"
                      }`}
                      title={col.name}
                    >
                      <span
                        className={`h-8 w-8 rounded-full shadow-inner ${col.hasBorder ? "border border-zinc-300" : ""}`}
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="max-w-full truncate text-[10px] text-zinc-600">{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <h4 className="text-xs font-bold text-zinc-800 uppercase">Detalhes da Produção</h4>
                <p className="mt-1 text-xs text-zinc-600">{currentProduct.description}</p>
                <div className="mt-3 flex items-center justify-between border-t border-zinc-200 pt-2 text-xs">
                  <span className="text-zinc-500">Área imprimível:</span>
                  <span className="font-semibold text-zinc-800">{currentProduct.printAreaLabel}</span>
                </div>
              </div>
            </div>
          )}

          {panel.id === "text" && (
            <div className="space-y-5">
              <div>
                <SectionLabel>Texto</SectionLabel>
                <input
                  type="text"
                  value={textInput}
                  autoFocus
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addText()}
                  placeholder="Digite sua frase ou nome..."
                  className="mt-2 w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>

              <div>
                <SectionLabel>Fonte</SectionLabel>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-sm outline-none transition focus:border-indigo-600"
                >
                  {FONT_FAMILIES.map((f) => (
                    <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <SectionLabel>Tamanho ({fontSize}px)</SectionLabel>
                  <input
                    type="range"
                    min={16}
                    max={64}
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="mt-3 w-full accent-indigo-600"
                  />
                </div>
                <div>
                  <SectionLabel>Cor</SectionLabel>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="h-9 w-12 cursor-pointer rounded-lg border border-zinc-300 bg-transparent p-1"
                    />
                    <span className="font-mono text-xs text-zinc-600">{textColor}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsBold(!isBold)}
                  className={`flex-1 rounded-lg border py-2 text-xs font-bold transition ${
                    isBold ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-zinc-300 text-zinc-700"
                  }`}
                >
                  Negrito
                </button>
                <button
                  onClick={() => setIsItalic(!isItalic)}
                  className={`flex-1 rounded-lg border py-2 text-xs font-medium italic transition ${
                    isItalic ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-zinc-300 text-zinc-700"
                  }`}
                >
                  Itálico
                </button>
              </div>

              <button
                onClick={addText}
                className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
              >
                + Inserir texto
              </button>
            </div>
          )}

          {panel.id === "shapes" && (
            <div className="space-y-5">
              <div>
                <SectionLabel>Cor da forma</SectionLabel>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="color"
                    value={shapeColor}
                    onChange={(e) => setShapeColor(e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded-lg border border-zinc-300 p-1"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {SHAPE_SWATCHES.map((c) => (
                      <button
                        key={c}
                        onClick={() => setShapeColor(c)}
                        className={`h-6 w-6 rounded-full border border-zinc-300 ${
                          shapeColor === c ? "ring-2 ring-indigo-600 ring-offset-1" : ""
                        }`}
                        style={{ backgroundColor: c }}
                        aria-label={c}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {(
                  [
                    { type: "rect", label: "Retângulo", preview: <div className="h-8 w-10 rounded-md" style={{ backgroundColor: shapeColor }} /> },
                    { type: "circle", label: "Círculo", preview: <div className="h-9 w-9 rounded-full" style={{ backgroundColor: shapeColor }} /> },
                    { type: "triangle", label: "Triângulo", preview: <span className="text-3xl leading-none" style={{ color: shapeColor }}>▲</span> },
                    { type: "star", label: "Estrela", preview: <span className="text-3xl leading-none" style={{ color: shapeColor }}>★</span> },
                    { type: "heart", label: "Coração", preview: <span className="text-3xl leading-none" style={{ color: shapeColor }}>♥</span> },
                  ] as const
                ).map((s) => (
                  <button
                    key={s.type}
                    onClick={() => addShape(s.type)}
                    className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 transition hover:border-indigo-500 hover:bg-indigo-50/30"
                  >
                    <div className="flex h-10 items-center [text-shadow:0_0_1px_#a1a1aa]">{s.preview}</div>
                    <span className="text-[11px] font-semibold text-zinc-700">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {panel.id === "upload" && (
            <div className="space-y-6">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 p-8 text-center transition hover:border-indigo-500 hover:bg-indigo-50/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <p className="mt-3 text-sm font-semibold text-zinc-900">Clique para carregar imagem</p>
                <p className="mt-1 text-xs text-zinc-500">PNG, JPG, SVG ou WEBP até 10MB</p>
              </button>

              <div>
                <SectionLabel>Ou use uma logo pronta</SectionLabel>
                <div className="mt-2 space-y-2">
                  {SAMPLE_LOGOS.map((sample) => (
                    <button
                      key={sample.name}
                      onClick={() => addSampleBadge(sample)}
                      className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 text-left transition hover:border-indigo-400 hover:bg-zinc-50"
                    >
                      <div>
                        <p className="text-xs font-bold text-zinc-900">{sample.title}</p>
                        <p className="text-[10px] text-zinc-500">{sample.subtitle}</p>
                      </div>
                      <span className="rounded bg-indigo-50 px-2 py-1 text-[11px] font-bold text-indigo-700">
                        + Adicionar
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {panel.id === "stickers" && (
            <div className="grid grid-cols-4 gap-2.5">
              {CLIPARTS_PRESETS.map((clip) => (
                <button
                  key={clip.label}
                  onClick={() => addEmojiClipart(clip.text)}
                  className="flex aspect-square flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-xs"
                  title={clip.label}
                >
                  <span className="text-2xl">{clip.icon}</span>
                  <span className="mt-1 max-w-full truncate px-1 text-[9px] text-zinc-500">{clip.label}</span>
                </button>
              ))}
            </div>
          )}

          {panel.id === "layers" && (
            <div className="space-y-3">
              {layersCount === 0 ? (
                <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-xs text-zinc-500">
                  Nenhum elemento ainda. Use o menu à direita para adicionar textos, formas ou imagens.
                </div>
              ) : (
                <ul className="space-y-1.5">
                  {/* Topo da pilha primeiro */}
                  {[...layers].reverse().map((obj, i) => {
                    const { icon, label } = describeObject(obj);
                    const isActive = obj === activeObject;
                    return (
                      <li key={i}>
                        <button
                          onClick={() => selectLayer(obj)}
                          className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-xs transition ${
                            isActive
                              ? "border-indigo-600 bg-indigo-50/60"
                              : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                          }`}
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-sm font-bold text-zinc-700">
                            {icon}
                          </span>
                          <span className="truncate font-medium text-zinc-800">{label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {layersCount > 0 && (
                <button
                  onClick={clearCanvas}
                  className="w-full rounded-xl border border-rose-200 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                >
                  Limpar tudo
                </button>
              )}
            </div>
          )}
        </FloatingModal>
      )}

      {/* Cart & Checkout Modal */}
      {cartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Personalização Pronta!
              </span>
              <button
                onClick={() => setCartModalOpen(false)}
                className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <h3 className="mt-3 text-lg font-black text-zinc-900">Revise seu pedido</h3>
            <p className="mt-1 text-xs text-zinc-500">
              Sua arte foi gerada em alta resolução e será vinculada à ordem de produção.
            </p>

            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-inner"
                style={{ backgroundColor: selectedColor }}
              >
                {exportPreviewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={exportPreviewUrl}
                    alt="Preview da Arte"
                    className="max-h-full max-w-full object-contain p-1"
                  />
                ) : (
                  <span className="text-xs text-white">Arte</span>
                )}
              </div>
              <div className="flex-1 text-xs">
                <p className="font-bold text-zinc-900">{currentProduct.name}</p>
                <p className="text-zinc-500">{layersCount} elementos na estampa</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Produto base</span>
                <span className="font-semibold text-zinc-800">{formatPrice(currentProduct.basePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de personalização</span>
                <span className="font-semibold text-indigo-600">
                  {customFee > 0 ? formatPrice(customFee) : "Grátis"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Quantidade</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-6 w-6 rounded border border-zinc-300 font-bold hover:bg-zinc-100"
                  >
                    -
                  </button>
                  <span className="w-4 text-center font-bold text-zinc-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-6 w-6 rounded border border-zinc-300 font-bold hover:bg-zinc-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-baseline justify-between border-t border-zinc-200 pt-3">
                <span className="text-sm font-bold text-zinc-900">Total</span>
                <span className="text-xl font-black text-indigo-600">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/"
                className="w-full rounded-xl bg-indigo-600 py-3 text-center text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
              >
                Adicionar à sacola e continuar comprando
              </Link>
              <button
                onClick={() => setCartModalOpen(false)}
                className="w-full rounded-xl border border-zinc-200 py-2.5 text-center text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                Voltar e continuar editando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <label className="text-xs font-bold tracking-wider text-zinc-500 uppercase">{children}</label>;
}
