import type { ProductKind } from "./store";
import type { DesignElement } from "./designs";
import { CUSTOMIZER_PRODUCTS } from "./customizer";

// Dados mockados — a futura área administrativa vai criar/editar estes registros.

export type Creator = {
  slug: string;
  name: string;
  bio: string;
  /** Valor CSS de `background` (cor, gradiente ou `url(...)`) usado na capa da página */
  banner: string;
  logo: {
    /** URL de imagem enviada pelo criador; quando ausente usa o emoji */
    src?: string;
    emoji: string;
    bg: string;
  };
};

export type Creation = {
  id: string;
  title: string;
  creatorSlug: string;
  kind: ProductKind;
  color: string;
  featured: boolean;
  /** Data ISO (AAAA-MM-DD) usada para ordenar "Últimas criações" */
  createdAt: string;
  elements: DesignElement[];
};

export const creators: Creator[] = [
  {
    slug: "ana-lua",
    name: "Ana Lua Studio",
    bio: "Ilustrações cósmicas e minimalistas para quem vive com a cabeça nas estrelas.",
    banner: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 55%, #a78bfa 100%)",
    logo: { emoji: "🌙", bg: "#1e1b4b" },
  },
  {
    slug: "cafe-grafico",
    name: "Café Gráfico",
    bio: "Tipografia, cafeína e bom humor. Estampas para as manhãs mais longas.",
    banner: "linear-gradient(135deg, #451a03 0%, #b45309 60%, #fbbf24 100%)",
    logo: { emoji: "☕", bg: "#78350f" },
  },
  {
    slug: "rua-crew",
    name: "Rua Crew",
    bio: "Streetwear direto do asfalto. Skate, música e atitude em cada peça.",
    banner: "linear-gradient(135deg, #09090b 0%, #3f3f46 50%, #dc2626 100%)",
    logo: { emoji: "🛹", bg: "#dc2626" },
  },
  {
    slug: "verde-vivo",
    name: "Verde Vivo",
    bio: "Arte botânica e mensagens sustentáveis para vestir a natureza.",
    banner: "linear-gradient(135deg, #022c22 0%, #047857 55%, #6ee7b7 100%)",
    logo: { emoji: "🌿", bg: "#065f46" },
  },
];

