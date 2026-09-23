export type ProductKind = "tshirt" | "mug" | "cap" | "bag" | "hoodie" | "bottle";

export type Product = {
  id: number;
  name: string;
  category: string;
  kind: ProductKind;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  color: string;
  badge?: string;
};

export const navLinks = [
  { label: "Início", href: "/" },
  { label: "Personalizar 🎨", href: "/customizar" },
  { label: "Camisetas", href: "#produtos" },
  { label: "Canecas", href: "#produtos" },
  { label: "Acessórios", href: "#produtos" },
  { label: "Promoções", href: "#produtos" },
  { label: "Contato", href: "#contato" },
];

export const categories: { name: string; kind: ProductKind; count: number; bg: string }[] = [
  { name: "Camisetas", kind: "tshirt", count: 48, bg: "bg-sky-100" },
  { name: "Canecas", kind: "mug", count: 32, bg: "bg-amber-100" },
  { name: "Bonés", kind: "cap", count: 18, bg: "bg-rose-100" },
  { name: "Ecobags", kind: "bag", count: 24, bg: "bg-emerald-100" },
];

export const products: Product[] = [
  { id: 1, name: "Camiseta Básica Algodão", category: "Camisetas", kind: "tshirt", price: 59.9, oldPrice: 79.9, rating: 4.8, reviews: 214, color: "#3b82f6", badge: "-25%" },
  { id: 2, name: "Caneca Cerâmica 325ml", category: "Canecas", kind: "mug", price: 39.9, rating: 4.9, reviews: 532, color: "#f59e0b", badge: "Mais vendido" },
  { id: 3, name: "Boné Trucker Personalizado", category: "Bonés", kind: "cap", price: 69.9, rating: 4.6, reviews: 98, color: "#ef4444" },
  { id: 4, name: "Ecobag Lona Crua", category: "Ecobags", kind: "bag", price: 34.9, oldPrice: 44.9, rating: 4.7, reviews: 176, color: "#10b981", badge: "-22%" },
  { id: 5, name: "Moletom Canguru", category: "Moletons", kind: "hoodie", price: 149.9, rating: 4.9, reviews: 87, color: "#8b5cf6", badge: "Novo" },
  { id: 6, name: "Garrafa Térmica 500ml", category: "Acessórios", kind: "bottle", price: 89.9, rating: 4.5, reviews: 64, color: "#0ea5e9" },
  { id: 7, name: "Camiseta Oversized", category: "Camisetas", kind: "tshirt", price: 79.9, rating: 4.7, reviews: 143, color: "#18181b" },
  { id: 8, name: "Caneca Mágica Térmica", category: "Canecas", kind: "mug", price: 54.9, oldPrice: 64.9, rating: 4.8, reviews: 301, color: "#ec4899", badge: "-15%" },
];

export const benefits = [
  { title: "Frete grátis", text: "Em compras acima de R$ 199" },
  { title: "Personalize online", text: "Editor visual com prévia em tempo real" },
  { title: "Pagamento seguro", text: "Pix, cartão em até 6x sem juros" },
  { title: "Troca garantida", text: "Até 30 dias após o recebimento" },
];

export const footerColumns = [
  { title: "Loja", links: ["Camisetas", "Canecas", "Bonés", "Ecobags", "Promoções"] },
  { title: "Ajuda", links: ["Como personalizar", "Prazos de entrega", "Trocas e devoluções", "Perguntas frequentes"] },
  { title: "Empresa", links: ["Sobre nós", "Pedidos corporativos", "Trabalhe conosco", "Política de privacidade"] },
];

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
