import type { ProductKind } from "./store";

export type CustomizerProduct = {
  kind: ProductKind;
  name: string;
  category: string;
  basePrice: number;
  description: string;
  defaultColor: string;
  printAreaLabel: string;
};

export const CUSTOMIZER_PRODUCTS: CustomizerProduct[] = [
  {
    kind: "tshirt",
    name: "Camiseta Básica de Algodão",
    category: "Camisetas",
    basePrice: 59.9,
    description: "100% algodão penteado fio 30.1. Toque suave e alta durabilidade para personalização.",
    defaultColor: "#18181b",
    printAreaLabel: "Peito central · 28 x 35 cm",
  },
  {
    kind: "hoodie",
    name: "Moletom Canguru Premium",
    category: "Moletons",
    basePrice: 149.9,
    description: "Moletom flanelado 3 cabos com capuz forrado e bolso frontal. Conforto térmico impecável.",
    defaultColor: "#8b5cf6",
    printAreaLabel: "Peito frontal · 30 x 30 cm",
  },
  {
    kind: "mug",
    name: "Caneca de Cerâmica 325ml",
    category: "Canecas",
    basePrice: 39.9,
    description: "Cerâmica importada resinada para estampa fotográfica de alto brilho e resistência a micro-ondas.",
    defaultColor: "#ffffff",
    printAreaLabel: "Área panorâmica · 20 x 9 cm",
  },
  {
    kind: "cap",
    name: "Boné Trucker Street",
    category: "Bonés",
    basePrice: 69.9,
    description: "Aba curva com tela traseira respirável e fecho ajustável tipo snapback.",
    defaultColor: "#ef4444",
    printAreaLabel: "Frontal · 12 x 6 cm",
  },
  {
    kind: "bag",
    name: "Ecobag Sustentável de Lona",
    category: "Ecobags",
    basePrice: 34.9,
    description: "Lona de algodão cru 240g com alças reforçadas de ombro. Resistente e ecológica.",
    defaultColor: "#10b981",
    printAreaLabel: "Frente central · 25 x 30 cm",
  },
  {
    kind: "bottle",
    name: "Garrafa Térmica Inox 500ml",
    category: "Acessórios",
    basePrice: 89.9,
    description: "Parede dupla em aço inox com isolamento a vácuo. Mantém bebidas geladas por 24h ou quentes por 12h.",
    defaultColor: "#0ea5e9",
    printAreaLabel: "Corpo frontal · 7 x 15 cm",
  },
];

export const PRODUCT_COLORS = [
  { name: "Preto", hex: "#18181b", isDark: true },
  { name: "Branco", hex: "#ffffff", isDark: false, hasBorder: true },
  { name: "Azul Royal", hex: "#2563eb", isDark: true },
  { name: "Azul Marinho", hex: "#1e3a8a", isDark: true },
  { name: "Vermelho Rubi", hex: "#dc2626", isDark: true },
  { name: "Amarelo Ouro", hex: "#f59e0b", isDark: false },
  { name: "Verde Esmeralda", hex: "#059669", isDark: true },
  { name: "Rosa Choque", hex: "#db2777", isDark: true },
  { name: "Roxo Real", hex: "#7c3aed", isDark: true },
  { name: "Cinza Mescla", hex: "#6b7280", isDark: true },
];

export const FONT_FAMILIES = [
  { label: "Sans Serif (Inter)", value: "sans-serif" },
  { label: "Serif Elegante (Georgia)", value: "Georgia, serif" },
  { label: "Mono / Tech (Courier)", value: "'Courier New', monospace" },
  { label: "Impacto / Bold (Impact)", value: "Impact, sans-serif" },
  { label: "Cursiva / Caligrafia (Brush)", value: "'Brush Script MT', cursive" },
  { label: "Moderno (Trebuchet)", value: "'Trebuchet MS', sans-serif" },
];

export const CLIPARTS_PRESETS = [
  { label: "Fogo", icon: "🔥", text: "🔥" },
  { label: "Estrela", icon: "⭐", text: "⭐" },
  { label: "Raio", icon: "⚡", text: "⚡" },
  { label: "Foguete", icon: "🚀", text: "🚀" },
  { label: "Café", icon: "☕", text: "☕" },
  { label: "Palmeira", icon: "🌴", text: "🌴" },
  { label: "Fone de Ouvido", icon: "🎧", text: "🎧" },
  { label: "Diamante", icon: "💎", text: "💎" },
  { label: "Coração", icon: "❤️", text: "❤️" },
  { label: "Paz", icon: "✌️", text: "✌️" },
  { label: "Caveira", icon: "💀", text: "💀" },
  { label: "Troféu", icon: "🏆", text: "🏆" },
  { label: "Câmera", icon: "📷", text: "📷" },
  { label: "Música", icon: "🎵", text: "🎵" },
  { label: "Planeta", icon: "🪐", text: "🪐" },
  { label: "Sorriso", icon: "😎", text: "😎" },
];

export const SAMPLE_LOGOS = [
  {
    name: "Mountain Adventure",
    color: "#ffffff",
    bg: "#2563eb",
    title: "MOUNTAIN CLUB",
    subtitle: "EST. 2026 · EXPLORE MORE",
  },
  {
    name: "Coffee & Code",
    color: "#f59e0b",
    bg: "#18181b",
    title: "COFFEE & CODE",
    subtitle: "FUEL FOR CREATORS",
  },
  {
    name: "Urban Skate",
    color: "#dc2626",
    bg: "#f4f4f5",
    title: "URBAN CULTURE",
    subtitle: "AUTHENTIC STREETWEAR",
  },
];