export const creations: Creation[] = [
  {
    id: "noite-estrelada",
    title: "Noite Estrelada",
    creatorSlug: "ana-lua",
    kind: "tshirt",
    color: "#18181b",
    featured: true,
    createdAt: "2026-09-22",
    elements: [
      { type: "circle", left: 140, top: 100, radius: 42, fill: "#fde68a" },
      { type: "shape", shape: "star", left: 62, top: 62, scale: 0.28, fill: "#ffffff" },
      { type: "shape", shape: "star", left: 222, top: 84, scale: 0.2, fill: "#c7d2fe" },
      { type: "shape", shape: "star", left: 208, top: 40, scale: 0.14, fill: "#ffffff" },
      { type: "text", left: 140, top: 185, text: "BOA NOITE", fontSize: 38, fontFamily: "Impact, sans-serif", fill: "#ffffff" },
      { type: "text", left: 140, top: 222, text: "✦ ANA LUA ✦", fontSize: 12, fontWeight: "bold", fill: "#c7d2fe" },
    ],
  },
  {
    id: "orbita",
    title: "Órbita",
    creatorSlug: "ana-lua",
    kind: "hoodie",
    color: "#1e3a8a",
    featured: true,
    createdAt: "2026-09-10",
    elements: [
      { type: "text", left: 140, top: 120, text: "🪐", fontSize: 96, fill: "#ffffff" },
      { type: "text", left: 140, top: 210, text: "PERDIDA NO ESPAÇO", fontSize: 22, fontFamily: "Impact, sans-serif", fill: "#ffffff" },
    ],
  },
  {
    id: "lua-cheia",
    title: "Lua Cheia",
    creatorSlug: "ana-lua",
    kind: "mug",
    color: "#ffffff",
    featured: false,
    createdAt: "2026-09-26",
    elements: [
      { type: "circle", left: 140, top: 135, radius: 64, fill: "#1e1b4b" },
      { type: "text", left: 140, top: 135, text: "🌙", fontSize: 64, fill: "#ffffff" },
      { type: "text", left: 140, top: 240, text: "lua cheia", fontSize: 30, fontFamily: "Georgia, serif", fontStyle: "italic", fill: "#1e1b4b" },
    ],
  },
  {
    id: "constelacao",
    title: "Constelação",
    creatorSlug: "ana-lua",
    kind: "bag",
    color: "#e7e5e4",
    featured: false,
    createdAt: "2026-08-30",
    elements: [
      { type: "shape", shape: "star", left: 80, top: 80, scale: 0.3, fill: "#312e81" },
      { type: "shape", shape: "star", left: 150, top: 110, scale: 0.42, fill: "#4338ca" },
      { type: "shape", shape: "star", left: 205, top: 70, scale: 0.22, fill: "#312e81" },
      { type: "shape", shape: "star", left: 110, top: 160, scale: 0.18, fill: "#6366f1" },
      { type: "text", left: 140, top: 230, text: "CONSTELAÇÃO", fontSize: 30, fontFamily: "Impact, sans-serif", fill: "#312e81" },
    ],
  },
  {
    id: "primeiro-cafe",
    title: "Mas Primeiro, Café",
    creatorSlug: "cafe-grafico",
    kind: "mug",
    color: "#18181b",
    featured: true,
    createdAt: "2026-09-18",
    elements: [
      { type: "text", left: 140, top: 100, text: "☕", fontSize: 72, fill: "#ffffff" },
      { type: "text", left: 140, top: 175, text: "MAS PRIMEIRO,", fontSize: 18, fontWeight: "bold", fill: "#fde68a" },
      { type: "text", left: 140, top: 218, text: "CAFÉ", fontSize: 54, fontFamily: "Impact, sans-serif", fill: "#f59e0b" },
    ],
  },
  {
    id: "coffee-and-code",
    title: "Coffee & Code",
    creatorSlug: "cafe-grafico",
    kind: "tshirt",
    color: "#f59e0b",
    featured: true,
    createdAt: "2026-09-27",
    elements: [
      { type: "rect", left: 140, top: 150, width: 220, height: 110, radius: 16, fill: "#18181b", stroke: "#ffffff", strokeWidth: 3 },
      { type: "text", left: 140, top: 138, text: "COFFEE & CODE", fontSize: 28, fontFamily: "Impact, sans-serif", fill: "#f59e0b" },
      { type: "text", left: 140, top: 172, text: "FUEL FOR CREATORS", fontSize: 12, fontWeight: "bold", fill: "#ffffff" },
    ],
  },
  {
    id: "barista",
    title: "Barista",
    creatorSlug: "cafe-grafico",
    kind: "cap",
    color: "#78350f",
    featured: false,
    createdAt: "2026-09-05",
    elements: [
      { type: "text", left: 140, top: 130, text: "BARISTA", fontSize: 56, fontFamily: "Impact, sans-serif", fill: "#fde68a" },
      { type: "text", left: 140, top: 190, text: "☕ DESDE 2026 ☕", fontSize: 16, fontWeight: "bold", fill: "#fef3c7" },
    ],
  },
  {
    id: "rua-sem-fim",
    title: "Rua Sem Fim",
    creatorSlug: "rua-crew",
    kind: "tshirt",
    color: "#ffffff",
    featured: true,
    createdAt: "2026-09-24",
    elements: [
      { type: "rect", left: 140, top: 140, width: 230, height: 70, fill: "#dc2626", angle: -6 },
      { type: "text", left: 140, top: 140, text: "RUA CREW", fontSize: 40, fontFamily: "Impact, sans-serif", fill: "#ffffff", angle: -6 },
      { type: "text", left: 140, top: 205, text: "SKATE OR DIE · 2026", fontSize: 14, fontWeight: "bold", fill: "#18181b" },
    ],
  },
  {
    id: "stay-rad",
    title: "Stay Rad",
    creatorSlug: "rua-crew",
    kind: "hoodie",
    color: "#18181b",
    featured: true,
    createdAt: "2026-09-28",
    elements: [
      { type: "text", left: 140, top: 115, text: "💀", fontSize: 88, fill: "#ffffff" },
      { type: "text", left: 140, top: 210, text: "STAY RAD", fontSize: 44, fontFamily: "Impact, sans-serif", fill: "#ef4444" },
    ],
  },
  {
    id: "energia",
    title: "Energia",
    creatorSlug: "rua-crew",
    kind: "bottle",
    color: "#dc2626",
    featured: false,
    createdAt: "2026-09-12",
    elements: [
      { type: "text", left: 140, top: 130, text: "⚡", fontSize: 100, fill: "#ffffff" },
      { type: "text", left: 140, top: 235, text: "ENERGIA", fontSize: 40, fontFamily: "Impact, sans-serif", fill: "#ffffff" },
    ],
  },
  {
    id: "plante-o-bem",
    title: "Plante o Bem",
    creatorSlug: "verde-vivo",
    kind: "bag",
    color: "#fef3c7",
    featured: true,
    createdAt: "2026-09-15",
    elements: [
      { type: "text", left: 140, top: 110, text: "🌿", fontSize: 96, fill: "#065f46" },
      { type: "text", left: 140, top: 205, text: "PLANTE O BEM", fontSize: 30, fontFamily: "Georgia, serif", fontWeight: "bold", fill: "#065f46" },
      { type: "text", left: 140, top: 240, text: "verde vivo", fontSize: 16, fontFamily: "Georgia, serif", fontStyle: "italic", fill: "#059669" },
    ],
  },
  {
    id: "ame-a-natureza",
    title: "Ame a Natureza",
    creatorSlug: "verde-vivo",
    kind: "tshirt",
    color: "#059669",
    featured: true,
    createdAt: "2026-09-25",
    elements: [
      { type: "shape", shape: "heart", left: 140, top: 115, scale: 1.3, fill: "#ffffff" },
      { type: "text", left: 140, top: 115, text: "🌎", fontSize: 44, fill: "#ffffff" },
      { type: "text", left: 140, top: 215, text: "AME A NATUREZA", fontSize: 28, fontFamily: "Impact, sans-serif", fill: "#ffffff" },
    ],
  },
  {
    id: "trilha",
    title: "Trilha",
    creatorSlug: "verde-vivo",
    kind: "cap",
    color: "#065f46",
    featured: false,
    createdAt: "2026-08-20",
    elements: [
      { type: "text", left: 140, top: 110, text: "🌲🌲🌲", fontSize: 44, fill: "#ffffff" },
      { type: "text", left: 140, top: 185, text: "TRILHA", fontSize: 54, fontFamily: "Impact, sans-serif", fill: "#d1fae5" },
    ],
  },
];

const CUSTOMIZATION_FEE = 15;

export function getCreator(slug: string) {
  return creators.find((c) => c.slug === slug);
}

export function getCreation(id: string) {
  return creations.find((c) => c.id === id);
}

export function getFeaturedCreations() {
  return creations.filter((c) => c.featured);
}

export function getCreationsByCreator(slug: string) {
  return creations.filter((c) => c.creatorSlug === slug);
}

export function sortByNewest(list: Creation[]) {
  return [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getCreationPrice(creation: Creation) {
  const base = CUSTOMIZER_PRODUCTS.find((p) => p.kind === creation.kind)?.basePrice ?? 0;
  return base + CUSTOMIZATION_FEE;
}

export function getCustomizeUrl(creation: Creation) {
  return `/customizar?criacao=${creation.id}`;
}
