"use client";

import { useEffect, useRef, useState, useTransition } from "react";
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

type StudioProps = {
  initialKind?: ProductKind;
  initialColor?: string;
};

type ActiveTab = "product" | "text" | "shapes" | "upload" | "stickers" | "layers";

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
  const [activeTab, setActiveTab] = useState<ActiveTab>("text");
  const [showGuides, setShowGuides] = useState(true);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [exportPreviewUrl, setExportPreviewUrl] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [, startTransition] = useTransition();

  // Canvas refs
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Inspector & selection state
  const [activeObject, setActiveObject] = useState<FabricObject | null>(null);
  const [layersCount, setLayersCount] = useState(0);

  // Text Tool form state
  const [textInput, setTextInput] = useState("SEU DESIGN");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [fontSize, setFontSize] = useState(32);
  const [isBold, setIsBold] = useState(true);
  const [isItalic, setIsItalic] = useState(false);

  // Shape Tool form state
  const [shapeColor, setShapeColor] = useState("#f59e0b");

  // Sync color when product changes if color wasn't custom-selected
  const handleSelectProduct = (kind: ProductKind) => {
    setSelectedKind(kind);
    const prod = CUSTOMIZER_PRODUCTS.find((p) => p.kind === kind);
    if (prod) {
      setSelectedColor(prod.defaultColor);
    }
  };

  // Initialize Fabric.js Canvas
  useEffect(() => {
    if (!canvasElRef.current) return;

    // Create Fabric Canvas with smooth interactive controls
    const canvas = new Canvas(canvasElRef.current, {
      width: 280,
      height: 320,
      backgroundColor: "transparent",
      selection: true,
      preserveObjectStacking: true,
    });
    canvasRef.current = canvas;

    // Add initial starter artwork
    const initialText = new Textbox("SEU DESIGN", {
      left: 35,
      top: 110,
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
        left: 110,
        top: 40,
        scaleX: 0.6,
        scaleY: 0.6,
        fill: "#f59e0b",
      },
    );

    const initialBadgeText = new Textbox("★ EDIÇÃO EXCLUSIVA ★", {
      left: 40,
      top: 175,
      width: 200,
      fontSize: 12,
      fontFamily: "sans-serif",
      fontWeight: "bold",
      fill: "#e0e7ff",
      textAlign: "center",
    });

    canvas.add(initialStar, initialText, initialBadgeText);
    canvas.setActiveObject(initialText);
    canvas.requestRenderAll();

    // Event bindings
    const updateSelection = () => {
      startTransition(() => {
        const active = canvas.getActiveObject() || null;
        setActiveObject(active);
        setLayersCount(canvas.getObjects().length);
      });
    };

    canvas.on("selection:created", updateSelection);
    canvas.on("selection:updated", updateSelection);
    canvas.on("selection:cleared", () => {
      startTransition(() => {
        setActiveObject(null);
        setLayersCount(canvas.getObjects().length);
      });
    });
    canvas.on("object:added", () => setLayersCount(canvas.getObjects().length));
    canvas.on("object:removed", () => setLayersCount(canvas.getObjects().length));

    setLayersCount(canvas.getObjects().length);
    setActiveObject(initialText);

    return () => {
      canvasRef.current = null;
      canvas.dispose();
    };
  }, []);

  // --- Canvas Actions ---

  const addText = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const textbox = new Textbox(textInput.trim() || "Novo Texto", {
      left: 40,
      top: 100,
      width: 200,
      fontSize,
      fontFamily,
      fill: textColor,
      fontWeight: isBold ? "bold" : "normal",
      fontStyle: isItalic ? "italic" : "normal",
      textAlign: "center",
    });

    canvas.add(textbox);
    canvas.centerObject(textbox);
    canvas.setActiveObject(textbox);
    canvas.requestRenderAll();
  };

  const addShape = (type: "rect" | "circle" | "triangle" | "star" | "heart") => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let shapeObj: FabricObject;

    if (type === "rect") {
      shapeObj = new Rect({
        left: 60,
        top: 80,
        width: 100,
        height: 100,
        fill: shapeColor,
        rx: 10,
        ry: 10,
      });
    } else if (type === "circle") {
      shapeObj = new Circle({
        left: 70,
        top: 80,
        radius: 50,
        fill: shapeColor,
      });
    } else if (type === "triangle") {
      shapeObj = new Triangle({
        left: 70,
        top: 80,
        width: 100,
        height: 90,
        fill: shapeColor,
      });
    } else if (type === "star") {
      shapeObj = new Path(
        "M 50 0 L 63 35 L 100 35 L 70 57 L 82 92 L 50 70 L 18 92 L 30 57 L 0 35 L 37 35 Z",
        {
          left: 60,
          top: 70,
          scaleX: 0.9,
          scaleY: 0.9,
          fill: shapeColor,
        },
      );
    } else {
      // Heart
      shapeObj = new Path(
        "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z",
        {
          left: 70,
          top: 80,
          scaleX: 1.1,
          scaleY: 1.1,
          fill: shapeColor,
        },
      );
    }

    canvas.add(shapeObj);
    canvas.centerObject(shapeObj);
    canvas.setActiveObject(shapeObj);
    canvas.requestRenderAll();
  };

  const addEmojiClipart = (emoji: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const emojiObj = new Textbox(emoji, {
      left: 100,
      top: 100,
      fontSize: 54,
    });

    canvas.add(emojiObj);
    canvas.centerObject(emojiObj);
    canvas.setActiveObject(emojiObj);
    canvas.requestRenderAll();
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
        canvasRef.current.add(img);
        canvasRef.current.centerObject(img);
        canvasRef.current.setActiveObject(img);
        canvasRef.current.requestRenderAll();
      } catch (err) {
        console.error("Erro ao carregar imagem no Fabric:", err);
      }
    };
    reader.readAsDataURL(file);

    // Reset input
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
      top: 18,
      width: 170,
      fontSize: 16,
      fontWeight: "bold",
      fontFamily: "Impact, sans-serif",
      fill: sample.color,
      textAlign: "center",
    });

    const subText = new Textbox(sample.subtitle, {
      top: 52,
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
    canvas.setActiveObject(badgeBg);
    canvas.requestRenderAll();
  };

  // Manipulation tools
  const duplicateSelected = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;

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

  const centerH = () => {
    const canvas = canvasRef.current;
    const active = canvas?.getActiveObject();
    if (!canvas || !active) return;
    canvas.centerObjectH(active);
    canvas.requestRenderAll();
  };

  const centerV = () => {
    const canvas = canvasRef.current;
    const active = canvas?.getActiveObject();
    if (!canvas || !active) return;
    canvas.centerObjectV(active);
    canvas.requestRenderAll();
  };

  const bringForward = () => {
    const canvas = canvasRef.current;
    const active = canvas?.getActiveObject();
    if (!canvas || !active) return;
    canvas.bringObjectForward(active);
    canvas.requestRenderAll();
  };

  const sendBackward = () => {
    const canvas = canvasRef.current;
    const active = canvas?.getActiveObject();
    if (!canvas || !active) return;
    canvas.sendObjectBackwards(active);
    canvas.requestRenderAll();
  };

  const removeSelected = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getActiveObjects().forEach((obj) => canvas.remove(obj));
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (confirm("Deseja realmente limpar toda a arte da tela?")) {
      canvas.clear();
      canvas.requestRenderAll();
    }
  };

  const downloadArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Export PNG
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
    setCartModalOpen(true);
  };

  // Calculate pricing
  const customFee = layersCount > 0 ? 15.0 : 0;
  const unitPrice = currentProduct.basePrice + customFee;
  const totalPrice = unitPrice * quantity;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Voltar para a</span> Loja
          </Link>
          <div className="h-4 w-px bg-zinc-300" />
          <div>
            <h1 className="text-sm font-bold text-zinc-900 sm:text-base">
              Estúdio de Personalização
            </h1>
            <p className="hidden text-xs text-zinc-500 sm:block">
              {currentProduct.name} · {currentProduct.printAreaLabel}
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGuides(!showGuides)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
              showGuides
                ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
            }`}
            title="Alternar visibilidade da área de impressão"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="hidden sm:inline">Gabarito</span>
          </button>

          <button
            onClick={downloadArtwork}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50"
            title="Baixar arte em PNG transparente"
          >
            <svg className="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="hidden sm:inline">Baixar Arte</span>
          </button>

          <button
            onClick={openCartModal}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Finalizar ({formatPrice(unitPrice)})</span>
          </button>
        </div>
      </header>

      {/* Studio Workspace Grid */}
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 lg:grid-cols-12">
        {/* Left Toolbar & Options Sidebar (4 cols) */}
        <div className="flex flex-col border-b border-zinc-200 bg-white lg:col-span-4 lg:border-r lg:border-b-0">
          {/* Navigation Tabs */}
          <div className="grid grid-cols-6 border-b border-zinc-200 bg-zinc-50/80 p-1 text-xs">
            <button
              onClick={() => setActiveTab("product")}
              className={`flex flex-col items-center gap-1 rounded-md py-2.5 font-medium transition ${
                activeTab === "product"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <span className="text-base">👕</span>
              <span className="text-[10px]">Base</span>
            </button>
            <button
              onClick={() => setActiveTab("text")}
              className={`flex flex-col items-center gap-1 rounded-md py-2.5 font-medium transition ${
                activeTab === "text"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <span className="text-base font-bold">T</span>
              <span className="text-[10px]">Texto</span>
            </button>
            <button
              onClick={() => setActiveTab("shapes")}
              className={`flex flex-col items-center gap-1 rounded-md py-2.5 font-medium transition ${
                activeTab === "shapes"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <span className="text-base">▲</span>
              <span className="text-[10px]">Formas</span>
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex flex-col items-center gap-1 rounded-md py-2.5 font-medium transition ${
                activeTab === "upload"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <span className="text-base">📁</span>
              <span className="text-[10px]">Upload</span>
            </button>
            <button
              onClick={() => setActiveTab("stickers")}
              className={`flex flex-col items-center gap-1 rounded-md py-2.5 font-medium transition ${
                activeTab === "stickers"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <span className="text-base">⭐</span>
              <span className="text-[10px]">Stickers</span>
            </button>
            <button
              onClick={() => setActiveTab("layers")}
              className={`flex flex-col items-center gap-1 rounded-md py-2.5 font-medium transition ${
                activeTab === "layers"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <span className="text-base">☰</span>
              <span className="text-[10px]">Camadas ({layersCount})</span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {/* TAB 1: PRODUCT & COLOR */}
            {activeTab === "product" && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                    1. Escolha o Produto Base
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {CUSTOMIZER_PRODUCTS.map((prod) => (
                      <button
                        key={prod.kind}
                        onClick={() => handleSelectProduct(prod.kind)}
                        className={`flex flex-col items-start rounded-xl border p-3 text-left transition ${
                          selectedKind === prod.kind
                            ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
                            : "border-zinc-200 bg-white hover:border-zinc-300"
                        }`}
                      >
                        <span className="font-semibold text-zinc-900">{prod.name}</span>
                        <span className="mt-1 text-xs text-indigo-600 font-bold">
                          {formatPrice(prod.basePrice)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                    2. Escolha a Cor do Produto
                  </label>
                  <div className="mt-3 grid grid-cols-5 gap-3">
                    {PRODUCT_COLORS.map((col) => (
                      <button
                        key={col.hex}
                        onClick={() => setSelectedColor(col.hex)}
                        className={`group relative flex flex-col items-center gap-1 rounded-xl p-1.5 transition ${
                          selectedColor.toLowerCase() === col.hex.toLowerCase()
                            ? "ring-2 ring-indigo-600 ring-offset-2"
                            : "hover:bg-zinc-100"
                        }`}
                        title={col.name}
                      >
                        <span
                          className={`h-8 w-8 rounded-full shadow-inner ${
                            col.hasBorder ? "border border-zinc-300" : ""
                          }`}
                          style={{ backgroundColor: col.hex }}
                        />
                        <span className="text-[10px] text-zinc-600 truncate max-w-full">
                          {col.name}
                        </span>
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

            {/* TAB 2: TEXT TOOL */}
            {activeTab === "text" && (
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                    Texto a adicionar
                  </label>
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Digite sua frase ou nome..."
                    className="mt-2 w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                    Fonte tipográfica
                  </label>
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
                    <label className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                      Tamanho ({fontSize}px)
                    </label>
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
                    <label className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                      Cor do Texto
                    </label>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="h-9 w-12 cursor-pointer rounded-lg border border-zinc-300 bg-transparent p-1"
                      />
                      <span className="text-xs font-mono text-zinc-600">{textColor}</span>
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
                    Negrito (B)
                  </button>
                  <button
                    onClick={() => setIsItalic(!isItalic)}
                    className={`flex-1 rounded-lg border py-2 text-xs italic font-medium transition ${
                      isItalic ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-zinc-300 text-zinc-700"
                    }`}
                  >
                    Itálico (I)
                  </button>
                </div>

                <button
                  onClick={addText}
                  className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
                >
                  + Inserir Texto na Arte
                </button>
              </div>
            )}

            {/* TAB 3: SHAPES TOOL */}
            {activeTab === "shapes" && (
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                    Cor da Forma
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="color"
                      value={shapeColor}
                      onChange={(e) => setShapeColor(e.target.value)}
                      className="h-10 w-14 cursor-pointer rounded-lg border border-zinc-300 p-1"
                    />
                    <div className="flex flex-wrap gap-1.5">
                      {["#f59e0b", "#ef4444", "#3b82f6", "#10b981", "#8b5cf6", "#18181b", "#ffffff"].map((c) => (
                        <button
                          key={c}
                          onClick={() => setShapeColor(c)}
                          className="h-6 w-6 rounded-full border border-zinc-300 shadow-xs"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                    Selecione uma Forma
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => addShape("rect")}
                      className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 p-4 transition hover:border-indigo-500 hover:bg-indigo-50/30"
                    >
                      <div className="h-10 w-14 rounded-md bg-zinc-800" />
                      <span className="text-xs font-semibold text-zinc-700">Retângulo</span>
                    </button>

                    <button
                      onClick={() => addShape("circle")}
                      className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 p-4 transition hover:border-indigo-500 hover:bg-indigo-50/30"
                    >
                      <div className="h-11 w-11 rounded-full bg-zinc-800" />
                      <span className="text-xs font-semibold text-zinc-700">Círculo</span>
                    </button>

                    <button
                      onClick={() => addShape("triangle")}
                      className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 p-4 transition hover:border-indigo-500 hover:bg-indigo-50/30"
                    >
                      <span className="text-3xl text-zinc-800">▲</span>
                      <span className="text-xs font-semibold text-zinc-700">Triângulo</span>
                    </button>

                    <button
                      onClick={() => addShape("star")}
                      className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 p-4 transition hover:border-indigo-500 hover:bg-indigo-50/30"
                    >
                      <span className="text-3xl text-amber-500">★</span>
                      <span className="text-xs font-semibold text-zinc-700">Estrela</span>
                    </button>

                    <button
                      onClick={() => addShape("heart")}
                      className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 p-4 transition hover:border-indigo-500 hover:bg-indigo-50/30 col-span-2"
                    >
                      <span className="text-3xl text-rose-500">❤️</span>
                      <span className="text-xs font-semibold text-zinc-700">Coração</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: UPLOAD TOOL */}
            {activeTab === "upload" && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                    Envie sua Logo ou Imagem
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 p-8 text-center transition hover:border-indigo-500 hover:bg-indigo-50/20"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-zinc-900">Clique para carregar imagem</p>
                    <p className="mt-1 text-xs text-zinc-500">PNG, JPG, SVG ou WEBP até 10MB</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                    Ou teste com Logos Prontas
                  </label>
                  <div className="mt-2 space-y-2">
                    {SAMPLE_LOGOS.map((sample) => (
                      <button
                        key={sample.name}
                        onClick={() => addSampleBadge(sample)}
                        className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 text-left transition hover:border-indigo-400 hover:bg-zinc-50"
                      >
                        <div>
                          <p className="font-bold text-xs text-zinc-900">{sample.title}</p>
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

            {/* TAB 5: STICKERS */}
            {activeTab === "stickers" && (
              <div className="space-y-4">
                <label className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                  Galeria de Ícones e Stickers
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {CLIPARTS_PRESETS.map((clip) => (
                    <button
                      key={clip.label}
                      onClick={() => addEmojiClipart(clip.text)}
                      className="flex aspect-square flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-xs"
                      title={clip.label}
                    >
                      <span className="text-2xl">{clip.icon}</span>
                      <span className="mt-1 text-[9px] text-zinc-500 truncate">{clip.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: LAYERS */}
            {activeTab === "layers" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                    Itens no Canvas ({layersCount})
                  </label>
                  <button
                    onClick={clearCanvas}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                  >
                    Limpar tudo
                  </button>
                </div>

                {layersCount === 0 ? (
                  <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-xs text-zinc-500">
                    Nenhum elemento adicionado ainda. Adicione textos, formas ou imagens pelas abas acima!
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-500">
                      Clique no canvas para selecionar, arrastar, rotacionar ou redimensionar.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={removeSelected}
                        disabled={!activeObject}
                        className="flex-1 rounded-lg border border-rose-200 bg-rose-50 py-2 text-xs font-bold text-rose-700 disabled:opacity-40"
                      >
                        Excluir Selecionado
                      </button>
                      <button
                        onClick={duplicateSelected}
                        disabled={!activeObject}
                        className="flex-1 rounded-lg border border-zinc-300 py-2 text-xs font-bold text-zinc-700 disabled:opacity-40"
                      >
                        Duplicar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Center Canvas & Mockup Frame (5 cols) */}
        <div className="relative flex flex-col items-center justify-center p-4 lg:col-span-5 lg:p-8">
          {/* Quick Floating Action Controls above Canvas */}
          <div className="mb-4 flex flex-wrap items-center gap-1.5 rounded-full border border-zinc-200 bg-white/95 px-3 py-1.5 shadow-xs backdrop-blur">
            <button
              onClick={centerH}
              disabled={!activeObject}
              className="rounded-full p-1.5 text-zinc-700 hover:bg-zinc-100 disabled:opacity-30"
              title="Centralizar Horizontalmente"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M8 8l4-4 4 4M8 16l4 4 4-4" />
              </svg>
            </button>
            <button
              onClick={centerV}
              disabled={!activeObject}
              className="rounded-full p-1.5 text-zinc-700 hover:bg-zinc-100 disabled:opacity-30"
              title="Centralizar Verticalmente"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M8 8l-4 4 4 4M16 8l4 4-4 4" />
              </svg>
            </button>
            <div className="h-4 w-px bg-zinc-200" />
            <button
              onClick={bringForward}
              disabled={!activeObject}
              className="rounded-full p-1.5 text-zinc-700 hover:bg-zinc-100 disabled:opacity-30"
              title="Trazer para Frente"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              onClick={sendBackward}
              disabled={!activeObject}
              className="rounded-full p-1.5 text-zinc-700 hover:bg-zinc-100 disabled:opacity-30"
              title="Enviar para Trás"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="h-4 w-px bg-zinc-200" />
            <button
              onClick={duplicateSelected}
              disabled={!activeObject}
              className="rounded-full p-1.5 text-zinc-700 hover:bg-zinc-100 disabled:opacity-30"
              title="Duplicar Elemento"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              onClick={removeSelected}
              disabled={!activeObject}
              className="rounded-full p-1.5 text-rose-600 hover:bg-rose-50 disabled:opacity-30"
              title="Remover Elemento"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          {/* Interactive Fabric Canvas inside Mockup Container */}
          <ProductMockupFrame
            kind={selectedKind}
            color={selectedColor}
            showGuides={showGuides}
            printAreaLabel={currentProduct.printAreaLabel}
          >
            <canvas ref={canvasElRef} className="cursor-crosshair" />
          </ProductMockupFrame>

          <p className="mt-3 text-center text-xs text-zinc-400">
            Dica: clique em qualquer elemento para mover, esticar ou girar.
          </p>
        </div>

        {/* Right Inspector & Summary Panel (3 cols) */}
        <div className="flex flex-col border-t border-zinc-200 bg-white p-5 lg:col-span-3 lg:border-t-0 lg:border-l">
          {/* Active Object Inspector */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4">
            <h3 className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
              Elemento Ativo
            </h3>
            {activeObject ? (
              <div className="mt-3 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Tipo:</span>
                  <span className="rounded bg-indigo-100 px-2 py-0.5 font-mono text-[11px] font-bold text-indigo-700 uppercase">
                    {activeObject.type}
                  </span>
                </div>

                {/* If Textbox: Live text editing */}
                {activeObject.type === "textbox" && (
                  <div>
                    <label className="text-[11px] font-medium text-zinc-600">Alterar texto:</label>
                    <input
                      type="text"
                      defaultValue={(activeObject as Textbox).text}
                      onChange={(e) => {
                        (activeObject as Textbox).set("text", e.target.value);
                        canvasRef.current?.requestRenderAll();
                      }}
                      className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-indigo-600"
                    />
                  </div>
                )}

                {/* Fill color editor for active object */}
                <div>
                  <label className="text-[11px] font-medium text-zinc-600">Cor do elemento:</label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      type="color"
                      defaultValue={(activeObject.fill as string) || "#000000"}
                      onChange={(e) => {
                        activeObject.set("fill", e.target.value);
                        canvasRef.current?.requestRenderAll();
                      }}
                      className="h-8 w-10 cursor-pointer rounded border border-zinc-300 p-0.5"
                    />
                    <span className="text-xs text-zinc-500">Toque para trocar</span>
                  </div>
                </div>

                {/* Opacity slider */}
                <div>
                  <label className="text-[11px] font-medium text-zinc-600">Opacidade:</label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    defaultValue={activeObject.opacity ?? 1}
                    onChange={(e) => {
                      activeObject.set("opacity", parseFloat(e.target.value));
                      canvasRef.current?.requestRenderAll();
                    }}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>
            ) : (
              <p className="mt-2 text-xs text-zinc-400">
                Nenhum elemento selecionado no canvas. Clique em um item para ajustar suas propriedades.
              </p>
            )}
          </div>

          {/* Pricing & Checkout Summary */}
          <div className="mt-auto space-y-4 pt-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs">
              <h4 className="text-xs font-bold text-zinc-900 uppercase">Resumo do Pedido</h4>
              <div className="mt-3 space-y-2 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Produto Base:</span>
                  <span className="font-semibold text-zinc-800">{formatPrice(currentProduct.basePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de Personalização:</span>
                  <span className="font-semibold text-indigo-600">
                    {customFee > 0 ? formatPrice(customFee) : "Grátis"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estampas no Canvas:</span>
                  <span className="font-semibold text-zinc-800">{layersCount} itens</span>
                </div>
                <div className="border-t border-zinc-200 pt-2 flex items-center justify-between">
                  <span className="font-medium text-zinc-700">Quantidade:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-6 w-6 rounded border border-zinc-300 text-xs font-bold hover:bg-zinc-100"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-zinc-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-6 w-6 rounded border border-zinc-300 text-xs font-bold hover:bg-zinc-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-zinc-200 pt-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-zinc-900">Total:</span>
                  <span className="text-xl font-black text-indigo-600">{formatPrice(totalPrice)}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-zinc-400">Em até 3x sem juros</p>
              </div>
            </div>

            <button
              onClick={openCartModal}
              className="w-full rounded-2xl bg-indigo-600 py-3.5 text-center text-sm font-bold text-white shadow-md transition hover:bg-indigo-700 active:scale-[0.99]"
            >
              Comprar Produto Customizado
            </button>
          </div>
        </div>
      </div>

      {/* Cart & Checkout Success Modal */}
      {cartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
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
              >
                ✕
              </button>
            </div>

            <h3 className="mt-3 text-lg font-black text-zinc-900">
              Produto adicionado à sua sacola
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              Sua arte foi gerada em alta resolução e vinculada à ordem de produção.
            </p>

            {/* Artwork thumbnail */}
            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl shadow-inner overflow-hidden"
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
                <p className="text-zinc-500">Quantidade: {quantity} un.</p>
                <p className="font-bold text-indigo-600 mt-1">{formatPrice(totalPrice)}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/"
                className="w-full rounded-xl bg-indigo-600 py-3 text-center text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
              >
                Continuar Comprando
              </Link>
              <button
                onClick={() => setCartModalOpen(false)}
                className="w-full rounded-xl border border-zinc-200 py-2.5 text-center text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                Voltar e Continuar Editando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
