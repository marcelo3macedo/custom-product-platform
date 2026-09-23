import type { Metadata } from "next";
import type { ProductKind } from "@/data/store";
import CustomizerClientWrapper from "@/components/customizer/CustomizerClientWrapper";

export const metadata: Metadata = {
  title: "Personalizar Produto · Estúdio Criativo | custom.store",
  description: "Personalize camisetas, canecas, bonés e muito mais com nosso editor interativo online.",
};

type PageProps = {
  searchParams: Promise<{
    produto?: string;
    cor?: string;
  }>;
};

export default async function CustomizarPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialKind = (params.produto as ProductKind) || "tshirt";
  const initialColor = params.cor || undefined;

  return (
    <main className="min-h-screen">
      <CustomizerClientWrapper initialKind={initialKind} initialColor={initialColor} />
    </main>
  );
}
